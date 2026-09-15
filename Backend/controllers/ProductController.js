import bouquetModel from "../models/Bouquet.js";
import flowerModel from "../models/Flower.js";
import ComboBouquetModel from "../models/ComboBouquet.js";
import FlowerInBoxModel from "../models/FlowerInBoxModel.js";
import FlowerInSleeveModel from "../models/FlowerInSleeveModel.js";
import WoolenModel from "../models/Woolen.js";

// GET ALL PRODUCTS BY OCCASION
export const GetAllProductsByOccasion = async (req, res) => {
  try {
    const { occasion } = req.params;

    if (!occasion) {
      return res.status(400).json({
        success: false,
        message: "Occasion is required",
      });
    }

    // Case-insensitive search
    const occasionRegex = new RegExp(`^${occasion}$`, "i");

    // FETCH ALL PRODUCTS

    const [
      bouquets,
      flowers,
      comboBouquets,
      flowersInBox,
      flowersInSleeve,
      woolens,
    ] = await Promise.all([
      bouquetModel.find({
        occasion: occasionRegex,
        isAvailable: true,
      }),

      flowerModel.find({
        occasion: occasionRegex,
        isAvailable: true,
      }),

      ComboBouquetModel.find({
        occasion: occasionRegex,
        isAvailable: true,
      }),

      FlowerInBoxModel.find({
        occasion: {
          $in: [occasionRegex],
        },
        isAvailable: true,
      }),

      FlowerInSleeveModel.find({
        occasion: {
          $in: [occasionRegex],
        },
        isAvailable: true,
      }),

      WoolenModel.find({
        occasion: occasionRegex,
        isAvailable: true,
      }),
    ]);

    // RESPONSE

    return res.status(200).json({
      success: true,
      occasion,
      products: {
        bouquets,
        flowers,
        comboBouquets,
        flowersInBox,
        flowersInSleeve,
        woolens,
      },
    });
  } catch (error) {
    console.error("GetAllProductsByOccasion Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products by occasion",
      error: error.message,
    });
  }
};

// GLOBAL SEARCH

export const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    // =====================================================
    // 1. VALIDATE
    // =====================================================

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search something",
      });
    }

    const originalQuery = q.trim();

    // =====================================================
    // 2. NORMALIZE QUERY
    // =====================================================

    let query = originalQuery
      .toLowerCase()
      .replace(/₹/g, " ")
      .replace(/\brs\.?\b/g, " ")
      .replace(/\brupees?\b/g, " ")
      .replace(/\bprice\b/g, " ")
      .replace(/\bcost\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // =====================================================
    // 3. STOP WORDS
    // =====================================================

    const stopWords = new Set([
      // English
      "the",
      "a",
      "an",
      "is",
      "am",
      "are",
      "was",
      "were",
      "for",
      "to",
      "of",
      "in",
      "on",
      "with",
      "and",
      "or",
      "me",
      "my",
      "please",
      "show",
      "find",
      "search",
      "some",
      "want",
      "need",
      "give",
      "get",
      "looking",
      "lookingfor",
      "something",

      // Hindi / Hinglish
      "mujhe",
      "meri",
      "mera",
      "mere",
      "mujhko",
      "chahiye",
      "hai",
      "hain",
      "ka",
      "ki",
      "ke",
      "ko",
      "mein",
      "me",
      "se",
      "par",
      "wala",
      "wali",
      "wale",
      "do",
      "dikhao",
      "batao",
      "bhi",
      "ek",
      "koi",
      "kuch",
      "acha",
      "accha",
      "achha",
    ]);

    // =====================================================
    // 4. PRICE FILTER
    // =====================================================

    let priceFilter = null;

    // -----------------------------------------------------
    // UNDER / BELOW / LESS THAN / UPTO
    // -----------------------------------------------------

    const underMatch = query.match(
      /(?:under|below|less\s+than|upto|up\s+to|max(?:imum)?)\s*(\d+(?:\.\d+)?)/i
    );

    if (underMatch) {
      priceFilter = {
        type: "max",
        max: Number(underMatch[1]),
      };
    }

    // -----------------------------------------------------
    // ABOVE / OVER / MORE THAN
    // -----------------------------------------------------

    if (!priceFilter) {
      const aboveMatch = query.match(
        /(?:above|over|more\s+than|greater\s+than|minimum|min)\s*(\d+(?:\.\d+)?)/i
      );

      if (aboveMatch) {
        priceFilter = {
          type: "min",
          min: Number(aboveMatch[1]),
        };
      }
    }

    // -----------------------------------------------------
    // BETWEEN
    // -----------------------------------------------------

    if (!priceFilter) {
      const betweenMatch = query.match(
        /between\s*(\d+(?:\.\d+)?)\s*(?:and|to|-)\s*(\d+(?:\.\d+)?)/i
      );

      if (betweenMatch) {
        const min = Number(betweenMatch[1]);
        const max = Number(betweenMatch[2]);

        priceFilter = {
          type: "range",
          min: Math.min(min, max),
          max: Math.max(min, max),
        };
      }
    }

    // -----------------------------------------------------
    // PRICE RANGE
    // Example: 500-1000
    // -----------------------------------------------------

    if (!priceFilter) {
      const rangeMatch = query.match(
        /(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/i
      );

      if (rangeMatch) {
        const min = Number(rangeMatch[1]);
        const max = Number(rangeMatch[2]);

        priceFilter = {
          type: "range",
          min: Math.min(min, max),
          max: Math.max(min, max),
        };
      }
    }

    // =====================================================
    // 5. EXACT PRICE
    // =====================================================

    if (!priceFilter) {
      const exactPriceMatch = query.match(
        /(?:^|\s)(\d+(?:\.\d+)?)(?:\s|$)/
      );

      if (exactPriceMatch) {
        const value = Number(exactPriceMatch[1]);

        if (value > 0) {
          priceFilter = {
            type: "exact",
            value,
          };
        }
      }
    }

    // =====================================================
    // 6. PRICE WORDS
    // =====================================================

    const priceIntent = {
      cheap: false,
      affordable: false,
      budget: false,
      expensive: false,
      premium: false,
    };

    const cheapWords = [
      "cheap",
      "cheapest",
      "affordable",
      "budget",
      "lowprice",
      "low",
      "sasta",
      "saste",
      "kam",
    ];

    const expensiveWords = [
      "expensive",
      "premium",
      "luxury",
      "luxurious",
      "highprice",
      "costly",
      "mehenga",
      "mehengi",
      "mahenga",
    ];

    if (
      cheapWords.some((word) =>
        query.includes(word)
      )
    ) {
      priceIntent.cheap = true;
    }

    if (
      expensiveWords.some((word) =>
        query.includes(word)
      )
    ) {
      priceIntent.expensive = true;
    }

    if (
      query.includes("affordable")
    ) {
      priceIntent.affordable = true;
    }

    if (
      query.includes("budget")
    ) {
      priceIntent.budget = true;
    }

    // =====================================================
    // 7. REMOVE PRICE PART FROM SEARCH QUERY
    // =====================================================

    let searchText = query;

    searchText = searchText
      .replace(
        /(?:under|below|less\s+than|upto|up\s+to|max(?:imum)?)\s*\d+(?:\.\d+)?/gi,
        " "
      )
      .replace(
        /(?:above|over|more\s+than|greater\s+than|minimum|min)\s*\d+(?:\.\d+)?/gi,
        " "
      )
      .replace(
        /between\s*\d+(?:\.\d+)?\s*(?:and|to|-)\s*\d+(?:\.\d+)?/gi,
        " "
      )
      .replace(
        /\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?/gi,
        " "
      )
      .replace(/\d+(?:\.\d+)?/g, " ")
      .replace(
        /\b(cheap|cheapest|affordable|budget|lowprice|low|sasta|saste|kam|expensive|premium|luxury|luxurious|highprice|costly|mehenga|mehengi|mahenga)\b/gi,
        " "
      )
      .replace(/\s+/g, " ")
      .trim();

    // =====================================================
    // 8. KEYWORDS
    // =====================================================

    const keywords = searchText
      .split(/\s+/)
      .map((word) =>
        word
          .replace(/[^\p{L}\p{N}]/gu, "")
          .trim()
      )
      .filter(
        (word) =>
          word.length > 1 &&
          !stopWords.has(word)
      );

    // =====================================================
    // 9. NO VALID SEARCH
    // =====================================================

    if (
      keywords.length === 0 &&
      !priceFilter &&
      !priceIntent.cheap &&
      !priceIntent.expensive
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid search",
      });
    }

    // =====================================================
    // 10. CREATE CONDITIONS
    // =====================================================

    const createConditions = (fields) => {
      return keywords.flatMap((keyword) => {
        const regex = {
          $regex: keyword,
          $options: "i",
        };

        return fields.map((field) => ({
          [field]: regex,
        }));
      });
    };

    // =====================================================
    // 11. SEARCH FIELDS
    // =====================================================

    const flowerConditions = createConditions([
      "name",
      "description",
      "color",
      "category",
      "occasion",
      "flowerType",
    ]);

    const bouquetConditions = createConditions([
      "name",
      "description",
      "category",
      "occasion",
      "size",
      "flowers",
    ]);

    const comboBouquetConditions = createConditions([
      "name",
      "description",
      "category",
      "occasion",
    ]);

    const flowerInBoxConditions = createConditions([
      "name",
      "description",
      "flowerType",
      "boxType",
      "color",
      "occasion",
      "size",
    ]);

    const flowerInSleeveConditions = createConditions([
      "name",
      "description",
      "flowerType",
      "sleeveType",
      "color",
      "occasion",
      "size",
    ]);

    const woolenConditions = createConditions([
      "name",
      "description",
      "category",
      "occasion",
    ]);

    // =====================================================
    // 12. FETCH PRODUCTS
    // =====================================================

    const [
      flowers,
      bouquets,
      comboBouquets,
      flowersInBox,
      flowersInSleeve,
      woolens,
    ] = await Promise.all([
      flowerModel.find(
        keywords.length
          ? { $or: flowerConditions }
          : {}
      ).lean(),

      bouquetModel.find(
        keywords.length
          ? { $or: bouquetConditions }
          : {}
      ).lean(),

      ComboBouquetModel.find(
        keywords.length
          ? { $or: comboBouquetConditions }
          : {}
      ).lean(),

      FlowerInBoxModel.find(
        keywords.length
          ? { $or: flowerInBoxConditions }
          : {}
      ).lean(),

      FlowerInSleeveModel.find(
        keywords.length
          ? { $or: flowerInSleeveConditions }
          : {}
      ).lean(),

      WoolenModel.find(
        keywords.length
          ? { $or: woolenConditions }
          : {}
      ).lean(),
    ]);

    // =====================================================
    // 13. ADD PRODUCT TYPE
    // =====================================================

    const allProducts = [
      ...flowers.map((product) => ({
        ...product,
        productType: "flower",
      })),

      ...bouquets.map((product) => ({
        ...product,
        productType: "bouquet",
      })),

      ...comboBouquets.map((product) => ({
        ...product,
        productType: "comboBouquet",
      })),

      ...flowersInBox.map((product) => ({
        ...product,
        productType: "flowerInBox",
      })),

      ...flowersInSleeve.map((product) => ({
        ...product,
        productType: "flowerInSleeve",
      })),

      ...woolens.map((product) => ({
        ...product,
        productType: "woolen",
      })),
    ];

    // =====================================================
    // 14. NORMALIZE
    // =====================================================

    const normalize = (value) => {
      if (
        value === null ||
        value === undefined
      ) {
        return "";
      }

      if (Array.isArray(value)) {
        return value
          .join(" ")
          .toLowerCase();
      }

      return String(value).toLowerCase();
    };

    // =====================================================
    // 15. PRICE MATCH
    // =====================================================

    const isPriceMatch = (price) => {
      if (!priceFilter) {
        return true;
      }

      const productPrice = Number(price);

      if (Number.isNaN(productPrice)) {
        return false;
      }

      if (priceFilter.type === "exact") {
        return (
          productPrice ===
          priceFilter.value
        );
      }

      if (priceFilter.type === "max") {
        return (
          productPrice <=
          priceFilter.max
        );
      }

      if (priceFilter.type === "min") {
        return (
          productPrice >=
          priceFilter.min
        );
      }

      if (priceFilter.type === "range") {
        return (
          productPrice >=
            priceFilter.min &&
          productPrice <=
            priceFilter.max
        );
      }

      return true;
    };

    // =====================================================
    // 16. PRICE SCORE
    // =====================================================

    const getPriceScore = (price) => {
      const productPrice = Number(price);

      if (Number.isNaN(productPrice)) {
        return 0;
      }

      // ---------------------------------------------------
      // Exact price
      // ---------------------------------------------------

      if (
        priceFilter?.type === "exact"
      ) {
        if (
          productPrice ===
          priceFilter.value
        ) {
          return 100;
        }

        const difference = Math.abs(
          productPrice -
            priceFilter.value
        );

        if (difference <= 100) {
          return 35;
        }

        if (difference <= 250) {
          return 15;
        }

        return 0;
      }

      // ---------------------------------------------------
      // Under
      // ---------------------------------------------------

      if (
        priceFilter?.type === "max"
      ) {
        return productPrice <=
          priceFilter.max
          ? 60
          : 0;
      }

      // ---------------------------------------------------
      // Above
      // ---------------------------------------------------

      if (
        priceFilter?.type === "min"
      ) {
        return productPrice >=
          priceFilter.min
          ? 60
          : 0;
      }

      // ---------------------------------------------------
      // Range
      // ---------------------------------------------------

      if (
        priceFilter?.type === "range"
      ) {
        return (
          productPrice >=
            priceFilter.min &&
          productPrice <=
            priceFilter.max
        )
          ? 70
          : 0;
      }

      // ---------------------------------------------------
      // Cheap / affordable / budget
      // ---------------------------------------------------

      if (
        priceIntent.cheap ||
        priceIntent.affordable ||
        priceIntent.budget
      ) {
        // Lower price = higher score.
        return Math.max(
          0,
          100 -
            Math.min(
              productPrice / 10,
              100
            )
        );
      }

      // ---------------------------------------------------
      // Expensive / premium / luxury
      // ---------------------------------------------------

      if (
        priceIntent.expensive
      ) {
        return Math.min(
          productPrice / 10,
          100
        );
      }

      return 0;
    };

    // =====================================================
    // 17. TEXT RELEVANCE SCORE
    // =====================================================

    const getScore = (product) => {
      let score = 0;

      const name = normalize(
        product.name
      );

      const description = normalize(
        product.description
      );

      const category = normalize(
        product.category
      );

      const occasion = normalize(
        product.occasion
      );

      const color = normalize(
        product.color
      );

      const flowerType = normalize(
        product.flowerType
      );

      const boxType = normalize(
        product.boxType
      );

      const sleeveType = normalize(
        product.sleeveType
      );

      const size = normalize(
        product.size
      );

      // ===================================================
      // EACH KEYWORD
      // ===================================================

      keywords.forEach((keyword) => {
        // -------------------------------------------------
        // NAME
        // -------------------------------------------------

        if (name === keyword) {
          score += 150;
        } else if (
          name.includes(keyword)
        ) {
          score += 80;
        }

        // -------------------------------------------------
        // CATEGORY
        // -------------------------------------------------

        if (
          category === keyword
        ) {
          score += 70;
        } else if (
          category.includes(keyword)
        ) {
          score += 40;
        }

        // -------------------------------------------------
        // OCCASION
        // -------------------------------------------------

        if (
          occasion === keyword
        ) {
          score += 65;
        } else if (
          occasion.includes(keyword)
        ) {
          score += 40;
        }

        // -------------------------------------------------
        // FLOWER TYPE
        // -------------------------------------------------

        if (
          flowerType === keyword
        ) {
          score += 65;
        } else if (
          flowerType.includes(keyword)
        ) {
          score += 40;
        }

        // -------------------------------------------------
        // COLOR
        // -------------------------------------------------

        if (
          color === keyword
        ) {
          score += 55;
        } else if (
          color.includes(keyword)
        ) {
          score += 35;
        }

        // -------------------------------------------------
        // BOX TYPE
        // -------------------------------------------------

        if (
          boxType.includes(keyword)
        ) {
          score += 35;
        }

        // -------------------------------------------------
        // SLEEVE TYPE
        // -------------------------------------------------

        if (
          sleeveType.includes(keyword)
        ) {
          score += 35;
        }

        // -------------------------------------------------
        // SIZE
        // -------------------------------------------------

        if (
          size.includes(keyword)
        ) {
          score += 30;
        }

        // -------------------------------------------------
        // DESCRIPTION
        // -------------------------------------------------

        if (
          description.includes(keyword)
        ) {
          score += 15;
        }
      });

      // ===================================================
      // ALL KEYWORDS MATCH BONUS
      // ===================================================

      if (
        keywords.length > 1
      ) {
        const everyKeywordMatched =
          keywords.every(
            (keyword) =>
              name.includes(keyword) ||
              category.includes(keyword) ||
              occasion.includes(keyword) ||
              flowerType.includes(keyword) ||
              color.includes(keyword) ||
              description.includes(keyword) ||
              boxType.includes(keyword) ||
              sleeveType.includes(keyword) ||
              size.includes(keyword)
          );

        if (
          everyKeywordMatched
        ) {
          score += 100;
        }
      }

      // ===================================================
      // PRICE
      // ===================================================

      score += getPriceScore(
        product.price
      );

      // ===================================================
      // AVAILABILITY
      // ===================================================

      if (
        product.isAvailable === true
      ) {
        score += 15;
      }

      return score;
    };

    // =====================================================
    // 18. FILTER + SCORE
    // =====================================================

    const scoredProducts =
      allProducts
        .filter((product) =>
          isPriceMatch(
            product.price
          )
        )
        .map((product) => ({
          ...product,
          searchScore:
            getScore(product),
        }))
        .filter(
          (product) =>
            product.searchScore > 0
        );

    // =====================================================
    // 19. REMOVE DUPLICATES
    // =====================================================

    const uniqueProducts = Array.from(
      new Map(
        scoredProducts.map(
          (product) => [
            `${product.productType}-${product._id}`,
            product,
          ]
        )
      ).values()
    );

    // =====================================================
    // 20. SORT
    // =====================================================

    uniqueProducts.sort(
      (a, b) => {
        // Highest relevance first
        if (
          b.searchScore !==
          a.searchScore
        ) {
          return (
            b.searchScore -
            a.searchScore
          );
        }

        // Available first
        if (
          Boolean(b.isAvailable) !==
          Boolean(a.isAvailable)
        ) {
          return b.isAvailable
            ? 1
            : -1;
        }

        // Lower price first
        return (
          Number(a.price || 0) -
          Number(b.price || 0)
        );
      }
    );

    // =====================================================
    // 21. LIMIT
    // =====================================================

    const products =
      uniqueProducts.slice(0, 50);

    // =====================================================
    // 22. RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      query: originalQuery,

      totalResults:
        products.length,

      priceFilter,

      priceIntent,

      products,
    });
  } catch (error) {
    console.error(
      "Global Search Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
};

import groq from "../configs/groq.js";

import bouquetModel from "../models/Bouquet.js";
import CardModel from "../models/Card.js";
import ChocolateModel from "../models/Chocolate.js";
import ComboBouquetModel from "../models/ComboBouquet.js";
import flowerModel from "../models/Flower.js";
import FlowerInBoxModel from "../models/FlowerInBoxModel.js";
import FlowerInSleeveModel from "../models/FlowerInSleeveModel.js";
import MiniCupcakeModel from "../models/MiniCupCake.js";
import WoolenModel from "../models/Woolen.js";

export const getAIRecommendation = async (req, res) => {
  try {
    const { question } = req.body;

    // ==================================================
    // VALIDATE QUESTION
    // ==================================================

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // ==================================================
    // CONVERSATION PARSING
    // ==================================================

    const conversationLines = question
      .split("\n")
      .map((line) =>
        line.replace(/^User:\s*/i, "").trim()
      )
      .filter(Boolean);

    const latestUserMessage =
      conversationLines[
        conversationLines.length - 1
      ] || question;

    const lowerLatestMessage =
      latestUserMessage.toLowerCase().trim();

    const previousMessages =
      conversationLines.slice(0, -1);

    // ==================================================
    // PREVIOUSLY RECOMMENDED PRODUCT IDS
    // ==================================================

    const previouslyRecommendedProductIds = [];

    question.split("\n").forEach((line) => {
      if (
        line
          .trim()
          .startsWith("AI Recommended Product IDs:")
      ) {
        const ids = line
          .replace(
            "AI Recommended Product IDs:",
            ""
          )
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean);

        previouslyRecommendedProductIds.push(
          ...ids
        );
      }
    });

    // ==================================================
    // EXTRACT BUDGET
    // ==================================================

    const extractBudget = (text) => {
      if (!text) return null;

      const cleanText = text
        .toLowerCase()
        .replace(/,/g, "")
        .trim();

      const match = cleanText.match(
        /(?:₹|rs\.?|rupees?|inr)?\s*(\d+(?:\.\d+)?)\s*(k)?\b/i
      );

      if (!match) return null;

      let amount = Number(match[1]);

      if (match[2]?.toLowerCase() === "k") {
        amount = amount * 1000;
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        return null;
      }

      const isStandaloneAmount =
        /^[₹\s]*(?:rs\.?\s*)?\d+(?:\.\d+)?\s*k?\s*$/i.test(
          text.trim()
        );

      const hasBudgetWord =
        cleanText.includes("budget") ||
        cleanText.includes("under") ||
        cleanText.includes("within") ||
        cleanText.includes("upto") ||
        cleanText.includes("up to") ||
        cleanText.includes("rupees") ||
        cleanText.includes("rs") ||
        cleanText.includes("inr") ||
        cleanText.includes("₹") ||
        cleanText.includes("ke andar") ||
        cleanText.includes("tak");

      if (hasBudgetWord || isStandaloneAmount) {
        return amount;
      }

      return null;
    };

    // ==================================================
    // FIND BUDGET FROM COMPLETE CONVERSATION
    // ==================================================

    let budget = extractBudget(
      latestUserMessage
    );

    if (budget === null) {
      for (
        let i = conversationLines.length - 1;
        i >= 0;
        i--
      ) {
        const detectedBudget =
          extractBudget(conversationLines[i]);

        if (detectedBudget !== null) {
          budget = detectedBudget;
          break;
        }
      }
    }

    // ==================================================
    // DETECT RELATIONSHIP
    // ==================================================

    const relationshipPattern =
      /\b(bhai|brother|sister|behen|sis|mom|mother|mummy|maa|dad|father|papa|friend|best friend|girlfriend|boyfriend|wife|husband|cousin|uncle|aunty|teacher|colleague)\b/i;

    let relationship = null;

    const relationshipMatch =
      question.match(relationshipPattern);

    if (relationshipMatch) {
      relationship =
        relationshipMatch[0].toLowerCase();
    }

    const hasRelationship =
      relationship !== null;

    // ==================================================
    // DETECT OCCASION
    // ==================================================

    const occasionPattern =
      /\b(birthday|janamdin|janmadin|anniversary|valentine|valentines|wedding|marriage|farewell|congratulations|congrats|graduation|baby shower|housewarming|festival|rakhi|rakshabandhan|diwali|christmas|new year)\b/i;

    let occasion = null;

    const occasionMatch =
      question.match(occasionPattern);

    if (occasionMatch) {
      occasion =
        occasionMatch[0].toLowerCase();
    }

    const hasOccasion =
      occasion !== null;

    // ==================================================
    // DETECT COLOR
    // ==================================================

    const colorPattern =
      /\b(red|pink|blue|yellow|white|black|purple|violet|orange|green|peach|lavender|maroon|magenta|cream|golden|gold|silver|multicolor|multi color|mixed|pastel)\b/i;

    let preferredColor = null;

    const colorMatch =
      question.match(colorPattern);

    if (colorMatch) {
      preferredColor =
        colorMatch[0].toLowerCase();
    }

    // ==================================================
    // DETECT SPECIFIC PRODUCT TYPE
    // ==================================================

    let preferredType = null;

    if (
      lowerLatestMessage.includes(
        "flower in box"
      ) ||
      lowerLatestMessage.includes(
        "flower box"
      ) ||
      lowerLatestMessage.includes(
        "boxed flower"
      )
    ) {
      preferredType = "FlowerInBox";
    } else if (
      lowerLatestMessage.includes(
        "flower in sleeve"
      ) ||
      lowerLatestMessage.includes(
        "flower sleeve"
      ) ||
      lowerLatestMessage.includes(
        "sleeve flower"
      )
    ) {
      preferredType = "FlowerInSleeve";
    } else if (
      lowerLatestMessage.includes(
        "combo bouquet"
      ) ||
      lowerLatestMessage.includes("combo")
    ) {
      preferredType = "ComboBouquet";
    } else if (
      lowerLatestMessage.includes(
        "woolen bouquet"
      ) ||
      lowerLatestMessage.includes("woolen")
    ) {
      preferredType = "Woolen";
    } else if (
      /\bbouquets?\b/i.test(
        lowerLatestMessage
      )
    ) {
      preferredType = "Bouquet";
    } else if (
      /\bflowers?\b/i.test(
        lowerLatestMessage
      )
    ) {
      preferredType = "Flower";
    }

    // ==================================================
    // DETECT GIFT INTENT
    // ==================================================

    const productActionPattern =
      /\b(show|suggest|recommend|recommendation|give me|find me|looking for|want|need|buy|purchase|choose|options|products?|gift|gifts|gift ideas?|idea|ideas|what should i give|what can i give|which gift|which one|something|chahiye|batao|batana|suggest karo|dikhao|dikhana|kharidna|lena|de do|de sakte|kya du|kya doon|alag|different|another|more|aur|aur dikhao|kuch aur|different options|aur options|dusra|dusre|naye|new options)\b/i;

    const explicitProductIntent =
      productActionPattern.test(
        lowerLatestMessage
      );

    // ==================================================
    // NORMAL CONVERSATION
    // ==================================================

    const normalConversationPattern =
      /^(hi|hello|hey|hii|helo|do you know me|do you know english|can you speak english|what can you do|who are you|how are you|thanks|thank you|okay|ok|good morning|good evening|good night|nice to meet you)\b/i;

    const isNormalConversation =
      normalConversationPattern.test(
        lowerLatestMessage
      );

    // ==================================================
    // PREVIOUS GIFT CONVERSATION
    // ==================================================

    const previousGiftConversation =
      previousMessages.some((message) =>
        /\b(gift|gifts|birthday|janamdin|anniversary|occasion|present|give|giving|bhai|brother|sister|behen|mom|mother|mummy|dad|father|papa|friend|girlfriend|boyfriend|wife|husband|chahiye|suggest|recommend|buy|purchase|idea|ideas)\b/i.test(
          message
        )
      );

    // ==================================================
    // ONLY BUDGET
    // ==================================================

    const latestIsOnlyBudget =
      extractBudget(latestUserMessage) !== null &&
      /^[₹\s]*(?:rs\.?\s*)?\d+(?:\.\d+)?\s*k?\s*$/i.test(
        latestUserMessage.trim()
      );

    // ==================================================
    // FINAL PRODUCT REQUEST
    // ==================================================

    let isProductRequest = false;

    if (isNormalConversation) {
      isProductRequest = false;
    } else if (explicitProductIntent) {
      isProductRequest = true;
    } else if (
      latestIsOnlyBudget &&
      previousGiftConversation
    ) {
      isProductRequest = true;
    } else if (
      (hasOccasion || hasRelationship) &&
      previousGiftConversation
    ) {
      isProductRequest = true;
    }

    // ==================================================
    // GET PRODUCTS FROM DATABASE
    // ==================================================

    const [
      bouquets,
      cards,
      chocolates,
      comboBouquets,
      flowers,
      flowersInBox,
      flowersInSleeve,
      miniCupcakes,
      woolens,
    ] = await Promise.all([
      bouquetModel
        .find(
          {
            isAvailable: true,
            stock: { $gt: 0 },
          },
          "name description price occasion category size flowers image"
        )
        .limit(10)
        .lean(),

      CardModel
        .find(
          {
            isAvailable: true,
            stock: { $gt: 0 },
          },
          "name description price occasion category image"
        )
        .limit(3)
        .lean(),

      ChocolateModel
        .find(
          {
            isAvailable: true,
            stock: { $gt: 0 },
          },
          "name description price size category image"
        )
        .limit(3)
        .lean(),

      ComboBouquetModel
        .find(
          {
            isAvailable: true,
            stock: { $gt: 0 },
          },
          "name description price occasion category image"
        )
        .limit(10)
        .lean(),

      flowerModel
        .find(
          {
            isAvailable: true,
            stock: { $gt: 0 },
          },
          "name description price color category image"
        )
        .limit(10)
        .lean(),

      FlowerInBoxModel
        .find(
          {
            isAvailable: true,
            stock: { $gt: 0 },
          },
          "name description price discountPrice flowerType boxType color occasion size image"
        )
        .limit(10)
        .lean(),

      FlowerInSleeveModel
        .find(
          {
            isAvailable: true,
            stock: { $gt: 0 },
          },
          "name description price discountPrice flowerType sleeveType color occasion size image"
        )
        .limit(10)
        .lean(),

      MiniCupcakeModel
        .find(
          {
            isAvailable: true,
            stock: { $gt: 0 },
          },
          "name description price occasion flavor quantity category image"
        )
        .limit(3)
        .lean(),

      WoolenModel
        .find(
          {
            isAvailable: true,
            stock: { $gt: 0 },
          },
          "name description price occasion category image"
        )
        .limit(10)
        .lean(),
    ]);

    // ==================================================
    // COMBINE PRODUCTS
    // ==================================================

    const products = [
      ...bouquets.map((item) => ({
        type: "Bouquet",
        ...item,
      })),

      ...cards.map((item) => ({
        type: "Card",
        ...item,
      })),

      ...chocolates.map((item) => ({
        type: "Chocolate",
        ...item,
      })),

      ...comboBouquets.map((item) => ({
        type: "ComboBouquet",
        ...item,
      })),

      ...flowers.map((item) => ({
        type: "Flower",
        ...item,
      })),

      ...flowersInBox.map((item) => ({
        type: "FlowerInBox",
        ...item,
      })),

      ...flowersInSleeve.map((item) => ({
        type: "FlowerInSleeve",
        ...item,
      })),

      ...miniCupcakes.map((item) => ({
        type: "MiniCupcake",
        ...item,
      })),

      ...woolens.map((item) => ({
        type: "Woolen",
        ...item,
      })),
    ];

    // ==================================================
    // ONLY MAIN WEBSITE GIFT PRODUCTS
    // ==================================================

    const mainProducts = products.filter(
      (product) =>
        product.type !== "Chocolate" &&
        product.type !== "Card" &&
        product.type !== "MiniCupcake"
    );

    // ==================================================
    // FILTER BY BUDGET
    // ==================================================

    let productsForAI = mainProducts;

    if (budget !== null) {
      productsForAI = productsForAI.filter(
        (product) => {
          const finalPrice = Number(
            product.discountPrice ??
              product.price
          );

          return finalPrice <= budget;
        }
      );
    }

    // ==================================================
    // FILTER BY COLOR
    // ==================================================

    if (preferredColor) {
      const colorProducts =
        productsForAI.filter((product) => {
          const productColor =
            product.color?.toString().toLowerCase() ||
            "";

          const productDescription =
            product.description
              ?.toString()
              .toLowerCase() || "";

          const productName =
            product.name
              ?.toString()
              .toLowerCase() || "";

          return (
            productColor.includes(preferredColor) ||
            productDescription.includes(preferredColor) ||
            productName.includes(preferredColor)
          );
        });

      // Agar matching color products hain
      // toh sirf wahi use honge.
      if (colorProducts.length > 0) {
        productsForAI = colorProducts;
      }
    }

    // ==================================================
    // FILTER BY SPECIFIC PRODUCT TYPE
    // ==================================================

    if (preferredType) {
      const preferredProducts =
        productsForAI.filter(
          (product) =>
            product.type === preferredType
        );

      if (preferredProducts.length > 0) {
        productsForAI = preferredProducts;
      } else {
        productsForAI = [];
      }
    }

    // ==================================================
    // NORMAL CONVERSATION
    // ==================================================

    if (!isProductRequest) {
      const completion =
        await groq.chat.completions.create({
          model: "openai/gpt-oss-120b",

          messages: [
            {
              role: "system",

              content: `
You are a friendly AI gift assistant for a flower bouquet e-commerce website.

The user is having a normal conversation.

Answer naturally and briefly.

This assistant belongs to a flower bouquet e-commerce website.

If the user asks about gift ideas,
only suggest things available on this website.

Website categories:

- Bouquet
- ComboBouquet
- Flower
- FlowerInBox
- FlowerInSleeve
- Woolen

Do NOT suggest unrelated products such as:

- phones
- headphones
- watches
- gadgets
- clothes
- wallets
- perfumes
- keychains
- photo frames
- trips
- restaurants
- adventure activities
- workshops

Do NOT directly recommend:

- Chocolate
- Card
- MiniCupcake

Do NOT create product IDs.

Do NOT invent product names.

Do NOT show product cards.

Use the SAME language and writing style as the user.

English -> English.
Hindi Roman -> Hindi Roman.
Hinglish -> natural Hinglish Roman.

Never use Devanagari unless the user uses Devanagari.

Keep the answer short.

Do not ask unnecessary questions.
`,
            },

            {
              role: "user",
              content: question,
            },
          ],

          max_tokens: 250,
        });

      const aiResponse =
        completion.choices[0]?.message?.content?.trim() ||
        "Yes, I’m here to help you. 😊";

      return res.status(200).json({
        success: true,
        answer: aiResponse,
        products: [],
      });
    }

    // ==================================================
    // EXPLICIT SHOW REQUEST
    // ==================================================

    const explicitShowRequest =
      /\b(show|dikhao|dikhana|give me|find me|options|products?|dikha|display)\b/i.test(
        lowerLatestMessage
      );

    // ==================================================
    // GIFT IDEA WITHOUT BUDGET
    // ==================================================

    if (
      isProductRequest &&
      budget === null &&
      !preferredType &&
      !explicitShowRequest
    ) {
      const completion =
        await groq.chat.completions.create({
          model: "openai/gpt-oss-120b",

          messages: [
            {
              role: "system",

              content: `
You are a friendly AI gift assistant for a flower bouquet e-commerce website.

The user wants gift ideas.

Only talk about gifts available on this website.

Website categories:

- Bouquet
- ComboBouquet
- Flower
- FlowerInBox
- FlowerInSleeve
- Woolen

Do NOT suggest unrelated gifts.

Do NOT directly recommend:

- Chocolate
- Card
- MiniCupcake

If the user has already mentioned the occasion
and relationship, do not ask them again.

Tell them 2-4 suitable types of gifts from the website
and then ask only for their budget.

Use the SAME language/style as the user.

English -> English.
Hindi Roman -> Hindi Roman.
Hinglish -> natural Hinglish Roman.

Never use Devanagari unless the user uses Devanagari.

Keep the response short and natural.

Do not mention product names.
Do not show product cards.
`,
            },

            {
              role: "user",
              content: question,
            },
          ],

          max_tokens: 200,
        });

      const aiResponse =
        completion.choices[0]?.message?.content?.trim() ||
        "Bhai ke liye bouquet ya flower arrangement ek accha gift ho sakta hai. 🌸 Aapka budget bata do, main suitable options dikha dunga. 😊";

      return res.status(200).json({
        success: true,
        answer: aiResponse,
        products: [],
      });
    }

    // ==================================================
    // REMOVE PREVIOUSLY SHOWN PRODUCTS
    // ==================================================

    const alreadyShownProductIds =
      new Set(
        previouslyRecommendedProductIds.map(
          (id) => String(id)
        )
      );

    let productsToShow =
      productsForAI.filter(
        (product) =>
          !alreadyShownProductIds.has(
            product._id.toString()
          )
      );

    // ==================================================
    // ASKING FOR DIFFERENT / MORE OPTIONS
    // ==================================================

    const askingForDifferent =
      /\b(alag|different|another|more|aur|aur dikhao|kuch aur|different options|aur options|dusra|dusre|naye|new options)\b/i.test(
        lowerLatestMessage
      );

    // ==================================================
    // NO NEW PRODUCTS
    // ==================================================

    if (
      askingForDifferent &&
      productsToShow.length === 0
    ) {
      return res.status(200).json({
        success: true,

        answer:
          budget !== null
            ? `Sorry 😊 abhi ₹${budget} ke andar aur different options available nahi hain.`
            : "Sorry 😊 abhi aur different options available nahi hain.",

        products: [],
      });
    }

    // ==================================================
    // NO PRODUCTS AVAILABLE
    // ==================================================

    if (
      isProductRequest &&
      productsToShow.length === 0
    ) {
      let message = "";

      if (preferredColor && budget !== null) {
        message =
          `Aapke ₹${budget} budget mein ${preferredColor} color ka abhi koi suitable product available nahi mila.`;
      } else if (preferredType && budget !== null) {
        message =
          `Aapke ₹${budget} budget mein abhi koi suitable ${preferredType} available nahi mila.`;
      } else if (preferredType) {
        message =
          `Sorry, abhi koi suitable ${preferredType} available nahi mila.`;
      } else if (budget !== null) {
        message =
          `Aapke ₹${budget} budget mein abhi koi suitable product available nahi mila.`;
      } else {
        message =
          "Sorry, abhi koi suitable product available nahi mila.";
      }

      return res.status(200).json({
        success: true,
        answer: message,
        products: [],
      });
    }

    // ==================================================
    // LIMIT PRODUCTS SENT TO AI
    // ==================================================

    const productsForResponse =
      productsToShow.slice(0, 6);

    // ==================================================
    // PRODUCT DATA FOR AI
    // ==================================================

    const productData =
      productsForResponse.map((product) => ({
        id: product._id.toString(),

        type: product.type,

        name: product.name,

        description:
          product.description || "",

        price: product.price,

        discountPrice:
          product.discountPrice ?? null,

        occasion:
          product.occasion || null,

        category:
          product.category || null,

        size:
          product.size || null,

        color:
          product.color || null,

        flowerType:
          product.flowerType || null,

        flowers:
          product.flowers || null,

        flavor:
          product.flavor || null,

        quantity:
          product.quantity || null,
      }));

    // ==================================================
    // AI GENERATES ONLY TEXT
    // ==================================================

    const completion =
      await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",

        messages: [
          {
            role: "system",

            content: `
You are a friendly AI gift recommendation assistant
for a flower bouquet e-commerce website.

The backend has already selected suitable products.

Your job is ONLY to write a short natural response.

==================================================
WEBSITE RULE
==================================================

Only recommend products from this website.

Main website gift categories:

- Bouquet
- ComboBouquet
- Flower
- FlowerInBox
- FlowerInSleeve
- Woolen

Do NOT recommend unrelated gifts.

Do NOT directly recommend:

- Chocolate
- Card
- MiniCupcake

==================================================
PRODUCT RULES
==================================================

The backend has already selected the suitable products.

Only talk about the products provided below.

Do NOT invent:

- product names
- prices
- product IDs
- availability
- features

Do NOT generate JSON.

Do NOT generate product IDs.

The frontend will automatically show the product cards.

==================================================
CONVERSATION RULE
==================================================

Use the COMPLETE conversation.

If the user has already provided:

- occasion
- relationship
- budget
- color
- product type

do NOT ask for those details again.

If the user asks for different/more options,
do not talk about previously shown products.

==================================================
LANGUAGE
==================================================

Reply in the SAME language and writing style
as the user's latest message.

English -> English.
Hindi Roman -> Hindi Roman.
Hinglish -> natural Hinglish Roman.
Mixed Hindi/English -> same natural mix.

Never use Devanagari unless the user uses Devanagari.

==================================================
RESPONSE STYLE
==================================================

Keep the response short.

If the user provided a budget,
mention that the options are within the budget.

If the user provided a color,
naturally mention that the options match
their requested color when appropriate.

Do not ask unnecessary questions.

Do not write long explanations.

==================================================
AVAILABLE PRODUCTS
==================================================

${JSON.stringify(productData)}

These are the ONLY products you may talk about.
`,
          },

          {
            role: "user",
            content: question,
          },
        ],

        max_tokens: 250,
      });

    // ==================================================
    // AI ANSWER
    // ==================================================

    const aiResponse =
      completion.choices[0]?.message?.content?.trim() ||
      "";

    // ==================================================
    // BACKEND SELECTS FINAL PRODUCTS
    // ==================================================

    const recommendedProducts =
      productsToShow
        .slice(0, 2)
        .map((product) => ({
          id: product._id,

          type: product.type,

          name: product.name,

          description:
            product.description || "",

          price: product.price,

          discountPrice:
            product.discountPrice ?? null,

          image: product.image,

          occasion:
            product.occasion || null,

          category:
            product.category || null,

          size:
            product.size || null,

          color:
            product.color || null,

          flowerType:
            product.flowerType || null,

          flowers:
            product.flowers || null,

          flavor:
            product.flavor || null,

          quantity:
            product.quantity || null,
        }));

    // ==================================================
    // FALLBACK ANSWER
    // ==================================================

    let finalAnswer = aiResponse;

    if (!finalAnswer) {
      if (askingForDifferent) {
        finalAnswer =
          "Here are some different options for you. 😊";
      } else if (preferredColor && budget !== null) {
        finalAnswer =
          `Here are some ${preferredColor} options within ₹${budget}. 😊`;
      } else if (preferredType) {
        finalAnswer =
          "Here are some suitable options for you. 😊";
      } else if (budget !== null) {
        finalAnswer =
          `Here are some suitable options within ₹${budget}. 😊`;
      } else {
        finalAnswer =
          "Here are some suitable options for you. 😊";
      }
    }

    // ==================================================
    // FINAL RESPONSE
    // ==================================================

    return res.status(200).json({
      success: true,
      answer: finalAnswer,
      products: recommendedProducts,
    });
  } catch (error) {
    console.error(
      "AI Recommendation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "AI recommendation failed",
    });
  }
};
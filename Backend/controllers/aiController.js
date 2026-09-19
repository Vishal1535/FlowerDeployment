import groq from "../configs/groq.js";

import bouquetModel from "../models/Bouquet.js";
import ComboBouquetModel from "../models/ComboBouquet.js";
import flowerModel from "../models/Flower.js";
import FlowerInBoxModel from "../models/FlowerInBoxModel.js";
import FlowerInSleeveModel from "../models/FlowerInSleeveModel.js";
import WoolenModel from "../models/Woolen.js";

export const getAIRecommendation = async (req, res) => {
  try {
    const { question } = req.body;

    // =========================================================
    // VALIDATE
    // =========================================================

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // =========================================================
    // PARSE COMPLETE CONVERSATION
    // =========================================================

    const lines = question
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const userMessages = [];
    const previouslyRecommendedProductIds = [];

    for (const line of lines) {
      // -------------------------------------------------------
      // USER MESSAGE
      // -------------------------------------------------------

      const userMatch = line.match(/^User:\s*(.*)$/i);

      if (userMatch) {
        const message = userMatch[1].trim();

        if (message) {
          userMessages.push(message);
        }

        continue;
      }

      // -------------------------------------------------------
      // PREVIOUS PRODUCT IDS
      // -------------------------------------------------------

      const idsMatch = line.match(
        /^AI Recommended Product IDs:\s*(.*)$/i
      );

      if (idsMatch) {
        const ids = idsMatch[1]
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean);

        previouslyRecommendedProductIds.push(...ids);
      }
    }

    // =========================================================
    // FALLBACK
    // =========================================================

    if (userMessages.length === 0) {
      userMessages.push(question.trim());
    }

    const latestUserMessage =
      userMessages[userMessages.length - 1];

    const previousUserMessages =
      userMessages.slice(0, -1);

    const lowerLatestMessage =
      latestUserMessage.toLowerCase().trim();

    // =========================================================
    // LANGUAGE DETECTION
    // =========================================================

    const strongRomanHindiWords = new Set([
      "mujhe",
      "mera",
      "meri",
      "mere",
      "mujhko",
      "mujhse",

      "aap",
      "aapka",
      "aapki",
      "aapke",
      "aapko",

      "apka",
      "apki",
      "apke",
      "apko",

      "kya",
      "kaise",
      "kaunsa",
      "kaunsi",
      "kaun",
      "kis",
      "kiske",

      "batao",
      "batana",

      "dikhao",
      "dikhana",
      "dikha",

      "chahiye",
      "lena",
      "lelo",
      "lijiye",

      "bhi",

      "nahi",
      "nahin",

      "hai",
      "hain",

      "tha",
      "thi",
      "the",

      "raha",
      "rahi",
      "rahe",

      "hoon",
      "hu",

      "karna",
      "karu",
      "karo",

      "do",
      "du",
      "doon",

      "dena",
      "dunga",
      "dungi",

      "andar",
      "tak",

      "kam",
      "zyada",
      "thoda",
      "kuch",

      "acha",
      "accha",
      "achha",
    ]);

    const singleWordHindiWords = new Set([
      "kya",
      "hai",
      "hain",
      "mujhe",
      "mera",
      "meri",
      "mere",
      "aap",
      "aapka",
      "aapki",
      "aapke",
      "aapko",
      "apka",
      "apki",
      "apke",
      "apko",
      "batao",
      "batana",
      "dikhao",
      "dikhana",
      "dikha",
      "chahiye",
      "lijiye",
      "lelo",
      "nahi",
      "nahin",
      "kaise",
      "kaunsa",
      "kaunsi",
      "kaun",
      "kis",
      "bhai",
      "behen",
      "behan",
      "mummy",
      "maa",
      "papa",
      "acha",
      "accha",
      "achha",
      "haan",
      "ha",
    ]);

    const hinglishPhrasePatterns = [
      /\bmujhe\b/i,
      /\bmujhko\b/i,
      /\bmera\b/i,
      /\bmeri\b/i,
      /\bmere\b/i,

      /\baapko\b/i,
      /\baapka\b/i,
      /\baapki\b/i,
      /\baapke\b/i,

      /\bapko\b/i,
      /\bapka\b/i,
      /\bapki\b/i,
      /\bapke\b/i,

      /\bkya\s+(hai|chahiye|du|doon|lena|karu|karo)\b/i,

      /\bkaunsa\b/i,
      /\bkaunsi\b/i,

      /\bke\s+liye\b/i,
      /\bke\s+andar\b/i,
      /\bke\s+baare\b/i,

      /\bkitna\s+budget\b/i,
      /\bkitne\s+(ka|ke|mein)\b/i,

      /\b\d+\s+(ke|ka)\s+andar\b/i,

      /\b(batao|batana)\b/i,
      /\b(dikhao|dikhana|dikha)\b/i,

      /\b(karna|karu|karo)\s+(hai|hoga|hogi)\b/i,

      /\b(lena|lelo|lijiye)\s+(hai|chahiye)\b/i,

      /\b(de\s+do|de\s+dona)\b/i,

      /\b(kam|zyada|thoda)\s+budget\b/i,

      /\b(kuch|thoda)\s+(aur|different)\b/i,

      /\b(haan|ha)\s+(dikhao|batao|karo)\b/i,
    ];

    const detectLanguage = (text) => {
      if (!text || !text.trim()) {
        return "ENGLISH";
      }

      const cleanText = text.trim();

      // -------------------------------------------------------
      // HINDI DEVANAGARI
      // -------------------------------------------------------

      if (/[\u0900-\u097F]/.test(cleanText)) {
        return "HINDI_DEVANAGARI";
      }

      // -------------------------------------------------------
      // WORDS
      // -------------------------------------------------------

      const words = cleanText
        .toLowerCase()
        .replace(/[^a-zA-Z\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean);

      if (words.length === 0) {
        return "ENGLISH";
      }

      // -------------------------------------------------------
      // SINGLE CLEAR HINDI WORD
      // -------------------------------------------------------

      if (
        words.length === 1 &&
        singleWordHindiWords.has(words[0])
      ) {
        return "HINGLISH_ROMAN";
      }

      // -------------------------------------------------------
      // STRONG HINGLISH PHRASE
      // -------------------------------------------------------

      const hasStrongHinglishPhrase =
        hinglishPhrasePatterns.some((pattern) =>
          pattern.test(cleanText)
        );

      if (hasStrongHinglishPhrase) {
        return "HINGLISH_ROMAN";
      }

      // -------------------------------------------------------
      // ROMAN HINDI WORD COUNT
      // -------------------------------------------------------

      const hindiWordCount = words.filter((word) =>
        strongRomanHindiWords.has(word)
      ).length;

      /*
        IMPORTANT:

        English words such as:
        me
        my
        can
        you
        brother
        birthday
        gift
        budget

        MUST NOT make the sentence Hinglish.

        At least 2 clear Roman-Hindi words are required.
      */

      if (hindiWordCount >= 2) {
        return "HINGLISH_ROMAN";
      }

      // -------------------------------------------------------
      // CLEAR ENGLISH SENTENCE
      // -------------------------------------------------------

      const englishSentencePattern =
        /\b(my|your|the|is|are|am|was|were|be|been|being|can|could|would|should|will|please|suggest|recommend|give|show|find|want|need|looking|for|with|within|under|from|this|that|these|those|some|any|idea|ideas|coming|birthday|brother|sister|mother|father|friend|gift|gifts|budget|option|options|product|products)\b/i;

      if (
        englishSentencePattern.test(cleanText)
      ) {
        return "ENGLISH";
      }

      // -------------------------------------------------------
      // DEFAULT
      // -------------------------------------------------------

      return "ENGLISH";
    };

    // =========================================================
    // LANGUAGE
    // =========================================================

    let language =
      detectLanguage(latestUserMessage);

    // =========================================================
    // SHORT FOLLOW-UP
    // =========================================================

    const isShortFollowUp =
      latestUserMessage.trim().length <= 3 ||
      /^(yes|yeah|yup|ok|okay|ha|haan|hmm|hm|sure)$/i.test(
        latestUserMessage.trim()
      );

    // =========================================================
    // ONLY NUMBER
    // =========================================================

    const isOnlyNumber =
      /^(?:₹|rs\.?|rupees?|inr)?\s*\d+(?:\.\d+)?\s*k?\s*$/i.test(
        latestUserMessage.trim()
      );

    // =========================================================
    // REMEMBER PREVIOUS LANGUAGE
    // =========================================================

    if (
      (isShortFollowUp || isOnlyNumber) &&
      previousUserMessages.length > 0
    ) {
      for (
        let i = previousUserMessages.length - 1;
        i >= 0;
        i--
      ) {
        const previousMessage =
          previousUserMessages[i].trim();

        if (previousMessage.length > 2) {
          language =
            detectLanguage(previousMessage);

          break;
        }
      }
    }

    // =========================================================
    // RESPONSE HELPERS
    // =========================================================

    const getBudgetQuestion = () => {
      if (language === "HINDI_DEVANAGARI") {
        return "आप maximum कितना budget रखना चाहते हैं? जैसे ₹500, ₹1000 या ₹1500 बता दीजिए, फिर मैं उसी budget में suitable options दिखाऊँगा। 😊";
      }

      if (language === "HINGLISH_ROMAN") {
        return "Aap maximum kitna budget rakhna chahte ho? Jaise ₹500, ₹1000 ya ₹1500 bata do, phir main usi budget mein suitable options dikha dunga. 😊";
      }

      return "What is your maximum budget? For example ₹500, ₹1000 or ₹1500. Tell me your budget and I’ll show you suitable options. 😊";
    };

    // =========================================================
    // BUDGET EXTRACTION
    // =========================================================

    const extractBudget = (text) => {
      if (!text) {
        return null;
      }

      const cleanText = text
        .toLowerCase()
        .replace(/,/g, "")
        .trim();

      const match = cleanText.match(
        /(?:₹|rs\.?|rupees?|inr)?\s*(\d+(?:\.\d+)?)\s*(k)?\b/i
      );

      if (!match) {
        return null;
      }

      let amount = Number(match[1]);

      if (
        match[2] &&
        match[2].toLowerCase() === "k"
      ) {
        amount *= 1000;
      }

      if (
        !Number.isFinite(amount) ||
        amount <= 0
      ) {
        return null;
      }

      const standaloneAmountRegex =
        /^(?:₹|rs\.?|rupees?|inr)?\s*\d+(?:\.\d+)?\s*k?\s*$/i;

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

      const isStandaloneAmount =
        standaloneAmountRegex.test(
          text.trim()
        );

      if (
        hasBudgetWord ||
        isStandaloneAmount
      ) {
        return amount;
      }

      return null;
    };

    // =========================================================
    // REMEMBER LATEST BUDGET
    // =========================================================

    let budget = null;

    for (
      let i = userMessages.length - 1;
      i >= 0;
      i--
    ) {
      const detectedBudget =
        extractBudget(userMessages[i]);

      if (detectedBudget !== null) {
        budget = detectedBudget;
        break;
      }
    }

    // =========================================================
    // RELATIONSHIP MEMORY
    // =========================================================

    const relationshipPattern =
      /\b(bhai|brother|sister|behen|behan|sis|mom|mother|mummy|maa|dad|father|papa|friend|best friend|girlfriend|boyfriend|wife|husband|cousin|uncle|aunty|teacher|colleague)\b/i;

    let relationship = null;

    for (
      let i = userMessages.length - 1;
      i >= 0;
      i--
    ) {
      const match =
        userMessages[i].match(
          relationshipPattern
        );

      if (match) {
        relationship =
          match[0].toLowerCase();

        break;
      }
    }

    // =========================================================
    // RELATIONSHIP LABEL
    // =========================================================

    const getRelationshipLabel = () => {
      if (!relationship) {
        if (language === "ENGLISH") {
          return "your recipient";
        }

        if (
          language === "HINDI_DEVANAGARI"
        ) {
          return "आपके recipient";
        }

        return "aapke recipient";
      }

      const value =
        relationship.toLowerCase();

      if (
        language === "HINGLISH_ROMAN"
      ) {
        const labels = {
          bhai: "bhai",
          brother: "bhai",
          sister: "behen",
          behen: "behen",
          behan: "behen",
          sis: "behen",
          mom: "mummy",
          mother: "mummy",
          mummy: "mummy",
          maa: "mummy",
          dad: "papa",
          father: "papa",
          papa: "papa",
          friend: "friend",
          "best friend": "best friend",
          girlfriend: "girlfriend",
          boyfriend: "boyfriend",
          wife: "wife",
          husband: "husband",
          cousin: "cousin",
          uncle: "uncle",
          aunty: "aunty",
          teacher: "teacher",
          colleague: "colleague",
        };

        return labels[value] || relationship;
      }

      if (
        language === "HINDI_DEVANAGARI"
      ) {
        const labels = {
          bhai: "भाई",
          brother: "भाई",
          sister: "बहन",
          behen: "बहन",
          behan: "बहन",
          sis: "बहन",
          mom: "मम्मी",
          mother: "मम्मी",
          mummy: "मम्मी",
          maa: "मम्मी",
          dad: "पापा",
          father: "पापा",
          papa: "पापा",
          friend: "दोस्त",
          "best friend": "सबसे अच्छे दोस्त",
          girlfriend: "गर्लफ्रेंड",
          boyfriend: "बॉयफ्रेंड",
          wife: "पत्नी",
          husband: "पति",
          cousin: "कजिन",
          uncle: "अंकल",
          aunty: "आंटी",
          teacher: "टीचर",
          colleague: "सहकर्मी",
        };

        return labels[value] || relationship;
      }

      const labels = {
        bhai: "brother",
        brother: "brother",
        sister: "sister",
        behen: "sister",
        behan: "sister",
        sis: "sister",
        mom: "mother",
        mother: "mother",
        mummy: "mother",
        maa: "mother",
        dad: "father",
        father: "father",
        papa: "father",
        friend: "friend",
        "best friend": "best friend",
        girlfriend: "girlfriend",
        boyfriend: "boyfriend",
        wife: "wife",
        husband: "husband",
        cousin: "cousin",
        uncle: "uncle",
        aunty: "aunt",
        teacher: "teacher",
        colleague: "colleague",
      };

      return labels[value] || relationship;
    };

    const relationshipLabel =
      getRelationshipLabel();

    // =========================================================
    // OCCASION MEMORY
    // =========================================================

    const occasionPattern =
      /\b(birthday|janamdin|janmadin|anniversary|valentine|valentines|wedding|marriage|farewell|congratulations|congrats|graduation|baby shower|housewarming|festival|rakhi|rakshabandhan|diwali|christmas|new year)\b/i;

    let occasion = null;

    for (
      let i = userMessages.length - 1;
      i >= 0;
      i--
    ) {
      const match =
        userMessages[i].match(
          occasionPattern
        );

      if (match) {
        occasion =
          match[0].toLowerCase();

        break;
      }
    }

    // =========================================================
    // FLOWER MEMORY
    // =========================================================

    const flowerKeywords = [
      "rose",
      "roses",
      "lily",
      "lilies",
      "tulip",
      "tulips",
      "sunflower",
      "sunflowers",
      "orchid",
      "orchids",
      "carnation",
      "carnations",
      "gerbera",
      "gerberas",
      "jasmine",
      "marigold",
      "lotus",
      "daisy",
      "daisies",
    ];

    const normalizeFlower = (flower) => {
      const map = {
        roses: "rose",
        lilies: "lily",
        tulips: "tulip",
        sunflowers: "sunflower",
        orchids: "orchid",
        carnations: "carnation",
        gerberas: "gerbera",
        daisies: "daisy",
      };

      return map[flower] || flower;
    };

    let flowerKeyword = null;

    for (
      let i = userMessages.length - 1;
      i >= 0;
      i--
    ) {
      const text =
        userMessages[i].toLowerCase();

      const foundFlower =
        flowerKeywords.find((flower) => {
          const regex =
            new RegExp(`\\b${flower}\\b`, "i");

          return regex.test(text);
        });

      if (foundFlower) {
        flowerKeyword =
          normalizeFlower(foundFlower);

        break;
      }
    }

    // =========================================================
    // COLOR MEMORY
    // =========================================================

    const colorPattern =
      /\b(red|pink|blue|yellow|white|black|purple|violet|orange|green|peach|lavender|maroon|magenta|cream|golden|gold|silver|pastel)\b/i;

    let preferredColor = null;

    for (
      let i = userMessages.length - 1;
      i >= 0;
      i--
    ) {
      const match =
        userMessages[i].match(
          colorPattern
        );

      if (match) {
        preferredColor =
          match[0].toLowerCase();

        break;
      }
    }

    // =========================================================
    // PRODUCT TYPE
    // =========================================================

    const getProductTypeFromText = (
      text
    ) => {
      const value =
        text.toLowerCase();

      if (
        value.includes("flower in box") ||
        value.includes("flower box") ||
        value.includes("boxed flower") ||
        value.includes("flower-in-box") ||
        value.includes("flowerinbox")
      ) {
        return "FlowerInBox";
      }

      if (
        value.includes("flower in sleeve") ||
        value.includes("flower sleeve") ||
        value.includes("sleeve flower") ||
        value.includes("flower-in-sleeve") ||
        value.includes("flowerinsleeve")
      ) {
        return "FlowerInSleeve";
      }

      if (
        value.includes("combo bouquet") ||
        /\bcombo\b/i.test(value)
      ) {
        return "ComboBouquet";
      }

      if (
        value.includes("woolen bouquet") ||
        /\bwoolen\b/i.test(value)
      ) {
        return "Woolen";
      }

      if (
        /\bbouquets?\b/i.test(value)
      ) {
        return "Bouquet";
      }

      if (
        /\bflowers?\b/i.test(value)
      ) {
        return "Flower";
      }

      if (
        flowerKeywords.some((flower) =>
          new RegExp(
            `\\b${flower}\\b`,
            "i"
          ).test(value)
        )
      ) {
        return "Flower";
      }

      return null;
    };

    // =========================================================
    // LATEST EXPLICIT PRODUCT TYPE
    // =========================================================

    let preferredType = null;

    for (
      let i = userMessages.length - 1;
      i >= 0;
      i--
    ) {
      const detectedType =
        getProductTypeFromText(
          userMessages[i]
        );

      if (detectedType) {
        preferredType =
          detectedType;

        break;
      }
    }

    // =========================================================
    // SPECIAL BROAD GIFT REQUEST
    // =========================================================

    const isBroadGiftRequest =
      /\b(aur kya gift|aur kya de|aur kya doon|aur kya du|aur gift|different gift|another gift|other gift|kuch aur gift|kuch aur de|kuch aur dikhao|aur options)\b/i.test(
        lowerLatestMessage
      );

    if (isBroadGiftRequest) {
      preferredType = null;
    }

    // =========================================================
    // INTENT
    // =========================================================

    const showPattern =
      /\b(show|dikhao|dikhana|dikha|display|options|products?|aur|more|another|different|kuch aur|aur dikhao|aur options|new options|naye|dusra|dusre)\b/i;

    const productPattern =
      /\b(gift|gifts|present|recommend|recommendation|suggest|buy|purchase|want|need|find|give me|looking for|kya du|kya doon|chahiye|lena|kharidna|batao|batana|gift ideas?|idea|ideas)\b/i;

    const explicitShowRequest =
      showPattern.test(
        lowerLatestMessage
      );

    const explicitProductIntent =
      productPattern.test(
        lowerLatestMessage
      );

    // =========================================================
    // YES / HAAN
    // =========================================================

    const positiveFollowUp =
      /^(yes|yeah|yup|ok|okay|ha|haan|hmm|sure|yes please|haan dikhao|ha dikhao)$/i.test(
        lowerLatestMessage
      );

    // =========================================================
    // BUDGET CLARIFICATION
    // =========================================================

    const budgetClarificationPattern =
      /\b(budget\s+(?:thoda\s+)?(?:kam|low|tight|small|less)|kam\s+budget|budget\s+kam(?:\s+hai)?|budget\s+thoda\s+kam(?:\s+hai)?|budget\s+thoda\s+low(?:\s+hai)?|budget\s+tight|pocket\s+budget)\b/i;

    const isBudgetClarification =
      budgetClarificationPattern.test(
        lowerLatestMessage
      );

    // =========================================================
    // NORMAL CHAT
    // =========================================================

    const normalConversationPattern =
      /^(hi|hii|hello|hey|helo|do you know me|do you know english|can you speak english|what can you do|who are you|how are you|thanks|thank you|okay|ok|good morning|good evening|good night|nice to meet you)$/i;

    const isNormalConversation =
      normalConversationPattern.test(
        lowerLatestMessage
      );

    // =========================================================
    // CONTEXT QUESTION
    // =========================================================

    const contextQuestionPattern =
      /\b(kis\s+(ke\s+)?baare|kis\s+cheez|what\s+were\s+we\s+talking|what\s+was\s+i\s+talking|what\s+gift\s+were|what\s+are\s+we\s+talking)\b/i;

    const isContextQuestion =
      contextQuestionPattern.test(
        lowerLatestMessage
      );

    // =========================================================
    // PREVIOUS GIFT CONTEXT
    // =========================================================

    const previousGiftConversation =
      previousUserMessages.some(
        (message) =>
          /\b(gift|gifts|present|birthday|janamdin|anniversary|occasion|give|giving|bhai|brother|sister|behen|mom|mother|mummy|dad|father|papa|friend|girlfriend|boyfriend|wife|husband|chahiye|suggest|recommend|buy|purchase|idea|ideas|flower|flowers|bouquet|rose|lily|tulip|box|sleeve|woolen|combo)\b/i.test(
            message
          )
      );

    const hasGiftContext =
      previousGiftConversation ||
      Boolean(relationship) ||
      Boolean(occasion) ||
      Boolean(preferredType) ||
      Boolean(flowerKeyword);

    // =========================================================
    // LATEST IS ONLY BUDGET
    // =========================================================

    const standaloneBudgetRegex =
      /^(?:₹|rs\.?|rupees?|inr)?\s*\d+(?:\.\d+)?\s*k?\s*$/i;

    const latestIsOnlyBudget =
      budget !== null &&
      standaloneBudgetRegex.test(
        latestUserMessage.trim()
      );

    // =========================================================
    // EXPLICIT PRODUCT TYPE REQUEST
    // =========================================================

    const explicitProductType =
      getProductTypeFromText(
        latestUserMessage
      );

    // =========================================================
    // PRODUCT REQUEST
    // =========================================================

    let isProductRequest = false;

    if (isNormalConversation) {
      isProductRequest = false;
    } else if (isContextQuestion) {
      isProductRequest = false;
    } else if (isBudgetClarification) {
      isProductRequest = false;
    } else if (explicitProductType) {
      isProductRequest = true;
    } else if (isBroadGiftRequest) {
      isProductRequest = true;
    } else if (
      explicitShowRequest &&
      hasGiftContext
    ) {
      isProductRequest = true;
    } else if (
      explicitProductIntent &&
      hasGiftContext
    ) {
      isProductRequest = true;
    } else if (
      latestIsOnlyBudget &&
      hasGiftContext
    ) {
      isProductRequest = true;
    } else if (
      positiveFollowUp &&
      hasGiftContext
    ) {
      isProductRequest = true;
    }

    // =========================================================
    // BUDGET CLARIFICATION
    // =========================================================

    if (
      isBudgetClarification &&
      budget === null
    ) {
      return res.status(200).json({
        success: true,
        answer: getBudgetQuestion(),
        products: [],
      });
    }

    // =========================================================
    // CONTEXT QUESTION
    // =========================================================

    if (isContextQuestion) {
      let contextAnswer = "";

      const typeLabel = {
        FlowerInBox: "Flower in Box",
        FlowerInSleeve: "Flower in Sleeve",
        ComboBouquet: "Combo Bouquet",
        Woolen: "Woolen Bouquet",
        Bouquet: "Bouquet",
        Flower: "Flowers",
      };

      if (
        language === "HINDI_DEVANAGARI"
      ) {
        if (
          relationship &&
          occasion
        ) {
          contextAnswer =
            `आप अपने ${relationshipLabel} के लिए ${occasion} gift की बात कर रहे थे`;
        } else if (relationship) {
          contextAnswer =
            `आप अपने ${relationshipLabel} के लिए gift की बात कर रहे थे`;
        } else if (occasion) {
          contextAnswer =
            `आप ${occasion} के लिए gift की बात कर रहे थे`;
        } else {
          contextAnswer =
            "आप flowers और gift options के बारे में बात कर रहे थे";
        }

        if (preferredType) {
          contextAnswer +=
            ` और अभी ${typeLabel[preferredType]} options देख रहे थे`;
        }

        if (budget !== null) {
          contextAnswer +=
            `, आपका budget ₹${budget} था`;
        }

        contextAnswer += "।";
      } else if (
        language === "HINGLISH_ROMAN"
      ) {
        if (
          relationship &&
          occasion
        ) {
          contextAnswer =
            `Aap apne ${relationshipLabel} ke liye ${occasion} gift ki baat kar rahe the`;
        } else if (relationship) {
          contextAnswer =
            `Aap apne ${relationshipLabel} ke liye gift ki baat kar rahe the`;
        } else if (occasion) {
          contextAnswer =
            `Aap ${occasion} ke liye gift ki baat kar rahe the`;
        } else {
          contextAnswer =
            "Aap flowers aur gift options ke baare mein baat kar rahe the";
        }

        if (preferredType) {
          contextAnswer +=
            ` aur abhi ${typeLabel[preferredType]} options dekh rahe the`;
        }

        if (budget !== null) {
          contextAnswer +=
            `, aapka budget ₹${budget} tha`;
        }

        contextAnswer += ". 😊";
      } else {
        if (
          relationship &&
          occasion
        ) {
          contextAnswer =
            `You were talking about a gift for your ${relationshipLabel} for their ${occasion}`;
        } else if (relationship) {
          contextAnswer =
            `You were talking about a gift for your ${relationshipLabel}`;
        } else if (occasion) {
          contextAnswer =
            `You were talking about a gift for ${occasion}`;
        } else {
          contextAnswer =
            "You were talking about flowers and gift options";
        }

        if (preferredType) {
          contextAnswer +=
            `, and you were looking at ${typeLabel[preferredType]} options`;
        }

        if (budget !== null) {
          contextAnswer +=
            ` with a budget of ₹${budget}`;
        }

        contextAnswer += ".";
      }

      return res.status(200).json({
        success: true,
        answer: contextAnswer,
        products: [],
      });
    }

    // =========================================================
    // PRODUCT REQUEST WITHOUT BUDGET
    // =========================================================

    if (
      isProductRequest &&
      budget === null
    ) {
      return res.status(200).json({
        success: true,
        answer: getBudgetQuestion(),
        products: [],
      });
    }

    // =========================================================
    // NORMAL CHAT
    // =========================================================

    if (!isProductRequest) {
      try {
        let languageInstruction = "";

        if (
          language === "HINGLISH_ROMAN"
        ) {
          languageInstruction = `
IMPORTANT:

Reply ONLY in Roman Hinglish.

Use English alphabet only.

DO NOT use Hindi Devanagari script.

Example:
"Aapka question samajh gaya. Main aapki help kar sakta hoon."

Do NOT write:
"मैं आपकी मदद कर सकता हूँ।"
`;
        } else if (
          language === "HINDI_DEVANAGARI"
        ) {
          languageInstruction = `
IMPORTANT:

Reply ONLY in Hindi Devanagari.

Do NOT switch to Roman Hindi.

Do NOT use English sentences unless an English product or technical name is necessary.
`;
        } else {
          languageInstruction = `
IMPORTANT:

Reply ONLY in English.

Do NOT use Hindi.

Do NOT use Hinglish.

Do NOT convert the English sentence into Hinglish.

If the user's message is English, your complete response must be English.
`;
        }

        const completion =
          await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",

            messages: [
              {
                role: "system",

                content: `
You are a friendly AI assistant for a flower bouquet e-commerce website.

${languageInstruction}

Keep the response short and natural.

Do not recommend products unless the user asks for products or gifts.

Do not invent product names, prices, images or IDs.

Remember this conversation context:

Relationship:
${relationshipLabel}

Occasion:
${occasion || "not specified"}

Budget:
${budget !== null ? `₹${budget}` : "not specified"}

Product Type:
${preferredType || "not specified"}

Flower:
${flowerKeyword || "not specified"}

Color:
${preferredColor || "not specified"}

IMPORTANT:

Never change the relationship mentioned by the user.

If the user says sister/behen, always refer to sister/behen.

If the user says mother/mummy, always refer to mother/mummy.

Do not assume a different recipient.

Detected language:
${language}

Follow the detected language strictly.
`,
              },

              {
                role: "user",
                content: latestUserMessage,
              },
            ],

            max_tokens: 180,
          });

        const aiResponse =
          completion.choices[0]?.message?.content?.trim() ||
          "";

        return res.status(200).json({
          success: true,
          answer:
            aiResponse ||
            (
              language === "HINGLISH_ROMAN"
                ? "Haan, main yahin hoon. 😊"
                : language === "HINDI_DEVANAGARI"
                  ? "हाँ, मैं यहीं हूँ। 😊"
                  : "Yes, I’m here to help you. 😊"
            ),
          products: [],
        });
      } catch (groqError) {
        console.error(
          "Groq normal conversation error:",
          groqError
        );

        const fallback =
          language === "HINGLISH_ROMAN"
            ? "Haan, main yahin hoon. 😊"
            : language === "HINDI_DEVANAGARI"
              ? "हाँ, मैं यहीं हूँ। 😊"
              : "Yes, I’m here to help you. 😊";

        return res.status(200).json({
          success: true,
          answer: fallback,
          products: [],
        });
      }
    }

    // =========================================================
    // FETCH PRODUCTS FROM DATABASE
    // =========================================================

    const [
      bouquets,
      comboBouquets,
      flowers,
      flowersInBox,
      flowersInSleeve,
      woolens,
    ] = await Promise.all([
      bouquetModel
        .find({
          isAvailable: true,
          stock: { $gt: 0 },
        })
        .select(
          "name description price discountPrice occasion category size flowers image stock color"
        )
        .limit(100)
        .lean(),

      ComboBouquetModel
        .find({
          isAvailable: true,
          stock: { $gt: 0 },
        })
        .select(
          "name description price discountPrice occasion category size image stock color"
        )
        .limit(100)
        .lean(),

      flowerModel
        .find({
          isAvailable: true,
          stock: { $gt: 0 },
        })
        .select(
          "name description price discountPrice color category image stock flowerType occasion size flowers"
        )
        .limit(100)
        .lean(),

      FlowerInBoxModel
        .find({
          isAvailable: true,
          stock: { $gt: 0 },
        })
        .select(
          "name description price discountPrice flowerType boxType color occasion size image stock category"
        )
        .limit(100)
        .lean(),

      FlowerInSleeveModel
        .find({
          isAvailable: true,
          stock: { $gt: 0 },
        })
        .select(
          "name description price discountPrice flowerType sleeveType color occasion size image stock category"
        )
        .limit(100)
        .lean(),

      WoolenModel
        .find({
          isAvailable: true,
          stock: { $gt: 0 },
        })
        .select(
          "name description price discountPrice occasion category image stock color"
        )
        .limit(100)
        .lean(),
    ]);

    // =========================================================
    // COMBINE PRODUCTS
    // =========================================================

    const products = [
      ...bouquets.map((item) => ({
        type: "Bouquet",
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

      ...woolens.map((item) => ({
        type: "Woolen",
        ...item,
      })),
    ];

    // =========================================================
    // FINAL PRICE
    // =========================================================

    const getFinalPrice = (product) => {
      const price =
        Number(product.price) || 0;

      const discountPrice =
        Number(product.discountPrice) || 0;

      if (
        discountPrice > 0 &&
        discountPrice < price
      ) {
        return discountPrice;
      }

      return price;
    };

    // =========================================================
    // PREVIOUSLY SHOWN PRODUCTS
    // =========================================================

    const alreadyShownIds =
      new Set(
        previouslyRecommendedProductIds.map(
          (id) => String(id)
        )
      );

    // =========================================================
    // FILTER BY BUDGET
    // =========================================================

    let productsForAI =
      products.filter(
        (product) =>
          getFinalPrice(product) <= budget
      );

    // =========================================================
    // FILTER BY PRODUCT TYPE
    // =========================================================

    if (preferredType) {
      productsForAI =
        productsForAI.filter(
          (product) =>
            product.type === preferredType
        );
    }

    // =========================================================
    // FILTER BY FLOWER
    // =========================================================

    if (flowerKeyword) {
      productsForAI =
        productsForAI.filter(
          (product) => {
            const searchableText = [
              product.name,
              product.description,
              product.flowerType,
              product.category,
              product.occasion,

              Array.isArray(
                product.flowers
              )
                ? product.flowers.join(" ")
                : product.flowers,

              product.color,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return searchableText.includes(
              flowerKeyword
            );
          }
        );
    }

    // =========================================================
    // FILTER BY COLOR
    // =========================================================

    if (preferredColor) {
      productsForAI =
        productsForAI.filter(
          (product) => {
            const searchableText = [
              product.name,
              product.description,
              product.color,
              product.category,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return searchableText.includes(
              preferredColor
            );
          }
        );
    }

    // =========================================================
    // REMOVE PREVIOUSLY SHOWN PRODUCTS
    // =========================================================

    productsForAI =
      productsForAI.filter(
        (product) =>
          !alreadyShownIds.has(
            String(product._id)
          )
      );

    // =========================================================
    // REMOVE DUPLICATES
    // =========================================================

    const uniqueProducts = [];
    const seenProductIds = new Set();
    const seenProductNames = new Set();

    for (const product of productsForAI) {
      const productId =
        String(product._id);

      const productName =
        String(product.name || "")
          .trim()
          .toLowerCase();

      if (
        seenProductIds.has(productId) ||
        (
          productName &&
          seenProductNames.has(productName)
        )
      ) {
        continue;
      }

      seenProductIds.add(productId);

      if (productName) {
        seenProductNames.add(productName);
      }

      uniqueProducts.push(product);
    }

    productsForAI =
      uniqueProducts;

    // =========================================================
    // RANK PRODUCTS
    // =========================================================

    const scoreProduct = (product) => {
      let score = 0;

      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.occasion,
        product.color,
        product.flowerType,

        Array.isArray(
          product.flowers
        )
          ? product.flowers.join(" ")
          : product.flowers,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      // Exact product type
      if (
        preferredType &&
        product.type === preferredType
      ) {
        score += 20;
      }

      // Flower
      if (
        flowerKeyword &&
        searchableText.includes(
          flowerKeyword
        )
      ) {
        score += 15;
      }

      // Occasion
      if (
        occasion &&
        searchableText.includes(
          occasion
        )
      ) {
        score += 8;
      }

      // Color
      if (
        preferredColor &&
        searchableText.includes(
          preferredColor
        )
      ) {
        score += 7;
      }

      return score;
    };

    productsForAI.sort(
      (a, b) => {
        const scoreDifference =
          scoreProduct(b) -
          scoreProduct(a);

        if (
          scoreDifference !== 0
        ) {
          return scoreDifference;
        }

        return (
          getFinalPrice(a) -
          getFinalPrice(b)
        );
      }
    );

    // =========================================================
    // NO PRODUCT
    // =========================================================

    if (
      productsForAI.length === 0
    ) {
      let noProductMessage = "";

      if (
        language === "HINGLISH_ROMAN"
      ) {
        if (preferredType) {
          noProductMessage =
            `₹${budget} ke andar ${preferredType} ka koi naya suitable option nahi mila.`;
        } else {
          noProductMessage =
            `₹${budget} ke andar koi naya suitable flower gift nahi mila.`;
        }
      } else if (
        language === "HINDI_DEVANAGARI"
      ) {
        if (preferredType) {
          noProductMessage =
            `₹${budget} के अंदर ${preferredType} का कोई नया suitable option नहीं मिला।`;
        } else {
          noProductMessage =
            `₹${budget} के अंदर कोई नया suitable flower gift नहीं मिला।`;
        }
      } else {
        if (preferredType) {
          noProductMessage =
            `I couldn't find a new suitable ${preferredType} within ₹${budget}.`;
        } else {
          noProductMessage =
            `I couldn't find a new suitable flower gift within ₹${budget}.`;
        }
      }

      return res.status(200).json({
        success: true,
        answer: noProductMessage,
        products: [],
      });
    }

    // =========================================================
    // MAX 2 PRODUCTS
    // =========================================================

    const productsToShow =
      productsForAI.slice(0, 2);

    // =========================================================
    // PRODUCT NAMES / PRICES
    // =========================================================

    const firstProduct =
      productsToShow[0];

    const secondProduct =
      productsToShow[1];

    const firstPrice =
      getFinalPrice(firstProduct);

    const secondPrice =
      secondProduct
        ? getFinalPrice(secondProduct)
        : null;

    // =========================================================
    // PRODUCT TYPE LABEL
    // =========================================================

    const getProductTypeLabel = () => {
      if (
        preferredType === "Bouquet"
      ) {
        return {
          hinglish: "bouquet",
          hindi: "bouquet",
          english: "bouquet",
        };
      }

      if (
        preferredType === "ComboBouquet"
      ) {
        return {
          hinglish: "combo bouquet",
          hindi: "combo bouquet",
          english: "combo bouquet",
        };
      }

      if (
        preferredType === "FlowerInBox"
      ) {
        return {
          hinglish: "Flower-in-Box",
          hindi: "Flower-in-Box",
          english: "Flower-in-Box",
        };
      }

      if (
        preferredType === "FlowerInSleeve"
      ) {
        return {
          hinglish: "Flower-in-Sleeve",
          hindi: "Flower-in-Sleeve",
          english: "Flower-in-Sleeve",
        };
      }

      if (
        preferredType === "Woolen"
      ) {
        return {
          hinglish: "woolen bouquet",
          hindi: "woolen bouquet",
          english: "woolen bouquet",
        };
      }

      return {
        hinglish: "flower gift",
        hindi: "suitable",
        english: "flower gift",
      };
    };

    const productTypeLabel =
      getProductTypeLabel();

    // =========================================================
    // PRODUCT RESPONSE
    // =========================================================

    /*
      IMPORTANT:

      Don't use one fixed sentence every time.

      We rotate between different natural response styles
      based on conversation length.

      This changes the wording while keeping the actual
      product data exactly the same.
    */

    const responseStyle =
      userMessages.length % 4;

    let aiResponse = "";

    // =========================================================
    // HINGLISH RESPONSE
    // =========================================================

    if (
      language === "HINGLISH_ROMAN"
    ) {
      if (secondProduct) {
        const hinglishResponses = [
          `${relationshipLabel} ke ${occasion || "special occasion"} ke liye ₹${budget} ke andar mujhe ye 2 ${productTypeLabel.hinglish} options suitable lage. 🌸\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,

          `Aapke ₹${budget} budget mein ${relationshipLabel} ke ${occasion || "special occasion"} ke liye ye dono options dekh sakte ho. 🌸\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,

          `₹${budget} ke budget ko dhyan mein rakhte hue, ${relationshipLabel} ke liye ye 2 ${productTypeLabel.hinglish} options mil rahe hain. 😊\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,

          `Agar ${relationshipLabel} ke ${occasion || "special occasion"} ke liye ₹${budget} tak ka gift chahiye, toh in dono options ko consider kar sakte ho. 🌷\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,
        ];

        aiResponse =
          hinglishResponses[responseStyle];
      } else {
        aiResponse =
          `${relationshipLabel} ke ${occasion || "special occasion"} ke liye ₹${budget} ke andar ye ${productTypeLabel.hinglish} option suitable rahega. 🌸\n\n${firstProduct.name} – ₹${firstPrice}`;
      }
    }

    // =========================================================
    // HINDI RESPONSE
    // =========================================================

    else if (
      language === "HINDI_DEVANAGARI"
    ) {
      if (secondProduct) {
        const hindiResponses = [
          `${relationshipLabel} के ${occasion || "खास मौके"} के लिए ₹${budget} के अंदर ये 2 ${productTypeLabel.hindi} options अच्छे रहेंगे। 🌸\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,

          `आपके ₹${budget} के budget में ${relationshipLabel} के लिए ये दोनों options देख सकते हैं। 🌸\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,

          `₹${budget} के budget को ध्यान में रखते हुए, ${relationshipLabel} के लिए ये 2 ${productTypeLabel.hindi} options मिले हैं। 😊\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,

          `अगर ${relationshipLabel} के ${occasion || "खास मौके"} के लिए ₹${budget} तक का gift चाहिए, तो इन दोनों options को देख सकते हैं। 🌷\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,
        ];

        aiResponse =
          hindiResponses[responseStyle];
      } else {
        aiResponse =
          `${relationshipLabel} के ${occasion || "खास मौके"} के लिए ₹${budget} के अंदर यह ${productTypeLabel.hindi} option अच्छा रहेगा। 🌸\n\n${firstProduct.name} – ₹${firstPrice}`;
      }
    }

    // =========================================================
    // ENGLISH RESPONSE
    // =========================================================

    else {
      if (secondProduct) {
        const englishResponses = [
          `For your ${relationshipLabel}'s ${occasion || "special occasion"}, these 2 ${productTypeLabel.english} options fit your ₹${budget} budget. 🌸\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,

          `With a ₹${budget} budget, here are two ${productTypeLabel.english} options you can consider for your ${relationshipLabel}'s ${occasion || "special occasion"}. 🌷\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,

          `I found these two ${productTypeLabel.english} options within your ₹${budget} budget for your ${relationshipLabel}'s ${occasion || "special occasion"}. 😊\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,

          `For a ${occasion || "special occasion"} gift for your ${relationshipLabel}, these two options stay within ₹${budget}. 🌸\n\n1. ${firstProduct.name} – ₹${firstPrice}\n2. ${secondProduct.name} – ₹${secondPrice}`,
        ];

        aiResponse =
          englishResponses[responseStyle];
      } else {
        aiResponse =
          `I found a suitable ${productTypeLabel.english} option for your ${relationshipLabel}'s ${occasion || "special occasion"} within your ₹${budget} budget. 🌸\n\n${firstProduct.name} – ₹${firstPrice}`;
      }
    }

    // =========================================================
    // FINAL PRODUCT DATA
    // =========================================================

    const recommendedProducts =
      productsToShow.map(
        (product) => ({
          id: product._id,
          type: product.type,
          name: product.name,

          description:
            product.description || "",

          price:
            product.price,

          discountPrice:
            product.discountPrice ?? null,

          image:
            product.image,

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

          quantity:
            product.quantity || null,
        })
      );

    // =========================================================
    // FINAL RESPONSE
    // =========================================================

    return res.status(200).json({
      success: true,
      answer: aiResponse,
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
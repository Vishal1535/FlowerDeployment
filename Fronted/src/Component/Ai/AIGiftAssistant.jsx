import React, { useEffect, useRef, useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAIRecommendation } from "../../Store/Ai/AiApi";

export const AIGiftAssistant = () => {
  const [isOpen, setIsOpen] = useState(() => {
    try {
      const shouldReturnToAI = sessionStorage.getItem("aiGiftAssistantReturn");

      if (shouldReturnToAI === "true") {
        sessionStorage.removeItem("aiGiftAssistantReturn");

        return true;
      }

      return false;
    } catch (error) {
      console.error("Failed to check AI return state:", error);

      return false;
    }
  });

  const [question, setQuestion] = useState("");

  // ==================================================
  // CHAT MESSAGES
  // Refresh ke baad bhi same tab mein chat rahegi
  // ==================================================

  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = sessionStorage.getItem("aiGiftAssistantMessages");

      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch (error) {
      console.error("Failed to load AI chat:", error);

      return [];
    }
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.Ai);

  // ==================================================
  // CHAT BOTTOM REF
  // ==================================================

  const chatEndRef = useRef(null);

  // ==================================================
  // SAVE CHAT IN SESSION STORAGE
  // ==================================================

  useEffect(() => {
    try {
      sessionStorage.setItem(
        "aiGiftAssistantMessages",
        JSON.stringify(messages),
      );
    } catch (error) {
      console.error("Failed to save AI chat:", error);
    }
  }, [messages]);

  // ==================================================
  // CHAT OPEN / NEW MESSAGE PAR BOTTOM SCROLL
  // ==================================================

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isOpen, messages, loading]);

  // ==================================================
  // SEND MESSAGE
  // ==================================================

  const handleSend = async () => {
    if (!question.trim() || loading) return;

    const userQuestion = question.trim();

    // ==================================================
    // CURRENT USER MESSAGE
    // ==================================================

    const updatedMessages = [
      ...messages,
      {
        sender: "user",
        text: userQuestion,
      },
    ];

    // UI mein immediately user message show karo
    setMessages(updatedMessages);

    setQuestion("");

    // ==================================================
    // COMPLETE CONVERSATION CONTEXT
    // ==================================================
    // User messages + previous recommended product IDs
    // backend ko bheje jayenge.
    // ==================================================

    const conversationContext = updatedMessages
      .map((message) => {
        // User message
        if (message.sender === "user") {
          return `User: ${message.text}`;
        }

        // Previous AI recommended products
        if (message.sender === "ai" && message.products?.length > 0) {
          const productIds = message.products
            .map((product) => String(product.id))
            .join(",");

          return `AI Recommended Product IDs: ${productIds}`;
        }

        return "";
      })
      .filter(Boolean)
      .join("\n");

    console.log("AI Conversation Context:", conversationContext);

    // ==================================================
    // CALL AI API
    // ==================================================

    try {
      const result = await dispatch(
        getAIRecommendation(conversationContext),
      ).unwrap();

      // ==================================================
      // AI ANSWER + PRODUCTS
      // ==================================================

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: result.answer,
          products: result.products || [],
        },
      ]);
    } catch (error) {
      console.error("AI Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, abhi recommendation nahi mil pa rahi. Please thodi der baad try karo.",
          products: [],
        },
      ]);
    }
  };

  // ==================================================
  // ENTER KEY
  // ==================================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // ==================================================
  // VIEW PRODUCT DETAILS
  // Same tab mein product open hoga
  // ==================================================

  const handleViewDetails = (product) => {
    let productUrl = "";

    switch (product.type) {
      case "Bouquet":
        productUrl = `/bouquet/${product.id}`;
        break;

      case "Flower":
        productUrl = `/flower/${product.id}`;
        break;

      case "ComboBouquet":
        productUrl = `/combo-bouquet/${product.id}`;
        break;

      case "Woolen":
        productUrl = `/woolen-bouquet/${product.id}`;
        break;

      case "FlowerInBox":
        productUrl = `/flower-in-box/${product.id}`;
        break;

      case "FlowerInSleeve":
        productUrl = `/flower-in-sleeve/${product.id}`;
        break;

      default:
        return;
    }

    // ==================================================
    // REMEMBER THAT USER CAME FROM AI CHAT
    // ==================================================

    try {
      sessionStorage.setItem("aiGiftAssistantReturn", "true");
    } catch (error) {
      console.error("Failed to save AI return state:", error);
    }

    // ==================================================
    // SAME TAB MEIN PRODUCT DETAILS OPEN KARO
    // ==================================================

    navigate(productUrl);
  };

  return (
    <>
      {/* ==================================================
          AI BUTTON
      ================================================== */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-3 z-50 flex items-center gap-2 rounded-full bg-pink-500 px-3 py-2.5 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-pink-600 sm:bottom-5 sm:right-5 sm:px-4"
        >
          <Bot size={19} />

          <span className="text-sm font-semibold sm:text-base">
            AI Gift Assistant
          </span>
        </button>
      )}

      {/* ==================================================
          AI CHAT
      ================================================== */}

      {isOpen && (
        <div className="fixed bottom-3 right-2 z-50 w-[calc(100vw-16px)] max-w-[370px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-pink-100 sm:bottom-5 sm:right-5">
          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="flex items-center justify-between bg-gradient-to-r from-pink-500 to-rose-400 px-3 py-3.5 sm:px-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 sm:h-10 sm:w-10">
                <Bot size={20} className="text-white" />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  AI Gift Assistant
                </h3>

                <p className="truncate text-[11px] text-pink-100 sm:text-xs">
                  Find your perfect gift ✨
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="ml-2 shrink-0 text-white transition hover:opacity-80"
            >
              <X size={20} />
            </button>
          </div>

          {/* ==================================================
              CHAT AREA
          ================================================== */}

          <div className="h-[320px] overflow-y-auto bg-[#fffafa] px-3 py-3 sm:h-[330px] sm:px-4 sm:py-4">
            {/* ==================================================
                INITIAL MESSAGE
            ================================================== */}

            <div className="flex items-start gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100">
                <Sparkles size={15} className="text-pink-500" />
              </div>

              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-pink-50 px-3 py-2.5">
                <p className="text-[13px] leading-5 text-gray-700 sm:text-sm">
                  Hi! 👋 I’ll help you choose the perfect gift. 🌸
                </p>

                <p className="mt-1.5 text-[13px] leading-5 text-gray-700 sm:text-sm">
                  What is the occasion you’re looking for a gift for?
                </p>
              </div>
            </div>

            {/* ==================================================
                MESSAGES
            ================================================== */}

            {messages.map((message, index) => (
              <div key={index} className="mt-3">
                {/* ==================================================
                    USER / AI MESSAGE
                ================================================== */}

                <div
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "items-start gap-2"
                  }`}
                >
                  {/* AI ICON */}

                  {message.sender === "ai" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100">
                      <Sparkles size={15} className="text-pink-500" />
                    </div>
                  )}

                  {/* MESSAGE */}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2.5 ${
                      message.sender === "user"
                        ? "rounded-br-sm bg-pink-500 text-white"
                        : "rounded-tl-sm bg-pink-50 text-gray-700"
                    }`}
                  >
                    <p className="whitespace-pre-line text-[13px] leading-5 sm:text-sm">
                      {message.text}
                    </p>
                  </div>
                </div>

                {/* ==================================================
                    PRODUCTS
                    Har AI message ke products alag save rahenge
                ================================================== */}

                {message.sender === "ai" && message.products?.length > 0 && (
                  <div className="mt-3 ml-10 space-y-2.5">
                    {message.products.map((product) => (
                      <div
                        key={product.id}
                        className="overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm"
                      >
                        <div className="flex gap-3 p-3">
                          {/* PRODUCT IMAGE */}

                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-pink-50 sm:h-[88px] sm:w-[88px]">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          {/* PRODUCT INFO */}

                          <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-2 text-xs font-semibold leading-4 text-gray-800 sm:text-sm">
                              {product.name}
                            </h4>

                            <p className="mt-1.5 text-sm font-semibold text-pink-500 sm:text-base">
                              ₹{product.discountPrice || product.price}
                            </p>

                            <button
                              onClick={() => handleViewDetails(product)}
                              className="mt-2 rounded-md bg-pink-500 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-pink-600 sm:text-xs"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ==================================================
                LOADING
            ================================================== */}

            {loading && (
              <div className="mt-3 flex items-start gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100">
                  <Sparkles size={15} className="text-pink-500" />
                </div>

                <div className="rounded-2xl rounded-tl-sm bg-pink-50 px-3 py-2.5">
                  <p className="text-[13px] text-gray-500 sm:text-sm">
                    Thinking... ✨
                  </p>
                </div>
              </div>
            )}

            {/* ==================================================
                INVISIBLE BOTTOM ELEMENT
            ================================================== */}

            <div ref={chatEndRef} />
          </div>

          {/* ==================================================
              INPUT
          ================================================== */}

          <div className="border-t border-pink-100 bg-white p-2.5 sm:p-3">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for a gift..."
                disabled={loading}
                className="min-w-0 flex-1 bg-transparent py-2 text-base text-gray-800 caret-pink-500 outline-none placeholder:text-gray-400 sm:text-sm"
              />

              <button
                onClick={handleSend}
                disabled={loading || !question.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

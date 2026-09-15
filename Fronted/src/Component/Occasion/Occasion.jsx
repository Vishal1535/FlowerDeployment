import React, { useEffect, useState } from "react";
import { Card } from "./Card/Card";
import { MiniCupCake } from "./MIniCupCake/MiniCupCake";
import { Chocolate } from "./Chocolate/Chocolate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Occasion = ({ occasion }) => {
  const [activeTab, setActiveTab] = useState("chocolate");
  



  const tabs = [
    {
      id: "chocolate",
      label: "Chocolate",
      emoji: "🍫",
    },
    {
      id: "miniCupcake",
      label: "Mini Cupcake",
      emoji: "🧁",
    },
    {
      id: "card",
      label: "Card",
      emoji: "💌",
    },
  ];

  return (
    <section className="w-full">

      {/* ================= HEADER ================= */}

      <div className="mb-4">

        <p className="text-[11px] font-semibold text-pink-500 uppercase tracking-wider">
          Make Your Gift Special
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-1">
          Add Something Extra ✨
        </h2>

      </div>

      {/* ================= TABS ================= */}

      <div className="flex gap-2 mb-5">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1
              h-11
              px-3
              rounded-xl
              border
              flex
              items-center
              justify-center
              gap-1.5
              text-xs
              font-semibold
              transition-all
              duration-200
              cursor-pointer
              ${
                activeTab === tab.id
                  ? "bg-pink-500 border-pink-500 text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-pink-200 hover:text-pink-500"
              }
            `}
          >

            <span className="text-base">
              {tab.emoji}
            </span>

            {tab.label}

          </button>
        ))}

      </div>

      {/* ================= CONTENT ================= */}

      <div>

        {activeTab === "chocolate" && (
          <Chocolate
            occasion={occasion}
          />
        )}

        {activeTab === "miniCupcake" && (
          <MiniCupCake
            occasion={occasion}
          />
        )}

        {activeTab === "card" && (
          <Card
            occasion={occasion}
          />
        )}

      </div>

    </section>
  );
};
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
    <section className="
      w-full
      min-w-0
      overflow-hidden
    ">

      {/* ================= HEADER ================= */}

      <div className="
        mb-3
        min-[380px]:mb-4
      ">

        <p className="
          text-[9px]
          min-[380px]:text-[11px]
          font-semibold
          text-pink-500
          uppercase
          tracking-wider
        ">
          Make Your Gift Special
        </p>

        <h2 className="
          text-base
          min-[380px]:text-lg
          font-bold
          text-gray-900
          mt-0.5
          min-[380px]:mt-1
        ">
          Add Something Extra ✨
        </h2>

      </div>

      {/* ================= TABS ================= */}

      <div className="
        flex
        gap-1.5
        min-[380px]:gap-2
        mb-4
        min-[380px]:mb-5
        w-full
        min-w-0
      ">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1
              min-w-0
              h-9
              min-[380px]:h-11
              px-1.5
              min-[380px]:px-3
              rounded-lg
              min-[380px]:rounded-xl
              border
              flex
              items-center
              justify-center
              gap-1
              min-[380px]:gap-1.5
              text-[10px]
              min-[380px]:text-xs
              font-semibold
              transition-all
              duration-200
              cursor-pointer
              whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "bg-pink-500 border-pink-500 text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-pink-200 hover:text-pink-500"
              }
            `}
          >

            <span className="
              text-sm
              min-[380px]:text-base
              shrink-0
            ">
              {tab.emoji}
            </span>

            <span className="truncate">
              {tab.label}
            </span>

          </button>
        ))}

      </div>

      {/* ================= CONTENT ================= */}

      <div className="
        w-full
        min-w-0
        overflow-hidden
      ">

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
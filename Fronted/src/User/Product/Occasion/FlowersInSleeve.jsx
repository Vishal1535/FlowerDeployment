import React, { useState } from "react";
import { Search, X } from "lucide-react";

import { FlowerInSleeveItem } from "../../../Component/Hero/SpecialBouquet/FlowerPackaging/FlowerInSleeve/FlowerInSleeveItem";

export const FlowersInSleeve = ({
  flowersInSleeve = [],
}) => {
  const [search, setSearch] = useState("");

  if (!flowersInSleeve.length) return null;

  // ================= SEARCH =================

  const filteredFlowersInSleeve = flowersInSleeve.filter((flower) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    const matches = (value) => {
      if (!value) return false;

      if (Array.isArray(value)) {
        return value
          .join(" ")
          .toLowerCase()
          .includes(query);
      }

      return String(value)
        .toLowerCase()
        .includes(query);
    };

    return (
      matches(flower?.name) ||
      matches(flower?.description) ||
      matches(flower?.category) ||
      matches(flower?.occasion) ||
      matches(flower?.flowerType) ||
      matches(flower?.sleeveType) ||
      matches(flower?.color) ||
      matches(flower?.size) ||
      matches(flower?.price)
    );
  });

  return (
    <section className="w-full py-10">

      {/* ================= HEADER ================= */}

      <div className="mb-7">

        <div className="flex items-center gap-2 mb-2">

          <span className="w-7 h-[2px] rounded-full bg-pink-500" />

          <p
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-pink-500
            "
          >
            Flower Collection
          </p>

        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

          {/* ================= TITLE ================= */}

          <div>

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-extrabold
                tracking-tight
                text-gray-900
              "
            >
              Flowers In Sleeve
            </h2>

            <p className="mt-1.5 text-sm text-gray-500">
              Beautiful flowers wrapped with elegance
            </p>

          </div>

          {/* ================= SEARCH + COUNT ================= */}

          <div className="flex items-center gap-3">

            {/* SEARCH */}

            <div
              className="
                flex
                items-center
                w-full
                sm:w-64
                h-10
                rounded-full
                border
                border-gray-200
                bg-gray-50
                focus-within:bg-white
                focus-within:border-pink-300
                focus-within:ring-4
                focus-within:ring-pink-50
                transition-all
              "
            >

              <Search
                size={17}
                className="ml-4 text-gray-400 shrink-0"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search flowers..."
                className="
                  flex-1
                  min-w-0
                  h-full
                  px-3
                  bg-transparent
                  outline-none
                  text-sm
                  text-gray-700
                  placeholder:text-gray-400
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    mr-2
                    w-7
                    h-7
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-pink-50
                    hover:text-pink-500
                    transition
                    cursor-pointer
                  "
                >
                  <X size={15} />
                </button>
              )}

            </div>

            {/* PRODUCT COUNT */}

            <span
              className="
                hidden
                sm:inline-flex
                items-center
                px-3
                py-1.5
                rounded-full
                bg-pink-50
                text-pink-600
                text-xs
                font-semibold
                whitespace-nowrap
              "
            >
              {filteredFlowersInSleeve.length}{" "}
              {filteredFlowersInSleeve.length === 1
                ? "Product"
                : "Products"}
            </span>

          </div>

        </div>

        {/* ================= DIVIDER ================= */}

        <div
          className="
            mt-5
            h-px
            bg-gradient-to-r
            from-pink-200
            via-gray-100
            to-transparent
          "
        />

      </div>

      {/* ================= PRODUCTS ================= */}

      {filteredFlowersInSleeve.length > 0 ? (

        <div
          className={`
            grid
            gap-5
            justify-center

            ${
              filteredFlowersInSleeve.length === 1
                ? "grid-cols-1 max-w-[320px] mx-auto"
                : filteredFlowersInSleeve.length === 2
                  ? "grid-cols-1 sm:grid-cols-2 max-w-[660px] mx-auto"
                  : filteredFlowersInSleeve.length === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1000px] mx-auto"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full"
            }
          `}
        >

          {filteredFlowersInSleeve.map((flower) => (
            <FlowerInSleeveItem
              key={flower._id}
              flower={flower}
            />
          ))}

        </div>

      ) : (

        /* ================= NO SEARCH RESULT ================= */

        <div className="py-16 text-center">

          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-full
              bg-pink-50
              flex
              items-center
              justify-center
            "
          >
            <Search
              size={25}
              className="text-pink-400"
            />
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-800">
            No flowers found
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Try searching with another name or category.
          </p>

        </div>

      )}

    </section>
  );
};
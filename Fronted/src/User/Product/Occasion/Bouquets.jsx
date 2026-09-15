import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { BouquetCard } from "../../../Component/Hero/BouquetHero/BouquetCard";

export const Bouquets = ({ bouquets = [] }) => {
  const [search, setSearch] = useState("");

  if (!bouquets.length) return null;

  // ================= SEARCH =================

  const filteredBouquets = bouquets.filter((bouquet) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      bouquet?.name?.toLowerCase().includes(query) ||
      bouquet?.description?.toLowerCase().includes(query) ||
      bouquet?.category?.toLowerCase().includes(query) ||
      bouquet?.occasion?.toLowerCase().includes(query) ||
      bouquet?.size?.toLowerCase().includes(query)
    );
  });

  return (
    <section className="w-full py-10">

      {/* ================= HEADER ================= */}

      <div className="mb-7">

        <div className="flex items-center gap-2 mb-2">

          <span className="w-7 h-[2px] bg-pink-500 rounded-full" />

          <span
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-pink-500
            "
          >
            Bouquets
          </span>

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
              Beautiful{" "}
              <span className="text-pink-500">
                Bouquets
              </span>
            </h2>

            <p className="mt-1.5 text-sm text-gray-500">
              Freshly arranged bouquets for your special occasion
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bouquets..."
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
              {filteredBouquets.length}{" "}
              {filteredBouquets.length === 1
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

      {filteredBouquets.length > 0 ? (

        <div
          className={`
            grid
            gap-5
            justify-center

            ${
              filteredBouquets.length === 1
                ? "grid-cols-1 max-w-[320px] mx-auto"
                : filteredBouquets.length === 2
                  ? "grid-cols-1 sm:grid-cols-2 max-w-[660px] mx-auto"
                  : filteredBouquets.length === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1000px] mx-auto"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full"
            }
          `}
        >

          {filteredBouquets.map((bouquet) => (

            <BouquetCard
              key={bouquet._id}
              bouquet={bouquet}
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
            No bouquets found
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Try searching with another name or category.
          </p>

        </div>

      )}

    </section>
  );
};
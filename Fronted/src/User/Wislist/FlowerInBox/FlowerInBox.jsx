
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { FLowerInBoxItem } from "./FLowerInBoxItem";

export const FlowerInBox = ({ item = [] }) => {
  const [search, setSearch] = useState("");

  // ================= SEARCH =================

  const filteredFlowersInBox = item.filter(
    (flowerInBox) => {
      const query = search.toLowerCase().trim();

      if (!query) return true;

      return (
        flowerInBox?.name
          ?.toLowerCase()
          .includes(query) ||
        flowerInBox?.occasion
          ?.toLowerCase()
          .includes(query) ||
        flowerInBox?.description
          ?.toLowerCase()
          .includes(query) ||
        flowerInBox?.category
          ?.toLowerCase()
          .includes(query)
      );
    }
  );

  // ================= NO DATA =================

  if (!item.length) {
    return (
      <div
        className="
          w-full
          rounded-2xl
          border
          border-dashed
          border-pink-200
          bg-white/70
          py-12
          px-5
          text-center
        "
      >
        <p className="text-sm font-medium text-gray-400">
          No flowers in box in your wishlist yet.
        </p>

        <p className="mt-1 text-xs text-gray-300">
          Add your favourite flower boxes to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* ================= SEARCH ================= */}

      <div className="mb-5 flex justify-end">

        <div className="relative w-full sm:w-72">

          <Search
            size={17}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search flower boxes..."
            className="
              w-full
              h-10
              pl-10
              pr-10
              rounded-xl
              border
              border-gray-200
              bg-white
              text-sm
              text-gray-700
              placeholder:text-gray-400
              outline-none
              focus:border-pink-300
              focus:ring-2
              focus:ring-pink-100
              transition
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-pink-500
                transition
                cursor-pointer
              "
            >
              <X size={16} />
            </button>
          )}

        </div>

      </div>

      {/* ================= NO SEARCH RESULT ================= */}

      {filteredFlowersInBox.length === 0 ? (

        <div
          className="
            w-full
            rounded-2xl
            border
            border-dashed
            border-pink-200
            bg-white/70
            py-10
            px-5
            text-center
          "
        >
          <Search
            size={28}
            className="mx-auto text-gray-300"
          />

          <p className="mt-3 text-sm font-semibold text-gray-500">
            No flower boxes found
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Try searching with another name or occasion.
          </p>
        </div>

      ) : (

        /* ================= GRID ================= */

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
          "
        >
          {filteredFlowersInBox.map(
            (flowerInBox) => (
              <FLowerInBoxItem
                key={flowerInBox?._id}
                flowerInBox={flowerInBox}
              />
            )
          )}
        </div>

      )}

    </div>
  );
};


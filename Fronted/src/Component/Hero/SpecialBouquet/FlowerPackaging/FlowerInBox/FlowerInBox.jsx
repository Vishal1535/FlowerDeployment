import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { FlowerInBoxItem } from "./FlowerInBoxItem";

import {
  GetAllFlowerInBoxThunk,
} from "../../../../../Store/FlowerInBox/FlowerInBoxApi";

export const FlowerInBox = () => {
  const dispatch = useDispatch();

  const {
    isShowFlowerInBox,
    flowersInBox = [],
    loading,
  } = useSelector((state) => state.flowerInBox);

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [direction, setDirection] = useState("next");

  // ================= SEARCH =================

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // ================= GET ALL =================

  useEffect(() => {
    if (isShowFlowerInBox) {
      dispatch(GetAllFlowerInBoxThunk());
    }
  }, [dispatch, isShowFlowerInBox]);

  // ================= RESPONSIVE =================

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();

    window.addEventListener(
      "resize",
      updateVisibleCount
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleCount
      );
    };
  }, []);

  // ================= RESET INDEX =================

  useEffect(() => {
    setStartIndex(0);
  }, [visibleCount]);

  // ================= SEARCH FILTER =================

  const filteredFlowersInBox = flowersInBox.filter(
    (flower) => {
      const search = searchText
        .toLowerCase()
        .trim();

      if (!search) return true;

      return (
        flower?.name
          ?.toLowerCase()
          .includes(search) ||

        flower?.flowerType
          ?.toLowerCase()
          .includes(search) ||

        flower?.boxType
          ?.toLowerCase()
          .includes(search) ||

        flower?.color
          ?.toLowerCase()
          .includes(search) ||

        flower?.description
          ?.toLowerCase()
          .includes(search) ||

        flower?.occasion?.some((item) =>
          item?.toLowerCase().includes(search)
        )
      );
    }
  );

  // ================= SEARCH CHANGE =================

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setStartIndex(0);
  };

  // ================= CLOSE SEARCH =================

  const handleCloseSearch = () => {
    setSearchText("");
    setIsSearchOpen(false);
    setStartIndex(0);
  };

  // ================= PREVIOUS =================

  const handlePrevious = () => {
    if (startIndex <= 0 || loading) return;

    setDirection("prev");

    setStartIndex(
      (previousIndex) => previousIndex - 1
    );
  };

  // ================= NEXT =================

  const handleNext = () => {
    if (
      loading ||
      startIndex >=
        filteredFlowersInBox.length -
          visibleCount
    ) {
      return;
    }

    setDirection("next");

    setStartIndex(
      (previousIndex) => previousIndex + 1
    );
  };

  // ================= VISIBLE ITEMS =================

  const visibleFlowersInBox =
    filteredFlowersInBox.slice(
      startIndex,
      startIndex + visibleCount
    );

  // ================= HIDDEN =================

  if (!isShowFlowerInBox) {
    return null;
  }

  // ================= EMPTY =================

  if (
    !loading &&
    flowersInBox.length === 0
  ) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-10 py-10">

        <div className="text-center py-16">

          <div className="text-4xl mb-3">
            🌸
          </div>

          <p className="text-gray-600 font-medium">
            No flowers in box found
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Flower in box collection is currently empty.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10">

      {/* ================= HEADER ================= */}

      <div className="mb-8 sm:mb-10">

        <div className="flex items-end justify-between gap-5">

          {/* ================= LEFT ================= */}

          <div>

            <div className="flex items-center gap-2 mb-3">

              <span
                className="
                  w-8
                  h-[2px]
                  bg-pink-500
                  rounded-full
                "
              />

              <span
                className="
                  text-[11px]
                  sm:text-xs
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-pink-500
                "
              >
                Special Collection
              </span>

            </div>

            <h2
              className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-extrabold
                tracking-tight
                text-gray-900
                leading-tight
              "
            >
              Beautiful{" "}
              <span className="text-pink-500">
                Flowers In Box
              </span>
            </h2>

            <p
              className="
                mt-2
                sm:mt-3
                text-sm
                sm:text-base
                text-gray-500
                max-w-lg
                leading-relaxed
              "
            >
              Explore our beautiful flower boxes,
              thoughtfully arranged for every special
              occasion.
            </p>

          </div>

          {/* ================= SEARCH ================= */}

          <div className="hidden sm:flex items-center gap-3 pb-2">

            <div
              className={`
                flex
                items-center
                transition-all
                duration-300
                overflow-hidden

                ${
                  isSearchOpen
                    ? "w-[220px]"
                    : "w-10"
                }
              `}
            >

              {!isSearchOpen ? (

                <button
                  type="button"
                  onClick={() =>
                    setIsSearchOpen(true)
                  }
                  aria-label="Open flower in box search"
                  className="
                    w-10
                    h-10
                    shrink-0
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-gray-500
                    shadow-sm
                    hover:bg-pink-500
                    hover:text-white
                    hover:border-pink-500
                    transition-all
                    duration-300
                  "
                >
                  <Search size={18} />
                </button>

              ) : (

                <div
                  className="
                    flex
                    items-center
                    w-full
                    h-10
                    rounded-full
                    border
                    border-pink-300
                    bg-white
                    shadow-sm
                    px-3
                    gap-2
                    ring-2
                    ring-pink-50
                  "
                >

                  <Search
                    size={17}
                    className="
                      text-pink-500
                      shrink-0
                    "
                  />

                  <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    autoFocus
                    placeholder="Search flower box..."
                    className="
                      w-full
                      min-w-0
                      bg-transparent
                      outline-none
                      text-sm
                      text-gray-700
                      placeholder:text-gray-400
                    "
                  />

                  <button
                    type="button"
                    onClick={handleCloseSearch}
                    aria-label="Close search"
                    className="
                      shrink-0
                      text-gray-400
                      hover:text-pink-500
                      transition-colors
                    "
                  >
                    <X size={16} />
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* ================= DIVIDER ================= */}

        <div
          className="
            mt-6
            h-px
            bg-gradient-to-r
            from-pink-200
            via-gray-100
            to-transparent
          "
        />

      </div>

      {/* ================= CAROUSEL ================= */}

      <div
        className="
          flex
          items-center
          gap-2
          sm:gap-4
          w-full
        "
      >

        {/* ================= PREVIOUS ================= */}

        <button
          type="button"
          onClick={handlePrevious}
          disabled={
            startIndex === 0 ||
            loading ||
            filteredFlowersInBox.length === 0
          }
          aria-label="Previous flowers in box"
          className="
            shrink-0
            w-10
            h-10
            sm:w-12
            sm:h-12
            rounded-full
            bg-white
            border
            border-gray-200
            shadow-md
            flex
            items-center
            justify-center
            text-gray-700
            hover:bg-pink-50
            hover:text-pink-600
            hover:border-pink-200
            hover:shadow-lg
            active:scale-90
            disabled:opacity-30
            disabled:cursor-not-allowed
            transition-all
            duration-200
          "
        >
          <ChevronLeft
            size={22}
            strokeWidth={2}
          />
        </button>

        {/* ================= ITEMS ================= */}

        <div className="flex-1 min-w-0 overflow-hidden">

          {/* ================= LOADING ================= */}

          {loading ? (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-4
                sm:gap-5
              "
            >
              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      h-[450px]
                      rounded-2xl
                      bg-gray-100
                      animate-pulse
                    "
                  />
                )
              )}
            </div>

          ) : filteredFlowersInBox.length === 0 ? (

            /* ================= NO SEARCH RESULT ================= */

            <div
              className="
                py-20
                text-center
                rounded-3xl
                bg-pink-50/50
                border
                border-pink-100
              "
            >

              <div className="text-4xl mb-3">
                🌸
              </div>

              <p
                className="
                  text-gray-600
                  font-medium
                "
              >
                No flower boxes found
              </p>

              <p
                className="
                  text-sm
                  text-gray-400
                  mt-1
                "
              >
                Try searching for another flower box.
              </p>

            </div>

          ) : (

            /* ================= CARDS ================= */

            <div
              key={startIndex}
              className={`
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-4
                sm:gap-5

                ${
                  direction === "next"
                    ? "animate-slide-next"
                    : "animate-slide-prev"
                }
              `}
            >

              {visibleFlowersInBox.map(
                (flower) => (
                  <FlowerInBoxItem
                    key={flower._id}
                    flower={flower}
                  />
                )
              )}

            </div>

          )}

        </div>

        {/* ================= NEXT ================= */}

        <button
          type="button"
          onClick={handleNext}
          disabled={
            loading ||
            filteredFlowersInBox.length === 0 ||
            startIndex >=
              filteredFlowersInBox.length -
                visibleCount
          }
          aria-label="Next flowers in box"
          className="
            shrink-0
            w-10
            h-10
            sm:w-12
            sm:h-12
            rounded-full
            bg-white
            border
            border-gray-200
            shadow-md
            flex
            items-center
            justify-center
            text-gray-700
            hover:bg-pink-50
            hover:text-pink-600
            hover:border-pink-200
            hover:shadow-lg
            active:scale-90
            disabled:opacity-30
            disabled:cursor-not-allowed
            transition-all
            duration-200
          "
        >
          <ChevronRight
            size={22}
            strokeWidth={2}
          />
        </button>

      </div>

      {/* ================= ANIMATION ================= */}

      <style>
        {`
          @keyframes slideNext {
            from {
              opacity: 0;
              transform: translateX(45px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slidePrev {
            from {
              opacity: 0;
              transform: translateX(-45px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-slide-next {
            animation:
              slideNext
              0.55s
              cubic-bezier(0.22, 1, 0.36, 1);
          }

          .animate-slide-prev {
            animation:
              slidePrev
              0.55s
              cubic-bezier(0.22, 1, 0.36, 1);
          }
        `}
      </style>

    </section>
  );
};
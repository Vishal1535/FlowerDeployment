import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { FlowerInSleeveItem } from "./FlowerInSleeveItem";

import {
  GetAllFlowerInSleeveThunk,
} from "../../../../../Store/FlowerSleeve/FlowerSleeveApi";

export const FlowerInSleeve = () => {
  const dispatch = useDispatch();

  const {
    isShowFlowerInSleeve,
    flowersInSleeve = [],
    loading,
  } = useSelector((state) => state.flowerInSleeve);

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [direction, setDirection] = useState("next");

  // ================= DRAG =================

  const [dragStartX, setDragStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // ================= SEARCH =================

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  // ================= GET ALL =================

  useEffect(() => {
    dispatch(GetAllFlowerInSleeveThunk());
  }, [dispatch]);

  // ================= SEARCH =================

  const filteredFlowers = flowersInSleeve.filter(
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
        flower?.sleeveType
          ?.toLowerCase()
          .includes(search) ||
        flower?.color
          ?.toLowerCase()
          .includes(search) ||
        flower?.occasion?.some((item) =>
          item
            ?.toLowerCase()
            .includes(search)
        )
      );
    }
  );

  // ================= PREVIOUS =================

  const handlePrevious = () => {
    if (
      startIndex <= 0 ||
      loading
    ) {
      return;
    }

    setDirection("prev");

    setStartIndex(
      (previousIndex) =>
        previousIndex - 1
    );
  };

  // ================= NEXT =================

  const handleNext = () => {
    if (
      loading ||
      startIndex >=
        filteredFlowers.length -
          visibleCount
    ) {
      return;
    }

    setDirection("next");

    setStartIndex(
      (previousIndex) =>
        previousIndex + 1
    );
  };

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

  // ================= MOUSE DOWN =================

  const handleMouseDown = (event) => {
    if (loading) return;

    setDragStartX(event.clientX);
    setIsDragging(true);
  };

  // ================= MOUSE UP =================

  const handleMouseUp = (event) => {
    if (dragStartX === null) return;

    const dragDistance =
      event.clientX - dragStartX;

    setDragStartX(null);
    setIsDragging(false);

    if (Math.abs(dragDistance) < 70) {
      return;
    }

    // LEFT → NEXT
    if (dragDistance < 0) {
      handleNext();
    }

    // RIGHT → PREVIOUS
    if (dragDistance > 0) {
      handlePrevious();
    }
  };

  // ================= MOUSE LEAVE =================

  const handleMouseLeave = () => {
    if (dragStartX !== null) {
      setDragStartX(null);
      setIsDragging(false);
    }
  };

  // ================= TOUCH START =================

  const handleTouchStart = (event) => {
    if (loading) return;

    setDragStartX(
      event.touches[0].clientX
    );
  };

  // ================= TOUCH END =================

  const handleTouchEnd = (event) => {
    if (dragStartX === null) return;

    const endX =
      event.changedTouches[0].clientX;

    const dragDistance =
      endX - dragStartX;

    setDragStartX(null);

    if (Math.abs(dragDistance) < 70) {
      return;
    }

    // LEFT → NEXT
    if (dragDistance < 0) {
      handleNext();
    }

    // RIGHT → PREVIOUS
    if (dragDistance > 0) {
      handlePrevious();
    }
  };

  // ================= VISIBLE FLOWERS =================

  const visibleFlowers =
    filteredFlowers.slice(
      startIndex,
      startIndex + visibleCount
    );

  // ================= HIDE =================

  if (!isShowFlowerInSleeve) {
    return null;
  }

  // ================= EMPTY =================

  if (
    !loading &&
    flowersInSleeve.length === 0
  ) {
    return null;
  }

  return (
    <section
      className="
        w-full
        max-w-full
        overflow-hidden
        px-3
        sm:px-6
        lg:px-10
        py-8
        sm:py-10
      "
    >

      {/* ================= HEADER ================= */}

      <div className="mb-6 sm:mb-10">

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-4
            sm:gap-5
          "
        >

          {/* LEFT */}

          <div className="min-w-0">

            <div className="flex items-center gap-2 mb-2 sm:mb-3">

              <span
                className="
                  w-6
                  sm:w-8
                  h-[2px]
                  bg-pink-500
                  rounded-full
                  shrink-0
                "
              />

              <span
                className="
                  text-[9px]
                  min-[380px]:text-[10px]
                  sm:text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  sm:tracking-[0.22em]
                  text-pink-500
                "
              >
                Special Collection
              </span>

            </div>

            <h2
              className="
                text-2xl
                min-[380px]:text-3xl
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
                Flower Sleeves
              </span>
            </h2>

            <p
              className="
                mt-2
                sm:mt-3
                text-xs
                sm:text-sm
                lg:text-base
                text-gray-500
                max-w-lg
                leading-relaxed
              "
            >
              Explore our beautiful flowers
              wrapped in elegant sleeves,
              perfect for every special occasion.
            </p>

          </div>

          {/* RIGHT SEARCH */}

          <div
            className="
              w-full
              sm:w-auto
              flex
              justify-end
              items-center
              gap-3
              sm:pb-2
            "
          >

            <div
              className={`
                flex
                items-center
                transition-all
                duration-300
                overflow-hidden
                ${
                  isSearchOpen
                    ? "w-full sm:w-[220px]"
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
                  aria-label="Open flower sleeve search"
                  className="
                    w-9
                    h-9
                    sm:w-10
                    sm:h-10
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
                  <Search
                    size={16}
                    className="sm:hidden"
                  />

                  <Search
                    size={18}
                    className="hidden sm:block"
                  />
                </button>

              ) : (

                <div
                  className="
                    flex
                    items-center
                    w-full
                    h-9
                    sm:h-10
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
                    size={16}
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
                    placeholder="Search flowers..."
                    className="
                      w-full
                      min-w-0
                      bg-transparent
                      outline-none
                      text-xs
                      sm:text-sm
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
                    <X size={15} className="sm:hidden" />
                    <X
                      size={16}
                      className="hidden sm:block"
                    />
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* DIVIDER */}

        <div
          className="
            mt-5
            sm:mt-6
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
          gap-1.5
          min-[380px]:gap-2
          sm:gap-4
          w-full
        "
      >

        {/* LEFT BUTTON */}

        <button
          type="button"
          onClick={handlePrevious}
          disabled={
            startIndex === 0 ||
            loading ||
            filteredFlowers.length === 0
          }
          aria-label="Previous flower sleeves"
          className="
            shrink-0
            w-8
            h-8
            min-[380px]:w-9
            min-[380px]:h-9
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
            size={17}
            className="sm:hidden"
            strokeWidth={2}
          />

          <ChevronLeft
            size={22}
            className="hidden sm:block"
            strokeWidth={2}
          />
        </button>

        {/* FLOWER AREA */}

        <div
          className={`
            flex-1
            min-w-0
            overflow-hidden
            select-none
            touch-pan-y

            ${
              isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
            }
          `}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* LOADING */}

          {loading ? (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-3
                sm:gap-5
              "
            >
              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      h-[400px]
                      min-[380px]:h-[430px]
                      sm:h-[470px]
                      rounded-2xl
                      sm:rounded-3xl
                      bg-gray-100
                      animate-pulse
                    "
                  />
                )
              )}
            </div>

          ) : filteredFlowers.length === 0 ? (

            /* NO SEARCH RESULT */

            <div
              className="
                py-14
                sm:py-20
                px-4
                text-center
                rounded-2xl
                sm:rounded-3xl
                bg-pink-50/50
                border
                border-pink-100
              "
            >

              <div className="text-3xl sm:text-4xl mb-3">
                🌸
              </div>

              <p
                className="
                  text-sm
                  sm:text-base
                  text-gray-600
                  font-medium
                "
              >
                No flower sleeves found
              </p>

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-400
                  mt-1
                "
              >
                Try searching for another
                flower sleeve.
              </p>

            </div>

          ) : (

            /* CARDS */

            <div
              key={startIndex}
              className={`
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-3
                sm:gap-5

                ${
                  direction === "next"
                    ? "animate-slide-next"
                    : "animate-slide-prev"
                }
              `}
            >

              {visibleFlowers.map(
                (flower) => (
                  <FlowerInSleeveItem
                    key={flower._id}
                    flower={flower}
                  />
                )
              )}

            </div>

          )}

        </div>

        {/* RIGHT BUTTON */}

        <button
          type="button"
          onClick={handleNext}
          disabled={
            loading ||
            filteredFlowers.length === 0 ||
            startIndex >=
              filteredFlowers.length -
                visibleCount
          }
          aria-label="Next flower sleeves"
          className="
            shrink-0
            w-8
            h-8
            min-[380px]:w-9
            min-[380px]:h-9
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
            size={17}
            className="sm:hidden"
            strokeWidth={2}
          />

          <ChevronRight
            size={22}
            className="hidden sm:block"
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
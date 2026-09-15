import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";

import { BouquetCard } from "./BouquetCard";
import { useDispatch, useSelector } from "react-redux";

import { GetHeroBouquetsThunk } from "../../../Store/Bouquest/BouquestApi";

export const BouquetCarousel = () => {
  const dispatch = useDispatch();

  const { heroBouquets = [], loading } = useSelector(
    (state) => state.bouquet
  );

  // ============================
  // STATES
  // ============================

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [direction, setDirection] = useState("next");

  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Mouse / Touch Drag
  const [dragStartX, setDragStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // ============================
  // RESPONSIVE VISIBLE COUNT
  // ============================

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

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  // ============================
  // GET BOUQUETS
  // ============================

  useEffect(() => {
    dispatch(GetHeroBouquetsThunk());
  }, [dispatch]);

  // ============================
  // SEARCH FILTER
  // ============================

  const filteredBouquets = heroBouquets.filter((bouquet) => {
    const search = searchText.toLowerCase().trim();

    if (!search) {
      return true;
    }

    return (
      bouquet?.name?.toLowerCase().includes(search) ||
      bouquet?.category?.toLowerCase().includes(search) ||
      bouquet?.occasion?.toLowerCase().includes(search) ||
      bouquet?.description?.toLowerCase().includes(search)
    );
  });

  // ============================
  // RESET INDEX AFTER SEARCH
  // ============================

  useEffect(() => {
    setStartIndex(0);
  }, [searchText]);

  // ============================
  // PREVIOUS
  // ============================

  const handlePrevious = () => {
    if (loading || startIndex <= 0) {
      return;
    }

    setDirection("prev");

    setStartIndex((prev) => prev - 1);
  };

  // ============================
  // NEXT
  // ============================

  const handleNext = () => {
    if (loading) {
      return;
    }

    if (
      startIndex >=
      filteredBouquets.length - visibleCount
    ) {
      return;
    }

    setDirection("next");

    setStartIndex((prev) => prev + 1);
  };

  // ============================
  // MOUSE DOWN
  // ============================

  const handleMouseDown = (e) => {
    if (loading) {
      return;
    }

    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  // ============================
  // MOUSE UP
  // ============================

  const handleMouseUp = (e) => {
    if (dragStartX === null) {
      return;
    }

    const dragDistance = e.clientX - dragStartX;

    setDragStartX(null);
    setIsDragging(false);

    // Small movement ignore
    if (Math.abs(dragDistance) < 70) {
      return;
    }

    // Mouse LEFT → NEXT
    if (dragDistance < 0) {
      handleNext();
    }

    // Mouse RIGHT → PREVIOUS
    if (dragDistance > 0) {
      handlePrevious();
    }
  };

  // ============================
  // MOUSE LEAVE
  // ============================

  const handleMouseLeave = () => {
    if (dragStartX !== null) {
      setDragStartX(null);
      setIsDragging(false);
    }
  };

  // ============================
  // TOUCH START
  // ============================

  const handleTouchStart = (e) => {
    if (loading) {
      return;
    }

    setDragStartX(e.touches[0].clientX);
  };

  // ============================
  // TOUCH END
  // ============================

  const handleTouchEnd = (e) => {
    if (dragStartX === null) {
      return;
    }

    const endX = e.changedTouches[0].clientX;

    const dragDistance = endX - dragStartX;

    setDragStartX(null);

    // Small movement ignore
    if (Math.abs(dragDistance) < 70) {
      return;
    }

    // Swipe LEFT → NEXT
    if (dragDistance < 0) {
      handleNext();
    }

    // Swipe RIGHT → PREVIOUS
    if (dragDistance > 0) {
      handlePrevious();
    }
  };

  // ============================
  // VISIBLE BOUQUETS
  // ============================

  const visibleBouquets = filteredBouquets.slice(
    startIndex,
    startIndex + visibleCount
  );

  // ============================
  // EMPTY
  // ============================

  if (!loading && heroBouquets.length === 0) {
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
        sm:py-12
      "
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-end
          sm:justify-between
          gap-5
          sm:gap-6
          mb-6
          sm:mb-8
        "
      >

        {/* ================= LEFT CONTENT ================= */}

        <div className="min-w-0">

          {/* Small Heading */}

          <div className="flex items-center gap-2 mb-2 sm:mb-3">

            <span
              className="
                w-6
                sm:w-8
                h-[2px]
                rounded-full
                bg-pink-500
                shrink-0
              "
            />

            <span
              className="
                text-[9px]
                sm:text-xs
                uppercase
                tracking-[0.16em]
                sm:tracking-[0.22em]
                font-bold
                text-pink-500
              "
            >
              Handcrafted Collection
            </span>

          </div>

          {/* Main Heading */}

          <h2
            className="
              text-2xl
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
              Bouquets
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mt-1.5
              sm:mt-2
              text-xs
              sm:text-base
              text-gray-500
              max-w-xl
              leading-5
            "
          >
            Thoughtfully arranged bouquets for every
            beautiful moment.
          </p>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div
          className="
            flex
            items-center
            justify-end
            gap-3
            w-full
            sm:w-auto
          "
        >

          {/* ================= SEARCH ================= */}

          {isSearchOpen ? (

            <div
              className="
                hidden
                sm:flex
                items-center
                w-52
                lg:w-72
                h-11
                rounded-full
                border
                border-gray-200
                bg-white
                shadow-sm
                px-4
              "
            >

              <Search
                size={18}
                className="text-gray-400 shrink-0"
              />

              <input
                type="text"
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                placeholder="Search bouquets..."
                autoFocus
                className="
                  w-full
                  min-w-0
                  ml-2
                  outline-none
                  text-sm
                  text-gray-700
                  placeholder:text-gray-400
                "
              />

              <button
                type="button"
                onClick={() => {
                  setSearchText("");
                  setIsSearchOpen(false);
                }}
                className="
                  text-gray-400
                  hover:text-gray-700
                  transition
                  shrink-0
                "
              >
                <X size={17} />
              </button>

            </div>

          ) : (

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search bouquets"
              className="
                w-10
                h-10
                sm:w-11
                sm:h-11
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
                shrink-0
              "
            >
              <Search
                size={18}
                className="sm:w-[19px] sm:h-[19px]"
              />
            </button>

          )}

        </div>

      </div>

      {/* ================================================= */}
      {/* MOBILE SEARCH */}
      {/* ================================================= */}

      {isSearchOpen && (
        <div
          className="
            flex
            sm:hidden
            items-center
            w-full
            h-10
            mb-5
            rounded-full
            border
            border-gray-200
            bg-white
            shadow-sm
            px-3
          "
        >

          <Search
            size={17}
            className="
              text-gray-400
              shrink-0
            "
          />

          <input
            type="text"
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
            placeholder="Search bouquets..."
            autoFocus
            className="
              flex-1
              min-w-0
              ml-2
              outline-none
              text-xs
              sm:text-sm
              text-gray-700
            "
          />

          <button
            type="button"
            onClick={() => {
              setSearchText("");
              setIsSearchOpen(false);
            }}
            className="
              text-gray-400
              shrink-0
              ml-1
            "
          >
            <X size={17} />
          </button>

        </div>
      )}

      {/* ================================================= */}
      {/* DIVIDER */}
      {/* ================================================= */}

      <div
        className="
          mb-5
          sm:mb-7
          h-px
          bg-gradient-to-r
          from-pink-200
          via-gray-100
          to-transparent
        "
      />

      {/* ================================================= */}
      {/* CAROUSEL */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-center
          gap-1.5
          sm:gap-5
          w-full
          min-w-0
        "
      >

        {/* ================= LEFT ARROW ================= */}

        <button
          type="button"
          onClick={handlePrevious}
          disabled={
            startIndex === 0 ||
            loading
          }
          aria-label="Previous bouquets"
          className="
            shrink-0
            w-8
            h-8
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
            hover:bg-pink-500
            hover:text-white
            hover:border-pink-500
            active:scale-90
            disabled:opacity-25
            disabled:cursor-not-allowed
            transition-all
            duration-300
          "
        >
          <ChevronLeft
            size={17}
            className="sm:w-[21px] sm:h-[21px]"
          />
        </button>

        {/* ================= DRAG AREA ================= */}

        <div
          className={`
            flex-1
            min-w-0
            max-w-full
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

          {/* ================= LOADING ================= */}

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
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="
                    h-[400px]
                    sm:h-[430px]
                    rounded-2xl
                    sm:rounded-3xl
                    bg-gray-100
                    animate-pulse
                  "
                />
              ))}
            </div>

          ) : visibleBouquets.length > 0 ? (

            /* ================= CARDS ================= */

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
                    ? "bouquet-slide-next"
                    : "bouquet-slide-prev"
                }
              `}
            >

              {visibleBouquets.map((bouquet) => (
                <BouquetCard
                  key={bouquet._id}
                  bouquet={bouquet}
                />
              ))}

            </div>

          ) : (

            /* ================= NO SEARCH RESULT ================= */

            <div
              className="
                w-full
                py-12
                sm:py-16
                px-3
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <div
                className="
                  w-14
                  h-14
                  sm:w-16
                  sm:h-16
                  rounded-full
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                  text-pink-500
                  mb-3
                  sm:mb-4
                "
              >
                <Search
                  size={23}
                  className="sm:w-[26px] sm:h-[26px]"
                />
              </div>

              <h3
                className="
                  text-base
                  sm:text-lg
                  font-bold
                  text-gray-800
                "
              >
                No bouquets found
              </h3>

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                  mt-1
                  max-w-xs
                "
              >
                Try searching with another name,
                category or occasion.
              </p>

            </div>

          )}

        </div>

        {/* ================= RIGHT ARROW ================= */}

        <button
          type="button"
          onClick={handleNext}
          disabled={
            loading ||
            startIndex >=
              filteredBouquets.length -
                visibleCount
          }
          aria-label="Next bouquets"
          className="
            shrink-0
            w-8
            h-8
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
            hover:bg-pink-500
            hover:text-white
            hover:border-pink-500
            active:scale-90
            disabled:opacity-25
            disabled:cursor-not-allowed
            transition-all
            duration-300
          "
        >
          <ChevronRight
            size={17}
            className="sm:w-[21px] sm:h-[21px]"
          />
        </button>

      </div>

      {/* ================================================= */}
      {/* POSITION INDICATOR */}
      {/* ================================================= */}

      {!loading &&
        filteredBouquets.length > visibleCount && (

          <div
            className="
              flex
              justify-center
              mt-5
              sm:mt-7
              gap-1.5
              overflow-hidden
            "
          >

            {Array.from({
              length:
                filteredBouquets.length -
                visibleCount +
                1,
            }).map((_, index) => (

              <button
                key={index}
                type="button"
                onClick={() => {
                  setDirection(
                    index > startIndex
                      ? "next"
                      : "prev"
                  );

                  setStartIndex(index);
                }}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    startIndex === index
                      ? "w-7 sm:w-8 bg-pink-500"
                      : "w-2 bg-gray-200 hover:bg-pink-300"
                  }
                `}
                aria-label={`Go to bouquet ${
                  index + 1
                }`}
              />

            ))}

          </div>

        )}

      {/* ================================================= */}
      {/* ANIMATION */}
      {/* ================================================= */}

      <style>
        {`
          @keyframes bouquetSlideNext {
            from {
              opacity: 0;
              transform: translateX(70px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes bouquetSlidePrev {
            from {
              opacity: 0;
              transform: translateX(-70px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .bouquet-slide-next {
            animation:
              bouquetSlideNext
              0.65s
              cubic-bezier(0.22, 1, 0.36, 1);
          }

          .bouquet-slide-prev {
            animation:
              bouquetSlidePrev
              0.65s
              cubic-bezier(0.22, 1, 0.36, 1);
          }
        `}
      </style>

    </section>
  );
};
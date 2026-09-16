import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { GetHeroBouquetsThunk } from "../../../Store/Bouquest/BouquestApi";

export const BouquetSlider = () => {
  const { heroBouquets } = useSelector(
    (state) => state.bouquet
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [randomBouquets, setRandomBouquets] = useState([]);

  // ==============================
  // SWIPE REFS
  // ==============================

  const startX = useRef(0);
  const isDragging = useRef(false);
  const hasSwiped = useRef(false);

  // ==============================
  // GET BOUQUETS
  // ==============================

  useEffect(() => {
    dispatch(GetHeroBouquetsThunk());
  }, [dispatch]);

  // ==============================
  // RANDOM 4 BOUQUETS
  // ==============================

  useEffect(() => {
    if (!heroBouquets || heroBouquets.length === 0) {
      setRandomBouquets([]);
      return;
    }

    const shuffled = [...heroBouquets];

    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(
        Math.random() * (i + 1)
      );

      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i],
      ];
    }

    setRandomBouquets(
      shuffled.slice(0, 4)
    );

    setCurrentIndex(0);
    setDirection("right");
  }, [heroBouquets]);

  const bouquets = randomBouquets;

  // ==============================
  // CLICK / NAVIGATION
  // ==============================

  const HandleClick = (id) => {
    if (hasSwiped.current) {
      hasSwiped.current = false;
      return;
    }

    if (!id) return;

    navigate(`/bouquet/${id}`);
  };

  // ==============================
  // NEXT
  // ==============================

  const handleNext = () => {
    if (bouquets.length <= 1) return;

    setDirection("right");

    setCurrentIndex((prev) =>
      prev === bouquets.length - 1
        ? 0
        : prev + 1
    );
  };

  // ==============================
  // PREVIOUS
  // ==============================

  const handlePrevious = () => {
    if (bouquets.length <= 1) return;

    setDirection("left");

    setCurrentIndex((prev) =>
      prev === 0
        ? bouquets.length - 1
        : prev - 1
    );
  };

  // ==============================
  // AUTO SLIDE
  // ==============================

  useEffect(() => {
    if (bouquets.length <= 1) return;

    const interval = setInterval(() => {
      setDirection("right");

      setCurrentIndex((prev) =>
        prev === bouquets.length - 1
          ? 0
          : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [bouquets.length]);

  // ==============================
  // MOUSE DOWN
  // ==============================

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    isDragging.current = true;
    hasSwiped.current = false;
  };

  // ==============================
  // MOUSE UP
  // ==============================

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;

    const endX = e.clientX;

    const difference =
      startX.current - endX;

    isDragging.current = false;

    if (Math.abs(difference) < 50) {
      return;
    }

    hasSwiped.current = true;

    if (difference > 0) {
      handleNext();
    } else {
      handlePrevious();
    }
  };

  // ==============================
  // MOUSE LEAVE
  // ==============================

  const handleMouseLeave = (e) => {
    if (!isDragging.current) return;

    const endX = e.clientX;

    const difference =
      startX.current - endX;

    isDragging.current = false;

    if (Math.abs(difference) < 50) {
      return;
    }

    hasSwiped.current = true;

    if (difference > 0) {
      handleNext();
    } else {
      handlePrevious();
    }
  };

  // ==============================
  // TOUCH START
  // ==============================

  const handleTouchStart = (e) => {
    startX.current =
      e.touches[0].clientX;

    isDragging.current = true;
    hasSwiped.current = false;
  };

  // ==============================
  // TOUCH END
  // ==============================

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;

    const endX =
      e.changedTouches[0].clientX;

    const difference =
      startX.current - endX;

    isDragging.current = false;

    if (Math.abs(difference) < 50) {
      return;
    }

    hasSwiped.current = true;

    if (difference > 0) {
      handleNext();
    } else {
      handlePrevious();
    }
  };

  // ==============================
  // NO BOUQUET
  // ==============================

  const currentBouquet =
    bouquets[currentIndex];

  if (!currentBouquet) {
    return null;
  }

  return (
    <section
      className="
        w-full
        max-w-full
        overflow-hidden
        bg-white
        px-2.5
        min-[380px]:px-3
        sm:px-6
        lg:px-10
        py-4
        sm:py-6
      "
    >
      {/* ================= HERO ================= */}

      <div
        className="
          relative
          w-full
          h-[430px]
          min-[380px]:h-[450px]
          sm:h-[480px]
          lg:h-[540px]
          overflow-hidden
          rounded-2xl
          sm:rounded-3xl
          bg-gray-100
          shadow-[0_15px_45px_rgba(0,0,0,0.08)]
          select-none
        "
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ================= SLIDE ================= */}

        <div
          key={currentBouquet._id}
          onClick={() =>
            HandleClick(currentBouquet._id)
          }
          className={`
            absolute
            inset-0
            animate-slide-${direction}
            cursor-pointer
          `}
        >
          {/* ================= BACKGROUND IMAGE ================= */}

          {currentBouquet.image ? (
            <>
              <img
                src={currentBouquet.image}
                alt=""
                draggable="false"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  scale-110
                  blur-2xl
                  opacity-30
                  pointer-events-none
                "
              />

              {/* SOFT LAYER */}

              <div
                className="
                  absolute
                  inset-0
                  bg-white/20
                  sm:bg-white/30
                  pointer-events-none
                "
              />

              {/* ================= MAIN IMAGE ================= */}

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  pointer-events-none
                "
              >
                <img
                  src={currentBouquet.image}
                  alt={currentBouquet.name}
                  draggable="false"
                  className="
                    relative
                    z-10
                    w-full
                    h-full
                    object-contain
                    p-2
                    min-[380px]:p-3
                    sm:p-5
                    lg:p-7
                  "
                />
              </div>
            </>
          ) : (
            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-pink-50
                to-rose-100
                text-gray-400
              "
            >
              No Image
            </div>
          )}

          {/* ================= DARK OVERLAY ================= */}

          <div
            className="
              absolute
              inset-0
              z-10
              bg-gradient-to-r
              from-black/70
              via-black/30
              to-transparent
              pointer-events-none
            "
          />

          {/* ================= CONTENT ================= */}

          <div
            className="
              absolute
              left-4
              right-12
              sm:left-8
              sm:right-auto
              lg:left-14
              bottom-10
              min-[380px]:bottom-12
              sm:bottom-16
              max-w-xl
              text-white
              z-20
              pointer-events-none
            "
          >
            {/* OCCASION */}

            <p
              className="
                text-[10px]
                min-[380px]:text-xs
                sm:text-sm
                uppercase
                tracking-[0.14em]
                sm:tracking-[0.2em]
                font-semibold
                text-pink-200
                truncate
              "
            >
              {currentBouquet.occasion ||
                "Special Collection"}
            </p>

            {/* NAME */}

            <h1
              className="
                mt-1.5
                sm:mt-2
                text-2xl
                min-[380px]:text-3xl
                sm:text-4xl
                lg:text-6xl
                font-extrabold
                leading-tight
                drop-shadow-lg
                line-clamp-2
              "
            >
              {currentBouquet.name}
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-2
                sm:mt-3
                max-w-lg
                text-xs
                min-[380px]:text-sm
                sm:text-base
                leading-5
                sm:leading-6
                text-white/90
                line-clamp-2
                drop-shadow
              "
            >
              {currentBouquet.description}
            </p>

            {/* DETAILS */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
                sm:gap-3
                mt-3
                sm:mt-5
                max-w-full
              "
            >
              {/* PRICE */}

              <span
                className="
                  px-3
                  sm:px-4
                  py-1.5
                  sm:py-2
                  rounded-lg
                  sm:rounded-xl
                  bg-white
                  text-gray-900
                  text-base
                  sm:text-lg
                  font-extrabold
                  shadow-lg
                  whitespace-nowrap
                "
              >
                ₹{currentBouquet.price}
              </span>

              {/* SIZE */}

              {currentBouquet.size && (
                <span
                  className="
                    px-3
                    sm:px-4
                    py-1.5
                    sm:py-2
                    rounded-lg
                    sm:rounded-xl
                    bg-black/30
                    backdrop-blur-sm
                    border
                    border-white/30
                    text-white
                    text-xs
                    sm:text-sm
                    font-semibold
                    whitespace-nowrap
                  "
                >
                  {currentBouquet.size}
                </span>
              )}

              {/* FLOWER COUNT */}

              {currentBouquet.flowerCount && (
                <span
                  className="
                    hidden
                    sm:flex
                    px-3
                    py-2
                    rounded-xl
                    bg-black/30
                    backdrop-blur-sm
                    border
                    border-white/20
                    text-white
                    text-sm
                    font-semibold
                    whitespace-nowrap
                  "
                >
                  🌸 {currentBouquet.flowerCount} Flowers
                </span>
              )}

              {/* VIEW DETAILS */}

              <span
                onClick={(e) => {
                  e.stopPropagation();

                  if (hasSwiped.current) {
                    hasSwiped.current = false;
                    return;
                  }

                  navigate(
                    `/bouquet/${currentBouquet._id}`
                  );
                }}
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-1
                  text-sm
                  font-semibold
                  text-white/90
                  cursor-pointer
                  pointer-events-auto
                  hover:text-pink-200
                  transition-colors
                  duration-200
                "
              >
                View Details

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-200
                  "
                />
              </span>
            </div>
          </div>
        </div>

        {/* ================= LEFT ARROW ================= */}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            hasSwiped.current = false;
            handlePrevious();
          }}
          aria-label="Previous bouquet"
          className="
            absolute
            z-30

            /* MOBILE - TOP RIGHT */
            top-3
            right-12
            w-8
            h-8

            /* TABLET / DESKTOP - LEFT CENTER */
            sm:left-6
            sm:right-auto
            sm:top-1/2
            sm:-translate-y-1/2
            sm:w-12
            sm:h-12

            rounded-full
            bg-white/95
            backdrop-blur-sm
            text-gray-800
            shadow-xl
            border
            border-white/60
            flex
            items-center
            justify-center
            hover:bg-pink-500
            hover:text-white
            hover:scale-105
            active:scale-95
            transition-all
            duration-300
            cursor-pointer
          "
        >
          <ChevronLeft size={18} />
        </button>

        {/* ================= RIGHT ARROW ================= */}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            hasSwiped.current = false;
            handleNext();
          }}
          aria-label="Next bouquet"
          className="
            absolute
            z-30

            /* MOBILE - TOP RIGHT */
            top-3
            right-3
            w-8
            h-8

            /* TABLET / DESKTOP - RIGHT CENTER */
            sm:right-6
            sm:top-1/2
            sm:-translate-y-1/2
            sm:w-12
            sm:h-12

            rounded-full
            bg-white/95
            backdrop-blur-sm
            text-gray-800
            shadow-xl
            border
            border-white/60
            flex
            items-center
            justify-center
            hover:bg-pink-500
            hover:text-white
            hover:scale-105
            active:scale-95
            transition-all
            duration-300
            cursor-pointer
          "
        >
          <ChevronRight size={18} />
        </button>

        {/* ================= DOTS ================= */}

        <div
          className="
            absolute
            bottom-4
            sm:bottom-5
            left-1/2
            -translate-x-1/2
            z-30
            flex
            items-center
            gap-1.5
            sm:gap-2
            px-2.5
            sm:px-3
            py-1.5
            sm:py-2
            rounded-full
            bg-black/25
            backdrop-blur-sm
          "
        >
          {bouquets.map(
            (bouquet, index) => (
              <button
                key={
                  bouquet._id || index
                }
                type="button"
                aria-label={`Bouquet ${
                  index + 1
                }`}
                onClick={(e) => {
                  e.stopPropagation();

                  hasSwiped.current = false;

                  setDirection(
                    index > currentIndex
                      ? "right"
                      : "left"
                  );

                  setCurrentIndex(index);
                }}
                className={`
                  h-1.5
                  sm:h-2
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    currentIndex === index
                      ? "w-6 sm:w-7 bg-white"
                      : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
                  }
                `}
              />
            )
          )}
        </div>

        {/* ================= COUNTER ================= */}

        <div
          className="
            absolute
            top-3
            right-3
            sm:top-5
            sm:right-5
            z-30
            px-2.5
            sm:px-3
            py-1
            sm:py-1.5
            rounded-full
            bg-black/30
            backdrop-blur-sm
            text-white
            text-[10px]
            sm:text-xs
            font-semibold
            border
            border-white/10
          "
        >
          {currentIndex + 1} / {bouquets.length}
        </div>
      </div>

      {/* ================= ANIMATION ================= */}

      <style>
        {`
          @keyframes slideRight {
            0% {
              opacity: 0;
              transform: translateX(60px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideLeft {
            0% {
              opacity: 0;
              transform: translateX(-60px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-slide-right {
            animation:
              slideRight
              0.6s
              cubic-bezier(0.22, 1, 0.36, 1);
          }

          .animate-slide-left {
            animation:
              slideLeft
              0.6s
              cubic-bezier(0.22, 1, 0.36, 1);
          }
        `}
      </style>
    </section>
  );
};
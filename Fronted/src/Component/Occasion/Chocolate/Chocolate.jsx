import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { ChocolateItem } from "./ChocolateItem";
import { GetAllChocolateThunk } from "../../../Store/Chocolate/ChocolateApi";

export const Chocolate = () => {
  const dispatch = useDispatch();

  const { chocolates } = useSelector(
    (state) => state.chocolate
  );

  const [currentIndex, setCurrentIndex] =
    useState(0);

  // ==============================
  // GET CHOCOLATES
  // ==============================

  useEffect(() => {
    dispatch(GetAllChocolateThunk());
  }, [dispatch]);

  // ==============================
  // RESPONSIVE VISIBLE COUNT
  // ==============================

  const getVisibleCount = () => {
    if (typeof window === "undefined") {
      return 3;
    }

    if (window.innerWidth < 640) {
      return 1;
    }

    if (window.innerWidth < 1024) {
      return 2;
    }

    return 3;
  };

  const [visibleCount, setVisibleCount] =
    useState(getVisibleCount);

  // ==============================
  // HANDLE RESIZE
  // ==============================

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  // ==============================
  // SAFE CURRENT INDEX
  // ==============================

  useEffect(() => {
    const maxIndex = Math.max(
      (chocolates?.length || 0) -
        visibleCount,
      0
    );

    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [
    chocolates?.length,
    visibleCount,
    currentIndex,
  ]);

  if (!chocolates?.length) {
    return null;
  }

  // ==============================
  // VISIBLE CHOCOLATES
  // ==============================

  const visibleChocolates =
    chocolates.slice(
      currentIndex,
      currentIndex + visibleCount
    );

  // ==============================
  // NEXT
  // ==============================

  const next = () => {
    const maxIndex = Math.max(
      chocolates.length - visibleCount,
      0
    );

    if (currentIndex < maxIndex) {
      setCurrentIndex(
        (prev) => prev + 1
      );
    }
  };

  // ==============================
  // PREVIOUS
  // ==============================

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        (prev) => prev - 1
      );
    }
  };

  return (
    <div
      className="
        w-full
        min-w-0
        overflow-hidden
        mt-4
        sm:mt-6
      "
    >
      {/* ==============================
          HEADER
      ============================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          mb-3
          sm:mb-4
        "
      >
        {/* TITLE */}

        <div className="min-w-0">
          <p
            className="
              text-[9px]
              min-[380px]:text-[10px]
              sm:text-xs
              font-semibold
              text-pink-500
              uppercase
              tracking-wider
            "
          >
            A little something sweet
          </p>

          <h2
            className="
              text-base
              min-[380px]:text-lg
              sm:text-xl
              font-bold
              text-gray-800
              truncate
            "
          >
            Choose a Chocolate 🍫
          </h2>
        </div>

        {/* ==============================
            ARROWS
        ============================== */}

        <div
          className="
            flex
            gap-1.5
            sm:gap-2
            shrink-0
          "
        >
          {/* PREVIOUS */}

          <button
            type="button"
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Previous chocolates"
            className="
              w-7
              h-7
              min-[380px]:w-8
              min-[380px]:h-8
              sm:w-9
              sm:h-9
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-700
              flex
              items-center
              justify-center
              hover:bg-pink-500
              hover:text-white
              hover:border-pink-500
              disabled:opacity-30
              disabled:cursor-not-allowed
              transition
            "
          >
            <ChevronLeft
              size={14}
              className="
                min-[380px]:w-4
                min-[380px]:h-4
                sm:w-[18px]
                sm:h-[18px]
              "
            />
          </button>

          {/* NEXT */}

          <button
            type="button"
            onClick={next}
            disabled={
              currentIndex + visibleCount >=
              chocolates.length
            }
            aria-label="Next chocolates"
            className="
              w-7
              h-7
              min-[380px]:w-8
              min-[380px]:h-8
              sm:w-9
              sm:h-9
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-700
              flex
              items-center
              justify-center
              hover:bg-pink-500
              hover:text-white
              hover:border-pink-500
              disabled:opacity-30
              disabled:cursor-not-allowed
              transition
            "
          >
            <ChevronRight
              size={14}
              className="
                min-[380px]:w-4
                min-[380px]:h-4
                sm:w-[18px]
                sm:h-[18px]
              "
            />
          </button>
        </div>
      </div>

      {/* ==============================
          CHOCOLATES
      ============================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-3
          sm:gap-4
          w-full
          min-w-0
        "
      >
        {visibleChocolates.map(
          (chocolate) => (
            <ChocolateItem
              key={chocolate._id}
              chocolate={chocolate}
            />
          )
        )}
      </div>
    </div>
  );
};
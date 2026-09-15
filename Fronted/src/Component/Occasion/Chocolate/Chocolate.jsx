import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ChocolateItem } from "./ChocolateItem";
import { GetAllChocolateThunk } from "../../../Store/Chocolate/ChocolateApi";

export const Chocolate = () => {
  const dispatch = useDispatch();

  const { chocolates } = useSelector(
    (state) => state.chocolate
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(GetAllChocolateThunk());
  }, [dispatch]);

  if (!chocolates?.length) return null;

  const visibleChocolates = chocolates.slice(
    currentIndex,
    currentIndex + 3
  );

  const next = () => {
    if (currentIndex + 3 < chocolates.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full min-w-0 overflow-hidden mt-4 sm:mt-6">

      {/* HEADER */}

      <div className="flex items-center justify-between gap-3 mb-3">

        <div className="min-w-0">
          <p className="
            text-[9px]
            min-[380px]:text-[10px]
            font-semibold
            text-pink-500
            uppercase
            tracking-wider
          ">
            A little something sweet
          </p>

          <h2 className="
            text-base
            min-[380px]:text-lg
            font-bold
            text-gray-800
            truncate
          ">
            Choose a Chocolate 🍫
          </h2>
        </div>

        {/* ARROWS */}

        <div className="flex gap-1.5 shrink-0">

          <button
            type="button"
            onClick={prev}
            disabled={currentIndex === 0}
            className="
              w-7
              h-7
              min-[380px]:w-8
              min-[380px]:h-8
              rounded-full
              border
              border-gray-200
              bg-white
              flex
              items-center
              justify-center
              hover:bg-pink-500
              hover:text-white
              disabled:opacity-30
              transition
            "
          >
            <ChevronLeft
              size={14}
              className="min-[380px]:w-4 min-[380px]:h-4"
            />
          </button>

          <button
            type="button"
            onClick={next}
            disabled={
              currentIndex + 3 >= chocolates.length
            }
            className="
              w-7
              h-7
              min-[380px]:w-8
              min-[380px]:h-8
              rounded-full
              border
              border-gray-200
              bg-white
              flex
              items-center
              justify-center
              hover:bg-pink-500
              hover:text-white
              disabled:opacity-30
              transition
            "
          >
            <ChevronRight
              size={14}
              className="min-[380px]:w-4 min-[380px]:h-4"
            />
          </button>

        </div>

      </div>

      {/* CHOCOLATES */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-3
        gap-2
        min-[380px]:gap-3
        max-w-3xl
        w-full
        min-w-0
      ">
        {visibleChocolates.map((chocolate) => (
          <ChocolateItem
            key={chocolate._id}
            chocolate={chocolate}
          />
        ))}
      </div>

    </div>
  );
};
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
    <div className="w-full mt-6">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-3">

        <div>
          <p className="
            text-[10px]
            font-semibold
            text-pink-500
            uppercase
            tracking-wider
          ">
            A little something sweet
          </p>

          <h2 className="
            text-lg
            font-bold
            text-gray-800
          ">
            Choose a Chocolate 🍫
          </h2>
        </div>

        {/* ARROWS */}

        <div className="flex gap-1.5">

          <button
            type="button"
            onClick={prev}
            disabled={currentIndex === 0}
            className="
              w-8
              h-8
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
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={next}
            disabled={
              currentIndex + 3 >= chocolates.length
            }
            className="
              w-8
              h-8
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
            <ChevronRight size={16} />
          </button>

        </div>

      </div>

      {/* CHOCOLATES */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-3
        gap-3
        max-w-3xl
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
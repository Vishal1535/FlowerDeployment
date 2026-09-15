import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, Flower2 } from "lucide-react";

import { FlowerInBox } from "./FlowerInBox/FlowerInBox";
import { FlowerInSleeve } from "./FlowerInSleeve/FlowerInSleeve";

import {
  hideFlowerInBox,
  showFlowerInBox,
} from "../../../../Store/FlowerInBox/FlowerInBoxSlice";

import {
  hideFlowerInSleeve,
  showFlowerInSleeve,
} from "../../../../Store/FlowerSleeve/FlowerSleeveSlice";

export const FlowerPackaging = () => {
  const dispatch = useDispatch();

  const { isShowFlowerInBox } = useSelector(
    (state) => state.flowerInBox
  );

  const { isShowFlowerInSleeve } = useSelector(
    (state) => state.flowerInSleeve
  );

  // ================= FLOWER IN BOX =================

  const handleFlowerInBox = () => {
    dispatch(hideFlowerInSleeve());
    dispatch(showFlowerInBox());
  };

  // ================= FLOWER IN SLEEVE =================

  const handleFlowerInSleeve = () => {
    dispatch(hideFlowerInBox());
    dispatch(showFlowerInSleeve());
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-8">

      {/* ================= TITLE ================= */}

      <div className="text-center mb-8">

        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            text-pink-500
            mb-2
          "
        >
          Packaging Collection
        </p>

        <h2
          className="
            text-3xl
            sm:text-4xl
            font-bold
            text-gray-900
          "
        >
          Flower{" "}
          <span className="text-pink-500">
            Packaging
          </span>
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Choose the perfect packaging for your flowers
        </p>

      </div>

      {/* ================= ELLIPSE BUTTONS ================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          gap-5
          sm:gap-7
          mb-10
        "
      >

        {/* ================= FLOWER IN BOX ================= */}

        <button
          type="button"
          onClick={handleFlowerInBox}
          className={`
            group
            w-full
            max-w-[360px]
            h-[76px]
            rounded-full
            flex
            items-center
            justify-center
            gap-4
            border
            cursor-pointer
            transition-all
            duration-300
            active:scale-[0.97]

            ${
              isShowFlowerInBox
                ? `
                  bg-pink-500
                  border-pink-500
                  text-white
                  shadow-[0_12px_35px_rgba(236,72,153,0.28)]
                  -translate-y-1
                `
                : `
                  bg-white
                  border-gray-200
                  text-gray-700
                  shadow-[0_8px_25px_rgba(0,0,0,0.05)]
                  hover:border-pink-300
                  hover:text-pink-600
                  hover:shadow-[0_12px_30px_rgba(236,72,153,0.12)]
                  hover:-translate-y-1
                `
            }
          `}
        >

          {/* ICON */}

          <span
            className={`
              w-11
              h-11
              rounded-full
              flex
              items-center
              justify-center
              transition-all
              duration-300

              ${
                isShowFlowerInBox
                  ? "bg-white/20 text-white"
                  : "bg-pink-50 text-pink-500 group-hover:bg-pink-100"
              }
            `}
          >
            <Package size={22} strokeWidth={1.8} />
          </span>

          {/* TEXT */}

          <div className="text-left">

            <p
              className={`
                text-lg
                font-bold
                leading-none
                ${
                  isShowFlowerInBox
                    ? "text-white"
                    : "text-gray-800 group-hover:text-pink-600"
                }
              `}
            >
              Flower In Box
            </p>

            <p
              className={`
                text-xs
                mt-1
                ${
                  isShowFlowerInBox
                    ? "text-white/80"
                    : "text-gray-400"
                }
              `}
            >
              Elegant box packaging
            </p>

          </div>

        </button>

        {/* ================= FLOWER IN SLEEVE ================= */}

        <button
          type="button"
          onClick={handleFlowerInSleeve}
          className={`
            group
            w-full
            max-w-[360px]
            h-[76px]
            rounded-full
            flex
            items-center
            justify-center
            gap-4
            border
            cursor-pointer
            transition-all
            duration-300
            active:scale-[0.97]

            ${
              isShowFlowerInSleeve
                ? `
                  bg-pink-500
                  border-pink-500
                  text-white
                  shadow-[0_12px_35px_rgba(236,72,153,0.28)]
                  -translate-y-1
                `
                : `
                  bg-white
                  border-gray-200
                  text-gray-700
                  shadow-[0_8px_25px_rgba(0,0,0,0.05)]
                  hover:border-pink-300
                  hover:text-pink-600
                  hover:shadow-[0_12px_30px_rgba(236,72,153,0.12)]
                  hover:-translate-y-1
                `
            }
          `}
        >

          {/* ICON */}

          <span
            className={`
              w-11
              h-11
              rounded-full
              flex
              items-center
              justify-center
              transition-all
              duration-300

              ${
                isShowFlowerInSleeve
                  ? "bg-white/20 text-white"
                  : "bg-pink-50 text-pink-500 group-hover:bg-pink-100"
              }
            `}
          >
            <Flower2 size={22} strokeWidth={1.8} />
          </span>

          {/* TEXT */}

          <div className="text-left">

            <p
              className={`
                text-lg
                font-bold
                leading-none
                ${
                  isShowFlowerInSleeve
                    ? "text-white"
                    : "text-gray-800 group-hover:text-pink-600"
                }
              `}
            >
              Flower In Sleeve
            </p>

            <p
              className={`
                text-xs
                mt-1
                ${
                  isShowFlowerInSleeve
                    ? "text-white/80"
                    : "text-gray-400"
                }
              `}
            >
              Simple sleeve packaging
            </p>

          </div>

        </button>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="w-full">

        <FlowerInBox />

        <FlowerInSleeve />

      </div>

    </section>
  );
};
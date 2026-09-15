import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import {
  openEditFlowerInBoxPopup,
  openDeleteFlowerInBoxPopup,
} from "../../../Store/FlowerInBox/FlowerInBoxSlice";

export const FlowerInBoxItem = ({ flowerInBox }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="
        w-full
        min-w-0
        bg-white
        border
        border-gray-100
        rounded-xl
        min-[380px]:rounded-2xl
        shadow-sm
        overflow-hidden
        hover:shadow-md
        transition
      "
    >

      {/* ================= IMAGE ================= */}

      <div className="w-full h-40 min-[380px]:h-44 sm:h-48 bg-gray-100 overflow-hidden">
        <img
          src={flowerInBox?.image}
          alt={flowerInBox?.name}
          className="
            w-full
            h-full
            object-cover
            transition
            duration-300
            hover:scale-105
          "
        />
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-3 min-[380px]:p-4">

        {/* NAME + PRICE */}

        <div className="flex items-start justify-between gap-2 min-[380px]:gap-3">

          <div className="min-w-0 flex-1">

            <h3 className="text-base min-[380px]:text-lg font-semibold text-gray-800 line-clamp-1">
              {flowerInBox?.name}
            </h3>

            <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1.5 line-clamp-2 leading-5">
              {flowerInBox?.description}
            </p>

          </div>

          <span className="text-base min-[380px]:text-lg font-semibold text-pink-600 whitespace-nowrap shrink-0">
            ₹{flowerInBox?.discountPrice || flowerInBox?.price}
          </span>

        </div>

        {/* ================= DETAILS ================= */}

        <div className="flex flex-wrap gap-1.5 min-[380px]:gap-2 mt-3 min-[380px]:mt-4">

          {/* Occasion */}

          {flowerInBox?.occasion && (
            <span
              className="
                max-w-full
                px-2.5
                min-[380px]:px-3
                py-1
                min-[380px]:py-1.5
                rounded-full
                bg-pink-50
                text-pink-600
                text-[11px]
                min-[380px]:text-xs
                font-medium
                truncate
              "
            >
              {flowerInBox.occasion}
            </span>
          )}

          {/* Flower Type */}

          {flowerInBox?.flowerType && (
            <span
              className="
                max-w-full
                px-2.5
                min-[380px]:px-3
                py-1
                min-[380px]:py-1.5
                rounded-full
                bg-gray-100
                text-gray-600
                text-[11px]
                min-[380px]:text-xs
                font-medium
                truncate
              "
            >
              {flowerInBox.flowerType}
            </span>
          )}

          {/* Box Type */}

          {flowerInBox?.boxType && (
            <span
              className="
                max-w-full
                px-2.5
                min-[380px]:px-3
                py-1
                min-[380px]:py-1.5
                rounded-full
                bg-gray-100
                text-gray-600
                text-[11px]
                min-[380px]:text-xs
                font-medium
                truncate
              "
            >
              {flowerInBox.boxType}
            </span>
          )}

          {/* Color */}

          {flowerInBox?.color && (
            <span
              className="
                max-w-full
                px-2.5
                min-[380px]:px-3
                py-1
                min-[380px]:py-1.5
                rounded-full
                bg-gray-100
                text-gray-600
                text-[11px]
                min-[380px]:text-xs
                font-medium
                truncate
              "
            >
              {flowerInBox.color}
            </span>
          )}

          {/* Stock */}

          {flowerInBox?.stock !== undefined && (
            <span
              className="
                px-2.5
                min-[380px]:px-3
                py-1
                min-[380px]:py-1.5
                rounded-full
                bg-gray-100
                text-gray-600
                text-[11px]
                min-[380px]:text-xs
                font-medium
                whitespace-nowrap
              "
            >
              Stock: {flowerInBox.stock}
            </span>
          )}

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col min-[380px]:flex-row gap-2 min-[380px]:gap-2.5 mt-4 min-[380px]:mt-5">

          {/* EDIT */}

          <button
            type="button"
            onClick={() =>
              dispatch(
                openEditFlowerInBoxPopup(
                  flowerInBox
                )
              )
            }
            className="
              w-full
              min-[380px]:flex-1
              flex
              items-center
              justify-center
              gap-2
              py-2.5
              rounded-xl
              border
              border-gray-200
              text-gray-600
              text-sm
              font-medium
              hover:bg-pink-50
              hover:text-pink-600
              transition
            "
          >
            <Edit size={16} />
            Edit
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={() =>
              dispatch(
                openDeleteFlowerInBoxPopup(
                  flowerInBox
                )
              )
            }
            className="
              w-full
              min-[380px]:flex-1
              flex
              items-center
              justify-center
              gap-2
              py-2.5
              rounded-xl
              bg-red-50
              text-red-500
              text-sm
              font-medium
              hover:bg-red-100
              transition
            "
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};
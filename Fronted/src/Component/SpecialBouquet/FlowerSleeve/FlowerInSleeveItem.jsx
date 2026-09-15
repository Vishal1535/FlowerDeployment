import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import {
  openEditFlowerInSleevePopup,
  openDeleteFlowerInSleevePopup,
} from "../../../Store/FlowerSleeve/FlowerSleeveSlice";

export const FlowerInSleeveItem = ({ flower }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="
        bg-white
        border
        border-gray-100
        rounded-2xl
        shadow-sm
        overflow-hidden
        hover:shadow-md
        transition
      "
    >
      {/* ================= IMAGE ================= */}

      <div className="w-full h-44 bg-gray-100 overflow-hidden">
        <img
          src={flower?.image}
          alt={flower?.name || "Flower in sleeve"}
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

      <div className="p-4">

        {/* ================= NAME + PRICE ================= */}

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {flower?.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-5">
              {flower?.description}
            </p>

          </div>

          {/* PRICE */}

          <div className="text-right whitespace-nowrap">

            {flower?.discountPrice > 0 ? (
              <>
                <p className="text-lg font-semibold text-pink-600">
                  ₹{flower.discountPrice}
                </p>

                <p className="text-xs text-gray-400 line-through">
                  ₹{flower.price}
                </p>
              </>
            ) : (
              <p className="text-lg font-semibold text-pink-600">
                ₹{flower?.price}
              </p>
            )}

          </div>

        </div>

        {/* ================= DETAILS ================= */}

        <div className="flex flex-wrap gap-2 mt-4">

          {/* Flower Type */}

          {flower?.flowerType && (
            <span
              className="
                px-3
                py-1.5
                rounded-full
                bg-pink-50
                text-pink-600
                text-xs
                font-medium
              "
            >
              {flower.flowerType}
            </span>
          )}

          {/* Sleeve Type */}

          {flower?.sleeveType && (
            <span
              className="
                px-3
                py-1.5
                rounded-full
                bg-gray-100
                text-gray-600
                text-xs
                font-medium
              "
            >
              {flower.sleeveType}
            </span>
          )}

          {/* Color */}

          {flower?.color && (
            <span
              className="
                px-3
                py-1.5
                rounded-full
                bg-gray-100
                text-gray-600
                text-xs
                font-medium
              "
            >
              {flower.color}
            </span>
          )}

          {/* Size */}

          {flower?.size && (
            <span
              className="
                px-3
                py-1.5
                rounded-full
                bg-gray-100
                text-gray-600
                text-xs
                font-medium
              "
            >
              {flower.size}
            </span>
          )}

          {/* Stock */}

          {flower?.stock !== undefined && (
            <span
              className="
                px-3
                py-1.5
                rounded-full
                bg-gray-100
                text-gray-600
                text-xs
                font-medium
              "
            >
              Stock: {flower.stock}
            </span>
          )}

          {/* Availability */}

          <span
            className={`
              px-3
              py-1.5
              rounded-full
              text-xs
              font-medium
              ${
                flower?.isAvailable
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-500"
              }
            `}
          >
            {flower?.isAvailable
              ? "Available"
              : "Unavailable"}
          </span>

        </div>

        {/* ================= OCCASION ================= */}

        {flower?.occasion?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">

            {flower.occasion.map((occasion, index) => (
              <span
                key={index}
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-rose-50
                  text-rose-500
                  text-xs
                "
              >
                {occasion}
              </span>
            ))}

          </div>
        )}

        {/* ================= BUTTONS ================= */}

        <div className="flex gap-2.5 mt-5">

          {/* EDIT */}

          <button
            type="button"
            onClick={() =>
              dispatch(
                openEditFlowerInSleevePopup(flower)
              )
            }
            className="
              flex-1
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
                openDeleteFlowerInSleevePopup(flower)
              )
            }
            className="
              flex-1
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
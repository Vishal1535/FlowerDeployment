import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import {
  openEditWoolenPopup,
  openDeleteWoolenPopup,
} from "../../../Store/Woolen/WoolenSlice";

import { EditWoolenBouquetPopUp } from "./EditWoolenBouquetPopUp";
import { DeleteWoolenBouquetPopUp } from "./DeleteWoolenBouquetPopUp";

export const WoolenBouquetItem = ({ woolen }) => {
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
      {/* POPUPS */}
     

      {/* IMAGE */}
      <div className="w-full h-44 bg-gray-100 overflow-hidden">
        <img
          src={woolen?.image}
          alt={woolen?.name}
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

      {/* CONTENT */}
      <div className="p-4">
        {/* NAME + PRICE */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {woolen?.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-5">
              {woolen?.description}
            </p>
          </div>

          <span className="text-lg font-semibold text-pink-600 whitespace-nowrap">
            ₹{woolen?.price}
          </span>
        </div>

        {/* DETAILS */}
        <div className="flex flex-wrap gap-2 mt-4">
          {woolen?.occasion && (
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
              {woolen.occasion}
            </span>
          )}

          {woolen?.category && (
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
              {woolen.category}
            </span>
          )}

          {woolen?.stock !== undefined && (
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
              Stock: {woolen.stock}
            </span>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2.5 mt-5">
          {/* EDIT */}
          <button
            type="button"
            onClick={() =>
              dispatch(openEditWoolenPopup(woolen))
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
              dispatch(openDeleteWoolenPopup(woolen))
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
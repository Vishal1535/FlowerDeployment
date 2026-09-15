import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import {
  openEditComboBouquetPopup,
  openDeleteComboBouquetPopup,
} from "../../../Store/ComboBouquet/ComboBouquetSlice";

import { EditComboBouquetPopUp } from "./EditComboBouquetPopUp";
import { DeleteComboBouquetPopUp } from "./DeleteComboBouquetPopUp";

export const ComboBouquetItem = ({ comboBouquet }) => {
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

      {/* ================= POPUPS ================= */}

      <EditComboBouquetPopUp />
      <DeleteComboBouquetPopUp />

      {/* ================= IMAGE ================= */}

      <div className="w-full h-44 bg-gray-100 overflow-hidden">
        <img
          src={comboBouquet.image}
          alt={comboBouquet.name}
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
              {comboBouquet.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-5">
              {comboBouquet.description}
            </p>

          </div>

          <span className="text-lg font-semibold text-pink-600 whitespace-nowrap">
            ₹{comboBouquet.price}
          </span>

        </div>

        {/* ================= DETAILS ================= */}

        <div className="flex flex-wrap gap-2 mt-4">

          {comboBouquet.occasion && (
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
              {comboBouquet.occasion}
            </span>
          )}

          {comboBouquet.category && (
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
              {comboBouquet.category}
            </span>
          )}

          {comboBouquet.stock !== undefined && (
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
              Stock: {comboBouquet.stock}
            </span>
          )}

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex gap-2.5 mt-5">

          {/* EDIT */}

          <button
            type="button"
            onClick={() =>
              dispatch(
                openEditComboBouquetPopup(comboBouquet)
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
                openDeleteComboBouquetPopup(comboBouquet)
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
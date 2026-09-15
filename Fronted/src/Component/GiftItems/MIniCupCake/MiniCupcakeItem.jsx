import React from "react";
import { useDispatch } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";
// openDeleteMiniCupcakePopup
import { openEditMiniCupcakePopup,openDeleteMiniCupcakePopup } from "../../../Store/MiniCupCake/MiniCupCakeSlice";
import { EditMiniCupcakePopUp } from "./EditMiniCupcakePopUp";
import { DeleteMiniCupcakePopUp } from "./DeleteMiniCupcakePopUp";

export const MiniCupcakeItem = ({ miniCupcake }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full min-w-0 bg-white border border-gray-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <EditMiniCupcakePopUp/>
      <DeleteMiniCupcakePopUp/>

      {/* Image */}
      <div className="h-40 min-[380px]:h-44 sm:h-48 bg-gray-100 overflow-hidden">
        <img
          src={miniCupcake.image}
          alt={miniCupcake.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 min-[380px]:p-4 sm:p-5">

        {/* Name + Availability */}
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <h3 className="text-base min-[380px]:text-lg font-semibold text-gray-800 min-w-0 break-words">
            {miniCupcake.name}
          </h3>

          <span
            className={`shrink-0 text-[10px] min-[380px]:text-xs px-2 min-[380px]:px-2.5 py-1 rounded-full whitespace-nowrap ${
              miniCupcake.isAvailable
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {miniCupcake.isAvailable
              ? "Available"
              : "Unavailable"}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs min-[380px]:text-sm text-gray-500 mt-2 line-clamp-2 leading-5">
          {miniCupcake.description}
        </p>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2 min-[380px]:gap-3 mt-3 sm:mt-4">

          <div className="min-w-0">
            <p className="text-[10px] min-[380px]:text-xs text-gray-400">
              Price
            </p>

            <p className="text-xs min-[380px]:text-sm font-semibold text-gray-800 truncate">
              ₹{miniCupcake.price}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] min-[380px]:text-xs text-gray-400">
              Stock
            </p>

            <p className="text-xs min-[380px]:text-sm font-semibold text-gray-800 truncate">
              {miniCupcake.stock}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] min-[380px]:text-xs text-gray-400">
              Flavor
            </p>

            <p className="text-xs min-[380px]:text-sm font-medium text-gray-700 truncate">
              {miniCupcake.flavor}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] min-[380px]:text-xs text-gray-400">
              Quantity
            </p>

            <p className="text-xs min-[380px]:text-sm font-medium text-gray-700 truncate">
              {miniCupcake.quantity}
            </p>
          </div>

        </div>

        {/* Occasion & Category */}
        <div className="flex flex-wrap gap-1.5 min-[380px]:gap-2 mt-3 sm:mt-4">

          <span className="max-w-full px-2 min-[380px]:px-2.5 py-1 rounded-lg bg-pink-50 text-pink-600 text-[10px] min-[380px]:text-xs truncate">
            {miniCupcake.occasion}
          </span>

          <span className="max-w-full px-2 min-[380px]:px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-[10px] min-[380px]:text-xs truncate">
            {miniCupcake.category}
          </span>

        </div>

        {/* Actions */}
        <div className="flex flex-col min-[380px]:flex-row gap-2 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100">

          <button
            type="button"
            onClick={() =>
              dispatch(
                openEditMiniCupcakePopup(miniCupcake)
              )
            }
            className="w-full min-[380px]:flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg sm:rounded-xl border border-gray-200 text-xs min-[380px]:text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition"
          >
            <Pencil size={15} className="sm:w-4 sm:h-4" />
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              dispatch(
                openDeleteMiniCupcakePopup(miniCupcake)
              )
            }
            className="w-full min-[380px]:flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg sm:rounded-xl border border-red-100 text-xs min-[380px]:text-sm font-medium text-red-500 hover:bg-red-50 transition"
          >
            <Trash2 size={15} className="sm:w-4 sm:h-4" />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};
import React from "react";
import { useDispatch } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";

import {
  openEditMiniCupcakePopup,
  openDeleteMiniCupcakePopup,
} from "../../../Store/MIniCupCake/MIniCupCakeSlice";
import { EditMiniCupcakePopUp } from "./EditMiniCupcakePopUp";
import { DeleteMiniCupcakePopUp } from "./DeleteMiniCupcakePopUp";

export const MiniCupcakeItem = ({ miniCupcake }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
        <EditMiniCupcakePopUp/>
        <DeleteMiniCupcakePopUp/>
      {/* Image */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={miniCupcake.image}
          alt={miniCupcake.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Name + Availability */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-800">
            {miniCupcake.name}
          </h3>

          <span
            className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${
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
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {miniCupcake.description}
        </p>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 mt-4">

          <div>
            <p className="text-xs text-gray-400">
              Price
            </p>

            <p className="text-sm font-semibold text-gray-800">
              ₹{miniCupcake.price}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Stock
            </p>

            <p className="text-sm font-semibold text-gray-800">
              {miniCupcake.stock}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Flavor
            </p>

            <p className="text-sm font-medium text-gray-700">
              {miniCupcake.flavor}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Quantity
            </p>

            <p className="text-sm font-medium text-gray-700">
              {miniCupcake.quantity}
            </p>
          </div>

        </div>

        {/* Occasion & Category */}
        <div className="flex flex-wrap gap-2 mt-4">

          <span className="px-2.5 py-1 rounded-lg bg-pink-50 text-pink-600 text-xs">
            {miniCupcake.occasion}
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs">
            {miniCupcake.category}
          </span>

        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">

          <button
            type="button"
            onClick={() =>
              dispatch(
                openEditMiniCupcakePopup(miniCupcake)
              )
            }
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              dispatch(
                openDeleteMiniCupcakePopup(miniCupcake)
              )
            }
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 text-sm font-medium text-red-500 hover:bg-red-50 transition"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};
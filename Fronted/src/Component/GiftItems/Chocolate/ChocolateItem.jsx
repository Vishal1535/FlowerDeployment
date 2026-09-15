import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import { openEditChocolatePopup } from "../../../Store/Chocolate/ChocolateSlice";
import { openDeleteChocolatePopup } from "../../../Store/Chocolate/ChocolateSlice";
import { EditChocolatePopUp } from "./EditChocolatePopUp";
import { DeleteChocolatePopUp } from "./DeleteChocolatePopUp";

export const ChocolateItem = ({ chocolate }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
      <EditChocolatePopUp/>
      <DeleteChocolatePopUp/>
      {/* Image */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={chocolate.image}
          alt={chocolate.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {chocolate.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {chocolate.description}
            </p>
          </div>

          <span className="text-lg font-semibold text-pink-600">
            ₹{chocolate.price}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs">
            {chocolate.occasion}
          </span>

          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
            {chocolate.category}
          </span>

          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
            Stock: {chocolate.stock}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-5">

          <button
            onClick={() =>
              dispatch(openEditChocolatePopup(chocolate))
            }
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            onClick={() =>
              dispatch(openDeleteChocolatePopup(chocolate))
            }
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};
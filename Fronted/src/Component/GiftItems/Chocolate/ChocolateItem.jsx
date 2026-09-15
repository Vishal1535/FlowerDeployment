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
    <div className="w-full min-w-0 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
      <EditChocolatePopUp />
      <DeleteChocolatePopUp />

      {/* Image */}

      <div className="h-40 min-[380px]:h-44 sm:h-48 bg-gray-100 overflow-hidden">
        <img
          src={chocolate.image}
          alt={chocolate.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}

      <div className="p-3 min-[380px]:p-4">

        <div className="flex items-start justify-between gap-2 min-[380px]:gap-3">

          <div className="min-w-0 flex-1">
            <h3 className="text-base min-[380px]:text-lg font-semibold text-gray-800 truncate">
              {chocolate.name}
            </h3>

            <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1 line-clamp-2">
              {chocolate.description}
            </p>
          </div>

          <span className="text-sm min-[380px]:text-lg font-semibold text-pink-600 shrink-0 whitespace-nowrap">
            ₹{chocolate.price}
          </span>

        </div>

        {/* Details */}

        <div className="flex flex-wrap gap-1.5 min-[380px]:gap-2 mt-3 min-[380px]:mt-4">

          <span className="px-2 min-[380px]:px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-[10px] min-[380px]:text-xs max-w-full truncate">
            {chocolate.occasion}
          </span>

          <span className="px-2 min-[380px]:px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] min-[380px]:text-xs max-w-full truncate">
            {chocolate.category}
          </span>

          <span className="px-2 min-[380px]:px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] min-[380px]:text-xs whitespace-nowrap">
            Stock: {chocolate.stock}
          </span>

        </div>

        {/* Buttons */}

        <div className="flex flex-col min-[380px]:flex-row gap-2 mt-4 min-[380px]:mt-5">

          <button
            onClick={() =>
              dispatch(openEditChocolatePopup(chocolate))
            }
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-1.5
              min-[380px]:gap-2
              py-2
              min-[380px]:py-2.5
              rounded-xl
              border
              border-gray-200
              text-xs
              min-[380px]:text-sm
              text-gray-600
              hover:bg-pink-50
              hover:text-pink-600
              transition
              min-w-0
            "
          >
            <Edit
              size={15}
              className="min-[380px]:w-4 min-[380px]:h-4 shrink-0"
            />
            Edit
          </button>

          <button
            onClick={() =>
              dispatch(openDeleteChocolatePopup(chocolate))
            }
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-1.5
              min-[380px]:gap-2
              py-2
              min-[380px]:py-2.5
              rounded-xl
              bg-red-50
              text-red-500
              text-xs
              min-[380px]:text-sm
              hover:bg-red-100
              transition
              min-w-0
            "
          >
            <Trash2
              size={15}
              className="min-[380px]:w-4 min-[380px]:h-4 shrink-0"
            />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};
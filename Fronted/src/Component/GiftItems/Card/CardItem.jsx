import React from "react";
import { useDispatch } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";
import { openDeleteCardPopup, openEditCardPopup } from "../../../Store/Card/CardSlice";
import { DeleteCardPopUp } from "./DeleteCardPopUp";
import { EditCardPopUp } from "./EditCardPopUp";

export const CardItem = ({ card }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(openEditCardPopup(card));
  };

  const handleDelete = () => {
    dispatch(openDeleteCardPopup(card));
  };

  return (
    <div className="w-full min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
      <DeleteCardPopUp />
      <EditCardPopUp />

      {/* ================= IMAGE ================= */}

      <div className="w-full h-40 min-[380px]:h-44 sm:h-48 bg-gray-100 overflow-hidden">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-3 min-[380px]:p-4">

        <div className="flex items-start justify-between gap-2 min-[380px]:gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base min-[380px]:text-lg font-semibold text-gray-800 truncate">
              {card.name}
            </h3>

            <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1 line-clamp-2">
              {card.description}
            </p>
          </div>

          {/* Availability */}

          <span
            className={`shrink-0 text-[10px] min-[380px]:text-xs px-2 min-[380px]:px-2.5 py-1 rounded-full whitespace-nowrap ${
              card.isAvailable
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {card.isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* ================= DETAILS ================= */}

        <div className="mt-3 min-[380px]:mt-4 space-y-1.5 min-[380px]:space-y-2 text-xs min-[380px]:text-sm">

          <div className="flex items-center justify-between gap-3 min-w-0">
            <span className="text-gray-500 shrink-0">
              Price
            </span>

            <span className="font-semibold text-gray-800 truncate">
              ₹{card.price}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 min-w-0">
            <span className="text-gray-500 shrink-0">
              Occasion
            </span>

            <span className="text-gray-700 text-right truncate">
              {card.occasion}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 min-w-0">
            <span className="text-gray-500 shrink-0">
              Category
            </span>

            <span className="text-gray-700 text-right truncate">
              {card.category}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 min-w-0">
            <span className="text-gray-500 shrink-0">
              Stock
            </span>

            <span className="text-gray-700 truncate">
              {card.stock}
            </span>
          </div>

        </div>

        {/* ================= ACTIONS ================= */}

        <div className="flex flex-col min-[380px]:flex-row gap-2 mt-4 min-[380px]:mt-5">

          <button
            type="button"
            onClick={handleEdit}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-1.5
              min-[380px]:gap-2
              px-3
              min-[380px]:px-4
              py-2
              min-[380px]:py-2.5
              rounded-xl
              bg-pink-50
              text-pink-600
              text-xs
              min-[380px]:text-sm
              font-medium
              hover:bg-pink-100
              transition
              min-w-0
            "
          >
            <Pencil size={15} className="min-[380px]:w-4 min-[380px]:h-4 shrink-0" />
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-1.5
              min-[380px]:gap-2
              px-3
              min-[380px]:px-4
              py-2
              min-[380px]:py-2.5
              rounded-xl
              bg-red-50
              text-red-500
              text-xs
              min-[380px]:text-sm
              font-medium
              hover:bg-red-100
              transition
              min-w-0
            "
          >
            <Trash2 size={15} className="min-[380px]:w-4 min-[380px]:h-4 shrink-0" />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};
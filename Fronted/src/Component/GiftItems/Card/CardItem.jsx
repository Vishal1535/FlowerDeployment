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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
        <DeleteCardPopUp/>
        <EditCardPopUp/>
      {/* ================= IMAGE ================= */}

      <div className="w-full h-48 bg-gray-100 overflow-hidden">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-4">

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {card.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {card.description}
            </p>
          </div>

          {/* Availability */}

          <span
            className={`shrink-0 text-xs px-2.5 py-1 rounded-full ${
              card.isAvailable
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {card.isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* ================= DETAILS ================= */}

        <div className="mt-4 space-y-2 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-500">
              Price
            </span>

            <span className="font-semibold text-gray-800">
              ₹{card.price}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Occasion
            </span>

            <span className="text-gray-700">
              {card.occasion}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Category
            </span>

            <span className="text-gray-700">
              {card.category}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Stock
            </span>

            <span className="text-gray-700">
              {card.stock}
            </span>
          </div>

        </div>

        {/* ================= ACTIONS ================= */}

        <div className="flex gap-2 mt-5">

          <button
            type="button"
            onClick={handleEdit}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-pink-50
              text-pink-600
              text-sm
              font-medium
              hover:bg-pink-100
              transition
            "
          >
            <Pencil size={16} />
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
              gap-2
              px-4
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
import React from "react";
import {
  Flower2,
  Package,
  Pencil,
  Trash2,
  Tag,
  Boxes,
  CircleCheck,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { openDeleteFlowerPopup, openEditFlowerPopup } from "../../../Store/flowerSlice/FlowerSlice";
import { EditFlower } from "./EditFlower";
import { DeleteFlowerPopUp } from "./DeleteFlowerPopUp";

export const ProductCard = ({ product, type, onDelete }) => {
  const isFlower = type === "flower";
 const { showDeleteFlowerPopup } = useSelector((state) => state.flower);
 
 
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(openEditFlowerPopup(product));
  };

  

  const stock = product?.stock ?? 0;

  const stockStatus =
    stock === 0 ? "Out of Stock" : stock <= 5 ? "Low Stock" : "In Stock";

  return (
    <div className="group w-full min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative h-44 min-[380px]:h-48 sm:h-56 bg-gray-100 overflow-hidden">
        <EditFlower />
        {showDeleteFlowerPopup&&<DeleteFlowerPopUp />}
        {product?.image ? (
          <img
            src={product.image}
            alt={product?.name || "Product"}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isFlower ? (
              <Flower2
                size={42}
                className="sm:w-[55px] sm:h-[55px]"
                strokeWidth={1.5}
              />
            ) : (
              <Package
                size={42}
                className="sm:w-[55px] sm:h-[55px]"
                strokeWidth={1.5}
              />
            )}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent pointer-events-none" />

        {/* Product Type */}
        <div
          className="
            absolute
            top-2.5
            left-2.5
            sm:top-4
            sm:left-4
            flex
            items-center
            gap-1.5
            sm:gap-2
            px-2.5
            sm:px-3.5
            py-1.5
            sm:py-2
            rounded-full
            bg-white/95
            backdrop-blur
            shadow-lg
            text-[10px]
            sm:text-xs
            font-bold
            text-gray-800
            max-w-[45%]
            truncate
          "
        >
          {isFlower ? (
            <Flower2 size={13} className="sm:w-[15px] sm:h-[15px] text-pink-500 shrink-0" />
          ) : (
            <Package size={13} className="sm:w-[15px] sm:h-[15px] text-purple-500 shrink-0" />
          )}

          {isFlower ? "Flower" : "Bouquet"}
        </div>

        {/* Stock */}
        <div
          className={`absolute top-2.5 right-2.5 sm:top-4 sm:right-4 flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full backdrop-blur shadow-md text-[10px] sm:text-xs font-semibold max-w-[48%] truncate ${
            stock === 0
              ? "bg-red-50/95 text-red-600"
              : stock <= 5
                ? "bg-yellow-50/95 text-yellow-700"
                : "bg-green-50/95 text-green-700"
          }`}
        >
          <CircleCheck size={12} className="sm:w-[13px] sm:h-[13px] shrink-0" />
          <span className="truncate">{stockStatus}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 min-[380px]:p-4 sm:p-5">
        {/* Name */}
        <h3 className="text-base min-[380px]:text-lg sm:text-xl font-bold text-gray-900 truncate">
          {product?.name || "Unnamed Product"}
        </h3>

        {/* Category */}
        <div className="flex items-center gap-2 mt-2 min-w-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-lg bg-gray-50 flex items-center justify-center">
            <Tag size={13} className="sm:w-[14px] sm:h-[14px] text-gray-400" />
          </div>

          <span className="text-xs sm:text-sm text-gray-500 truncate">
            {product?.category || "No category"}
          </span>
        </div>

        {/* Price + Stock */}
        <div className="flex items-end justify-between gap-3 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100">
          <div className="min-w-0">
            <p className="text-[9px] sm:text-xs text-gray-400 font-medium uppercase tracking-wider">
              Price
            </p>

            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xs sm:text-sm font-semibold text-gray-500">₹</span>

              <span className="text-xl min-[380px]:text-2xl font-extrabold text-gray-900">
                {product?.price ?? 0}
              </span>
            </div>
          </div>

          <div className="text-right min-w-0">
            <p className="text-[9px] sm:text-xs text-gray-400 font-medium uppercase tracking-wider">
              Available
            </p>

            <div className="flex items-center justify-end gap-1.5 sm:gap-2 mt-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                <Boxes size={14} className="sm:w-[16px] sm:h-[16px] text-gray-500" />
              </div>

              <span className="text-base sm:text-lg font-bold text-gray-800">
                {stock}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4 sm:mt-5">
          {/* Edit */}
          <button
            type="button"
            onClick={handleEdit}
            className="
              flex-1
              h-10
              sm:h-11
              rounded-xl
              bg-gray-900
              text-white
              text-xs
              sm:text-sm
              font-semibold
              flex
              items-center
              justify-center
              gap-1.5
              sm:gap-2
              hover:bg-gray-800
              active:scale-[0.98]
              transition-all
            "
          >
            <Pencil size={14} className="sm:w-[16px] sm:h-[16px]" />
            Edit
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={()=>{
            dispatch(openDeleteFlowerPopup(product?._id))
            }}
            className="
              w-10
              h-10
              sm:w-11
              sm:h-11
              shrink-0
              rounded-xl
              bg-red-50
              text-red-500
              border
              border-red-100
              flex
              items-center
              justify-center
              hover:bg-red-100
              hover:text-red-600
              active:scale-95
              transition-all
            "
          >
            <Trash2 size={16} className="sm:w-[17px] sm:h-[17px]" />
          </button>
        </div>
      </div>
    </div>
  );
};
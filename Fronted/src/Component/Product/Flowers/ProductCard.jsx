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
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative h-56 bg-gray-100 overflow-hidden">
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
              <Flower2 size={55} strokeWidth={1.5} className="text-gray-300" />
            ) : (
              <Package size={55} strokeWidth={1.5} className="text-gray-300" />
            )}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent pointer-events-none" />

        {/* Product Type */}
        <div
          className="
            absolute
            top-4
            left-4
            flex
            items-center
            gap-2
            px-3.5
            py-2
            rounded-full
            bg-white/95
            backdrop-blur
            shadow-lg
            text-xs
            font-bold
            text-gray-800
          "
        >
          {isFlower ? (
            <Flower2 size={15} className="text-pink-500" />
          ) : (
            <Package size={15} className="text-purple-500" />
          )}

          {isFlower ? "Flower" : "Bouquet"}
        </div>

        {/* Stock */}
        <div
          className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur shadow-md text-xs font-semibold ${
            stock === 0
              ? "bg-red-50/95 text-red-600"
              : stock <= 5
                ? "bg-yellow-50/95 text-yellow-700"
                : "bg-green-50/95 text-green-700"
          }`}
        >
          <CircleCheck size={13} />
          {stockStatus}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 truncate">
          {product?.name || "Unnamed Product"}
        </h3>

        {/* Category */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
            <Tag size={14} className="text-gray-400" />
          </div>

          <span className="text-sm text-gray-500 truncate">
            {product?.category || "No category"}
          </span>
        </div>

        {/* Price + Stock */}
        <div className="flex items-end justify-between mt-5 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Price
            </p>

            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-sm font-semibold text-gray-500">₹</span>

              <span className="text-2xl font-extrabold text-gray-900">
                {product?.price ?? 0}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Available
            </p>

            <div className="flex items-center justify-end gap-2 mt-1">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                <Boxes size={16} className="text-gray-500" />
              </div>

              <span className="text-lg font-bold text-gray-800">{stock}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5">
          {/* Edit */}
          <button
            type="button"
            onClick={handleEdit}
            className="
              flex-1
              h-11
              rounded-xl
              bg-gray-900
              text-white
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-gray-800
              active:scale-[0.98]
              transition-all
            "
          >
            <Pencil size={16} />
            Edit
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={()=>{
            dispatch(openDeleteFlowerPopup(product?._id))
            }}
            className="
              w-11
              h-11
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
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

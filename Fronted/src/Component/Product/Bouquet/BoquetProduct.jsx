import React from "react";
import { Package, Pencil, Trash2, Tag, Boxes, Gift, Ruler } from "lucide-react";
import { useDispatch } from "react-redux";
import { openDeleteBouquetPopup, openEditBouquetPopup } from "../../../Store/Bouquest/BouquestSlice";
import { EditBouquet } from "./EditBouquet";
import { DeleteBouquet } from "./DeleteBouquet";

export const BoquetProduct = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <>
    <EditBouquet/>
    <DeleteBouquet/>
      <div
        className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        overflow-hidden
        hover:shadow-md
        transition-all
      "
      >
        {/* ================= IMAGE ================= */}

        <div className="relative h-52 overflow-hidden bg-gray-100">
          {product?.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={45} className="text-gray-300" />
            </div>
          )}

          {/* Product Type */}

          <div
            className="
            absolute
            top-3
            left-3
            flex
            items-center
            gap-1.5
            px-3
            py-1.5
            rounded-full
            bg-white/90
            backdrop-blur-md
            shadow-md
            text-xs
            font-semibold
            text-gray-700
          "
          >
            <Package size={14} />
            Bouquet
          </div>

          {/* Size Badge */}

          {product?.size && (
            <div
              className="
              absolute
              top-3
              right-3
              px-3
              py-1.5
              rounded-full
              bg-gray-900/90
              text-white
              text-xs
              font-semibold
            "
            >
              {product.size}
            </div>
          )}
        </div>

        {/* ================= CONTENT ================= */}

        <div className="p-5">
          {/* Name */}

          <h3
            className="
            text-lg
            font-bold
            text-gray-900
            truncate
          "
          >
            {product?.name || "Unnamed Bouquet"}
          </h3>

          {/* Category */}

          <div className="flex items-center gap-2 mt-2">
            <div
              className="
              flex
              items-center
              justify-center
              w-7
              h-7
              rounded-lg
              bg-gray-50
            "
            >
              <Tag size={14} className="text-gray-400" />
            </div>

            <span className="text-sm text-gray-500">
              {product?.category || "No category"}
            </span>
          </div>

          {/* Occasion */}

          <div className="flex items-center gap-2 mt-2">
            <div
              className="
              flex
              items-center
              justify-center
              w-7
              h-7
              rounded-lg
              bg-gray-50
            "
            >
              <Gift size={14} className="text-gray-400" />
            </div>

            <span className="text-sm text-gray-500">
              {product?.occasion || "No occasion"}
            </span>
          </div>

          {/* Size */}

          <div className="flex items-center gap-2 mt-2">
            <div
              className="
              flex
              items-center
              justify-center
              w-7
              h-7
              rounded-lg
              bg-gray-50
            "
            >
              <Ruler size={14} className="text-gray-400" />
            </div>

            <span className="text-sm text-gray-500">
              {product?.size || "No size"}
            </span>
          </div>

          {/* ================= PRICE + STOCK ================= */}

          <div
            className="
            flex
            items-center
            justify-between
            mt-5
            pt-4
            border-t
            border-gray-100
          "
          >
            {/* Price */}

            <div>
              <p
                className="
                text-xs
                font-medium
                text-gray-400
                uppercase
                tracking-wide
              "
              >
                Price
              </p>

              <p className="text-xl font-bold text-gray-900 mt-0.5">
                ₹{product?.price ?? 0}
              </p>
            </div>

            {/* Stock */}

            <div className="text-right">
              <p
                className="
                text-xs
                font-medium
                text-gray-400
                uppercase
                tracking-wide
              "
              >
                Stock
              </p>

              <div className="flex items-center justify-end gap-1.5 mt-1">
                <Boxes size={15} className="text-gray-400" />

                <span className="text-sm font-semibold text-gray-700">
                  {product?.stock ?? 0}
                </span>
              </div>
            </div>
          </div>

          {/* ================= BUTTONS ================= */}

          <div className="flex gap-2 mt-5">
            {/* Edit */}

            <button
              type="button"
              onClick={() => {
                dispatch(openEditBouquetPopup(product));
              }}
              className="
              flex-1
              h-10
              rounded-xl
              border
              border-gray-200
              bg-white
              text-gray-700
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-gray-50
              hover:border-gray-300
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
                dispatch(openDeleteBouquetPopup(product?._id))
              }}
              className="
              w-10
              h-10
              rounded-xl
              bg-red-50
              text-red-500
              flex
              items-center
              justify-center
              hover:bg-red-100
              hover:text-red-600
              active:scale-[0.95]
              transition-all
            "
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

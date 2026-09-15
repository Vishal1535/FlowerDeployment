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
          w-full
          min-w-0
          bg-white
          rounded-xl
          sm:rounded-2xl
          border
          border-gray-100
          shadow-sm
          overflow-hidden
          hover:shadow-md
          transition-all
        "
      >
        {/* ================= IMAGE ================= */}

        <div className="relative h-40 min-[380px]:h-44 sm:h-52 overflow-hidden bg-gray-100">
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
              <Package
                size={36}
                className="sm:w-[45px] sm:h-[45px] text-gray-300"
              />
            </div>
          )}

          {/* Product Type */}

          <div
            className="
              absolute
              top-2
              left-2
              sm:top-3
              sm:left-3
              flex
              items-center
              gap-1
              sm:gap-1.5
              px-2
              sm:px-3
              py-1
              sm:py-1.5
              rounded-full
              bg-white/90
              backdrop-blur-md
              shadow-md
              text-[10px]
              sm:text-xs
              font-semibold
              text-gray-700
            "
          >
            <Package size={12} className="sm:w-[14px] sm:h-[14px]" />
            Bouquet
          </div>

          {/* Size Badge */}

          {product?.size && (
            <div
              className="
                absolute
                top-2
                right-2
                sm:top-3
                sm:right-3
                max-w-[40%]
                px-2
                sm:px-3
                py-1
                sm:py-1.5
                rounded-full
                bg-gray-900/90
                text-white
                text-[10px]
                sm:text-xs
                font-semibold
                truncate
              "
            >
              {product.size}
            </div>
          )}
        </div>

        {/* ================= CONTENT ================= */}

        <div className="p-3 min-[380px]:p-4 sm:p-5">

          {/* Name */}

          <h3
            className="
              text-base
              min-[380px]:text-lg
              font-bold
              text-gray-900
              truncate
            "
          >
            {product?.name || "Unnamed Bouquet"}
          </h3>

          {/* Category */}

          <div className="flex items-center gap-2 mt-2 min-w-0">
            <div
              className="
                flex
                items-center
                justify-center
                w-6
                h-6
                sm:w-7
                sm:h-7
                shrink-0
                rounded-lg
                bg-gray-50
              "
            >
              <Tag size={13} className="sm:w-[14px] sm:h-[14px] text-gray-400" />
            </div>

            <span className="text-xs sm:text-sm text-gray-500 truncate">
              {product?.category || "No category"}
            </span>
          </div>

          {/* Occasion */}

          <div className="flex items-center gap-2 mt-2 min-w-0">
            <div
              className="
                flex
                items-center
                justify-center
                w-6
                h-6
                sm:w-7
                sm:h-7
                shrink-0
                rounded-lg
                bg-gray-50
              "
            >
              <Gift size={13} className="sm:w-[14px] sm:h-[14px] text-gray-400" />
            </div>

            <span className="text-xs sm:text-sm text-gray-500 truncate">
              {product?.occasion || "No occasion"}
            </span>
          </div>

          {/* Size */}

          <div className="flex items-center gap-2 mt-2 min-w-0">
            <div
              className="
                flex
                items-center
                justify-center
                w-6
                h-6
                sm:w-7
                sm:h-7
                shrink-0
                rounded-lg
                bg-gray-50
              "
            >
              <Ruler size={13} className="sm:w-[14px] sm:h-[14px] text-gray-400" />
            </div>

            <span className="text-xs sm:text-sm text-gray-500 truncate">
              {product?.size || "No size"}
            </span>
          </div>

          {/* ================= PRICE + STOCK ================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              mt-4
              sm:mt-5
              pt-3
              sm:pt-4
              border-t
              border-gray-100
            "
          >
            {/* Price */}

            <div className="min-w-0">
              <p
                className="
                  text-[10px]
                  sm:text-xs
                  font-medium
                  text-gray-400
                  uppercase
                  tracking-wide
                "
              >
                Price
              </p>

              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                ₹{product?.price ?? 0}
              </p>
            </div>

            {/* Stock */}

            <div className="text-right min-w-0">
              <p
                className="
                  text-[10px]
                  sm:text-xs
                  font-medium
                  text-gray-400
                  uppercase
                  tracking-wide
                "
              >
                Stock
              </p>

              <div className="flex items-center justify-end gap-1.5 mt-1">
                <Boxes
                  size={14}
                  className="sm:w-[15px] sm:h-[15px] text-gray-400"
                />

                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  {product?.stock ?? 0}
                </span>
              </div>
            </div>
          </div>

          {/* ================= BUTTONS ================= */}

          <div className="flex gap-2 mt-4 sm:mt-5">

            {/* Edit */}

            <button
              type="button"
              onClick={() => {
                dispatch(openEditBouquetPopup(product));
              }}
              className="
                flex-1
                h-9
                sm:h-10
                rounded-lg
                sm:rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-700
                text-xs
                sm:text-sm
                font-semibold
                flex
                items-center
                justify-center
                gap-1.5
                sm:gap-2
                hover:bg-gray-50
                hover:border-gray-300
                active:scale-[0.98]
                transition-all
              "
            >
              <Pencil size={14} className="sm:w-4 sm:h-4" />
              Edit
            </button>

            {/* Delete */}

            <button
              type="button"
              onClick={()=>{
                dispatch(openDeleteBouquetPopup(product?._id))
              }}
              className="
                w-9
                h-9
                sm:w-10
                sm:h-10
                shrink-0
                rounded-lg
                sm:rounded-xl
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
              <Trash2 size={15} className="sm:w-[17px] sm:h-[17px]" />
            </button>

          </div>
        </div>
      </div>
    </>
  );
};
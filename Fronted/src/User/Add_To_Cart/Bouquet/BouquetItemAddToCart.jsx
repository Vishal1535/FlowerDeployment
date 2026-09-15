
import React from "react";
import { useDispatch } from "react-redux";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  IncrementBouquetCartThunk,
  DecrementBouquetCartThunk,
} from "../../../Store/AddToCart/BouquetAddToCart/BouquetAddToCartApi";

import { showDeletePopup } from "../../../Store/AddToCart/BouquetAddToCart/BouquetAddToCartSlice";

export const BouquetItemAddToCart = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bouquet = item?.bouquet;

  const quantity = item?.quantity || 1;

  const price = bouquet?.price || 0;

  const discountPrice = bouquet?.discountPrice || 0;

  const stock = bouquet?.stock || 0;

  // ==============================
  // FINAL PRICE
  // ==============================

  const hasDiscount =
    discountPrice > 0 &&
    discountPrice < price;

  const finalPrice = hasDiscount
    ? discountPrice
    : price;

  const totalPrice =
    finalPrice * quantity;

  // ==============================
  // INCREMENT
  // ==============================

  const HandleIncrement = async () => {
    if (quantity >= stock) {
      toast.error(
        "Maximum available quantity reached"
      );
      return;
    }

    const result = await dispatch(
      IncrementBouquetCartThunk(item?._id)
    );

    if (
      IncrementBouquetCartThunk.rejected.match(
        result
      )
    ) {
      toast.error(
        result.payload ||
          "Unable to increase quantity"
      );
    }
  };

  // ==============================
  // DECREMENT
  // ==============================

  const HandleDecrement = async () => {
    if (quantity <= 1) {
      return;
    }

    const result = await dispatch(
      DecrementBouquetCartThunk(item?._id)
    );

    if (
      DecrementBouquetCartThunk.rejected.match(
        result
      )
    ) {
      toast.error(
        result.payload ||
          "Unable to decrease quantity"
      );
    }
  };

  // ==============================
  // DELETE
  // ==============================

  const HandleDelete = () => {
    dispatch(
      showDeletePopup(item?._id)
    );
  };

  // ==============================
  // SINGLE BOUQUET
  // ==============================

  const HandleViewDetails = () => {
    navigate(
      `/bouquet/${bouquet?._id}`
    );
  };

  return (
    <div className="w-full min-w-0 bg-white">

      {/* ==============================
          MAIN PRODUCT
      ============================== */}

      <div className="p-3 sm:p-4 md:p-5">

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

          {/* ==============================
              PRODUCT IMAGE
          ============================== */}

          <div
            onClick={HandleViewDetails}
            className="
              w-20
              h-20
              sm:w-24
              sm:h-24
              md:w-28
              md:h-28
              shrink-0
              bg-gray-50
              rounded-md
              overflow-hidden
              flex
              items-center
              justify-center
              cursor-pointer
            "
          >
            <img
              src={bouquet?.image}
              alt={
                bouquet?.name ||
                "Bouquet"
              }
              className="
                w-full
                h-full
                object-contain
              "
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
            />
          </div>

          {/* ==============================
              PRODUCT DETAILS
          ============================== */}

          <div className="w-full min-w-0 flex-1">

            {/* PRODUCT NAME */}

            <h2
              onClick={HandleViewDetails}
              className="
                text-sm
                sm:text-base
                md:text-lg
                font-medium
                text-gray-800
                hover:text-pink-600
                cursor-pointer
                line-clamp-2
                break-words
              "
            >
              {bouquet?.name ||
                "Bouquet"}
            </h2>

            {/* PRICE */}

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">

              <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                ₹{finalPrice}
              </span>

              {hasDiscount && (
                <span
                  className="
                    text-xs
                    sm:text-sm
                    text-gray-400
                    line-through
                  "
                >
                  ₹{price}
                </span>
              )}

            </div>

            {/* STOCK */}

            {stock > 0 && (
              <p className="text-[11px] sm:text-xs text-green-600 mt-1">
                In Stock
              </p>
            )}

            {/* ==============================
                QUANTITY + ACTIONS
            ============================== */}

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">

              {/* QUANTITY */}

              <div
                className="
                  flex
                  items-center
                  border
                  border-gray-400
                  rounded-sm
                  overflow-hidden
                  shrink-0
                "
              >

                <button
                  type="button"
                  onClick={
                    HandleDecrement
                  }
                  disabled={quantity <= 1}
                  className="
                    w-7
                    h-8
                    sm:w-8
                    flex
                    items-center
                    justify-center
                    bg-gray-50
                    hover:bg-gray-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  <Minus size={13} className="sm:w-[14px] sm:h-[14px]" />
                </button>

                <span
                  className="
                    w-8
                    h-8
                    sm:w-9
                    flex
                    items-center
                    justify-center
                    border-x
                    border-gray-400
                    text-xs
                    sm:text-sm
                    font-semibold
                  "
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={
                    HandleIncrement
                  }
                  disabled={
                    quantity >= stock
                  }
                  className="
                    w-7
                    h-8
                    sm:w-8
                    flex
                    items-center
                    justify-center
                    bg-gray-50
                    hover:bg-gray-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  <Plus size={13} className="sm:w-[14px] sm:h-[14px]" />
                </button>

              </div>

              {/* REMOVE */}

              <button
                type="button"
                onClick={
                  HandleDelete
                }
                className="
                  min-h-8
                  flex
                  items-center
                  gap-1
                  sm:gap-1.5
                  text-xs
                  sm:text-sm
                  text-gray-600
                  hover:text-red-600
                  font-medium
                  cursor-pointer
                  shrink-0
                "
              >
                <Trash2 size={14} className="sm:w-[15px] sm:h-[15px]" />
                Remove
              </button>

              {/* VIEW DETAILS */}

              <button
                type="button"
                onClick={
                  HandleViewDetails
                }
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-1
                  text-xs
                  md:text-sm
                  text-pink-600
                  hover:text-pink-700
                  font-medium
                  cursor-pointer
                  shrink-0
                "
              >
                View Details
                <ArrowRight
                  size={14}
                />
              </button>

            </div>

          </div>

          {/* ==============================
              TOTAL PRICE
          ============================== */}

          <div className="w-full sm:w-auto text-left sm:text-right shrink-0 pt-1 sm:pt-0">

            <p className="text-[11px] sm:text-xs text-gray-400">
              Total
            </p>

            <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
              ₹{totalPrice}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};


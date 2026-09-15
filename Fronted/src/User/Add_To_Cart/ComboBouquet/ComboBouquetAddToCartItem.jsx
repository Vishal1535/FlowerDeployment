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
  IncrementComboBouquetCartThunk,
  DecrementComboBouquetCartThunk,
} from "../../../Store/AddToCart/ComboBouquetAddToCart/ComboBouquetAddToCartApi";

import { showDeletePopup } from "../../../Store/AddToCart/ComboBouquetAddToCart/ComboBouquetAddToCartSlice";

export const ComboBouquetAddToCartItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const comboBouquet = item?.comboBouquet;

  const quantity = item?.quantity || 1;

  const price = comboBouquet?.price || 0;

  const discountPrice =
    comboBouquet?.discountPrice || 0;

  const stock = comboBouquet?.stock || 0;

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
      IncrementComboBouquetCartThunk(
        item?._id
      )
    );

    if (
      IncrementComboBouquetCartThunk.rejected.match(
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
      DecrementComboBouquetCartThunk(
        item?._id
      )
    );

    if (
      DecrementComboBouquetCartThunk.rejected.match(
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
  // SINGLE COMBO BOUQUET
  // ==============================

  const HandleViewDetails = () => {
    navigate(
      `/combo-bouquet/${comboBouquet?._id}`
    );
  };

  return (
    <div className="bg-white">

      {/* ==============================
          MAIN PRODUCT
      ============================== */}

      <div className="p-4 sm:p-5">

        <div className="flex gap-4">

          {/* ==============================
              PRODUCT IMAGE
          ============================== */}

          <div
            onClick={HandleViewDetails}
            className="
              w-24
              h-24
              sm:w-28
              sm:h-28
              md:w-32
              md:h-32
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
              src={comboBouquet?.image}
              alt={
                comboBouquet?.name ||
                "Combo Bouquet"
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

          <div className="flex-1 min-w-0">

            {/* PRODUCT NAME */}

            <h2
              onClick={HandleViewDetails}
              className="
                text-base
                sm:text-lg
                font-medium
                text-gray-800
                hover:text-pink-600
                cursor-pointer
                line-clamp-2
              "
            >
              {comboBouquet?.name ||
                "Combo Bouquet"}
            </h2>

            {/* PRICE */}

            <div className="mt-1">

              <span className="text-lg sm:text-xl font-semibold text-gray-900">
                ₹{finalPrice}
              </span>

              {hasDiscount && (
                <span
                  className="
                    ml-2
                    text-sm
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
              <p className="text-xs text-green-600 mt-1">
                In Stock
              </p>
            )}

            {/* ==============================
                QUANTITY + ACTIONS
            ============================== */}

            <div className="flex flex-wrap items-center gap-3 mt-4">

              {/* QUANTITY */}

              <div
                className="
                  flex
                  items-center
                  border
                  border-gray-400
                  rounded-sm
                  overflow-hidden
                "
              >

                <button
                  type="button"
                  onClick={
                    HandleDecrement
                  }
                  disabled={quantity <= 1}
                  className="
                    w-8
                    h-8
                    flex
                    items-center
                    justify-center
                    bg-gray-50
                    hover:bg-gray-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  <Minus size={14} />
                </button>

                <span
                  className="
                    w-9
                    h-8
                    flex
                    items-center
                    justify-center
                    border-x
                    border-gray-400
                    text-sm
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
                    w-8
                    h-8
                    flex
                    items-center
                    justify-center
                    bg-gray-50
                    hover:bg-gray-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  <Plus size={14} />
                </button>

              </div>

              {/* REMOVE */}

              <button
                type="button"
                onClick={
                  HandleDelete
                }
                className="
                  flex
                  items-center
                  gap-1.5
                  text-sm
                  text-gray-600
                  hover:text-red-600
                  font-medium
                  cursor-pointer
                "
              >
                <Trash2 size={15} />
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
                  text-sm
                  text-pink-600
                  hover:text-pink-700
                  font-medium
                  cursor-pointer
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

          <div className="text-right shrink-0">

            <p className="text-xs text-gray-400">
              Total
            </p>

            <p className="text-base sm:text-lg font-semibold text-gray-900">
              ₹{totalPrice}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};
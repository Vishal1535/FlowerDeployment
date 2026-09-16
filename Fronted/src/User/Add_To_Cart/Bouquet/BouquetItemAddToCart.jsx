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

  const totalPrice = finalPrice * quantity;

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
  // VIEW DETAILS
  // ==============================

  const HandleViewDetails = () => {
    navigate(
      `/bouquet/${bouquet?._id}`
    );
  };

  return (
    <div
      className="
        w-full
        min-w-0
        bg-white
        border-b
        border-gray-100
      "
    >
      {/* ==============================
          MAIN PRODUCT
      ============================== */}

      <div
        className="
          p-3
          sm:p-4
          md:p-5
        "
      >
        <div
          className="
            flex
            gap-3
            sm:gap-4
            md:gap-5
            items-start
          "
        >
          {/* ==============================
              PRODUCT IMAGE
          ============================== */}

          <div
            onClick={HandleViewDetails}
            className="
              w-[76px]
              h-[76px]
              min-[400px]:w-[84px]
              min-[400px]:h-[84px]
              sm:w-24
              sm:h-24
              md:w-28
              md:h-28
              shrink-0
              bg-gray-50
              rounded-xl
              overflow-hidden
              flex
              items-center
              justify-center
              cursor-pointer
              border
              border-gray-100
              hover:border-pink-200
              transition
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
              PRODUCT CONTENT
          ============================== */}

          <div
            className="
              flex-1
              min-w-0
            "
          >
            {/* PRODUCT NAME */}

            <h2
              onClick={HandleViewDetails}
              className="
                text-sm
                min-[400px]:text-[15px]
                sm:text-base
                md:text-lg
                font-semibold
                text-gray-800
                hover:text-pink-600
                cursor-pointer
                line-clamp-2
                break-words
                leading-5
                sm:leading-6
              "
            >
              {bouquet?.name ||
                "Bouquet"}
            </h2>

            {/* PRICE */}

            <div
              className="
                mt-1.5
                flex
                flex-wrap
                items-center
                gap-x-2
                gap-y-0.5
              "
            >
              <span
                className="
                  text-base
                  sm:text-lg
                  md:text-xl
                  font-bold
                  text-gray-900
                "
              >
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
              <p
                className="
                  text-[11px]
                  sm:text-xs
                  text-green-600
                  font-medium
                  mt-1
                "
              >
                In Stock
              </p>
            )}

            {/* ==============================
                ACTION AREA
            ============================== */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-3
                gap-y-2
                mt-3
                sm:mt-4
              "
            >
              {/* ==============================
                  QUANTITY
              ============================== */}

              <div
                className="
                  flex
                  items-center
                  h-9
                  sm:h-10
                  border
                  border-gray-300
                  rounded-lg
                  overflow-hidden
                  shrink-0
                  bg-white
                "
              >
                {/* MINUS */}

                <button
                  type="button"
                  onClick={
                    HandleDecrement
                  }
                  disabled={
                    quantity <= 1
                  }
                  aria-label="Decrease quantity"
                  className="
                    w-8
                    sm:w-9
                    h-full
                    flex
                    items-center
                    justify-center
                    text-gray-700
                    bg-gray-50
                    hover:bg-gray-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  <Minus
                    size={14}
                    strokeWidth={2.3}
                  />
                </button>

                {/* QUANTITY */}

                <span
                  className="
                    w-9
                    sm:w-10
                    h-full
                    flex
                    items-center
                    justify-center
                    border-x
                    border-gray-300
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-gray-800
                  "
                >
                  {quantity}
                </span>

                {/* PLUS */}

                <button
                  type="button"
                  onClick={
                    HandleIncrement
                  }
                  disabled={
                    quantity >= stock
                  }
                  aria-label="Increase quantity"
                  className="
                    w-8
                    sm:w-9
                    h-full
                    flex
                    items-center
                    justify-center
                    text-gray-700
                    bg-gray-50
                    hover:bg-gray-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  <Plus
                    size={14}
                    strokeWidth={2.3}
                  />
                </button>
              </div>

              {/* ==============================
                  REMOVE
              ============================== */}

              <button
                type="button"
                onClick={
                  HandleDelete
                }
                className="
                  h-9
                  sm:h-10
                  px-2
                  sm:px-3
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  text-xs
                  sm:text-sm
                  text-gray-600
                  hover:text-red-600
                  hover:bg-red-50
                  font-medium
                  cursor-pointer
                  transition
                "
              >
                <Trash2
                  size={14}
                  className="sm:w-4 sm:h-4"
                />

                <span>
                  Remove
                </span>
              </button>

              {/* ==============================
                  VIEW DETAILS
              ============================== */}

              <button
                type="button"
                onClick={
                  HandleViewDetails
                }
                className="
                  h-9
                  sm:h-10
                  px-2
                  sm:px-3
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  text-xs
                  sm:text-sm
                  text-gray-700
                  hover:text-pink-600
                  hover:bg-pink-50
                  font-medium
                  cursor-pointer
                  transition
                "
              >
                <span>
                  View Details
                </span>

                <ArrowRight
                  size={14}
                  className="sm:w-4 sm:h-4"
                />
              </button>
            </div>
          </div>

          {/* ==============================
              TOTAL PRICE
          ============================== */}

          <div
            className="
              shrink-0
              text-right
              pt-0.5
              sm:pt-1
            "
          >
            <p
              className="
                text-[10px]
                sm:text-xs
                text-gray-400
                mb-0.5
              "
            >
              Total
            </p>

            <p
              className="
                text-sm
                min-[400px]:text-base
                sm:text-lg
                md:text-xl
                font-bold
                text-gray-900
                whitespace-nowrap
              "
            >
              ₹{totalPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { FlowerInBoxAddToCartItem } from "./FlowerInBoxAddToCartItem";
import { DeleteFlowerInBoxPopUp } from "./DeleteFlowerInBoxPopUp";

export const FlowerInBoxAddToCart = ({
  flowerInBoxFromCart = [],
}) => {
  const [showAll, setShowAll] = useState(false);

  const totalAmount = flowerInBoxFromCart.reduce(
    (total, item) =>
      total +
      (item?.flowerInBox?.price || 0) *
        (item?.quantity || 0),
    0
  );

  const visibleFlowerInBoxes = showAll
    ? flowerInBoxFromCart
    : flowerInBoxFromCart.slice(0, 2);

  return (
    <div className="w-full">

      {flowerInBoxFromCart.length > 0 ? (
        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-xl
            overflow-hidden
          "
        >

          <DeleteFlowerInBoxPopUp />

          {/* ==============================
              FLOWER IN BOX HEADER
          ============================== */}

          <div
            className="
              px-4
              sm:px-5
              py-3
              border-b
              border-gray-100
              flex
              items-center
              justify-between
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-2.5">

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                🌸
              </div>

              <div>

                <h2 className="text-base font-extrabold text-gray-900">
                  Flower In Box
                </h2>

                <p className="text-xs text-gray-400">
                  {flowerInBoxFromCart.length}{" "}
                  {flowerInBoxFromCart.length === 1
                    ? "product"
                    : "products"}
                </p>

              </div>

            </div>

            {/* TOTAL */}

            <div className="text-right">

              <p className="text-[11px] text-gray-400">
                Subtotal
              </p>

              <p className="text-base font-extrabold text-pink-600">
                ₹{totalAmount}
              </p>

            </div>

          </div>

          {/* ==============================
              FLOWER IN BOX ITEMS
          ============================== */}

          <div className="divide-y divide-gray-100">

            {visibleFlowerInBoxes.map((item) => (

              <div
                key={item?._id}
                className="
                  hover:bg-gray-50
                  transition
                "
              >

                <FlowerInBoxAddToCartItem
                  item={item}
                />

              </div>

            ))}

          </div>

          {/* ==============================
              VIEW ALL
          ============================== */}

          {flowerInBoxFromCart.length > 2 && (

            <button
              type="button"
              onClick={() =>
                setShowAll((prev) => !prev)
              }
              className="
                w-full
                h-10
                border-t
                border-gray-100
                bg-white
                hover:bg-pink-50
                text-sm
                font-semibold
                text-pink-600
                flex
                items-center
                justify-center
                gap-1.5
                transition
                cursor-pointer
              "
            >

              {showAll ? (
                <>
                  Show less
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  View all flower in boxes

                  <span className="text-gray-400 font-normal">
                    ({flowerInBoxFromCart.length})
                  </span>

                  <ChevronDown size={16} />
                </>
              )}

            </button>

          )}

          {/* ==============================
              FLOWER IN BOX TOTAL
          ============================== */}

          <div
            className="
              border-t
              border-gray-200
              bg-gray-50
              px-4
              sm:px-5
              py-3
              flex
              items-center
              justify-between
            "
          >

            <span className="text-sm font-semibold text-gray-600">
              Flower In Box Total
            </span>

            <span className="text-lg font-extrabold text-gray-900">
              ₹{totalAmount}
            </span>

          </div>

        </div>

      ) : (

        /* ==============================
           EMPTY CART
        ============================== */

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-xl
            flex
            flex-col
            items-center
            justify-center
            py-12
            text-center
            px-5
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-full
              bg-pink-50
              flex
              items-center
              justify-center
            "
          >
            🌸
          </div>

          <h3 className="mt-3 text-base font-bold text-gray-800">
            Your flower in box cart is empty
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Add some beautiful flower boxes to your cart.
          </p>

        </div>

      )}

    </div>
  );
};
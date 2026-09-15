import React, { useState } from "react";
import { ChevronDown, ChevronUp, CupSoda } from "lucide-react";

import { MiniCupCakeAddToCartItem } from "./MiniCupCakeAddToCartItem";
import { DeleteMiniCupCakeAddToCartPopUp } from "./DeleteMiniCupCakeAddToCartPopUp";

export const MiniCupCakeAddToCart = ({ miniCupcakeFromCart = [] }) => {
  const [showAll, setShowAll] = useState(false);

  // ==========================================
  // TOTAL AMOUNT
  // ==========================================

  const totalAmount = miniCupcakeFromCart.reduce(
    (total, item) =>
      total + (item?.miniCupCake?.price || 0) * (item?.quantity || 0),
    0,
  );

  // ==========================================
  // VISIBLE MINI CUPCAKES
  // ==========================================

  const visibleMiniCupCakes = showAll
    ? miniCupcakeFromCart
    : miniCupcakeFromCart.slice(0, 2);

  return (
    <div className="w-full">
      {miniCupcakeFromCart.length > 0 ? (
        <div
          className="
            bg-white
            border
            border-pink-100/70
            rounded-3xl
            overflow-hidden
            shadow-lg
            shadow-pink-100/50
          "
        >
          {/* ==========================================
              DELETE POPUP
          ========================================== */}

          <DeleteMiniCupCakeAddToCartPopUp />

          {/* ==========================================
              HEADER
          ========================================== */}

          <div
            className="
              px-4
              sm:px-5
              py-4
              bg-gradient-to-r
              from-pink-50
              via-rose-50/40
              to-orange-50
              border-b
              border-pink-100/70
              flex
              items-center
              justify-between
            "
          >
            {/* LEFT */}

            <div className="flex items-center gap-3">
              <div
                className="
                  w-10
                  h-10
                  rounded-2xl
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-pink-400
                  shrink-0
                  shadow-sm
                "
              >
                <CupSoda size={19} />
              </div>

              <div>
                <h2
                  className="
                    text-base
                    sm:text-lg
                    font-extrabold
                    text-gray-800
                  "
                >
                  Mini Cupcakes
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                  {miniCupcakeFromCart.length}{" "}
                  {miniCupcakeFromCart.length === 1 ? "cupcake" : "cupcakes"}
                </p>
              </div>
            </div>

            {/* ==========================================
                SUBTOTAL
            ========================================== */}

            <div className="text-right">
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-pink-300
                  font-semibold
                "
              >
                Subtotal
              </p>

              <p
                className="
                  text-base
                  sm:text-lg
                  font-extrabold
                  text-pink-400
                "
              >
                ₹{totalAmount}
              </p>
            </div>
          </div>

          {/* ==========================================
              MINI CUPCAKE ITEMS
          ========================================== */}

          <div className="divide-y divide-pink-50">
            {visibleMiniCupCakes.map((item) => (
              <div
                key={item?._id}
                className="
                  px-2
                  sm:px-3
                  hover:bg-pink-50/40
                  transition
                "
              >
                <MiniCupCakeAddToCartItem item={item} />
              </div>
            ))}
          </div>

          {/* ==========================================
              VIEW ALL
          ========================================== */}

          {miniCupcakeFromCart.length > 2 && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="
                w-full
                h-10
                border-t
                border-pink-50
                bg-white
                hover:bg-pink-50/50
                text-sm
                font-semibold
                text-pink-400
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
                  View all cupcakes
                  <span className="text-gray-400 font-normal">
                    ({miniCupcakeFromCart.length})
                  </span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          )}

          {/* ==========================================
              MINI CUPCAKE TOTAL
          ========================================== */}

          <div
            className="
              border-t
              border-pink-100/70
              bg-gradient-to-r
              from-pink-50
              to-orange-50
              px-4
              sm:px-5
              py-3.5
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-2">
              <CupSoda size={16} className="text-pink-400" />

              <span className="text-sm font-semibold text-gray-500">
                Mini Cupcakes Total
              </span>
            </div>

            <span className="text-lg font-extrabold text-gray-800">
              ₹{totalAmount}
            </span>
          </div>
        </div>
      ) : (
        /* ==========================================
            EMPTY
        ========================================== */

        <div
          className="
            bg-white
            border
            border-pink-100/70
            rounded-3xl
            flex
            flex-col
            items-center
            justify-center
            py-12
            text-center
            px-5
            shadow-sm
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
              text-pink-300
            "
          >
            <CupSoda size={25} />
          </div>

          <h3 className="mt-3 text-base font-bold text-gray-700">
            Your mini cupcake cart is empty
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Add a delicious mini cupcake to your order.
          </p>
        </div>
      )}
    </div>
  );
};

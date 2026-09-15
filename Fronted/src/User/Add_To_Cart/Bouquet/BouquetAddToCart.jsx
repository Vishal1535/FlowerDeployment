
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { BouquetItemAddToCart } from "./BouquetItemAddToCart";
import { DelelteBouquetAddToPopUp } from "./DelelteBouquetAddToPopUp";

export const BouquetAddToCart = ({
  bouquetFromCart = [],
}) => {
  const [showAll, setShowAll] = useState(false);

  const totalAmount = bouquetFromCart.reduce(
    (total, item) => {
      const bouquet = item?.bouquet;

      const hasDiscount =
        bouquet?.discountPrice > 0 &&
        bouquet?.discountPrice < bouquet?.price;

      const finalPrice = hasDiscount
        ? bouquet?.discountPrice
        : bouquet?.price || 0;

      return total + finalPrice * (item?.quantity || 0);
    },
    0
  );

  const visibleBouquets = showAll
    ? bouquetFromCart
    : bouquetFromCart.slice(0, 2);

  return (
    <div className="w-full min-w-0">

      {bouquetFromCart.length > 0 ? (
        <div
          className="
            w-full
            min-w-0
            bg-white
            border
            border-gray-200
            rounded-xl
            overflow-hidden
          "
        >

          <DelelteBouquetAddToPopUp />

          {/* ==============================
              BOUQUET HEADER
          ============================== */}

          <div
            className="
              px-3
              sm:px-5
              py-3
              border-b
              border-gray-100
              flex
              flex-col
              xs:flex-row
              sm:flex-row
              sm:items-center
              justify-between
              gap-2
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-2.5 min-w-0">

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
                💐
              </div>

              <div className="min-w-0">

                <h2 className="text-sm sm:text-base font-extrabold text-gray-900 truncate">
                  Bouquets
                </h2>

                <p className="text-[11px] sm:text-xs text-gray-400">
                  {bouquetFromCart.length}{" "}
                  {bouquetFromCart.length === 1
                    ? "product"
                    : "products"}
                </p>

              </div>

            </div>

            {/* TOTAL */}

            <div className="text-left xs:text-right sm:text-right shrink-0">

              <p className="text-[10px] sm:text-[11px] text-gray-400">
                Subtotal
              </p>

              <p className="text-sm sm:text-base font-extrabold text-pink-600">
                ₹{totalAmount}
              </p>

            </div>

          </div>

          {/* ==============================
              BOUQUET ITEMS
          ============================== */}

          <div className="divide-y divide-gray-100">

            {visibleBouquets.map((item) => (

              <div
                key={item?._id}
                className="
                  w-full
                  min-w-0
                  hover:bg-gray-50
                  transition
                "
              >

                <BouquetItemAddToCart
                  item={item}
                />

              </div>

            ))}

          </div>

          {/* ==============================
              VIEW ALL
          ============================== */}

          {bouquetFromCart.length > 2 && (

            <button
              type="button"
              onClick={() =>
                setShowAll((prev) => !prev)
              }
              className="
                w-full
                min-h-10
                px-3
                border-t
                border-gray-100
                bg-white
                hover:bg-pink-50
                text-xs
                sm:text-sm
                font-semibold
                text-pink-600
                flex
                items-center
                justify-center
                gap-1
                sm:gap-1.5
                transition
                cursor-pointer
              "
            >

              {showAll ? (
                <>
                  <span>Show less</span>
                  <ChevronUp size={15} className="sm:w-4 sm:h-4 shrink-0" />
                </>
              ) : (
                <>
                  <span>View all bouquets</span>

                  <span className="text-gray-400 font-normal shrink-0">
                    ({bouquetFromCart.length})
                  </span>

                  <ChevronDown size={15} className="sm:w-4 sm:h-4 shrink-0" />
                </>
              )}

            </button>

          )}

          {/* ==============================
              BOUQUET TOTAL
          ============================== */}

          <div
            className="
              border-t
              border-gray-200
              bg-gray-50
              px-3
              sm:px-5
              py-3
              flex
              items-center
              justify-between
              gap-3
            "
          >

            <span className="text-xs sm:text-sm font-semibold text-gray-600">
              Bouquet Total
            </span>

            <span className="text-base sm:text-lg font-extrabold text-gray-900 shrink-0">
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
            w-full
            bg-white
            border
            border-gray-200
            rounded-xl
            flex
            flex-col
            items-center
            justify-center
            py-10
            sm:py-12
            text-center
            px-4
            sm:px-5
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
              shrink-0
            "
          >
            💐
          </div>

          <h3 className="mt-3 text-sm sm:text-base font-bold text-gray-800 break-words">
            Your bouquet cart is empty
          </h3>

          <p className="mt-1 text-[11px] sm:text-xs text-gray-400 break-words">
            Add some beautiful bouquets to your cart.
          </p>

        </div>

      )}

    </div>
  );
};


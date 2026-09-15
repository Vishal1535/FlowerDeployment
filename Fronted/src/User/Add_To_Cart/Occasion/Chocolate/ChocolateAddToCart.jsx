import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Candy,
} from "lucide-react";

import { ChocolateAddToItem } from "./ChocolateAddToItem";
import { DeleteChocolateAddToCartPopUp } from "./DeleteChocolateAddToCartPopUp";

export const ChocolateAddToCart = ({
  chocolateFromCart = [],
}) => {
  const [showAll, setShowAll] = useState(false);

  const totalAmount = chocolateFromCart.reduce(
    (total, item) =>
      total +
      (item?.chocolate?.price || 0) *
        (item?.quantity || 0),
    0
  );

  const visibleChocolates = showAll
    ? chocolateFromCart
    : chocolateFromCart.slice(0, 2);

  return (
    <div className="w-full">

      {chocolateFromCart.length > 0 ? (
        <div
          className="
            bg-white
            border
            border-rose-100/70
            rounded-3xl
            overflow-hidden
            shadow-lg
            shadow-rose-100/50
          "
        >

          {/* DELETE POPUP */}
          <DeleteChocolateAddToCartPopUp />

          {/* HEADER */}
          <div
            className="
              px-4
              sm:px-5
              py-4
              bg-gradient-to-r
              from-rose-50
              via-orange-50/40
              to-stone-50
              border-b
              border-rose-100/70
              flex
              items-center
              justify-between
            "
          >

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
                  text-rose-400
                  shrink-0
                  shadow-sm
                "
              >
                <Candy size={19} />
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
                  Chocolates
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                  {chocolateFromCart.length}{" "}
                  {chocolateFromCart.length === 1
                    ? "chocolate"
                    : "chocolates"}
                </p>

              </div>

            </div>

            {/* SUBTOTAL */}
            <div className="text-right">

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-rose-300
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
                  text-rose-400
                "
              >
                ₹{totalAmount}
              </p>

            </div>

          </div>

          {/* CHOCOLATE ITEMS */}
          <div className="divide-y divide-rose-50">

            {visibleChocolates.map((item) => (

              <div
                key={item?._id}
                className="
                  px-2
                  sm:px-3
                  hover:bg-rose-50/40
                  transition
                "
              >
                <ChocolateAddToItem
                  item={item}
                />
              </div>

            ))}

          </div>

          {/* VIEW ALL */}
          {chocolateFromCart.length > 2 && (

            <button
              type="button"
              onClick={() =>
                setShowAll((prev) => !prev)
              }
              className="
                w-full
                h-10
                border-t
                border-rose-50
                bg-white
                hover:bg-rose-50/50
                text-sm
                font-semibold
                text-rose-400
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
                  View all chocolates

                  <span className="text-gray-400 font-normal">
                    ({chocolateFromCart.length})
                  </span>

                  <ChevronDown size={16} />
                </>
              )}

            </button>

          )}

          {/* CHOCOLATE TOTAL */}
          <div
            className="
              border-t
              border-rose-100/70
              bg-gradient-to-r
              from-rose-50
              to-stone-50
              px-4
              sm:px-5
              py-3.5
              flex
              items-center
              justify-between
            "
          >

            <div className="flex items-center gap-2">

              <Candy
                size={16}
                className="text-rose-400"
              />

              <span className="text-sm font-semibold text-gray-500">
                Chocolates Total
              </span>

            </div>

            <span className="text-lg font-extrabold text-gray-800">
              ₹{totalAmount}
            </span>

          </div>

        </div>

      ) : (

        /* EMPTY */
        <div
          className="
            bg-white
            border
            border-rose-100/70
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
              bg-rose-50
              flex
              items-center
              justify-center
              text-rose-300
            "
          >
            <Candy size={25} />
          </div>

          <h3 className="mt-3 text-base font-bold text-gray-700">
            Your chocolate cart is empty
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Add a delicious chocolate to your order.
          </p>

        </div>

      )}

    </div>
  );
};
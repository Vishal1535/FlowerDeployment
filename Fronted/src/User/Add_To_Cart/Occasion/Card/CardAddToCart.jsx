import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
} from "lucide-react";

import { CardAddToCartItem } from "./CardAddToCartItem";
import { DeleteCardAddToCartPopUp } from "./DeleteCardAddToCartPopUp";

export const CardAddToCart = ({
  cardFromCart = [],
}) => {
  const [showAll, setShowAll] = useState(false);

  const totalAmount = cardFromCart.reduce(
    (total, item) =>
      total +
      (item?.card?.price || 0) *
        (item?.quantity || 0),
    0
  );

  const visibleCards = showAll
    ? cardFromCart
    : cardFromCart.slice(0, 2);

  return (
    <div className="w-full">

      {cardFromCart.length > 0 ? (
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

          <DeleteCardAddToCartPopUp />

          {/* HEADER */}
          <div
            className="
              px-4
              sm:px-5
              py-4
              bg-gradient-to-r
              from-pink-50
              via-fuchsia-50/60
              to-violet-50
              border-b
              border-pink-100/70
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
                  text-pink-400
                  shrink-0
                  shadow-sm
                "
              >
                <CreditCard size={19} />
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
                  Greeting Cards
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                  {cardFromCart.length}{" "}
                  {cardFromCart.length === 1
                    ? "card"
                    : "cards"}
                </p>
              </div>

            </div>

            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-pink-300 font-semibold">
                Subtotal
              </p>

              <p className="text-base sm:text-lg font-extrabold text-pink-400">
                ₹{totalAmount}
              </p>
            </div>

          </div>

          {/* CARD ITEMS */}
          <div className="divide-y divide-pink-50">
            {visibleCards.map((item) => (
              <div
                key={item?._id}
                className="
                  px-2
                  sm:px-3
                  hover:bg-pink-50/40
                  transition
                "
              >
                <CardAddToCartItem
                  item={item}
                />
              </div>
            ))}
          </div>

          {/* VIEW ALL */}
          {cardFromCart.length > 2 && (
            <button
              type="button"
              onClick={() =>
                setShowAll((prev) => !prev)
              }
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
                  View all cards
                  <span className="text-gray-400 font-normal">
                    ({cardFromCart.length})
                  </span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          )}

          {/* CARD TOTAL */}
          <div
            className="
              border-t
              border-pink-100/70
              bg-gradient-to-r
              from-pink-50
              to-violet-50
              px-4
              sm:px-5
              py-3.5
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-2">
              <CreditCard
                size={16}
                className="text-pink-300"
              />
              <span className="text-sm font-semibold text-gray-500">
                Cards Total
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
            <CreditCard size={25} />
          </div>

          <h3 className="mt-3 text-base font-bold text-gray-700">
            Your card cart is empty
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Add a beautiful greeting card to your order.
          </p>
        </div>

      )}

    </div>
  );
};
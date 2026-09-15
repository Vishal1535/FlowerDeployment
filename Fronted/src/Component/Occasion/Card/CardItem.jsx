import React, { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  AddCardToCartThunk,
  GetAllCardFromCartThunk,
} from "../../../Store/AddToCart/Card/CardAddToCardApi";

export const CardItem = ({ card }) => {
  const dispatch = useDispatch();

  const { cardFromCart = [] } = useSelector(
    (state) => state.CardAddToCart
  );

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  // ================= CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllCardFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // Check whether card is already in cart

  const isInCart = cardFromCart.some(
    (item) =>
      item?.card?._id?.toString() ===
      card?._id?.toString()
  );

  // ================= ADD TO CART =================

  const HandleAddToCart = async (id) => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    try {
      const result = await dispatch(
        AddCardToCartThunk(id)
      );

      if (AddCardToCartThunk.fulfilled.match(result)) {
        toast.success("Card added to cart");
      } else {
        toast.error(
          result.payload ||
            "Failed to add card to cart"
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="
        group
        w-full
        min-w-0
        bg-white
        rounded-xl
        border
        border-gray-100
        overflow-hidden
        shadow-sm
        hover:shadow-md
        hover:-translate-y-0.5
        transition-all
        duration-200
      "
    >

      {/* IMAGE */}

      <div
        className="
          relative
          h-28
          min-[380px]:h-32
          sm:h-36
          bg-pink-50
          overflow-hidden
        "
      >
        <img
          src={card?.image}
          alt={card?.name || "Greeting Card"}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-105
            transition-transform
            duration-300
          "
        />
      </div>

      {/* CONTENT */}

      <div
        className="
          p-2.5
          min-[380px]:p-3
          min-w-0
        "
      >

        {/* NAME */}

        <h3
          className="
            text-xs
            min-[380px]:text-sm
            font-bold
            text-gray-800
            truncate
          "
        >
          {card?.name || "Beautiful Card"}
        </h3>

        {/* PRICE */}

        <p
          className="
            text-sm
            min-[380px]:text-base
            font-extrabold
            text-gray-900
            mt-1
          "
        >
          ₹{card?.price ?? 0}
        </p>

        {/* ADD TO CART */}

        <button
          type="button"
          disabled={!card?.isAvailable || isInCart}
          onClick={() =>
            HandleAddToCart(card?._id)
          }
          className="
            w-full
            h-8
            min-[380px]:h-9
            mt-2
            min-[380px]:mt-2.5
            rounded-lg
            bg-gray-900
            text-white
            flex
            items-center
            justify-center
            gap-1
            min-[380px]:gap-1.5
            text-[10px]
            min-[380px]:text-xs
            font-semibold
            hover:bg-pink-500
            active:scale-[0.98]
            disabled:bg-gray-200
            disabled:text-gray-400
            disabled:cursor-not-allowed
            transition-all
            cursor-pointer
            px-1.5
          "
        >
          <ShoppingBag
            size={13}
            className="shrink-0 min-[380px]:w-[14px] min-[380px]:h-[14px]"
          />

          <span className="truncate">
            {isInCart
              ? "Added to Cart"
              : card?.isAvailable
                ? "Add to Cart"
                : "Unavailable"}
          </span>
        </button>

      </div>

    </div>
  );
};
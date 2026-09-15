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
    <div className="
      group
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
    ">

      {/* IMAGE */}

      <div className="
        relative
        h-32
        sm:h-36
        bg-pink-50
        overflow-hidden
      ">
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

      <div className="p-3">

        {/* NAME */}

        <h3 className="
          text-sm
          font-bold
          text-gray-800
          truncate
        ">
          {card?.name || "Beautiful Card"}
        </h3>

        {/* PRICE */}

        <p className="
          text-base
          font-extrabold
          text-gray-900
          mt-1
        ">
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
            h-9
            mt-2.5
            rounded-lg
            bg-gray-900
            text-white
            flex
            items-center
            justify-center
            gap-1.5
            text-xs
            font-semibold
            hover:bg-pink-500
            active:scale-[0.98]
            disabled:bg-gray-200
            disabled:text-gray-400
            disabled:cursor-not-allowed
            transition-all
            cursor-pointer
          "
        >
          <ShoppingBag size={14} />

          {isInCart
            ? "Added to Cart"
            : card?.isAvailable
              ? "Add to Cart"
              : "Unavailable"}
        </button>

      </div>

    </div>
  );
};
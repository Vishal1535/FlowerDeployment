import React, { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  GetAllChocolateFromCartThunk,
  AddChocolateToCartThunk,
} from "../../../Store/AddToCart/Chocolate/ChocolateAddToCartApi";

export const ChocolateItem = ({ chocolate }) => {
  const dispatch = useDispatch();

  const {
    chocolateFromCart = [],
  } = useSelector(
    (state) => state.ChocolateAddToCart
  );

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  // ================= CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllChocolateFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ================= CHECK ALREADY IN CART =================

  const isInCart = chocolateFromCart.some(
    (item) =>
      item?.chocolate?._id?.toString() ===
      chocolate?._id?.toString()
  );

  // ================= ADD TO CART =================

  const HandleAddToCart = async (id) => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    try {
      const result = await dispatch(
        AddChocolateToCartThunk(id)
      );

      if (
        AddChocolateToCartThunk.fulfilled.match(result)
      ) {
        toast.success("Chocolate added to cart");
      } else {
        toast.error(
          result.payload ||
            "Failed to add chocolate to cart"
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

      {/* ==============================
          IMAGE
      ============================== */}

      <div
        className="
          w-full
          h-32
          bg-amber-50
          overflow-hidden
        "
      >

        {chocolate?.image ? (
          <img
            src={chocolate.image}
            alt={
              chocolate?.name ||
              "Chocolate"
            }
            className="
              w-full
              h-full
              object-cover
              group-hover:scale-105
              transition-transform
              duration-300
            "
          />
        ) : (
          <div
            className="
              w-full
              h-full
              flex
              items-center
              justify-center
              text-4xl
            "
          >
            🍫
          </div>
        )}

      </div>

      {/* ==============================
          CONTENT
      ============================== */}

      <div className="p-3">

        {/* NAME */}

        <h3
          className="
            text-sm
            font-bold
            text-gray-800
            truncate
          "
        >
          {chocolate?.name ||
            "Delicious Chocolate"}
        </h3>

        {/* PRICE */}

        <p
          className="
            text-base
            font-extrabold
            text-gray-900
            mt-1
          "
        >
          ₹{chocolate?.price ?? 0}
        </p>

        {/* ==============================
            ADD TO CART
        ============================== */}

        <button
          type="button"
          disabled={
            !chocolate?.isAvailable ||
            isInCart
          }
          onClick={() =>
            HandleAddToCart(chocolate?._id)
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
            : chocolate?.isAvailable
              ? "Add to Cart"
              : "Unavailable"}

        </button>

      </div>

    </div>
  );
};
import React, { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  GetAllMiniCupcakeFromCartThunk,
  AddMiniCupcakeToCartThunk,
} from "../../../Store/AddToCart/MiniCupCake/MiniCupCakeAddToCartApi";

export const MiniCupCakeItem = ({ miniCupcake }) => {
  const dispatch = useDispatch();

  const {
    miniCupcakeFromCart = [],
  } = useSelector(
    (state) => state.MiniCupCakeAddToCart
  );

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  // ================= CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllMiniCupcakeFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ================= CHECK ALREADY IN CART =================

  const isInCart = miniCupcakeFromCart.some(
    (item) =>
      item?.miniCupcake?._id?.toString() ===
      miniCupcake?._id?.toString()
  );

  // ================= ADD TO CART =================

  const HandleAddToCart = async (id) => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    try {
      const result = await dispatch(
        AddMiniCupcakeToCartThunk(id)
      );

      if (
        AddMiniCupcakeToCartThunk.fulfilled.match(result)
      ) {
        toast.success("Mini Cupcake added to cart");
      } else {
        toast.error(
          result.payload ||
            "Failed to add mini cupcake to cart"
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
        w-full
        h-32
        bg-pink-50
        overflow-hidden
      ">

        {miniCupcake?.image ? (
          <img
            src={miniCupcake.image}
            alt={
              miniCupcake?.name ||
              "Mini Cupcake"
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
          <div className="
            w-full
            h-full
            flex
            items-center
            justify-center
            text-4xl
          ">
            🧁
          </div>
        )}

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
          {miniCupcake?.name ||
            "Delicious Mini Cupcake"}
        </h3>

        {/* PRICE */}

        <p className="
          text-base
          font-extrabold
          text-gray-900
          mt-1
        ">
          ₹{miniCupcake?.price ?? 0}
        </p>

        {/* ADD TO CART */}

        <button
          type="button"
          disabled={
            !miniCupcake?.isAvailable ||
            isInCart
          }
          onClick={() =>
            HandleAddToCart(miniCupcake?._id)
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
            : miniCupcake?.isAvailable
              ? "Add to Cart"
              : "Unavailable"}
        </button>

      </div>

    </div>
  );
};
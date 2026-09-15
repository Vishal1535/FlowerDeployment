import React, { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  GetAllMiniCupcakeFromCartThunk,
  AddMiniCupcakeToCartThunk,
} from "../../../Store/AddToCart/MiniCupCake/MiniCupCakeAddToCartApi";

export const MiniCupCakeItem = ({ miniCupCake }) => {
  const dispatch = useDispatch();

  const {
    miniCupCakeFromCart = [],
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

  const isInCart = miniCupCakeFromCart.some(
    (item) =>
      item?.miniCupCake?._id?.toString() ===
      miniCupCake?._id?.toString()
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
      w-full
      min-w-0
      bg-white
      rounded-xl
      sm:rounded-2xl
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
        h-28
        min-[380px]:h-32
        sm:h-36
        bg-pink-50
        overflow-hidden
      ">

        {miniCupCake?.image ? (
          <img
            src={miniCupCake.image}
            alt={
              miniCupCake?.name ||
              "Mini CupCake"
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
            text-3xl
            min-[380px]:text-4xl
          ">
            🧁
          </div>
        )}

      </div>

      {/* CONTENT */}

      <div className="
        p-2.5
        min-[380px]:p-3
        min-w-0
      ">

        {/* NAME */}

        <h3 className="
          text-xs
          min-[380px]:text-sm
          font-bold
          text-gray-800
          truncate
        ">
          {miniCupCake?.name ||
            "Delicious Mini CupCake"}
        </h3>

        {/* PRICE */}

        <p className="
          text-sm
          min-[380px]:text-base
          font-extrabold
          text-gray-900
          mt-0.5
          min-[380px]:mt-1
        ">
          ₹{miniCupCake?.price ?? 0}
        </p>

        {/* ADD TO CART */}

        <button
          type="button"
          disabled={
            !miniCupCake?.isAvailable ||
            isInCart
          }
          onClick={() =>
            HandleAddToCart(miniCupCake?._id)
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
            whitespace-nowrap
          "
        >
          <ShoppingBag
            size={13}
            className="min-[380px]:w-3.5 min-[380px]:h-3.5"
          />

          {isInCart
            ? "Added to Cart"
            : miniCupCake?.isAvailable
              ? "Add to Cart"
              : "Unavailable"}
        </button>

      </div>

    </div>
  );
};
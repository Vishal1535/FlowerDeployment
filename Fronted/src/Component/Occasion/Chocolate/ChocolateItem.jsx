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

  // ==============================
  // GET CART
  // ==============================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        GetAllChocolateFromCartThunk()
      );
    }
  }, [isAuthorized, dispatch]);

  // ==============================
  // CHECK ALREADY IN CART
  // ==============================

  const isInCart = chocolateFromCart.some(
    (item) =>
      item?.chocolate?._id?.toString() ===
      chocolate?._id?.toString()
  );

  // ==============================
  // ADD TO CART
  // ==============================

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
        AddChocolateToCartThunk.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Chocolate added to cart"
        );
      } else {
        toast.error(
          result.payload ||
            "Failed to add chocolate to cart"
        );
      }
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
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
      {/* ==============================
          IMAGE
      ============================== */}

      <div
        className="
          relative
          h-28
          min-[380px]:h-32
          sm:h-36
          md:h-40
          bg-gray-50
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
            draggable="false"
            className="
              w-full
              h-full
              object-cover
              group-hover:scale-105
              transition-transform
              duration-300
            "
            onError={(e) => {
              e.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          <div
            className="
              w-full
              h-full
              flex
              items-center
              justify-center
              text-3xl
              min-[380px]:text-4xl
            "
          >
            🍫
          </div>
        )}
      </div>

      {/* ==============================
          CONTENT
      ============================== */}

      <div
        className="
          p-2.5
          min-[380px]:p-3
          sm:p-3.5
          md:p-4
          min-w-0
        "
      >
        {/* NAME */}

        <h3
          className="
            text-xs
            min-[380px]:text-sm
            sm:text-[15px]
            md:text-base
            font-semibold
            text-gray-800
            line-clamp-2
            break-words
            leading-4
            sm:leading-5
            min-h-[32px]
            sm:min-h-[40px]
          "
        >
          {chocolate?.name ||
            "Delicious Chocolate"}
        </h3>

        {/* PRICE */}

        <p
          className="
            text-sm
            min-[380px]:text-base
            sm:text-lg
            font-bold
            text-gray-900
            mt-1.5
            sm:mt-2
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
            HandleAddToCart(
              chocolate?._id
            )
          }
          className="
            w-full
            h-9
            min-[380px]:h-10
            sm:h-11
            mt-2.5
            sm:mt-3
            px-2
            sm:px-3
            rounded-lg
            bg-gray-900
            text-white
            flex
            items-center
            justify-center
            gap-1.5
            sm:gap-2
            text-[10px]
            min-[380px]:text-xs
            sm:text-sm
            font-semibold
            whitespace-nowrap
            hover:bg-gray-800
            active:scale-[0.98]
            disabled:bg-gray-200
            disabled:text-gray-400
            disabled:cursor-not-allowed
            transition-all
            cursor-pointer
          "
        >
          <ShoppingBag
            size={14}
            className="
              shrink-0
              min-[380px]:w-[15px]
              min-[380px]:h-[15px]
              sm:w-4
              sm:h-4
            "
          />

          <span className="truncate">
            {isInCart
              ? "Added to Cart"
              : chocolate?.isAvailable
                ? "Add to Cart"
                : "Unavailable"}
          </span>
        </button>
      </div>
    </div>
  );
};
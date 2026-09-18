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
          h-36
          min-[380px]:h-40
          sm:h-44
          md:h-48
          bg-gray-50
          overflow-hidden
          flex
          items-center
          justify-center
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
              object-contain
              group-hover:scale-[1.03]
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
          p-3
          min-[380px]:p-3.5
          sm:p-4
          md:p-5
          min-w-0
        "
      >
        {/* NAME */}

        <h3
          className="
            text-sm
            min-[380px]:text-[15px]
            sm:text-base
            md:text-lg
            font-semibold
            text-gray-800
            line-clamp-2
            break-words
            leading-5
            sm:leading-6
            min-h-[40px]
            sm:min-h-[48px]
          "
        >
          {chocolate?.name ||
            "Delicious Chocolate"}
        </h3>

        {/* PRICE */}

        <p
          className="
            text-base
            min-[380px]:text-lg
            sm:text-xl
            font-bold
            text-gray-900
            mt-2
            sm:mt-2.5
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
            h-11
            min-[380px]:h-12
            sm:h-12
            mt-3
            sm:mt-4
            px-3
            sm:px-4
            rounded-xl
            bg-gray-900
            text-white
            flex
            items-center
            justify-center
            gap-2
            text-xs
            min-[380px]:text-sm
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
            size={16}
            className="
              shrink-0
              min-[380px]:w-[17px]
              min-[380px]:h-[17px]
              sm:w-[18px]
              sm:h-[18px]
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
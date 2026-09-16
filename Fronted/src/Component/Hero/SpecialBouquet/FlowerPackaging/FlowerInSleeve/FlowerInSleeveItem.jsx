import React, { useEffect } from "react";

import {
  Heart,
  ShoppingCart,
  Flower2,
  Eye,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  GetAllFlowerInSleeveFromCartThunk,
  AddFlowerInSleeveToCartThunk,
} from "../../../../../Store/AddToCart/FlowerInSleeve/FlowerInSleeveAddToCartApi";

import {
  FlowerInSleeveWishlistThunk,
} from "../../../../../Store/Whislist/WhislistApi";

export const FlowerInSleeveItem = ({ flower }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= REDUX =================

  const { flowerInSleeveWishlist = [] } = useSelector(
    (state) => state.wishlist
  );

  const {
    flowerInSleeveFromCart = [],
  } = useSelector(
    (state) => state.FlowerInSleeveAddToCart
  );

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  // ================= CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        GetAllFlowerInSleeveFromCartThunk()
      );
    }
  }, [isAuthorized, dispatch]);

  const isInCart = flowerInSleeveFromCart.some(
    (item) =>
      item?.flowerInSleeve?._id?.toString() ===
      flower?._id?.toString()
  );

  // ================= WISHLIST =================

  const HandleWishlist = () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!flower?._id) {
      toast.error("Flower not found");
      return;
    }

    dispatch(
      FlowerInSleeveWishlistThunk(
        flower._id
      )
    );
  };

  // Check product already in wishlist

  const isWishlisted =
    flowerInSleeveWishlist?.some((item) => {
      const id =
        typeof item === "object"
          ? item?._id
          : item;

      return (
        id?.toString() ===
        flower?._id?.toString()
      );
    });

  // ================= STOCK =================

  const stock = flower?.stock ?? 0;

  const isAvailable =
    flower?.isAvailable !== false &&
    stock > 0;

  // ================= DISCOUNT =================

  const hasDiscount =
    flower?.discountPrice > 0 &&
    flower?.discountPrice < flower?.price;

  const finalPrice = hasDiscount
    ? flower.discountPrice
    : flower?.price ?? 0;

  // ================= ADD TO CART =================

  const HandleAddToCart = async (id) => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!isAvailable) {
      toast.error(
        "Flower in sleeve is unavailable"
      );
      return;
    }

    if (isInCart) {
      toast.error(
        "Flower in sleeve already added to cart"
      );
      return;
    }

    try {
      const result = await dispatch(
        AddFlowerInSleeveToCartThunk(id)
      );

      if (
        AddFlowerInSleeveToCartThunk.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Flower in sleeve added to cart"
        );
      } else {
        toast.error(
          result.payload ||
            "Failed to add flower in sleeve to cart"
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
        overflow-hidden
        rounded-2xl
        sm:rounded-3xl
        bg-white
        border border-gray-100
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      {/* ================= IMAGE ================= */}

      <div
        className="
          relative
          h-48
          min-[380px]:h-52
          sm:h-60
          lg:h-64
          xl:h-72
          overflow-hidden
          bg-gradient-to-br
          from-pink-50
          to-rose-50
        "
      >

        {flower?.image ? (
          <img
            src={flower.image}
            alt={
              flower?.name ||
              "Flower in Sleeve"
            }
            className="
              w-full
              h-full
              object-contain
              p-3
              min-[380px]:p-4
              sm:p-5
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              h-full
              flex
              flex-col
              items-center
              justify-center
              text-gray-300
            "
          >
            <Flower2
              size={40}
              className="sm:hidden"
              strokeWidth={1.2}
            />

            <Flower2
              size={48}
              className="hidden sm:block"
              strokeWidth={1.2}
            />

            <span className="text-[11px] sm:text-xs mt-2">
              No image
            </span>
          </div>
        )}

        {/* ================= AVAILABILITY ================= */}

        <span
          className={`
            absolute
            top-2.5
            left-2.5
            sm:top-3
            sm:left-3
            px-2
            sm:px-2.5
            py-1
            rounded-full
            text-[9px]
            sm:text-[10px]
            font-semibold
            whitespace-nowrap

            ${
              isAvailable
                ? stock <= 5
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }
          `}
        >
          {isAvailable
            ? stock <= 5
              ? "Few left"
              : "In Stock"
            : "Unavailable"}
        </span>

        {/* ================= WISHLIST ================= */}

        <button
          type="button"
          onClick={HandleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`
            absolute
            top-2.5
            right-2.5
            sm:top-3
            sm:right-3
            w-8
            h-8
            sm:w-9
            sm:h-9
            rounded-full
            bg-white
            shadow-sm
            flex
            items-center
            justify-center
            transition-all
            duration-300
            cursor-pointer
            hover:scale-110
            active:scale-90

            ${
              isWishlisted
                ? "text-pink-500"
                : "text-gray-500 hover:text-pink-500"
            }
          `}
        >
          <Heart
            size={14}
            className="sm:hidden"
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />

          <Heart
            size={16}
            className="hidden sm:block"
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {/* ================= SLEEVE TYPE ================= */}

        <span
          className="
            absolute
            bottom-2.5
            left-2.5
            sm:bottom-3
            sm:left-3
            max-w-[65%]
            truncate
            px-2
            sm:px-2.5
            py-1
            rounded-md
            bg-white/90
            text-[9px]
            sm:text-[10px]
            font-medium
            text-gray-600
          "
        >
          {flower?.sleeveType ||
            "Flower Sleeve"}
        </span>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-3.5 min-[380px]:p-4 sm:p-5">

        {/* ================= NAME + PRICE ================= */}

        <div className="flex items-start justify-between gap-2 sm:gap-3">

          <h3
            className="
              min-w-0
              flex-1
              text-sm
              min-[380px]:text-base
              font-semibold
              text-gray-900
              capitalize
              truncate
            "
          >
            {flower?.name ||
              "Beautiful Flower"}
          </h3>

          <div className="shrink-0 text-right">

            <p className="text-sm min-[380px]:text-base font-bold text-gray-900">
              ₹{finalPrice}
            </p>

            {hasDiscount && (
              <p className="text-[9px] min-[380px]:text-[10px] text-gray-400 line-through">
                ₹{flower.price}
              </p>
            )}

          </div>

        </div>

        {/* ================= DETAILS ================= */}

        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 min-w-0">

          <span className="text-[11px] sm:text-xs text-gray-400 shrink-0">
            Sleeve
          </span>

          <span className="text-gray-200 shrink-0">
            •
          </span>

          <span
            className="
              text-[11px]
              sm:text-xs
              font-semibold
              text-gray-700
              truncate
              min-w-0
            "
          >
            {flower?.sleeveType ||
              "Flower Sleeve"}
          </span>

        </div>

        {/* ================= DESCRIPTION ================= */}

        <p
          className="
            mt-2
            text-[11px]
            sm:text-xs
            text-gray-500
            leading-relaxed
            line-clamp-2
            min-h-[30px]
            sm:min-h-[32px]
          "
        >
          {flower?.description ||
            "A beautiful flower arrangement wrapped in an elegant sleeve."}
        </p>

        {/* ================= EXTRA DETAILS ================= */}

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">

          {flower?.color && (
            <span
              className="
                max-w-[45%]
                truncate
                px-2
                sm:px-2.5
                py-1
                rounded-md
                bg-pink-50
                text-pink-600
                text-[9px]
                sm:text-[10px]
                font-medium
              "
            >
              {flower.color}
            </span>
          )}

          {flower?.size && (
            <span
              className="
                max-w-[45%]
                truncate
                px-2
                sm:px-2.5
                py-1
                rounded-md
                bg-gray-100
                text-gray-600
                text-[9px]
                sm:text-[10px]
                font-medium
              "
            >
              {flower.size}
            </span>
          )}

          {flower?.occasion?.slice(0, 1).map(
            (occasion, index) => (
              <span
                key={index}
                className="
                  max-w-[45%]
                  truncate
                  px-2
                  sm:px-2.5
                  py-1
                  rounded-md
                  bg-rose-50
                  text-rose-500
                  text-[9px]
                  sm:text-[10px]
                  font-medium
                "
              >
                {occasion}
              </span>
            )
          )}

        </div>

        {/* ================= STOCK ================= */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
            mt-3
            sm:mt-4
            text-[11px]
            sm:text-xs
          "
        >

          <div className="flex items-center gap-1.5 min-w-0">

            <Flower2
              size={13}
              className="text-pink-500 shrink-0"
            />

            <span className="text-gray-400">
              Available
            </span>

          </div>

          <span
            className={
              isAvailable
                ? "font-semibold text-gray-700 text-right shrink-0"
                : "font-semibold text-red-500 text-right shrink-0"
            }
          >
            {isAvailable
              ? `${stock} pieces`
              : "Unavailable"}
          </span>

        </div>

        {/* ================= DIVIDER ================= */}

        <div className="border-t border-gray-100 my-3 sm:my-4" />

        {/* ================================================= */}
        {/* ACTION BUTTONS */}
        {/* ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            min-[420px]:grid-cols-2
            gap-2.5
            sm:gap-3
            mt-1
          "
        >

          {/* ================= VIEW DETAILS ================= */}

          <button
            type="button"
            onClick={() =>
              navigate(
                `/flower-in-sleeve/${flower?._id}`
              )
            }
            className="
              w-full
              h-11
              sm:h-12
              px-3
              sm:px-4
              rounded-xl
              border
              border-pink-200
              bg-pink-50
              text-pink-600
              text-xs
              sm:text-sm
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              whitespace-nowrap
              hover:bg-pink-500
              hover:border-pink-500
              hover:text-white
              hover:shadow-md
              hover:shadow-pink-100
              active:scale-[0.97]
              cursor-pointer
              transition-all
              duration-300
            "
          >
            <Eye
              size={16}
              className="shrink-0"
              strokeWidth={2.2}
            />

            <span>
              View Details
            </span>
          </button>

          {/* ================= ADD TO CART ================= */}

          <button
            type="button"
            disabled={
              !isAvailable ||
              isInCart
            }
            onClick={() =>
              HandleAddToCart(
                flower?._id
              )
            }
            className="
              w-full
              h-11
              sm:h-12
              px-3
              sm:px-4
              rounded-xl
              bg-pink-500
              text-white
              text-xs
              sm:text-sm
              font-bold
              flex
              items-center
              justify-center
              gap-2
              whitespace-nowrap
              hover:bg-pink-600
              hover:shadow-md
              hover:shadow-pink-200
              active:scale-[0.97]
              cursor-pointer
              disabled:bg-gray-100
              disabled:text-gray-400
              disabled:shadow-none
              disabled:cursor-not-allowed
              transition-all
              duration-300
            "
          >
            <ShoppingCart
              size={16}
              className="shrink-0"
              strokeWidth={2.2}
            />

            <span>
              {isInCart
                ? "Added to Cart"
                : isAvailable
                  ? "Add to Cart"
                  : "Unavailable"}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};
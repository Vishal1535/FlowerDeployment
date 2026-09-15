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
        overflow-hidden
        rounded-2xl
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
          h-52
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
              p-4
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
              size={48}
              strokeWidth={1.2}
            />

            <span className="text-xs mt-2">
              No image
            </span>
          </div>
        )}

        {/* ================= AVAILABILITY ================= */}

        <span
          className={`
            absolute
            top-3
            left-3
            px-2.5
            py-1
            rounded-full
            text-[10px]
            font-semibold

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
            top-3
            right-3
            w-8
            h-8
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
            size={15}
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
            bottom-3
            left-3
            px-2.5
            py-1
            rounded-md
            bg-white/90
            text-[10px]
            font-medium
            text-gray-600
          "
        >
          {flower?.sleeveType ||
            "Flower Sleeve"}
        </span>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-4">

        {/* ================= NAME + PRICE ================= */}

        <div className="flex items-start justify-between gap-3">

          <h3
            className="
              text-base
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

            <p className="text-base font-bold text-gray-900">
              ₹{finalPrice}
            </p>

            {hasDiscount && (
              <p className="text-[10px] text-gray-400 line-through">
                ₹{flower.price}
              </p>
            )}

          </div>

        </div>

        {/* ================= DETAILS ================= */}

        <div className="flex items-center gap-2 mt-2">

          <span className="text-xs text-gray-400">
            Sleeve
          </span>

          <span className="text-gray-200">
            •
          </span>

          <span
            className="
              text-xs
              font-semibold
              text-gray-700
              truncate
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
            text-xs
            text-gray-500
            leading-relaxed
            line-clamp-2
            min-h-[32px]
          "
        >
          {flower?.description ||
            "A beautiful flower arrangement wrapped in an elegant sleeve."}
        </p>

        {/* ================= EXTRA DETAILS ================= */}

        <div className="flex flex-wrap gap-2 mt-3">

          {flower?.color && (
            <span
              className="
                px-2.5
                py-1
                rounded-md
                bg-pink-50
                text-pink-600
                text-[10px]
                font-medium
              "
            >
              {flower.color}
            </span>
          )}

          {flower?.size && (
            <span
              className="
                px-2.5
                py-1
                rounded-md
                bg-gray-100
                text-gray-600
                text-[10px]
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
                  px-2.5
                  py-1
                  rounded-md
                  bg-rose-50
                  text-rose-500
                  text-[10px]
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
            mt-4
            text-xs
          "
        >

          <div className="flex items-center gap-1.5">

            <Flower2
              size={14}
              className="text-pink-500"
            />

            <span className="text-gray-400">
              Available
            </span>

          </div>

          <span
            className={
              isAvailable
                ? "font-semibold text-gray-700"
                : "font-semibold text-red-500"
            }
          >
            {isAvailable
              ? `${stock} pieces`
              : "Unavailable"}
          </span>

        </div>

        {/* ================= DIVIDER ================= */}

        <div className="border-t border-gray-100 my-3" />

        {/* ================= BUTTONS ================= */}

        <div className="flex gap-2">

          {/* ================= VIEW ================= */}

          <button
            type="button"
            onClick={() =>
              navigate(
                `/flower-in-sleeve/${flower?._id}`
              )
            }
            className="
              flex-1
              h-10
              rounded-lg
              border
              border-gray-200
              bg-white
              text-gray-600
              text-xs
              font-semibold
              flex
              items-center
              justify-center
              gap-1.5
              hover:bg-pink-50
              hover:text-pink-600
              hover:border-pink-200
              transition
              cursor-pointer
            "
          >
            <Eye size={15} />
            View
          </button>

          {/* ================= CART ================= */}

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
              flex-1
              h-10
              rounded-lg
              bg-gray-900
              text-white
              text-xs
              font-semibold
              flex
              items-center
              justify-center
              gap-1.5
              hover:bg-pink-600
              transition
              cursor-pointer
              disabled:bg-gray-100
              disabled:text-gray-400
              disabled:cursor-not-allowed
            "
          >
            <ShoppingCart size={15} />

            {isInCart
              ? "Added to Cart"
              : isAvailable
                ? "Add to Cart"
                : "Unavailable"}
          </button>

        </div>

      </div>
    </div>
  );
};
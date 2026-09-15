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
  GetAllFlowerInBoxFromCartThunk,
  AddFlowerInBoxToCartThunk,
} from "../../../Store/AddToCart/FlowerInBox/FlowerInBoxAddToCartApi";

import { FlowerInBoxWishlistThunk } from "../../../Store/Whislist/WhislistApi";

export const FLowerInBoxItem = ({ flowerInBox }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { flowerInBoxWishlist = [] } = useSelector(
    (state) => state.wishlist
  );

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  const { flowerInBoxFromCart = [] } = useSelector(
    (state) => state.FlowerInBoxAddToCart
  );

  // ================= GET ALL FLOWER IN BOX FROM CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllFlowerInBoxFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ================= CHECK FLOWER IN BOX IN CART =================

  const isInCart = flowerInBoxFromCart.some(
    (item) =>
      item?.flowerInBox?._id?.toString() ===
      flowerInBox?._id?.toString()
  );

  // ================= ADD TO CART =================

  const HandleAddToCart = async (id) => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!id) {
      toast.error("Flower in box not found");
      return;
    }

    if (!isAvailable) {
      toast.error("Flower in box is unavailable");
      return;
    }

    if (isInCart) {
      toast.error("Flower in box already added to cart");
      return;
    }

    try {
      const result = await dispatch(
        AddFlowerInBoxToCartThunk(id)
      );

      if (
        AddFlowerInBoxToCartThunk.fulfilled.match(result)
      ) {
        toast.success("Flower in box added to cart");

        // Get updated cart
        dispatch(GetAllFlowerInBoxFromCartThunk());
      } else {
        toast.error(
          result.payload ||
            "Failed to add flower in box to cart"
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ================= WISHLIST =================

  const isWishlisted = flowerInBoxWishlist.some((item) => {
    const id =
      typeof item === "object"
        ? item?._id
        : item;

    return (
      id?.toString() ===
      flowerInBox?._id?.toString()
    );
  });

  const handleWishlist = () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!flowerInBox?._id) {
      toast.error("Flower in box not found");
      return;
    }

    dispatch(
      FlowerInBoxWishlistThunk(flowerInBox._id)
    );
  };

  // ================= STOCK =================

  const stock = flowerInBox?.stock ?? 0;

  const isAvailable =
    flowerInBox?.isAvailable !== false &&
    stock > 0;

  // ================= PRICE =================

  const hasDiscount =
    flowerInBox?.discountPrice > 0 &&
    flowerInBox?.discountPrice < flowerInBox?.price;

  const finalPrice = hasDiscount
    ? flowerInBox.discountPrice
    : flowerInBox?.price ?? 0;

  return (
    <div
      className="
        group
        w-full
        max-w-sm
        overflow-hidden
        rounded-2xl
        bg-white
        border border-pink-100
        shadow-sm
        hover:shadow-md
        hover:-translate-y-0.5
        transition-all
        duration-300
      "
    >

      {/* ================= IMAGE ================= */}

      <div
        className="
          relative
          h-44
          sm:h-48
          overflow-hidden
          bg-gradient-to-br
          from-pink-50
          via-rose-50
          to-white
        "
      >

        {flowerInBox?.image ? (
          <img
            src={flowerInBox.image}
            alt={
              flowerInBox?.name ||
              "Flower In Box"
            }
            className="
              w-full
              h-full
              object-contain
              p-3
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
              size={42}
              strokeWidth={1.2}
            />

            <span className="text-[11px] mt-1">
              No image
            </span>
          </div>
        )}

        {/* ================= STOCK ================= */}

        <span
          className={`
            absolute
            top-2.5
            left-2.5
            px-2
            py-1
            rounded-full
            text-[9px]
            font-bold
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
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`
            absolute
            top-2.5
            right-2.5
            w-8
            h-8
            rounded-full
            flex
            items-center
            justify-center
            shadow-sm
            transition-all
            cursor-pointer
            ${
              isWishlisted
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-500 hover:text-pink-500 hover:scale-105"
            }
          `}
        >
          <Heart
            size={14}
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {/* ================= CATEGORY ================= */}

        <span
          className="
            absolute
            bottom-2.5
            left-2.5
            px-2
            py-1
            rounded-md
            bg-white/90
            backdrop-blur-sm
            text-[9px]
            font-semibold
            text-gray-600
          "
        >
          {flowerInBox?.category ||
            "Flower In Box"}
        </span>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-3.5">

        {/* NAME + PRICE */}

        <div className="flex items-center justify-between gap-2">

          <h3
            className="
              min-w-0
              text-sm
              font-bold
              text-gray-900
              capitalize
              truncate
            "
          >
            {flowerInBox?.name ||
              "Flower Box"}
          </h3>

          <div className="shrink-0 text-right">

            <p className="text-sm font-extrabold text-gray-900">
              ₹{finalPrice}
            </p>

            {hasDiscount && (
              <p className="text-[9px] text-gray-400 line-through">
                ₹{flowerInBox.price}
              </p>
            )}

          </div>

        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-1.5
            text-[11px]
            leading-4
            text-gray-500
            line-clamp-1
          "
        >
          {flowerInBox?.description ||
            "Beautiful flowers arranged in an elegant box."}
        </p>

        {/* STOCK */}

        <div className="flex items-center justify-between mt-2">

          <span className="text-[10px] text-gray-400">
            Available
          </span>

          <span
            className={`
              text-[10px]
              font-semibold
              ${
                isAvailable
                  ? "text-gray-600"
                  : "text-red-500"
              }
            `}
          >
            {isAvailable
              ? `${stock} boxes`
              : "Unavailable"}
          </span>

        </div>

        {/* DIVIDER */}

        <div className="border-t border-gray-100 my-2.5" />

        {/* BUTTONS */}

        <div className="flex gap-2">

          {/* VIEW */}

          <button
            type="button"
            onClick={() =>
              navigate(
                `/flower-in-box/${flowerInBox?._id}`
              )
            }
            className="
              flex-1
              h-9
              rounded-lg
              border
              border-gray-200
              bg-white
              text-gray-600
              text-[10px]
              font-bold
              flex
              items-center
              justify-center
              gap-1
              hover:bg-pink-50
              hover:text-pink-600
              hover:border-pink-200
              transition
              cursor-pointer
            "
          >
            <Eye size={14} />
            View
          </button>

          {/* CART */}

          <button
            type="button"
            disabled={!isAvailable || isInCart}
            onClick={() =>
              HandleAddToCart(flowerInBox?._id)
            }
            className={`
              flex-1
              h-9
              rounded-lg
              text-[10px]
              font-bold
              flex
              items-center
              justify-center
              gap-1
              transition
              ${
                isInCart
                  ? "bg-green-50 text-green-600 cursor-not-allowed"
                  : isAvailable
                    ? "bg-gray-900 text-white hover:bg-pink-600 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            <ShoppingCart size={14} />

            {!isAvailable
              ? "Unavailable"
              : isInCart
                ? "Added to Cart"
                : "Add to Cart"}
          </button>

        </div>

      </div>
    </div>
  );
};
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
  FlowerInSleeveWishlistThunk,
} from "../../../Store/Whislist/WhislistApi";

import {
  GetAllFlowerInSleeveFromCartThunk,
  AddFlowerInSleeveToCartThunk,
} from "../../../Store/AddToCart/FlowerInSleeve/FlowerInSleeveAddToCartApi";

export const FlowerSleeveItem = ({
  flowerInSleeve,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= WISHLIST =================

  const {
    flowerInSleeveWishlist = [],
  } = useSelector(
    (state) => state.wishlist
  );

  // ================= AUTH =================

  const {
    isAuthorized,
  } = useSelector(
    (state) => state.user
  );

  // ================= CART =================

  const {
    flowerInSleeveFromCart = [],
  } = useSelector(
    (state) =>
      state.FlowerInSleeveAddToCart
  );

  // ================= GET CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        GetAllFlowerInSleeveFromCartThunk()
      );
    }
  }, [isAuthorized, dispatch]);

  // ================= CHECK CART =================

  const isInCart =
    Array.isArray(
      flowerInSleeveFromCart
    ) &&
    flowerInSleeveFromCart.some(
      (item) =>
        item?.flowerInSleeve?._id?.toString() ===
        flowerInSleeve?._id?.toString()
    );

  // ================= WISHLIST =================

  const isWishlisted =
    Array.isArray(
      flowerInSleeveWishlist
    ) &&
    flowerInSleeveWishlist.some(
      (item) => {
        const id =
          typeof item === "object"
            ? item?._id
            : item;

        return (
          id?.toString() ===
          flowerInSleeve?._id?.toString()
        );
      }
    );

  // ================= WISHLIST HANDLER =================

  const handleWishlist = () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!flowerInSleeve?._id) {
      toast.error(
        "Flower in sleeve not found"
      );
      return;
    }

    dispatch(
      FlowerInSleeveWishlistThunk(
        flowerInSleeve._id
      )
    );
  };

  // ================= STOCK =================

  const stock =
    flowerInSleeve?.stock ?? 0;

  const isAvailable =
    flowerInSleeve?.isAvailable !== false &&
    stock > 0;

  // ================= ADD TO CART =================

  const HandleAddToCart = async (id) => {
    // Login check
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    // ID check
    if (!id) {
      toast.error(
        "Flower in sleeve not found"
      );
      return;
    }

    // Stock check
    if (!isAvailable) {
      toast.error(
        "Flower in sleeve is unavailable"
      );
      return;
    }

    // Already cart check
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

        // Get updated cart
        dispatch(
          GetAllFlowerInSleeveFromCartThunk()
        );
      } else {
        toast.error(
          result.payload ||
            "Failed to add flower in sleeve to cart"
        );
      }
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    }
  };

  // ================= DISCOUNT =================

  const hasDiscount =
    flowerInSleeve?.discountPrice > 0 &&
    flowerInSleeve?.discountPrice <
      flowerInSleeve?.price;

  const finalPrice = hasDiscount
    ? flowerInSleeve.discountPrice
    : flowerInSleeve?.price ?? 0;

  return (
    <div
      className="
        group
        w-full
        overflow-hidden
        rounded-xl
        bg-white
        border border-pink-100
        shadow-sm
        hover:shadow-md
        hover:border-pink-200
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
          overflow-hidden
          bg-gradient-to-br
          from-pink-50
          via-white
          to-rose-50
        "
      >

        {flowerInSleeve?.image ? (
          <img
            src={flowerInSleeve.image}
            alt={
              flowerInSleeve?.name ||
              "Flower In Sleeve"
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
              size={40}
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
            font-semibold
            backdrop-blur-sm

            ${
              isAvailable
                ? stock <= 5
                  ? "bg-yellow-50/95 text-yellow-600"
                  : "bg-green-50/95 text-green-600"
                : "bg-red-50/95 text-red-500"
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
            duration-200
            cursor-pointer

            ${
              isWishlisted
                ? "bg-pink-500 text-white"
                : "bg-white/95 text-gray-500 hover:bg-pink-500 hover:text-white"
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
            font-medium
            text-gray-600
          "
        >
          {flowerInSleeve?.category ||
            "Flower Sleeve"}
        </span>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-3.5">

        {/* ================= NAME + PRICE ================= */}

        <div className="flex items-center justify-between gap-2">

          <h3
            className="
              text-sm
              font-bold
              text-gray-800
              truncate
              capitalize
            "
          >
            {flowerInSleeve?.name ||
              "Beautiful Flower Sleeve"}
          </h3>

          <div className="shrink-0 text-right">

            <p className="text-sm font-bold text-pink-600">
              ₹{finalPrice}
            </p>

            {hasDiscount && (
              <p className="text-[9px] text-gray-400 line-through">
                ₹{flowerInSleeve.price}
              </p>
            )}

          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}

        <p
          className="
            mt-1.5
            text-[10px]
            text-gray-500
            leading-relaxed
            line-clamp-2
            min-h-[28px]
          "
        >
          {flowerInSleeve?.description ||
            "Beautiful flowers arranged in an elegant sleeve."}
        </p>

        {/* ================= STOCK INFO ================= */}

        <div className="flex items-center justify-between mt-2.5">

          <span className="text-[10px] text-gray-400">
            Available
          </span>

          <span
            className={`
              text-[10px]
              font-semibold

              ${
                isAvailable
                  ? "text-gray-700"
                  : "text-red-500"
              }
            `}
          >
            {isAvailable
              ? `${stock} sleeves`
              : "Unavailable"}
          </span>

        </div>

        {/* ================= DIVIDER ================= */}

        <div className="border-t border-gray-100 my-2.5" />

        {/* ================= BUTTONS ================= */}

        <div className="flex gap-2">

          {/* ================= VIEW ================= */}

          <button
            type="button"
            onClick={() =>
              navigate(
                `/flower-in-sleeve/${flowerInSleeve?._id}`
              )
            }
            className="
              flex-1
              h-8.5
              rounded-lg
              border
              border-gray-200
              bg-white
              text-gray-600
              text-[10px]
              font-semibold
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
            <Eye size={13} />
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
                flowerInSleeve?._id
              )
            }
            className={`
              flex-1
              h-8.5
              rounded-lg
              text-[10px]
              font-semibold
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
            <ShoppingCart size={13} />

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
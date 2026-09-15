import React, { useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  Gift,
  Eye,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  GetAllWoolenBouquetFromCartThunk,
  AddWoolenBouquetToCartThunk,
} from "../../../Store/AddToCart/WoolenAddToCart/WoolenAddToCartApi";

import {
  WoolenWishlistThunk,
} from "../../../Store/Whislist/WhislistApi";

export const WoolenItem = ({
  woolen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= WISHLIST STATE =================

  const {
    woolenWishlist = [],
  } = useSelector(
    (state) => state.wishlist
  );

  // ================= AUTH STATE =================

  const {
    isAuthorized,
  } = useSelector(
    (state) => state.user
  );

  // ================= CART STATE =================

  const {
    woolenBouquetFromCart = [],
  } = useSelector(
    (state) => state.WoolenBouquetAddToCart
  );

  // ================= FETCH CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        GetAllWoolenBouquetFromCartThunk()
      );
    }
  }, [isAuthorized, dispatch]);

  // ================= CART CHECK =================

  const isInCart =
    Array.isArray(woolenBouquetFromCart) &&
    woolenBouquetFromCart.some(
      (item) =>
        item?.woolenBouquet?._id?.toString() ===
        woolen?._id?.toString()
    );

  // ================= WISHLIST =================

  const isWishlisted =
    Array.isArray(woolenWishlist) &&
    woolenWishlist.some((item) => {
      const id =
        typeof item === "object"
          ? item?._id
          : item;

      return (
        id?.toString() ===
        woolen?._id?.toString()
      );
    });

  // ================= WISHLIST HANDLER =================

  const handleWishlist = () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!woolen?._id) {
      toast.error(
        "Woolen item not found"
      );
      return;
    }

    dispatch(
      WoolenWishlistThunk(
        woolen._id
      )
    );
  };

  // ================= STOCK =================

  const stock =
    woolen?.stock ?? 0;

  const isAvailable =
    woolen?.isAvailable !== false &&
    stock > 0;

  // ================= DISCOUNT =================

  const hasDiscount =
    woolen?.discountPrice > 0 &&
    woolen?.discountPrice <
      woolen?.price;

  const finalPrice = hasDiscount
    ? woolen.discountPrice
    : woolen?.price ?? 0;

  // ================= ADD TO CART =================

  const handleAddToCart = async () => {
    // Login check
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    // ID check
    if (!woolen?._id) {
      toast.error(
        "Woolen item not found"
      );
      return;
    }

    // Stock check
    if (!isAvailable) {
      toast.error(
        "Woolen item is unavailable"
      );
      return;
    }

    // Already cart check
    if (isInCart) {
      toast.error(
        "Woolen item already added to cart"
      );
      return;
    }

    try {
      const result = await dispatch(
        AddWoolenBouquetToCartThunk(
          woolen._id
        )
      );

      if (
        AddWoolenBouquetToCartThunk.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Woolen item added to cart"
        );
      } else {
        toast.error(
          result.payload ||
            "Failed to add woolen item to cart"
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

        {woolen?.image ? (
          <img
            src={woolen.image}
            alt={
              woolen?.name ||
              "Woolen Gift"
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
            <Gift
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
          {woolen?.category ||
            "Woolen"}
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
            {woolen?.name ||
              "Beautiful Woolen Gift"}
          </h3>

          <div className="shrink-0 text-right">

            <p className="text-sm font-bold text-pink-600">
              ₹{finalPrice}
            </p>

            {hasDiscount && (
              <p className="text-[9px] text-gray-400 line-through">
                ₹{woolen.price}
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
          {woolen?.description ||
            "A beautiful woolen gift for your special moments."}
        </p>

        {/* ================= STOCK ================= */}

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
              ? `${stock} pieces`
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
                `/woolen-bouquet/${woolen?._id}`
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
            onClick={handleAddToCart}
            className="
              flex-1
              h-8.5
              rounded-lg
              bg-gray-900
              text-white
              text-[10px]
              font-semibold
              flex
              items-center
              justify-center
              gap-1
              hover:bg-pink-600
              transition
              cursor-pointer
              disabled:bg-gray-100
              disabled:text-gray-400
              disabled:cursor-not-allowed
            "
          >
            <ShoppingCart size={13} />

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
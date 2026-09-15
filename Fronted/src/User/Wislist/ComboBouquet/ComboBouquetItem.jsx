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
  GetAllComboBouquetFromCartThunk,
  AddComboBouquetToCartThunk,
} from "../../../Store/AddToCart/ComboBouquetAddToCart/ComboBouquetAddToCartApi";

import {
  ComboBouquetWishlistThunk,
} from "../../../Store/Whislist/WhislistApi";

export const ComboBouquetItem = ({
  comboBouquet,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= WISHLIST STATE =================

  const {
    comboBouquetWishlist = [],
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
    comboBouquetFromCart = [],
  } = useSelector(
    (state) => state.ComboBouquetAddToCart
  );

  // ================= FETCH CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        GetAllComboBouquetFromCartThunk()
      );
    }
  }, [isAuthorized, dispatch]);

  // ================= CART CHECK =================

  const isInCart =
    Array.isArray(comboBouquetFromCart) &&
    comboBouquetFromCart.some(
      (item) =>
        item?.comboBouquet?._id?.toString() ===
        comboBouquet?._id?.toString()
    );

  // ================= WISHLIST =================

  const isWishlisted =
    Array.isArray(comboBouquetWishlist) &&
    comboBouquetWishlist.some((item) => {
      const id =
        typeof item === "object"
          ? item?._id
          : item;

      return (
        id?.toString() ===
        comboBouquet?._id?.toString()
      );
    });

  // ================= WISHLIST HANDLER =================

  const handleWishlist = () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!comboBouquet?._id) {
      toast.error(
        "Combo Bouquet not found"
      );
      return;
    }

    dispatch(
      ComboBouquetWishlistThunk(
        comboBouquet._id
      )
    );
  };

  // ================= STOCK =================

  const stock =
    comboBouquet?.stock ?? 0;

  const isAvailable =
    comboBouquet?.isAvailable !== false &&
    stock > 0;

  // ================= PRICE =================

  const hasDiscount =
    comboBouquet?.discountPrice > 0 &&
    comboBouquet?.discountPrice <
      comboBouquet?.price;

  const finalPrice = hasDiscount
    ? comboBouquet.discountPrice
    : comboBouquet?.price ?? 0;

  // ================= ADD TO CART =================

  const handleAddToCart = async () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!comboBouquet?._id) {
      toast.error(
        "Combo Bouquet not found"
      );
      return;
    }

    if (!isAvailable) {
      toast.error(
        "Combo Bouquet is unavailable"
      );
      return;
    }

    if (isInCart) {
      toast.error(
        "Combo Bouquet already added to cart"
      );
      return;
    }

    try {
      const result = await dispatch(
        AddComboBouquetToCartThunk(
          comboBouquet._id
        )
      );

      if (
        AddComboBouquetToCartThunk.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Combo Bouquet added to cart"
        );
      } else {
        toast.error(
          result.payload ||
            "Failed to add combo bouquet to cart"
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
        max-w-sm
        overflow-hidden
        rounded-2xl
        bg-white
        border
        border-pink-100
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

        {comboBouquet?.image ? (
          <img
            src={comboBouquet.image}
            alt={
              comboBouquet?.name ||
              "Combo Bouquet"
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
          {comboBouquet?.category ||
            "Combo Bouquet"}
        </span>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-3.5">

        {/* ================= NAME + PRICE ================= */}

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
            {comboBouquet?.name ||
              "Combo Bouquet"}
          </h3>

          <div className="shrink-0 text-right">

            <p className="text-sm font-extrabold text-gray-900">
              ₹{finalPrice}
            </p>

            {hasDiscount && (
              <p className="text-[9px] text-gray-400 line-through">
                ₹{comboBouquet.price}
              </p>
            )}

          </div>

        </div>

        {/* ================= DESCRIPTION ================= */}

        <p
          className="
            mt-1.5
            text-[11px]
            leading-4
            text-gray-500
            line-clamp-1
          "
        >
          {comboBouquet?.description ||
            "A beautiful combination of fresh flowers."}
        </p>

        {/* ================= STOCK ================= */}

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
              ? `${stock} available`
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
                `/combo-bouquet/${comboBouquet?._id}`
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
              h-9
              rounded-lg
              bg-gray-900
              text-white
              text-[10px]
              font-bold
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
            <ShoppingCart size={14} />

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
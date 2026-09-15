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
  WoolenWishlistThunk,
} from "../../../../Store/Whislist/WhislistApi";

import {
  GetAllWoolenBouquetFromCartThunk,
  AddWoolenBouquetToCartThunk,
} from "../../../../Store/AddToCart/WoolenAddToCart/WoolenAddToCartApi";

export const WoolenBouquetItem = ({ woolen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= REDUX =================

  const { woolenWishlist = [] } = useSelector(
    (state) => state.wishlist
  );

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  const {
    woolenBouquetFromCart = [],
  } = useSelector(
    (state) => state.WoolenBouquetAddToCart
  );

  // ================= AVAILABILITY =================

  const stock = woolen?.stock ?? 0;

  const isAvailable =
    woolen?.isAvailable !== false &&
    stock > 0;

  // ================= CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        GetAllWoolenBouquetFromCartThunk()
      );
    }
  }, [isAuthorized, dispatch]);

  const isInCart = woolenBouquetFromCart.some(
    (item) =>
      item?.woolenBouquet?._id?.toString() ===
      woolen?._id?.toString()
  );

  // ================= WISHLIST CHECK =================

  const isWishlisted = woolenWishlist.some(
    (item) => {
      const id =
        typeof item === "object"
          ? item?._id
          : item;

      return (
        id?.toString() ===
        woolen?._id?.toString()
      );
    }
  );

  // ================= WISHLIST =================

  const HandleWishlist = async () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!woolen?._id) {
      toast.error("Woolen bouquet not found");
      return;
    }

    await dispatch(
      WoolenWishlistThunk(woolen._id)
    );
  };

  // ================= ADD TO CART =================

  const HandleAddToCart = async (id) => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!isAvailable) {
      toast.error(
        "Woolen bouquet is unavailable"
      );
      return;
    }

    if (isInCart) {
      toast.error(
        "Woolen bouquet already added to cart"
      );
      return;
    }

    try {
      const result = await dispatch(
        AddWoolenBouquetToCartThunk(id)
      );

      if (
        AddWoolenBouquetToCartThunk.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Woolen bouquet added to cart"
        );
      } else {
        toast.error(
          result.payload ||
            "Failed to add woolen bouquet to cart"
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
        relative
        w-full
        overflow-hidden
        rounded-3xl
        bg-white
        border
        border-gray-100
        shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]
        hover:-translate-y-1
        transition-all
        duration-500
      "
    >

      {/* ================= IMAGE ================= */}

      <div
        className="
          relative
          h-64
          sm:h-60
          lg:h-64
          xl:h-72
          overflow-hidden
          bg-gradient-to-br
          from-purple-50
          via-pink-50
          to-white
        "
      >

        {/* Decorative Circle */}

        <div
          className="
            absolute
            -top-12
            -right-12
            w-36
            h-36
            rounded-full
            bg-white/50
          "
        />

        {/* ================= IMAGE ================= */}

        {woolen?.image ? (
          <img
            src={woolen.image}
            alt={
              woolen?.name ||
              "Woolen Bouquet"
            }
            className="
              relative
              z-10
              w-full
              h-full
              object-contain
              p-5
              transition-transform
              duration-700
              ease-out
              group-hover:scale-110
            "
          />
        ) : (
          <div
            className="
              w-full
              h-full
              flex
              flex-col
              items-center
              justify-center
              text-gray-300
            "
          >
            <Flower2
              size={58}
              strokeWidth={1.2}
            />

            <span className="text-xs mt-2">
              No image available
            </span>
          </div>
        )}

        {/* Bottom Gradient */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-24
            bg-gradient-to-t
            from-black/10
            to-transparent
            pointer-events-none
          "
        />

        {/* ================= AVAILABILITY ================= */}

        <div
          className={`
            absolute
            top-4
            left-4
            z-20
            px-3
            py-1.5
            rounded-full
            text-[11px]
            font-bold
            backdrop-blur-md

            ${
              isAvailable
                ? stock <= 5
                  ? "bg-yellow-50/90 text-yellow-600"
                  : "bg-green-50/90 text-green-600"
                : "bg-red-50/90 text-red-500"
            }
          `}
        >
          {isAvailable
            ? stock <= 5
              ? "Only few left"
              : "In Stock"
            : "Unavailable"}
        </div>

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
            right-4
            top-4
            z-20
            w-10
            h-10
            rounded-full
            bg-white/90
            backdrop-blur-md
            border
            border-white
            shadow-md
            flex
            items-center
            justify-center
            hover:scale-110
            active:scale-90
            cursor-pointer
            transition-all
            duration-300

            ${
              isWishlisted
                ? "text-pink-500"
                : "text-gray-500 hover:text-pink-500"
            }
          `}
        >
          <Heart
            size={18}
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {/* ================= CATEGORY ================= */}

        <div
          className="
            absolute
            left-4
            bottom-4
            z-20
            flex
            items-center
            gap-1.5
            px-3
            py-1.5
            rounded-full
            bg-white/90
            backdrop-blur-md
            border
            border-white
            shadow-sm
            text-xs
            font-semibold
            text-gray-700
          "
        >
          <Flower2
            size={13}
            className="text-purple-500"
          />

          {woolen?.category ||
            "Woolen Bouquet"}
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-5">

        {/* ================= NAME + PRICE ================= */}

        <div className="flex items-start justify-between gap-3">

          <h3
            className="
              text-lg
              sm:text-xl
              font-bold
              text-gray-900
              capitalize
              truncate
            "
          >
            {woolen?.name ||
              "Beautiful Woolen Bouquet"}
          </h3>

          <div className="flex items-baseline shrink-0">

            <span
              className="
                text-sm
                font-semibold
                text-gray-500
                mr-0.5
              "
            >
              ₹
            </span>

            <span
              className="
                text-xl
                font-extrabold
                text-gray-900
              "
            >
              {woolen?.price ?? 0}
            </span>

          </div>
        </div>

        {/* ================= OCCASION ================= */}

        <div className="flex items-center gap-2 mt-2">

          <span className="text-xs text-gray-400">
            Occasion
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
            {woolen?.occasion ||
              "Special Occasion"}
          </span>

        </div>

        {/* ================= DESCRIPTION ================= */}

        <p
          className="
            mt-3
            text-sm
            text-gray-500
            leading-relaxed
            line-clamp-2
            min-h-[40px]
          "
        >
          {woolen?.description ||
            "A beautiful handmade woolen bouquet, specially crafted to make your special moments memorable."}
        </p>

        {/* ================= DIVIDER ================= */}

        <div className="border-t border-gray-100 my-4" />

        {/* ================= STOCK ================= */}

        <div className="flex items-center justify-between">

          <div>

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.15em]
                font-bold
                text-gray-400
              "
            >
              Available
            </p>

            <p
              className={`
                mt-1
                text-sm
                font-bold
                ${
                  isAvailable
                    ? "text-gray-800"
                    : "text-red-500"
                }
              `}
            >
              {isAvailable
                ? `${stock} pieces`
                : "Unavailable"}
            </p>

          </div>

          {/* WOOLEN BADGE */}

          <span
            className="
              px-3
              py-1.5
              rounded-full
              bg-purple-50
              text-purple-600
              text-xs
              font-semibold
            "
          >
            Woolen
          </span>

        </div>

        {/* ================= ACTION BUTTONS ================= */}

        <div className="flex gap-2 mt-5">

          {/* VIEW DETAILS */}

          <button
            type="button"
            onClick={() => {
              navigate(
                `/woolen-bouquet/${woolen?._id}`
              );
            }}
            className="
              flex-1
              h-11
              rounded-xl
              border
              border-gray-200
              bg-white
              text-gray-700
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-purple-50
              hover:border-purple-200
              hover:text-purple-600
              active:scale-[0.98]
              cursor-pointer
              transition-all
              duration-300
            "
          >
            <Eye size={16} />

            View Details
          </button>

          {/* ADD TO CART */}

          <button
            type="button"
            disabled={!isAvailable || isInCart}
            onClick={() =>
              HandleAddToCart(
                woolen?._id
              )
            }
            className="
              flex-1
              h-11
              rounded-xl
              bg-gray-900
              text-white
              text-sm
              font-bold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-purple-600
              hover:shadow-lg
              hover:shadow-purple-200
              active:scale-[0.98]
              cursor-pointer
              disabled:bg-gray-100
              disabled:text-gray-400
              disabled:shadow-none
              disabled:cursor-not-allowed
              transition-all
              duration-300
            "
          >
            <ShoppingCart size={16} />

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
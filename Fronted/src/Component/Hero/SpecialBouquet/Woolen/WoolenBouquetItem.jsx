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
        min-w-0
        overflow-hidden
        rounded-2xl
        sm:rounded-3xl
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
          h-48
          min-[380px]:h-52
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
            -top-9
            -right-9
            sm:-top-12
            sm:-right-12
            w-28
            h-28
            sm:w-36
            sm:h-36
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
              p-3
              min-[380px]:p-4
              sm:p-5
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
              px-3
            "
          >
            <Flower2
              size={46}
              className="sm:hidden"
              strokeWidth={1.2}
            />

            <Flower2
              size={58}
              className="hidden sm:block"
              strokeWidth={1.2}
            />

            <span
              className="
                text-[10px]
                sm:text-xs
                mt-2
                text-center
              "
            >
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
            h-16
            sm:h-24
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
            top-2.5
            left-2.5
            sm:top-4
            sm:left-4
            z-20
            px-2
            min-[380px]:px-3
            py-1
            sm:py-1.5
            rounded-full
            text-[9px]
            min-[380px]:text-[10px]
            sm:text-[11px]
            font-bold
            backdrop-blur-md
            max-w-[45%]
            truncate

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
            right-2.5
            top-2.5
            sm:right-4
            sm:top-4
            z-20
            w-8
            h-8
            min-[380px]:w-9
            min-[380px]:h-9
            sm:w-10
            sm:h-10
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
            size={15}
            className="sm:hidden"
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />

          <Heart
            size={18}
            className="hidden sm:block"
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
            left-2.5
            bottom-2.5
            sm:left-4
            sm:bottom-4
            z-20
            flex
            items-center
            gap-1
            sm:gap-1.5
            max-w-[75%]
            px-2
            min-[380px]:px-3
            py-1
            sm:py-1.5
            rounded-full
            bg-white/90
            backdrop-blur-md
            border
            border-white
            shadow-sm
            text-[10px]
            sm:text-xs
            font-semibold
            text-gray-700
          "
        >
          <Flower2
            size={11}
            className="text-purple-500 shrink-0 sm:hidden"
          />

          <Flower2
            size={13}
            className="text-purple-500 shrink-0 hidden sm:block"
          />

          <span className="truncate">
            {woolen?.category ||
              "Woolen Bouquet"}
          </span>
        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div
        className="
          p-3
          min-[380px]:p-4
          sm:p-5
          min-w-0
        "
      >

        {/* ================= NAME + PRICE ================= */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-2
            sm:gap-3
            min-w-0
          "
        >

          <h3
            className="
              min-w-0
              flex-1
              text-base
              min-[380px]:text-lg
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

          <div
            className="
              flex
              items-baseline
              shrink-0
            "
          >

            <span
              className="
                text-xs
                sm:text-sm
                font-semibold
                text-gray-500
                mr-0.5
              "
            >
              ₹
            </span>

            <span
              className="
                text-lg
                min-[380px]:text-xl
                font-extrabold
                text-gray-900
              "
            >
              {woolen?.price ?? 0}
            </span>

          </div>

        </div>

        {/* ================= OCCASION ================= */}

        <div
          className="
            flex
            items-center
            gap-1.5
            sm:gap-2
            mt-2
            min-w-0
          "
        >

          <span className="text-[10px] sm:text-xs text-gray-400 shrink-0">
            Occasion
          </span>

          <span className="text-gray-200 shrink-0">
            •
          </span>

          <span
            className="
              text-[10px]
              min-[380px]:text-xs
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
            mt-2
            sm:mt-3
            text-xs
            min-[380px]:text-sm
            text-gray-500
            leading-relaxed
            line-clamp-2
            min-h-[36px]
            min-[380px]:min-h-[40px]
          "
        >
          {woolen?.description ||
            "A beautiful handmade woolen bouquet, specially crafted to make your special moments memorable."}
        </p>

        {/* ================= DIVIDER ================= */}

        <div className="border-t border-gray-100 my-3 sm:my-4" />

        {/* ================= STOCK ================= */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
            min-w-0
          "
        >

          <div className="min-w-0">

            <p
              className="
                text-[9px]
                sm:text-[10px]
                uppercase
                tracking-[0.12em]
                sm:tracking-[0.15em]
                font-bold
                text-gray-400
              "
            >
              Available
            </p>

            <p
              className={`
                mt-0.5
                sm:mt-1
                text-xs
                min-[380px]:text-sm
                font-bold
                truncate
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
              shrink-0
              px-2
              min-[380px]:px-3
              py-1
              min-[380px]:py-1.5
              rounded-full
              bg-purple-50
              text-purple-600
              text-[10px]
              min-[380px]:text-xs
              font-semibold
            "
          >
            Woolen
          </span>

        </div>

        {/* ================= ACTION BUTTONS ================= */}
{/* ================= ACTION BUTTONS ================= */}

<div
  className="
    grid
    grid-cols-1
    min-[420px]:grid-cols-2
    gap-2.5
    sm:gap-3
    mt-5
    sm:mt-6
  "
>
  {/* ================= VIEW DETAILS ================= */}

  <button
    type="button"
    onClick={() =>
      navigate(
        `/woolen-bouquet/${woolen?._id}`
      )
    }
    className="
      w-full
      h-11
      sm:h-12
      px-3
      sm:px-4

      rounded-xl

      bg-white
      border
      border-gray-900

      text-gray-900

      text-xs
      sm:text-sm

      font-semibold

      flex
      items-center
      justify-center
      gap-2

      whitespace-nowrap

      hover:bg-gray-900
      hover:text-white

      hover:shadow-md
      hover:shadow-gray-200

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
    disabled={!isAvailable || isInCart}
    onClick={() =>
      HandleAddToCart(woolen?._id)
    }
    className="
      w-full
      h-11
      sm:h-12
      px-3
      sm:px-4

      rounded-xl

      bg-gray-900
      text-white

      border
      border-gray-900

      text-xs
      sm:text-sm

      font-bold

      flex
      items-center
      justify-center
      gap-2

      whitespace-nowrap

      hover:bg-black
      hover:border-black

      hover:shadow-md
      hover:shadow-gray-300

      active:scale-[0.97]

      cursor-pointer

      disabled:bg-gray-100
      disabled:text-gray-400
      disabled:border-gray-200
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
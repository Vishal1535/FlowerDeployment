
import React, { useEffect } from "react";
import {
  Heart,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  GetAllBouquetFromCartThunk,
  AddBouquetToCartThunk,
} from "../../../Store/AddToCart/BouquetAddToCart/BouquetAddToCartApi";

import { BouquetWishlistThunk } from "../../../Store/Whislist/WhislistApi";

export const BouquetCard = ({ bouquet }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bouquetWishlist = [] } = useSelector(
    (state) => state.wishlist
  );

  const { bouquetFromCart = [] } = useSelector(
    (state) => state.BouquetAddToCart
  );

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  const isAvailable = bouquet?.isAvailable;

  // ================= CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllBouquetFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // Check whether bouquet is already in cart

  const isInCart = bouquetFromCart.some(
    (item) =>
      item?.bouquet?._id?.toString() ===
      bouquet?._id?.toString()
  );

  // ================= WISHLIST =================

  const HandleWishlist = () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    dispatch(BouquetWishlistThunk(bouquet?._id));
  };

  // Check whether bouquet is already in wishlist

  const isWishlisted = bouquetWishlist?.some(
    (item) =>
      (item?._id || item)?.toString() ===
      bouquet?._id?.toString()
  );

  // ================= ADD TO CART =================

  const HandleAddToCart = async (id) => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    try {
      const result = await dispatch(
        AddBouquetToCartThunk(id)
      );

      if (AddBouquetToCartThunk.fulfilled.match(result)) {
        toast.success("Bouquet added to cart");
      } else {
        toast.error(
          result.payload ||
            "Failed to add bouquet to cart"
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
          from-pink-50
          via-rose-50
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

        {/* Bouquet Image */}

        {bouquet?.image ? (
          <img
            src={bouquet.image}
            alt={bouquet?.name || "Bouquet"}
            draggable="false"
            className="
              relative
              z-10
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              w-full
              h-full
              flex
              items-center
              justify-center
              text-5xl
            "
          >
            💐
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
            from-black/15
            to-transparent
            pointer-events-none
          "
        />

        {/* ================= OCCASION ================= */}

        <div
          className="
            absolute
            top-4
            left-4
            z-20
            px-3
            py-1.5
            rounded-full
            bg-white/90
            backdrop-blur-md
            border
            border-white
            shadow-sm
            text-[11px]
            font-bold
            text-pink-600
          "
        >
          {bouquet?.occasion || "Special"}
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
            hover:bg-white
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
            strokeWidth={
              isWishlisted ? 2.5 : 2
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
          <span className="text-pink-500">
            🌸
          </span>

          {bouquet?.category || "Flower Bouquet"}
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-5">

        {/* NAME */}

        <div className="flex items-center justify-between gap-3">

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
            {bouquet?.name || "Beautiful Bouquet"}
          </h3>

        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-2
            text-xs
            sm:text-sm
            text-gray-500
            leading-5
            line-clamp-2
            min-h-[40px]
          "
        >
          {bouquet?.description ||
            "A beautiful bouquet made with fresh flowers."}
        </p>

        {/* DETAILS */}

        <div className="flex items-center gap-3 mt-3">

          {bouquet?.size && (
            <div className="flex items-center gap-1.5">

              <span className="text-xs text-gray-400">
                Size
              </span>

              <span className="text-xs font-semibold text-gray-700">
                {bouquet.size}
              </span>

            </div>
          )}

          {bouquet?.size &&
            bouquet?.flowerCount && (
              <span className="text-gray-200">
                •
              </span>
            )}

          {bouquet?.flowerCount && (
            <div className="flex items-center gap-1.5">

              <span className="text-xs text-gray-400">
                Flowers
              </span>

              <span className="text-xs font-semibold text-gray-700">
                {bouquet.flowerCount}
              </span>

            </div>
          )}

        </div>

        {/* DIVIDER */}

        <div className="border-t border-gray-100 my-4" />

        {/* PRICE + AVAILABILITY */}

        <div className="flex items-end justify-between">

          {/* PRICE */}

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
              Price
            </p>

            <div className="flex items-baseline mt-1">

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
                  text-2xl
                  font-extrabold
                  text-gray-900
                "
              >
                {bouquet?.price ?? 0}
              </span>

            </div>

          </div>

          {/* AVAILABILITY */}

          <div className="text-right">

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.15em]
                font-bold
                text-gray-400
              "
            >
              Availability
            </p>

            <p
              className={`
                mt-1
                text-sm
                font-bold
                ${
                  isAvailable
                    ? "text-green-600"
                    : "text-red-500"
                }
              `}
            >
              {isAvailable
                ? "Available"
                : "Unavailable"}
            </p>

          </div>

        </div>

        {/* ================= ACTION BUTTONS ================= */}

        <div className="flex gap-2 mt-5">

          {/* VIEW DETAILS */}

          <button
            type="button"
            onClick={() =>
              navigate(`/bouquet/${bouquet._id}`)
            }
            className="
              flex-1
              h-11
              rounded-xl
              border
              border-pink-200
              bg-pink-50
              text-pink-600
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-pink-500
              hover:border-pink-500
              hover:text-white
              active:scale-[0.98]
              cursor-pointer
              transition-all
              duration-300
            "
          >
            <ArrowRight size={16} />

            View Details
          </button>

          {/* ADD TO CART */}

          <button
            type="button"
            disabled={!isAvailable || isInCart}
            onClick={() =>
              HandleAddToCart(bouquet?._id)
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
              hover:bg-pink-600
              hover:shadow-lg
              hover:shadow-pink-200
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
            <ShoppingBag size={16} />

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


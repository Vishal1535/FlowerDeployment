
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
  GetAllBouquetFromCartThunk,
  AddBouquetToCartThunk,
} from "../../../Store/AddToCart/BouquetAddToCart/BouquetAddToCartApi";

import { BouquetWishlistThunk } from "../../../Store/Whislist/WhislistApi";

export const BouquetItem = ({ bouquet }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bouquetWishlist = [] } = useSelector(
    (state) => state.wishlist
  );

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  const { bouquetFromCart = [] } = useSelector(
    (state) => state.BouquetAddToCart
  );

  // ================= FETCH CART =================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllBouquetFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ================= CART CHECK =================

  const isInCart = bouquetFromCart.some(
    (item) =>
      item?.bouquet?._id?.toString() ===
      bouquet?._id?.toString()
  );

  // ================= WISHLIST =================

  const isWishlisted = bouquetWishlist.some((item) => {
    const id =
      typeof item === "object"
        ? item?._id
        : item;

    return (
      id?.toString() ===
      bouquet?._id?.toString()
    );
  });

  const handleWishlist = () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!bouquet?._id) {
      toast.error("Bouquet not found");
      return;
    }

    dispatch(
      BouquetWishlistThunk(bouquet._id)
    );
  };

  // ================= ADD TO CART =================

  const handleAddToCart = async () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!bouquet?._id) {
      toast.error("Bouquet not found");
      return;
    }

    if (!isAvailable) {
      toast.error("Bouquet is unavailable");
      return;
    }

    if (isInCart) {
      toast.error("Bouquet already added to cart");
      return;
    }

    const result = await dispatch(
      AddBouquetToCartThunk(bouquet._id)
    );

    if (
      AddBouquetToCartThunk.fulfilled.match(result)
    ) {
      toast.success("Bouquet added to cart");
    } else {
      toast.error(
        result.payload ||
          "Failed to add bouquet to cart"
      );
    }
  };

  // ================= STOCK =================

  const stock = bouquet?.stock ?? 0;

  const isAvailable =
    bouquet?.isAvailable !== false &&
    stock > 0;

  // ================= PRICE =================

  const hasDiscount =
    bouquet?.discountPrice > 0 &&
    bouquet.discountPrice < bouquet.price;

  const finalPrice = hasDiscount
    ? bouquet.discountPrice
    : bouquet?.price ?? 0;

  return (
    <div
      className="
        group
        w-full
        max-w-sm
        mx-auto
        overflow-hidden
        rounded-2xl
        bg-white
        border
        border-gray-100
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
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
        {bouquet?.image ? (
          <img
            src={bouquet.image}
            alt={bouquet?.name || "Bouquet"}
            className="
              w-full
              h-full
              object-contain
              p-3
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <Flower2
              size={42}
              className="text-pink-200"
              strokeWidth={1.2}
            />
          </div>
        )}

        {/* STOCK */}

        <span
          className={`
            absolute
            top-3
            left-3
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

        {/* WISHLIST */}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Wishlist"
          className={`
            absolute
            top-3
            right-3
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
                : "bg-white text-gray-500 hover:text-pink-500"
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

        {/* CATEGORY */}

        <span
          className="
            absolute
            bottom-3
            left-3
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
          {bouquet?.category || "Bouquet"}
        </span>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-3.5">

        {/* NAME + PRICE */}

        <div className="flex items-center justify-between gap-2">

          <h3
            className="
              text-sm
              font-bold
              text-gray-900
              capitalize
              truncate
            "
          >
            {bouquet?.name || "Beautiful Bouquet"}
          </h3>

          <div className="text-right shrink-0">
            <p className="text-sm font-extrabold text-gray-900">
              ₹{finalPrice}
            </p>

            {hasDiscount && (
              <p className="text-[9px] text-gray-400 line-through">
                ₹{bouquet.price}
              </p>
            )}
          </div>

        </div>

        {/* SHORT DESCRIPTION */}

        <p
          className="
            mt-1.5
            text-[11px]
            text-gray-400
            line-clamp-1
          "
        >
          {bouquet?.description ||
            "Beautiful flowers for special moments."}
        </p>

        {/* AVAILABLE */}

        <div className="flex items-center justify-between mt-2.5">
          <span className="text-[10px] text-gray-400">
            Availability
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
              ? `${stock} available`
              : "Unavailable"}
          </span>
        </div>

        {/* BUTTONS */}

        <div className="flex gap-2 mt-3">

          {/* VIEW */}

          <button
            type="button"
            onClick={() =>
              navigate(`/bouquet/${bouquet?._id}`)
            }
            className="
              flex-1
              h-9
              rounded-lg
              border
              border-gray-200
              bg-white
              text-gray-600
              text-[11px]
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
            <Eye size={14} />
            View
          </button>

          {/* CART */}

          <button
            type="button"
            disabled={!isAvailable || isInCart}
            onClick={handleAddToCart}
            className="
              flex-1
              h-9
              rounded-lg
              bg-gray-900
              text-white
              text-[11px]
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


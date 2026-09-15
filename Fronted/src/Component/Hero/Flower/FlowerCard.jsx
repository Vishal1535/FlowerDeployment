import React, { useEffect } from "react";
import { Heart, ShoppingCart, Flower2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FlowerWishlistThunk } from "../../../Store/Whislist/WhislistApi";
import toast from "react-hot-toast";
import {
  AddFlowerToCartThunk,
  GetAllFlowerFromCartThunk,
} from "../../../Store/AddToCart/FlowerAddToCart/FlowerAddToCartApi";

export const FlowerCard = ({ flower }) => {
  const stock = flower?.stock ?? 0;
  const isAvailable = stock > 0;
  const { flowerWishlist } = useSelector((state) => state.wishlist);
  const { isAuthorized } = useSelector((state) => state.user);
  const { flowerFromCart = [] } = useSelector((state) => state.FlowerAddToCart);

  const isInCart = flowerFromCart.some(
    (item) => item?.flower?._id?.toString() === flower?._id?.toString(),
  );

  const isWishlisted = flowerWishlist?.some(
    (flowerId) => flowerId?._id === flower?._id || flowerId === flower?._id,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleWishList = () => {
    if (!isAuthorized) {
      toast.error("please Login First");
      return;
    }
    dispatch(FlowerWishlistThunk(flower?._id));
  };

  // Component ke andar, HandleAddToCart ke bahar

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllFlowerFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // Add To Cart Handler

  const HandleAddToCart = async (id) => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    try {
      const result = await dispatch(AddFlowerToCartThunk(id));

      if (AddFlowerToCartThunk.fulfilled.match(result)) {
        toast.success("Flower added to cart");
      } else {
        toast.error(result.payload || "Failed to add flower to cart");
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
        cursor-default
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
          from-rose-50
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

        {/* Flower Image */}

        {flower?.image ? (
          <img
            src={flower.image}
            alt={flower?.name || "Flower"}
            className="
              relative
              z-10
              w-full
              h-full
              object-contain
              p-6
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
            <Flower2 size={58} strokeWidth={1.2} />

            <span className="text-xs mt-2">No image available</span>
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

        {/* ================= STOCK BADGE ================= */}

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
                ? "bg-green-50/90 text-green-600"
                : "bg-red-50/90 text-red-500"
            }
          `}
        >
          {isAvailable
            ? stock <= 5
              ? "Only few left"
              : "In Stock"
            : "Out of Stock"}
        </div>

        {/* ================= WISHLIST ================= */}

        <button
          type="button"
          onClick={HandleWishList}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`
    absolute
    right-4
    top-4
    z-20
    w-10
    h-10
    rounded-full
    backdrop-blur-md
    border
    shadow-md
    flex
    items-center
    justify-center
    hover:scale-110
    cursor-pointer
    transition-all
    duration-300

    ${
      isWishlisted
        ? "bg-pink-500 text-white border-pink-500"
        : "bg-white/90 border-white text-gray-500 hover:text-pink-500"
    }
  `}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
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
          <Flower2 size={13} className="text-pink-500" />

          {flower?.category || "Flower"}
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-5">
        {/* ================= NAME ================= */}

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
            {flower?.name || "Beautiful Flower"}
          </h3>
        </div>

        {/* ================= SMALL INFO ================= */}

        <div className="flex items-center gap-3 mt-2">
          {/* Color */}

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">Color</span>

            <span className="text-xs font-semibold text-gray-700">
              {flower?.color || "—"}
            </span>
          </div>

          <span className="text-gray-200">•</span>

          {/* Category */}

          <span className="text-xs text-gray-500 truncate">
            {flower?.category || "Flower"}
          </span>
        </div>

        {/* ================= DIVIDER ================= */}

        <div className="border-t border-gray-100 my-4" />

        {/* ================= PRICE + STOCK ================= */}

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
                {flower?.price ?? 0}
              </span>
            </div>
          </div>

          {/* STOCK */}

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
              Available
            </p>

            <p
              className={`
                mt-1
                text-sm
                font-bold
                ${isAvailable ? "text-gray-800" : "text-red-500"}
              `}
            >
              {isAvailable ? `${stock} pieces` : "Unavailable"}
            </p>
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}

        <div className="flex gap-2 mt-5">
          {/* ================= VIEW DETAILS ================= */}

          <button
            type="button"
            onClick={() => {
              navigate(`flower/${flower._id}`);
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
              hover:bg-pink-50
              hover:border-pink-200
              hover:text-pink-600
              active:scale-[0.98]
              cursor-pointer
              transition-all
              duration-300
            "
          >
            <Eye size={16} />
            View Details
          </button>

          {/* ================= ADD TO CART ================= */}

          <button
            type="button"
            disabled={!isAvailable || isInCart}
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
            onClick={() => {
              HandleAddToCart(flower?._id);
            }}
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

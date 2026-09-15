
import React, { useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Flower2,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Auth } from "../../Auth/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Occasion } from "../../Occasion/Occasion";
import toast from "react-hot-toast";

import { setSingleProduct } from "../../../Store/BuySingleProduct/ButSingleProductSlice";

import {
  FlowerWishlistThunk,
} from "../../../Store/Whislist/WhislistApi";

import {
  GetSingleFlowerThunk,
} from "../../../Store/flowerSlice/FlowerApi";

import {
  GetAllFlowerFromCartThunk,
  AddFlowerToCartThunk,
} from "../../../Store/AddToCart/FlowerAddToCart/FlowerAddToCartApi";

export const SingleFlower = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================
  // WISHLIST STATE
  // ============================

  const {
    flowerWishlist = [],
  } = useSelector(
    (state) => state.wishlist
  );

  // ============================
  // AUTH STATE
  // ============================

  const {
    isAuthorized,
  } = useSelector(
    (state) => state.user
  );

  // ============================
  // FLOWER STATE
  // ============================

  const {
    singleFlower,
    loading,
  } = useSelector(
    (state) => state.flower
  );

  // ============================
  // CART STATE
  // ============================

  const {
    flowerFromCart = [],
  } = useSelector(
    (state) => state.FlowerAddToCart
  );

  // ============================
  // GET FLOWER CART
  // ============================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        GetAllFlowerFromCartThunk()
      );
    }
  }, [isAuthorized, dispatch]);

  // ============================
  // CHECK FLOWER IN CART
  // ============================

  const isInCart =
    Array.isArray(flowerFromCart) &&
    flowerFromCart.some(
      (item) =>
        String(item?.flower?._id) ===
        String(id)
    );

  // ============================
  // ADD TO CART
  // ============================

  const handleAddToCart = async () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!id) {
      return;
    }

    if (isInCart) {
      toast.error("Flower already added to cart");
      return;
    }

    try {
      const result = await dispatch(
        AddFlowerToCartThunk(id)
      );

      if (
        AddFlowerToCartThunk.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Flower added to cart"
        );

        dispatch(
          GetAllFlowerFromCartThunk()
        );
      } else {
        toast.error(
          result.payload ||
            "Failed to add flower to cart"
        );
      }
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    }
  };

  // ============================
  // BUY NOW
  // ============================

  const handleBuyNow = () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!singleFlower?._id) {
      toast.error("Flower details not found");
      return;
    }

    if (!isAvailable) {
      toast.error("Flower is currently unavailable");
      return;
    }

    // Single product data Redux state mein store
    dispatch(
      setSingleProduct({
        product: singleFlower._id,
        productType: "flower",
        name: singleFlower?.name,
        image: singleFlower?.image,
        price: singleFlower?.price || 0,
        discountPrice:
          singleFlower?.discountPrice || 0,
        stock: singleFlower?.stock || 0,
        quantity: 1,
      })
    );

    // Buy Now page
    navigate("/buy-single-product");
  };

  // ============================
  // GET SINGLE FLOWER
  // ============================

  useEffect(() => {
    if (id) {
      dispatch(
        GetSingleFlowerThunk(id)
      );
    }
  }, [dispatch, id]);

  // ============================
  // CHECK WISHLIST
  // ============================

  const isWishlisted =
    Array.isArray(flowerWishlist) &&
    flowerWishlist.some((item) => {
      const itemId =
        typeof item === "object"
          ? (
              item?._id ||
              item?.flowerId ||
              item?.productId
            )
          : item;

      return (
        String(itemId) === String(id)
      );
    });

  // ============================
  // WISHLIST HANDLER
  // ============================

  const handleWishlist = async () => {
    if (!isAuthorized) {
      navigate("/login");
      return;
    }

    if (!id) {
      return;
    }

    try {
      await dispatch(
        FlowerWishlistThunk(id)
      );
    } catch (error) {
      console.error(
        "Flower wishlist error:",
        error
      );
    }
  };

  // ============================
  // LOADING
  // ============================

  if (
    loading ||
    !singleFlower
  ) {
    return (
      <>
        <Auth />

        <div className="min-h-[75vh] flex items-center justify-center">
          <div className="text-center">

            <div
              className="
                w-14
                h-14
                mx-auto
                rounded-full
                bg-pink-50
                flex
                items-center
                justify-center
                animate-pulse
              "
            >
              <Flower2
                size={26}
                className="text-pink-400"
              />
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Loading flower details...
            </p>

          </div>
        </div>
      </>
    );
  }

  // ============================
  // STOCK
  // ============================

  const stock =
    singleFlower?.stock ?? 0;

  const isAvailable =
    stock > 0 &&
    singleFlower?.isAvailable !== false;

  return (
    <>
      <Auth />

      <main className="min-h-screen bg-white">

        {/* ============================
            BACK
        ============================ */}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              hover:text-pink-600
              transition-colors
              cursor-pointer
            "
          >
            <ArrowLeft size={17} />

            Back to Flowers
          </button>

        </div>

        {/* ============================
            PRODUCT SECTION
        ============================ */}

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[0.9fr_1.1fr]
              gap-7
              lg:gap-10
              items-start
            "
          >

            {/* ============================
                LEFT - IMAGE
            ============================ */}

            <div
              className="
                relative
                w-full
                h-[300px]
                sm:h-[340px]
                lg:h-[390px]
                rounded-3xl
                overflow-hidden
                bg-gradient-to-br
                from-pink-50
                via-rose-50
                to-white
                border
                border-pink-100
                flex
                items-center
                justify-center
              "
            >

              {/* Decorative Circle */}

              <div
                className="
                  absolute
                  -top-16
                  -right-16
                  w-44
                  h-44
                  rounded-full
                  bg-white/70
                "
              />

              <div
                className="
                  absolute
                  -bottom-20
                  -left-20
                  w-52
                  h-52
                  rounded-full
                  bg-pink-100/40
                "
              />

              {/* ================= STOCK ================= */}

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

                  ${
                    isAvailable
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
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
                onClick={handleWishlist}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className={`
                  absolute
                  top-4
                  right-4
                  z-20
                  w-10
                  h-10
                  rounded-full
                  border
                  shadow-sm
                  flex
                  items-center
                  justify-center
                  hover:scale-105
                  transition-all
                  cursor-pointer

                  ${
                    isWishlisted
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-white text-gray-500 border-gray-100 hover:text-pink-500 hover:border-pink-200"
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

              {/* ================= IMAGE ================= */}

              {singleFlower?.image ? (
                <img
                  src={singleFlower.image}
                  alt={
                    singleFlower?.name ||
                    "Flower"
                  }
                  className="
                    relative
                    z-10
                    max-w-[88%]
                    max-h-[82%]
                    object-contain
                    transition-transform
                    duration-500
                    hover:scale-105
                  "
                />
              ) : (
                <div className="text-center text-gray-300">

                  <Flower2
                    size={65}
                    strokeWidth={1}
                  />

                  <p className="text-sm mt-2">
                    No image available
                  </p>

                </div>
              )}

            </div>

            {/* ============================
                RIGHT - PRODUCT DETAILS
            ============================ */}

            <div className="pt-1">

              {/* CATEGORY */}

              <div className="flex items-center gap-2 mb-2">

                <Flower2
                  size={15}
                  className="text-pink-500"
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-pink-500
                  "
                >
                  {singleFlower?.category ||
                    "Flower"}
                </span>

              </div>

              {/* NAME */}

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-gray-900
                  capitalize
                  tracking-tight
                "
              >
                {singleFlower?.name ||
                  "Beautiful Flower"}
              </h1>

              {/* COLOR */}

              <div className="flex items-center gap-2 mt-2">

                <span className="text-xs text-gray-400">
                  Color
                </span>

                <span className="w-1 h-1 rounded-full bg-gray-300" />

                <span className="text-xs font-semibold text-gray-700">
                  {singleFlower?.color || "—"}
                </span>

              </div>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-4
                  text-sm
                  leading-6
                  text-gray-500
                  max-w-xl
                "
              >
                {singleFlower?.description ||
                  "Fresh and beautiful flowers, carefully selected to make your special moments even more memorable."}
              </p>

              {/* PRICE */}

              <div className="mt-4">

                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-wider
                    font-bold
                    text-gray-400
                  "
                >
                  Price
                </p>

                <div className="flex items-baseline gap-2 mt-0.5">

                  <span
                    className="
                      text-2xl
                      font-extrabold
                      text-gray-900
                    "
                  >
                    ₹
                    {singleFlower?.discountPrice > 0 &&
                    singleFlower?.discountPrice <
                      singleFlower?.price
                      ? singleFlower?.discountPrice
                      : singleFlower?.price ?? 0}
                  </span>

                  {singleFlower?.discountPrice > 0 &&
                    singleFlower?.discountPrice <
                      singleFlower?.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{singleFlower?.price}
                      </span>
                    )}

                </div>

              </div>

              {/* STOCK */}

              <div className="flex items-center gap-2 mt-3">

                <CheckCircle2
                  size={16}
                  className={
                    isAvailable
                      ? "text-green-500"
                      : "text-red-500"
                  }
                />

                <span
                  className={`
                    text-sm
                    font-semibold

                    ${
                      isAvailable
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  `}
                >
                  {isAvailable
                    ? `${stock} pieces available`
                    : "Currently unavailable"}
                </span>

              </div>

              {/* ================= BUTTONS ================= */}

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 mt-4">

                {/* ADD TO CART */}

                <button
                  type="button"
                  disabled={!isAvailable || isInCart}
                  onClick={handleAddToCart}
                  className={`
                    h-11
                    rounded-xl
                    text-white
                    text-sm
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-2
                    active:scale-[0.98]
                    transition-all
                    cursor-pointer

                    ${
                      isInCart
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-gray-900 hover:bg-pink-600"
                    }

                    disabled:bg-gray-100
                    disabled:text-gray-400
                    disabled:cursor-not-allowed
                  `}
                >
                  <ShoppingCart size={17} />

                  {!isAvailable
                    ? "Unavailable"
                    : isInCart
                    ? "Added to Cart"
                    : "Add to Cart"}
                </button>

                {/* BUY NOW */}

                <button
                  type="button"
                  disabled={!isAvailable}
                  onClick={handleBuyNow}
                  className="
                    h-11
                    rounded-xl
                    bg-pink-500
                    hover:bg-pink-600
                    disabled:bg-gray-100
                    disabled:text-gray-400
                    text-white
                    text-sm
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-2
                    active:scale-[0.98]
                    transition-all
                    cursor-pointer
                    disabled:cursor-not-allowed
                  "
                >
                  <Zap size={17} />

                  Buy Now
                </button>

                {/* WISHLIST */}

                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-label={
                    isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className={`
                    h-11
                    w-full
                    sm:w-11
                    rounded-xl
                    border
                    flex
                    items-center
                    justify-center
                    transition-all
                    cursor-pointer

                    ${
                      isWishlisted
                        ? "text-pink-500 border-pink-200 bg-pink-50"
                        : "text-gray-500 border-gray-200 bg-white hover:text-pink-500 hover:border-pink-200 hover:bg-pink-50"
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

              </div>

              {/* ============================
                  OCCASION
              ============================ */}

              <div
                className="
                  mt-6
                  pt-5
                  border-t
                  border-gray-100
                "
              >

                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-wider
                    font-bold
                    text-gray-400
                    mb-2
                  "
                >
                  Perfect For
                </p>

                <Occasion
                  occasion={
                    singleFlower?.occasion
                  }
                />

              </div>

            </div>

          </div>

          {/* ============================
              FEATURES
          ============================ */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-3
              mt-8
              pb-6
            "
          >

            {/* FRESH FLOWERS */}

            <div
              className="
                flex
                items-center
                gap-3
                p-3.5
                rounded-xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Flower2
                  size={18}
                  className="text-pink-500"
                />
              </div>

              <div>

                <p className="text-sm font-bold text-gray-800">
                  Fresh Flowers
                </p>

                <p className="text-[11px] text-gray-400">
                  Carefully selected
                </p>

              </div>

            </div>

            {/* FAST DELIVERY */}

            <div
              className="
                flex
                items-center
                gap-3
                p-3.5
                rounded-xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-purple-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Truck
                  size={18}
                  className="text-purple-500"
                />
              </div>

              <div>

                <p className="text-sm font-bold text-gray-800">
                  Fast Delivery
                </p>

                <p className="text-[11px] text-gray-400">
                  Delivered with care
                </p>

              </div>

            </div>

            {/* QUALITY */}

            <div
              className="
                flex
                items-center
                gap-3
                p-3.5
                rounded-xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-green-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <ShieldCheck
                  size={18}
                  className="text-green-500"
                />
              </div>

              <div>

                <p className="text-sm font-bold text-gray-800">
                  Quality Assured
                </p>

                <p className="text-[11px] text-gray-400">
                  Premium quality flowers
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
};


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

import {
  GetAllFlowerInSleeveFromCartThunk,
  AddFlowerInSleeveToCartThunk,
} from "../../../../../Store/AddToCart/FlowerInSleeve/FlowerInSleeveAddToCartApi";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  GetSingleFlowerInSleeveThunk,
} from "../../../../../Store/FlowerSleeve/FlowerSleeveApi";

import { Auth } from "../../../../Auth/Auth";
import { Occasion } from "../../../../Occasion/Occasion";

import {
  FlowerInSleeveWishlistThunk,
} from "../../../../../Store/Whislist/WhislistApi";

import {
  setSingleProduct,
} from "../../../../../Store/BuySingleProduct/ButSingleProductSlice";

export const SingleFlowerInSleeve = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================
  // WISHLIST
  // ============================

  const {
    flowerInSleeveWishlist = [],
  } = useSelector(
    (state) => state.wishlist
  );

  // ============================
  // AUTH
  // ============================

  const {
    isAuthorized,
  } = useSelector(
    (state) => state.user
  );

  // ============================
  // SINGLE FLOWER
  // ============================

  const {
    singleFlowerInSleeve,
    loading,
  } = useSelector(
    (state) => state.flowerInSleeve
  );

  // ============================
  // CART STATE
  // ============================

  const {
    flowerInSleeveFromCart = [],
  } = useSelector(
    (state) => state.FlowerInSleeveAddToCart
  );

  // ============================
  // GET SINGLE FLOWER IN SLEEVE
  // ============================

  useEffect(() => {
    if (id) {
      dispatch(
        GetSingleFlowerInSleeveThunk(id)
      );
    }
  }, [dispatch, id]);

  // ============================
  // GET FLOWER IN SLEEVE CART
  // ============================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        GetAllFlowerInSleeveFromCartThunk()
      );
    }
  }, [isAuthorized, dispatch]);

  // ============================
  // CHECK WISHLIST
  // ============================

  const isWishlisted =
    Array.isArray(flowerInSleeveWishlist) &&
    flowerInSleeveWishlist.some(
      (item) => {
        const itemId =
          typeof item === "object"
            ? item?._id
            : item;

        return (
          itemId?.toString() ===
          singleFlowerInSleeve?._id?.toString()
        );
      }
    );

  // ============================
  // CHECK CART
  // ============================

  const isInCart =
    Array.isArray(flowerInSleeveFromCart) &&
    flowerInSleeveFromCart.some(
      (item) =>
        item?.flowerInSleeve?._id?.toString() ===
        id?.toString()
    );

  // ============================
  // HANDLE WISHLIST
  // ============================

  const HandleWishlist = () => {
    // Login check
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    // ID check
    if (!singleFlowerInSleeve?._id) {
      toast.error("Flower sleeve not found");
      return;
    }

    dispatch(
      FlowerInSleeveWishlistThunk(
        singleFlowerInSleeve._id
      )
    );
  };

  // ============================
  // STOCK
  // ============================

  const stock =
    singleFlowerInSleeve?.stock ?? 0;

  const isAvailable =
    stock > 0 &&
    singleFlowerInSleeve?.isAvailable !== false;

  // ============================
  // PRICE
  // ============================

  const price =
    singleFlowerInSleeve?.price ?? 0;

  const discountPrice =
    singleFlowerInSleeve?.discountPrice ?? 0;

  const hasDiscount =
    discountPrice > 0 &&
    discountPrice < price;

  const finalPrice =
    hasDiscount
      ? discountPrice
      : price;

  // ============================
  // ADD TO CART
  // ============================

  const handleAddToCart = async () => {
    // Login check
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    // ID check
    if (!id) {
      toast.error("Flower sleeve not found");
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

        // Refresh cart
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

  // ============================
  // BUY NOW
  // ============================

  const handleBuyNow = () => {
    // Login check
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    // Product check
    if (!singleFlowerInSleeve?._id) {
      toast.error(
        "Flower sleeve details not found"
      );
      return;
    }

    // Stock check
    if (!isAvailable) {
      toast.error(
        "Flower in sleeve is currently unavailable"
      );
      return;
    }

    dispatch(
      setSingleProduct({
        product: singleFlowerInSleeve._id,
        productType: "flowerInSleeve",
        name: singleFlowerInSleeve?.name,
        image: singleFlowerInSleeve?.image,
        price: singleFlowerInSleeve?.price || 0,
        discountPrice:
          singleFlowerInSleeve?.discountPrice || 0,
        stock: singleFlowerInSleeve?.stock || 0,
        quantity: 1,
      })
    );

    navigate("/buy-single-product");
  };

  // ============================
  // LOADING
  // ============================

  if (
    loading ||
    !singleFlowerInSleeve
  ) {
    return (
      <>
        <Auth />

        <div className="min-h-[70vh] px-4 flex items-center justify-center">
          <div className="text-center">

            <div
              className="
                w-12
                h-12
                sm:w-14
                sm:h-14
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
                size={23}
                className="sm:hidden text-pink-400"
              />

              <Flower2
                size={26}
                className="hidden sm:block text-pink-400"
              />
            </div>

            <p className="mt-3 text-xs sm:text-sm text-gray-500">
              Loading flower sleeve details...
            </p>

          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Auth />

      <main className="min-h-screen bg-white overflow-x-hidden">

        {/* ============================
            BACK
        ============================ */}

        <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-5">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              inline-flex
              items-center
              gap-1.5
              sm:gap-2
              text-xs
              sm:text-sm
              font-medium
              text-gray-500
              hover:text-pink-600
              transition-colors
              cursor-pointer
            "
          >
            <ArrowLeft size={15} className="sm:hidden" />
            <ArrowLeft size={17} className="hidden sm:block" />

            <span className="truncate">
              Back to Flower Sleeves
            </span>
          </button>

        </div>

        {/* ============================
            PRODUCT SECTION
        ============================ */}

        <section className="max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-6">

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[0.9fr_1.1fr]
              gap-5
              sm:gap-7
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
                h-[270px]
                min-[380px]:h-[300px]
                sm:h-[340px]
                lg:h-[390px]
                rounded-2xl
                sm:rounded-3xl
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
                  -top-10
                  -right-10
                  sm:-top-16
                  sm:-right-16
                  w-28
                  h-28
                  sm:w-44
                  sm:h-44
                  rounded-full
                  bg-white/70
                "
              />

              <div
                className="
                  absolute
                  -bottom-12
                  -left-12
                  sm:-bottom-20
                  sm:-left-20
                  w-36
                  h-36
                  sm:w-52
                  sm:h-52
                  rounded-full
                  bg-pink-100/40
                "
              />

              {/* ================= STOCK ================= */}

              <div
                className={`
                  absolute
                  top-2.5
                  left-2.5
                  sm:top-4
                  sm:left-4
                  z-20
                  max-w-[55%]
                  truncate
                  px-2
                  sm:px-3
                  py-1
                  sm:py-1.5
                  rounded-full
                  text-[9px]
                  sm:text-[11px]
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
                onClick={HandleWishlist}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className={`
                  absolute
                  top-2.5
                  right-2.5
                  sm:top-4
                  sm:right-4
                  z-20
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-full
                  bg-white
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
                      ? "text-pink-500 border-pink-200"
                      : "text-gray-500 border-gray-100 hover:text-pink-500 hover:border-pink-200"
                  }
                `}
              >
                <Heart
                  size={16}
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

              {/* ================= IMAGE ================= */}

              {singleFlowerInSleeve?.image ? (
                <img
                  src={
                    singleFlowerInSleeve.image
                  }
                  alt={
                    singleFlowerInSleeve?.name ||
                    "Flower In Sleeve"
                  }
                  className="
                    relative
                    z-10
                    max-w-[88%]
                    max-h-[78%]
                    sm:max-h-[82%]
                    object-contain
                    transition-transform
                    duration-500
                    hover:scale-105
                  "
                />
              ) : (
                <div className="text-center text-gray-300">

                  <Flower2
                    size={50}
                    className="sm:hidden"
                    strokeWidth={1}
                  />

                  <Flower2
                    size={65}
                    className="hidden sm:block"
                    strokeWidth={1}
                  />

                  <p className="text-xs sm:text-sm mt-2">
                    No image available
                  </p>

                </div>
              )}

            </div>

            {/* =================================================
                RIGHT - PRODUCT DETAILS
            ================================================= */}

            <div className="pt-0 sm:pt-1 min-w-0">

              {/* ================= CATEGORY ================= */}

              <div className="flex items-center gap-1.5 mb-2">

                <Flower2
                  size={14}
                  className="text-pink-500 shrink-0"
                />

                <span
                  className="
                    text-[9px]
                    sm:text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    sm:tracking-[0.18em]
                    text-pink-500
                  "
                >
                  {singleFlowerInSleeve?.category ||
                    "Flower In Sleeve"}
                </span>

              </div>

              {/* ================= NAME ================= */}

              <h1
                className="
                  text-2xl
                  min-[380px]:text-[28px]
                  sm:text-3xl
                  font-extrabold
                  text-gray-900
                  capitalize
                  tracking-tight
                  break-words
                "
              >
                {singleFlowerInSleeve?.name ||
                  "Beautiful Flower In Sleeve"}
              </h1>

              {/* ================= DESCRIPTION ================= */}

              <p
                className="
                  mt-3
                  sm:mt-4
                  text-xs
                  sm:text-sm
                  leading-5
                  sm:leading-6
                  text-gray-500
                  max-w-xl
                "
              >
                {singleFlowerInSleeve?.description ||
                  "A beautiful flower carefully arranged in an elegant sleeve, perfect for making every special occasion memorable."}
              </p>

              {/* ================= PRICE ================= */}

              <div className="mt-4">

                <p
                  className="
                    text-[9px]
                    sm:text-[10px]
                    uppercase
                    tracking-wider
                    font-bold
                    text-gray-400
                  "
                >
                  Price
                </p>

                <div className="flex items-baseline mt-0.5 flex-wrap">

                  <span
                    className="
                      text-sm
                      sm:text-base
                      font-semibold
                      text-gray-500
                      mr-1
                    "
                  >
                    ₹
                  </span>

                  <span
                    className="
                      text-2xl
                      sm:text-3xl
                      font-extrabold
                      text-gray-900
                    "
                  >
                    {finalPrice}
                  </span>

                  {hasDiscount && (
                    <span
                      className="
                        ml-2
                        text-xs
                        sm:text-sm
                        text-gray-400
                        line-through
                      "
                    >
                      ₹{price}
                    </span>
                  )}

                </div>

              </div>

              {/* ================= STOCK ================= */}

              <div className="flex items-start gap-1.5 sm:gap-2 mt-3">

                <CheckCircle2
                  size={16}
                  className={`
                    mt-0.5
                    shrink-0
                    ${
                      isAvailable
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  `}
                />

                <span
                  className={`
                    text-xs
                    sm:text-sm
                    font-semibold
                    leading-5

                    ${
                      isAvailable
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  `}
                >
                  {isAvailable
                    ? `${stock} flower sleeves available`
                    : "Currently unavailable"}
                </span>

              </div>

              {/* ================= BUTTONS ================= */}

              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2 mt-4">

                {/* ADD TO CART */}

                <button
                  type="button"
                  disabled={
                    !isAvailable ||
                    isInCart
                  }
                  onClick={handleAddToCart}
                  className="
                    w-full
                    h-10
                    sm:h-11
                    rounded-xl
                    bg-gray-900
                    text-white
                    text-xs
                    sm:text-sm
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    sm:gap-2
                    hover:bg-pink-600
                    active:scale-[0.98]
                    disabled:bg-gray-100
                    disabled:text-gray-400
                    disabled:cursor-not-allowed
                    transition-all
                    cursor-pointer
                  "
                >
                  <ShoppingCart
                    size={16}
                    className="sm:hidden"
                  />

                  <ShoppingCart
                    size={17}
                    className="hidden sm:block"
                  />

                  {isInCart
                    ? "Added to Cart"
                    : isAvailable
                      ? "Add to Cart"
                      : "Unavailable"}
                </button>

                {/* BUY NOW */}

                <button
                  type="button"
                  disabled={!isAvailable}
                  onClick={handleBuyNow}
                  className="
                    w-full
                    h-10
                    sm:h-11
                    rounded-xl
                    bg-pink-500
                    text-white
                    text-xs
                    sm:text-sm
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    sm:gap-2
                    hover:bg-pink-600
                    active:scale-[0.98]
                    disabled:bg-gray-100
                    disabled:text-gray-400
                    disabled:cursor-not-allowed
                    transition-all
                    cursor-pointer
                  "
                >
                  <Zap
                    size={16}
                    className="sm:hidden"
                  />

                  <Zap
                    size={17}
                    className="hidden sm:block"
                  />

                  {isAvailable
                    ? "Buy Now"
                    : "Unavailable"}
                </button>

              </div>

              {/* WISHLIST */}

              <button
                type="button"
                onClick={HandleWishlist}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className={`
                  w-full
                  h-10
                  sm:h-11
                  rounded-xl
                  border
                  bg-white
                  flex
                  items-center
                  justify-center
                  gap-2
                  mt-2
                  text-xs
                  sm:text-sm
                  transition-all
                  cursor-pointer

                  ${
                    isWishlisted
                      ? "text-pink-500 border-pink-200 bg-pink-50"
                      : "text-gray-500 border-gray-200 hover:text-pink-500 hover:border-pink-200 hover:bg-pink-50"
                  }
                `}
              >
                <Heart
                  size={16}
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

                {isWishlisted
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>

              {/* ================= OCCASION ================= */}

              <div
                className="
                  mt-5
                  sm:mt-6
                  pt-4
                  sm:pt-5
                  border-t
                  border-gray-100
                "
              >

                <p
                  className="
                    text-[9px]
                    sm:text-[10px]
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
                    singleFlowerInSleeve?.occasion
                  }
                />

              </div>

            </div>

          </div>

          {/* =================================================
              FEATURES
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-2.5
              sm:gap-3
              mt-6
              sm:mt-8
              pb-5
              sm:pb-6
            "
          >

            {/* ================= FRESH & ELEGANT ================= */}

            <div
              className="
                flex
                items-center
                gap-2.5
                sm:gap-3
                p-3
                sm:p-3.5
                rounded-xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div
                className="
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-lg
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Flower2
                  size={17}
                  className="sm:hidden text-pink-500"
                />

                <Flower2
                  size={18}
                  className="hidden sm:block text-pink-500"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                  Fresh & Elegant
                </p>

                <p className="text-[10px] sm:text-[11px] text-gray-400">
                  Beautifully arranged
                </p>

              </div>

            </div>

            {/* ================= FAST DELIVERY ================= */}

            <div
              className="
                flex
                items-center
                gap-2.5
                sm:gap-3
                p-3
                sm:p-3.5
                rounded-xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div
                className="
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-lg
                  bg-rose-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Truck
                  size={17}
                  className="sm:hidden text-rose-500"
                />

                <Truck
                  size={18}
                  className="hidden sm:block text-rose-500"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                  Fast Delivery
                </p>

                <p className="text-[10px] sm:text-[11px] text-gray-400">
                  Delivered with care
                </p>

              </div>

            </div>

            {/* ================= QUALITY ================= */}

            <div
              className="
                flex
                items-center
                gap-2.5
                sm:gap-3
                p-3
                sm:p-3.5
                rounded-xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div
                className="
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-lg
                  bg-green-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <ShieldCheck
                  size={17}
                  className="sm:hidden text-green-500"
                />

                <ShieldCheck
                  size={18}
                  className="hidden sm:block text-green-500"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                  Quality Assured
                </p>

                <p className="text-[10px] sm:text-[11px] text-gray-400">
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
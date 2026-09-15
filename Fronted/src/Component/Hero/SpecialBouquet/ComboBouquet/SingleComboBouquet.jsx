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

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Auth } from "../../../Auth/Auth";
import { Occasion } from "../../../Occasion/Occasion";

import {
  GetSingleComboBouquetThunk,
} from "../../../../Store/ComboBouquet/ComboBouquetApi";

import {
  ComboBouquetWishlistThunk,
} from "../../../../Store/Whislist/WhislistApi";

import {
  AddComboBouquetToCartThunk,
  GetAllComboBouquetFromCartThunk,
} from "../../../../Store/AddToCart/ComboBouquetAddToCart/ComboBouquetAddToCartApi";

import {
  setSingleProduct,
} from "../../../../Store/BuySingleProduct/ButSingleProductSlice";

import toast from "react-hot-toast";

export const SingleComboBouquet = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================
  // WISHLIST STATE
  // ============================

  const {
    comboBouquetWishlist = [],
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
  // COMBO BOUQUET STATE
  // ============================

  const {
    singleComboBouquet,
    loading,
  } = useSelector(
    (state) => state.comboBouquet
  );

  // ============================
  // CART STATE
  // ============================

  const {
    comboBouquetFromCart = [],
  } = useSelector(
    (state) => state.ComboBouquetAddToCart
  );

  // ============================
  // GET SINGLE COMBO BOUQUET
  // ============================

  useEffect(() => {
    if (id) {
      dispatch(
        GetSingleComboBouquetThunk(id)
      );
    }
  }, [dispatch, id]);

  // ============================
  // GET COMBO BOUQUET CART
  // ============================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        GetAllComboBouquetFromCartThunk()
      );
    }
  }, [isAuthorized, dispatch]);

  // ============================
  // CHECK WISHLIST
  // ============================

  const isWishlisted =
    Array.isArray(comboBouquetWishlist) &&
    comboBouquetWishlist.some((item) => {
      const itemId =
        typeof item === "object"
          ? (
              item?._id ||
              item?.comboBouquetId ||
              item?.productId
            )
          : item;

      return (
        String(itemId) === String(id)
      );
    });

  // ============================
  // CHECK CART
  // ============================

  const isInCart =
    Array.isArray(comboBouquetFromCart) &&
    comboBouquetFromCart.some(
      (item) =>
        item?.comboBouquet?._id?.toString() ===
        id?.toString()
    );

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
        ComboBouquetWishlistThunk(id)
      );
    } catch (error) {
      console.error(
        "Combo bouquet wishlist error:",
        error
      );
    }
  };

  // ============================
  // STOCK
  // ============================

  const stock =
    singleComboBouquet?.stock ?? 0;

  const isAvailable =
    stock > 0 &&
    singleComboBouquet?.isAvailable !== false;

  // ============================
  // PRICE
  // ============================

  const price =
    singleComboBouquet?.price ?? 0;

  const discountPrice =
    singleComboBouquet?.discountPrice ?? 0;

  const hasDiscount =
    discountPrice > 0 &&
    discountPrice < price;

  const finalPrice =
    hasDiscount
      ? discountPrice
      : price;

  // ============================
  // BUY NOW
  // ============================

  const handleBuyNow = () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!singleComboBouquet?._id) {
      toast.error("Combo bouquet details not found");
      return;
    }

    if (!isAvailable) {
      toast.error(
        "Combo bouquet is currently unavailable"
      );
      return;
    }

    dispatch(
      setSingleProduct({
        product: singleComboBouquet._id,
        productType: "comboBouquet",
        name: singleComboBouquet?.name,
        image: singleComboBouquet?.image,
        price: singleComboBouquet?.price || 0,
        discountPrice:
          singleComboBouquet?.discountPrice || 0,
        stock: singleComboBouquet?.stock || 0,
        quantity: 1,
      })
    );

    navigate("/buy-single-product");
  };

  // ============================
  // ADD TO CART HANDLER
  // ============================

  const handleAddToCart = async () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!id) {
      toast.error("Combo bouquet not found");
      return;
    }

    if (!isAvailable) {
      toast.error(
        "Combo bouquet is unavailable"
      );
      return;
    }

    if (isInCart) {
      toast.error(
        "Combo bouquet already added to cart"
      );
      return;
    }

    try {
      const result = await dispatch(
        AddComboBouquetToCartThunk(id)
      );

      if (
        AddComboBouquetToCartThunk.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Combo bouquet added to cart"
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

  // ============================
  // LOADING
  // ============================

  if (
    loading ||
    !singleComboBouquet
  ) {
    return (
      <>
        <Auth />

        <div className="min-h-[70vh] sm:min-h-[75vh] px-4 flex items-center justify-center">
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
                className="sm:w-[26px] sm:h-[26px] text-pink-400"
              />
            </div>

            <p className="mt-3 text-xs sm:text-sm text-gray-500">
              Loading combo bouquet details...
            </p>

          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Auth />

      <main className="min-h-screen bg-white overflow-hidden">

        {/* BACK */}

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
            <ArrowLeft
              size={15}
              className="sm:w-[17px] sm:h-[17px]"
            />

            <span>
              Back to Combo Bouquets
            </span>
          </button>

        </div>

        {/* PRODUCT SECTION */}

        <section className="max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-6">

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[0.9fr_1.1fr]
              gap-6
              sm:gap-7
              lg:gap-10
              items-start
            "
          >

            {/* LEFT IMAGE */}

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

              <div
                className="
                  absolute
                  -top-12
                  -right-12
                  sm:-top-16
                  sm:-right-16
                  w-32
                  h-32
                  sm:w-44
                  sm:h-44
                  rounded-full
                  bg-white/70
                "
              />

              <div
                className="
                  absolute
                  -bottom-14
                  -left-14
                  sm:-bottom-20
                  sm:-left-20
                  w-40
                  h-40
                  sm:w-52
                  sm:h-52
                  rounded-full
                  bg-pink-100/40
                "
              />

              {/* STOCK */}

              <div
                className={`
                  absolute
                  top-3
                  left-3
                  sm:top-4
                  sm:left-4
                  z-20
                  max-w-[55%]
                  px-2.5
                  py-1
                  sm:px-3
                  sm:py-1.5
                  rounded-full
                  text-[10px]
                  sm:text-[11px]
                  font-bold
                  truncate

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
                  absolute
                  top-3
                  right-3
                  sm:top-4
                  sm:right-4
                  z-20
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
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
                      ? "bg-pink-50 text-pink-500 border-pink-200"
                      : "bg-white text-gray-500 border-gray-100 hover:text-pink-500 hover:border-pink-200"
                  }
                `}
              >
                <Heart
                  size={17}
                  className="sm:w-[18px] sm:h-[18px]"
                  fill={
                    isWishlisted
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

              {/* IMAGE */}

              {singleComboBouquet?.image ? (
                <img
                  src={singleComboBouquet.image}
                  alt={
                    singleComboBouquet?.name ||
                    "Combo Bouquet"
                  }
                  className="
                    relative
                    z-10
                    max-w-[90%]
                    sm:max-w-[88%]
                    max-h-[80%]
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
                    size={52}
                    className="sm:w-[65px] sm:h-[65px]"
                    strokeWidth={1}
                  />

                  <p className="text-xs sm:text-sm mt-2">
                    No image available
                  </p>

                </div>
              )}

            </div>

            {/* RIGHT DETAILS */}

            <div className="pt-0 lg:pt-1 min-w-0">

              {/* CATEGORY */}

              <div className="flex items-center gap-1.5 sm:gap-2 mb-2">

                <Flower2
                  size={14}
                  className="sm:w-[15px] sm:h-[15px] text-pink-500 shrink-0"
                />

                <span
                  className="
                    text-[9px]
                    sm:text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    sm:tracking-[0.18em]
                    text-pink-500
                    truncate
                  "
                >
                  {singleComboBouquet?.category ||
                    "Combo Bouquet"}
                </span>

              </div>

              {/* NAME */}

              <h1
                className="
                  text-2xl
                  min-[380px]:text-[27px]
                  sm:text-3xl
                  font-extrabold
                  text-gray-900
                  capitalize
                  tracking-tight
                  break-words
                "
              >
                {singleComboBouquet?.name ||
                  "Beautiful Combo Bouquet"}
              </h1>

              {/* DESCRIPTION */}

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
                {singleComboBouquet?.description ||
                  "A beautiful combination of fresh flowers carefully arranged to make your special moments even more memorable."}
              </p>

              {/* PRICE */}

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
                      sm:text-2xl
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

              {/* STOCK */}

              <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 mt-3">

                <CheckCircle2
                  size={15}
                  className={`
                    sm:w-4
                    sm:h-4
                    shrink-0
                    mt-0.5
                    sm:mt-0
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
                    ? `${stock} combo bouquets available`
                    : "Currently unavailable"}
                </span>

              </div>

              {/* BUTTONS */}

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
                    px-2
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
                    className="sm:w-[17px] sm:h-[17px] shrink-0"
                  />

                  <span className="truncate">
                    {isInCart
                      ? "Added to Cart"
                      : isAvailable
                        ? "Add to Cart"
                        : "Unavailable"}
                  </span>
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
                    px-2
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
                    className="sm:w-[17px] sm:h-[17px] shrink-0"
                    fill="currentColor"
                  />

                  Buy Now
                </button>

              </div>

              {/* WISHLIST */}

              <button
                type="button"
                onClick={handleWishlist}
                className={`
                  w-full
                  h-10
                  mt-2
                  rounded-xl
                  border
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  sm:gap-2
                  text-xs
                  sm:text-sm
                  font-semibold
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
                  size={16}
                  className="sm:w-[17px] sm:h-[17px]"
                  fill={
                    isWishlisted
                      ? "currentColor"
                      : "none"
                  }
                />

                {isWishlisted
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
              </button>

              {/* OCCASION */}

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
                    singleComboBouquet?.occasion
                  }
                />

              </div>

            </div>

          </div>

          {/* FEATURES */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-2.5
              sm:gap-3
              mt-7
              sm:mt-8
              pb-5
              sm:pb-6
            "
          >

            {/* FRESH FLOWERS */}

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
                  size={17}
                  className="sm:w-[18px] sm:h-[18px] text-pink-500"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                  Fresh Flowers
                </p>

                <p className="text-[10px] sm:text-[11px] text-gray-400">
                  Carefully selected
                </p>

              </div>

            </div>

            {/* FAST DELIVERY */}

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
                  size={17}
                  className="sm:w-[18px] sm:h-[18px] text-purple-500"
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

            {/* QUALITY */}

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
                  size={17}
                  className="sm:w-[18px] sm:h-[18px] text-green-500"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                  Quality Assured
                </p>

                <p className="text-[10px] sm:text-[11px] text-gray-400">
                  Premium quality bouquet
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
};
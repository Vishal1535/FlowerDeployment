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

import { setSingleProduct } from "../../../Store/BuySingleProduct/ButSingleProductSlice";

import { BouquetWishlistThunk } from "../../../Store/Whislist/WhislistApi";
import { SingleBouquetThunk } from "../../../Store/Bouquest/BouquestApi";

import {
  GetAllBouquetFromCartThunk,
  AddBouquetToCartThunk,
} from "../../../Store/AddToCart/BouquetAddToCart/BouquetAddToCartApi";

import toast from "react-hot-toast";

export const SingleBouquet = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================
  // BOUQUET STATE
  // ============================

  const { singleBouquet } = useSelector(
    (state) => state.bouquet
  );

  // ============================
  // WISHLIST STATE
  // ============================

  const { bouquetWishlist = [] } = useSelector(
    (state) => state.wishlist
  );

  // ============================
  // CART STATE
  // ============================

  const { bouquetFromCart = [] } = useSelector(
    (state) => state.BouquetAddToCart
  );

  // ============================
  // AUTH STATE
  // ============================

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  // ============================
  // GET SINGLE BOUQUET
  // ============================

  useEffect(() => {
    if (id) {
      dispatch(SingleBouquetThunk(id));
    }
  }, [dispatch, id]);

  // ============================
  // GET BOUQUET CART
  // ============================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllBouquetFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ============================
  // CHECK CART
  // ============================

  const isInCart =
    Array.isArray(bouquetFromCart) &&
    bouquetFromCart.some(
      (item) =>
        String(item?.bouquet?._id) ===
        String(id)
    );

  // ============================
  // CHECK WISHLIST
  // ============================

  const isWishlisted =
    Array.isArray(bouquetWishlist) &&
    bouquetWishlist.some((item) => {
      const wishlistId =
        typeof item === "object"
          ? item?._id ||
            item?.bouquetId ||
            item?.productId
          : item;

      return (
        String(wishlistId) === String(id)
      );
    });

  // ============================
  // WISHLIST HANDLER
  // ============================

  const handleWishlist = () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!id) {
      toast.error("Bouquet not found");
      return;
    }

    dispatch(BouquetWishlistThunk(id));
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
      toast.error("Bouquet not found");
      return;
    }

    if (isInCart) {
      toast.error("Bouquet already added to cart");
      return;
    }

    if (!isAvailable) {
      toast.error("Bouquet is currently unavailable");
      return;
    }

    try {
      const result = await dispatch(
        AddBouquetToCartThunk(id)
      );

      if (
        AddBouquetToCartThunk.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Bouquet added to cart"
        );

        dispatch(
          GetAllBouquetFromCartThunk()
        );
      } else {
        toast.error(
          result.payload ||
            "Failed to add bouquet to cart"
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

    if (!singleBouquet?._id) {
      toast.error("Bouquet details not found");
      return;
    }

    if (!isAvailable) {
      toast.error(
        "Bouquet is currently unavailable"
      );
      return;
    }

    // Single product data Redux state mein store
    dispatch(
      setSingleProduct({
        product: singleBouquet._id,
        productType: "bouquet",
        name: singleBouquet?.name,
        image: singleBouquet?.image,
        price: singleBouquet?.price || 0,
        discountPrice:
          singleBouquet?.discountPrice || 0,
        stock: singleBouquet?.stock || 0,
        quantity: 1,
      })
    );

    // Buy Now page
    navigate("/buy-single-product");
  };

  // ============================
  // LOADING
  // ============================

  if (!singleBouquet) {
    return (
      <>
        <Auth />

        <div className="min-h-[75vh] flex items-center justify-center px-4">
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
              Loading bouquet details...
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
    singleBouquet?.stock ?? 0;

  const isAvailable =
    stock > 0 &&
    singleBouquet?.isAvailable !== false;

  return (
    <>
      <Auth />

      <main className="min-h-screen bg-white overflow-hidden">

        {/* ============================
            BACK
        ============================ */}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5">

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

            Back to Bouquets
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
              gap-6
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
                h-[280px]
                min-[380px]:h-[310px]
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
                  -top-12
                  -right-12
                  sm:-top-16
                  sm:-right-16
                  w-36
                  h-36
                  sm:w-44
                  sm:h-44
                  rounded-full
                  bg-white/70
                "
              />

              <div
                className="
                  absolute
                  -bottom-16
                  -left-16
                  sm:-bottom-20
                  sm:-left-20
                  w-44
                  h-44
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
                  top-3
                  left-3
                  sm:top-4
                  sm:left-4
                  z-20
                  px-2.5
                  sm:px-3
                  py-1
                  sm:py-1.5
                  rounded-full
                  text-[10px]
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
                  shadow-sm
                  flex
                  items-center
                  justify-center
                  hover:scale-105
                  transition-all
                  cursor-pointer
                  border
                  ${
                    isWishlisted
                      ? "bg-pink-500 text-white border-pink-500"
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

              {/* ================= IMAGE ================= */}

              {singleBouquet?.image ? (
                <img
                  src={singleBouquet.image}
                  alt={
                    singleBouquet?.name ||
                    "Flower Bouquet"
                  }
                  className="
                    relative
                    z-10
                    max-w-[84%]
                    sm:max-w-[88%]
                    max-h-[78%]
                    sm:max-h-[82%]
                    object-contain
                    transition-transform
                    duration-500
                    hover:scale-105
                  "
                />
              ) : (
                <div className="text-center text-gray-300 px-4">

                  <Flower2
                    size={55}
                    strokeWidth={1}
                    className="mx-auto sm:w-[65px] sm:h-[65px]"
                  />

                  <p className="text-xs sm:text-sm mt-2">
                    No image available
                  </p>

                </div>
              )}

            </div>

            {/* ============================
                RIGHT - DETAILS
            ============================ */}

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
                    tracking-[0.15em]
                    sm:tracking-[0.18em]
                    text-pink-500
                  "
                >
                  {singleBouquet?.category ||
                    "Bouquet"}
                </span>

              </div>

              {/* NAME */}

              <h1
                className="
                  text-2xl
                  min-[380px]:text-3xl
                  sm:text-3xl
                  font-extrabold
                  text-gray-900
                  capitalize
                  tracking-tight
                  leading-tight
                  break-words
                "
              >
                {singleBouquet?.name ||
                  "Beautiful Bouquet"}
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
                {singleBouquet?.description ||
                  "A beautiful flower bouquet carefully arranged to make your special moments even more memorable."}
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

                <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">

                  <span
                    className="
                      text-2xl
                      sm:text-2xl
                      font-extrabold
                      text-gray-900
                    "
                  >
                    ₹
                    {singleBouquet?.discountPrice > 0 &&
                    singleBouquet?.discountPrice <
                      singleBouquet?.price
                      ? singleBouquet?.discountPrice
                      : singleBouquet?.price ?? 0}
                  </span>

                  {singleBouquet?.discountPrice > 0 &&
                    singleBouquet?.discountPrice <
                      singleBouquet?.price && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        ₹{singleBouquet?.price}
                      </span>
                    )}

                </div>

              </div>

              {/* STOCK */}

              <div className="flex items-start sm:items-center gap-2 mt-3">

                <CheckCircle2
                  size={16}
                  className={`
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
                    ${
                      isAvailable
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  `}
                >
                  {isAvailable
                    ? `${stock} bouquets available`
                    : "Currently unavailable"}
                </span>

              </div>

              {/* ================= BUTTONS ================= */}

              <div className="grid grid-cols-1 min-[420px]:grid-cols-[1fr_1fr_auto] gap-2 mt-4">

                {/* ADD TO CART */}

                <button
                  type="button"
                  disabled={!isAvailable || isInCart}
                  onClick={handleAddToCart}
                  className={`
                    h-11
                    rounded-xl
                    text-white
                    text-xs
                    sm:text-sm
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    sm:gap-2
                    active:scale-[0.98]
                    transition-all
                    cursor-pointer
                    px-3

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
                  <ShoppingCart
                    size={16}
                    className="sm:w-[17px] sm:h-[17px]"
                  />

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
                    text-xs
                    sm:text-sm
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    sm:gap-2
                    active:scale-[0.98]
                    transition-all
                    cursor-pointer
                    disabled:cursor-not-allowed
                    px-3
                  "
                >
                  <Zap
                    size={16}
                    className="sm:w-[17px] sm:h-[17px]"
                  />

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
                    min-[420px]:w-11
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
                    size={17}
                    className="sm:w-[18px] sm:h-[18px]"
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
                    singleBouquet?.occasion
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
              gap-2.5
              sm:gap-3
              mt-6
              sm:mt-8
              pb-5
              sm:pb-6
            "
          >

            {/* FRESH BOUQUET */}

            <div
              className="
                flex
                items-center
                gap-3
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
                  size={18}
                  className="text-pink-500"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs sm:text-sm font-bold text-gray-800">
                  Fresh Bouquet
                </p>

                <p className="text-[10px] sm:text-[11px] text-gray-400">
                  Carefully arranged
                </p>

              </div>

            </div>

            {/* FAST DELIVERY */}

            <div
              className="
                flex
                items-center
                gap-3
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
                  size={18}
                  className="text-purple-500"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs sm:text-sm font-bold text-gray-800">
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
                gap-3
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
                  size={18}
                  className="text-green-500"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs sm:text-sm font-bold text-gray-800">
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
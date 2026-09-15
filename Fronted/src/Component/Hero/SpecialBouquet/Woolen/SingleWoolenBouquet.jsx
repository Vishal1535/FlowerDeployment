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
import toast from "react-hot-toast";

import { Auth } from "../../../Auth/Auth";
import { Occasion } from "../../../Occasion/Occasion";

import {
  GetSingleWoolenThunk,
} from "../../../../Store/Woolen/WoolenApi";

import {
  WoolenWishlistThunk,
} from "../../../../Store/Whislist/WhislistApi";

import {
  AddWoolenBouquetToCartThunk,
  GetAllWoolenBouquetFromCartThunk,
} from "../../../../Store/AddToCart/WoolenAddToCart/WoolenAddToCartApi";

import {
  setSingleProduct,
} from "../../../../Store/BuySingleProduct/ButSingleProductSlice";

export const SingleWoolenBouquet = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================
  // WISHLIST STATE
  // ============================

  const {
    woolenWishlist = [],
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
  // WOOLEN STATE
  // ============================

  const {
    singleWoolen,
    loading,
  } = useSelector(
    (state) => state.woolen
  );

  // ============================
  // CART STATE
  // ============================

  const {
    woolenBouquetFromCart = [],
  } = useSelector(
    (state) => state.WoolenBouquetAddToCart
  );

  // ============================
  // GET SINGLE WOOLEN BOUQUET
  // ============================

  useEffect(() => {
    if (id) {
      dispatch(
        GetSingleWoolenThunk(id)
      );
    }
  }, [dispatch, id]);

  // ============================
  // GET WOOLEN BOUQUET CART
  // ============================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        GetAllWoolenBouquetFromCartThunk()
      );
    }
  }, [isAuthorized, dispatch]);

  // ============================
  // CHECK WISHLIST
  // ============================

  const isWishlisted =
    Array.isArray(woolenWishlist) &&
    woolenWishlist.some((item) => {
      const itemId =
        typeof item === "object"
          ? (
              item?._id ||
              item?.woolenId ||
              item?.productId
            )
          : item;

      return (
        String(itemId) ===
        String(id)
      );
    });

  // ============================
  // CHECK CART
  // ============================

  const isInCart =
    Array.isArray(woolenBouquetFromCart) &&
    woolenBouquetFromCart.some(
      (item) =>
        item?.woolenBouquet?._id?.toString() ===
        id?.toString()
    );

  // ============================
  // WISHLIST HANDLER
  // ============================

  const HandleWishlist = async () => {
    if (!isAuthorized) {
      toast.error("Please Login First");
      return;
    }

    if (!id) {
      toast.error("Woolen bouquet not found");
      return;
    }

    try {
      await dispatch(
        WoolenWishlistThunk(id)
      );
    } catch (error) {
      console.error(
        "Woolen bouquet wishlist error:",
        error
      );
    }
  };

  // ============================
  // STOCK
  // ============================

  const stock =
    singleWoolen?.stock ?? 0;

  const isAvailable =
    stock > 0 &&
    singleWoolen?.isAvailable !== false;

  // ============================
  // PRICE
  // ============================

  const price =
    singleWoolen?.price ?? 0;

  const discountPrice =
    singleWoolen?.discountPrice ?? 0;

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

    if (!singleWoolen?._id) {
      toast.error(
        "Woolen bouquet details not found"
      );
      return;
    }

    if (!isAvailable) {
      toast.error(
        "Woolen bouquet is currently unavailable"
      );
      return;
    }

    dispatch(
      setSingleProduct({
        product: singleWoolen._id,
        productType: "woolenBouquet",
        name: singleWoolen?.name,
        image: singleWoolen?.image,
        price: singleWoolen?.price || 0,
        discountPrice:
          singleWoolen?.discountPrice || 0,
        stock: singleWoolen?.stock || 0,
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
      toast.error(
        "Woolen bouquet not found"
      );
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
    !singleWoolen
  ) {
    return (
      <>
        <Auth />

        <div className="min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center px-4">
          <div className="text-center">

            <div
              className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                mx-auto
                rounded-full
                bg-purple-50
                flex
                items-center
                justify-center
                animate-pulse
              "
            >
              <Flower2
                size={23}
                className="text-purple-400 sm:hidden"
              />

              <Flower2
                size={26}
                className="text-purple-400 hidden sm:block"
              />
            </div>

            <p
              className="
                mt-3
                text-xs
                sm:text-sm
                text-gray-500
              "
            >
              Loading woolen bouquet details...
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

        <div
          className="
            max-w-6xl
            mx-auto
            px-3
            min-[380px]:px-4
            sm:px-6
            pt-4
            sm:pt-5
          "
        >

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
              hover:text-purple-600
              transition-colors
              cursor-pointer
              max-w-full
            "
          >
            <ArrowLeft
              size={15}
              className="sm:hidden shrink-0"
            />

            <ArrowLeft
              size={17}
              className="hidden sm:block shrink-0"
            />

            <span className="truncate">
              Back to Woolen Bouquets
            </span>
          </button>

        </div>

        {/* ============================
            PRODUCT SECTION
        ============================ */}

        <section
          className="
            max-w-6xl
            mx-auto
            px-3
            min-[380px]:px-4
            sm:px-6
            py-5
            sm:py-6
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[0.9fr_1.1fr]
              gap-5
              min-[380px]:gap-6
              sm:gap-7
              lg:gap-10
              items-start
            "
          >

            {/* LEFT - IMAGE */}

            <div
              className="
                relative
                w-full
                h-[270px]
                min-[380px]:h-[300px]
                sm:h-[340px]
                lg:h-[390px]
                rounded-2xl
                min-[380px]:rounded-3xl
                overflow-hidden
                bg-gradient-to-br
                from-purple-50
                via-pink-50
                to-white
                border
                border-purple-100
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
                  -bottom-16
                  -left-16
                  sm:-bottom-20
                  sm:-left-20
                  w-40
                  h-40
                  sm:w-52
                  sm:h-52
                  rounded-full
                  bg-purple-100/40
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
                  px-2
                  min-[380px]:px-3
                  py-1
                  sm:py-1.5
                  rounded-full
                  text-[9px]
                  min-[380px]:text-[10px]
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
                      ? "text-purple-500 border-purple-200 bg-purple-50"
                      : "text-gray-500 border-gray-100 hover:text-purple-500 hover:border-purple-200"
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

              {/* IMAGE */}

              {singleWoolen?.image ? (
                <img
                  src={singleWoolen.image}
                  alt={
                    singleWoolen?.name ||
                    "Woolen Bouquet"
                  }
                  className="
                    relative
                    z-10
                    max-w-[86%]
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
                    size={52}
                    className="mx-auto sm:hidden"
                    strokeWidth={1}
                  />

                  <Flower2
                    size={65}
                    className="hidden sm:block mx-auto"
                    strokeWidth={1}
                  />

                  <p className="text-xs sm:text-sm mt-2">
                    No image available
                  </p>

                </div>
              )}

            </div>

            {/* RIGHT - PRODUCT DETAILS */}

            <div className="pt-0 lg:pt-1 min-w-0">

              {/* CATEGORY */}

              <div className="flex items-center gap-1.5 sm:gap-2 mb-2">

                <Flower2
                  size={14}
                  className="text-purple-500 shrink-0 sm:hidden"
                />

                <Flower2
                  size={15}
                  className="text-purple-500 shrink-0 hidden sm:block"
                />

                <span
                  className="
                    text-[9px]
                    min-[380px]:text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    min-[380px]:tracking-[0.18em]
                    text-purple-500
                    truncate
                  "
                >
                  {singleWoolen?.category ||
                    "Woolen Bouquet"}
                </span>

              </div>

              {/* NAME */}

              <h1
                className="
                  text-xl
                  min-[380px]:text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-gray-900
                  capitalize
                  tracking-tight
                  break-words
                "
              >
                {singleWoolen?.name ||
                  "Beautiful Woolen Bouquet"}
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-3
                  sm:mt-4
                  text-xs
                  min-[380px]:text-sm
                  leading-5
                  sm:leading-6
                  text-gray-500
                  max-w-xl
                "
              >
                {singleWoolen?.description ||
                  "A beautiful handmade woolen bouquet, carefully crafted to make your special moments even more memorable."}
              </p>

              {/* PRICE */}

              <div className="mt-3 sm:mt-4">

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
                      text-xl
                      min-[380px]:text-2xl
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

              <div
                className="
                  flex
                  items-start
                  gap-1.5
                  sm:gap-2
                  mt-3
                "
              >

                <CheckCircle2
                  size={15}
                  className={`
                    mt-0.5
                    shrink-0
                    sm:hidden
                    ${
                      isAvailable
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  `}
                />

                <CheckCircle2
                  size={16}
                  className={`
                    mt-0.5
                    shrink-0
                    hidden
                    sm:block
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
                    min-[380px]:text-sm
                    font-semibold
                    leading-5
                    break-words
                    ${
                      isAvailable
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  `}
                >
                  {isAvailable
                    ? `${stock} woolen bouquets available`
                    : "Currently unavailable"}
                </span>

              </div>

              {/* ============================
                  BUTTONS
              ============================ */}

              <div
                className="
                  grid
                  grid-cols-1
                  min-[380px]:grid-cols-2
                  gap-2
                  mt-4
                "
              >

                {/* ADD TO CART */}

                <button
                  type="button"
                  disabled={
                    !isAvailable ||
                    isInCart
                  }
                  onClick={handleAddToCart}
                  className="
                    h-10
                    min-[380px]:h-11
                    rounded-xl
                    bg-gray-900
                    text-white
                    text-xs
                    min-[380px]:text-sm
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    min-[380px]:gap-2
                    hover:bg-purple-600
                    active:scale-[0.98]
                    disabled:bg-gray-100
                    disabled:text-gray-400
                    disabled:cursor-not-allowed
                    transition-all
                    cursor-pointer
                    px-2
                  "
                >
                  <ShoppingCart
                    size={16}
                    className="shrink-0"
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
                    h-10
                    min-[380px]:h-11
                    rounded-xl
                    bg-purple-500
                    text-white
                    text-xs
                    min-[380px]:text-sm
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    min-[380px]:gap-2
                    hover:bg-purple-600
                    active:scale-[0.98]
                    disabled:bg-gray-100
                    disabled:text-gray-400
                    disabled:cursor-not-allowed
                    transition-all
                    cursor-pointer
                    px-2
                  "
                >
                  <Zap
                    size={16}
                    className="shrink-0"
                    fill="currentColor"
                  />

                  Buy Now
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
                  min-[380px]:h-11
                  mt-2
                  rounded-xl
                  border
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  sm:gap-2
                  text-xs
                  min-[380px]:text-sm
                  font-semibold
                  transition-all
                  cursor-pointer

                  ${
                    isWishlisted
                      ? "text-purple-500 border-purple-200 bg-purple-50"
                      : "text-gray-500 border-gray-200 bg-white hover:text-purple-500 hover:border-purple-200 hover:bg-purple-50"
                  }
                `}
              >
                <Heart
                  size={16}
                  className="sm:hidden shrink-0"
                  fill={
                    isWishlisted
                      ? "currentColor"
                      : "none"
                  }
                />

                <Heart
                  size={17}
                  className="hidden sm:block shrink-0"
                  fill={
                    isWishlisted
                      ? "currentColor"
                      : "none"
                  }
                />

                <span className="truncate">
                  {isWishlisted
                    ? "Added to Wishlist"
                    : "Add to Wishlist"}
                </span>
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
                  min-w-0
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

                <div className="min-w-0 overflow-hidden">
                  <Occasion
                    occasion={
                      singleWoolen?.occasion
                    }
                  />
                </div>

              </div>

            </div>

          </div>

          {/* FEATURES */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-2
              sm:gap-3
              mt-6
              sm:mt-8
              pb-5
              sm:pb-6
            "
          >

            {/* HANDMADE */}

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
                min-w-0
              "
            >

              <div
                className="
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-lg
                  bg-purple-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Flower2
                  size={17}
                  className="text-purple-500 sm:hidden"
                />

                <Flower2
                  size={18}
                  className="text-purple-500 hidden sm:block"
                />
              </div>

              <div className="min-w-0">

                <p
                  className="
                    text-xs
                    sm:text-sm
                    font-bold
                    text-gray-800
                    truncate
                  "
                >
                  Handmade
                </p>

                <p
                  className="
                    text-[10px]
                    sm:text-[11px]
                    text-gray-400
                    truncate
                  "
                >
                  Carefully handcrafted
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
                min-w-0
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
                <Truck
                  size={17}
                  className="text-pink-500 sm:hidden"
                />

                <Truck
                  size={18}
                  className="text-pink-500 hidden sm:block"
                />
              </div>

              <div className="min-w-0">

                <p
                  className="
                    text-xs
                    sm:text-sm
                    font-bold
                    text-gray-800
                    truncate
                  "
                >
                  Fast Delivery
                </p>

                <p
                  className="
                    text-[10px]
                    sm:text-[11px]
                    text-gray-400
                    truncate
                  "
                >
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
                min-w-0
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
                  className="text-green-500 sm:hidden"
                />

                <ShieldCheck
                  size={18}
                  className="text-green-500 hidden sm:block"
                />
              </div>

              <div className="min-w-0">

                <p
                  className="
                    text-xs
                    sm:text-sm
                    font-bold
                    text-gray-800
                    truncate
                  "
                >
                  Quality Assured
                </p>

                <p
                  className="
                    text-[10px]
                    sm:text-[11px]
                    text-gray-400
                    truncate
                  "
                >
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
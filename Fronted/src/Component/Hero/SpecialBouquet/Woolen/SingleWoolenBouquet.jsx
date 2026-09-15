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

        <div className="min-h-[75vh] flex items-center justify-center">
          <div className="text-center">

            <div
              className="
                w-14
                h-14
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
                size={26}
                className="text-purple-400"
              />
            </div>

            <p className="mt-3 text-sm text-gray-500">
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
              hover:text-purple-600
              transition-colors
              cursor-pointer
            "
          >
            <ArrowLeft size={17} />

            Back to Woolen Bouquets
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

            {/* LEFT - IMAGE */}

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
                  bg-purple-100/40
                "
              />

              {/* STOCK */}

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
                  top-4
                  right-4
                  z-20
                  w-10
                  h-10
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
                  size={18}
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

            {/* RIGHT - PRODUCT DETAILS */}

            <div className="pt-1">

              {/* CATEGORY */}

              <div className="flex items-center gap-2 mb-2">

                <Flower2
                  size={15}
                  className="text-purple-500"
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-purple-500
                  "
                >
                  {singleWoolen?.category ||
                    "Woolen Bouquet"}
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
                {singleWoolen?.name ||
                  "Beautiful Woolen Bouquet"}
              </h1>

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
                {singleWoolen?.description ||
                  "A beautiful handmade woolen bouquet, carefully crafted to make your special moments even more memorable."}
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

                <div className="flex items-baseline mt-0.5">

                  <span
                    className="
                      text-base
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
                        text-sm
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
                    ? `${stock} woolen bouquets available`
                    : "Currently unavailable"}
                </span>

              </div>

              {/* ============================
                  BUTTONS
              ============================ */}

              <div className="grid grid-cols-2 gap-2 mt-4">

                {/* ADD TO CART */}

                <button
                  type="button"
                  disabled={
                    !isAvailable ||
                    isInCart
                  }
                  onClick={handleAddToCart}
                  className="
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
                    active:scale-[0.98]
                    disabled:bg-gray-100
                    disabled:text-gray-400
                    disabled:cursor-not-allowed
                    transition-all
                    cursor-pointer
                  "
                >
                  <ShoppingCart size={17} />

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
                    h-11
                    rounded-xl
                    bg-purple-500
                    text-white
                    text-sm
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-2
                    hover:bg-purple-600
                    active:scale-[0.98]
                    disabled:bg-gray-100
                    disabled:text-gray-400
                    disabled:cursor-not-allowed
                    transition-all
                    cursor-pointer
                  "
                >
                  <Zap
                    size={17}
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
                  mt-2
                  rounded-xl
                  border
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
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
                  size={17}
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
                    singleWoolen?.occasion
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
              gap-3
              mt-8
              pb-6
            "
          >

            {/* HANDMADE */}

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
                <Flower2
                  size={18}
                  className="text-purple-500"
                />
              </div>

              <div>

                <p className="text-sm font-bold text-gray-800">
                  Handmade
                </p>

                <p className="text-[11px] text-gray-400">
                  Carefully handcrafted
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
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Truck
                  size={18}
                  className="text-pink-500"
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
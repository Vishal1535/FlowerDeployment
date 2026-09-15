import React, { useEffect } from "react";
import {
  ShoppingCart,
  Flower2,
  ArrowRight,
  ArrowLeft,
  Gift,
  Layers,
  Package,
  Box,
  Sparkles,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Occasion } from "./Occasion/Occasion";

import { FlowerInSleeveAddToCart } from "./FloweInSleeve/FlowerInSleeveAddToCart";
import { FlowerAddToCart } from "./Flower/FlowerAddToCart";
import { BouquetAddToCart } from "./Bouquet/BouquetAddToCart";
import { ComboBouquetAddToCart } from "./ComboBouquet/ComboBouquetAddToCart";
import { WoolenAddToCart } from "./Woolen/WoolenAddToCart";
import { FlowerInBoxAddToCart } from "./FlowerInBox/FlowerInBoxAddToCart";

import { GetAllFlowerInSleeveFromCartThunk } from "../../Store/AddToCart/FlowerInSleeve/FlowerInSleeveAddToCartApi";

import { GetAllFlowerFromCartThunk } from "../../Store/AddToCart/FlowerAddToCart/FlowerAddToCartApi";

import { GetAllBouquetFromCartThunk } from "../../Store/AddToCart/BouquetAddToCart/BouquetAddToCartApi";

import { GetAllComboBouquetFromCartThunk } from "../../Store/AddToCart/ComboBouquetAddToCart/ComboBouquetAddToCartApi";

import { GetAllWoolenBouquetFromCartThunk } from "../../Store/AddToCart/WoolenAddToCart/WoolenAddToCartApi";

import { GetAllFlowerInBoxFromCartThunk } from "../../Store/AddToCart/FlowerInBox/FlowerInBoxAddToCartApi";

import { CartSummary } from "./CartSummary";

import { Auth } from "../../Component/Auth/Auth";

export const AddToCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================================
  // FLOWER CART
  // ==========================================

  const {
    flowerFromCart = [],
    loading: flowerLoading,
  } = useSelector(
    (state) => state.FlowerAddToCart
  );

  // ==========================================
  // FLOWER IN SLEEVE CART
  // ==========================================

  const {
    flowerInSleeveFromCart = [],
    loading: flowerInSleeveLoading,
  } = useSelector(
    (state) => state.FlowerInSleeveAddToCart
  );

  // ==========================================
  // BOUQUET CART
  // ==========================================

  const {
    bouquetFromCart = [],
    loading: bouquetLoading,
  } = useSelector(
    (state) => state.BouquetAddToCart
  );

  // ==========================================
  // COMBO BOUQUET CART
  // ==========================================

  const {
    comboBouquetFromCart = [],
    loading: comboBouquetLoading,
  } = useSelector(
    (state) => state.ComboBouquetAddToCart
  );

  // ==========================================
  // WOOLEN BOUQUET CART
  // ==========================================

  const {
    woolenBouquetFromCart = [],
    loading: woolenBouquetLoading,
  } = useSelector(
    (state) => state.WoolenBouquetAddToCart
  );

  // ==========================================
  // FLOWER IN BOX CART
  // ==========================================

  const {
    flowerInBoxFromCart = [],
    loading: flowerInBoxLoading,
  } = useSelector(
    (state) => state.FlowerInBoxAddToCart
  );

  // ==========================================
  // AUTH
  // ==========================================

  const { isAuthorized } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
  // User login nahi hai
  // Ya user admin nahi hai
  if (!isAuthorized) {
    navigate("/", {
      replace: true,
    });
  }
}, [isAuthorized, navigate]);


  // ==========================================
  // GET FLOWERS
  // ==========================================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllFlowerFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ==========================================
  // GET FLOWER IN SLEEVE
  // ==========================================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllFlowerInSleeveFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ==========================================
  // GET BOUQUETS
  // ==========================================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllBouquetFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ==========================================
  // GET COMBO BOUQUETS
  // ==========================================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllComboBouquetFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ==========================================
  // GET WOOLEN BOUQUETS
  // ==========================================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllWoolenBouquetFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ==========================================
  // GET FLOWER IN BOX
  // ==========================================

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllFlowerInBoxFromCartThunk());
    }
  }, [isAuthorized, dispatch]);

  // ==========================================
  // LOADING
  // ==========================================

  const loading =
    flowerLoading ||
    flowerInSleeveLoading ||
    bouquetLoading ||
    comboBouquetLoading ||
    woolenBouquetLoading ||
    flowerInBoxLoading;

  // ==========================================
  // NOT AUTHORIZED
  // ==========================================

  if (!isAuthorized) {
    return (
      <>
        <Auth />

        <main
          className="
            min-h-[80vh]
            bg-gradient-to-br
            from-pink-50
            via-white
            to-rose-50
            flex
            items-center
            justify-center
            px-4
          "
        >
          <div className="text-center max-w-md">

            <div
              className="
                w-20
                h-20
                mx-auto
                rounded-full
                bg-pink-100
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <ShoppingCart
                size={34}
                className="text-pink-500"
              />
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Please login to view your cart items.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="
                mt-6
                px-6
                h-11
                rounded-xl
                bg-gray-900
                text-white
                text-sm
                font-bold
                hover:bg-pink-600
                transition
                cursor-pointer
              "
            >
              Login
            </button>

          </div>
        </main>
      </>
    );
  }

  // ==========================================
  // EMPTY CART
  // ==========================================

  const isCartEmpty =
    flowerFromCart.length === 0 &&
    flowerInSleeveFromCart.length === 0 &&
    bouquetFromCart.length === 0 &&
    comboBouquetFromCart.length === 0 &&
    woolenBouquetFromCart.length === 0 &&
    flowerInBoxFromCart.length === 0;

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (
    loading &&
    flowerFromCart.length === 0 &&
    flowerInSleeveFromCart.length === 0 &&
    bouquetFromCart.length === 0 &&
    comboBouquetFromCart.length === 0 &&
    woolenBouquetFromCart.length === 0 &&
    flowerInBoxFromCart.length === 0
  ) {
    return (
      <>
        <Auth />

        <main className="min-h-[80vh] bg-gray-50 px-4 py-10">

          <div className="max-w-7xl mx-auto">

            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-[minmax(0,1fr)_320px]
                gap-6
                mt-8
              "
            >

              <div className="space-y-4">

                <div className="h-14 bg-white rounded-xl border border-gray-100 animate-pulse" />

                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="
                      h-32
                      rounded-xl
                      bg-white
                      border
                      border-gray-100
                      animate-pulse
                    "
                  />
                ))}

              </div>

              <div
                className="
                  h-72
                  rounded-xl
                  bg-white
                  border
                  border-gray-100
                  animate-pulse
                "
              />

            </div>

          </div>
        </main>
      </>
    );
  }

  // ==========================================
  // EMPTY CART SCREEN
  // ==========================================

  if (isCartEmpty) {
    return (
      <>
        <Auth />

        <main
          className="
            min-h-[80vh]
            bg-gradient-to-br
            from-pink-50
            via-white
            to-rose-50
            flex
            items-center
            justify-center
            px-4
          "
        >

          <div className="text-center max-w-md">

            <div
              className="
                w-20
                h-20
                mx-auto
                rounded-full
                bg-white
                border
                border-pink-100
                shadow-sm
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <Flower2
                size={34}
                className="text-pink-400"
              />
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900">
              Your cart is empty
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Looks like you haven't added any
              flowers, flower sleeves, bouquets,
              combo bouquets, woolen bouquets
              or flower in boxes yet.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                px-6
                h-11
                rounded-xl
                bg-gray-900
                text-white
                text-sm
                font-bold
                hover:bg-pink-600
                transition
                cursor-pointer
              "
            >
              Explore Product
              <ArrowRight size={16} />
            </button>

          </div>

        </main>
      </>
    );
  }

  // ==========================================
  // SECTION HEADING
  // ==========================================

  const SectionHeading = ({
    icon: Icon,
    title,
    subtitle,
  }) => {
    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-pink-100
          bg-white
          shadow-sm
          mb-4
        "
      >

        {/* DECORATIVE BACKGROUND */}

        <div
          className="
            absolute
            -right-8
            -top-8
            w-24
            h-24
            rounded-full
            bg-pink-50
          "
        />

        <div
          className="
            absolute
            -left-8
            -bottom-10
            w-28
            h-28
            rounded-full
            bg-rose-50
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative
            z-10
            px-5
            sm:px-6
            py-4
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-gradient-to-br
              from-pink-500
              to-rose-500
              text-white
              flex
              items-center
              justify-center
              shadow-md
              shadow-pink-200
              shrink-0
            "
          >
            <Icon size={21} />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <h2
                className="
                  text-lg
                  sm:text-xl
                  font-extrabold
                  text-gray-900
                "
              >
                {title}
              </h2>

              <Sparkles
                size={15}
                className="text-pink-400"
              />

            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {subtitle}
            </p>

          </div>

        </div>

      </div>
    );
  };

  // ==========================================
  // MAIN CART
  // ==========================================

  return (
    <>
      <Auth />

      <main className="min-h-screen bg-gray-50">

        {/* ======================================
            HEADER
        ====================================== */}

        <section className="bg-white border-b border-gray-100">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="
                  w-9
                  h-9
                  rounded-full
                  border
                  border-gray-200
                  flex
                  items-center
                  justify-center
                  text-gray-600
                  hover:bg-gray-100
                  hover:text-gray-900
                  transition
                  cursor-pointer
                  shrink-0
                "
              >
                <ArrowLeft size={19} />
              </button>

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <ShoppingCart
                  size={20}
                  className="text-pink-500"
                />
              </div>

              <div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  My Cart
                </h1>

                <p className="text-xs text-gray-400">
                  Your selected products
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ======================================
            CART CONTENT
        ====================================== */}

        <section
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            py-6
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[minmax(0,1fr)_320px]
              gap-6
              items-start
            "
          >

            {/* ==================================
                LEFT
            ================================== */}

            <div
              className="
                min-w-0
                space-y-6
              "
            >

              {/* ==================================
                  OCCASION
              ================================== */}

              <div className="w-full">
                <Occasion />
              </div>


              {/* ==================================
                  FLOWERS
              ================================== */}

              {flowerFromCart.length > 0 && (
                <div className="w-full">

                  <SectionHeading
                    icon={Flower2}
                    title="Flowers"
                    subtitle="Fresh flowers selected for your special moment"
                  />

                  <FlowerAddToCart
                    flowerFromCart={flowerFromCart}
                  />

                </div>
              )}


              {/* ==================================
                  FLOWER IN SLEEVE
              ================================== */}

              {flowerInSleeveFromCart.length > 0 && (
                <div className="w-full">

                  <SectionHeading
                    icon={Flower2}
                    title="Flower In Sleeve"
                    subtitle="Beautifully wrapped flowers ready to gift"
                  />

                  <FlowerInSleeveAddToCart
                    flowerInSleeveFromCart={
                      flowerInSleeveFromCart
                    }
                  />

                </div>
              )}


              {/* ==================================
                  BOUQUETS
              ================================== */}

              {bouquetFromCart.length > 0 && (
                <div className="w-full">

                  <SectionHeading
                    icon={Gift}
                    title="Bouquets"
                    subtitle="Beautiful bouquets made for every occasion"
                  />

                  <BouquetAddToCart
                    bouquetFromCart={bouquetFromCart}
                  />

                </div>
              )}


              {/* ==================================
                  COMBO BOUQUETS
              ================================== */}

              {comboBouquetFromCart.length > 0 && (
                <div className="w-full">

                  <SectionHeading
                    icon={Layers}
                    title="Combo Bouquets"
                    subtitle="Perfect combinations to make your gift extra special"
                  />

                  <ComboBouquetAddToCart
                    comboBouquetFromCart={
                      comboBouquetFromCart
                    }
                  />

                </div>
              )}


              {/* ==================================
                  WOOLEN BOUQUETS
              ================================== */}

              {woolenBouquetFromCart.length > 0 && (
                <div className="w-full">

                  <SectionHeading
                    icon={Package}
                    title="Woolen Bouquets"
                    subtitle="Handcrafted bouquets that last forever"
                  />

                  <WoolenAddToCart
                    woolenBouquetFromCart={
                      woolenBouquetFromCart
                    }
                  />

                </div>
              )}


              {/* ==================================
                  FLOWER IN BOX
              ================================== */}

              {flowerInBoxFromCart.length > 0 && (
                <div className="w-full">

                  <SectionHeading
                    icon={Box}
                    title="Flower In Box"
                    subtitle="Elegant flowers beautifully packed in a box"
                  />

                  <FlowerInBoxAddToCart
                    flowerInBoxFromCart={
                      flowerInBoxFromCart
                    }
                  />

                </div>
              )}

            </div>


            {/* ==================================
                RIGHT SUMMARY
            ================================== */}

            <div className="min-w-0">

              <CartSummary />

            </div>

          </div>

        </section>

      </main>
    </>
  );
};
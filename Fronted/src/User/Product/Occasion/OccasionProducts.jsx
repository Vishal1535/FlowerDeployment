import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Gift,
  Sparkles,
  Flower2,
} from "lucide-react";

import {
  GetAllProductsByOccasionThunk,
} from "../../../Store/ProductData/ProductApi";

import { ComboBouquetProduct } from "./ComboBouquetProduct";
import { Bouquets } from "./Bouquets";
import { Flowers } from "./Flowers";
import { FlowersInBox } from "./FlowersInBox";
import { FlowersInSleeve } from "./FlowersInSleeve";
import { Woolens } from "./Woolens";

import { Auth } from "../../../Component/Auth/Auth";
import { OccasionCategories } from "../../../Component/Hero/OccasionCategories/OccasionCategories";

export const OccasionProducts = () => {
  const { occasion } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    occasionProducts,
    occasionLoading,
    occasionError,
  } = useSelector((state) => state.product);

  // ================= GET PRODUCTS =================

  useEffect(() => {
    if (occasion) {
      dispatch(
        GetAllProductsByOccasionThunk(
          encodeURIComponent(occasion)
        )
      );
    }
  }, [dispatch, occasion]);

  // ================= PRODUCTS =================

  const products = occasionProducts?.products || {};

  const flowers = products.flowers || [];
  const bouquets = products.bouquets || [];
  const comboBouquets = products.comboBouquets || [];
  const flowersInBox = products.flowersInBox || [];
  const flowersInSleeve = products.flowersInSleeve || [];
  const woolens = products.woolens || [];

  const totalProducts =
    flowers.length +
    bouquets.length +
    comboBouquets.length +
    flowersInBox.length +
    flowersInSleeve.length +
    woolens.length;

  const hasProducts = totalProducts > 0;

  // ================= LOADING =================

  if (occasionLoading) {
    return (
      <>
        <Auth />

        <OccasionCategories />

        <main className="min-h-[65vh] bg-white flex items-center justify-center px-4">
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
              "
            >
              <Flower2
                size={25}
                className="text-pink-500 animate-pulse"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Finding something special for you...
            </p>

            <div className="mt-3 flex justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-300 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-300 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-300 animate-bounce [animation-delay:300ms]" />
            </div>

          </div>
        </main>
      </>
    );
  }

  // ================= ERROR =================

  if (occasionError) {
    return (
      <>
        <Auth />

        <OccasionCategories />

        <main className="min-h-[65vh] flex items-center justify-center px-4 bg-white">

          <div className="text-center max-w-md">

            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-pink-50
                flex
                items-center
                justify-center
              "
            >
              <Flower2
                size={28}
                className="text-pink-400"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-800">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {occasionError}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                mt-5
                px-5
                py-2.5
                rounded-full
                bg-gray-900
                text-white
                text-sm
                font-semibold
                hover:bg-pink-600
                transition
                cursor-pointer
              "
            >
              Try Again
            </button>

          </div>

        </main>
      </>
    );
  }

  return (
    <>
      <Auth />

      {/* =====================================================
          OCCASION CATEGORIES
      ===================================================== */}

      <OccasionCategories />

      <main className="w-full bg-white min-h-screen">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden">

          {/* Background decoration */}

          <div
            className="
              absolute
              -top-32
              -right-20
              w-80
              h-80
              rounded-full
              bg-pink-100/60
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-20
              w-80
              h-80
              rounded-full
              bg-rose-100/50
              blur-3xl
            "
          />

          <div
            className="
              relative
              max-w-7xl
              mx-auto
              px-4
              sm:px-6
              lg:px-10
              pt-3
              sm:pt-5
              pb-10
            "
          >

            {/* BACK */}

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-400
                hover:text-pink-600
                transition
                cursor-pointer
                mb-7
              "
            >
              <ArrowLeft size={17} />
              Back
            </button>

            {/* HERO CONTENT */}

            <div
              className="
                relative
                rounded-[2rem]
                border
                border-pink-100
                bg-gradient-to-br
                from-pink-50
                via-white
                to-rose-50
                px-6
                py-8
                sm:px-10
                sm:py-10
                overflow-hidden
              "
            >

              {/* Small decorative flower */}

              <Flower2
                className="
                  absolute
                  -right-4
                  -bottom-5
                  text-pink-100
                  w-32
                  h-32
                  rotate-12
                "
                strokeWidth={1}
              />

              <div className="relative z-10 max-w-3xl">

                {/* LABEL */}

                <div className="flex items-center gap-2 mb-4">

                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-white
                      shadow-sm
                      border
                      border-pink-100
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Gift
                      size={18}
                      className="text-pink-500"
                    />
                  </div>

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-bold
                      uppercase
                      tracking-[0.22em]
                      text-pink-500
                    "
                  >
                    Shop By Occasion
                  </span>

                </div>

                {/* TITLE */}

                <h1
                  className="
                    text-3xl
                    sm:text-4xl
                    lg:text-5xl
                    font-extrabold
                    tracking-tight
                    text-gray-900
                    leading-tight
                    capitalize
                  "
                >
                  Beautiful gifts for{" "}
                  <span className="text-pink-500">
                    {occasion}
                  </span>
                </h1>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-3
                    text-sm
                    sm:text-base
                    text-gray-500
                    leading-7
                    max-w-2xl
                  "
                >
                  Discover flowers, bouquets and thoughtful
                  gifts specially selected to make your{" "}
                  <span className="font-semibold text-gray-700">
                    {occasion}
                  </span>{" "}
                  even more memorable.
                </p>

                {/* PRODUCT COUNT */}

                {hasProducts && (
                  <div className="mt-6 flex items-center gap-2">

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-3.5
                        py-2
                        rounded-full
                        bg-white
                        border
                        border-pink-100
                        shadow-sm
                      "
                    >
                      <Sparkles
                        size={14}
                        className="text-pink-500"
                      />

                      <span className="text-xs font-semibold text-gray-600">
                        {totalProducts}{" "}
                        {totalProducts === 1
                          ? "product"
                          : "products"}{" "}
                        available
                      </span>
                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            PRODUCTS
        ===================================================== */}

        <section
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-10
            pb-20
          "
        >

          {/* FLOWERS */}

          {flowers.length > 0 && (
            <Flowers flowers={flowers} />
          )}

          {/* BOUQUETS */}

          {bouquets.length > 0 && (
            <Bouquets bouquets={bouquets} />
          )}

          {/* COMBO BOUQUETS */}

          {comboBouquets.length > 0 && (
            <ComboBouquetProduct
              comboBouquets={comboBouquets}
            />
          )}

          {/* FLOWERS IN BOX */}

          {flowersInBox.length > 0 && (
            <FlowersInBox
              flowersInBox={flowersInBox}
            />
          )}

          {/* FLOWERS IN SLEEVE */}

          {flowersInSleeve.length > 0 && (
            <FlowersInSleeve
              flowersInSleeve={flowersInSleeve}
            />
          )}

          {/* WOOLENS */}

          {woolens.length > 0 && (
            <Woolens woolens={woolens} />
          )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {!hasProducts && (
            <div className="py-24 text-center">

              <div
                className="
                  w-20
                  h-20
                  mx-auto
                  rounded-2xl
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                "
              >
                <Flower2
                  size={32}
                  className="text-pink-400"
                  strokeWidth={1.5}
                />
              </div>

              <h2
                className="
                  mt-5
                  text-xl
                  font-bold
                  text-gray-800
                "
              >
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                We couldn't find anything for{" "}
                <span className="font-medium text-gray-600 capitalize">
                  {occasion}
                </span>{" "}
                right now.
              </p>

            </div>
          )}

        </section>

      </main>
    </>
  );
};
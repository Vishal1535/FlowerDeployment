import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Bouquets } from "../Occasion/Bouquets";
import { ComboBouquetProduct } from "../Occasion/ComboBouquetProduct";
import { Flowers } from "../Occasion/Flowers";
import { FlowersInBox } from "../Occasion/FlowersInBox";
import { FlowersInSleeve } from "../Occasion/FlowersInSleeve";
import { Woolens } from "../Occasion/Woolens";

import { Auth } from "../../../Component/Auth/Auth";
import { globalSearchThunk } from "../../../Store/ProductData/ProductApi";

export const Search = () => {
  const navigate = useNavigate();

  const {
    searchResults,
    searchLoading,
    searchError,
  } = useSelector((state) => state.product);

  // ================= PRODUCTS =================

  const products = searchResults?.products || [];

  // ================= PRODUCT TYPE FILTER =================

  const flowers = products.filter(
    (product) => product?.productType === "flower"
  );

  const bouquets = products.filter(
    (product) => product?.productType === "bouquet"
  );

  const comboBouquets = products.filter(
    (product) => product?.productType === "comboBouquet"
  );

  const flowersInBox = products.filter(
    (product) => product?.productType === "flowerInBox"
  );

  const flowersInSleeve = products.filter(
    (product) => product?.productType === "flowerInSleeve"
  );

  const woolens = products.filter(
    (product) => product?.productType === "woolen"
  );

 const [searchParams] = useSearchParams();
const dispatch=useDispatch()
const query = searchParams.get("q");

useEffect(() => {
  if (query?.trim()) {
    dispatch(globalSearchThunk(query));
  }
}, [dispatch, query]);

  
  
  
  // ================= LOADING =================

  if (searchLoading) {
    return (
      <>
        <Auth />

        <main className="min-h-[70vh] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-gray-200
                bg-white
                text-sm
                font-semibold
                text-gray-600
                hover:border-pink-300
                hover:bg-pink-50
                hover:text-pink-600
                transition-all
                duration-200
                cursor-pointer
              "
            >
              <ArrowLeft size={17} />
              Back to Home
            </button>
          </div>

          <div className="min-h-[55vh] flex items-center justify-center">
            <div className="text-center">
              <div
                className="
                  w-12
                  h-12
                  mx-auto
                  rounded-full
                  border-4
                  border-pink-100
                  border-t-pink-500
                  animate-spin
                "
              />

              <p className="mt-4 text-sm font-medium text-gray-500">
                Finding the perfect flowers for you...
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  // ================= ERROR =================

  if (searchError) {
    return (
      <>
        <Auth />

        <main className="min-h-[70vh] bg-white px-4">
          <div className="max-w-7xl mx-auto pt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-gray-200
                bg-white
                text-sm
                font-semibold
                text-gray-600
                hover:border-pink-300
                hover:bg-pink-50
                hover:text-pink-600
                transition-all
                duration-200
                cursor-pointer
              "
            >
              <ArrowLeft size={17} />
              Back to Home
            </button>
          </div>

          <div className="min-h-[55vh] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">
                🌸
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                Search failed
              </h2>

              <p className="mt-2 text-sm text-red-500">
                {searchError}
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  // ================= EMPTY =================

  if (!products.length) {
    return (
      <>
        <Auth />

        <main className="min-h-[70vh] bg-white px-4">
          <div className="max-w-7xl mx-auto pt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-gray-200
                bg-white
                text-sm
                font-semibold
                text-gray-600
                hover:border-pink-300
                hover:bg-pink-50
                hover:text-pink-600
                transition-all
                duration-200
                cursor-pointer
              "
            >
              <ArrowLeft size={17} />
              Back to Home
            </button>
          </div>

          <div className="min-h-[55vh] flex items-center justify-center">
            <div className="text-center">
              <div
                className="
                  w-20
                  h-20
                  mx-auto
                  rounded-full
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                  text-4xl
                "
              >
                🔍
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-800">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Try searching for another flower or bouquet.
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  // ================= PRODUCTS PAGE =================

  return (
    <>
      <Auth />

      <main className="min-h-screen bg-white">

        {/* ================= HEADER ================= */}

        <section className="relative overflow-hidden">

          <div
            className="
              absolute
              -top-24
              -right-24
              w-72
              h-72
              rounded-full
              bg-pink-50
              blur-3xl
              opacity-70
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-24
              w-80
              h-80
              rounded-full
              bg-rose-50
              blur-3xl
              opacity-60
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
              pt-6
              sm:pt-8
              pb-8
            "
          >

            {/* BACK BUTTON */}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-gray-200
                bg-white/90
                backdrop-blur-sm
                text-sm
                font-semibold
                text-gray-600
                shadow-sm
                hover:border-pink-300
                hover:bg-pink-50
                hover:text-pink-600
                hover:shadow-md
                transition-all
                duration-200
                cursor-pointer
              "
            >
              <ArrowLeft size={17} />
              Back to Home
            </button>

            {/* HEADER */}

            <div className="max-w-3xl mt-8">

              <p
                className="
                  text-[11px]
                  sm:text-xs
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-pink-500
                "
              >
                Search Results
              </p>

              <h1
                className="
                  mt-2
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-extrabold
                  tracking-tight
                  text-gray-900
                "
              >
                Find something{" "}
                <span className="text-pink-500">
                  beautiful
                </span>
              </h1>

              <p className="mt-3 text-sm sm:text-base text-gray-500">
                We found{" "}
                <span className="font-semibold text-gray-800">
                  {products.length}
                </span>{" "}
                {products.length === 1
                  ? "product"
                  : "products"}{" "}
                matching your search.
              </p>

            </div>

            <div
              className="
                mt-7
                h-px
                bg-gradient-to-r
                from-pink-200
                via-gray-100
                to-transparent
              "
            />

          </div>
        </section>

        {/* ================= RESULTS ================= */}

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

        </section>

      </main>
    </>
  );
};
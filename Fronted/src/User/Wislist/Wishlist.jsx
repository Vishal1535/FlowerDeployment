import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Heart,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { GetAllWishlistThunk } from "../../Store/Whislist/WhislistApi";

import { Flower } from "./Flower/Flower";
import { Bouquet } from "./Bouquet/Bouquet";
import { ComboBouquet } from "./ComboBouquet/ComboBouquet";
import { FlowerInBox } from "./FlowerInBox/FlowerInBox";
import { FlowerInSleeve } from "./FlowerInSleeve/FlowerInSleeve";
import { Woolen } from "./Woolen/Woolen";

import { Auth } from "../../Component/Auth/Auth";

export const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    flowerWishlist = [],
    bouquetWishlist = [],
    comboBouquetWishlist = [],
    flowerInBoxWishlist = [],
    flowerInSleeveWishlist = [],
    woolenWishlist = [],
    wishlistLoading,
  } = useSelector((state) => state.wishlist);

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthorized) {
      dispatch(GetAllWishlistThunk());
    }
  }, [dispatch, isAuthorized]);

  const totalWishlist =
    flowerWishlist.length +
    bouquetWishlist.length +
    comboBouquetWishlist.length +
    flowerInBoxWishlist.length +
    flowerInSleeveWishlist.length +
    woolenWishlist.length;

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-white">

        {/* TOP */}

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-6">

          <button
            onClick={() => navigate("/")}
            className="
              group
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              hover:text-pink-600
              transition
              cursor-pointer
            "
          >
            <span
              className="
                w-9
                h-9
                rounded-full
                border
                border-gray-200
                flex
                items-center
                justify-center
                group-hover:bg-pink-50
                group-hover:border-pink-200
                transition
              "
            >
              <ArrowLeft size={17} />
            </span>

            Back to Home
          </button>

        </div>

        {/* LOGIN */}

        <div
          className="
            min-h-[75vh]
            flex
            items-center
            justify-center
            px-5
          "
        >

          <div className="text-center max-w-md">

            <div
              className="
                relative
                w-24
                h-24
                mx-auto
                rounded-full
                bg-pink-50
                flex
                items-center
                justify-center
              "
            >
              <Heart
                size={40}
                className="text-pink-500"
                fill="currentColor"
              />

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  w-7
                  h-7
                  rounded-full
                  bg-white
                  shadow-sm
                  flex
                  items-center
                  justify-center
                "
              >
                <Sparkles
                  size={13}
                  className="text-pink-500"
                />
              </span>
            </div>

            <p
              className="
                mt-6
                text-[11px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-pink-500
              "
            >
              Your Collection
            </p>

            <h1
              className="
                mt-2
                text-3xl
                sm:text-4xl
                font-extrabold
                text-gray-900
              "
            >
              Your Wishlist
            </h1>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-gray-400
              "
            >
              Login to save your favourite flowers,
              bouquets and gifts in one beautiful place.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                h-11
                px-7
                rounded-full
                bg-gray-900
                text-white
                text-sm
                font-semibold
                hover:bg-pink-600
                transition
                cursor-pointer
                shadow-sm
              "
            >
              <Heart size={16} />
              Login to Continue
            </button>

          </div>

        </div>

      </main>
    );
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (wishlistLoading) {
    return (
      <>
        {/* AUTH */}

        <Auth />

        <main className="min-h-screen bg-white">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-6">

            <button
              onClick={() => navigate("/")}
              className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-500
                hover:text-pink-600
                transition
                cursor-pointer
              "
            >
              <span
                className="
                  w-9
                  h-9
                  rounded-full
                  border
                  border-gray-200
                  flex
                  items-center
                  justify-center
                "
              >
                <ArrowLeft size={17} />
              </span>

              Back to Home
            </button>

          </div>

          <div
            className="
              min-h-[70vh]
              flex
              items-center
              justify-center
            "
          >

            <div className="text-center">

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
                  animate-pulse
                "
              >
                <Heart
                  size={28}
                  className="text-pink-400"
                  fill="currentColor"
                />
              </div>

              <p
                className="
                  mt-4
                  text-sm
                  font-medium
                  text-gray-500
                "
              >
                Loading your wishlist...
              </p>

            </div>

          </div>

        </main>
      </>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <>
      {/* =================================================
          AUTH - TOP
      ================================================= */}

      {isAuthorized && <Auth />}

      <main
        className="
          min-h-screen
          bg-gradient-to-b
          from-pink-50/50
          via-white
          to-white
        "
      >

        {/* =================================================
            BACK
        ================================================= */}

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            pt-6
          "
        >

          <button
            onClick={() => navigate("/")}
            className="
              group
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              hover:text-pink-600
              transition
              cursor-pointer
            "
          >

            <span
              className="
                w-9
                h-9
                rounded-full
                bg-white
                border
                border-gray-200
                shadow-sm
                flex
                items-center
                justify-center
                group-hover:bg-pink-50
                group-hover:border-pink-200
                transition
              "
            >
              <ArrowLeft size={17} />
            </span>

            Back to Home

          </button>

        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <section
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            pt-7
            pb-9
          "
        >

          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              bg-white
              border
              border-pink-100
              shadow-sm
              px-6
              py-7
              sm:px-9
              sm:py-8
            "
          >

            {/* DECORATIVE CIRCLES */}

            <div
              className="
                absolute
                -right-20
                -top-24
                w-56
                h-56
                rounded-full
                bg-pink-50
              "
            />

            <div
              className="
                absolute
                -left-20
                -bottom-24
                w-52
                h-52
                rounded-full
                bg-rose-50/70
              "
            />

            <div
              className="
                relative
                z-10
                flex
                items-center
                justify-between
                gap-6
              "
            >

              {/* TITLE */}

              <div>

                <div className="flex items-center gap-2">

                  <span
                    className="
                      w-7
                      h-7
                      rounded-full
                      bg-pink-50
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Sparkles
                      size={14}
                      className="text-pink-500"
                    />
                  </span>

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-pink-500
                    "
                  >
                    Saved With Love
                  </span>

                </div>

                <h1
                  className="
                    mt-2
                    text-3xl
                    sm:text-4xl
                    font-extrabold
                    tracking-tight
                    text-gray-900
                  "
                >
                  My Wishlist
                </h1>

                <p
                  className="
                    mt-2
                    text-sm
                    text-gray-500
                  "
                >
                  Everything you love, all in one place.
                </p>

              </div>

              {/* COUNT */}

              <div
                className="
                  hidden
                  sm:flex
                  shrink-0
                  w-20
                  h-20
                  rounded-2xl
                  bg-pink-50
                  border
                  border-pink-100
                  flex-col
                  items-center
                  justify-center
                "
              >

                <Heart
                  size={18}
                  className="text-pink-500"
                  fill="currentColor"
                />

                <span
                  className="
                    mt-1
                    text-xl
                    font-extrabold
                    text-gray-900
                  "
                >
                  {totalWishlist}
                </span>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-wider
                    font-semibold
                    text-gray-400
                  "
                >
                  Items
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            pb-16
          "
        >

          {/* =================================================
              EMPTY
          ================================================= */}

          {totalWishlist === 0 ? (

            <div
              className="
                min-h-[45vh]
                rounded-[28px]
                bg-white
                border
                border-dashed
                border-pink-200
                flex
                items-center
                justify-center
                px-5
              "
            >

              <div
                className="
                  text-center
                  max-w-sm
                "
              >

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
                  <Heart
                    size={35}
                    className="text-pink-300"
                  />
                </div>

                <h2
                  className="
                    mt-5
                    text-xl
                    font-extrabold
                    text-gray-900
                  "
                >
                  Your Wishlist is Empty
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-400
                  "
                >
                  Discover beautiful flowers and gifts
                  and save the ones you love.
                </p>

                <button
                  onClick={() => navigate("/")}
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    h-10
                    px-5
                    rounded-full
                    bg-gray-900
                    text-white
                    text-xs
                    font-bold
                    hover:bg-pink-600
                    transition
                    cursor-pointer
                  "
                >
                  <ShoppingBag size={15} />
                  Explore Collection
                </button>

              </div>

            </div>

          ) : (

            /* =================================================
                WISHLIST
            ================================================= */

            <div className="space-y-12">

              {flowerWishlist.length > 0 && (
                <WishlistSection
                  title="Flowers"
                  count={flowerWishlist.length}
                >
                  <Flower item={flowerWishlist} />
                </WishlistSection>
              )}

              {bouquetWishlist.length > 0 && (
                <WishlistSection
                  title="Bouquets"
                  count={bouquetWishlist.length}
                >
                  <Bouquet item={bouquetWishlist} />
                </WishlistSection>
              )}

              {comboBouquetWishlist.length > 0 && (
                <WishlistSection
                  title="Combo Bouquets"
                  count={comboBouquetWishlist.length}
                >
                  <ComboBouquet
                    item={comboBouquetWishlist}
                  />
                </WishlistSection>
              )}

              {flowerInBoxWishlist.length > 0 && (
                <WishlistSection
                  title="Flowers in Box"
                  count={flowerInBoxWishlist.length}
                >
                  <FlowerInBox
                    item={flowerInBoxWishlist}
                  />
                </WishlistSection>
              )}

              {flowerInSleeveWishlist.length > 0 && (
                <WishlistSection
                  title="Flowers in Sleeve"
                  count={flowerInSleeveWishlist.length}
                >
                  <FlowerInSleeve
                    item={flowerInSleeveWishlist}
                  />
                </WishlistSection>
              )}

              {woolenWishlist.length > 0 && (
                <WishlistSection
                  title="Woolen Gifts"
                  count={woolenWishlist.length}
                >
                  <Woolen
                    item={woolenWishlist}
                  />
                </WishlistSection>
              )}

            </div>

          )}

        </section>

      </main>
    </>
  );
};


// =====================================================
// WISHLIST SECTION
// =====================================================

const WishlistSection = ({
  title,
  count,
  children,
}) => {
  return (
    <section>

      {/* SECTION HEADER */}

      <div
        className="
          flex
          items-center
          gap-3
          sm:gap-4
          mb-5
        "
      >

        <div
          className="
            flex
            items-center
            gap-2.5
            sm:gap-3
            shrink-0
          "
        >

          <span
            className="
              w-1.5
              h-6
              rounded-full
              bg-pink-500
            "
          />

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

          <span
            className="
              min-w-7
              h-7
              px-2
              rounded-full
              bg-pink-50
              border
              border-pink-100
              text-pink-600
              text-xs
              font-bold
              flex
              items-center
              justify-center
            "
          >
            {count}
          </span>

        </div>

        <div
          className="
            h-px
            flex-1
            bg-gradient-to-r
            from-gray-200
            to-transparent
          "
        />

      </div>

      {children}

    </section>
  );
};
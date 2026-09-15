
import React from "react";
import {
  ArrowLeft,
  Flower2,
  Heart,
  Sparkles,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffafa] text-gray-800">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden">

        {/* Decorative Background */}

        <div
          className="
            absolute
            -top-24
            -left-24
            w-72
            h-72
            rounded-full
            bg-pink-100/60
            blur-2xl
          "
        />

        <div
          className="
            absolute
            -bottom-28
            -right-24
            w-80
            h-80
            rounded-full
            bg-rose-100/50
            blur-2xl
          "
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

          {/* Back */}

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
            Back
          </button>

          {/* Hero Content */}

          <div
            className="
              grid
              lg:grid-cols-2
              gap-10
              items-center
              min-h-[480px]
              py-10
            "
          >

            {/* LEFT */}

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-pink-50
                  border
                  border-pink-100
                  text-pink-600
                  text-sm
                  font-semibold
                  mb-5
                "
              >
                <Flower2 size={16} />
                About Flower
              </div>

              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  font-extrabold
                  leading-tight
                  text-gray-900
                "
              >
                Flowers that make
                <span className="block text-pink-500">
                  moments beautiful.
                </span>
              </h1>

              <p
                className="
                  mt-5
                  text-gray-500
                  leading-7
                  max-w-xl
                  text-sm
                  sm:text-base
                "
              >
                At Flower, we believe that every special moment
                deserves something beautiful. We bring together
                fresh flowers, thoughtful bouquets and elegant
                gifts to make your celebrations more memorable.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="
                    px-6
                    h-11
                    rounded-xl
                    bg-gray-900
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-pink-600
                    hover:-translate-y-0.5
                    transition-all
                    duration-200
                    cursor-pointer
                  "
                >
                  Explore Flowers
                </button>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    px-5
                    h-11
                    rounded-xl
                    bg-white
                    border
                    border-gray-200
                    text-sm
                    text-gray-600
                  "
                >
                  <Heart
                    size={16}
                    className="text-pink-500"
                    fill="currentColor"
                  />
                  Made with love
                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="relative">

              <div
                className="
                  relative
                  h-[360px]
                  sm:h-[420px]
                  rounded-[32px]
                  bg-gradient-to-br
                  from-pink-50
                  via-rose-50
                  to-white
                  border
                  border-pink-100
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                  shadow-sm
                "
              >

                {/* Decorative circles */}

                <div
                  className="
                    absolute
                    -top-16
                    -right-16
                    w-48
                    h-48
                    rounded-full
                    bg-white/70
                  "
                />

                <div
                  className="
                    absolute
                    -bottom-20
                    -left-16
                    w-56
                    h-56
                    rounded-full
                    bg-pink-100/50
                  "
                />

                {/* Flower */}

                <div
                  className="
                    relative
                    z-10
                    text-[145px]
                    sm:text-[175px]
                    leading-none
                    animate-[float_3s_ease-in-out_infinite]
                  "
                >
                  💐
                </div>

                {/* Small floating card */}

                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                    z-20
                    bg-white/90
                    backdrop-blur
                    rounded-2xl
                    px-4
                    py-3
                    shadow-lg
                    border
                    border-white
                  "
                >
                  <p className="text-xs text-gray-400">
                    Our promise
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    Fresh • Beautiful • Thoughtful
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          OUR STORY
      ===================================================== */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Story */}

          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                font-bold
                text-pink-500
                mb-3
              "
            >
              Our Story
            </p>

            <h2
              className="
                text-3xl
                sm:text-4xl
                font-extrabold
                text-gray-900
              "
            >
              More than just flowers.
            </h2>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-gray-500
              "
            >
              Flower was created with a simple idea — gifting
              should feel personal, beautiful and effortless.
              Whether it is a birthday, anniversary, celebration
              or simply a way to say thank you, we help you find
              something that expresses your feelings.
            </p>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-gray-500
              "
            >
              From carefully selected flowers to thoughtfully
              designed bouquets and gifts, every product is
              chosen with attention to quality and presentation.
            </p>

          </div>

          {/* Highlight */}

          <div
            className="
              rounded-3xl
              bg-white
              border
              border-gray-100
              shadow-sm
              p-6
              sm:p-8
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-pink-50
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <Sparkles
                size={23}
                className="text-pink-500"
              />
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              Every bouquet tells a story.
            </h3>

            <p className="text-sm text-gray-500 leading-6 mt-3">
              We focus on making your gifting experience
              simple from choosing your flowers to receiving
              them at your doorstep.
            </p>

            <div
              className="
                mt-6
                h-px
                bg-gray-100
              "
            />

            <div className="flex items-center gap-3 mt-5">

              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                "
              >
                🌸
              </div>

              <div>
                <p className="text-sm font-bold text-gray-800">
                  Thoughtful gifting
                </p>

                <p className="text-xs text-gray-400">
                  Made for every special moment
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="bg-white border-y border-gray-100">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

          <div className="text-center mb-10">

            <p
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                font-bold
                text-pink-500
              "
            >
              Why Choose Us
            </p>

            <h2
              className="
                text-3xl
                sm:text-4xl
                font-extrabold
                text-gray-900
                mt-2
              "
            >
              Made with care
            </h2>

          </div>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-4
            "
          >

            {/* Fresh */}

            <div
              className="
                p-5
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-sm
                hover:-translate-y-1
                hover:shadow-md
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                "
              >
                <Flower2
                  size={20}
                  className="text-pink-500"
                />
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                Fresh Flowers
              </h3>

              <p className="text-xs text-gray-400 mt-2 leading-5">
                Carefully selected flowers for beautiful
                arrangements.
              </p>

            </div>

            {/* Delivery */}

            <div
              className="
                p-5
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-sm
                hover:-translate-y-1
                hover:shadow-md
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-purple-50
                  flex
                  items-center
                  justify-center
                "
              >
                <Truck
                  size={20}
                  className="text-purple-500"
                />
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                Easy Delivery
              </h3>

              <p className="text-xs text-gray-400 mt-2 leading-5">
                Convenient delivery designed to make gifting
                easier.
              </p>

            </div>

            {/* Quality */}

            <div
              className="
                p-5
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-sm
                hover:-translate-y-1
                hover:shadow-md
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-green-50
                  flex
                  items-center
                  justify-center
                "
              >
                <ShieldCheck
                  size={20}
                  className="text-green-500"
                />
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                Quality Assured
              </h3>

              <p className="text-xs text-gray-400 mt-2 leading-5">
                Quality products selected with care and
                attention.
              </p>

            </div>

            {/* Love */}

            <div
              className="
                p-5
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-sm
                hover:-translate-y-1
                hover:shadow-md
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-rose-50
                  flex
                  items-center
                  justify-center
                "
              >
                <Heart
                  size={20}
                  className="text-rose-500"
                  fill="currentColor"
                />
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                Made with Love
              </h3>

              <p className="text-xs text-gray-400 mt-2 leading-5">
                Every order is prepared with care for your
                special moments.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

        <div
          className="
            rounded-3xl
            bg-gradient-to-r
            from-pink-50
            to-rose-50
            border
            border-pink-100
            p-8
            sm:p-10
            text-center
          "
        >

          <div className="text-4xl">
            🌷
          </div>

          <h2
            className="
              text-2xl
              sm:text-3xl
              font-extrabold
              text-gray-900
              mt-3
            "
          >
            Make someone's day beautiful.
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Explore our flowers and find something special.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              mt-6
              px-7
              h-11
              rounded-xl
              bg-gray-900
              text-white
              text-sm
              font-semibold
              hover:bg-pink-600
              hover:-translate-y-0.5
              transition-all
              duration-200
              cursor-pointer
            "
          >
            Start Shopping
          </button>

        </div>

      </section>

    </div>
  );
};


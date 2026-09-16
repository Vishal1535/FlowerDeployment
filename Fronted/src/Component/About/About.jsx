import React from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-900">
      {/* Top Bar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={handleBack}
            className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition active:scale-95 hover:border-pink-300 hover:text-pink-600"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            
            {/* Text */}
            <div className="text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-sm">
                About Us
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Flowers that speak
                <span className="block text-pink-600">
                  from the heart.
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:mx-0 lg:text-lg">
                We believe every flower carries an emotion. Our goal is to
                make it easy for you to share love, happiness, gratitude and
                beautiful memories through thoughtful bouquets.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-8">
                <a
                  href="/"
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-pink-600 px-4 text-sm font-semibold text-white transition hover:bg-pink-700 active:scale-[0.98] sm:h-12"
                >
                  Explore Bouquets
                </a>

                <a
                  href="/contact"
                  className="flex h-11 w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-800 transition hover:border-pink-300 hover:text-pink-600 active:scale-[0.98] sm:h-12"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Visual */}
            <div className="mx-auto w-full max-w-sm lg:max-w-md">
              <div className="rounded-[2rem] border border-pink-100 bg-white p-3 shadow-lg shadow-pink-100/50 sm:p-4">
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-pink-100 via-rose-50 to-white px-5 py-8 text-center sm:min-h-[400px]">
                  
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-md sm:h-24 sm:w-24 sm:text-5xl">
                    💐
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
                    Made with Love
                  </h2>

                  <p className="mt-3 max-w-xs text-sm leading-6 text-gray-600 sm:text-base">
                    Beautiful bouquets created to make your special moments
                    even more memorable.
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs font-semibold text-pink-600 sm:text-sm">
                    <span>Fresh</span>
                    <span>•</span>
                    <span>Beautiful</span>
                    <span>•</span>
                    <span>Thoughtful</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-sm">
              Our Story
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-4xl">
              More than just a bouquet
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              Flowers have a beautiful way of expressing emotions without
              needing many words. We created our store to help people find
              something meaningful for every occasion.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl">
                🌸
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                Beautiful Designs
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Elegant flower arrangements designed for different occasions
                and special moments.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-2xl">
                🎁
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                Perfect Gifts
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Find something special for birthdays, anniversaries,
                celebrations and surprises.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 sm:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl">
                ❤️
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                Made with Care
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Every order is prepared with attention to detail and
                thoughtful presentation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-sm">
                Why Choose Us
              </p>

              <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl">
                A little beauty can make a big difference.
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                We focus on giving you a simple and enjoyable flower shopping
                experience from choosing your bouquet to receiving it.
              </p>

              <div className="mt-7 space-y-5">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-bold text-pink-600 shadow-sm">
                    ✓
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                      Thoughtful Collections
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                      Different bouquets and gifting options for every
                      occasion.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-bold text-pink-600 shadow-sm">
                    ✓
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                      Easy Shopping
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                      Browse and choose your favourite bouquet with ease.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-bold text-pink-600 shadow-sm">
                    ✓
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                      Special Moments
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                      Helping you make ordinary days a little more special.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7">
                <p className="text-3xl font-bold text-pink-600 sm:text-4xl">
                  💐
                </p>
                <p className="mt-3 text-sm font-semibold text-gray-900">
                  Beautiful
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Flower Designs
                </p>
              </div>

              <div className="mt-5 rounded-2xl bg-pink-600 p-5 text-white shadow-sm sm:mt-8 sm:rounded-3xl sm:p-7">
                <p className="text-3xl font-bold sm:text-4xl">❤️</p>
                <p className="mt-3 text-sm font-semibold">
                  Made with Love
                </p>
                <p className="mt-1 text-xs text-pink-100">
                  For Every Moment
                </p>
              </div>

              <div className="-mt-2 rounded-2xl bg-gray-900 p-5 text-white shadow-sm sm:-mt-4 sm:rounded-3xl sm:p-7">
                <p className="text-3xl font-bold sm:text-4xl">🎁</p>
                <p className="mt-3 text-sm font-semibold">
                  Perfect Gifts
                </p>
                <p className="mt-1 text-xs text-gray-300">
                  For Special People
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7">
                <p className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  ✨
                </p>
                <p className="mt-3 text-sm font-semibold text-gray-900">
                  Special Moments
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Worth Remembering
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-10 text-center shadow-xl shadow-pink-100 sm:px-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-100 sm:text-sm">
            Make Someone Smile
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
            Find something beautiful today.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-pink-50 sm:text-base">
            Choose a beautiful bouquet and turn your feelings into a gift
            they'll remember.
          </p>

          <a
            href="/"
            className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-pink-600 transition hover:bg-pink-50 active:scale-[0.98] sm:h-12 sm:px-7"
          >
            Shop Bouquets
          </a>
        </div>
      </section>
    </div>
  );
};
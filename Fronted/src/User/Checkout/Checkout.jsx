
import React from "react";
import {
  ArrowLeft,
  Flower2,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { CheckoutAddress } from "./CheckoutAddress";
import { CheckoutProducts } from "./CheckoutProducts";
import { CheckoutSummary } from "./CheckoutSummary";

export const Checkout = () => {
  const navigate = useNavigate();

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  // =========================================
  // NOT LOGGED IN
  // =========================================

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-rose-50/60">

      {/* =========================================
          NAVBAR
      ========================================= */}

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-16 flex items-center justify-between">

            {/* LEFT */}

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="
                  w-9
                  h-9
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-gray-600
                  hover:bg-pink-50
                  hover:text-pink-600
                  hover:border-pink-200
                  transition-all
                  cursor-pointer
                "
              >
                <ArrowLeft size={18} />
              </button>

              {/* LOGO */}

              <div className="flex items-center gap-2">

                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-gradient-to-br
                    from-pink-500
                    to-rose-500
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-sm
                  "
                >
                  <Flower2 size={19} />
                </div>

                <div className="hidden sm:block">

                  <h1 className="text-base font-black text-gray-800 leading-none">
                    Flower
                  </h1>

                  <p className="text-[10px] text-pink-500 font-semibold mt-0.5">
                    Make moments beautiful
                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-2">

              <ShieldCheck
                size={17}
                className="text-green-500"
              />

              <span className="hidden sm:block text-xs font-semibold text-gray-500">
                Secure Checkout
              </span>

            </div>

          </div>

        </div>

      </header>

      {/* =========================================
          MAIN
      ========================================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">

        {/* =========================================
            TITLE
        ========================================= */}

        <div className="mb-7">

          <div className="flex items-center gap-2 text-pink-500 mb-2">

            <ShoppingBag size={19} />

            <span className="text-xs font-bold uppercase tracking-wider">
              Checkout
            </span>

          </div>

          <h2
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-black
              text-gray-800
            "
          >
            Complete Your Order
          </h2>

          <p className="mt-2 text-sm text-gray-500 max-w-xl">
            Confirm your delivery address, review your products
            and check your final order amount.
          </p>

        </div>

        {/* =========================================
            CHECKOUT GRID
        ========================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* =====================================
              LEFT SIDE
          ===================================== */}

          <div className="lg:col-span-2 space-y-6">

            {/* =================================
                ADDRESS
            ================================= */}

            <section
              className="
                bg-white
                rounded-3xl
                border
                border-pink-100
                shadow-[0_8px_30px_rgba(236,72,153,0.06)]
                overflow-hidden
              "
            >

              {/* SECTION HEADER */}

              <div
                className="
                  px-5
                  sm:px-6
                  py-4
                  bg-gradient-to-r
                  from-pink-50
                  to-rose-50/60
                  border-b
                  border-pink-100
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-white
                      text-pink-500
                      flex
                      items-center
                      justify-center
                      shadow-sm
                    "
                  >
                    <span className="text-lg">
                      📍
                    </span>
                  </div>

                  <div>

                    <h3 className="text-base font-extrabold text-gray-800">
                      Delivery Address
                    </h3>

                    <p className="text-xs text-gray-400 mt-0.5">
                      Where should we deliver your order?
                    </p>

                  </div>

                </div>

              </div>

              {/* ADDRESS CONTENT */}

              <div className="p-4 sm:p-6">
                <CheckoutAddress />
              </div>

            </section>

            {/* =================================
                PRODUCTS
            ================================= */}

            <section
              className="
                bg-white
                rounded-3xl
                border
                border-pink-100
                shadow-[0_8px_30px_rgba(236,72,153,0.06)]
                overflow-hidden
              "
            >

              {/* SECTION HEADER */}

        

              {/* PRODUCTS */}

              <div>
                <CheckoutProducts />
              </div>

            </section>

          </div>

          {/* =====================================
              RIGHT SIDE
          ===================================== */}

          <div className="lg:col-span-1">

            <div className="lg:sticky lg:top-24">

              <section
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-pink-100
                  shadow-[0_10px_35px_rgba(236,72,153,0.09)]
                  overflow-hidden
                "
              >

                {/* SUMMARY HEADER */}

                <div
                  className="
                    px-5
                    py-5
                    bg-gradient-to-br
                    from-pink-500
                    via-rose-500
                    to-pink-600
                    text-white
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-white/20
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <ShoppingBag size={20} />
                    </div>

                    <div>

                      <h3 className="text-base font-extrabold">
                        Order Summary
                      </h3>

                      <p className="text-[11px] text-pink-100 mt-0.5">
                        Your final order details
                      </p>

                    </div>

                  </div>

                </div>

                {/* SUMMARY */}

                <div className="p-4 sm:p-5">
                  <CheckoutSummary />
                </div>

              </section>

            </div>

          </div>

        </div>

        {/* =========================================
            SECURITY NOTE
        ========================================= */}

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">

          <ShieldCheck
            size={15}
            className="text-green-500"
          />

          <span>
            Your order information is safe and secure.
          </span>

        </div>

      </main>

    </div>
  );
};


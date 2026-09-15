import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
  removeSingleProduct,
} from "../../Store/BuySingleProduct/ButSingleProductSlice";
import { BuySingleProductCheckout } from "./BuySingleProductCheckout";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const ButSingleProductSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProduct, quantity, totalPrice } = useSelector(
    (state) => state.BuySingleProduct,
  );

  const price = singleProduct?.price || 0;
  const discountPrice = singleProduct?.discountPrice || 0;

  const hasDiscount = discountPrice > 0 && discountPrice < price;

  const finalPrice = hasDiscount ? discountPrice : price;

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="bg-white border-b border-gray-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition"
            >
              <ArrowLeft size={19} />

              <span className="text-sm font-semibold">
                Back
              </span>
            </button>

            <div className="flex items-center gap-2 text-gray-400">
              <ShieldCheck size={17} />

              <span className="text-xs sm:text-sm">
                Secure Checkout
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* =====================================================
            CHECKOUT PROGRESS
        ===================================================== */}

        <div className="max-w-3xl mx-auto mb-10">

          <div className="flex items-center">

            {/* PRODUCT */}

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Check size={18} strokeWidth={3} />
              </div>

              <span className="hidden sm:block text-sm font-semibold text-green-600">
                Product
              </span>

            </div>

            <div className="flex-1 h-[2px] bg-green-400 mx-3" />

            {/* ADDRESS */}

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Check size={18} strokeWidth={3} />
              </div>

              <span className="hidden sm:block text-sm font-semibold text-green-600">
                Address
              </span>

            </div>

            <div className="flex-1 h-[2px] bg-pink-300 mx-3" />

            {/* CHECKOUT */}

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-md shadow-pink-200">
                <span className="text-sm font-bold">
                  3
                </span>
              </div>

              <span className="text-sm font-bold text-pink-600">
                Checkout
              </span>

            </div>

          </div>

        </div>

        {/* =====================================================
            TITLE
        ===================================================== */}

        <div className="mb-8">

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Complete Your Order
          </h1>

          <p className="text-gray-500 mt-2">
            Review your product and complete the payment.
          </p>

        </div>

        {/* =====================================================
            MAIN LAYOUT
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* =================================================
              LEFT PRODUCT SECTION
          ================================================= */}

          <div className="lg:col-span-7">

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

              {/* SECTION HEADER */}

              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                    <ShoppingBag size={20} />
                  </div>

                  <div>

                    <h2 className="font-bold text-gray-900">
                      Your Product
                    </h2>

                    <p className="text-xs text-gray-400 mt-1">
                      1 product selected
                    </p>

                  </div>

                </div>

              </div>

              {/* PRODUCT CARD */}

              <div className="p-6">

                <div className="flex flex-col sm:flex-row gap-6">

                  {/* IMAGE */}

                  <div className="w-full sm:w-52 h-52 rounded-2xl overflow-hidden bg-pink-50 flex-shrink-0">

                    <img
                      src={singleProduct?.image}
                      alt={singleProduct?.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* DETAILS */}

                  <div className="flex-1 flex flex-col">

                    <span className="text-xs uppercase tracking-widest font-bold text-pink-500">
                      Flower
                    </span>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">
                      {singleProduct?.name || "Product"}
                    </h2>

                    <div className="flex items-center gap-3 mt-4">

                      <span className="text-2xl font-extrabold text-gray-900">
                        ₹{finalPrice}
                      </span>

                      {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{price}
                        </span>
                      )}

                    </div>

                    {hasDiscount && (
                      <span className="mt-2 w-fit text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                        Special Discount Applied
                      </span>
                    )}

                    {/* QUANTITY */}

                    <div className="mt-auto pt-7">

                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Quantity
                      </p>

                      <div className="flex items-center justify-between">

                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">

                          <button
                            type="button"
                            onClick={() =>
                              dispatch(decrementQuantity())
                            }
                            disabled={quantity <= 1}
                            className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600 disabled:opacity-30 transition"
                          >
                            <Minus size={17} />
                          </button>

                          <div className="w-12 h-11 flex items-center justify-center font-bold text-gray-900 border-x border-gray-200">
                            {quantity}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              dispatch(incrementQuantity())
                            }
                            disabled={
                              quantity >=
                              (singleProduct?.stock || 0)
                            }
                            className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600 disabled:opacity-30 transition"
                          >
                            <Plus size={17} />
                          </button>

                        </div>

                        <span className="text-sm text-gray-400">
                          {singleProduct?.stock || 0} available
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                {/* DELIVERY INFO */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">

                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-pink-500">
                      <Truck size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Secure Delivery
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        Carefully packed & delivered
                      </p>
                    </div>

                  </div>

                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-green-500">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Safe Payment
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        Your payment is protected
                      </p>
                    </div>

                  </div>

                </div>

                {/* REMOVE */}

                <button
                  type="button"
                  onClick={() => {
                    dispatch(removeSingleProduct());
                    navigate("/");
                  }}
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 size={16} />
                  Remove Product
                </button>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT CHECKOUT
          ================================================= */}

          <div className="lg:col-span-5">

            <div className="lg:sticky lg:top-6">

              <BuySingleProductCheckout />

            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM TRUST
        ===================================================== */}

        <div className="mt-8 text-center">

          <p className="text-xs text-gray-400">
            Your order details are securely processed.
          </p>

        </div>

      </div>
    </div>
  );
};
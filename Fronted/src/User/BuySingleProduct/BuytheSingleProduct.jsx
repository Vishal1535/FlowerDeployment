import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  PackageCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  incrementQuantity,
  decrementQuantity,
  removeSingleProduct,
  clearSingleProduct,
} from "../../Store/BuySingleProduct/ButSingleProductSlice";

export const BuytheSingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProduct, quantity, totalPrice } = useSelector(
    (state) => state.BuySingleProduct,
  );

  // ============================
  // NO PRODUCT
  // ============================

  if (!singleProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-full
              bg-pink-50
              flex
              items-center
              justify-center
            "
          >
            <ShoppingBag size={28} className="text-pink-500" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No product selected
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Please select a product to continue.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              px-5
              h-10
              rounded-xl
              bg-pink-500
              hover:bg-pink-600
              text-white
              text-sm
              font-semibold
              transition
              cursor-pointer
            "
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ============================
  // PRICE
  // ============================

  const price = singleProduct?.price || 0;

  const discountPrice = singleProduct?.discountPrice || 0;

  const hasDiscount = discountPrice > 0 && discountPrice < price;

  const finalPrice = hasDiscount ? discountPrice : price;

  // ============================
  // REMOVE
  // ============================

  const handleRemove = () => {
    dispatch(removeSingleProduct());
    navigate(-1);
  };

  // ============================
  // CLEAR + BACK
  // ============================

  const handleBack = () => {
    dispatch(clearSingleProduct());
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/60 via-white to-rose-50/50">
      {/* ============================
          HEADER
      ============================ */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <button
          type="button"
          onClick={handleBack}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-gray-500
            hover:text-pink-600
            transition
            cursor-pointer
          "
        >
          <ArrowLeft size={18} />
          Back to Product
        </button>
      </div>

      {/* ============================
          MAIN
      ============================ */}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* STEP INDICATOR */}

        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-pink-500
                  text-white
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                "
              >
                1
              </div>

              <span className="text-sm font-bold text-pink-600">Product</span>
            </div>

            <div className="w-8 sm:w-14 h-px bg-gray-200" />

            <div className="flex items-center gap-2">
              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-gray-100
                  text-gray-400
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                "
              >
                2
              </div>

              <span className="hidden sm:block text-sm font-medium text-gray-400">
                Address
              </span>
            </div>

            <div className="w-8 sm:w-14 h-px bg-gray-200" />

            <div className="flex items-center gap-2">
              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-gray-100
                  text-gray-400
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                "
              >
                3
              </div>

              <span className="hidden sm:block text-sm font-medium text-gray-400">
                Checkout
              </span>
            </div>
          </div>
        </div>

        {/* ============================
            PRODUCT CARD
        ============================ */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            shadow-sm
            overflow-hidden
          "
        >
          {/* TOP */}

          <div
            className="
              px-5
              sm:px-7
              py-4
              border-b
              border-gray-100
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-pink-50
                  flex
                  items-center
                  justify-center
                "
              >
                <ShoppingBag size={19} className="text-pink-500" />
              </div>

              <div>
                <h1 className="text-base sm:text-lg font-extrabold text-gray-900">
                  Your Product
                </h1>

                <p className="text-xs text-gray-400">
                  Review your product before continuing
                </p>
              </div>
            </div>

            {/* REMOVE */}

            <button
              type="button"
              onClick={handleRemove}
              className="
                inline-flex
                items-center
                gap-1.5
                text-xs
                sm:text-sm
                font-semibold
                text-red-500
                hover:text-red-600
                hover:bg-red-50
                px-2.5
                py-2
                rounded-lg
                transition
                cursor-pointer
              "
            >
              <Trash2 size={16} />
              <span className="hidden sm:block">Remove</span>
            </button>
          </div>

          {/* PRODUCT */}

          <div className="p-5 sm:p-7">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">
              {/* IMAGE */}

              <div
                className="
                  h-44
                  sm:h-48
                  rounded-2xl
                  bg-gradient-to-br
                  from-pink-50
                  via-rose-50
                  to-white
                  border
                  border-pink-100
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >
                {singleProduct?.image ? (
                  <img
                    src={singleProduct.image}
                    alt={singleProduct?.name || "Product"}
                    className="
                      w-full
                      h-full
                      object-contain
                      p-4
                    "
                  />
                ) : (
                  <ShoppingBag
                    size={55}
                    strokeWidth={1}
                    className="text-pink-300"
                  />
                )}
              </div>

              {/* DETAILS */}

              <div className="flex flex-col">
                <div>
                  <span
                    className="
                      inline-flex
                      px-2.5
                      py-1
                      rounded-full
                      bg-pink-50
                      text-pink-600
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                    "
                  >
                    {singleProduct?.productType || "Product"}
                  </span>

                  <h2
                    className="
                      mt-2
                      text-xl
                      sm:text-2xl
                      font-extrabold
                      text-gray-900
                      capitalize
                    "
                  >
                    {singleProduct?.name || "Product"}
                  </h2>
                </div>

                {/* PRICE */}

                <div className="mt-4">
                  <div className="flex items-center gap-2">
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
                    <p className="text-xs font-semibold text-green-600 mt-1">
                      Special discounted price
                    </p>
                  )}
                </div>

                {/* QUANTITY */}

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Quantity
                    </p>

                    <div
                      className="
                        mt-1.5
                        inline-flex
                        items-center
                        border
                        border-gray-200
                        rounded-xl
                        overflow-hidden
                      "
                    >
                      <button
                        type="button"
                        onClick={() => dispatch(decrementQuantity())}
                        disabled={quantity <= 1}
                        className="
                          w-10
                          h-10
                          flex
                          items-center
                          justify-center
                          text-gray-600
                          hover:bg-pink-50
                          hover:text-pink-600
                          disabled:text-gray-300
                          disabled:hover:bg-white
                          transition
                          cursor-pointer
                          disabled:cursor-not-allowed
                        "
                      >
                        <Minus size={16} />
                      </button>

                      <span
                        className="
                          w-12
                          h-10
                          flex
                          items-center
                          justify-center
                          border-x
                          border-gray-200
                          text-sm
                          font-bold
                          text-gray-900
                        "
                      >
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => dispatch(incrementQuantity())}
                        disabled={quantity >= (singleProduct?.stock || 0)}
                        className="
                          w-10
                          h-10
                          flex
                          items-center
                          justify-center
                          text-gray-600
                          hover:bg-pink-50
                          hover:text-pink-600
                          disabled:text-gray-300
                          disabled:hover:bg-white
                          transition
                          cursor-pointer
                          disabled:cursor-not-allowed
                        "
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* TOTAL */}

                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Total Price
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-pink-600">
                      ₹{totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}

          <div
            className="
              px-5
              sm:px-7
              py-4
              bg-gray-50
              border-t
              border-gray-100
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div className="flex items-center gap-2">
              <PackageCheck size={18} className="text-green-500" />

              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Secure delivery available
              </span>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-gray-400">Items</p>

              <p className="text-sm font-bold text-gray-800">{quantity}</p>
            </div>
          </div>
        </div>

        {/* CONTINUE */}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            disabled={!singleProduct}
            onClick={()=>{
              navigate('/buy-single-product-address')
            }}
            className="
              h-11
              px-7
              rounded-xl
              bg-pink-500
              hover:bg-pink-600
              disabled:bg-gray-200
              disabled:text-gray-400
              text-white
              text-sm
              font-bold
              transition
              cursor-pointer
              disabled:cursor-not-allowed
            "
            
          >
            Continue to Address
          </button>
        </div>
      </main>
    </div>
  );
};

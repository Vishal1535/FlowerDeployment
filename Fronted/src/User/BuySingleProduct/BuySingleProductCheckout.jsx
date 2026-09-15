import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Truck,
  Zap,
  CalendarDays,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import {
  VerifyRazorpayPaymentThunk,
  CreateRazorpayOrderThunk,
} from "../../Store/Payment/PaymentApi.js";

import { CreateSingleProductOrderThunk } from "../../Store/BuySingleProduct/BuySingleProductApi.js";

import { GetLatestAddressThunk } from "../../Store/Address/AddressApi.js";

const TOMORROW_DELIVERY_CHARGE = 99;
const PARTIAL_PAYMENT_PERCENTAGE = 0.3;

// ============================================================
// HELPERS
// ============================================================

const getRandomStandardDeliveryDate = () => {
  const today = new Date();

  const randomDays = Math.floor(Math.random() * 6) + 2;

  const deliveryDate = new Date(today);

  deliveryDate.setDate(deliveryDate.getDate() + randomDays);

  return deliveryDate;
};

const getTomorrowDate = () => {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow;
};

const formatDeliveryDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ============================================================
// COMPONENT
// ============================================================

export const BuySingleProductCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProduct, quantity, totalPrice } = useSelector(
    (state) => state.BuySingleProduct || {},
  );

  const { address } = useSelector((state) => state.Address || {});

  const [paymentType, setPaymentType] = useState("full");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [deliveryType, setDeliveryType] = useState("standard");

  const [standardDeliveryDate, setStandardDeliveryDate] = useState(
    getRandomStandardDeliveryDate(),
  );

  // ==========================================================
  // GET ADDRESS
  // ==========================================================

  useEffect(() => {
    dispatch(GetLatestAddressThunk());
  }, [dispatch]);

  // ==========================================================
  // PRODUCT PRICE
  // ==========================================================

  const price = Number(singleProduct?.price || 0);

  const discountPrice = Number(singleProduct?.discountPrice || 0);

  const hasDiscount = discountPrice > 0 && discountPrice < price;

  const finalPrice = hasDiscount ? discountPrice : price;

  // ==========================================================
  // QUANTITY
  // ==========================================================

  const productQuantity = Math.max(1, Number(quantity || 1));

  // ==========================================================
  // SUBTOTAL
  // ==========================================================

  const subtotal =
    Number(totalPrice) > 0 ? Number(totalPrice) : finalPrice * productQuantity;

  // ==========================================================
  // DELIVERY
  // ==========================================================

  const deliveryDate =
    deliveryType === "tomorrow" ? getTomorrowDate() : standardDeliveryDate;

  const deliveryCharge =
    deliveryType === "tomorrow" ? TOMORROW_DELIVERY_CHARGE : 0;

  // ==========================================================
  // TOTAL
  // ==========================================================

  const totalAmount = subtotal + deliveryCharge;

  // ==========================================================
  // PAYMENT
  // ==========================================================

  const paymentAmount =
    paymentType === "full"
      ? totalAmount
      : Math.ceil(totalAmount * PARTIAL_PAYMENT_PERCENTAGE);

  const remainingAmount = Math.max(0, totalAmount - paymentAmount);

  // ==========================================================
  // DELIVERY HANDLERS
  // ==========================================================

  const handleStandardDelivery = () => {
    if (paymentLoading) return;

    setDeliveryType("standard");

    setStandardDeliveryDate(getRandomStandardDeliveryDate());
  };

  const handleTomorrowDelivery = () => {
    if (paymentLoading) return;

    setDeliveryType("tomorrow");
  };

  // ==========================================================
  // PAYMENT TYPE
  // ==========================================================

  const handlePaymentType = (type) => {
    if (paymentLoading) return;

    setPaymentType(type);
  };

  // ==========================================================
  // PAYMENT
  // ==========================================================

  const handlePayment = async () => {
    if (paymentLoading) return;

    try {
      if (!singleProduct) {
        toast.error("Product details not found");
        return;
      }

      if (!singleProduct?.product && !singleProduct?._id) {
        toast.error("Product ID not found");
        return;
      }

      if (!address) {
        toast.error("Please select delivery address");
        return;
      }

      if (productQuantity <= 0) {
        toast.error("Invalid quantity");
        return;
      }

      if (totalAmount <= 0) {
        toast.error("Invalid order amount");
        return;
      }

      if (paymentAmount <= 0) {
        toast.error("Invalid payment amount");
        return;
      }

      if (typeof window === "undefined" || !window.Razorpay) {
        toast.error("Razorpay SDK load nahi hua. index.html check karo.");
        return;
      }

      setPaymentLoading(true);

      const razorpayResult = await dispatch(
        CreateRazorpayOrderThunk(paymentAmount),
      );

      if (!CreateRazorpayOrderThunk.fulfilled.match(razorpayResult)) {
        toast.error(
          razorpayResult?.payload || "Unable to create payment order",
        );

        setPaymentLoading(false);
        return;
      }

      const razorpayOrder = razorpayResult?.payload?.order;

      if (!razorpayOrder?.id || !razorpayOrder?.amount) {
        toast.error("Invalid Razorpay order received");

        setPaymentLoading(false);
        return;
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

      const options = {
        key: razorpayKey,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency || "INR",

        name: "Flower",

        description:
          paymentType === "full"
            ? "Flower Order - Full Payment"
            : "Flower Order - 30% Advance",

        order_id: razorpayOrder.id,

        handler: async (response) => {
          try {
            if (
              !response?.razorpay_order_id ||
              !response?.razorpay_payment_id ||
              !response?.razorpay_signature
            ) {
              toast.error("Invalid payment response received");

              setPaymentLoading(false);
              return;
            }

            const verifyResult = await dispatch(
              VerifyRazorpayPaymentThunk({
                razorpay_order_id: response.razorpay_order_id,

                razorpay_payment_id: response.razorpay_payment_id,

                razorpay_signature: response.razorpay_signature,
              }),
            );

            if (!VerifyRazorpayPaymentThunk.fulfilled.match(verifyResult)) {
              toast.error(
                verifyResult?.payload || "Payment verification failed",
              );

              setPaymentLoading(false);
              return;
            }

            const orderData = {
              product: singleProduct?.product || singleProduct?._id,

              productType: singleProduct?.productType || "flower",

              name:
                singleProduct?.name || singleProduct?.title || "Flower Product",

              image:
                singleProduct?.image ||
                singleProduct?.image1 ||
                singleProduct?.imageUrl ||
                "",

              quantity: productQuantity,

              price: finalPrice,

              address,

              paymentMethod: "online",

              paymentType,

              paidAmount: paymentAmount,

              deliveryType,

              paymentOrderId: response.razorpay_order_id,

              paymentId: response.razorpay_payment_id,

              paymentSignature: response.razorpay_signature,
            };

            const orderResult = await dispatch(
              CreateSingleProductOrderThunk(orderData),
            );

            if (!CreateSingleProductOrderThunk.fulfilled.match(orderResult)) {
              toast.error(
                orderResult?.payload ||
                  "Payment successful but order creation failed",
              );

              setPaymentLoading(false);
              return;
            }

            toast.success("Payment successful! Order confirmed.");

            setPaymentLoading(false);

            navigate("/", {
              replace: true,
            });
          } catch (error) {
            console.error("Payment success error:", error);

            setPaymentLoading(false);

            toast.error("Payment successful but order processing failed.");
          }
        },

        prefill: {
          name: address?.fullName || "",
          contact: address?.phone || "",
          email: "",
        },

        theme: {
          color: "#ec4899",
        },

        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            toast.error("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Payment failed:", response?.error);

        setPaymentLoading(false);

        toast.error(response?.error?.description || "Payment failed");
      });

      razorpay.open();
    } catch (error) {
      console.error("Single product checkout error:", error);

      setPaymentLoading(false);

      toast.error("Something went wrong while starting payment.");
    }
  };

  // ==========================================================
  // NO PRODUCT
  // ==========================================================

  if (!singleProduct) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
        <p className="text-sm font-semibold text-gray-700">
          No product selected
        </p>
      </div>
    );
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* HEADER */}

        <div className="px-5 py-4 bg-gray-900 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500 flex items-center justify-center">
                <CreditCard size={18} />
              </div>

              <div>
                <h2 className="text-base font-bold">Checkout</h2>

                <p className="text-[10px] text-gray-300">Complete your order</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-green-300">
              <ShieldCheck size={14} />

              <span className="text-[10px] font-semibold">Secure</span>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* ADDRESS */}

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-pink-500" />

                <span className="text-xs font-bold text-gray-900">
                  Delivery Address
                </span>
              </div>

              {address && (
                <span className="text-[9px] font-bold text-green-600">
                  SELECTED
                </span>
              )}
            </div>

            {address ? (
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-gray-800">
                    {address?.fullName || "Customer"}
                  </p>

                  {address?.phone && (
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Phone size={10} />
                      {address.phone}
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-gray-500 mt-1 leading-4">
                  {[
                    address?.houseNumber,
                    address?.area,
                    address?.landmark,
                    address?.city,
                    address?.state,
                    address?.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            ) : (
              <p className="text-xs text-orange-500 font-semibold">
                Please select delivery address
              </p>
            )}
          </div>

          {/* DELIVERY */}

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Truck size={15} className="text-pink-500" />

                <span className="text-xs font-bold text-gray-900">
                  Delivery Option
                </span>
              </div>

              <span className="text-[9px] text-gray-400">Select speed</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* STANDARD */}

              <button
                type="button"
                disabled={paymentLoading}
                onClick={handleStandardDelivery}
                className={`p-3 rounded-xl border text-left transition ${
                  deliveryType === "standard"
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-200 hover:border-pink-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClockIcon />

                    <span className="text-xs font-bold text-gray-800">
                      Standard
                    </span>
                  </div>

                  {deliveryType === "standard" && (
                    <CheckCircle2 size={14} className="text-pink-500" />
                  )}
                </div>

                <p className="text-[10px] text-gray-400 mt-2">2–7 days</p>

                <p className="text-[10px] font-semibold text-gray-700 mt-0.5">
                  {formatDeliveryDate(standardDeliveryDate)}
                </p>

                <span className="inline-block mt-1.5 text-[9px] font-bold text-green-600">
                  FREE
                </span>
              </button>

              {/* TOMORROW */}

              <button
                type="button"
                disabled={paymentLoading}
                onClick={handleTomorrowDelivery}
                className={`p-3 rounded-xl border text-left transition ${
                  deliveryType === "tomorrow"
                    ? "border-orange-400 bg-orange-50"
                    : "border-gray-200 hover:border-orange-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap
                      size={15}
                      className={
                        deliveryType === "tomorrow"
                          ? "text-orange-500"
                          : "text-gray-400"
                      }
                    />

                    <span className="text-xs font-bold text-gray-800">
                      Tomorrow
                    </span>
                  </div>

                  {deliveryType === "tomorrow" && (
                    <CheckCircle2 size={14} className="text-orange-500" />
                  )}
                </div>

                <p className="text-[10px] text-gray-400 mt-2">
                  Priority delivery
                </p>

                <p className="text-[10px] font-semibold text-gray-700 mt-0.5">
                  {formatDeliveryDate(getTomorrowDate())}
                </p>

                <span className="inline-block mt-1.5 text-[9px] font-bold text-orange-500">
                  +₹99
                </span>
              </button>
            </div>
          </div>

          {/* PAYMENT */}

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2.5">
              <CreditCard size={15} className="text-pink-500" />

              <span className="text-xs font-bold text-gray-900">
                Payment Option
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* FULL */}

              <button
                type="button"
                disabled={paymentLoading}
                onClick={() => handlePaymentType("full")}
                className={`p-3 rounded-xl border text-left transition ${
                  paymentType === "full"
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-200 hover:border-pink-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentType === "full"
                        ? "border-pink-500"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentType === "full" && (
                      <div className="w-2 h-2 rounded-full bg-pink-500" />
                    )}
                  </div>

                  <span className="text-xs font-bold text-gray-800">
                    Full Payment
                  </span>
                </div>

                <p className="text-sm font-extrabold text-pink-600 mt-2">
                  ₹{totalAmount}
                </p>
              </button>

              {/* PARTIAL */}

              <button
                type="button"
                disabled={paymentLoading}
                onClick={() => handlePaymentType("partial")}
                className={`p-3 rounded-xl border text-left transition ${
                  paymentType === "partial"
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-200 hover:border-pink-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentType === "partial"
                        ? "border-pink-500"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentType === "partial" && (
                      <div className="w-2 h-2 rounded-full bg-pink-500" />
                    )}
                  </div>

                  <span className="text-xs font-bold text-gray-800">
                    30% Advance
                  </span>
                </div>

                <p className="text-sm font-extrabold text-pink-600 mt-2">
                  ₹{Math.ceil(totalAmount * PARTIAL_PAYMENT_PERCENTAGE)}
                </p>
              </button>
            </div>

            {paymentType === "partial" && (
              <div className="flex justify-between items-center mt-2 px-3 py-2 rounded-lg bg-orange-50">
                <span className="text-[10px] text-gray-500">Remaining</span>

                <span className="text-xs font-bold text-orange-500">
                  ₹{remainingAmount}
                </span>
              </div>
            )}
          </div>

          {/* TOTAL */}

          <div className="mt-4 px-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Delivery</span>

              <span
                className={
                  deliveryCharge === 0
                    ? "text-green-600 font-bold"
                    : "text-orange-500 font-bold"
                }
              >
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="border-t border-dashed border-gray-200 my-3" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-800">Total</span>

              <span className="text-xl font-black text-gray-900">
                ₹{totalAmount}
              </span>
            </div>
          </div>

          {/* PAY */}

          <button
            type="button"
            onClick={handlePayment}
            disabled={paymentLoading || !address}
            className="
              w-full
              mt-4
              h-12
              rounded-xl
              bg-pink-600
              hover:bg-pink-700
              text-white
              font-bold
              text-sm
              flex
              items-center
              justify-center
              gap-2
              transition
              active:scale-[0.98]
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {paymentLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Processing...
              </>
            ) : (
              <>
                Pay ₹{paymentAmount}
                <ArrowRight size={17} />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-2">
            <ShieldCheck size={12} className="text-green-500" />

            <span className="text-[9px] text-gray-400">
              Secure payment powered by Razorpay
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SMALL ICON
// ============================================================

const ClockIcon = () => (
  <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
    <span className="text-[10px] font-bold text-gray-500">2–7</span>
  </div>
);

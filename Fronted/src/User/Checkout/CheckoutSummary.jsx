import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ShoppingBag,
  Package,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  WalletCards,
  Landmark,
  Truck,
  Zap,
  CalendarDays,
} from "lucide-react";

import {
  CreateRazorpayOrderThunk,
  VerifyRazorpayPaymentThunk,
} from "../../Store/Payment/PaymentApi.js";

import { CreateOrderThunk } from "../../Store/Order/OrderApi.js";

// ============================================================
// CONSTANTS
// ============================================================

const TOMORROW_DELIVERY_CHARGE = 99;
const PARTIAL_PAYMENT_PERCENTAGE = 0.3;

// ============================================================
// HELPERS
// ============================================================

const getRandomStandardDeliveryDate = () => {
  const today = new Date();

  // Random 2 to 7 days
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

const getBackendDeliveryDate = (date) => {
  if (!date) return null;

  const backendDate = new Date(date);

  backendDate.setHours(12, 0, 0, 0);

  return backendDate.toISOString();
};

// ============================================================
// COMPONENT
// ============================================================

export const CheckoutSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================================================
  // PAYMENT STATE
  // ==========================================================

  const [paymentType, setPaymentType] = useState("full");

  const [paymentLoading, setPaymentLoading] = useState(false);

  // ==========================================================
  // DELIVERY STATE
  // ==========================================================

  const [deliveryType, setDeliveryType] = useState("standard");

  const [standardDeliveryDate, setStandardDeliveryDate] = useState(
    getRandomStandardDeliveryDate,
  );

  // ==========================================================
  // ADDRESS
  // ==========================================================

  const { address } = useSelector((state) => state.Address);

  // ==========================================================
  // CARTS
  // ==========================================================

  const { bouquetFromCart = [] } = useSelector(
    (state) => state.BouquetAddToCart || {},
  );

  const { cardFromCart = [] } = useSelector(
    (state) => state.CardAddToCart || {},
  );

  const { chocolateFromCart = [] } = useSelector(
    (state) => state.ChocolateAddToCart || {},
  );

  const { comboBouquetFromCart = [] } = useSelector(
    (state) => state.ComboBouquetAddToCart || {},
  );

  const { flowerFromCart = [] } = useSelector(
    (state) => state.FlowerAddToCart || {},
  );

  const { flowerInBoxFromCart = [] } = useSelector(
    (state) => state.FlowerInBoxAddToCart || {},
  );

  const { flowerInSleeveFromCart = [] } = useSelector(
    (state) => state.FlowerInSleeveAddToCart || {},
  );

  const { miniCupcakeFromCart = [] } = useSelector(
    (state) => state.MiniCupCakeAddToCart || {},
  );

  const { woolenBouquetFromCart = [] } = useSelector(
    (state) => state.WoolenBouquetAddToCart || {},
  );

  // ==========================================================
  // ALL CART CONFIGURATION
  // ==========================================================

  const cartGroups = useMemo(
    () => [
      {
        items: flowerFromCart,
        productType: "flower",
        productKey: "flower",
      },

      {
        items: flowerInSleeveFromCart,
        productType: "flowerInSleeve",
        productKey: "flowerInSleeve",
      },

      {
        items: flowerInBoxFromCart,
        productType: "flowerInBox",
        productKey: "flowerInBox",
      },

      {
        items: bouquetFromCart,
        productType: "bouquet",
        productKey: "bouquet",
      },

      {
        items: comboBouquetFromCart,
        productType: "comboBouquet",
        productKey: "comboBouquet",
      },

      {
        items: woolenBouquetFromCart,
        productType: "woolenBouquet",
        productKey: "woolenBouquet",
      },

      {
        items: cardFromCart,
        productType: "card",
        productKey: "card",
      },

      {
        items: chocolateFromCart,
        productType: "chocolate",
        productKey: "chocolate",
      },

      {
        items: miniCupcakeFromCart,
        productType: "miniCupcake",
        productKey: "miniCupcake",
      },
    ],
    [
      flowerFromCart,
      flowerInSleeveFromCart,
      flowerInBoxFromCart,
      bouquetFromCart,
      comboBouquetFromCart,
      woolenBouquetFromCart,
      cardFromCart,
      chocolateFromCart,
      miniCupcakeFromCart,
    ],
  );

  // ==========================================================
  // PRICE HELPER
  // ==========================================================

  const getFinalPrice = (product) => {
    if (!product) {
      return 0;
    }

    const price = Number(product?.price || 0);

    const discountPrice = Number(product?.discountPrice || 0);

    if (discountPrice > 0 && discountPrice < price) {
      return discountPrice;
    }

    return price;
  };

  // ==========================================================
  // TOTAL QUANTITY
  // ==========================================================

  const totalQuantity = useMemo(() => {
    return cartGroups.reduce((grandTotal, group) => {
      const groupQuantity = group.items.reduce((total, item) => {
        return total + Number(item?.quantity || 0);
      }, 0);

      return grandTotal + groupQuantity;
    }, 0);
  }, [cartGroups]);

  // ==========================================================
  // TOTAL PRODUCTS
  // ==========================================================

  const totalProducts = useMemo(() => {
    return cartGroups.reduce((total, group) => total + group.items.length, 0);
  }, [cartGroups]);

  // ==========================================================
  // PREPARE ORDER ITEM
  // ==========================================================

  const prepareOrderItem = (item, productType, productKey) => {
    const product = item?.[productKey];

    if (!product?._id) {
      console.error(`Product ID missing for ${productType}`, item);

      return null;
    }

    const price = getFinalPrice(product);

    const quantity = Math.max(1, Number(item?.quantity || 1));

    const name =
      product?.name ||
      product?.title ||
      product?.productName ||
      "Flower Product";

    const image =
      product?.image ||
      product?.image1 ||
      product?.imageUrl ||
      product?.images?.[0] ||
      "";

    return {
      productType,

      product: product._id,

      name,

      image,

      price,

      quantity,

      totalPrice: price * quantity,
    };
  };

  // ==========================================================
  // ALL ORDER ITEMS
  // ==========================================================

  const allCartItems = useMemo(() => {
    return cartGroups
      .flatMap((group) =>
        group.items.map((item) =>
          prepareOrderItem(item, group.productType, group.productKey),
        ),
      )
      .filter(Boolean);
  }, [cartGroups]);

  // ==========================================================
  // SUBTOTAL
  // ==========================================================

  const subtotal = useMemo(() => {
    return allCartItems.reduce(
      (total, item) => total + Number(item?.totalPrice || 0),
      0,
    );
  }, [allCartItems]);

  // ==========================================================
  // CURRENT DELIVERY DATE
  // ==========================================================

  const deliveryDate =
    deliveryType === "tomorrow" ? getTomorrowDate() : standardDeliveryDate;

  // ==========================================================
  // DELIVERY CHARGE
  // ==========================================================

  const deliveryCharge =
    deliveryType === "tomorrow" ? TOMORROW_DELIVERY_CHARGE : 0;

  // ==========================================================
  // TOTAL AMOUNT
  // ==========================================================

  const totalAmount = subtotal + deliveryCharge;

  // ==========================================================
  // PAYMENT AMOUNT
  // ==========================================================

  const paymentAmount =
    paymentType === "full"
      ? totalAmount
      : Math.ceil(totalAmount * PARTIAL_PAYMENT_PERCENTAGE);

  // ==========================================================
  // REMAINING AMOUNT
  // ==========================================================

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
  // HANDLE PAYMENT
  // ==========================================================

  const handlePayment = async () => {
    if (paymentLoading) {
      return;
    }

    try {
      // ======================================================
      // VALIDATION
      // ======================================================

      if (!address) {
        toast.error("Please select delivery address");

        return;
      }

      if (!allCartItems.length) {
        toast.error("Your cart is empty");

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

      // ======================================================
      // LOG
      // ======================================================

      console.log("====================================");

      console.log("CHECKOUT DETAILS");

      console.log("Delivery Type:", deliveryType);

      console.log("Delivery Date:", deliveryDate);

      console.log("Delivery Charge:", deliveryCharge);

      console.log("Subtotal:", subtotal);

      console.log("Total Amount:", totalAmount);

      console.log("Payment Type:", paymentType);

      console.log("Payment Amount:", paymentAmount);

      console.log("Remaining:", remainingAmount);

      console.log("Items:", allCartItems);

      console.log("====================================");

      // ======================================================
      // STEP 1
      // CREATE RAZORPAY ORDER
      // ======================================================

      const razorpayResult = await dispatch(
        CreateRazorpayOrderThunk(paymentAmount),
      );

      if (!CreateRazorpayOrderThunk.fulfilled.match(razorpayResult)) {
        console.error("Razorpay order creation failed:", razorpayResult);

        toast.error(
          razorpayResult?.payload || "Unable to create payment order",
        );

        setPaymentLoading(false);

        return;
      }

      // ======================================================
      // RAZORPAY ORDER
      // ======================================================

      const razorpayOrder = razorpayResult?.payload?.order;

      if (!razorpayOrder?.id || !razorpayOrder?.amount) {
        console.error("Invalid Razorpay order:", razorpayResult?.payload);

        toast.error("Invalid Razorpay order received");

        setPaymentLoading(false);

        return;
      }

      // ======================================================
      // STEP 2
      // RAZORPAY OPTIONS
      // ======================================================

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

        // ====================================================
        // PAYMENT SUCCESS
        // ====================================================

        handler: async (response) => {
          try {
            console.log("Razorpay Response:", response);

            // ================================================
            // VALIDATE RESPONSE
            // ================================================

            if (
              !response?.razorpay_order_id ||
              !response?.razorpay_payment_id ||
              !response?.razorpay_signature
            ) {
              console.error("Invalid Razorpay response:", response);

              toast.error("Invalid payment response received");

              setPaymentLoading(false);

              return;
            }

            // ================================================
            // STEP 3
            // VERIFY PAYMENT
            // ================================================

            const verifyResult = await dispatch(
              VerifyRazorpayPaymentThunk({
                razorpay_order_id: response.razorpay_order_id,

                razorpay_payment_id: response.razorpay_payment_id,

                razorpay_signature: response.razorpay_signature,
              }),
            );

            if (!VerifyRazorpayPaymentThunk.fulfilled.match(verifyResult)) {
              console.error("Payment verification failed:", verifyResult);

              toast.error(
                verifyResult?.payload || "Payment verification failed",
              );

              setPaymentLoading(false);

              return;
            }

            console.log("Payment verified successfully");

            // ================================================
            // STEP 4
            // CREATE ORDER DATA
            // ================================================

            const orderData = {
              items: allCartItems,

              address,

              subtotal,

              deliveryCharge,

              totalAmount,

              paymentMethod: "online",

              paymentType,

              paidAmount: paymentAmount,

              remainingAmount,

              deliveryDate: getBackendDeliveryDate(deliveryDate),

              deliveryType,

              paymentOrderId: response.razorpay_order_id,

              paymentId: response.razorpay_payment_id,

              paymentSignature: response.razorpay_signature,
            };

            console.log(
              "FINAL ORDER DATA:",
              JSON.stringify(orderData, null, 2),
            );

            // ================================================
            // STEP 5
            // CREATE DATABASE ORDER
            // ================================================

            const orderResult = await dispatch(CreateOrderThunk(orderData));

            if (!CreateOrderThunk.fulfilled.match(orderResult)) {
              console.error("Database order creation failed:", orderResult);

              toast.error(
                orderResult?.payload ||
                  "Payment successful but order creation failed",
              );

              setPaymentLoading(false);

              return;
            }

            // ================================================
            // SUCCESS
            // ================================================

            console.log("Order successfully created:", orderResult?.payload);

            toast.success("Payment successful! Order confirmed.");

            setPaymentLoading(false);

            // ================================================
            // GO HOME
            // ================================================

            navigate("/", {
              replace: true,
            });
          } catch (error) {
            console.error("Payment success handler error:", error);

            setPaymentLoading(false);

            toast.error("Payment successful but order processing failed.");
          }
        },

        // ====================================================
        // PREFILL
        // ====================================================

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        // ====================================================
        // THEME
        // ====================================================

        theme: {
          color: "#ec4899",
        },

        // ====================================================
        // MODAL
        // ====================================================

        modal: {
          ondismiss: () => {
            console.log("Razorpay popup closed");

            setPaymentLoading(false);

            toast.error("Payment cancelled");
          },
        },
      };

      // ======================================================
      // STEP 6
      // CREATE RAZORPAY INSTANCE
      // ======================================================

      const razorpay = new window.Razorpay(options);

      // ======================================================
      // PAYMENT FAILED
      // ======================================================

      razorpay.on("payment.failed", (response) => {
        console.error("Razorpay payment failed:", response?.error);

        setPaymentLoading(false);

        toast.error(response?.error?.description || "Payment failed");
      });

      // ======================================================
      // OPEN RAZORPAY
      // ======================================================

      razorpay.open();
    } catch (error) {
      console.error("Checkout payment error:", error);

      setPaymentLoading(false);

      toast.error("Something went wrong while starting payment.");
    }
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="px-4 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <ShoppingBag size={16} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-white">
                Order Summary
              </h2>

              <p className="text-[10px] text-pink-100">
                Review your order before payment
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* ==================================================
              ORDER DETAILS
          ================================================== */}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package size={14} className="text-gray-400" />

                <span className="text-xs text-gray-500">Products</span>
              </div>

              <span className="text-xs font-bold text-gray-700">
                {totalProducts}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={14} className="text-gray-400" />

                <span className="text-xs text-gray-500">Total Items</span>
              </div>

              <span className="text-xs font-bold text-gray-700">
                {totalQuantity}
              </span>
            </div>
          </div>

          {/* ==================================================
              DELIVERY
          ================================================== */}

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2.5">
              <Truck size={15} className="text-pink-500" />

              <h3 className="text-xs font-extrabold text-gray-800">Delivery</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* ============================================
                  STANDARD
              ============================================ */}

              <button
                type="button"
                disabled={paymentLoading}
                onClick={handleStandardDelivery}
                className={`
                  relative
                  text-left
                  rounded-xl
                  border
                  p-3
                  transition-all
                  cursor-pointer
                  ${
                    deliveryType === "standard"
                      ? "border-pink-400 bg-pink-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-pink-200"
                  }
                `}
              >
                {deliveryType === "standard" && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 size={15} className="text-pink-500" />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div
                    className={`
                      w-8 h-8
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      ${
                        deliveryType === "standard"
                          ? "bg-pink-100 text-pink-600"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    <Truck size={16} />
                  </div>

                  <div>
                    <p className="text-[11px] font-extrabold text-gray-800">
                      Standard
                    </p>

                    <p className="text-[9px] text-gray-500">2–7 days</p>
                  </div>
                </div>

                <div className="mt-2.5">
                  <p className="text-[9px] text-gray-400">Expected delivery</p>

                  <p className="text-[10px] font-bold text-gray-700 mt-0.5">
                    {formatDeliveryDate(standardDeliveryDate)}
                  </p>

                  <p className="text-[9px] font-bold text-green-500 mt-1">
                    FREE
                  </p>
                </div>
              </button>

              {/* ============================================
                  TOMORROW
              ============================================ */}

              <button
                type="button"
                disabled={paymentLoading}
                onClick={handleTomorrowDelivery}
                className={`
                  relative
                  text-left
                  rounded-xl
                  border
                  p-3
                  transition-all
                  cursor-pointer
                  ${
                    deliveryType === "tomorrow"
                      ? "border-orange-400 bg-orange-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-orange-200"
                  }
                `}
              >
                {deliveryType === "tomorrow" && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 size={15} className="text-orange-500" />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div
                    className={`
                      w-8 h-8
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      ${
                        deliveryType === "tomorrow"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    <Zap size={16} />
                  </div>

                  <div>
                    <p className="text-[11px] font-extrabold text-gray-800">
                      Get Tomorrow
                    </p>

                    <p className="text-[9px] text-gray-500">
                      Priority delivery
                    </p>
                  </div>
                </div>

                <div className="mt-2.5">
                  <p className="text-[9px] text-gray-400">Expected delivery</p>

                  <p className="text-[10px] font-bold text-gray-700 mt-0.5">
                    {formatDeliveryDate(getTomorrowDate())}
                  </p>

                  <p className="text-[9px] font-bold text-orange-500 mt-1">
                    +₹99 delivery
                  </p>
                </div>
              </button>
            </div>

            {/* ==============================================
                SELECTED DELIVERY
            ============================================== */}

            <div
              className={`
                mt-2.5
                rounded-xl
                px-3
                py-2.5
                border
                flex
                items-center
                gap-2.5
                ${
                  deliveryType === "tomorrow"
                    ? "bg-orange-50 border-orange-100"
                    : "bg-pink-50 border-pink-100"
                }
              `}
            >
              <CalendarDays
                size={15}
                className={
                  deliveryType === "tomorrow"
                    ? "text-orange-500"
                    : "text-pink-500"
                }
              />

              <div>
                <p className="text-[9px] text-gray-400">
                  Your selected delivery
                </p>

                <p className="text-[11px] font-extrabold text-gray-800">
                  {formatDeliveryDate(deliveryDate)}
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================
              PRICE
          ================================================== */}

          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Subtotal</span>

              <span className="font-semibold text-gray-700">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-xs mt-2">
              <span className="text-gray-500">Delivery</span>

              <span
                className={
                  deliveryCharge === 0
                    ? "font-semibold text-green-500"
                    : "font-semibold text-orange-500"
                }
              >
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>
          </div>

          {/* ==================================================
              TOTAL
          ================================================== */}

          <div className="mt-3 px-3.5 py-3 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-gray-400">Order Total</p>

              <p className="text-lg font-black text-pink-600">₹{totalAmount}</p>
            </div>

            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <CreditCard size={16} className="text-pink-500" />
            </div>
          </div>

          {/* ==================================================
              PAYMENT
          ================================================== */}

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2.5">
              <CreditCard size={15} className="text-pink-500" />

              <h3 className="text-xs font-extrabold text-gray-800">Payment</h3>
            </div>

            {/* ONLINE */}

            <div className="px-3 py-2.5 rounded-xl border border-pink-100 bg-pink-50/50">
              <p className="text-xs font-bold text-gray-800">Pay Online</p>

              <p className="text-[9px] text-gray-500 mt-0.5">
                UPI • Cards • Net Banking
              </p>
            </div>

            {/* PAYMENT TYPE */}

            <div className="grid grid-cols-2 gap-2 mt-2">
              {/* FULL */}

              <button
                type="button"
                disabled={paymentLoading}
                onClick={() => handlePaymentType("full")}
                className={`
                  rounded-xl
                  border
                  p-2.5
                  text-left
                  cursor-pointer
                  transition
                  ${
                    paymentType === "full"
                      ? "border-pink-400 bg-pink-50"
                      : "border-gray-200 bg-white hover:border-pink-200"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`
                      w-4 h-4
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      ${
                        paymentType === "full"
                          ? "border-pink-500"
                          : "border-gray-300"
                      }
                    `}
                  >
                    {paymentType === "full" && (
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-800">
                      Full Payment
                    </p>

                    <p className="text-[9px] text-gray-400">₹{totalAmount}</p>
                  </div>
                </div>
              </button>

              {/* PARTIAL */}

              <button
                type="button"
                disabled={paymentLoading}
                onClick={() => handlePaymentType("partial")}
                className={`
                  rounded-xl
                  border
                  p-2.5
                  text-left
                  cursor-pointer
                  transition
                  ${
                    paymentType === "partial"
                      ? "border-pink-400 bg-pink-50"
                      : "border-gray-200 bg-white hover:border-pink-200"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`
                      w-4 h-4
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      ${
                        paymentType === "partial"
                          ? "border-pink-500"
                          : "border-gray-300"
                      }
                    `}
                  >
                    {paymentType === "partial" && (
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-800">
                      30% Now
                    </p>

                    <p className="text-[9px] text-gray-400">
                      ₹{Math.ceil(totalAmount * PARTIAL_PAYMENT_PERCENTAGE)}
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* PAYMENT BREAKDOWN */}

            <div className="mt-2 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-[9px] text-gray-500">Pay now</span>

                <span className="text-[10px] font-extrabold text-gray-800">
                  ₹{paymentAmount}
                </span>
              </div>

              {paymentType === "partial" && (
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-gray-500">Remaining</span>

                  <span className="text-[10px] font-bold text-gray-600">
                    ₹{remainingAmount}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ==================================================
              PAYMENT METHODS
          ================================================== */}

          <div className="grid grid-cols-3 gap-1.5 mt-3">
            <div className="border border-gray-100 bg-gray-50 rounded-lg py-2 flex flex-col items-center">
              <Smartphone size={13} className="text-gray-500" />

              <span className="text-[8px] text-gray-500 mt-0.5">UPI</span>
            </div>

            <div className="border border-gray-100 bg-gray-50 rounded-lg py-2 flex flex-col items-center">
              <WalletCards size={13} className="text-gray-500" />

              <span className="text-[8px] text-gray-500 mt-0.5">Cards</span>
            </div>

            <div className="border border-gray-100 bg-gray-50 rounded-lg py-2 flex flex-col items-center">
              <Landmark size={13} className="text-gray-500" />

              <span className="text-[8px] text-gray-500 mt-0.5">
                Net Banking
              </span>
            </div>
          </div>

          {/* ==================================================
              PAY BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={handlePayment}
            disabled={paymentLoading}
            className="
              group
              w-full
              h-10
              mt-3
              rounded-xl
              bg-gray-900
              text-white
              text-[11px]
              font-bold
              flex
              items-center
              justify-center
              gap-1.5
              hover:bg-pink-600
              active:scale-[0.98]
              transition
              cursor-pointer
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {paymentLoading ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Processing Payment...
              </>
            ) : (
              <>
                Pay ₹{paymentAmount}
                <ArrowRight
                  size={13}
                  className="
                    group-hover:translate-x-0.5
                    transition-transform
                  "
                />
              </>
            )}
          </button>

          {/* ==================================================
              SECURE
          ================================================== */}

          <div className="flex items-center justify-center gap-1.5 mt-2">
            <CheckCircle2 size={11} className="text-green-500" />

            <span className="text-[8px] text-gray-400">
              Secure online payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

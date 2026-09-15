import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { openCancelOrderPopup } from "../../Store/Order/OrderSlice";
import {
  GetMyOrdersThunk,
} from "../../Store/Order/OrderApi";

import { CancelOrderPopUp } from "./CancelOrderPopUp";

import {
  ArrowLeft,
  ShoppingBag,
  Package,
  CalendarDays,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  LoaderCircle,
  MapPin,
  ChevronRight,
  Flower2,
  Ban,
} from "lucide-react";

export const MyOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    orders = [],
    loading = false,
  } = useSelector((state) => state.Order);
const { isAuthorized } = useSelector((state) => state.user);

useEffect(() => {
  // User login nahi hai
  // Ya user admin nahi hai
  if (!isAuthorized) {
    navigate("/", {
      replace: true,
    });
  }
}, [isAuthorized,  navigate]);
  // =========================================
  // FETCH ORDERS
  // =========================================

  useEffect(() => {
    dispatch(GetMyOrdersThunk());
  }, [dispatch]);

  // =========================================
  // ORDER STATUS
  // =========================================

  const getOrderStatus = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          icon: Clock3,
          box: "bg-amber-50 text-amber-600 border-amber-200",
          dot: "bg-amber-500",
        };

      case "confirmed":
        return {
          label: "Confirmed",
          icon: CheckCircle2,
          box: "bg-blue-50 text-blue-600 border-blue-200",
          dot: "bg-blue-500",
        };

      case "processing":
        return {
          label: "Processing",
          icon: LoaderCircle,
          box: "bg-purple-50 text-purple-600 border-purple-200",
          dot: "bg-purple-500",
        };

      case "shipped":
        return {
          label: "Shipped",
          icon: Package,
          box: "bg-indigo-50 text-indigo-600 border-indigo-200",
          dot: "bg-indigo-500",
        };

      case "out_for_delivery":
        return {
          label: "Out for Delivery",
          icon: Truck,
          box: "bg-orange-50 text-orange-600 border-orange-200",
          dot: "bg-orange-500",
        };

      case "delivered":
        return {
          label: "Delivered",
          icon: CheckCircle2,
          box: "bg-green-50 text-green-600 border-green-200",
          dot: "bg-green-500",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          icon: XCircle,
          box: "bg-red-50 text-red-600 border-red-200",
          dot: "bg-red-500",
        };

      default:
        return {
          label: "Pending",
          icon: Clock3,
          box: "bg-gray-50 text-gray-600 border-gray-200",
          dot: "bg-gray-400",
        };
    }
  };

  // =========================================
  // PAYMENT STATUS
  // =========================================

  const getPaymentStatus = (status) => {
    switch (status) {
      case "paid":
        return {
          label: "Paid",
          className: "text-green-600",
        };

      case "partial":
        return {
          label: "Partially Paid",
          className: "text-orange-500",
        };

      case "failed":
        return {
          label: "Failed",
          className: "text-red-500",
        };

      default:
        return {
          label: "Pending",
          className: "text-yellow-600",
        };
    }
  };

  // =========================================
  // DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================
  // ITEMS COUNT
  // =========================================

  const getItemsCount = (items = []) => {
    return items.reduce(
      (total, item) =>
        total + Number(item?.quantity || 0),
      0,
    );
  };

  // =========================================
  // DELIVERY DATE
  // =========================================

  const getDeliveryDate = (order) => {
    return (
      order?.deliveryDate ||
      order?.expectedDeliveryDate ||
      order?.estimatedDeliveryDate ||
      order?.expectedDelivery ||
      null
    );
  };

  // =========================================
  // CAN CANCEL ORDER
  // =========================================

  const canCancelOrder = (order) => {
    const status = order?.orderStatus;

    return (
      status === "pending" ||
      status === "confirmed"
    );
  };

  // =========================================
  // OPEN CANCEL POPUP
  // =========================================

  const handleCancelOrder = (order) => {
    if (!order?._id) return;

    dispatch(
      openCancelOrderPopup(order._id)
    );
  };

  // =========================================
  // BACK
  // =========================================

  const handleBack = () => {
    navigate('/');
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffafa]">

        {/* NAVBAR */}

        <header
          className="
            sticky
            top-0
            z-50
            bg-white/95
            backdrop-blur-xl
            border-b
            border-pink-100
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto
              h-[72px]
              px-4
              sm:px-6
              lg:px-8
              flex
              items-center
              justify-between
            "
          >

            {/* BACK */}

            <button
              type="button"
              onClick={handleBack}
              className="
                w-10
                h-10
                rounded-full
                bg-pink-50
                text-pink-600
                flex
                items-center
                justify-center
                hover:bg-pink-100
                transition
                cursor-pointer
              "
            >
              <ArrowLeft size={19} />
            </button>

            {/* LOGO */}

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-gradient-to-br
                  from-pink-500
                  to-rose-500
                  flex
                  items-center
                  justify-center
                  text-white
                "
              >
                <Flower2 size={18} />
              </div>

              <span
                className="
                  text-lg
                  font-black
                  text-gray-800
                "
              >
                Flower
              </span>
            </div>

            <div className="w-10" />
          </div>
        </header>

        {/* LOADING */}

        <div
          className="
            min-h-[75vh]
            flex
            flex-col
            items-center
            justify-center
          "
        >
          <LoaderCircle
            size={38}
            className="
              text-pink-500
              animate-spin
            "
          />

          <p
            className="
              mt-4
              text-sm
              font-medium
              text-gray-500
            "
          >
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  // =========================================
  // MAIN PAGE
  // =========================================

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#fffafa]
        via-white
        to-pink-50/60
      "
    >

      {/* ===================================== */}
      {/* NAVBAR */}
      {/* ===================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          bg-white/90
          backdrop-blur-xl
          border-b
          border-pink-100
          shadow-[0_4px_20px_rgba(236,72,153,0.05)]
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            h-[72px]
            px-4
            sm:px-6
            lg:px-8
            flex
            items-center
            justify-between
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <button
              type="button"
              onClick={handleBack}
              className="
                w-10
                h-10
                rounded-full
                bg-pink-50
                text-pink-600
                flex
                items-center
                justify-center
                hover:bg-pink-100
                hover:-translate-x-0.5
                transition-all
                cursor-pointer
              "
            >
              <ArrowLeft size={19} />
            </button>

            <div
              className="
                hidden
                sm:flex
                items-center
                gap-2.5
              "
            >

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-gradient-to-br
                  from-pink-500
                  to-rose-500
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-lg
                  shadow-pink-200
                "
              >
                <Flower2 size={19} />
              </div>

              <div>

                <h1
                  className="
                    text-base
                    font-black
                    text-gray-800
                    leading-none
                  "
                >
                  Flower
                </h1>

                <p
                  className="
                    text-[9px]
                    text-pink-500
                    font-semibold
                    mt-1
                  "
                >
                  Bloom with love
                </p>

              </div>
            </div>
          </div>

          {/* CENTER */}

          <div
            className="
              flex
              flex-col
              items-center
            "
          >
            <h2
              className="
                text-base
                sm:text-lg
                font-black
                text-gray-900
              "
            >
              My Orders
            </h2>

            <p
              className="
                text-[9px]
                sm:text-[10px]
                text-gray-400
                mt-0.5
              "
            >
              Track your beautiful orders
            </p>
          </div>

          {/* RIGHT */}

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-gradient-to-br
              from-pink-50
              to-rose-100
              flex
              items-center
              justify-center
            "
          >
            <ShoppingBag
              size={18}
              className="text-pink-500"
            />
          </div>

        </div>
      </header>

      {/* ===================================== */}
      {/* CONTENT */}
      {/* ===================================== */}

      <main
        className="
          max-w-5xl
          mx-auto
          px-4
          sm:px-6
          py-7
          sm:py-10
        "
      >

        {/* =================================== */}
        {/* HERO */}
        {/* =================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-pink-500
            via-rose-500
            to-pink-600
            p-5
            sm:p-7
            mb-7
            shadow-xl
            shadow-pink-100
          "
        >

          <div
            className="
              absolute
              -right-8
              -top-10
              w-32
              h-32
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -right-4
              -bottom-16
              w-40
              h-40
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              relative
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  sm:text-xs
                  uppercase
                  tracking-[0.2em]
                  font-bold
                  text-pink-100
                "
              >
                Your shopping journey
              </p>

              <h2
                className="
                  mt-1
                  text-2xl
                  sm:text-3xl
                  font-black
                  text-white
                "
              >
                Your Orders
              </h2>

              <p
                className="
                  mt-1.5
                  text-xs
                  sm:text-sm
                  text-pink-100
                "
              >
                {orders.length}{" "}
                {orders.length === 1
                  ? "order"
                  : "orders"}{" "}
                placed with us
              </p>

            </div>

            <div
              className="
                hidden
                sm:flex
                w-16
                h-16
                rounded-2xl
                bg-white/15
                border
                border-white/20
                items-center
                justify-center
              "
            >
              <Package
                size={30}
                className="text-white"
              />
            </div>

          </div>
        </section>

        {/* =================================== */}
        {/* EMPTY */}
        {/* =================================== */}

        {!orders.length ? (

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-pink-100
              shadow-sm
              p-10
              sm:p-16
              text-center
            "
          >

            <div
              className="
                w-24
                h-24
                mx-auto
                rounded-full
                bg-gradient-to-br
                from-pink-50
                to-rose-100
                flex
                items-center
                justify-center
              "
            >
              <ShoppingBag
                size={40}
                className="text-pink-400"
              />
            </div>

            <h3
              className="
                mt-6
                text-xl
                sm:text-2xl
                font-black
                text-gray-800
              "
            >
              No orders yet
            </h3>

            <p
              className="
                max-w-sm
                mx-auto
                mt-2
                text-sm
                text-gray-500
                leading-6
              "
            >
              Looks like you haven't placed an
              order yet. Find something beautiful
              and place your first order. 🌸
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                mt-6
                px-7
                py-3
                rounded-full
                bg-gradient-to-r
                from-pink-500
                to-rose-500
                text-white
                text-sm
                font-bold
                shadow-lg
                shadow-pink-200
                hover:scale-[1.02]
                transition
                cursor-pointer
              "
            >
              Start Shopping
            </button>

          </div>

        ) : (

          /* ================================= */
          /* ORDER LIST */
          /* ================================= */

          <div className="space-y-5">

            {orders.map((order) => {

              const status = getOrderStatus(
                order?.orderStatus
              );

              const payment = getPaymentStatus(
                order?.paymentStatus
              );

              const StatusIcon = status.icon;

              const deliveryDate =
                getDeliveryDate(order);

              const showCancel =
                canCancelOrder(order);

              return (
                <article
                  key={order?._id}
                  className="
                    group
                    bg-white
                    rounded-3xl
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-xl
                    hover:shadow-pink-100/50
                    transition-all
                    duration-300
                    overflow-hidden
                  "
                >

                  {/* ========================== */}
                  {/* CARD HEADER */}
                  {/* ========================== */}

                  <div
                    className="
                      px-4
                      sm:px-6
                      py-4
                      border-b
                      border-gray-100
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

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
                        <Package
                          size={18}
                          className="text-pink-500"
                        />
                      </div>

                      <div>

                        <p
                          className="
                            text-[9px]
                            uppercase
                            tracking-wider
                            text-gray-400
                            font-semibold
                          "
                        >
                          Order ID
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-xs
                            sm:text-sm
                            font-black
                            text-gray-800
                          "
                        >
                          #{order?._id?.slice(-10)}
                        </p>

                      </div>
                    </div>

                    {/* STATUS */}

                    <div
                      className={`
                        self-start
                        sm:self-auto
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-1.5
                        rounded-full
                        border
                        text-[10px]
                        font-bold
                        ${status.box}
                      `}
                    >

                      <span
                        className={`
                          w-1.5
                          h-1.5
                          rounded-full
                          ${status.dot}
                        `}
                      />

                      <StatusIcon size={12} />

                      {status.label}

                    </div>

                  </div>

                  {/* ========================== */}
                  {/* CARD BODY */}
                  {/* ========================== */}

                  <div
                    className="
                      p-4
                      sm:p-6
                    "
                  >

                    {/* PRODUCTS */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mb-4
                      "
                    >

                      <div>

                        <p
                          className="
                            text-xs
                            font-black
                            text-gray-800
                          "
                        >
                          Ordered Items
                        </p>

                        <p
                          className="
                            text-[10px]
                            text-gray-400
                            mt-0.5
                          "
                        >
                          {getItemsCount(
                            order?.items
                          )}{" "}
                          items
                        </p>

                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-1
                          text-[10px]
                          text-gray-400
                        "
                      >

                        <CalendarDays size={12} />

                        {formatDate(
                          order?.orderedAt ||
                          order?.createdAt
                        )}

                      </div>

                    </div>

                    {/* PRODUCT IMAGES */}

                    <div
                      className="
                        flex
                        gap-3
                        overflow-x-auto
                        pb-1
                      "
                    >

                      {order?.items
                        ?.slice(0, 5)
                        .map((item, index) => (

                          <div
                            key={`${order?._id}-${index}`}
                            className="
                              relative
                              shrink-0
                              w-[72px]
                              h-[72px]
                              sm:w-[86px]
                              sm:h-[86px]
                              rounded-2xl
                              overflow-hidden
                              border
                              border-pink-100
                              bg-pink-50
                              group-hover:border-pink-200
                              transition
                            "
                          >

                            {item?.image ? (

                              <img
                                src={item.image}
                                alt={
                                  item?.name ||
                                  "Product"
                                }
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                  group-hover:scale-105
                                  transition
                                  duration-300
                                "
                              />

                            ) : (

                              <div
                                className="
                                  w-full
                                  h-full
                                  flex
                                  items-center
                                  justify-center
                                "
                              >
                                <Flower2
                                  size={25}
                                  className="text-pink-300"
                                />
                              </div>

                            )}

                            <div
                              className="
                                absolute
                                bottom-1
                                right-1
                                min-w-5
                                h-5
                                px-1
                                rounded-full
                                bg-black/65
                                text-white
                                text-[9px]
                                font-bold
                                flex
                                items-center
                                justify-center
                              "
                            >
                              ×{item?.quantity || 1}
                            </div>

                          </div>

                        ))}

                      {order?.items?.length > 5 && (

                        <div
                          className="
                            shrink-0
                            w-[72px]
                            h-[72px]
                            sm:w-[86px]
                            sm:h-[86px]
                            rounded-2xl
                            bg-gray-50
                            border
                            border-gray-100
                            flex
                            items-center
                            justify-center
                            text-xs
                            font-black
                            text-gray-500
                          "
                        >
                          +{order.items.length - 5}
                        </div>

                      )}

                    </div>

                    {/* ========================== */}
                    {/* INFO GRID */}
                    {/* ========================== */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        lg:grid-cols-5
                        gap-2.5
                        mt-5
                      "
                    >

                      {/* ITEMS */}

                      <div
                        className="
                          rounded-2xl
                          bg-gray-50
                          p-3
                          border
                          border-gray-100
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >

                          <ShoppingBag
                            size={14}
                            className="text-pink-500"
                          />

                          <span
                            className="
                              text-[9px]
                              text-gray-400
                            "
                          >
                            Items
                          </span>

                        </div>

                        <p
                          className="
                            mt-1
                            text-sm
                            font-black
                            text-gray-800
                          "
                        >
                          {getItemsCount(
                            order?.items
                          )}
                        </p>

                      </div>

                      {/* TOTAL */}

                      <div
                        className="
                          rounded-2xl
                          bg-pink-50
                          p-3
                          border
                          border-pink-100
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >

                          <CreditCard
                            size={14}
                            className="text-pink-500"
                          />

                          <span
                            className="
                              text-[9px]
                              text-gray-400
                            "
                          >
                            Order Total
                          </span>

                        </div>

                        <p
                          className="
                            mt-1
                            text-sm
                            font-black
                            text-pink-600
                          "
                        >
                          ₹
                          {Number(
                            order?.totalAmount || 0
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                      {/* PAYMENT */}

                      <div
                        className="
                          rounded-2xl
                          bg-gray-50
                          p-3
                          border
                          border-gray-100
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >

                          <CheckCircle2
                            size={14}
                            className="text-green-500"
                          />

                          <span
                            className="
                              text-[9px]
                              text-gray-400
                            "
                          >
                            Payment
                          </span>

                        </div>

                        <p
                          className={`
                            mt-1
                            text-xs
                            font-black
                            ${payment.className}
                          `}
                        >
                          {payment.label}
                        </p>

                      </div>

                      {/* ORDER DATE */}

                      <div
                        className="
                          rounded-2xl
                          bg-gray-50
                          p-3
                          border
                          border-gray-100
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >

                          <CalendarDays
                            size={14}
                            className="text-gray-500"
                          />

                          <span
                            className="
                              text-[9px]
                              text-gray-400
                            "
                          >
                            Ordered On
                          </span>

                        </div>

                        <p
                          className="
                            mt-1
                            text-xs
                            font-black
                            text-gray-700
                          "
                        >
                          {formatDate(
                            order?.orderedAt ||
                            order?.createdAt
                          )}
                        </p>

                      </div>

                      {/* DELIVERY DATE */}

                      <div
                        className="
                          rounded-2xl
                          bg-green-50
                          p-3
                          border
                          border-green-100
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >

                          <Truck
                            size={14}
                            className="text-green-500"
                          />

                          <span
                            className="
                              text-[9px]
                              text-gray-400
                            "
                          >
                            Delivery Date
                          </span>

                        </div>

                        <p
                          className="
                            mt-1
                            text-xs
                            font-black
                            text-green-600
                          "
                        >
                          {deliveryDate
                            ? formatDate(deliveryDate)
                            : "Not assigned"}
                        </p>

                      </div>

                    </div>

                    {/* ========================== */}
                    {/* DELIVERY INFO */}
                    {/* ========================== */}

                    {deliveryDate && (

                      <div
                        className="
                          mt-4
                          rounded-2xl
                          border
                          border-green-100
                          bg-gradient-to-r
                          from-green-50
                          to-white
                          px-4
                          py-3
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <div
                            className="
                              w-9
                              h-9
                              rounded-xl
                              bg-white
                              border
                              border-green-100
                              flex
                              items-center
                              justify-center
                              shrink-0
                            "
                          >
                            <Truck
                              size={17}
                              className="text-green-500"
                            />
                          </div>

                          <div>

                            <p
                              className="
                                text-[9px]
                                text-gray-400
                                uppercase
                                tracking-wider
                                font-semibold
                              "
                            >
                              Expected Delivery
                            </p>

                            <p
                              className="
                                mt-0.5
                                text-sm
                                font-black
                                text-gray-800
                              "
                            >
                              {formatDate(
                                deliveryDate
                              )}
                            </p>

                          </div>

                        </div>

                      </div>

                    )}

                    {/* ========================== */}
                    {/* PAYMENT SUMMARY */}
                    {/* ========================== */}

                    <div
                      className="
                        mt-4
                        rounded-2xl
                        border
                        border-gray-100
                        bg-gradient-to-r
                        from-gray-50
                        to-white
                        px-4
                        py-3
                      "
                    >

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          justify-between
                          gap-4
                        "
                      >

                        <div>

                          <p
                            className="
                              text-[9px]
                              text-gray-400
                            "
                          >
                            Payment Type
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-xs
                              font-bold
                              text-gray-700
                            "
                          >
                            {order?.paymentType ===
                            "partial"
                              ? "30% Advance Payment"
                              : "Full Payment"}
                          </p>

                        </div>

                        <div>

                          <p
                            className="
                              text-[9px]
                              text-gray-400
                            "
                          >
                            Paid
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-xs
                              font-black
                              text-green-600
                            "
                          >
                            ₹
                            {Number(
                              order?.paidAmount || 0
                            ).toLocaleString("en-IN")}
                          </p>

                        </div>

                        {Number(
                          order?.remainingAmount || 0
                        ) > 0 && (

                          <div>

                            <p
                              className="
                                text-[9px]
                                text-gray-400
                              "
                            >
                              Remaining
                            </p>

                            <p
                              className="
                                mt-0.5
                                text-xs
                                font-black
                                text-orange-500
                              "
                            >
                              ₹
                              {Number(
                                order?.remainingAmount || 0
                              ).toLocaleString("en-IN")}
                            </p>

                          </div>

                        )}

                      </div>

                    </div>

                    {/* ========================== */}
                    {/* FOOTER */}
                    {/* ========================== */}

                    <div
                      className="
                        mt-5
                        pt-4
                        border-t
                        border-gray-100
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-3
                      "
                    >

                      {/* LEFT INFO */}

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-gray-400
                        "
                      >

                        <div
                          className="
                            w-7
                            h-7
                            rounded-full
                            bg-green-50
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <MapPin
                            size={13}
                            className="text-green-500"
                          />
                        </div>

                        <span
                          className="
                            text-[10px]
                            sm:text-xs
                          "
                        >
                          Delivery address added
                        </span>

                      </div>

                      {/* BUTTONS */}

                      <div
                        className="
                          flex
                          flex-col
                          sm:flex-row
                          gap-2
                          w-full
                          sm:w-auto
                        "
                      >

                        {/* CANCEL ORDER */}

                        {showCancel && (

                          <button
                            type="button"
                            onClick={() =>
                              handleCancelOrder(order)
                            }
                            className="
                              w-full
                              sm:w-auto
                              px-5
                              py-2.5
                              rounded-full
                              bg-red-50
                              border
                              border-red-200
                              text-red-600
                              text-[10px]
                              sm:text-xs
                              font-bold
                              flex
                              items-center
                              justify-center
                              gap-1.5
                              hover:bg-red-100
                              hover:border-red-300
                              transition
                              cursor-pointer
                            "
                          >

                            <Ban size={14} />

                            Cancel Order

                          </button>

                        )}

                        {/* VIEW DETAILS */}

                        <button
                          type="button"
                          className="
                            group/btn
                            w-full
                            sm:w-auto
                            px-5
                            py-2.5
                            rounded-full
                            bg-gray-900
                            text-white
                            text-[10px]
                            sm:text-xs
                            font-bold
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            hover:bg-pink-600
                            transition
                            cursor-pointer
                          "
                          onClick={() => {

                            navigate(
                              `/My-Order/${order?._id}`,
                              {
                                state: {
                                  order,
                                },
                              }
                            );

                          }}
                        >

                          View Order Details

                          <ChevronRight
                            size={14}
                            className="
                              group-hover/btn:translate-x-0.5
                              transition
                            "
                          />

                        </button>

                      </div>

                    </div>

                  </div>
                </article>
              );
            })}

          </div>
        )}

      </main>

      {/* ===================================== */}
      {/* CANCEL ORDER POPUP */}
      {/* ===================================== */}

      <CancelOrderPopUp />

    </div>
  );
};
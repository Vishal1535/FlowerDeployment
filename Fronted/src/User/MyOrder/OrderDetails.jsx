import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Flower2,
  ShoppingBag,
  Package,
  CalendarDays,
  CreditCard,
  MapPin,
  CheckCircle2,
  Clock3,
  Truck,
  LoaderCircle,
  XCircle,
  Home,
  Receipt,
  Phone,
  Mail,
} from "lucide-react";

import { CancelOrderThunk } from "../../Store/Order/OrderApi";

export const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthorized } = useSelector((state) => state.user);

  // =========================================
  // AUTH CHECK
  // =========================================

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/", {
        replace: true,
      });
    }
  }, [isAuthorized, navigate]);

  // =========================================
  // ORDER
  // =========================================

  const order = location.state?.order;

  console.log("ORDER:", order);
  console.log("DELIVERY BOY:", order?.deliveryBoy);

  // =========================================
  // LOCAL STATES
  // =========================================

  const [isCancelModalOpen, setIsCancelModalOpen] =
    useState(false);

  const [isCancelling, setIsCancelling] =
    useState(false);

  const [cancelled, setCancelled] =
    useState(false);

  // =========================================
  // ORDER NOT FOUND
  // =========================================

  if (!order) {
    return (
      <div className="min-h-screen bg-[#fffafa]">

        {/* NAVBAR */}

        <header
          className="
            sticky
            top-0
            z-50
            bg-white/90
            backdrop-blur-xl
            border-b
            border-pink-100
            shadow-sm
          "
        >
          <div
            className="
              max-w-6xl
              mx-auto
              h-[72px]
              px-4
              sm:px-6
              flex
              items-center
              justify-between
            "
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
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

            <div className="flex items-center gap-2">

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

              <span className="text-lg font-black text-gray-800">
                Flower
              </span>

            </div>

            <div className="w-10" />

          </div>
        </header>

        {/* NOT FOUND */}

        <div
          className="
            min-h-[75vh]
            flex
            items-center
            justify-center
            px-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              bg-white
              rounded-3xl
              border
              border-pink-100
              shadow-sm
              p-8
              text-center
            "
          >
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
              "
            >
              <Package
                size={35}
                className="text-pink-400"
              />
            </div>

            <h2
              className="
                mt-5
                text-xl
                font-black
                text-gray-800
              "
            >
              Order Not Found
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-gray-500
              "
            >
              We couldn't find the order details.
            </p>

            <button
              type="button"
              onClick={() => navigate("/My-Order")}
              className="
                mt-6
                px-6
                py-3
                rounded-full
                bg-gradient-to-r
                from-pink-500
                to-rose-500
                text-white
                text-sm
                font-bold
                cursor-pointer
              "
            >
              Go To My Orders
            </button>

          </div>
        </div>

      </div>
    );
  }

  // =========================================
  // STATUS
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
          bg: "bg-green-50",
        };

      case "partial":
        return {
          label: "Partially Paid",
          className: "text-orange-500",
          bg: "bg-orange-50",
        };

      case "failed":
        return {
          label: "Failed",
          className: "text-red-500",
          bg: "bg-red-50",
        };

      default:
        return {
          label: "Pending",
          className: "text-yellow-600",
          bg: "bg-yellow-50",
        };
    }
  };

  // =========================================
  // DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================
  // TIME
  // =========================================

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =========================================
  // MONEY
  // =========================================

  const money = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN"
    );
  };

  // =========================================
  // ORDER DATA
  // =========================================

  const currentOrderStatus =
    cancelled
      ? "cancelled"
      : order?.orderStatus;

  const status =
    getOrderStatus(currentOrderStatus);

  const payment =
    getPaymentStatus(order?.paymentStatus);

  const StatusIcon =
    status.icon;

  const totalItems =
    order?.items?.reduce(
      (total, item) =>
        total +
        Number(item?.quantity || 0),
      0
    ) || 0;

  // =========================================
  // DELIVERY ADDRESS
  // =========================================

  const deliveryAddress =
    order?.address;

  // =========================================
  // DELIVERY DATE
  // =========================================

  const deliveryDate =
    order?.deliveryDate ||
    order?.deliverDate ||
    order?.expectedDeliveryDate;

  // =========================================
  // DELIVERY BOY
  // =========================================

  const deliveryBoy =
    order?.deliveryBoy;

  const deliveryBoyAddress =
    deliveryBoy?.address;

  // =========================================
  // CANCELABLE ORDER
  // =========================================

  const canCancelOrder =
    !cancelled &&
    [
      "pending",
      "confirmed",
      "processing",
    ].includes(order?.orderStatus);

  // =========================================
  // DELIVERY BOY ADDRESS FORMATTER
  // =========================================

  const formatDeliveryBoyAddress = (address) => {

    if (!address) {
      return "Address not available";
    }

    if (typeof address === "string") {
      return address;
    }

    return [
      address?.houseNumber,
      address?.area,
      address?.address,
      address?.street,
      address?.city,
      address?.state,
      address?.pincode,
      address?.country,
    ]
      .filter(Boolean)
      .join(", ") || "Address not available";
  };

  // =========================================
  // CANCEL ORDER
  // =========================================

  const handleCancelOrder = async () => {

    if (!order?._id) {
      toast.error("Order ID not found");
      return;
    }

    try {

      setIsCancelling(true);

      await dispatch(
        CancelOrderThunk(order._id)
      ).unwrap();

      setCancelled(true);

      setIsCancelModalOpen(false);

      toast.success(
        "Order cancelled successfully!"
      );

      navigate("/My-Order");

    } catch (error) {

      console.error(
        "Cancel order error:",
        error
      );

      toast.error(
        error ||
        "Failed to cancel order"
      );

    } finally {

      setIsCancelling(false);

    }
  };

  // =========================================
  // MAIN UI
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
            max-w-6xl
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

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => navigate(-1)}
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
                  "
                >
                  Flower
                </h1>

                <p
                  className="
                    text-[9px]
                    text-pink-500
                    font-semibold
                  "
                >
                  Bloom with love
                </p>

              </div>

            </div>

          </div>

          {/* CENTER */}

          <div className="flex flex-col items-center">

            <h2
              className="
                text-base
                sm:text-lg
                font-black
                text-gray-900
              "
            >
              Order Details
            </h2>

            <p
              className="
                text-[9px]
                sm:text-[10px]
                text-gray-400
                mt-0.5
              "
            >
              Your order information
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
            <Receipt
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
          max-w-6xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-6
          sm:py-8
        "
      >

        {/* =================================== */}
        {/* ORDER HERO */}
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
            shadow-xl
            shadow-pink-100
          "
        >

          <div
            className="
              absolute
              -right-12
              -top-16
              w-40
              h-40
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -right-5
              -bottom-20
              w-48
              h-48
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-5
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-pink-100
                  font-bold
                "
              >
                Order #{order?._id?.slice(-10)}
              </p>

              <h1
                className="
                  mt-1
                  text-2xl
                  sm:text-3xl
                  font-black
                  text-white
                "
              >
                Order Details
              </h1>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  mt-2
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    text-pink-100
                  "
                >
                  <CalendarDays size={13} />

                  {formatDate(
                    order?.orderedAt ||
                    order?.createdAt
                  )}
                </div>

                <span className="text-pink-200">
                  •
                </span>

                <span className="text-xs text-pink-100">
                  {totalItems} items
                </span>

                {deliveryDate && (
                  <>
                    <span className="text-pink-200">
                      •
                    </span>

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        text-pink-100
                        font-semibold
                      "
                    >
                      <Truck size={13} />

                      Delivery:{" "}
                      {formatDate(
                        deliveryDate
                      )}
                    </div>
                  </>
                )}

              </div>

            </div>

            {/* STATUS */}

            <div
              className="
                self-start
                sm:self-auto
                bg-white
                rounded-2xl
                px-4
                py-3
                shadow-lg
              "
            >

              <p
                className="
                  text-[9px]
                  text-gray-400
                  font-semibold
                  uppercase
                  tracking-wider
                "
              >
                Order Status
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mt-1
                "
              >

                <span
                  className={`
                    w-2
                    h-2
                    rounded-full
                    ${status.dot}
                  `}
                />

                <StatusIcon
                  size={14}
                  className={
                    status.box
                      .split(" ")
                      .find((item) =>
                        item.startsWith("text-")
                      )
                  }
                />

                <span
                  className="
                    text-xs
                    font-black
                    text-gray-800
                  "
                >
                  {status.label}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =================================== */}
        {/* GRID */}
        {/* =================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-5
            mt-6
          "
        >

          {/* ================================= */}
          {/* LEFT */}
          {/* ================================= */}

          <div
            className="
              lg:col-span-2
              space-y-5
            "
          >

            {/* ================================= */}
            {/* PRODUCTS */}
            {/* ================================= */}

            <section
              className="
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                overflow-hidden
              "
            >

              <div
                className="
                  px-5
                  sm:px-6
                  py-4
                  border-b
                  border-gray-100
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h2
                    className="
                      text-sm
                      sm:text-base
                      font-black
                      text-gray-800
                    "
                  >
                    Ordered Items
                  </h2>

                  <p
                    className="
                      text-[10px]
                      text-gray-400
                      mt-0.5
                    "
                  >
                    {totalItems} items in this order
                  </p>

                </div>

                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-pink-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ShoppingBag
                    size={17}
                    className="text-pink-500"
                  />
                </div>

              </div>

              <div
                className="
                  divide-y
                  divide-gray-100
                "
              >

                {order?.items?.map(
                  (item, index) => {

                    const itemTotal =
                      Number(
                        item?.totalPrice
                      ) ||
                      Number(
                        item?.price || 0
                      ) *
                        Number(
                          item?.quantity || 1
                        );

                    return (
                      <div
                        key={`${item?.product || index}-${index}`}
                        className="
                          p-4
                          sm:p-5
                          flex
                          gap-4
                          hover:bg-pink-50/30
                          transition
                        "
                      >

                        {/* IMAGE */}

                        <div
                          className="
                            relative
                            shrink-0
                            w-20
                            h-20
                            sm:w-24
                            sm:h-24
                            rounded-2xl
                            overflow-hidden
                            bg-pink-50
                            border
                            border-pink-100
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
                                size={30}
                                className="text-pink-300"
                              />
                            </div>
                          )}

                          <span
                            className="
                              absolute
                              bottom-1
                              right-1
                              min-w-5
                              h-5
                              px-1.5
                              rounded-full
                              bg-black/70
                              text-white
                              text-[9px]
                              font-bold
                              flex
                              items-center
                              justify-center
                            "
                          >
                            ×{item?.quantity || 1}
                          </span>

                        </div>

                        {/* INFO */}

                        <div
                          className="
                            flex-1
                            min-w-0
                            flex
                            flex-col
                            justify-between
                          "
                        >

                          <div>

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-3
                              "
                            >

                              <div>

                                <p
                                  className="
                                    text-sm
                                    sm:text-base
                                    font-black
                                    text-gray-800
                                    line-clamp-2
                                  "
                                >
                                  {item?.name ||
                                    "Flower Product"}
                                </p>

                                <p
                                  className="
                                    mt-1
                                    text-[9px]
                                    text-gray-400
                                    capitalize
                                  "
                                >
                                  {item?.productType ||
                                    "Product"}
                                </p>

                              </div>

                              <p
                                className="
                                  shrink-0
                                  text-sm
                                  sm:text-base
                                  font-black
                                  text-pink-600
                                "
                              >
                                ₹{money(itemTotal)}
                              </p>

                            </div>

                          </div>

                          <div
                            className="
                              flex
                              items-center
                              justify-between
                              mt-3
                            "
                          >

                            <p
                              className="
                                text-[10px]
                                text-gray-400
                              "
                            >
                              ₹{money(item?.price)} ×{" "}
                              {item?.quantity || 1}
                            </p>

                            <p
                              className="
                                text-[10px]
                                text-gray-500
                                font-semibold
                              "
                            >
                              Item total
                            </p>

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </section>

            {/* ================================= */}
            {/* DELIVERY ADDRESS */}
            {/* ================================= */}

            <section
              className="
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                overflow-hidden
              "
            >

              <div
                className="
                  px-5
                  sm:px-6
                  py-4
                  border-b
                  border-gray-100
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
                    bg-green-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <MapPin
                    size={17}
                    className="text-green-500"
                  />
                </div>

                <div>

                  <h2
                    className="
                      text-sm
                      sm:text-base
                      font-black
                      text-gray-800
                    "
                  >
                    Delivery Address
                  </h2>

                  <p
                    className="
                      text-[10px]
                      text-gray-400
                      mt-0.5
                    "
                  >
                    Your order will be delivered here
                  </p>

                </div>

              </div>

              <div className="p-5 sm:p-6">

                {deliveryAddress &&
                typeof deliveryAddress === "object" ? (

                  <div
                    className="
                      rounded-2xl
                      border
                      border-gray-100
                      bg-gradient-to-br
                      from-gray-50
                      to-white
                      p-4
                      sm:p-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >

                      <div
                        className="
                          w-10
                          h-10
                          shrink-0
                          rounded-xl
                          bg-pink-50
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Home
                          size={17}
                          className="text-pink-500"
                        />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p
                          className="
                            text-sm
                            sm:text-base
                            font-black
                            text-gray-800
                          "
                        >
                          {deliveryAddress?.name ||
                            deliveryAddress?.fullName ||
                            deliveryAddress?.receiverName ||
                            "Delivery Address"}
                        </p>

                        {(deliveryAddress?.address ||
                          deliveryAddress?.street ||
                          deliveryAddress?.addressLine ||
                          deliveryAddress?.addressLine1) && (
                          <p
                            className="
                              mt-1.5
                              text-xs
                              sm:text-sm
                              text-gray-600
                              leading-5
                            "
                          >
                            {deliveryAddress?.address ||
                              deliveryAddress?.street ||
                              deliveryAddress?.addressLine ||
                              deliveryAddress?.addressLine1}
                          </p>
                        )}

                        {deliveryAddress?.area && (
                          <p
                            className="
                              text-xs
                              sm:text-sm
                              text-gray-600
                              leading-5
                            "
                          >
                            {deliveryAddress.area}
                          </p>
                        )}

                        {(deliveryAddress?.city ||
                          deliveryAddress?.state) && (
                          <p
                            className="
                              text-xs
                              sm:text-sm
                              text-gray-600
                              leading-5
                            "
                          >
                            {deliveryAddress?.city}

                            {deliveryAddress?.city &&
                            deliveryAddress?.state
                              ? ", "
                              : ""}

                            {deliveryAddress?.state}
                          </p>
                        )}

                        {deliveryAddress?.pincode && (
                          <p
                            className="
                              text-xs
                              sm:text-sm
                              text-gray-600
                              font-medium
                            "
                          >
                            {deliveryAddress.pincode}
                          </p>
                        )}

                        {deliveryAddress?.phone && (
                          <div
                            className="
                              mt-3
                              pt-3
                              border-t
                              border-gray-200
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <span
                              className="
                                text-[10px]
                                text-gray-400
                              "
                            >
                              Phone
                            </span>

                            <span
                              className="
                                text-xs
                                font-bold
                                text-gray-700
                              "
                            >
                              {deliveryAddress.phone}
                            </span>

                          </div>
                        )}

                      </div>

                    </div>

                  </div>

                ) : (

                  <div
                    className="
                      rounded-2xl
                      bg-gray-50
                      border
                      border-gray-100
                      p-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <MapPin
                        size={18}
                        className="text-gray-400"
                      />

                      <p
                        className="
                          text-sm
                          text-gray-500
                        "
                      >
                        {deliveryAddress ||
                          "Address information unavailable"}
                      </p>

                    </div>

                  </div>

                )}

              </div>

            </section>

          </div>

          {/* ================================= */}
          {/* RIGHT */}
          {/* ================================= */}

          <div className="space-y-5">

            {/* ================================= */}
            {/* PAYMENT SUMMARY */}
            {/* ================================= */}

            <section
              className="
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                overflow-hidden
              "
            >

              <div
                className="
                  px-5
                  py-4
                  border-b
                  border-gray-100
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
                    bg-pink-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CreditCard
                    size={17}
                    className="text-pink-500"
                  />
                </div>

                <div>

                  <h2
                    className="
                      text-sm
                      font-black
                      text-gray-800
                    "
                  >
                    Payment Summary
                  </h2>

                  <p
                    className="
                      text-[10px]
                      text-gray-400
                    "
                  >
                    Payment information
                  </p>

                </div>

              </div>

              <div className="p-5">

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    text-xs
                  "
                >
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span
                    className="
                      font-semibold
                      text-gray-700
                    "
                  >
                    ₹{money(order?.subtotal)}
                  </span>

                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    text-xs
                    mt-3
                  "
                >

                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span
                    className="
                      font-bold
                      text-green-500
                    "
                  >
                    {Number(
                      order?.deliveryCharge || 0
                    ) === 0
                      ? "FREE"
                      : `₹${money(
                          order?.deliveryCharge
                        )}`}
                  </span>

                </div>

                <div
                  className="
                    border-t
                    border-dashed
                    border-gray-200
                    my-4
                  "
                />

                <div
                  className="
                    rounded-2xl
                    bg-pink-50
                    border
                    border-pink-100
                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div>

                      <p
                        className="
                          text-[9px]
                          text-gray-400
                        "
                      >
                        Order Total
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-xl
                          font-black
                          text-pink-600
                        "
                      >
                        ₹{money(
                          order?.totalAmount
                        )}
                      </p>

                    </div>

                    <Receipt
                      size={20}
                      className="text-pink-400"
                    />

                  </div>

                </div>

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      text-[10px]
                      text-gray-400
                    "
                  >
                    Payment Type
                  </span>

                  <span
                    className="
                      text-[10px]
                      font-bold
                      text-gray-700
                    "
                  >
                    {order?.paymentType ===
                    "partial"
                      ? "30% Advance"
                      : "Full Payment"}
                  </span>

                </div>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      text-[10px]
                      text-gray-400
                    "
                  >
                    Paid Amount
                  </span>

                  <span
                    className="
                      text-xs
                      font-black
                      text-green-600
                    "
                  >
                    ₹{money(
                      order?.paidAmount
                    )}
                  </span>

                </div>

                {Number(
                  order?.remainingAmount || 0
                ) > 0 && (
                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        text-[10px]
                        text-gray-400
                      "
                    >
                      Remaining
                    </span>

                    <span
                      className="
                        text-xs
                        font-black
                        text-orange-500
                      "
                    >
                      ₹{money(
                        order?.remainingAmount
                      )}
                    </span>

                  </div>
                )}

                <div
                  className={`
                    mt-4
                    rounded-xl
                    px-3
                    py-2.5
                    ${payment.bg}
                    flex
                    items-center
                    justify-between
                  `}
                >

                  <span
                    className="
                      text-[10px]
                      text-gray-500
                    "
                  >
                    Payment Status
                  </span>

                  <span
                    className={`
                      text-[10px]
                      font-black
                      ${payment.className}
                    `}
                  >
                    {payment.label}
                  </span>

                </div>

              </div>

            </section>

            {/* ================================= */}
            {/* ORDER INFORMATION */}
            {/* ================================= */}

            <section
              className="
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                overflow-hidden
              "
            >

              <div
                className="
                  px-5
                  py-4
                  border-b
                  border-gray-100
                "
              >

                <h2
                  className="
                    text-sm
                    font-black
                    text-gray-800
                  "
                >
                  Order Information
                </h2>

              </div>

              <div
                className="
                  p-5
                  space-y-4
                "
              >

                <div>

                  <p
                    className="
                      text-[9px]
                      text-gray-400
                      uppercase
                      tracking-wider
                    "
                  >
                    Order ID
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      font-bold
                      text-gray-700
                      break-all
                    "
                  >
                    #{order?._id}
                  </p>

                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <CalendarDays
                      size={14}
                      className="text-gray-400"
                    />

                    <span
                      className="
                        text-[10px]
                        text-gray-500
                      "
                    >
                      Ordered On
                    </span>

                  </div>

                  <span
                    className="
                      text-[10px]
                      font-bold
                      text-gray-700
                    "
                  >
                    {formatDate(
                      order?.orderedAt ||
                      order?.createdAt
                    )}
                  </span>

                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <Truck
                      size={14}
                      className="text-pink-500"
                    />

                    <span
                      className="
                        text-[10px]
                        text-gray-500
                      "
                    >
                      Delivery Date
                    </span>

                  </div>

                  <span
                    className="
                      text-[10px]
                      font-black
                      text-pink-600
                    "
                  >
                    {deliveryDate
                      ? formatDate(deliveryDate)
                      : "Not available"}
                  </span>

                </div>

                {(order?.orderedAt ||
                  order?.createdAt) && (
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >

                    <span
                      className="
                        text-[10px]
                        text-gray-500
                      "
                    >
                      Time
                    </span>

                    <span
                      className="
                        text-[10px]
                        font-bold
                        text-gray-700
                      "
                    >
                      {formatTime(
                        order?.orderedAt ||
                        order?.createdAt
                      )}
                    </span>

                  </div>
                )}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <span
                    className="
                      text-[10px]
                      text-gray-500
                    "
                  >
                    Payment Method
                  </span>

                  <span
                    className="
                      text-[10px]
                      font-bold
                      text-gray-700
                      capitalize
                    "
                  >
                    {order?.paymentMethod ||
                      "Online"}
                  </span>

                </div>

              </div>

            </section>

            {/* ================================= */}
            {/* DELIVERY BOY */}
            {/* ONLY OUT FOR DELIVERY */}
            {/* ================================= */}

            {currentOrderStatus ===
              "out_for_delivery" &&
              deliveryBoy && (

                <section
                  className="
                    bg-white
                    rounded-3xl
                    border
                    border-orange-100
                    shadow-sm
                    overflow-hidden
                  "
                >

                  {/* HEADER */}

                  <div
                    className="
                      px-5
                      py-4
                      border-b
                      border-orange-100
                      bg-orange-50/50
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
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Truck
                        size={17}
                        className="text-orange-500"
                      />
                    </div>

                    <div>

                      <h2
                        className="
                          text-sm
                          font-black
                          text-gray-800
                        "
                      >
                        Delivery Boy
                      </h2>

                      <p
                        className="
                          text-[10px]
                          text-gray-400
                        "
                      >
                        Your order is out for delivery
                      </p>

                    </div>

                  </div>

                  {/* DETAILS */}

                  <div className="p-5">

                    <div
                      className="
                        rounded-2xl
                        border
                        border-gray-100
                        bg-gradient-to-br
                        from-orange-50
                        to-white
                        p-4
                      "
                    >

                      {/* PROFILE */}

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            w-11
                            h-11
                            shrink-0
                            rounded-full
                            bg-gradient-to-br
                            from-orange-400
                            to-pink-500
                            flex
                            items-center
                            justify-center
                            text-white
                            text-base
                            font-black
                          "
                        >
                          {deliveryBoy?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "D"}
                        </div>

                        <div className="min-w-0">

                          <p
                            className="
                              text-sm
                              font-black
                              text-gray-800
                              truncate
                            "
                          >
                            {deliveryBoy?.name ||
                              "Delivery Boy"}
                          </p>

                          <p
                            className="
                              text-[10px]
                              text-gray-400
                              mt-0.5
                            "
                          >
                            Delivery Partner
                          </p>

                        </div>

                      </div>

                      {/* PHONE */}

                      {deliveryBoy?.phone && (
                        <div
                          className="
                            mt-4
                            flex
                            items-center
                            gap-2
                            pt-3
                            border-t
                            border-orange-100
                          "
                        >

                          <Phone
                            size={14}
                            className="text-orange-500"
                          />

                          <span
                            className="
                              text-xs
                              font-semibold
                              text-gray-600
                            "
                          >
                            {deliveryBoy.phone}
                          </span>

                        </div>
                      )}

                      {/* EMAIL */}

                      {deliveryBoy?.email && (
                        <div
                          className="
                            mt-2
                            flex
                            items-start
                            gap-2
                          "
                        >

                          <Mail
                            size={14}
                            className="
                              text-orange-500
                              mt-0.5
                              shrink-0
                            "
                          />

                          <span
                            className="
                              text-xs
                              text-gray-600
                              break-all
                            "
                          >
                            {deliveryBoy.email}
                          </span>

                        </div>
                      )}

                      {/* ADDRESS */}

                      <div
                        className="
                          mt-2
                          flex
                          items-start
                          gap-2
                        "
                      >

                        <MapPin
                          size={14}
                          className="
                            text-orange-500
                            mt-0.5
                            shrink-0
                          "
                        />

                        <span
                          className="
                            text-xs
                            leading-5
                            text-gray-600
                          "
                        >
                          {formatDeliveryBoyAddress(
                            deliveryBoyAddress
                          )}
                        </span>

                      </div>

                    </div>

                  </div>

                </section>

              )}

          </div>

        </div>

        {/* =================================== */}
        {/* ORDER TRACKING */}
        {/* =================================== */}

        <section
          className="
            mt-5
            bg-white
            rounded-3xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          "
        >

          <div
            className="
              px-5
              sm:px-6
              py-4
              border-b
              border-gray-100
            "
          >

            <h2
              className="
                text-sm
                sm:text-base
                font-black
                text-gray-800
              "
            >
              Order Tracking
            </h2>

            <p
              className="
                text-[10px]
                text-gray-400
                mt-0.5
              "
            >
              Current status of your order
            </p>

          </div>

          <div
            className="
              p-5
              sm:p-7
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                gap-2
              "
            >

              {/* CONFIRMED */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  text-center
                  flex-1
                "
              >

                <div
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    border
                    ${
                      [
                        "confirmed",
                        "processing",
                        "shipped",
                        "out_for_delivery",
                        "delivered",
                      ].includes(
                        currentOrderStatus
                      )
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }
                  `}
                >

                  <CheckCircle2
                    size={18}
                    className={
                      [
                        "confirmed",
                        "processing",
                        "shipped",
                        "out_for_delivery",
                        "delivered",
                      ].includes(
                        currentOrderStatus
                      )
                        ? "text-green-500"
                        : "text-gray-300"
                    }
                  />

                </div>

                <p
                  className="
                    mt-2
                    text-[9px]
                    sm:text-[10px]
                    font-bold
                    text-gray-700
                  "
                >
                  Confirmed
                </p>

              </div>

              <div
                className="
                  h-0.5
                  flex-1
                  bg-gray-200
                  max-w-16
                "
              />

              {/* PROCESSING */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  text-center
                  flex-1
                "
              >

                <div
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    border
                    ${
                      [
                        "processing",
                        "shipped",
                        "out_for_delivery",
                        "delivered",
                      ].includes(
                        currentOrderStatus
                      )
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }
                  `}
                >

                  <LoaderCircle
                    size={18}
                    className={
                      [
                        "processing",
                        "shipped",
                        "out_for_delivery",
                        "delivered",
                      ].includes(
                        currentOrderStatus
                      )
                        ? "text-green-500"
                        : "text-gray-300"
                    }
                  />

                </div>

                <p
                  className="
                    mt-2
                    text-[9px]
                    sm:text-[10px]
                    font-bold
                    text-gray-700
                  "
                >
                  Processing
                </p>

              </div>

              <div
                className="
                  h-0.5
                  flex-1
                  bg-gray-200
                  max-w-16
                "
              />

              {/* SHIPPED */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  text-center
                  flex-1
                "
              >

                <div
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    border
                    ${
                      [
                        "shipped",
                        "out_for_delivery",
                        "delivered",
                      ].includes(
                        currentOrderStatus
                      )
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }
                  `}
                >

                  <Truck
                    size={18}
                    className={
                      [
                        "shipped",
                        "out_for_delivery",
                        "delivered",
                      ].includes(
                        currentOrderStatus
                      )
                        ? "text-green-500"
                        : "text-gray-300"
                    }
                  />

                </div>

                <p
                  className="
                    mt-2
                    text-[9px]
                    sm:text-[10px]
                    font-bold
                    text-gray-700
                  "
                >
                  Shipped
                </p>

              </div>

              <div
                className="
                  h-0.5
                  flex-1
                  bg-gray-200
                  max-w-16
                "
              />

              {/* DELIVERED */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  text-center
                  flex-1
                "
              >

                <div
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    border
                    ${
                      currentOrderStatus ===
                      "delivered"
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }
                  `}
                >

                  <Package
                    size={18}
                    className={
                      currentOrderStatus ===
                      "delivered"
                        ? "text-green-500"
                        : "text-gray-300"
                    }
                  />

                </div>

                <p
                  className="
                    mt-2
                    text-[9px]
                    sm:text-[10px]
                    font-bold
                    text-gray-700
                  "
                >
                  Delivered
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =================================== */}
        {/* BOTTOM BUTTONS */}
        {/* =================================== */}

        <div
          className="
            mt-5
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
          "
        >

          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              navigate("/My-Order")
            }
            className="
              w-full
              sm:w-auto
              px-6
              py-3
              rounded-full
              bg-white
              border
              border-gray-200
              text-gray-700
              text-xs
              font-bold
              hover:border-pink-300
              hover:text-pink-600
              transition
              cursor-pointer
            "
          >

            <span
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <ArrowLeft size={14} />
              Back to My Orders
            </span>

          </button>

          {/* RIGHT */}

          <div
            className="
              w-full
              sm:w-auto
              flex
              flex-col
              sm:flex-row
              items-center
              gap-3
            "
          >

            {/* CANCEL */}

            {canCancelOrder && (
              <button
                type="button"
                onClick={() =>
                  setIsCancelModalOpen(true)
                }
                className="
                  w-full
                  sm:w-auto
                  px-6
                  py-3
                  rounded-full
                  bg-red-50
                  border
                  border-red-200
                  text-red-600
                  text-xs
                  font-bold
                  hover:bg-red-100
                  hover:border-red-300
                  transition
                  cursor-pointer
                "
              >

                <span
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <XCircle size={14} />
                  Cancel Order
                </span>

              </button>
            )}

            {/* THANK YOU */}

            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                text-gray-400
              "
            >

              <CheckCircle2
                size={13}
                className="text-green-500"
              />

              Thank you for shopping with Flower

            </div>

          </div>

        </div>

      </main>

      {/* ===================================== */}
      {/* CANCEL MODAL */}
      {/* ===================================== */}

      {isCancelModalOpen && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            px-4
          "
        >

          <div
            className="
              w-full
              max-w-md
              bg-white
              rounded-3xl
              shadow-2xl
              border
              border-red-100
              p-6
              sm:p-7
            "
          >

            {/* ICON */}

            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-full
                bg-red-50
                flex
                items-center
                justify-center
              "
            >
              <XCircle
                size={32}
                className="text-red-500"
              />
            </div>

            {/* TITLE */}

            <h2
              className="
                mt-5
                text-xl
                font-black
                text-gray-800
                text-center
              "
            >
              Cancel Order?
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-gray-500
                text-center
                leading-6
              "
            >
              Are you sure you want to cancel this
              order? This action cannot be undone.
            </p>

            {/* ORDER */}

            <div
              className="
                mt-5
                rounded-2xl
                bg-gray-50
                border
                border-gray-100
                p-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >

                <div>

                  <p
                    className="
                      text-[9px]
                      text-gray-400
                      uppercase
                      tracking-wider
                    "
                  >
                    Order
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      font-black
                      text-gray-700
                      break-all
                    "
                  >
                    #{order?._id}
                  </p>

                </div>

                <p
                  className="
                    text-sm
                    font-black
                    text-pink-600
                  "
                >
                  ₹{money(
                    order?.totalAmount
                  )}
                </p>

              </div>

            </div>

            {/* BUTTONS */}

            <div
              className="
                mt-6
                flex
                flex-col
                sm:flex-row
                gap-3
              "
            >

              {/* KEEP */}

              <button
                type="button"
                disabled={isCancelling}
                onClick={() =>
                  setIsCancelModalOpen(false)
                }
                className="
                  flex-1
                  px-5
                  py-3
                  rounded-full
                  bg-gray-100
                  text-gray-700
                  text-xs
                  font-bold
                  hover:bg-gray-200
                  transition
                  cursor-pointer
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                Keep Order
              </button>

              {/* CANCEL */}

              <button
                type="button"
                disabled={isCancelling}
                onClick={handleCancelOrder}
                className="
                  flex-1
                  px-5
                  py-3
                  rounded-full
                  bg-red-500
                  text-white
                  text-xs
                  font-bold
                  hover:bg-red-600
                  transition
                  cursor-pointer
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >

                {isCancelling ? (
                  <span
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <LoaderCircle
                      size={14}
                      className="animate-spin"
                    />
                    Cancelling...
                  </span>
                ) : (
                  "Yes, Cancel Order"
                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};
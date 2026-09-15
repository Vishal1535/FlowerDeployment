import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Phone,
  IndianRupee,
  CheckCircle,
  Bike,
  CalendarDays,
  CreditCard,
  Navigation,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getMySingleOrderThunk,
  acceptOrderThunk,
} from "../../../Store/DeliveryBoy/DeliveryBoyApi";

export const SignalOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedOrder,
    loading,
    error,
  } = useSelector((state) => state.DeliveryBoy || {});

  // =====================================================
  // GET SINGLE ORDER
  // =====================================================

  useEffect(() => {
    if (id) {
      dispatch(getMySingleOrderThunk(id));
    }
  }, [dispatch, id]);

  // =====================================================
  // ACCEPT ORDER
  // =====================================================

  const handleAcceptOrder = async () => {
    if (!id) {
      toast.error("Order ID not found");
      return;
    }

    const result = await dispatch(
      acceptOrderThunk(id)
    );

    if (acceptOrderThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
          "Order accepted successfully!"
      );
    } else {
      toast.error(
        result.payload ||
          "Failed to accept order"
      );
    }
  };

  // =====================================================
  // FORMAT ORDER ID
  // =====================================================

  const formatOrderId = (orderId) => {
    if (!orderId) return "Order";

    return `Order #${orderId.slice(-7)}`;
  };

  // =====================================================
  // FORMAT STATUS
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "shipped":
        return "bg-orange-50 text-orange-600 border-orange-100";

      case "out_for_delivery":
        return "bg-blue-50 text-blue-600 border-blue-100";

      case "delivered":
        return "bg-green-50 text-green-600 border-green-100";

      case "cancelled":
        return "bg-red-50 text-red-600 border-red-100";

      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "shipped":
        return "Shipped";

      case "out_for_delivery":
        return "Out for Delivery";

      case "delivered":
        return "Delivered";

      case "cancelled":
        return "Cancelled";

      default:
        return status || "Unknown";
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading && !selectedOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4">

        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-100 flex items-center justify-center">

            <Package
              size={30}
              className="text-pink-500 animate-pulse"
            />

          </div>

          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading order...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // ORDER NOT FOUND
  // =====================================================

  if (!selectedOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4">

        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 max-w-md w-full text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center">

            <Package
              size={30}
              className="text-red-400"
            />

          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-5">
            Order not found
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {error ||
              "We couldn't find the requested order."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700 transition"
          >
            <ArrowLeft size={17} />
            Back to My Orders
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // DATA
  // =====================================================

  const address = selectedOrder.address || {};

  const user = selectedOrder.user || {};

  const deliveryBoy =
    selectedOrder.deliveryBoy || {};

  // =====================================================
  // CUSTOMER
  // =====================================================

  const customerName =
    user.name ||
    address.fullName ||
    "Customer";

  const phone =
    user.phone ||
    address.phone ||
    "Not available";

  // =====================================================
  // ADDRESS
  // =====================================================

  const addressParts = [
    address.houseNumber,
    address.area,
    address.landmark,
    address.city,
    address.state,
    address.pincode,
    address.country,
  ].filter(Boolean);

  const fullAddress =
    addressParts.length > 0
      ? addressParts.join(", ")
      : "Address not available";

  // =====================================================
  // ORDER DATA
  // =====================================================

  const totalAmount =
    selectedOrder.totalAmount ??
    selectedOrder.paidAmount ??
    0;

  const subtotal =
    selectedOrder.subtotal ?? 0;

  const deliveryCharge =
    selectedOrder.deliveryCharge ?? 0;

  const status =
    selectedOrder.orderStatus || "Unknown";

  const deliveryType =
    selectedOrder.deliveryType || "standard";

  const paymentMethod =
    selectedOrder.paymentMethod || "Not available";

  const paymentStatus =
    selectedOrder.paymentStatus || "Not available";

  // =====================================================
  // ITEMS
  // =====================================================

  const items = selectedOrder.items || [];

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 px-4 sm:px-6 lg:px-8 py-6">

      <div className="max-w-5xl mx-auto">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            navigate("/delivery-boy/orders")
          }
          className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2.5
            bg-white
            border
            border-gray-200
            rounded-xl
            text-sm
            font-medium
            text-gray-600
            hover:bg-pink-50
            hover:text-pink-600
            hover:border-pink-200
            transition
            shadow-sm
          "
        >
          <ArrowLeft size={18} />

          Back to Orders
        </button>

        {/* =================================================
            ORDER HEADER
        ================================================= */}

        <div className="bg-white border border-pink-100 rounded-3xl shadow-sm mt-5 overflow-hidden">

          <div className="p-6 sm:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">

                  <Package size={28} />

                </div>

                <div>

                  <p className="text-sm text-pink-500 font-medium">
                    Delivery Order
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
                    {formatOrderId(
                      selectedOrder._id
                    )}
                  </h1>

                </div>

              </div>

              <span
                className={`
                  inline-flex
                  items-center
                  justify-center
                  px-4
                  py-2
                  rounded-full
                  border
                  text-sm
                  font-semibold
                  capitalize
                  ${getStatusStyle(status)}
                `}
              >
                {getStatusText(status)}
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            CUSTOMER + ADDRESS
        ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

          {/* CUSTOMER */}

          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">

            <h2 className="text-lg font-bold text-gray-800">
              Customer Details
            </h2>

            <div className="mt-5 space-y-4">

              {/* NAME */}

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">

                  <User size={20} />

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Customer
                  </p>

                  <p className="text-sm font-semibold text-gray-800 capitalize">
                    {customerName}
                  </p>

                </div>

              </div>

              {/* PHONE */}

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">

                  <Phone size={20} />

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Phone
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    {phone}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ADDRESS */}

          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">

            <div className="flex items-center justify-between gap-3">

              <h2 className="text-lg font-bold text-gray-800">
                Delivery Address
              </h2>

              {address.location?.latitude &&
                address.location?.longitude && (
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                    <Navigation size={19} />
                  </div>
                )}

            </div>

            <div className="mt-5 flex items-start gap-3">

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">

                <MapPin size={20} />

              </div>

              <div className="min-w-0">

                <p className="text-xs text-gray-400">
                  Address
                </p>

                <p className="text-sm font-semibold text-gray-800 leading-6 mt-1">
                  {fullAddress}
                </p>

              </div>

            </div>

            {/* LOCATION */}

            {address.location?.latitude &&
              address.location?.longitude && (

                <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100">

                  <p className="text-xs text-blue-600 font-medium">
                    Delivery Location
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Latitude:{" "}
                    {address.location.latitude}
                  </p>

                  <p className="text-xs text-gray-500">
                    Longitude:{" "}
                    {address.location.longitude}
                  </p>

                </div>

              )}

          </div>

        </div>

        {/* =================================================
            ORDER INFORMATION
        ================================================= */}

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-5 p-6">

          <h2 className="text-lg font-bold text-gray-800">
            Order Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

            {/* TOTAL */}

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100">

              <div className="flex items-center gap-2">

                <IndianRupee
                  size={18}
                  className="text-pink-500"
                />

                <p className="text-xs text-gray-500">
                  Total Amount
                </p>

              </div>

              <p className="text-xl font-bold text-gray-800 mt-2">
                ₹{totalAmount}
              </p>

            </div>

            {/* DELIVERY TYPE */}

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">

              <div className="flex items-center gap-2">

                <Bike
                  size={18}
                  className="text-blue-500"
                />

                <p className="text-xs text-gray-500">
                  Delivery Type
                </p>

              </div>

              <p className="text-base font-bold text-gray-800 mt-2 capitalize">
                {deliveryType}
              </p>

            </div>

            {/* PAYMENT */}

            <div className="p-4 rounded-2xl bg-green-50 border border-green-100">

              <div className="flex items-center gap-2">

                <CreditCard
                  size={18}
                  className="text-green-500"
                />

                <p className="text-xs text-gray-500">
                  Payment
                </p>

              </div>

              <p className="text-sm font-bold text-gray-800 mt-2 capitalize">
                {paymentMethod}
              </p>

              <p className="text-xs text-green-600 mt-1 capitalize">
                {paymentStatus}
              </p>

            </div>

            {/* DELIVERY DATE */}

            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">

              <div className="flex items-center gap-2">

                <CalendarDays
                  size={18}
                  className="text-orange-500"
                />

                <p className="text-xs text-gray-500">
                  Delivery Date
                </p>

              </div>

              <p className="text-sm font-bold text-gray-800 mt-2">
                {formatDate(
                  selectedOrder.deliverDate
                )}
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            ORDER ITEMS
        ================================================= */}

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-5 overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-100">

            <h2 className="text-lg font-bold text-gray-800">
              Order Items
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {items.length}{" "}
              {items.length === 1
                ? "item"
                : "items"}{" "}
              in this order
            </p>

          </div>

          <div className="divide-y divide-gray-100">

            {items.length === 0 ? (

              <div className="p-8 text-center">

                <Package
                  size={28}
                  className="mx-auto text-gray-300"
                />

                <p className="text-sm text-gray-500 mt-2">
                  No items found
                </p>

              </div>

            ) : (

              items.map((item, index) => (

                <div
                  key={
                    item._id ||
                    item.product ||
                    index
                  }
                  className="p-5 flex items-center gap-4"
                >

                  {/* IMAGE */}

                  <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center">

                    {item.image ||
                    item.productImage ? (

                      <img
                        src={
                          item.image ||
                          item.productImage
                        }
                        alt={
                          item.name ||
                          "Product"
                        }
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <Package
                        size={24}
                        className="text-gray-400"
                      />

                    )}

                  </div>

                  {/* DETAILS */}

                  <div className="flex-1 min-w-0">

                    <p className="text-sm font-semibold text-gray-800">
                      {item.name ||
                        item.productName ||
                        "Product"}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Quantity:{" "}
                      {item.quantity ?? 1}
                    </p>

                  </div>

                  {/* PRICE */}

                  <div className="text-right">

                    <p className="text-sm font-bold text-gray-800">
                      ₹
                      {item.price ??
                        item.totalPrice ??
                        0}
                    </p>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

        {/* =================================================
            PRICE SUMMARY
        ================================================= */}

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-5 p-6">

          <h2 className="text-lg font-bold text-gray-800">
            Payment Summary
          </h2>

          <div className="mt-5 space-y-3 max-w-md ml-auto">

            <div className="flex items-center justify-between text-sm">

              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-medium text-gray-800">
                ₹{subtotal}
              </span>

            </div>

            <div className="flex items-center justify-between text-sm">

              <span className="text-gray-500">
                Delivery Charge
              </span>

              <span className="font-medium text-gray-800">
                ₹{deliveryCharge}
              </span>

            </div>

            <div className="border-t border-gray-100 pt-3 flex items-center justify-between">

              <span className="font-bold text-gray-800">
                Total
              </span>

              <span className="text-xl font-bold text-pink-600">
                ₹{totalAmount}
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            DELIVERY BOY
        ================================================= */}

        {deliveryBoy?.name && (

          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-5 p-6">

            <h2 className="text-lg font-bold text-gray-800">
              Delivery Information
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="p-4 rounded-2xl bg-gray-50">

                <p className="text-xs text-gray-400">
                  Delivery Boy
                </p>

                <p className="text-sm font-semibold text-gray-800 mt-1">
                  {deliveryBoy.name}
                </p>

              </div>

              <div className="p-4 rounded-2xl bg-gray-50">

                <p className="text-xs text-gray-400">
                  Phone
                </p>

                <p className="text-sm font-semibold text-gray-800 mt-1">
                  {deliveryBoy.phone ||
                    "Not available"}
                </p>

              </div>

              <div className="p-4 rounded-2xl bg-gray-50">

                <p className="text-xs text-gray-400">
                  Vehicle
                </p>

                <p className="text-sm font-semibold text-gray-800 mt-1 capitalize">
                  {deliveryBoy.vehicleType ||
                    "Not available"}

                  {deliveryBoy.vehicleNumber
                    ? ` - ${deliveryBoy.vehicleNumber}`
                    : ""}
                </p>

              </div>

            </div>

          </div>

        )}

        {/* =================================================
            ACTION
        ================================================= */}

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-5 p-6 mb-8">

          <div className="flex flex-col sm:flex-row gap-3">

            {/* ACCEPT */}

            <button
              type="button"
              onClick={handleAcceptOrder}
              disabled={
                loading ||
                status !== "shipped"
              }
              className="
                flex-1
                inline-flex
                items-center
                justify-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-pink-600
                text-white
                font-semibold
                hover:bg-pink-700
                disabled:bg-gray-300
                disabled:cursor-not-allowed
                transition
              "
            >

              <CheckCircle size={19} />

              {loading
                ? "Accepting..."
                : status === "shipped"
                ? "Accept Order"
                : getStatusText(status)}

            </button>

            {/* BACK */}

            <button
              type="button"
              onClick={() =>
                navigate("/delivery-boy/orders")
              }
              className="
                px-5
                py-3
                rounded-xl
                border
                border-gray-200
                text-gray-600
                font-semibold
                hover:bg-gray-50
                transition
              "
            >
              Back to Orders
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
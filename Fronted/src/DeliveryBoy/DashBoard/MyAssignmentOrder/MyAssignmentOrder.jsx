import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Package,
  Bike,
  MapPin,
  CheckCircle,
  Clock3,
  User,
} from "lucide-react";

import {
  getMyAssignedOrdersThunk,
  acceptOrderThunk,
} from "../../../Store/DeliveryBoy/DeliveryBoyApi";

export const MyAssignmentOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    assignedOrders = [],
    loading = false,
  } = useSelector((state) => state.DeliveryBoy || {});

  // =====================================================
  // GET ASSIGNED ORDERS
  // =====================================================

  useEffect(() => {
    dispatch(getMyAssignedOrdersThunk());
  }, [dispatch]);

  // =====================================================
  // ACCEPT ORDER
  // =====================================================

  const handleAcceptOrder = async (id) => {
    const result = await dispatch(acceptOrderThunk(id));

    if (acceptOrderThunk.fulfilled.match(result)) {
      toast.success("Order accepted successfully! 🚚");

      // Updated orders dobara fetch
      dispatch(getMyAssignedOrdersThunk());
    } else {
      toast.error(
        result.payload || "Failed to accept order"
      );
    }
  };

  // =====================================================
  // FORMAT ORDER ID
  // =====================================================

  const formatOrderId = (id) => {
    if (!id) return "Order";

    return `#${id.slice(-7)}`;
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-600";

      case "confirmed":
        return "bg-blue-50 text-blue-600";

      case "processing":
        return "bg-purple-50 text-purple-600";

      case "shipped":
        return "bg-orange-50 text-orange-600";

      case "out_for_delivery":
        return "bg-indigo-50 text-indigo-600";

      case "delivered":
        return "bg-green-50 text-green-600";

      case "cancelled":
        return "bg-red-50 text-red-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  // =====================================================
  // STATUS TEXT
  // =====================================================

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";

      case "confirmed":
        return "Confirmed";

      case "processing":
        return "Processing";

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
  // LOADING
  // =====================================================

  if (loading && assignedOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 flex items-center justify-center px-4">
        <div className="text-center">

          <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-100 flex items-center justify-center">
            <Bike
              size={28}
              className="text-pink-500 animate-pulse"
            />
          </div>

          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading your orders...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 px-4 sm:px-6 lg:px-8 py-6">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="bg-white border border-pink-100 rounded-3xl shadow-sm">

          <div className="p-5 sm:p-6">

            <div className="flex items-center gap-4">

              {/* BACK BUTTON */}

              <button
                type="button"
                onClick={() =>
                  navigate("/delivery-boy/dashboard")
                }
                className="
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-pink-50
                  text-pink-600
                  hover:bg-pink-100
                  transition
                  shrink-0
                "
                title="Back to Dashboard"
              >
                <ArrowLeft size={20} />
              </button>

              {/* TITLE */}

              <div>

                <p className="text-sm font-medium text-pink-500">
                  Delivery Panel
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  My Assigned Orders
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Orders assigned to you for delivery.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            ORDER COUNT
        ===================================================== */}

        <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
            <Package size={20} />
          </div>

          <div>

            <p className="text-xs text-gray-500">
              Total Assigned Orders
            </p>

            <p className="text-xl font-bold text-gray-800">
              {assignedOrders.length}
            </p>

          </div>

        </div>

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {assignedOrders.length === 0 ? (

          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm px-6 py-14 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center">
              <Package
                size={30}
                className="text-gray-400"
              />
            </div>

            <h2 className="mt-4 text-lg font-bold text-gray-700">
              No Assigned Orders
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              You don't have any orders assigned right now.
            </p>

          </div>

        ) : (

          /* =====================================================
             ORDERS
          ===================================================== */

          <div className="space-y-4">

            {assignedOrders.map((order) => (

              <div
                key={order._id}
                className="
                  bg-white
                  border
                  border-gray-100
                  rounded-3xl
                  shadow-sm
                  hover:shadow-md
                  transition
                  overflow-hidden
                "
              >

                {/* ORDER HEADER */}

                <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
                      <Package size={21} />
                    </div>

                    <div>

                      <p className="text-xs text-gray-400">
                        Order ID
                      </p>

                      <h2 className="font-bold text-gray-800">
                        {formatOrderId(order._id)}
                      </h2>

                    </div>

                  </div>

                  <span
                    className={`
                      self-start
                      sm:self-auto
                      px-3
                      py-1.5
                      rounded-full
                      text-xs
                      font-semibold
                      ${getStatusStyle(order.orderStatus)}
                    `}
                  >
                    {getStatusText(order.orderStatus)}
                  </span>

                </div>

                {/* ORDER BODY */}

                <div className="p-5 sm:p-6">

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* CUSTOMER */}

                    <div className="rounded-2xl bg-gray-50 p-4">

                      <div className="flex items-center gap-2 text-gray-500">
                        <User size={17} />
                        <span className="text-xs font-medium">
                          Customer
                        </span>
                      </div>

                      <p className="mt-2 font-semibold text-gray-800">
                        {order.user?.name ||
                          order.address?.fullName ||
                          "Customer"}
                      </p>

                    </div>

                    {/* AMOUNT */}

                    <div className="rounded-2xl bg-gray-50 p-4">

                      <div className="flex items-center gap-2 text-gray-500">
                        <Package size={17} />
                        <span className="text-xs font-medium">
                          Order Amount
                        </span>
                      </div>

                      <p className="mt-2 font-semibold text-gray-800">
                        ₹
                        {order.totalAmount ??
                          order.paidAmount ??
                          0}
                      </p>

                    </div>

                    {/* DELIVERY */}

                    <div className="rounded-2xl bg-gray-50 p-4">

                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin size={17} />
                        <span className="text-xs font-medium">
                          Delivery
                        </span>
                      </div>

                      <p className="mt-2 font-semibold text-gray-800 capitalize">
                        {order.deliveryType ||
                          "Standard"}
                      </p>

                    </div>

                  </div>

                  {/* ADDRESS */}

                  {order.address && (
                    <div className="mt-4 rounded-2xl bg-blue-50 border border-blue-100 p-4">

                      <div className="flex items-start gap-3">

                        <MapPin
                          size={19}
                          className="text-blue-500 mt-0.5 shrink-0"
                        />

                        <div>

                          <p className="text-xs font-medium text-blue-600">
                            Delivery Address
                          </p>

                          <p className="text-sm text-gray-700 mt-1">
                            {order.address.fullAddress ||
                              order.address.address ||
                              order.address.street ||
                              "Address available in order details"}
                          </p>

                        </div>

                      </div>

                    </div>
                  )}

                  {/* ACTIONS */}
{/* ACTIONS */}

<div className="mt-5 flex flex-col sm:flex-row gap-3">

  {/* VIEW ORDER */}
  <button
    type="button"
    onClick={() =>
      navigate(`/delivery-boy/order/${order._id}`)
    }
    className="
      flex-1
      px-5
      py-3
      rounded-xl
      border
      border-gray-200
      text-gray-700
      font-semibold
      text-sm
      hover:bg-gray-50
      transition
    "
  >
    View Order
  </button>

  {/* ACCEPT ORDER */}
  {order.orderStatus !== "delivered" &&
    order.orderStatus !== "cancelled" &&
    order.orderStatus !== "out_for_delivery" && (
      <button
        type="button"
        onClick={() =>
          handleAcceptOrder(order._id)
        }
        className="
          flex-1
          px-5
          py-3
          rounded-xl
          bg-pink-500
          text-white
          font-semibold
          text-sm
          hover:bg-pink-600
          transition
          flex
          items-center
          justify-center
          gap-2
        "
      >
        <CheckCircle size={18} />
        Accept Order
      </button>
    )}

  {/* OUT FOR DELIVERY */}
  {order.orderStatus === "out_for_delivery" && (
    <div
      className="
        flex-1
        px-5
        py-3
        rounded-xl
        bg-blue-50
        border
        border-blue-100
        text-blue-600
        font-semibold
        text-sm
        flex
        items-center
        justify-center
        gap-2
      "
    >
      <Bike size={18} />
      Out Of Delivery
    </div>
  )}

</div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};
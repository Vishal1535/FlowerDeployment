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
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 flex items-center justify-center px-3 min-[380px]:px-4">
        <div className="text-center">

          <div className="w-12 h-12 min-[380px]:w-14 min-[380px]:h-14 mx-auto rounded-xl min-[380px]:rounded-2xl bg-pink-100 flex items-center justify-center">
            <Bike
              size={24}
              className="text-pink-500 animate-pulse min-[380px]:w-7 min-[380px]:h-7"
            />
          </div>

          <p className="mt-3 min-[380px]:mt-4 text-xs min-[380px]:text-sm font-medium text-gray-600">
            Loading your orders...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 px-3 py-4 min-[380px]:px-4 min-[380px]:py-6 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto min-w-0 space-y-4 min-[380px]:space-y-6">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="bg-white border border-pink-100 rounded-2xl min-[380px]:rounded-3xl shadow-sm">

          <div className="p-4 min-[380px]:p-5 sm:p-6">

            <div className="flex items-center gap-2.5 min-[380px]:gap-4">

              {/* BACK BUTTON */}

              <button
                type="button"
                onClick={() =>
                  navigate("/delivery-boy/dashboard")
                }
                className="
                  w-9
                  h-9
                  min-[380px]:w-10
                  min-[380px]:h-10
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
                <ArrowLeft
                  size={18}
                  className="min-[380px]:w-5 min-[380px]:h-5"
                />
              </button>

              {/* TITLE */}

              <div className="min-w-0">

                <p className="text-xs min-[380px]:text-sm font-medium text-pink-500">
                  Delivery Panel
                </p>

                <h1 className="text-lg min-[380px]:text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
                  My Assigned Orders
                </h1>

                <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1 leading-5">
                  Orders assigned to you for delivery.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            ORDER COUNT
        ===================================================== */}

        <div className="bg-white border border-gray-100 rounded-xl min-[380px]:rounded-2xl px-3 py-3 min-[380px]:px-5 min-[380px]:py-4 shadow-sm flex items-center gap-2.5 min-[380px]:gap-3">

          <div className="w-9 h-9 min-[380px]:w-10 min-[380px]:h-10 rounded-lg min-[380px]:rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
            <Package
              size={18}
              className="min-[380px]:w-5 min-[380px]:h-5"
            />
          </div>

          <div>

            <p className="text-[11px] min-[380px]:text-xs text-gray-500">
              Total Assigned Orders
            </p>

            <p className="text-lg min-[380px]:text-xl font-bold text-gray-800">
              {assignedOrders.length}
            </p>

          </div>

        </div>

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {assignedOrders.length === 0 ? (

          <div className="bg-white border border-gray-100 rounded-2xl min-[380px]:rounded-3xl shadow-sm px-4 py-10 min-[380px]:px-6 min-[380px]:py-14 text-center">

            <div className="w-14 h-14 min-[380px]:w-16 min-[380px]:h-16 mx-auto rounded-xl min-[380px]:rounded-2xl bg-gray-50 flex items-center justify-center">
              <Package
                size={26}
                className="text-gray-400 min-[380px]:w-[30px] min-[380px]:h-[30px]"
              />
            </div>

            <h2 className="mt-3 min-[380px]:mt-4 text-base min-[380px]:text-lg font-bold text-gray-700">
              No Assigned Orders
            </h2>

            <p className="text-xs min-[380px]:text-sm text-gray-400 mt-1">
              You don't have any orders assigned right now.
            </p>

          </div>

        ) : (

          /* =====================================================
             ORDERS
          ===================================================== */

          <div className="space-y-3 min-[380px]:space-y-4">

            {assignedOrders.map((order) => (

              <div
                key={order._id}
                className="
                  w-full
                  min-w-0
                  bg-white
                  border
                  border-gray-100
                  rounded-2xl
                  min-[380px]:rounded-3xl
                  shadow-sm
                  hover:shadow-md
                  transition
                  overflow-hidden
                "
              >

                {/* ORDER HEADER */}

                <div className="px-3 py-3 min-[380px]:px-5 min-[380px]:py-4 sm:px-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 min-[380px]:gap-3">

                  <div className="flex items-center gap-2.5 min-[380px]:gap-3 min-w-0">

                    <div className="w-9 h-9 min-[380px]:w-11 min-[380px]:h-11 rounded-lg min-[380px]:rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                      <Package
                        size={18}
                        className="min-[380px]:w-[21px] min-[380px]:h-[21px]"
                      />
                    </div>

                    <div className="min-w-0">

                      <p className="text-[11px] min-[380px]:text-xs text-gray-400">
                        Order ID
                      </p>

                      <h2 className="font-bold text-sm min-[380px]:text-base text-gray-800 truncate">
                        {formatOrderId(order._id)}
                      </h2>

                    </div>

                  </div>

                  <span
                    className={`
                      self-start
                      sm:self-auto
                      max-w-full
                      px-2.5
                      py-1
                      min-[380px]:px-3
                      min-[380px]:py-1.5
                      rounded-full
                      text-[11px]
                      min-[380px]:text-xs
                      font-semibold
                      whitespace-nowrap
                      ${getStatusStyle(order.orderStatus)}
                    `}
                  >
                    {getStatusText(order.orderStatus)}
                  </span>

                </div>

                {/* ORDER BODY */}

                <div className="p-3 min-[380px]:p-5 sm:p-6">

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-[380px]:gap-4">

                    {/* CUSTOMER */}

                    <div className="rounded-xl min-[380px]:rounded-2xl bg-gray-50 p-3 min-[380px]:p-4 min-w-0">

                      <div className="flex items-center gap-2 text-gray-500">
                        <User
                          size={15}
                          className="min-[380px]:w-[17px] min-[380px]:h-[17px]"
                        />
                        <span className="text-[11px] min-[380px]:text-xs font-medium">
                          Customer
                        </span>
                      </div>

                      <p className="mt-1.5 min-[380px]:mt-2 font-semibold text-sm min-[380px]:text-base text-gray-800 truncate">
                        {order.user?.name ||
                          order.address?.fullName ||
                          "Customer"}
                      </p>

                    </div>

                    {/* AMOUNT */}

                    <div className="rounded-xl min-[380px]:rounded-2xl bg-gray-50 p-3 min-[380px]:p-4 min-w-0">

                      <div className="flex items-center gap-2 text-gray-500">
                        <Package
                          size={15}
                          className="min-[380px]:w-[17px] min-[380px]:h-[17px]"
                        />
                        <span className="text-[11px] min-[380px]:text-xs font-medium">
                          Order Amount
                        </span>
                      </div>

                      <p className="mt-1.5 min-[380px]:mt-2 font-semibold text-sm min-[380px]:text-base text-gray-800">
                        ₹
                        {order.totalAmount ??
                          order.paidAmount ??
                          0}
                      </p>

                    </div>

                    {/* DELIVERY */}

                    <div className="rounded-xl min-[380px]:rounded-2xl bg-gray-50 p-3 min-[380px]:p-4 min-w-0">

                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin
                          size={15}
                          className="min-[380px]:w-[17px] min-[380px]:h-[17px]"
                        />
                        <span className="text-[11px] min-[380px]:text-xs font-medium">
                          Delivery
                        </span>
                      </div>

                      <p className="mt-1.5 min-[380px]:mt-2 font-semibold text-sm min-[380px]:text-base text-gray-800 capitalize truncate">
                        {order.deliveryType ||
                          "Standard"}
                      </p>

                    </div>

                  </div>

                  {/* ADDRESS */}

                  {order.address && (
                    <div className="mt-3 min-[380px]:mt-4 rounded-xl min-[380px]:rounded-2xl bg-blue-50 border border-blue-100 p-3 min-[380px]:p-4">

                      <div className="flex items-start gap-2.5 min-[380px]:gap-3">

                        <MapPin
                          size={17}
                          className="text-blue-500 mt-0.5 shrink-0 min-[380px]:w-[19px] min-[380px]:h-[19px]"
                        />

                        <div className="min-w-0">

                          <p className="text-[11px] min-[380px]:text-xs font-medium text-blue-600">
                            Delivery Address
                          </p>

                          <p className="text-xs min-[380px]:text-sm text-gray-700 mt-1 leading-5 break-words">
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

                  <div className="mt-4 min-[380px]:mt-5 flex flex-col min-[380px]:flex-row gap-2.5 min-[380px]:gap-3">

                    {/* VIEW ORDER */}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/delivery-boy/order/${order._id}`)
                      }
                      className="
                        w-full
                        min-[380px]:flex-1
                        px-4
                        min-[380px]:px-5
                        py-2.5
                        min-[380px]:py-3
                        rounded-xl
                        border
                        border-gray-200
                        text-gray-700
                        font-semibold
                        text-xs
                        min-[380px]:text-sm
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
                            w-full
                            min-[380px]:flex-1
                            px-4
                            min-[380px]:px-5
                            py-2.5
                            min-[380px]:py-3
                            rounded-xl
                            bg-pink-500
                            text-white
                            font-semibold
                            text-xs
                            min-[380px]:text-sm
                            hover:bg-pink-600
                            transition
                            flex
                            items-center
                            justify-center
                            gap-2
                          "
                        >
                          <CheckCircle
                            size={17}
                            className="min-[380px]:w-[18px] min-[380px]:h-[18px]"
                          />
                          Accept Order
                        </button>
                      )}

                    {/* OUT FOR DELIVERY */}

                    {order.orderStatus === "out_for_delivery" && (
                      <div
                        className="
                          w-full
                          min-[380px]:flex-1
                          px-4
                          min-[380px]:px-5
                          py-2.5
                          min-[380px]:py-3
                          rounded-xl
                          bg-blue-50
                          border
                          border-blue-100
                          text-blue-600
                          font-semibold
                          text-xs
                          min-[380px]:text-sm
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >
                        <Bike
                          size={17}
                          className="min-[380px]:w-[18px] min-[380px]:h-[18px]"
                        />
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
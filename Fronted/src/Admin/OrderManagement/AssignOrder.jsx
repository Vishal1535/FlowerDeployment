import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Bike,
  Package,
  MapPin,
  Phone,
  Mail,
  IndianRupee,
  CalendarDays,
  ShoppingBag,
  User,
  CheckCircle,
} from "lucide-react";

import {
  assignOrderToDeliveryBoyThunk,
} from "../../Store/Admin/AssignmentOrder/AssignOrderApi";

import { GetAllOrdersThunk } from "../../Store/Order/OrderApi";

import {
  getSingleDeliveryBoyThunk,
} from "../../Store/Admin/DeliveryBoy/DeliveryApi";

export const AssignOrder = () => {
  const { DeliveryBoyId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.Order);

  const { selectedDeliveryBoy } = useSelector(
    (state) => state.DeliveryBoyManagement
  );

  const { loading } = useSelector(
    (state) => state.AssignOrder
  );

  const [assigningOrderId, setAssigningOrderId] = useState(null);

  // =====================================================
  // GET ORDERS + DELIVERY BOY
  // =====================================================

  useEffect(() => {
    dispatch(GetAllOrdersThunk());
    dispatch(getSingleDeliveryBoyThunk(DeliveryBoyId));
  }, [dispatch, DeliveryBoyId]);

  // =====================================================
  // FILTER ORDERS
  // ONLY SHIPPED + NOT ASSIGNED
  // =====================================================

  const availableOrders = useMemo(() => {
    if (!Array.isArray(orders)) {
      return [];
    }

    return orders.filter(
      (order) =>
        order.orderStatus === "shipped" &&
        order.deliveryBoy === null
    );
  }, [orders]);

  // =====================================================
  // ASSIGN ORDER
  // =====================================================

  const handleAssignOrder = async (orderId) => {
    if (!DeliveryBoyId) {
      toast.error("Delivery boy not found");
      return;
    }

    setAssigningOrderId(orderId);

    const result = await dispatch(
      assignOrderToDeliveryBoyThunk({
        orderId,
        deliveryBoyId: DeliveryBoyId,
      })
    );

    if (assignOrderToDeliveryBoyThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
          "Order assigned successfully"
      );

      // List refresh
      dispatch(GetAllOrdersThunk());
    } else {
      toast.error(
        result.payload ||
          "Failed to assign order"
      );
    }

    setAssigningOrderId(null);
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // TIME FORMAT
  // =====================================================

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/60 via-white to-rose-50/40 px-4 sm:px-6 lg:px-8 py-6">

      <div className="max-w-7xl mx-auto space-y-6">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="bg-white border border-pink-100 rounded-3xl shadow-sm overflow-hidden">

          <div className="p-5 sm:p-7">

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">

              {/* BACK BUTTON */}

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-gray-600
                  flex
                  items-center
                  justify-center
                  hover:bg-pink-50
                  hover:text-pink-600
                  hover:border-pink-200
                  transition
                  cursor-pointer
                "
              >
                <ArrowLeft size={20} />
              </button>

              {/* ICON */}

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-pink-100
                  text-pink-600
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <ShoppingBag size={27} />
              </div>

              {/* TITLE */}

              <div className="flex-1">

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Assign Orders
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Select a shipped order to assign it to the delivery boy.
                </p>

              </div>

            </div>

          </div>

          {/* =====================================================
              DELIVERY BOY INFO
          ===================================================== */}

          {selectedDeliveryBoy && (
            <div className="border-t border-gray-100 bg-pink-50/50 px-5 sm:px-7 py-4">

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-white
                    border
                    border-pink-100
                    text-pink-500
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Bike size={23} />
                </div>

                <div className="flex-1">

                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Assigning to
                  </p>

                  <h2 className="text-base font-bold text-gray-800 capitalize">
                    {selectedDeliveryBoy.name}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">

                    <span className="flex items-center gap-1">
                      <Phone size={13} />
                      {selectedDeliveryBoy.phone || "-"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Bike size={13} />
                      {selectedDeliveryBoy.vehicleType || "-"}
                    </span>

                  </div>

                </div>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    px-3
                    py-1.5
                    rounded-full
                    bg-green-50
                    border
                    border-green-100
                    text-green-600
                    text-xs
                    font-semibold
                  "
                >
                  <CheckCircle size={14} />
                  Available
                </span>

              </div>

            </div>
          )}

        </div>

        {/* =====================================================
            ORDERS HEADER
        ===================================================== */}

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Available Orders
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {availableOrders.length} shipped order
              {availableOrders.length !== 1 ? "s" : ""} ready for assignment
            </p>
          </div>

          <div
            className="
              hidden sm:flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              bg-white
              border
              border-gray-200
              text-sm
              text-gray-600
            "
          >
            <Package size={16} className="text-pink-500" />
            {availableOrders.length} Available
          </div>

        </div>

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {availableOrders.length === 0 && (
          <div
            className="
              bg-white
              border
              border-gray-100
              rounded-3xl
              shadow-sm
              p-10
              sm:p-14
              text-center
            "
          >

            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-pink-50
                text-pink-500
                flex
                items-center
                justify-center
              "
            >
              <Package size={30} />
            </div>

            <h3 className="text-lg font-bold text-gray-800 mt-5">
              No Orders Available
            </h3>

            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              There are currently no shipped orders waiting to be
              assigned to a delivery boy.
            </p>

          </div>
        )}

        {/* =====================================================
            ORDER LIST
        ===================================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {availableOrders.map((order) => {

            const isAssigning =
              assigningOrderId === order._id;

            return (
              <div
                key={order._id}
                className="
                  bg-white
                  border
                  border-gray-100
                  rounded-3xl
                  shadow-sm
                  hover:shadow-md
                  hover:border-pink-100
                  transition-all
                  overflow-hidden
                "
              >

                {/* =================================================
                    ORDER TOP
                ================================================= */}

                <div className="p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-11
                          h-11
                          rounded-xl
                          bg-pink-50
                          border
                          border-pink-100
                          text-pink-500
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <Package size={21} />
                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-wide text-gray-400">
                          Order ID
                        </p>

                        <p className="text-sm font-bold text-gray-800">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>

                      </div>

                    </div>

                    <span
                      className="
                        inline-flex
                        items-center
                        px-3
                        py-1.5
                        rounded-full
                        bg-blue-50
                        border
                        border-blue-100
                        text-blue-600
                        text-xs
                        font-semibold
                      "
                    >
                      Shipped
                    </span>

                  </div>

                  {/* =================================================
                      CUSTOMER
                  ================================================= */}

                  <div className="mt-5 p-4 rounded-2xl bg-gray-50 border border-gray-100">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-white
                          border
                          border-gray-100
                          text-gray-500
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <User size={19} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-semibold text-gray-800 capitalize">
                          {order.user?.name ||
                            order.address?.fullName ||
                            "Customer"}
                        </p>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">

                          {order.user?.email && (
                            <span className="flex items-center gap-1 text-xs text-gray-500 truncate">
                              <Mail size={12} />
                              {order.user.email}
                            </span>
                          )}

                          {(order.user?.phone ||
                            order.address?.phone) && (
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <Phone size={12} />
                              {order.user?.phone ||
                                order.address?.phone}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      ORDER INFO
                  ================================================= */}

                  <div className="grid grid-cols-2 gap-3 mt-4">

                    {/* AMOUNT */}

                    <div className="p-3.5 rounded-2xl border border-gray-100 bg-white">

                      <p className="text-[10px] uppercase tracking-wide text-gray-400">
                        Amount
                      </p>

                      <div className="flex items-center gap-1 mt-1">

                        <IndianRupee
                          size={14}
                          className="text-pink-500"
                        />

                        <p className="text-sm font-bold text-gray-800">
                          {order.totalAmount}
                        </p>

                      </div>

                    </div>

                    {/* DELIVERY DATE */}

                    <div className="p-3.5 rounded-2xl border border-gray-100 bg-white">

                      <p className="text-[10px] uppercase tracking-wide text-gray-400">
                        Delivery Date
                      </p>

                      <div className="flex items-center gap-1.5 mt-1">

                        <CalendarDays
                          size={14}
                          className="text-pink-500"
                        />

                        <p className="text-sm font-semibold text-gray-800">
                          {formatDate(order.deliverDate)}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      ADDRESS
                  ================================================= */}

                  {order.address && (
                    <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">

                      <MapPin
                        size={17}
                        className="text-pink-500 shrink-0 mt-0.5"
                      />

                      <p className="line-clamp-2">
                        {order.address.fullAddress ||
                          order.address.address ||
                          order.address.city ||
                          "Address available"}
                      </p>

                    </div>
                  )}

                </div>

                {/* =================================================
                    BOTTOM
                ================================================= */}

                <div
                  className="
                    border-t
                    border-gray-100
                    bg-gray-50/70
                    px-5
                    py-4
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <div>

                    <p className="text-xs text-gray-400">
                      Ordered
                    </p>

                    <p className="text-xs font-medium text-gray-600">
                      {formatDate(order.orderedAt)}
                      {" "}
                      {formatTime(order.orderedAt)}
                    </p>

                  </div>

                  <button
                    type="button"
                    disabled={isAssigning || loading}
                    onClick={() =>
                      handleAssignOrder(order._id)
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-xl
                      bg-pink-500
                      hover:bg-pink-600
                      disabled:bg-pink-300
                      text-white
                      text-sm
                      font-semibold
                      shadow-sm
                      transition
                      cursor-pointer
                      disabled:cursor-not-allowed
                    "
                  >

                    {isAssigning ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Assigning...
                      </>
                    ) : (
                      <>
                        <Bike size={16} />
                        Assign Order
                      </>
                    )}

                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};
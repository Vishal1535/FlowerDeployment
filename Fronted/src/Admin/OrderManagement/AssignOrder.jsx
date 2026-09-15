
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
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50/60 via-white to-rose-50/40 px-3 py-4 sm:px-6 sm:py-6 lg:px-8">

      <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 min-w-0">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="w-full bg-white border border-pink-100 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">

          <div className="p-4 sm:p-7">

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

              {/* BACK BUTTON */}

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
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
                <ArrowLeft size={19} className="sm:w-5 sm:h-5" />
              </button>

              {/* ICON */}

              <div
                className="
                  w-12
                  h-12
                  sm:w-14
                  sm:h-14
                  rounded-xl
                  sm:rounded-2xl
                  bg-pink-100
                  text-pink-600
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <ShoppingBag size={23} className="sm:w-[27px] sm:h-[27px]" />
              </div>

              {/* TITLE */}

              <div className="min-w-0 flex-1">

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 break-words">
                  Assign Orders
                </h1>

                <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
                  Select a shipped order to assign it to the delivery boy.
                </p>

              </div>

            </div>

          </div>

          {/* =====================================================
              DELIVERY BOY INFO
          ===================================================== */}

          {selectedDeliveryBoy && (
            <div className="border-t border-gray-100 bg-pink-50/50 px-4 sm:px-7 py-4">

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

                <div
                  className="
                    w-11
                    h-11
                    sm:w-12
                    sm:h-12
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
                  <Bike size={21} className="sm:w-[23px] sm:h-[23px]" />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
                    Assigning to
                  </p>

                  <h2 className="text-sm sm:text-base font-bold text-gray-800 capitalize truncate">
                    {selectedDeliveryBoy.name}
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] sm:text-xs text-gray-500">

                    <span className="flex items-center gap-1 min-w-0 max-w-full">
                      <Phone size={12} className="shrink-0" />
                      <span className="truncate">
                        {selectedDeliveryBoy.phone || "-"}
                      </span>
                    </span>

                    <span className="flex items-center gap-1 min-w-0 max-w-full">
                      <Bike size={12} className="shrink-0" />
                      <span className="truncate">
                        {selectedDeliveryBoy.vehicleType || "-"}
                      </span>
                    </span>

                  </div>

                </div>

                <span
                  className="
                    self-start
                    sm:self-center
                    inline-flex
                    items-center
                    gap-1
                    sm:gap-1.5
                    px-2.5
                    sm:px-3
                    py-1.5
                    rounded-full
                    bg-green-50
                    border
                    border-green-100
                    text-green-600
                    text-[11px]
                    sm:text-xs
                    font-semibold
                    shrink-0
                  "
                >
                  <CheckCircle size={13} />
                  Available
                </span>

              </div>

            </div>
          )}

        </div>

        {/* =====================================================
            ORDERS HEADER
        ===================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">

          <div className="min-w-0">

            <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
              Available Orders
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
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
              shrink-0
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
              w-full
              bg-white
              border
              border-gray-100
              rounded-2xl
              sm:rounded-3xl
              shadow-sm
              p-7
              sm:p-10
              lg:p-14
              text-center
            "
          >

            <div
              className="
                w-14
                h-14
                sm:w-16
                sm:h-16
                mx-auto
                rounded-xl
                sm:rounded-2xl
                bg-pink-50
                text-pink-500
                flex
                items-center
                justify-center
              "
            >
              <Package size={27} className="sm:w-[30px] sm:h-[30px]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-gray-800 mt-4 sm:mt-5">
              No Orders Available
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
              There are currently no shipped orders waiting to be
              assigned to a delivery boy.
            </p>

          </div>
        )}

        {/* =====================================================
            ORDER LIST
        ===================================================== */}

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 min-w-0">

          {availableOrders.map((order) => {

            const isAssigning =
              assigningOrderId === order._id;

            return (
              <div
                key={order._id}
                className="
                  w-full
                  min-w-0
                  bg-white
                  border
                  border-gray-100
                  rounded-2xl
                  sm:rounded-3xl
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

                <div className="p-3 sm:p-5">

                  <div className="flex items-start justify-between gap-2 sm:gap-4">

                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">

                      <div
                        className="
                          w-10
                          h-10
                          sm:w-11
                          sm:h-11
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
                        <Package size={19} className="sm:w-[21px] sm:h-[21px]" />
                      </div>

                      <div className="min-w-0">

                        <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-gray-400">
                          Order ID
                        </p>

                        <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>

                      </div>

                    </div>

                    <span
                      className="
                        self-start
                        inline-flex
                        items-center
                        px-2.5
                        sm:px-3
                        py-1
                        sm:py-1.5
                        rounded-full
                        bg-blue-50
                        border
                        border-blue-100
                        text-blue-600
                        text-[10px]
                        sm:text-xs
                        font-semibold
                        shrink-0
                      "
                    >
                      Shipped
                    </span>

                  </div>

                  {/* =================================================
                      CUSTOMER
                  ================================================= */}

                  <div className="mt-3 sm:mt-5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100">

                    <div className="flex items-start gap-2 sm:gap-3">

                      <div
                        className="
                          w-9
                          h-9
                          sm:w-10
                          sm:h-10
                          rounded-lg
                          sm:rounded-xl
                          bg-white
                          border
                          border-gray-100
                          text-gray-500
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <User size={17} className="sm:w-[19px] sm:h-[19px]" />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-xs sm:text-sm font-semibold text-gray-800 capitalize break-words">
                          {order.user?.name ||
                            order.address?.fullName ||
                            "Customer"}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-4 gap-y-1 mt-1">

                          {order.user?.email && (
                            <span className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 min-w-0 max-w-full">
                              <Mail size={11} className="shrink-0" />
                              <span className="truncate">
                                {order.user.email}
                              </span>
                            </span>
                          )}

                          {(order.user?.phone ||
                            order.address?.phone) && (
                            <span className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 min-w-0">
                              <Phone size={11} className="shrink-0" />
                              <span className="truncate">
                                {order.user?.phone ||
                                  order.address?.phone}
                              </span>
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      ORDER INFO
                  ================================================= */}

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">

                    {/* AMOUNT */}

                    <div className="min-w-0 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-gray-100 bg-white">

                      <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-gray-400">
                        Amount
                      </p>

                      <div className="flex items-center gap-1 mt-1 min-w-0">

                        <IndianRupee
                          size={13}
                          className="text-pink-500 shrink-0"
                        />

                        <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                          {order.totalAmount}
                        </p>

                      </div>

                    </div>

                    {/* DELIVERY DATE */}

                    <div className="min-w-0 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-gray-100 bg-white">

                      <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-gray-400">
                        Delivery Date
                      </p>

                      <div className="flex items-center gap-1 mt-1 min-w-0">

                        <CalendarDays
                          size={13}
                          className="text-pink-500 shrink-0"
                        />

                        <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                          {formatDate(order.deliverDate)}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      ADDRESS
                  ================================================= */}

                  {order.address && (
                    <div className="mt-3 sm:mt-4 flex items-start gap-2 text-xs sm:text-sm text-gray-600 min-w-0">

                      <MapPin
                        size={16}
                        className="text-pink-500 shrink-0 mt-0.5"
                      />

                      <p className="min-w-0 break-words line-clamp-2 leading-relaxed">
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
                    px-3
                    sm:px-5
                    py-3
                    sm:py-4
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-3
                  "
                >

                  <div className="min-w-0">

                    <p className="text-[10px] sm:text-xs text-gray-400">
                      Ordered
                    </p>

                    <p className="text-[10px] sm:text-xs font-medium text-gray-600 break-words">
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
                      w-full
                      sm:w-auto
                      min-h-9
                      inline-flex
                      items-center
                      justify-center
                      gap-1.5
                      sm:gap-2
                      px-3
                      sm:px-5
                      py-2
                      sm:py-2.5
                      rounded-lg
                      sm:rounded-xl
                      bg-pink-500
                      hover:bg-pink-600
                      disabled:bg-pink-300
                      text-white
                      text-xs
                      sm:text-sm
                      font-semibold
                      shadow-sm
                      transition
                      cursor-pointer
                      disabled:cursor-not-allowed
                    "
                  >

                    {isAssigning ? (
                      <>
                        <span className="loading loading-spinner loading-xs sm:loading-sm shrink-0"></span>
                        <span className="truncate">
                          Assigning...
                        </span>
                      </>
                    ) : (
                      <>
                        <Bike size={15} className="sm:w-4 sm:h-4 shrink-0" />
                        <span className="truncate">
                          Assign Order
                        </span>
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


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Eye,
  CheckCircle,
  X,
  Phone,
  CreditCard,
  Truck,
  CalendarDays,
  MapPin,
  User,
  Bike,
  Mail,
} from "lucide-react";

import { ChangeOrderStatusThunk } from "../../../Store/Order/OrderApi";

export const OutForDeliveryOrderItem = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(order);

  const [changing, setChanging] = useState(false);

  if (!order) return null;

  const address = order.address;
  const deliveryBoy = order.deliveryBoy;

  // =====================================================
  // STATUS CHANGE
  // =====================================================

  const handleStatusChange = async (status) => {
    if (!order?._id || changing) return;

    setChanging(true);

    try {
      await dispatch(
        ChangeOrderStatusThunk({
          orderId: order._id,
          status,
        })
      ).unwrap();
    } catch (error) {
      console.error("Status update error:", error);
    } finally {
      setChanging(false);
    }
  };

  // =====================================================
  // VIEW DETAILS
  // =====================================================

  const handleViewDetails = () => {
    navigate(`/admin/orders/${order._id}`, {
      state: {
        order,
      },
    });
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

  const formatDateTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white border border-orange-100 rounded-xl shadow-sm px-4 py-3">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <h3 className="text-sm font-bold text-gray-800">
              #{order._id?.slice(-8)}
            </h3>

            <span className="text-[9px] text-gray-400">
              Out For Delivery
            </span>

          </div>

          <p className="text-xs text-gray-600 font-medium mt-1">
            {order.user?.name || "Customer"}
          </p>

          {order.user?.phone && (
            <p className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
              <Phone size={11} />
              {order.user.phone}
            </p>
          )}

        </div>

        {/* STATUS */}

        <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-200">
          Out For Delivery
        </span>

      </div>

      {/* ================================================= */}
      {/* DELIVERY BOY */}
      {/* ================================================= */}

      {deliveryBoy && (
        <div className="mt-3 bg-pink-50 border border-pink-100 rounded-lg px-3 py-2.5">

          <div className="flex items-center justify-between gap-2">

            <div className="flex items-center gap-2">

              <div className="w-8 h-8 rounded-lg bg-white text-pink-500 flex items-center justify-center shrink-0">
                <Bike size={16} />
              </div>

              <div>

                <p className="text-[9px] text-gray-400 uppercase">
                  Delivery Boy
                </p>

                <p className="text-xs font-bold text-gray-800">
                  {deliveryBoy.name || "Delivery Boy"}
                </p>

              </div>

            </div>

            <span className="px-2 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 text-[9px] font-bold">
              Assigned
            </span>

          </div>

          {/* DELIVERY BOY DETAILS */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">

            {/* PHONE */}

            <div className="flex items-center gap-1.5 bg-white rounded-md px-2 py-1.5">

              <Phone
                size={12}
                className="text-green-500 shrink-0"
              />

              <div className="min-w-0">

                <p className="text-[8px] text-gray-400">
                  Phone
                </p>

                <p className="text-[10px] font-semibold text-gray-700 truncate">
                  {deliveryBoy.phone || "-"}
                </p>

              </div>

            </div>

            {/* VEHICLE */}

            <div className="flex items-center gap-1.5 bg-white rounded-md px-2 py-1.5">

              <Bike
                size={12}
                className="text-orange-500 shrink-0"
              />

              <div className="min-w-0">

                <p className="text-[8px] text-gray-400">
                  Vehicle
                </p>

                <p className="text-[10px] font-semibold text-gray-700 capitalize truncate">
                  {deliveryBoy.vehicleType || "-"}
                </p>

              </div>

            </div>

            {/* VEHICLE NUMBER */}

            <div className="flex items-center gap-1.5 bg-white rounded-md px-2 py-1.5">

              <Truck
                size={12}
                className="text-blue-500 shrink-0"
              />

              <div className="min-w-0">

                <p className="text-[8px] text-gray-400">
                  Vehicle No.
                </p>

                <p className="text-[10px] font-semibold text-gray-700 uppercase truncate">
                  {deliveryBoy.vehicleNumber || "-"}
                </p>

              </div>

            </div>

          </div>

          {/* EMAIL */}

          {deliveryBoy.email && (
            <div className="flex items-center gap-1.5 mt-2">

              <Mail
                size={11}
                className="text-gray-400"
              />

              <p className="text-[9px] text-gray-500 truncate">
                {deliveryBoy.email}
              </p>

            </div>
          )}

        </div>
      )}

      {/* ================================================= */}
      {/* ORDER SUMMARY */}
      {/* ================================================= */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">

        {/* ITEMS */}

        <div className="bg-gray-50 rounded-lg px-3 py-2">

          <p className="text-[9px] text-gray-400 uppercase">
            Items
          </p>

          <p className="text-xs font-bold text-gray-800">
            {order.items?.length || 0}
          </p>

        </div>

        {/* SUBTOTAL */}

        <div className="bg-gray-50 rounded-lg px-3 py-2">

          <p className="text-[9px] text-gray-400 uppercase">
            Subtotal
          </p>

          <p className="text-xs font-bold text-gray-800">
            ₹{order.subtotal || 0}
          </p>

        </div>

        {/* DELIVERY */}

        <div className="bg-gray-50 rounded-lg px-3 py-2">

          <p className="text-[9px] text-gray-400 uppercase">
            Delivery
          </p>

          <p className="text-xs font-bold text-gray-800">
            ₹{order.deliveryCharge || 0}
          </p>

        </div>

        {/* TOTAL */}

        <div className="bg-gray-50 rounded-lg px-3 py-2">

          <p className="text-[9px] text-gray-400 uppercase">
            Total
          </p>

          <p className="text-xs font-black text-gray-800">
            ₹{order.totalAmount || 0}
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* PAYMENT + DELIVERY */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">

        {/* PAYMENT */}

        <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">

          <CreditCard
            size={14}
            className="text-green-600 shrink-0"
          />

          <div className="min-w-0">

            <p className="text-[9px] text-gray-400 uppercase">
              Payment
            </p>

            <p className="text-[11px] font-semibold text-gray-700 capitalize">
              {order.paymentMethod || "-"}
              {" • "}
              <span className="text-green-600">
                {order.paymentStatus || "-"}
              </span>
            </p>

          </div>

        </div>

        {/* DELIVERY */}

        <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">

          <Truck
            size={14}
            className="text-orange-500 shrink-0"
          />

          <div className="min-w-0">

            <p className="text-[9px] text-gray-400 uppercase">
              Delivery
            </p>

            <p className="text-[11px] font-semibold text-gray-700 capitalize">
              {order.deliveryType || "-"}
            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* DELIVERY DATE + ORDER DATE */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">

        <div className="flex items-center gap-2">

          <CalendarDays
            size={13}
            className="text-pink-500 shrink-0"
          />

          <p className="text-[10px] text-gray-500">

            Expected:

            <span className="font-semibold text-gray-700 ml-1">
              {formatDate(order.deliverDate)}
            </span>

          </p>

        </div>

        <div className="flex items-center gap-2">

          <CalendarDays
            size={13}
            className="text-blue-500 shrink-0"
          />

          <p className="text-[10px] text-gray-500">

            Ordered:

            <span className="font-semibold text-gray-700 ml-1">
              {formatDateTime(order.orderedAt)}
            </span>

          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* ADDRESS */}
      {/* ================================================= */}

      {address && (
        <div className="flex items-start gap-1.5 mt-2 bg-gray-50 rounded-lg px-3 py-2">

          <MapPin
            size={13}
            className="text-orange-500 mt-0.5 shrink-0"
          />

          <div className="min-w-0">

            <p className="text-[9px] text-gray-400 uppercase">
              Delivery Address
            </p>

            <p className="text-[10px] text-gray-600 truncate">

              {address.houseNumber
                ? `House No. ${address.houseNumber}, `
                : ""}

              {address.area || ""}

              {address.city
                ? `, ${address.city}`
                : ""}

              {address.pincode
                ? ` - ${address.pincode}`
                : ""}

            </p>

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* PAID / REMAINING */}
      {/* ================================================= */}

      <div className="flex items-center justify-between mt-2 text-[10px]">

        <p className="text-gray-500">
          Paid:
          <span className="font-bold text-green-600 ml-1">
            ₹{order.paidAmount || 0}
          </span>
        </p>

        <p className="text-gray-500">
          Remaining:
          <span className="font-bold text-gray-700 ml-1">
            ₹{order.remainingAmount || 0}
          </span>
        </p>

      </div>

      {/* ================================================= */}
      {/* ACTIONS */}
      {/* ================================================= */}

      <div className="flex items-center gap-2 mt-3">

        {/* VIEW DETAILS */}

        <button
          type="button"
          onClick={handleViewDetails}
          disabled={changing}
          className="flex-1 h-8 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold flex items-center justify-center gap-1 disabled:opacity-60"
        >
          <Eye size={14} />
          View Details
        </button>

        {/* DELIVERED */}

        <button
          type="button"
          disabled={changing}
          onClick={() =>
            handleStatusChange("delivered")
          }
          className="flex-1 h-8 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-semibold flex items-center justify-center gap-1 disabled:opacity-60"
        >

          <CheckCircle size={14} />

          {changing ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            "Delivered"
          )}

        </button>

        {/* CANCEL */}

        <button
          type="button"
          disabled={changing}
          onClick={() =>
            handleStatusChange("cancelled")
          }
          className="w-9 h-8 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center disabled:opacity-60"
          title="Cancel Order"
        >
          <X size={15} />
        </button>

      </div>

    </div>
  );
};
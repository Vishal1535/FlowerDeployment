
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Eye,
  Phone,
  CreditCard,
  Truck,
  CalendarDays,
  MapPin,
  CheckCircle,
  Package,
} from "lucide-react";

export const DeliveredOrderItem = ({ order }) => {
  const navigate = useNavigate();

  if (!order) return null;

  const address = order.address;

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

  // =====================================================
  // DATE + TIME
  // =====================================================

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
    <div className="bg-white border border-green-100 rounded-xl shadow-sm px-4 py-3">

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
              Delivered
            </span>

          </div>

          <p className="text-xs text-gray-600 font-medium mt-1">
            {order.user?.name || "Customer"}
          </p>

          {/* PHONE */}

          {order.user?.phone && (
            <p className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
              <Phone size={11} />
              {order.user.phone}
            </p>
          )}

        </div>

        {/* STATUS */}

        <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-200 flex items-center gap-1">

          <CheckCircle size={11} />

          Delivered

        </span>

      </div>

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

        {/* DELIVERY TYPE */}

        <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">

          <Truck
            size={14}
            className="text-green-600 shrink-0"
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

        {/* DELIVERED / EXPECTED DATE */}

        <div className="flex items-center gap-2">

          <CalendarDays
            size={13}
            className="text-green-500 shrink-0"
          />

          <p className="text-[10px] text-gray-500">

            Delivery:

            <span className="font-semibold text-gray-700 ml-1">
              {formatDate(order.deliverDate)}
            </span>

          </p>

        </div>

        {/* ORDERED AT */}

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
            className="text-green-500 mt-0.5 shrink-0"
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
      {/* COMPLETED MESSAGE */}
      {/* ================================================= */}

      <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-green-50 border border-green-100">

        <Package
          size={14}
          className="text-green-600 shrink-0"
        />

        <p className="text-[10px] text-green-700 font-medium">
          This order has been successfully delivered.
        </p>

      </div>

      {/* ================================================= */}
      {/* ACTION */}
      {/* ================================================= */}

      <div className="mt-3">

        <button
          type="button"
          onClick={handleViewDetails}
          className="w-full h-8 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold flex items-center justify-center gap-1"
        >

          <Eye size={14} />

          View Details

        </button>

      </div>

    </div>
  );
};


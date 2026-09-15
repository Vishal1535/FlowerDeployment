
import React from "react";
import { CancelledOrderItem } from "./CancelledOrderItem";

export const CancelledOrder = ({ orders = [] }) => {
  const cancelledOrders = orders.filter(
    (order) => order?.orderStatus === "cancelled"
  );

  return (
    <div className="w-full space-y-4 sm:space-y-5">

      {/* HEADING */}
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Cancelled Orders
        </h2>

        <p className="text-xs sm:text-sm text-gray-500">
          {cancelledOrders.length} cancelled order
          {cancelledOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ORDERS */}
      {cancelledOrders.length > 0 ? (
        <div className="w-full space-y-3">
          {cancelledOrders.map((order) => (
            <CancelledOrderItem
              key={order._id}
              order={order}
            />
          ))}
        </div>
      ) : (
        <div className="w-full bg-white border border-red-100 rounded-xl sm:rounded-2xl p-6 sm:p-10 text-center">
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            No cancelled orders
          </p>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Cancelled orders will appear here.
          </p>
        </div>
      )}
    </div>
  );
};


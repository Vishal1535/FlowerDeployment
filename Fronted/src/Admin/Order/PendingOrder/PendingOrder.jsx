
import React from "react";
import { PendingOrderItem } from "./PendingOrderItem";

export const PendingOrder = ({ orders = [] }) => {
  const pendingOrders = orders.filter(
    (order) => order?.orderStatus === "pending"
  );

  return (
    <div className="w-full space-y-4 sm:space-y-5">

      {/* HEADING */}
      <div className="min-w-0">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
          Pending Orders
        </h2>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {pendingOrders.length} pending order
          {pendingOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ORDERS */}
      {pendingOrders.length > 0 ? (
        <div className="w-full space-y-3">

          {pendingOrders.map((order) => (
            <PendingOrderItem
              key={order._id}
              order={order}
            />
          ))}

        </div>
      ) : (
        <div className="w-full bg-white border border-amber-100 rounded-xl sm:rounded-2xl p-6 sm:p-10 text-center">

          <p className="text-sm sm:text-base text-gray-500 font-medium">
            No pending orders
          </p>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            New pending orders will appear here.
          </p>

        </div>
      )}

    </div>
  );
};


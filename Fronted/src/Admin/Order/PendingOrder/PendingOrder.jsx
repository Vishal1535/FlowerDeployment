
import React from "react";
import { PendingOrderItem } from "./PendingOrderItem";

export const PendingOrder = ({ orders = [] }) => {
  const pendingOrders = orders.filter(
    (order) => order?.orderStatus === "pending"
  );

  return (
    <div className="space-y-4">

      {/* HEADING */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Pending Orders
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {pendingOrders.length} pending order
          {pendingOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ORDERS */}
      {pendingOrders.length > 0 ? (
        <div className="space-y-3">

          {pendingOrders.map((order) => (
            <PendingOrderItem
              key={order._id}
              order={order}
            />
          ))}

        </div>
      ) : (
        <div className="bg-white border border-amber-100 rounded-2xl p-10 text-center">

          <p className="text-gray-500 font-medium">
            No pending orders
          </p>

          <p className="text-sm text-gray-400 mt-1">
            New pending orders will appear here.
          </p>

        </div>
      )}

    </div>
  );
};


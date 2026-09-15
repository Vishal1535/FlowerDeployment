
import React from "react";
import { CancelledOrderItem } from "./CancelledOrderItem";

export const CancelledOrder = ({ orders = [] }) => {
  const cancelledOrders = orders.filter(
    (order) => order?.orderStatus === "cancelled"
  );

  return (
    <div className="space-y-4">

      {/* HEADING */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Cancelled Orders
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {cancelledOrders.length} cancelled order
          {cancelledOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ORDERS */}
      {cancelledOrders.length > 0 ? (
        <div className="space-y-3">

          {cancelledOrders.map((order) => (
            <CancelledOrderItem
              key={order._id}
              order={order}
            />
          ))}

        </div>
      ) : (
        <div className="bg-white border border-red-100 rounded-2xl p-10 text-center">

          <p className="text-gray-500 font-medium">
            No cancelled orders
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Cancelled orders will appear here.
          </p>

        </div>
      )}

    </div>
  );
};


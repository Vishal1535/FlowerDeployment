
import React from "react";
import { DeliveredOrderItem } from "./DeliveredOrderItem";

export const DeliveredOrder = ({ orders = [] }) => {
  const deliveredOrders = orders.filter(
    (order) => order?.orderStatus === "delivered"
  );

  return (
    <div className="space-y-4">

      {/* HEADING */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Delivered Orders
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {deliveredOrders.length} delivered order
          {deliveredOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ORDERS */}
      {deliveredOrders.length > 0 ? (
        <div className="space-y-3">

          {deliveredOrders.map((order) => (
            <DeliveredOrderItem
              key={order._id}
              order={order}
            />
          ))}

        </div>
      ) : (
        <div className="bg-white border border-green-100 rounded-2xl p-10 text-center">

          <p className="text-gray-500 font-medium">
            No delivered orders
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Delivered orders will appear here.
          </p>

        </div>
      )}

    </div>
  );
};


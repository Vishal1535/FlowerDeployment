import React from "react";
import { ShippedOrderItem } from "./ShippedOrderItem";

export const ShippedOrder = ({ orders = [] }) => {
  const shippedOrders = orders.filter(
    (order) => order?.orderStatus === "shipped"
  );

  return (
    <div className="space-y-4">

      {/* HEADING */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Shipped Orders
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {shippedOrders.length} shipped order
          {shippedOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ORDERS */}
      {shippedOrders.length > 0 ? (
        <div className="space-y-3">

          {shippedOrders.map((order) => (
            <ShippedOrderItem
              key={order._id}
              order={order}
            />
          ))}

        </div>
      ) : (
        <div className="bg-white border border-indigo-100 rounded-2xl p-10 text-center">

          <p className="text-gray-500 font-medium">
            No shipped orders
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Shipped orders will appear here.
          </p>

        </div>
      )}

    </div>
  );
};
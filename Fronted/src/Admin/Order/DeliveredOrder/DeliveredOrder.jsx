
import React from "react";
import { DeliveredOrderItem } from "./DeliveredOrderItem";

export const DeliveredOrder = ({ orders = [] }) => {
  const deliveredOrders = orders.filter(
    (order) => order?.orderStatus === "delivered"
  );

  return (
    <div className="w-full space-y-4 sm:space-y-5">

      {/* HEADING */}
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Delivered Orders
        </h2>

        <p className="text-xs sm:text-sm text-gray-500">
          {deliveredOrders.length} delivered order
          {deliveredOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ORDERS */}
      {deliveredOrders.length > 0 ? (
        <div className="w-full space-y-3">

          {deliveredOrders.map((order) => (
            <DeliveredOrderItem
              key={order._id}
              order={order}
            />
          ))}

        </div>
      ) : (
        <div className="w-full bg-white border border-green-100 rounded-xl sm:rounded-2xl p-6 sm:p-10 text-center">

          <p className="text-sm sm:text-base text-gray-500 font-medium">
            No delivered orders
          </p>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Delivered orders will appear here.
          </p>

        </div>
      )}

    </div>
  );
};


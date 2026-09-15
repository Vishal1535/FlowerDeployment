
import React from "react";
import { ConfirmedOrderItem } from "./ConfirmedOrderItem";

export const ConfirmedOrder = ({ orders = [] }) => {
  const confirmedOrders = orders.filter(
    (order) => order?.orderStatus === "confirmed",
  );

  return (
    <div className="w-full space-y-4 sm:space-y-5">
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Confirmed Orders
        </h2>

        <p className="text-xs sm:text-sm text-gray-500">
          {confirmedOrders.length} confirmed order
          {confirmedOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Orders */}
      {confirmedOrders.length > 0 ? (
        <div className="w-full space-y-3">
          {confirmedOrders.map((order) => (
            <ConfirmedOrderItem key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <div className="w-full bg-white border border-blue-100 rounded-xl sm:rounded-2xl p-6 sm:p-10 text-center">
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            No confirmed orders
          </p>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Confirmed orders will appear here.
          </p>
        </div>
      )}
    </div>
  );
};


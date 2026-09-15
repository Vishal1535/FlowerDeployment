import React from "react";
import { ConfirmedOrderItem } from "./ConfirmedOrderItem";

export const ConfirmedOrder = ({ orders = [] }) => {
  const confirmedOrders = orders.filter(
    (order) => order?.orderStatus === "confirmed",
  );

  return (
    <div className="space-y-4">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Confirmed Orders</h2>

        <p className="text-sm text-gray-500 mt-1">
          {confirmedOrders.length} confirmed order
          {confirmedOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Orders */}
      {confirmedOrders.length > 0 ? (
        <div className="space-y-3">
          {confirmedOrders.map((order) => (
            <ConfirmedOrderItem key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-blue-100 rounded-2xl p-10 text-center">
          <p className="text-gray-500 font-medium">No confirmed orders</p>

          <p className="text-sm text-gray-400 mt-1">
            Confirmed orders will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

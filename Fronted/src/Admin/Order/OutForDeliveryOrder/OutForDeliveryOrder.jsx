
import React from "react";
import { OutForDeliveryOrderItem } from "./OutForDeliveryOrderItem";

export const OutForDeliveryOrder = ({ orders = [] }) => {
  const outForDeliveryOrders = orders.filter(
    (order) => order?.orderStatus === "out_for_delivery"
  );

  return (
    <div className="space-y-4">

      {/* HEADING */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Out For Delivery Orders
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {outForDeliveryOrders.length} order
          {outForDeliveryOrders.length !== 1 ? "s" : ""} out for delivery
        </p>
      </div>

      {/* ORDERS */}
      {outForDeliveryOrders.length > 0 ? (
        <div className="space-y-3">
          {outForDeliveryOrders.map((order) => (
            <OutForDeliveryOrderItem
              key={order._id}
              order={order}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-orange-100 rounded-2xl p-10 text-center">

          <p className="text-gray-500 font-medium">
            No orders out for delivery
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Orders ready for delivery will appear here.
          </p>

        </div>
      )}

    </div>
  );
};


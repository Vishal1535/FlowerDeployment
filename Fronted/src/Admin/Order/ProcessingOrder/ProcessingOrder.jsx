
import React from "react";
import { ProcessingOrderItem } from "./ProcessingOrderItem";

export const ProcessingOrder = ({ orders = [] }) => {
  const processingOrders = orders.filter(
    (order) => order?.orderStatus === "processing"
  );

  return (
    <div className="space-y-4">

      {/* ================================================= */}
      {/* HEADING */}
      {/* ================================================= */}

      <div>

        <h2 className="text-xl font-bold text-gray-800">
          Processing Orders
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {processingOrders.length} processing order
          {processingOrders.length !== 1 ? "s" : ""}
        </p>

      </div>

      {/* ================================================= */}
      {/* ORDERS */}
      {/* ================================================= */}

      {processingOrders.length > 0 ? (

        <div className="space-y-3">

          {processingOrders.map((order) => (

            <ProcessingOrderItem
              key={order._id}
              order={order}
            />

          ))}

        </div>

      ) : (

        <div className="bg-white border border-purple-100 rounded-2xl p-10 text-center">

          <p className="text-gray-500 font-medium">
            No processing orders
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Orders that are being prepared will appear here.
          </p>

        </div>

      )}

    </div>
  );
};


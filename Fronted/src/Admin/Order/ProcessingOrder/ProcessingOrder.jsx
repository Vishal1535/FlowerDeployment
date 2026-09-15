
import React from "react";
import { ProcessingOrderItem } from "./ProcessingOrderItem";

export const ProcessingOrder = ({ orders = [] }) => {
  const processingOrders = orders.filter(
    (order) => order?.orderStatus === "processing"
  );

  return (
    <div className="w-full space-y-4 sm:space-y-5">

      {/* ================================================= */}
      {/* HEADING */}
      {/* ================================================= */}

      <div className="min-w-0">

        <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
          Processing Orders
        </h2>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {processingOrders.length} processing order
          {processingOrders.length !== 1 ? "s" : ""}
        </p>

      </div>

      {/* ================================================= */}
      {/* ORDERS */}
      {/* ================================================= */}

      {processingOrders.length > 0 ? (

        <div className="w-full space-y-3">

          {processingOrders.map((order) => (

            <ProcessingOrderItem
              key={order._id}
              order={order}
            />

          ))}

        </div>

      ) : (

        <div className="w-full bg-white border border-purple-100 rounded-xl sm:rounded-2xl p-6 sm:p-10 text-center">

          <p className="text-sm sm:text-base text-gray-500 font-medium">
            No processing orders
          </p>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Orders that are being prepared will appear here.
          </p>

        </div>

      )}

    </div>
  );
};


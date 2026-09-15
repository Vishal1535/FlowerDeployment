import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Package,
  MapPin,
  Truck,
  CheckCircle,
  XCircle,
  CreditCard,
  CalendarDays,
} from "lucide-react";

import { ChangeOrderStatusThunk } from "../../Store/Order/OrderApi";

export const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orders = [] } = useSelector(
    (state) => state.Order
  );

  const [changing, setChanging] = useState(false);

  // =====================================================
  // FIND ORDER
  // =====================================================

  const stateOrder = location.state?.order;

  const reduxOrder = orders.find(
    (item) => item?._id === id
  );

  const order = reduxOrder || stateOrder;

  // =====================================================
  // ORDER NOT FOUND
  // =====================================================

  if (!order) {
    return (
      <div className="min-h-screen bg-[#fffafa] flex items-center justify-center px-4">

        <div className="text-center">

          <p className="text-gray-500 font-semibold">
            Order not found
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              mt-3
              flex
              items-center
              gap-1
              mx-auto
              text-pink-600
              text-sm
              font-semibold
            "
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // NEXT STATUS
  // =====================================================

  const nextStatus = {
    pending: "confirmed",
    confirmed: "processing",
    processing: "shipped",
    shipped: "out_for_delivery",
    out_for_delivery: "delivered",
  };

  const next = nextStatus[order.orderStatus];

  // =====================================================
  // STATUS LABEL
  // =====================================================

  const statusLabel = (status) => {
    if (!status) return "-";

    return status
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // =====================================================
  // STATUS COLORS
  // =====================================================

  const statusColor = {
    pending:
      "bg-amber-50 text-amber-600 border-amber-200",

    confirmed:
      "bg-blue-50 text-blue-600 border-blue-200",

    processing:
      "bg-purple-50 text-purple-600 border-purple-200",

    shipped:
      "bg-indigo-50 text-indigo-600 border-indigo-200",

    out_for_delivery:
      "bg-orange-50 text-orange-600 border-orange-200",

    delivered:
      "bg-green-50 text-green-600 border-green-200",

    cancelled:
      "bg-red-50 text-red-600 border-red-200",
  };

  // =====================================================
  // CHANGE STATUS
  // =====================================================

  const handleStatusChange = async (status) => {
    if (!order?._id || !status || changing) return;

    setChanging(true);

    try {
      const response = await dispatch(
        ChangeOrderStatusThunk({
          orderId: order._id,
          status,
        })
      ).unwrap();

      toast.success(
        response?.message ||
          `Order status changed to ${statusLabel(status)}`
      );

      navigate("/admin/orders");

    } catch (error) {

      toast.error(
        error || "Failed to change order status"
      );

      console.error(
        "Status update error:",
        error
      );

    } finally {
      setChanging(false);
    }
  };

  // =====================================================
  // ADDRESS
  // =====================================================

  const address = order.address;

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#fffafa] px-4 py-5 sm:px-6">

      <div className="max-w-5xl mx-auto">

        {/* ================================================= */}
        {/* BACK */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            flex
            items-center
            gap-1.5
            text-sm
            font-semibold
            text-gray-600
            hover:text-pink-600
            mb-4
          "
        >
          <ArrowLeft size={17} />
          Back to Orders
        </button>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="
          bg-white
          border
          border-gray-100
          rounded-xl
          shadow-sm
          px-4
          py-4
        ">

          <div className="
            flex
            items-center
            justify-between
            gap-3
          ">

            <div className="min-w-0">

              <p className="
                text-[10px]
                text-gray-400
                uppercase
                font-semibold
              ">
                Order
              </p>

              <h1 className="
                text-lg
                font-black
                text-gray-800
              ">
                #{order._id?.slice(-8)}
              </h1>

              <p className="
                text-xs
                text-gray-500
                mt-1
              ">
                {order.user?.name || "Customer"}
              </p>

            </div>

            <span
              className={`
                shrink-0
                px-3
                py-1.5
                rounded-full
                border
                text-xs
                font-bold
                ${
                  statusColor[order.orderStatus] ||
                  "bg-gray-50 text-gray-600 border-gray-200"
                }
              `}
            >
              {statusLabel(order.orderStatus)}
            </span>

          </div>

        </div>

        {/* ================================================= */}
        {/* CUSTOMER + ADDRESS */}
        {/* ================================================= */}

        <div className="
          grid
          md:grid-cols-2
          gap-3
          mt-3
        ">

          {/* CUSTOMER */}

          <div className="
            bg-white
            border
            border-gray-100
            rounded-xl
            p-4
          ">

            <div className="
              flex
              items-center
              gap-2
              mb-3
            ">

              <Package
                size={17}
                className="text-pink-500"
              />

              <h2 className="
                text-sm
                font-bold
                text-gray-800
              ">
                Customer
              </h2>

            </div>

            <p className="
              text-sm
              font-semibold
              text-gray-800
            ">
              {order.user?.name || "-"}
            </p>

            <p className="
              text-xs
              text-gray-500
              mt-1
              break-all
            ">
              {order.user?.email || "-"}
            </p>

            <p className="
              text-xs
              text-gray-500
              mt-1
            ">
              {order.user?.phone || "-"}
            </p>

          </div>

          {/* ADDRESS */}

          <div className="
            bg-white
            border
            border-gray-100
            rounded-xl
            p-4
          ">

            <div className="
              flex
              items-center
              gap-2
              mb-3
            ">

              <MapPin
                size={17}
                className="text-pink-500"
              />

              <h2 className="
                text-sm
                font-bold
                text-gray-800
              ">
                Delivery Address
              </h2>

            </div>

            <p className="
              text-sm
              font-semibold
              text-gray-800
            ">
              {address?.fullName ||
                order.user?.name ||
                "-"}
            </p>

            <p className="
              text-xs
              text-gray-600
              mt-1
            ">

              {address?.houseNumber
                ? `House No. ${address.houseNumber}, `
                : ""}

              {address?.area || ""}

            </p>

            <p className="
              text-xs
              text-gray-500
              mt-1
            ">

              {address?.city || ""}

              {address?.state
                ? `, ${address.state}`
                : ""}

            </p>

            <p className="
              text-xs
              text-gray-500
            ">

              {address?.pincode || ""}

              {address?.country
                ? `, ${address.country}`
                : ""}

            </p>

            {address?.landmark && (
              <p className="
                text-xs
                text-gray-400
                mt-1
              ">
                Landmark: {address.landmark}
              </p>
            )}

            <p className="
              text-xs
              text-gray-500
              mt-1
            ">
              Phone: {address?.phone || "-"}
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* ORDER PRODUCTS */}
        {/* ================================================= */}

        <div className="
          bg-white
          border
          border-gray-100
          rounded-xl
          p-4
          mt-3
        ">

          <div className="
            flex
            items-center
            gap-2
            mb-3
          ">

            <Package
              size={17}
              className="text-pink-500"
            />

            <h2 className="
              text-sm
              font-bold
              text-gray-800
            ">
              Ordered Products
            </h2>

          </div>

          <div className="space-y-2">

            {order.items?.map((item, index) => (

              <div
                key={`${order._id}-${index}`}
                className="
                  flex
                  items-center
                  gap-3
                  border
                  border-gray-100
                  rounded-lg
                  p-2
                "
              >

                {item.image ? (

                  <img
                    src={item.image}
                    alt={item.name || "Product"}
                    className="
                      w-12
                      h-12
                      rounded-lg
                      object-cover
                      shrink-0
                    "
                  />

                ) : (

                  <div className="
                    w-12
                    h-12
                    rounded-lg
                    bg-gray-100
                    shrink-0
                  " />

                )}

                <div className="
                  flex-1
                  min-w-0
                ">

                  <p className="
                    text-xs
                    font-bold
                    text-gray-800
                    truncate
                  ">
                    {item.name || "Product"}
                  </p>

                  <p className="
                    text-[10px]
                    text-gray-400
                    capitalize
                  ">
                    {item.productType || "-"}
                  </p>

                  <p className="
                    text-[11px]
                    text-gray-500
                  ">
                    ₹{item.price || 0} ×{" "}
                    {item.quantity || 0}
                  </p>

                </div>

                <p className="
                  text-xs
                  font-bold
                  text-gray-800
                  shrink-0
                ">
                  ₹{item.totalPrice || 0}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* ================================================= */}
        {/* PAYMENT SUMMARY */}
        {/* ================================================= */}

        <div className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-2
          mt-3
        ">

          <div className="
            bg-white
            border
            border-gray-100
            rounded-xl
            p-3
          ">

            <p className="
              text-[10px]
              text-gray-400
            ">
              Subtotal
            </p>

            <p className="
              text-sm
              font-bold
              text-gray-800
            ">
              ₹{order.subtotal || 0}
            </p>

          </div>

          <div className="
            bg-white
            border
            border-gray-100
            rounded-xl
            p-3
          ">

            <p className="
              text-[10px]
              text-gray-400
            ">
              Delivery
            </p>

            <p className="
              text-sm
              font-bold
              text-gray-800
            ">
              ₹{order.deliveryCharge || 0}
            </p>

          </div>

          <div className="
            bg-white
            border
            border-gray-100
            rounded-xl
            p-3
          ">

            <p className="
              text-[10px]
              text-gray-400
            ">
              Paid
            </p>

            <p className="
              text-sm
              font-bold
              text-green-600
            ">
              ₹{order.paidAmount || 0}
            </p>

          </div>

          <div className="
            bg-white
            border
            border-gray-100
            rounded-xl
            p-3
          ">

            <p className="
              text-[10px]
              text-gray-400
            ">
              Total
            </p>

            <p className="
              text-sm
              font-black
              text-gray-800
            ">
              ₹{order.totalAmount || 0}
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* PAYMENT DETAILS */}
        {/* ================================================= */}

        <div className="
          bg-white
          border
          border-gray-100
          rounded-xl
          p-4
          mt-3
        ">

          <div className="
            flex
            items-center
            gap-2
            mb-3
          ">

            <CreditCard
              size={17}
              className="text-pink-500"
            />

            <h2 className="
              text-sm
              font-bold
              text-gray-800
            ">
              Payment Information
            </h2>

          </div>

          <div className="
            grid
            sm:grid-cols-2
            gap-2
            text-xs
          ">

            <p className="text-gray-500">

              Payment Method:{" "}

              <span className="
                font-semibold
                text-gray-700
                capitalize
              ">
                {order.paymentMethod || "-"}
              </span>

            </p>

            <p className="text-gray-500">

              Payment Type:{" "}

              <span className="
                font-semibold
                text-gray-700
                capitalize
              ">
                {order.paymentType || "-"}
              </span>

            </p>

            <p className="text-gray-500">

              Payment Status:{" "}

              <span className="
                font-semibold
                text-green-600
                capitalize
              ">
                {order.paymentStatus || "-"}
              </span>

            </p>

            {order.paymentId && (

              <p className="
                text-gray-500
                break-all
              ">

                Payment ID:{" "}

                <span className="
                  font-semibold
                  text-gray-700
                ">
                  {order.paymentId}
                </span>

              </p>

            )}

            {order.paymentOrderId && (

              <p className="
                text-gray-500
                break-all
              ">

                Payment Order ID:{" "}

                <span className="
                  font-semibold
                  text-gray-700
                ">
                  {order.paymentOrderId}
                </span>

              </p>

            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* DELIVERY INFORMATION */}
        {/* ================================================= */}

        <div className="
          bg-white
          border
          border-gray-100
          rounded-xl
          p-4
          mt-3
        ">

          <div className="
            flex
            items-center
            gap-2
            mb-3
          ">

            <Truck
              size={17}
              className="text-pink-500"
            />

            <h2 className="
              text-sm
              font-bold
              text-gray-800
            ">
              Delivery Information
            </h2>

          </div>

          <div className="
            flex
            flex-wrap
            gap-x-6
            gap-y-2
            text-xs
            text-gray-500
          ">

            <p>

              Type:{" "}

              <span className="
                font-semibold
                text-gray-700
                capitalize
              ">
                {order.deliveryType || "-"}
              </span>

            </p>

            <p className="
              flex
              items-center
              gap-1
            ">

              <CalendarDays size={13} />

              Expected:{" "}

              <span className="
                font-semibold
                text-gray-700
              ">
                {order.deliverDate
                  ? new Date(
                      order.deliverDate
                    ).toLocaleDateString()
                  : "-"}
              </span>

            </p>

            <p>

              Payment:{" "}

              <span className="
                font-semibold
                text-green-600
                capitalize
              ">
                {order.paymentStatus || "-"}
              </span>

            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* DELIVERY BOY */}
        {/* ONLY OUT FOR DELIVERY */}
        {/* ================================================= */}

        {order.orderStatus === "out_for_delivery" &&
          order.deliveryBoy && (

            <div className="
              bg-white
              border
              border-orange-100
              rounded-xl
              px-4
              py-3
              mt-3
              shadow-sm
            ">

              {/* TOP */}

              <div className="
                flex
                items-center
                justify-between
                gap-3
              ">

                {/* DELIVERY BOY */}

                <div className="
                  flex
                  items-center
                  gap-2.5
                  min-w-0
                ">

                  <div className="
                    w-9
                    h-9
                    rounded-lg
                    bg-orange-50
                    text-orange-500
                    flex
                    items-center
                    justify-center
                    shrink-0
                  ">
                    <Truck size={17} />
                  </div>

                  <div className="min-w-0">

                    <p className="
                      text-[10px]
                      text-gray-400
                      uppercase
                      font-semibold
                    ">
                      Delivery Boy
                    </p>

                    <p className="
                      text-sm
                      font-bold
                      text-gray-800
                      truncate
                    ">
                      {order.deliveryBoy?.name || "-"}
                    </p>

                  </div>

                </div>

                {/* STATUS */}

                <span className="
                  shrink-0
                  px-2.5
                  py-1
                  rounded-full
                  bg-orange-50
                  border
                  border-orange-200
                  text-orange-600
                  text-[10px]
                  font-bold
                ">
                  Out For Delivery
                </span>

              </div>

              {/* CONTACT DETAILS */}

              <div className="
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-1
                mt-3
                pt-3
                border-t
                border-gray-100
              ">

                <p className="
                  text-xs
                  text-gray-500
                ">

                  Phone:

                  <span className="
                    font-semibold
                    text-gray-700
                    ml-1
                  ">
                    {order.deliveryBoy?.phone || "-"}
                  </span>

                </p>

                <p className="
                  text-xs
                  text-gray-500
                  break-all
                ">

                  Email:

                  <span className="
                    font-semibold
                    text-gray-700
                    ml-1
                  ">
                    {order.deliveryBoy?.email || "-"}
                  </span>

                </p>

              </div>

            </div>

          )}

        {/* ================================================= */}
        {/* ORDER INFORMATION */}
        {/* ================================================= */}

        <div className="
          bg-white
          border
          border-gray-100
          rounded-xl
          p-4
          mt-3
        ">

          <div className="
            flex
            items-center
            gap-2
            mb-3
          ">

            <CalendarDays
              size={17}
              className="text-pink-500"
            />

            <h2 className="
              text-sm
              font-bold
              text-gray-800
            ">
              Order Information
            </h2>

          </div>

          <div className="
            grid
            sm:grid-cols-2
            gap-2
            text-xs
            text-gray-500
          ">

            <p>

              Ordered At:{" "}

              <span className="
                font-semibold
                text-gray-700
              ">
                {order.orderedAt
                  ? new Date(
                      order.orderedAt
                    ).toLocaleString()
                  : "-"}
              </span>

            </p>

            <p>

              Created At:{" "}

              <span className="
                font-semibold
                text-gray-700
              ">
                {order.createdAt
                  ? new Date(
                      order.createdAt
                    ).toLocaleString()
                  : "-"}
              </span>

            </p>

            <p>

              Last Updated:{" "}

              <span className="
                font-semibold
                text-gray-700
              ">
                {order.updatedAt
                  ? new Date(
                      order.updatedAt
                    ).toLocaleString()
                  : "-"}
              </span>

            </p>

            <p>

              Remaining Amount:{" "}

              <span className="
                font-semibold
                text-gray-700
              ">
                ₹{order.remainingAmount || 0}
              </span>

            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* ORDER ACTION */}
        {/* ================================================= */}

        {order.orderStatus !== "delivered" &&
          order.orderStatus !== "cancelled" && (

          <div className="
            bg-white
            border
            border-gray-100
            rounded-xl
            p-4
            mt-3
          ">

            <p className="
              text-xs
              text-gray-400
              mb-2
            ">
              Order Action
            </p>

            <div className="flex gap-2">

              {/* NEXT STATUS */}

              {next && (

                <button
                  type="button"
                  disabled={changing}
                  onClick={() =>
                    handleStatusChange(next)
                  }
                  className="
                    flex-1
                    h-9
                    rounded-lg
                    bg-pink-500
                    hover:bg-pink-600
                    text-white
                    text-xs
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    disabled:opacity-60
                  "
                >

                  <CheckCircle size={15} />

                  {changing
                    ? "Updating..."
                    : `Proceed to ${statusLabel(next)}`}

                </button>

              )}

              {/* CANCEL */}

              <button
                type="button"
                disabled={changing}
                onClick={() =>
                  handleStatusChange("cancelled")
                }
                className="
                  h-9
                  px-4
                  rounded-lg
                  bg-red-50
                  hover:bg-red-100
                  border
                  border-red-200
                  text-red-600
                  text-xs
                  font-bold
                  flex
                  items-center
                  gap-1.5
                  disabled:opacity-60
                "
              >

                <XCircle size={15} />

                Cancel

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};
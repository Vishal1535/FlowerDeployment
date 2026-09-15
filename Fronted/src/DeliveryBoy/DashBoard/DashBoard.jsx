import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  Bike,
  CheckCircle,
  Clock3,
  Package,
  XCircle,
  MapPin,
  ArrowRight,
  ArrowLeft,
  User,
  CircleCheck,
} from "lucide-react";

import {
  getMyAssignedOrdersThunk,
  getMyDeliveryStatsThunk,
  updateMyLocationThunk,
} from "../../Store/DeliveryBoy/DeliveryBoyApi";

export const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // =====================================================
  // REDUX
  // =====================================================

  const {
    assignedOrders = [],
    stats = null,
    loading = false,
  } = useSelector((state) => state.DeliveryBoy || {});

  // =====================================================
  // GET DATA
  // =====================================================

  useEffect(() => {
    dispatch(getMyAssignedOrdersThunk());
    dispatch(getMyDeliveryStatsThunk());
  }, [dispatch]);

  // =====================================================
  // CURRENT ORDERS
  // =====================================================

  const currentOrders = assignedOrders.filter(
    (order) =>
      order?.orderStatus === "shipped" ||
      order?.orderStatus === "out_for_delivery",
  );

  // =====================================================
  // RECENT ORDERS
  // =====================================================

  const recentOrders = assignedOrders.slice(0, 3);

  // =====================================================
  // STATS
  // =====================================================

  const totalDeliveries =
    stats?.totalDeliveries ?? stats?.total ?? stats?.totalOrders ?? 0;

  const completed =
    stats?.completed ?? stats?.delivered ?? stats?.deliveredOrders ?? 0;

  const activeOrders =
    stats?.activeOrders ??
    stats?.active ??
    stats?.pending ??
    currentOrders.length;

  const cancelled = stats?.cancelled ?? stats?.cancelledOrders ?? 0;

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "shipped":
        return "bg-orange-50 text-orange-600";

      case "out_for_delivery":
        return "bg-blue-50 text-blue-600";

      case "delivered":
        return "bg-green-50 text-green-600";

      case "cancelled":
        return "bg-red-50 text-red-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };
  // updateLocation
  const handleUpdateLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    toast.loading("Getting your location...", {
      id: "location-update",
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const result = await dispatch(
          updateMyLocationThunk({
            latitude,
            longitude,
          }),
        );

        if (updateMyLocationThunk.fulfilled.match(result)) {
          toast.success(
            result.payload?.message || "Location updated successfully!",
            {
              id: "location-update",
            },
          );
        } else {
          toast.error(result.payload || "Failed to update location", {
            id: "location-update",
          });
        }
      },

      (error) => {
        console.log("Location Error:", error);

        let message = "Unable to get your location";

        if (error.code === 1) {
          message = "Location permission denied. Please allow location access.";
        } else if (error.code === 2) {
          message = "Location unavailable. Please try again.";
        } else if (error.code === 3) {
          message = "Location request timed out. Please try again.";
        }

        toast.error(message, {
          id: "location-update",
        });
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };
  // =====================================================
  // STATUS TEXT
  // =====================================================

  const getStatusText = (status) => {
    switch (status) {
      case "shipped":
        return "Shipped";

      case "out_for_delivery":
        return "Out for Delivery";

      case "delivered":
        return "Delivered";

      case "cancelled":
        return "Cancelled";

      default:
        return status || "Unknown";
    }
  };

  // =====================================================
  // FORMAT ORDER ID
  // =====================================================

  const formatOrderId = (id) => {
    if (!id) return "Order";

    return `Order #${id.slice(-7)}`;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading && assignedOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-100 flex items-center justify-center">
            <Bike size={28} className="text-pink-500 animate-pulse" />
          </div>

          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2.5
              bg-white
              border
              border-gray-200
              rounded-xl
              text-sm
              font-medium
              text-gray-600
              hover:bg-pink-50
              hover:text-pink-600
              hover:border-pink-200
              transition
              shadow-sm
            "
          >
            <ArrowLeft size={18} />

            <span>Back</span>
          </button>
        </div>

        {/* =====================================================
            WELCOME HEADER
        ===================================================== */}

        <div className="relative overflow-hidden bg-white border border-pink-100 rounded-3xl shadow-sm">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-pink-100/60 rounded-full blur-2xl" />

          <div className="absolute right-24 bottom-0 w-28 h-28 bg-rose-100/50 rounded-full blur-2xl" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* LEFT */}

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                  <Bike size={31} />
                </div>

                <div>
                  <p className="text-sm font-medium text-pink-500">
                    Delivery Panel
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
                    Welcome back! 👋
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    Manage your deliveries and keep track of your orders.
                  </p>
                </div>
              </div>

              {/* STATUS */}

              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                  <CircleCheck size={22} className="text-green-500" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Your status</p>

                  <p className="text-sm font-bold text-green-600">Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* TOTAL */}

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Deliveries</p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {totalDeliveries}
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  All time deliveries
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
                <Package size={24} />
              </div>
            </div>
          </div>

          {/* COMPLETED */}

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {completed}
                </h2>

                <p className="text-xs text-green-500 mt-1">
                  Successfully delivered
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
            </div>
          </div>

          {/* ACTIVE */}

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Orders</p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {activeOrders}
                </h2>

                <p className="text-xs text-orange-500 mt-1">
                  Need your attention
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <Clock3 size={24} />
              </div>
            </div>
          </div>

          {/* CANCELLED */}

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Cancelled</p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {cancelled}
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Cancelled deliveries
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                <XCircle size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* =================================================
              CURRENT ORDERS
          ================================================= */}

          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="px-5 sm:px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Current Orders
                </h2>

                <p className="text-sm text-gray-500 mt-0.5">
                  Orders currently assigned to you
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/delivery-boy/orders")}
                className="flex items-center gap-1.5 text-sm font-semibold text-pink-600 hover:text-pink-700"
              >
                View All
                <ArrowRight size={16} />
              </button>
            </div>

            {/* ORDERS */}

            <div className="divide-y divide-gray-100">
              {currentOrders.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center">
                    <Package size={27} className="text-gray-400" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-gray-700">
                    No active orders
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    You don't have any current delivery orders.
                  </p>
                </div>
              ) : (
                currentOrders.slice(0, 5).map((order) => (
                  <div
                    key={order._id}
                    className="p-5 flex items-center gap-4 hover:bg-pink-50/30 transition"
                  >
                    {/* ICON */}

                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        order.orderStatus === "out_for_delivery"
                          ? "bg-blue-50 text-blue-500"
                          : "bg-orange-50 text-orange-500"
                      }`}
                    >
                      {order.orderStatus === "out_for_delivery" ? (
                        <Bike size={21} />
                      ) : (
                        <Package size={21} />
                      )}
                    </div>

                    {/* DETAILS */}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-800">
                          {formatOrderId(order._id)}
                        </h3>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${getStatusStyle(
                            order.orderStatus,
                          )}`}
                        >
                          {getStatusText(order.orderStatus)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {order.user?.name ||
                          order.address?.fullName ||
                          "Customer"}
                      </p>
                    </div>

                    {/* AMOUNT */}

                    <div className="hidden sm:block text-right">
                      <p className="font-semibold text-gray-800">
                        ₹{order.totalAmount ?? order.paidAmount ?? 0}
                      </p>

                      <p className="text-xs text-gray-400 mt-1 capitalize">
                        {order.deliveryType || "Standard"} delivery
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="px-5 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>

              <p className="text-sm text-gray-500 mt-0.5">
                Manage your delivery work
              </p>
            </div>

            <div className="p-5 space-y-3">
              {/* MY ORDERS */}

              <button
                type="button"
                onClick={() => navigate("/delivery-boy/orders")}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-pink-50 border border-pink-100 text-left hover:bg-pink-100 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-pink-500 flex items-center justify-center">
                  <Package size={20} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    My Orders
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    View assigned orders
                  </p>
                </div>

                <ArrowRight size={17} className="text-pink-500" />
              </button>

              {/* PROFILE */}

              <button
                type="button"
                onClick={() => navigate("/delivery-boy/profile")}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left hover:bg-gray-100 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-gray-500 flex items-center justify-center">
                  <User size={20} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    My Profile
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    View your information
                  </p>
                </div>

                <ArrowRight size={17} className="text-gray-400" />
              </button>

              {/* LOCATION */}

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-blue-500 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Location
                    </p>

                    <p className="text-xs text-gray-500 mt-0.5">
                      Keep your delivery location updated.
                    </p>

                    <button
                      type="button"
                      onClick={handleUpdateLocation}
                      disabled={loading}
                      className="mt-2 text-xs font-semibold text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      {loading ? "Updating Location..." : "Update Location"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            RECENT ACTIVITY
        ===================================================== */}

        {recentOrders.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="px-5 sm:px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">
                Recent Activity
              </h2>

              <p className="text-sm text-gray-500 mt-0.5">
                Your latest delivery orders
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="p-5 flex items-center gap-4 hover:bg-gray-50 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                    <Package size={19} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-gray-800">
                        {formatOrderId(order._id)}
                      </p>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${getStatusStyle(
                          order.orderStatus,
                        )}`}
                      >
                        {getStatusText(order.orderStatus)}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      {order.user?.name ||
                        order.address?.fullName ||
                        "Customer"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      ₹{order.totalAmount ?? order.paidAmount ?? 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================
            FOOTER INFO
        ===================================================== */}

        <div className="bg-white border border-pink-100 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
              <Bike size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Ready for your next delivery?
              </p>

              <p className="text-xs text-gray-500">
                Check your assigned orders regularly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            You're available
          </div>
        </div>
      </div>
    </div>
  );
};

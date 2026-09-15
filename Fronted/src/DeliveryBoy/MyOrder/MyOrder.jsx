import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Package,
  MapPin,
  User,
  CheckCircle,
  Bike,
  Navigation,
  RefreshCw,
  Phone,
  LocateFixed,
} from "lucide-react";

import {
  getMyAssignedOrdersThunk,
  markOrderDeliveredThunk,
  updateMyLocationThunk,
} from "../../Store/DeliveryBoy/DeliveryBoyApi";

export const MyOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatingLocation, setUpdatingLocation] = useState(false);

  const {
    assignedOrders = [],
    loading = false,
  } = useSelector((state) => state.DeliveryBoy || {});

  // =====================================================
  // GET ASSIGNED ORDERS
  // =====================================================

  useEffect(() => {
    dispatch(getMyAssignedOrdersThunk());
  }, [dispatch]);

  // =====================================================
  // ONLY OUT FOR DELIVERY ORDERS
  // =====================================================

  const myOrders = assignedOrders.filter(
    (order) =>
      order?.orderStatus === "out_for_delivery"
  );

  // =====================================================
  // UPDATE DELIVERY BOY CURRENT LOCATION
  // =====================================================

  const handleUpdateLocation = () => {
    if (!navigator.geolocation) {
      toast.error(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    setUpdatingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          console.log("Current Location:", {
            latitude,
            longitude,
          });

          const result = await dispatch(
            updateMyLocationThunk({
              latitude,
              longitude,
            })
          );

          if (
            updateMyLocationThunk.fulfilled.match(
              result
            )
          ) {
            toast.success(
              "Your location updated successfully! 📍"
            );

            // Refresh assigned orders
            dispatch(getMyAssignedOrdersThunk());
          } else {
            toast.error(
              result.payload ||
                "Failed to update your location"
            );
          }
        } catch (error) {
          console.error(
            "Location update error:",
            error
          );

          toast.error(
            "Something went wrong while updating location."
          );
        } finally {
          setUpdatingLocation(false);
        }
      },

      (error) => {
        console.error(
          "Geolocation error:",
          error
        );

        setUpdatingLocation(false);

        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          toast.error(
            "Please allow location permission."
          );
        } else if (
          error.code ===
          error.POSITION_UNAVAILABLE
        ) {
          toast.error(
            "Unable to get your current location."
          );
        } else if (
          error.code === error.TIMEOUT
        ) {
          toast.error(
            "Location request timed out."
          );
        } else {
          toast.error(
            "Failed to get your current location."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // =====================================================
  // MARK ORDER DELIVERED
  // =====================================================

  const handleMarkDelivered = async (
    orderId
  ) => {
    const result = await dispatch(
      markOrderDeliveredThunk(orderId)
    );

    if (
      markOrderDeliveredThunk.fulfilled.match(
        result
      )
    ) {
      toast.success(
        "Order delivered successfully! 🎉"
      );

      dispatch(getMyAssignedOrdersThunk());
    } else {
      toast.error(
        result.payload ||
          "Failed to mark order as delivered"
      );
    }
  };

  // =====================================================
  // FORMAT ORDER ID
  // =====================================================

  const formatOrderId = (id) => {
    if (!id) return "Order";

    return `#${id.slice(-7)}`;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (
    loading &&
    assignedOrders.length === 0
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 flex items-center justify-center px-4">
        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-100 flex items-center justify-center">
            <Bike
              size={30}
              className="text-pink-500 animate-pulse"
            />
          </div>

          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading your orders...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 px-4 sm:px-6 lg:px-8 py-6">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="bg-white border border-pink-100 rounded-3xl shadow-sm overflow-hidden">

          <div className="p-5 sm:p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              {/* LEFT */}

              <div className="flex items-center gap-4">

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/delivery-boy/dashboard"
                    )
                  }
                  className="
                    w-11
                    h-11
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    bg-pink-50
                    text-pink-600
                    hover:bg-pink-100
                    transition
                    shrink-0
                  "
                >
                  <ArrowLeft size={20} />
                </button>

                <div>

                  <p className="text-sm font-medium text-pink-500">
                    Delivery Panel
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    My Orders
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    Orders currently out for delivery.
                  </p>

                </div>

              </div>

              {/* UPDATE LOCATION */}

              <button
                type="button"
                onClick={handleUpdateLocation}
                disabled={updatingLocation}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-blue-500
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-blue-600
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  transition
                  shadow-sm
                "
              >

                {updatingLocation ? (
                  <>
                    <RefreshCw
                      size={18}
                      className="animate-spin"
                    />

                    Updating...
                  </>
                ) : (
                  <>
                    <LocateFixed size={18} />

                    Update My Location
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

        {/* =================================================
            LOCATION INFO
        ================================================= */}

        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4">

          <div className="flex items-start gap-3">

            <div className="w-10 h-10 rounded-xl bg-white text-blue-500 flex items-center justify-center shrink-0">
              <Navigation size={20} />
            </div>

            <div className="flex-1">

              <p className="text-sm font-semibold text-gray-800">
                Keep your location updated
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Tap "Update My Location" to send your
                current GPS location to the server.
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            ORDER COUNT
        ================================================= */}

        <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
            <Package size={21} />
          </div>

          <div>

            <p className="text-xs text-gray-500">
              Out For Delivery
            </p>

            <p className="text-xl font-bold text-gray-800">
              {myOrders.length}
            </p>

          </div>

        </div>

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {myOrders.length === 0 ? (

          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm px-6 py-16 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center">

              <Package
                size={30}
                className="text-gray-400"
              />

            </div>

            <h2 className="mt-5 text-lg font-bold text-gray-700">
              No Orders For Delivery
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              You currently don't have any order out
              for delivery.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/delivery-boy/dashboard"
                )
              }
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-pink-500
                text-white
                text-sm
                font-semibold
                hover:bg-pink-600
                transition
              "
            >
              <ArrowLeft size={17} />

              Back to Dashboard
            </button>

          </div>

        ) : (

          /* =================================================
             ORDERS
          ================================================= */

          <div className="space-y-5">

            {myOrders.map((order) => {

              const address =
                order.address;

              const latitude =
                address?.location?.latitude;

              const longitude =
                address?.location?.longitude;

              return (
                <div
                  key={order._id}
                  className="
                    bg-white
                    border
                    border-gray-100
                    rounded-3xl
                    shadow-sm
                    hover:shadow-md
                    transition
                    overflow-hidden
                  "
                >

                  {/* =================================================
                      ORDER HEADER
                  ================================================= */}

                  <div className="px-5 sm:px-6 py-5 border-b border-gray-100">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                          <Bike size={23} />
                        </div>

                        <div>

                          <p className="text-xs text-gray-400">
                            Order ID
                          </p>

                          <h2 className="text-lg font-bold text-gray-800">
                            {formatOrderId(
                              order._id
                            )}
                          </h2>

                        </div>

                      </div>

                      {/* STATUS */}

                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">

                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />

                        Out Of Delivery

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      ORDER BODY
                  ================================================= */}

                  <div className="p-5 sm:p-6">

                    {/* =================================================
                        BASIC INFO
                    ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                      {/* CUSTOMER */}

                      <div className="rounded-2xl bg-gray-50 p-4">

                        <div className="flex items-center gap-2 text-gray-500">

                          <User size={17} />

                          <span className="text-xs font-medium">
                            Customer
                          </span>

                        </div>

                        <p className="mt-2 font-semibold text-gray-800">
                          {order.user?.name ||
                            address?.fullName ||
                            "Customer"}
                        </p>

                        {address?.phone && (
                          <div className="flex items-center gap-2 mt-2">

                            <Phone
                              size={14}
                              className="text-gray-400"
                            />

                            <p className="text-xs text-gray-500">
                              {address.phone}
                            </p>

                          </div>
                        )}

                      </div>

                      {/* AMOUNT */}

                      <div className="rounded-2xl bg-gray-50 p-4">

                        <div className="flex items-center gap-2 text-gray-500">

                          <Package size={17} />

                          <span className="text-xs font-medium">
                            Order Amount
                          </span>

                        </div>

                        <p className="mt-2 font-semibold text-gray-800">
                          ₹
                          {order.totalAmount ??
                            order.paidAmount ??
                            0}
                        </p>

                      </div>

                      {/* DELIVERY TYPE */}

                      <div className="rounded-2xl bg-gray-50 p-4">

                        <div className="flex items-center gap-2 text-gray-500">

                          <Bike size={17} />

                          <span className="text-xs font-medium">
                            Delivery Type
                          </span>

                        </div>

                        <p className="mt-2 font-semibold text-gray-800 capitalize">
                          {order.deliveryType ||
                            "Standard"}
                        </p>

                      </div>

                    </div>

                    {/* =================================================
                        CUSTOMER DELIVERY ADDRESS
                    ================================================= */}

                    {address && (

                      <div className="mt-5 rounded-2xl bg-blue-50 border border-blue-100 p-5">

                        <div className="flex items-start gap-3">

                          <div className="w-10 h-10 rounded-xl bg-white text-blue-500 flex items-center justify-center shrink-0">

                            <MapPin size={20} />

                          </div>

                          <div className="flex-1 min-w-0">

                            <p className="text-xs font-semibold text-blue-600">
                              Delivery Address
                            </p>

                            <p className="text-sm font-semibold text-gray-800 mt-1 leading-6">

                              {address.fullAddress ||
                                address.address ||
                                address.street ||
                                [
                                  address.houseNumber,
                                  address.area,
                                  address.city,
                                  address.state,
                                  address.pincode,
                                ]
                                  .filter(Boolean)
                                  .join(", ") ||
                                "Address not available"}

                            </p>

                            {address.landmark && (
                              <p className="text-xs text-gray-500 mt-2">

                                Landmark:{" "}
                                {address.landmark}

                              </p>
                            )}

                          </div>

                        </div>

                        {/* GOOGLE MAP */}

                        {latitude != null &&
                          longitude != null && (

                            <button
                              type="button"
                              onClick={() =>
                                window.open(
                                  `https://www.google.com/maps?q=${latitude},${longitude}`,
                                  "_blank"
                                )
                              }
                              className="
                                mt-4
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2.5
                                bg-blue-600
                                text-white
                                rounded-xl
                                text-sm
                                font-semibold
                                hover:bg-blue-700
                                transition
                              "
                            >

                              <Navigation
                                size={17}
                              />

                              Open in Google Maps

                            </button>

                          )}

                      </div>

                    )}

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">

                      {/* VIEW ORDER */}

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/delivery-boy/order/${order._id}`
                          )
                        }
                        className="
                          px-5
                          py-3
                          rounded-xl
                          border
                          border-gray-200
                          text-gray-700
                          font-semibold
                          text-sm
                          hover:bg-gray-50
                          transition
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        <Package size={18} />

                        View Order

                      </button>

                      {/* UPDATE MY LOCATION */}

                      <button
                        type="button"
                        onClick={
                          handleUpdateLocation
                        }
                        disabled={
                          updatingLocation
                        }
                        className="
                          px-5
                          py-3
                          rounded-xl
                          bg-blue-500
                          text-white
                          font-semibold
                          text-sm
                          hover:bg-blue-600
                          disabled:opacity-60
                          disabled:cursor-not-allowed
                          transition
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        {updatingLocation ? (
                          <>
                            <RefreshCw
                              size={18}
                              className="animate-spin"
                            />

                            Updating...
                          </>
                        ) : (
                          <>
                            <LocateFixed
                              size={18}
                            />

                            Update My Location
                          </>
                        )}

                      </button>

                      {/* MARK DELIVERED */}

                      <button
                        type="button"
                        onClick={() =>
                          handleMarkDelivered(
                            order._id
                          )
                        }
                        className="
                          px-5
                          py-3
                          rounded-xl
                          bg-green-500
                          text-white
                          font-semibold
                          text-sm
                          hover:bg-green-600
                          transition
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        <CheckCircle
                          size={18}
                        />

                        Mark as Delivered

                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

    </div>
  );
};
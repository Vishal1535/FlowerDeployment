import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Bike,
  MapPin,
  ShieldCheck,
  CircleCheck,
  Navigation,
  Car,
} from "lucide-react";

import { getMyDeliveryBoyProfileThunk } from "../../../Store/DeliveryBoy/DeliveryBoyApi";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    profile,
    loading,
    error,
  } = useSelector((state) => state.DeliveryBoy || {});

  // =====================================================
  // ADDRESS STATE
  // =====================================================

  const [address, setAddress] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);

  // =====================================================
  // GET PROFILE
  // =====================================================

  useEffect(() => {
    dispatch(getMyDeliveryBoyProfileThunk());
  }, [dispatch]);

  // =====================================================
  // PROFILE LOCATION
  // =====================================================

  const latitude =
    profile?.currentLocation?.latitude;

  const longitude =
    profile?.currentLocation?.longitude;

  // =====================================================
  // GET ADDRESS FROM LATITUDE / LONGITUDE
  // =====================================================

  useEffect(() => {
    const getAddress = async () => {
      if (!latitude || !longitude) {
        setAddress("");
        return;
      }

      try {
        setAddressLoading(true);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = await response.json();

        if (data?.display_name) {
          setAddress(data.display_name);
        } else {
          setAddress("Address not available");
        }
      } catch (error) {
        console.error(
          "Reverse Geocoding Error:",
          error
        );

        setAddress("Unable to fetch address");
      } finally {
        setAddressLoading(false);
      }
    };

    getAddress();
  }, [latitude, longitude]);

  console.log(profile);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading && !profile) {
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
            Loading profile...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // ERROR / PROFILE NOT FOUND
  // =====================================================

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 flex items-center justify-center px-4">

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 max-w-md w-full text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center">

            <User
              size={30}
              className="text-red-400"
            />

          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-5">
            Profile not found
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {error || "Unable to load your profile."}
          </p>

          <button
            onClick={() =>
              navigate("/delivery-boy/dashboard")
            }
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700 transition"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // PROFILE DATA
  // =====================================================

  const name =
    profile.name ||
    profile.user?.name ||
    "Delivery Boy";

  const phone =
    profile.phone ||
    profile.user?.phone ||
    "Not available";

  const email =
    profile.email ||
    profile.user?.email ||
    "Not available";

  const vehicleType =
    profile.vehicleType ||
    "Not available";

  const vehicleNumber =
    profile.vehicleNumber ||
    "Not available";

  // =====================================================
  // OPEN GOOGLE MAPS
  // =====================================================

  const openGoogleMaps = () => {
    if (!latitude || !longitude) return;

    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank"
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 px-4 sm:px-6 lg:px-8 py-6">

      <div className="max-w-5xl mx-auto space-y-6">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            navigate("/delivery-boy/dashboard")
          }
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

          Back to Dashboard
        </button>

        {/* =================================================
            PROFILE HEADER
        ================================================= */}

        <div className="relative overflow-hidden bg-white border border-pink-100 rounded-3xl shadow-sm">

          <div className="absolute -right-10 -top-10 w-44 h-44 bg-pink-100/60 rounded-full blur-2xl" />

          <div className="absolute right-28 bottom-0 w-32 h-32 bg-rose-100/50 rounded-full blur-2xl" />

          <div className="relative p-6 sm:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              {/* PROFILE ICON */}

              <div className="w-20 h-20 rounded-3xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">

                <User size={38} />

              </div>

              {/* NAME */}

              <div className="flex-1">

                <p className="text-sm font-medium text-pink-500">
                  Delivery Boy Profile
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
                  {name}
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Manage and view your delivery information.
                </p>

              </div>

              {/* STATUS */}

              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3">

                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">

                  <CircleCheck
                    size={22}
                    className="text-green-500"
                  />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Account Status
                  </p>

                  <p className="text-sm font-bold text-green-600">
                    Active
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-100">

            <h2 className="text-lg font-bold text-gray-800">
              Personal Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your basic account information
            </p>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* NAME */}

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-white text-pink-500 flex items-center justify-center">

                  <User size={20} />

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Full Name
                  </p>

                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {name}
                  </p>

                </div>

              </div>

            </div>

            {/* PHONE */}

            <div className="p-4 rounded-2xl bg-green-50 border border-green-100">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-white text-green-500 flex items-center justify-center">

                  <Phone size={20} />

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Phone Number
                  </p>

                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {phone}
                  </p>

                </div>

              </div>

            </div>

            {/* EMAIL */}

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-white text-blue-500 flex items-center justify-center">

                  <Mail size={20} />

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Email Address
                  </p>

                  <p className="text-sm font-semibold text-gray-800 mt-1 break-all">
                    {email}
                  </p>

                </div>

              </div>

            </div>

            {/* ROLE */}

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-white text-purple-500 flex items-center justify-center">

                  <ShieldCheck size={20} />

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Account Role
                  </p>

                  <p className="text-sm font-semibold text-gray-800 mt-1 capitalize">
                    {profile.user?.role ||
                      profile.role ||
                      "Delivery Boy"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            VEHICLE INFORMATION
        ================================================= */}

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-100">

            <h2 className="text-lg font-bold text-gray-800">
              Vehicle Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your registered delivery vehicle
            </p>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* VEHICLE TYPE */}

            <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-white text-orange-500 flex items-center justify-center">

                  <Bike size={23} />

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Vehicle Type
                  </p>

                  <p className="text-base font-bold text-gray-800 mt-1 capitalize">
                    {vehicleType}
                  </p>

                </div>

              </div>

            </div>

            {/* VEHICLE NUMBER */}

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-white text-gray-500 flex items-center justify-center">

                  <Car size={23} />

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Vehicle Number
                  </p>

                  <p className="text-base font-bold text-gray-800 mt-1 uppercase">
                    {vehicleNumber}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            CURRENT LOCATION
        ================================================= */}

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-100">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h2 className="text-lg font-bold text-gray-800">
                  Current Location
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Your latest delivery location
                </p>

              </div>

              <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">

                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />

                Location Active

              </div>

            </div>

          </div>

          <div className="p-6">

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-xl bg-white text-blue-500 flex items-center justify-center shrink-0">

                  <MapPin size={23} />

                </div>

                <div className="flex-1 min-w-0">

                  <p className="text-sm font-semibold text-gray-800">
                    Delivery Address
                  </p>

                  {/* ADDRESS */}

                  <div className="mt-3 bg-white rounded-xl p-4">

                    {addressLoading ? (

                      <p className="text-sm text-gray-500">
                        Fetching your current address...
                      </p>

                    ) : address ? (

                      <p className="text-sm font-semibold text-gray-800 leading-6">
                        {address}
                      </p>

                    ) : (

                      <p className="text-sm text-gray-400">
                        Address not available
                      </p>

                    )}

                  </div>

                  {/* GOOGLE MAP */}

                  {latitude && longitude && (

                    <button
                      type="button"
                      onClick={openGoogleMaps}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
                    >

                      <Navigation size={17} />

                      Open in Google Maps

                    </button>

                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

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
                Keep your profile information updated.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/delivery-boy/dashboard")
            }
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 text-white text-sm font-semibold hover:bg-pink-700 transition"
          >

            <ArrowLeft size={17} />

            Dashboard

          </button>

        </div>

      </div>

    </div>
  );
};
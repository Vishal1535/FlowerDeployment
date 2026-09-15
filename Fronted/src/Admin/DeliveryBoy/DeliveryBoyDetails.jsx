
import React, { useEffect } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Bike,
  Hash,
  CheckCircle,
  XCircle,
  Package,
  CircleCheck,
  CircleX,
  ClipboardList,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getSingleDeliveryBoyThunk } from "../../Store/Admin/DeliveryBoy/DeliveryApi";

export const DeliveryBoyDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    selectedDeliveryBoy,
    loading,
    error,
  } = useSelector(
    (state) => state.DeliveryBoyManagement
  );

  // =====================================================
  // GET DELIVERY BOY
  // =====================================================

  useEffect(() => {
    if (id) {
      dispatch(getSingleDeliveryBoyThunk(id));
    }
  }, [id, dispatch]);

  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    navigate("/admin/delivery-boys");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading && !selectedDeliveryBoy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50/60 via-white to-rose-50/40 px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-8">
            <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
              <span className="loading loading-spinner loading-lg text-pink-500"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !selectedDeliveryBoy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50/60 via-white to-rose-50/40 px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-red-100 shadow-sm p-5 sm:p-8 text-center">

            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-xl sm:rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
              <XCircle size={26} className="sm:w-[30px] sm:h-[30px]" />
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-4">
              Unable to load delivery boy
            </h2>

            <p className="text-sm text-red-500 mt-2 break-words">
              {error}
            </p>

            <button
              type="button"
              onClick={handleBack}
              className="
                mt-5
                sm:mt-6
                w-full
                sm:w-auto
                inline-flex
                items-center
                justify-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-pink-500
                hover:bg-pink-600
                text-white
                font-semibold
                transition
              "
            >
              <ArrowLeft size={18} />
              Back to Delivery Boys
            </button>

          </div>
        </div>
      </div>
    );
  }

  if (!selectedDeliveryBoy) {
    return null;
  }

  // =====================================================
  // DATA
  // =====================================================

  const {
    name,
    phone,
    vehicleType,
    vehicleNumber,
    isAvailable,
    totalDeliveries = 0,
    completedDeliveries = 0,
    cancelledDeliveries = 0,
    user,
  } = selectedDeliveryBoy;

  const email =
    user?.email ||
    selectedDeliveryBoy?.email ||
    "No email available";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/60 via-white to-rose-50/40 px-3 sm:px-6 lg:px-8 py-4 sm:py-6">

      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">

        {/* =====================================================
            TOP HEADER
        ===================================================== */}

        <div className="flex items-center gap-2.5 sm:gap-3">

          <button
            type="button"
            onClick={handleBack}
            className="
              w-10
              h-10
              sm:w-11
              sm:h-11
              shrink-0
              rounded-lg
              sm:rounded-xl
              bg-white
              border
              border-gray-200
              text-gray-600
              flex
              items-center
              justify-center
              hover:bg-pink-50
              hover:text-pink-600
              hover:border-pink-200
              transition
              shadow-sm
            "
          >
            <ArrowLeft size={19} className="sm:w-[21px] sm:h-[21px]" />
          </button>

          <div className="min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
              Delivery Boy Details
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              View complete delivery boy information
            </p>
          </div>

        </div>

        {/* =====================================================
            PROFILE CARD
        ===================================================== */}

        <div
          className="
            bg-white
            rounded-2xl
            sm:rounded-3xl
            border
            border-pink-100
            shadow-sm
            overflow-hidden
          "
        >

          {/* Pink Header */}

          <div className="h-20 sm:h-36 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-50"></div>

          <div className="px-4 sm:px-8 pb-5 sm:pb-7">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10 sm:-mt-12">

              {/* Profile */}

              <div className="flex items-end gap-3 sm:gap-4 min-w-0">

                <div
                  className="
                    w-20
                    h-20
                    sm:w-24
                    sm:h-24
                    shrink-0
                    rounded-2xl
                    sm:rounded-3xl
                    bg-white
                    border-4
                    border-white
                    shadow-md
                    flex
                    items-center
                    justify-center
                    text-pink-500
                  "
                >
                  <div className="w-full h-full rounded-xl sm:rounded-2xl bg-pink-50 flex items-center justify-center">
                    <User size={34} className="sm:w-[42px] sm:h-[42px]" />
                  </div>
                </div>

                <div className="pb-1 min-w-0">

                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 capitalize truncate">
                    {name || "Unknown"}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Delivery Boy
                  </p>

                </div>

              </div>

              {/* Status */}

              <div
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  sm:gap-2
                  px-3
                  sm:px-4
                  py-2
                  rounded-full
                  text-xs
                  sm:text-sm
                  font-semibold
                  self-start
                  sm:self-auto
                  max-w-full
                  ${
                    isAvailable
                      ? "bg-green-50 text-green-600 border border-green-100"
                      : "bg-red-50 text-red-500 border border-red-100"
                  }
                `}
              >

                {isAvailable ? (
                  <CheckCircle size={15} className="sm:w-[17px] sm:h-[17px] shrink-0" />
                ) : (
                  <XCircle size={15} className="sm:w-[17px] sm:h-[17px] shrink-0" />
                )}

                <span className="truncate">
                  {isAvailable
                    ? "Currently Available"
                    : "Currently Unavailable"}
                </span>

              </div>

            </div>

          </div>
        </div>

        {/* =====================================================
            INFORMATION + VEHICLE
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

          {/* CONTACT INFORMATION */}

          <div
            className="
              bg-white
              rounded-2xl
              sm:rounded-3xl
              border
              border-gray-100
              shadow-sm
              p-4
              sm:p-6
            "
          >

            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">

              <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
                <User size={18} className="sm:w-5 sm:h-5" />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-gray-800">
                  Contact Information
                </h3>

                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  Personal contact details
                </p>
              </div>

            </div>

            <div className="space-y-3 sm:space-y-4">

              {/* EMAIL */}

              <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100">

                <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-500">
                  <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] sm:text-xs text-gray-400">
                    Email Address
                  </p>

                  <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                    {email}
                  </p>
                </div>

              </div>

              {/* PHONE */}

              <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100">

                <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-500">
                  <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs text-gray-400">
                    Phone Number
                  </p>

                  <p className="text-xs sm:text-sm font-medium text-gray-700 break-all">
                    {phone || "-"}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* VEHICLE INFORMATION */}

          <div
            className="
              bg-white
              rounded-2xl
              sm:rounded-3xl
              border
              border-gray-100
              shadow-sm
              p-4
              sm:p-6
            "
          >

            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">

              <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
                <Bike size={18} className="sm:w-5 sm:h-5" />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-gray-800">
                  Vehicle Information
                </h3>

                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  Delivery vehicle details
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              {/* VEHICLE TYPE */}

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100">

                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Bike size={15} className="sm:w-4 sm:h-4" />
                  <span className="text-[11px] sm:text-xs">
                    Vehicle Type
                  </span>
                </div>

                <p className="text-sm sm:text-base font-bold text-gray-800 capitalize truncate">
                  {vehicleType || "-"}
                </p>

              </div>

              {/* VEHICLE NUMBER */}

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100">

                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Hash size={15} className="sm:w-4 sm:h-4" />
                  <span className="text-[11px] sm:text-xs">
                    Vehicle Number
                  </span>
                </div>

                <p className="text-sm sm:text-base font-bold text-gray-800 uppercase break-all">
                  {vehicleNumber || "Not provided"}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            DELIVERY STATISTICS
        ===================================================== */}

        <div
          className="
            bg-white
            rounded-2xl
            sm:rounded-3xl
            border
            border-gray-100
            shadow-sm
            p-4
            sm:p-6
          "
        >

          <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">

            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
              <ClipboardList size={18} className="sm:w-5 sm:h-5" />
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-gray-800">
                Delivery Statistics
              </h3>

              <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                Delivery performance overview
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">

            {/* TOTAL */}

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-blue-50 border border-blue-100">

              <div className="flex items-center justify-between gap-3">

                <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-white text-blue-500 flex items-center justify-center shadow-sm">
                  <Package size={18} className="sm:w-5 sm:h-5" />
                </div>

                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  {totalDeliveries}
                </span>

              </div>

              <p className="text-xs sm:text-sm font-medium text-gray-600 mt-3 sm:mt-4">
                Total Deliveries
              </p>

            </div>

            {/* COMPLETED */}

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-green-50 border border-green-100">

              <div className="flex items-center justify-between gap-3">

                <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-white text-green-500 flex items-center justify-center shadow-sm">
                  <CircleCheck size={18} className="sm:w-5 sm:h-5" />
                </div>

                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  {completedDeliveries}
                </span>

              </div>

              <p className="text-xs sm:text-sm font-medium text-gray-600 mt-3 sm:mt-4">
                Completed Deliveries
              </p>

            </div>

            {/* CANCELLED */}

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-red-50 border border-red-100">

              <div className="flex items-center justify-between gap-3">

                <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-white text-red-500 flex items-center justify-center shadow-sm">
                  <CircleX size={18} className="sm:w-5 sm:h-5" />
                </div>

                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  {cancelledDeliveries}
                </span>

              </div>

              <p className="text-xs sm:text-sm font-medium text-gray-600 mt-3 sm:mt-4">
                Cancelled Deliveries
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};


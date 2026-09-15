import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  MoreVertical,
  User,
  Mail,
  Phone,
  Bike,
  Pencil,
  Trash2,
  Eye,
  ClipboardList,
  CheckCircle,
  XCircle,
  ChevronUp,
} from "lucide-react";

import {
  openDeleteDeliveryPopup,
  openEditDeliveryPopup,
} from "../../../Store/Admin/DeliveryBoy/DeliverySlice";

import { getSingleDeliveryBoyThunk } from "../../../Store/Admin/DeliveryBoy/DeliveryApi";

export const DeliveryBoyListItem = ({ deliveryBoy }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);

  // =====================================================
  // CLOSE OPTIONS WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".delivery-boy-item")) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (!deliveryBoy) {
    return null;
  }

  // =====================================================
  // DATA
  // =====================================================

  const {
    _id,
    name,
    phone,
    vehicleType,
    vehicleNumber,
    isAvailable,
    totalDeliveries = 0,
    completedDeliveries = 0,
    cancelledDeliveries = 0,
    user,
  } = deliveryBoy;

  const email = user?.email || "No email available";

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = async () => {
    setShowOptions(false);

    await dispatch(getSingleDeliveryBoyThunk(_id));

    dispatch(openEditDeliveryPopup());
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = () => {
    setShowOptions(false);

    dispatch(openDeleteDeliveryPopup(_id));
  };

  // =====================================================
  // VIEW
  // =====================================================

  const handleView = async () => {
    setShowOptions(false);

    await dispatch(getSingleDeliveryBoyThunk(_id));

    navigate(`/admin/delivery-boys/${_id}`);
  };

  // =====================================================
  // ASSIGN ORDER
  // =====================================================

  const handleAssignOrder = () => {
    setShowOptions(false);

    navigate(`/admin/delivery-boys/${_id}/assign-order`);
  };

  return (
    <div
      className="
        delivery-boy-item
        bg-white
        border
        border-gray-200
        rounded-2xl
        shadow-sm
        hover:shadow-md
        hover:border-pink-200
        transition-all
        duration-200
        overflow-visible
      "
    >
      {/* =====================================================
          MAIN DELIVERY BOY ROW
      ===================================================== */}

      <div className="p-3.5 sm:p-5">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          {/* =================================================
              PROFILE
          ================================================= */}

          <div
            className="
              w-11
              h-11
              sm:w-14
              sm:h-14
              shrink-0
              rounded-2xl
              bg-pink-50
              border
              border-pink-100
              text-pink-500
              flex
              items-center
              justify-center
            "
          >
            <User size={23} className="sm:w-[25px] sm:h-[25px]" />
          </div>

          {/* =================================================
              NAME + EMAIL
          ================================================= */}

          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 flex-wrap">
              <h3
                className="
                  text-base
                  sm:text-lg
                  font-semibold
                  text-gray-800
                  capitalize
                  max-w-full
                  sm:max-w-none
                  truncate
                "
              >
                {name || "Unknown"}
              </h3>

              {/* STATUS */}

              <span
                className={`
                  inline-flex
                  items-center
                  gap-1
                  px-2
                  sm:px-2.5
                  py-1
                  rounded-full
                  text-[10px]
                  sm:text-[11px]
                  font-semibold
                  whitespace-nowrap
                  ${
                    isAvailable
                      ? "bg-green-50 text-green-600 border border-green-100"
                      : "bg-red-50 text-red-500 border border-red-100"
                  }
                `}
              >
                {isAvailable ? (
                  <CheckCircle size={11} className="sm:w-3 sm:h-3" />
                ) : (
                  <XCircle size={11} className="sm:w-3 sm:h-3" />
                )}

                {isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* EMAIL */}

            <div
              className="
                flex
                items-center
                gap-1.5
                mt-1
                text-xs
                sm:text-sm
                text-gray-500
                min-w-0
              "
            >
              <Mail size={14} className="shrink-0" />

              <span className="truncate">{email}</span>
            </div>
          </div>

          {/* =================================================
              PHONE
          ================================================= */}

          <div className="hidden lg:block min-w-[145px]">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
              Phone
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone size={15} className="text-gray-400" />

              <span>{phone || "-"}</span>
            </div>
          </div>

          {/* =================================================
              VEHICLE
          ================================================= */}

          <div className="hidden lg:block min-w-[125px]">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
              Vehicle
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Bike size={15} className="text-gray-400" />

              <span className="capitalize">{vehicleType || "-"}</span>
            </div>

            {vehicleNumber && (
              <p className="text-[11px] text-gray-400 mt-0.5">
                {vehicleNumber}
              </p>
            )}
          </div>

          {/* =================================================
              DELIVERIES
          ================================================= */}

          <div className="hidden lg:block min-w-[110px]">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
              Deliveries
            </p>

            <p className="text-sm font-semibold text-gray-800">
              {completedDeliveries}

              <span className="font-normal text-gray-400 ml-1">completed</span>
            </p>
          </div>

          {/* =================================================
              THREE DOT BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => setShowOptions((prev) => !prev)}
            className={`
              w-9
              h-9
              sm:w-10
              sm:h-10
              shrink-0
              rounded-xl
              border
              flex
              items-center
              justify-center
              transition-all
              ${
                showOptions
                  ? "bg-pink-500 text-white border-pink-500 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200"
              }
            `}
            aria-label="Delivery boy options"
          >
            {showOptions ? (
              <ChevronUp size={19} className="sm:w-5 sm:h-5" />
            ) : (
              <MoreVertical size={19} className="sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        {/* =====================================================
            MOBILE DETAILS
        ===================================================== */}

        <div
          className="
            lg:hidden
            mt-3.5
            sm:mt-4
            pt-3.5
            sm:pt-4
            border-t
            border-gray-100
            grid
            grid-cols-1
            min-[400px]:grid-cols-2
            sm:grid-cols-3
            gap-2.5
            sm:gap-3
          "
        >
          {/* PHONE */}

          <div
            className="
              bg-gray-50
              border
              border-gray-100
              rounded-xl
              p-2.5
              sm:p-3
              min-w-0
            "
          >
            <p className="text-[10px] uppercase text-gray-400 mb-1">Phone</p>

            <div className="flex items-center gap-1.5 text-sm text-gray-700 min-w-0">
              <Phone size={14} className="text-gray-400 shrink-0" />

              <span className="truncate">{phone || "-"}</span>
            </div>
          </div>

          {/* VEHICLE */}

          <div
            className="
              bg-gray-50
              border
              border-gray-100
              rounded-xl
              p-2.5
              sm:p-3
              min-w-0
            "
          >
            <p className="text-[10px] uppercase text-gray-400 mb-1">Vehicle</p>

            <div className="flex items-center gap-1.5 text-sm text-gray-700 min-w-0">
              <Bike size={14} className="text-gray-400 shrink-0" />

              <span className="capitalize truncate">{vehicleType || "-"}</span>
            </div>
          </div>

          {/* COMPLETED */}

          <div
            className="
              bg-gray-50
              border
              border-gray-100
              rounded-xl
              p-2.5
              sm:p-3
              min-w-0
              min-[400px]:col-span-2
              sm:col-span-1
            "
          >
            <p className="text-[10px] uppercase text-gray-400 mb-1">
              Completed
            </p>

            <p className="text-sm font-semibold text-gray-800">
              {completedDeliveries}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          EXPANDABLE ACTION BAR
      ===================================================== */}

      {showOptions && (
        <div
          className="
            border-t
            border-gray-100
            bg-gray-50/80
            px-3.5
            sm:px-5
            py-3
            rounded-b-2xl
          "
        >
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
            {/* =================================================
                VIEW
            ================================================= */}

            <button
              type="button"
              onClick={handleView}
              className="
                w-full
                sm:w-auto
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-white
                border
                border-gray-200
                text-gray-700
                text-sm
                font-medium
                hover:bg-gray-100
                hover:border-gray-300
                transition
              "
            >
              <Eye size={16} className="text-gray-500" />
              View
            </button>

            {/* =================================================
                EDIT
            ================================================= */}

            <button
              type="button"
              onClick={handleEdit}
              className="
                w-full
                sm:w-auto
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-white
                border
                border-pink-100
                text-pink-600
                text-sm
                font-medium
                hover:bg-pink-50
                transition
              "
            >
              <Pencil size={16} />
              Edit
            </button>

            {/* =================================================
                ASSIGN ORDER
            ================================================= */}

            <button
              type="button"
              onClick={handleAssignOrder}
              className="
                w-full
                sm:w-auto
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-white
                border
                border-blue-100
                text-blue-600
                text-sm
                font-medium
                hover:bg-blue-50
                transition
              "
            >
              <ClipboardList size={16} />
              Assign Order
            </button>

            {/* =================================================
                DELETE
            ================================================= */}

            <button
              type="button"
              onClick={handleDelete}
              className="
                w-full
                sm:w-auto
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-white
                border
                border-red-100
                text-red-500
                text-sm
                font-medium
                hover:bg-red-50
                transition
              "
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          BOTTOM SUMMARY
      ===================================================== */}

      <div
        className="
          px-3.5
          sm:px-5
          py-2.5
          bg-gray-50
          border-t
          border-gray-100
          rounded-b-2xl
          text-xs
          text-gray-500
          flex
          flex-wrap
          items-center
          gap-x-2
          gap-y-1
        "
      >
        <span>Total deliveries:</span>

        <span className="font-semibold text-gray-700">{totalDeliveries}</span>

        <span className="text-gray-300">•</span>

        <span>Cancelled:</span>

        <span className="font-semibold text-gray-700">
          {cancelledDeliveries}
        </span>
      </div>
    </div>
  );
};

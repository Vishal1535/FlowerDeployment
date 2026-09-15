
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Bike,
  Plus,
  Users,
  UserPlus,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

import { DeliveryBoyList } from "./DeliveryBoyList/DeliveryBoyList";
import { CreateDeliveryBoy } from "./CreateDeliveryBoy";
import { EditDeliveryBoy } from "./EditDeliveryBoy";
import { DeleteDeliveryBoy } from "./DeleteDeliveryBoy";

import { openCreateDeliveryPopup } from "../../Store/Admin/DeliveryBoy/DeliverySlice";

export const DeliveryBoy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =====================================================
  // GO BACK
  // =====================================================

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-3 sm:px-6 lg:px-8 py-4 sm:py-6">

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* =====================================================
            TOP NAVIGATION
        ===================================================== */}

        <div className="flex items-center gap-2.5 sm:gap-3">

          <button
            type="button"
            onClick={handleBack}
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
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
              transition-all
              shadow-sm
            "
            aria-label="Go back"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          </button>

          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs font-medium text-gray-400">
              Admin Panel
            </p>

            <p className="text-xs sm:text-sm font-semibold text-gray-700 truncate">
              Delivery Management
            </p>
          </div>

        </div>

        {/* =====================================================
            HERO HEADER
        ===================================================== */}

        <div
          className="
            relative
            overflow-hidden
            bg-white
            rounded-2xl
            sm:rounded-3xl
            border
            border-pink-100
            shadow-sm
          "
        >

          {/* Decorative background */}

          <div
            className="
              absolute
              -top-16
              -right-16
              sm:-top-20
              sm:-right-20
              w-40
              h-40
              sm:w-56
              sm:h-56
              rounded-full
              bg-pink-50
              opacity-70
            "
          />

          <div
            className="
              absolute
              -bottom-16
              -left-14
              sm:-bottom-24
              sm:-left-20
              w-36
              h-36
              sm:w-48
              sm:h-48
              rounded-full
              bg-rose-50
              opacity-70
            "
          />

          <div className="relative p-4 sm:p-7 lg:p-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6">

              {/* =================================================
                  LEFT
              ================================================= */}

              <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">

                <div
                  className="
                    w-12
                    h-12
                    sm:w-16
                    sm:h-16
                    rounded-xl
                    sm:rounded-2xl
                    bg-gradient-to-br
                    from-pink-100
                    to-rose-100
                    text-pink-600
                    flex
                    items-center
                    justify-center
                    shrink-0
                    shadow-sm
                  "
                >
                  <Bike
                    size={24}
                    className="sm:w-[30px] sm:h-[30px]"
                  />
                </div>

                <div className="min-w-0">

                  <div className="flex items-center gap-2 flex-wrap">

                    <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
                      Delivery Team
                    </h1>

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        sm:gap-1.5
                        px-2
                        sm:px-2.5
                        py-1
                        rounded-full
                        bg-green-50
                        text-green-600
                        border
                        border-green-100
                        text-[10px]
                        sm:text-xs
                        font-semibold
                      "
                    >
                      <ShieldCheck
                        size={12}
                        className="sm:w-[13px] sm:h-[13px]"
                      />
                      Management
                    </span>

                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-5">
                    Manage delivery partners, availability and orders.
                  </p>

                </div>

              </div>

              {/* =================================================
                  ADD BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={() =>
                  dispatch(openCreateDeliveryPopup())
                }
                className="
                  w-full
                  lg:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  sm:px-5
                  py-2.5
                  sm:py-3
                  rounded-xl
                  sm:rounded-2xl
                  bg-pink-500
                  hover:bg-pink-600
                  active:scale-[0.98]
                  text-white
                  text-sm
                  sm:text-base
                  font-semibold
                  shadow-md
                  shadow-pink-100
                  transition-all
                  cursor-pointer
                "
              >
                <Plus size={18} className="sm:w-[19px] sm:h-[19px]" />
                Add Delivery Boy
              </button>

            </div>

            {/* =================================================
                INFO CARDS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-2.5
                sm:gap-3
                mt-5
                sm:mt-7
                pt-5
                sm:pt-6
                border-t
                border-gray-100
              "
            >

              {/* TEAM */}

              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  p-3
                  sm:p-3.5
                  rounded-xl
                  sm:rounded-2xl
                  bg-pink-50/70
                  border
                  border-pink-100
                "
              >

                <div
                  className="
                    w-9
                    h-9
                    sm:w-10
                    sm:h-10
                    shrink-0
                    rounded-lg
                    sm:rounded-xl
                    bg-white
                    text-pink-500
                    flex
                    items-center
                    justify-center
                    shadow-sm
                  "
                >
                  <Users size={17} className="sm:w-[19px] sm:h-[19px]" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-700">
                    Delivery Team
                  </p>

                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 leading-4">
                    Manage all delivery partners
                  </p>
                </div>

              </div>

              {/* ORDERS */}

              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  p-3
                  sm:p-3.5
                  rounded-xl
                  sm:rounded-2xl
                  bg-blue-50/70
                  border
                  border-blue-100
                "
              >

                <div
                  className="
                    w-9
                    h-9
                    sm:w-10
                    sm:h-10
                    shrink-0
                    rounded-lg
                    sm:rounded-xl
                    bg-white
                    text-blue-500
                    flex
                    items-center
                    justify-center
                    shadow-sm
                  "
                >
                  <ClipboardList
                    size={17}
                    className="sm:w-[19px] sm:h-[19px]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-700">
                    Order Assignment
                  </p>

                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 leading-4">
                    Assign orders to delivery boys
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            DELIVERY LIST
        ===================================================== */}

        <div
          className="
            bg-white
            rounded-2xl
            sm:rounded-3xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          "
        >

          {/* LIST HEADER */}

          <div
            className="
              px-4
              sm:px-7
              py-4
              sm:py-5
              border-b
              border-gray-100
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
            "
          >

            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">

              <div
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  shrink-0
                  rounded-lg
                  sm:rounded-xl
                  bg-pink-50
                  text-pink-500
                  flex
                  items-center
                  justify-center
                "
              >
                <UserPlus size={17} className="sm:w-[19px] sm:h-[19px]" />
              </div>

              <div className="min-w-0">

                <h2 className="text-base sm:text-lg font-bold text-gray-800">
                  Delivery Partners
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-5">
                  View and manage your delivery team
                </p>

              </div>

            </div>

            <div
              className="
                hidden
                sm:flex
                items-center
                gap-2
                px-3
                py-2
                rounded-xl
                bg-gray-50
                border
                border-gray-100
                text-xs
                text-gray-500
              "
            >
              <Bike size={14} />
              Delivery Management
            </div>

          </div>

          {/* LIST */}

          <div className="p-3 sm:p-7">
            <DeliveryBoyList />
          </div>

        </div>

      </div>

      {/* =====================================================
          POPUPS
      ===================================================== */}

      <CreateDeliveryBoy />

      <EditDeliveryBoy />

      <DeleteDeliveryBoy />

    </div>
  );
};


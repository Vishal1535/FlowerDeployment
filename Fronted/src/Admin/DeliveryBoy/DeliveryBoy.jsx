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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 sm:px-6 lg:px-8 py-6">

      <div className="max-w-7xl mx-auto space-y-6">

        {/* =====================================================
            TOP NAVIGATION
        ===================================================== */}

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={handleBack}
            className="
              w-10
              h-10
              rounded-xl
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
            <ArrowLeft size={20} />
          </button>

          <div>
            <p className="text-xs font-medium text-gray-400">
              Admin Panel
            </p>

            <p className="text-sm font-semibold text-gray-700">
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
            rounded-3xl
            border
            border-pink-100
            shadow-sm
          "
        >

          {/* Decorative background */}

          <div
            className="
              absolute
              -top-20
              -right-20
              w-56
              h-56
              rounded-full
              bg-pink-50
              opacity-70
            "
          />

          <div
            className="
              absolute
              -bottom-24
              -left-20
              w-48
              h-48
              rounded-full
              bg-rose-50
              opacity-70
            "
          />

          <div className="relative p-5 sm:p-7 lg:p-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              {/* =================================================
                  LEFT
              ================================================= */}

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
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
                  <Bike size={30} />
                </div>

                <div>

                  <div className="flex items-center gap-2 flex-wrap">

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                      Delivery Team
                    </h1>

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-2.5
                        py-1
                        rounded-full
                        bg-green-50
                        text-green-600
                        border
                        border-green-100
                        text-xs
                        font-semibold
                      "
                    >
                      <ShieldCheck size={13} />
                      Management
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-1.5">
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
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-2xl
                  bg-pink-500
                  hover:bg-pink-600
                  active:scale-[0.98]
                  text-white
                  font-semibold
                  shadow-md
                  shadow-pink-100
                  transition-all
                  cursor-pointer
                "
              >
                <Plus size={19} />
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
                gap-3
                mt-7
                pt-6
                border-t
                border-gray-100
              "
            >

              {/* TEAM */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  p-3.5
                  rounded-2xl
                  bg-pink-50/70
                  border
                  border-pink-100
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-white
                    text-pink-500
                    flex
                    items-center
                    justify-center
                    shadow-sm
                  "
                >
                  <Users size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Delivery Team
                  </p>

                  <p className="text-xs text-gray-400 mt-0.5">
                    Manage all delivery partners
                  </p>
                </div>

              </div>

              {/* ORDERS */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  p-3.5
                  rounded-2xl
                  bg-blue-50/70
                  border
                  border-blue-100
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-white
                    text-blue-500
                    flex
                    items-center
                    justify-center
                    shadow-sm
                  "
                >
                  <ClipboardList size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Order Assignment
                  </p>

                  <p className="text-xs text-gray-400 mt-0.5">
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
            rounded-3xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          "
        >

          {/* LIST HEADER */}

          <div
            className="
              px-5
              sm:px-7
              py-5
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

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-pink-50
                  text-pink-500
                  flex
                  items-center
                  justify-center
                "
              >
                <UserPlus size={19} />
              </div>

              <div>

                <h2 className="text-lg font-bold text-gray-800">
                  Delivery Partners
                </h2>

                <p className="text-sm text-gray-500 mt-0.5">
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

          <div className="p-5 sm:p-7">
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
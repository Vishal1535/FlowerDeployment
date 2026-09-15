
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  ArrowLeft,
  ClipboardList,
  Clock3,
  CheckCircle2,
  LoaderCircle,
  PackageCheck,
  Truck,
  BadgeCheck,
  XCircle,
} from "lucide-react";

import { GetAllOrdersThunk } from "../../Store/Order/OrderApi";

import { PendingOrder } from "./PendingOrder/PendingOrder";
import { ConfirmedOrder } from "./ConfirmedOrder/ConfirmedOrder";
import { ProcessingOrder } from "./ProcessingOrder/ProcessingOrder";
import { ShippedOrder } from "./ShippedOrder/ShippedOrder";
import { OutForDeliveryOrder } from "./OutForDeliveryOrder/OutForDeliveryOrder";
import { DeliveredOrder } from "./DeliveredOrder/DeliveredOrder";
import { CancelledOrder } from "./CancelledOrder/CancelledOrder";

export const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    orders = [],
    loading,
    error,
  } = useSelector((state) => state.Order);

  // =====================================================
  // VALID SECTIONS
  // =====================================================

  const validSections = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  // =====================================================
  // URL STATUS
  // =====================================================

  const urlSection = searchParams.get("status");

  const initialSection = validSections.includes(urlSection)
    ? urlSection
    : "pending";

  const [activeSection, setActiveSection] =
    useState(initialSection);

  // =====================================================
  // URL -> ACTIVE SECTION
  // =====================================================

  useEffect(() => {
    const status = searchParams.get("status");

    if (validSections.includes(status)) {
      setActiveSection(status);
    } else {
      setActiveSection("pending");
    }
  }, [searchParams]);

  // =====================================================
  // GET ALL ORDERS
  // =====================================================

  useEffect(() => {
    dispatch(GetAllOrdersThunk());
  }, [dispatch]);

  // =====================================================
  // SECTION CLICK
  // =====================================================

  const handleSectionClick = (section) => {
    setActiveSection(section);

    setSearchParams(
      { status: section },
      { replace: false }
    );
  };

  // =====================================================
  // STATUS DATA
  // =====================================================

  const statusTabs = [
    {
      key: "pending",
      label: "Pending",
      icon: Clock3,
      count: orders.filter(
        (order) => order?.orderStatus === "pending"
      ).length,
      active:
        "bg-amber-50 text-amber-700 border-amber-200 shadow-sm",
      iconBg: "bg-amber-100",
    },

    {
      key: "confirmed",
      label: "Confirmed",
      icon: CheckCircle2,
      count: orders.filter(
        (order) => order?.orderStatus === "confirmed"
      ).length,
      active:
        "bg-blue-50 text-blue-700 border-blue-200 shadow-sm",
      iconBg: "bg-blue-100",
    },

    {
      key: "processing",
      label: "Processing",
      icon: LoaderCircle,
      count: orders.filter(
        (order) => order?.orderStatus === "processing"
      ).length,
      active:
        "bg-purple-50 text-purple-700 border-purple-200 shadow-sm",
      iconBg: "bg-purple-100",
    },

    {
      key: "shipped",
      label: "Shipped",
      icon: PackageCheck,
      count: orders.filter(
        (order) => order?.orderStatus === "shipped"
      ).length,
      active:
        "bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm",
      iconBg: "bg-indigo-100",
    },

    {
      key: "out_for_delivery",
      label: "Out for Delivery",
      icon: Truck,
      count: orders.filter(
        (order) => order?.orderStatus === "out_for_delivery"
      ).length,
      active:
        "bg-orange-50 text-orange-700 border-orange-200 shadow-sm",
      iconBg: "bg-orange-100",
    },

    {
      key: "delivered",
      label: "Delivered",
      icon: BadgeCheck,
      count: orders.filter(
        (order) => order?.orderStatus === "delivered"
      ).length,
      active:
        "bg-green-50 text-green-700 border-green-200 shadow-sm",
      iconBg: "bg-green-100",
    },

    {
      key: "cancelled",
      label: "Cancelled",
      icon: XCircle,
      count: orders.filter(
        (order) => order?.orderStatus === "cancelled"
      ).length,
      active:
        "bg-red-50 text-red-700 border-red-200 shadow-sm",
      iconBg: "bg-red-100",
    },
  ];

  // =====================================================
  // RENDER ACTIVE SECTION
  // =====================================================

  const renderActiveSection = () => {
    switch (activeSection) {
      case "pending":
        return <PendingOrder orders={orders} />;

      case "confirmed":
        return <ConfirmedOrder orders={orders} />;

      case "processing":
        return <ProcessingOrder orders={orders} />;

      case "shipped":
        return <ShippedOrder orders={orders} />;

      case "out_for_delivery":
        return (
          <OutForDeliveryOrder orders={orders} />
        );

      case "delivered":
        return <DeliveredOrder orders={orders} />;

      case "cancelled":
        return <CancelledOrder orders={orders} />;

      default:
        return <PendingOrder orders={orders} />;
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#fffafa]">
        <div className="flex flex-col items-center gap-3">
          <div className="loading loading-spinner loading-lg text-pink-500" />

          <p className="text-sm text-gray-500 font-medium">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#fffafa] px-4">
        <div className="bg-white border border-red-100 rounded-2xl p-8 text-center shadow-sm">
          <XCircle
            size={40}
            className="mx-auto text-red-400 mb-3"
          />

          <p className="text-red-500 font-semibold">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(GetAllOrdersThunk())
            }
            className="mt-4 px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#fffafa] px-4 py-5 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* ================================================= */}
        {/* TOP BAR */}
        {/* ================================================= */}

        <div className="flex items-center justify-between gap-4 mb-5">

          {/* LEFT SIDE */}

          <div className="flex items-center gap-3">

            {/* BACK BUTTON */}

            <button
              type="button"
              onClick={() => navigate('/')}
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
                hover:bg-gray-50
                hover:text-pink-600
                hover:border-pink-200
                transition
                shadow-sm
              "
              title="Go Back"
            >
              <ArrowLeft size={19} />
            </button>

            {/* TITLE */}

            <div>
              <div className="flex items-center gap-2">

                <h1 className="text-2xl sm:text-3xl font-black text-gray-800">
                  Orders
                </h1>

                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100 text-[10px] font-bold">
                  <ClipboardList size={12} />
                  {orders.length} Total
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-1">
                Manage and track all customer orders
              </p>
            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* STATUS NAVIGATION */}
        {/* ================================================= */}

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-2.5 mb-6">

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">

            {statusTabs.map((tab) => {

              const Icon = tab.icon;

              const isActive =
                activeSection === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    handleSectionClick(tab.key)
                  }
                  className={`
                    group
                    shrink-0
                    flex
                    items-center
                    gap-2
                    px-3.5
                    py-2.5
                    rounded-xl
                    border
                    transition-all
                    duration-200
                    cursor-pointer
                    ${
                      isActive
                        ? tab.active
                        : "bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-100"
                    }
                  `}
                >

                  {/* ICON */}

                  <span
                    className={`
                      w-7
                      h-7
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      ${
                        isActive
                          ? tab.iconBg
                          : "bg-gray-100 group-hover:bg-gray-200"
                      }
                    `}
                  >
                    <Icon size={14} />
                  </span>

                  {/* LABEL */}

                  <span className="text-xs sm:text-sm font-bold">
                    {tab.label}
                  </span>

                  {/* COUNT */}

                  <span
                    className={`
                      min-w-5
                      h-5
                      px-1.5
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-[10px]
                      font-black
                      ${
                        isActive
                          ? "bg-white/80"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {tab.count}
                  </span>

                </button>
              );
            })}

          </div>
        </div>

        {/* ================================================= */}
        {/* ACTIVE SECTION */}
        {/* ================================================= */}

        <div className="animate-[fadeIn_0.2s_ease-in-out]">
          {renderActiveSection()}
        </div>

      </div>
    </div>
  );
};


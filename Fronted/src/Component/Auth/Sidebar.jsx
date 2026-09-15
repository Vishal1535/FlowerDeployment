import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Flower2,
  Gift,
  ShoppingBag,
  Bike,
  ChevronRight,
  X,
  User,
  Settings,
  LogOut,
  ClipboardList,
} from "lucide-react";

export const Sidebar = ({
  userInfo,
  showSidebar,
  setShowSidebar,
}) => {
  const navigate = useNavigate();

  // =====================================================
  // ONLY ADMIN + DELIVERY BOY
  // =====================================================

  if (
    userInfo?.role !== "admin" &&
    userInfo?.role !== "deliveryBoy"
  ) {
    return null;
  }

  // =====================================================
  // ADMIN MENU
  // =====================================================

  const adminMenuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Floral Collection",
      path: "/admin/products",
      icon: Flower2,
    },
    {
      name: "Special Bouquets",
      path: "/admin/special-bouquets",
      icon: Flower2,
    },
    {
      name: "Gifts & Treats",
      path: "/admin/GiftItem",
      icon: Gift,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Delivery Boys",
      path: "/admin/delivery-boys",
      icon: Bike,
    },
  ];

  // =====================================================
  // DELIVERY BOY MENU
  // =====================================================

  const deliveryBoyMenuItems = [
    {
      name: "Dashboard",
      path: "delivery-boy/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Orders",
      path: "/delivery-boy/MyOrder",
      icon: ClipboardList,
    },
    {
      name: "Profile",
      path: "/delivery-boy/profile",
      icon: User,
    },
    {
      name: "Settings",
      path: "/delivery-boy/settings",
      icon: Settings,
    },
  ];

  const menuItems =
    userInfo?.role === "admin"
      ? adminMenuItems
      : deliveryBoyMenuItems;

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    setShowSidebar(false);
    navigate("/");
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleNavigate = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  return (
    <>
      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        onClick={() => setShowSidebar(false)}
        className={`
          fixed
          inset-0
          bg-black/20
          backdrop-blur-[2px]
          z-[55]
          transition-opacity
          duration-300

          ${
            showSidebar
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }

          lg:hidden
        `}
      />

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[60]
          h-screen
          w-72
          bg-white
          border-r
          border-pink-100
          shadow-2xl

          flex
          flex-col

          transition-transform
          duration-300
          ease-in-out

          ${
            showSidebar
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            relative
            px-5
            py-5
            border-b
            border-gray-100
            flex
            items-center
            justify-between
          "
        >

          {/* LOGO */}

          <button
            type="button"
            onClick={() =>
              handleNavigate(
                userInfo?.role === "admin"
                  ? "/admin/dashboard"
                  : "/delivery-boy/dashboard"
              )
            }
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-pink-100
                flex
                items-center
                justify-center
                text-2xl
                shrink-0
              "
            >
              🌸
            </div>

            <div className="text-left">

              <h1
                className="
                  text-xl
                  font-bold
                  text-gray-800
                "
              >
                Flower
              </h1>

              <p
                className={`
                  text-xs
                  font-medium
                  ${
                    userInfo?.role === "admin"
                      ? "text-pink-500"
                      : "text-green-500"
                  }
                `}
              >
                {userInfo?.role === "admin"
                  ? "Admin Panel"
                  : "Delivery Panel"}
              </p>

            </div>

          </button>

          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => setShowSidebar(false)}
            className="
              w-9
              h-9
              rounded-xl
              flex
              items-center
              justify-center
              text-gray-500
              hover:text-pink-600
              hover:bg-pink-50
              transition
            "
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>

        </div>

        {/* =====================================================
            MENU
        ===================================================== */}

        <div className="flex-1 px-4 py-6 overflow-y-auto">

          <p
            className="
              px-3
              mb-3
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            {userInfo?.role === "admin"
              ? "Management"
              : "Delivery"}
          </p>

          <nav className="space-y-2">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setShowSidebar(false)
                  }
                  className={({ isActive }) =>
                    `
                      group
                      flex
                      items-center
                      justify-between
                      px-4
                      py-3.5
                      rounded-xl
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? "bg-pink-500 text-white shadow-md shadow-pink-100"
                          : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                      }
                    `
                  }
                >

                  {({ isActive }) => (
                    <>

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <Icon
                          size={19}
                          className="shrink-0"
                        />

                        <span
                          className="
                            text-sm
                            font-medium
                          "
                        >
                          {item.name}
                        </span>

                      </div>

                      <ChevronRight
                        size={17}
                        className={`
                          transition-transform
                          duration-200

                          ${
                            isActive
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }
                        `}
                      />

                    </>
                  )}

                </NavLink>
              );
            })}

          </nav>

        </div>

        {/* =====================================================
            USER INFO + LOGOUT
        ===================================================== */}

        <div
          className="
            p-4
            border-t
            border-gray-100
          "
        >

          {/* USER CARD */}

          <div
            className="
              flex
              items-center
              gap-3
              px-3
              py-3
              rounded-xl
              bg-pink-50
            "
          >

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-pink-200
                flex
                items-center
                justify-center
                text-lg
                shrink-0
              "
            >
              👤
            </div>

            <div className="min-w-0">

              <p
                className="
                  text-sm
                  font-semibold
                  text-gray-800
                  truncate
                "
              >
                {userInfo?.name ||
                  (userInfo?.role === "admin"
                    ? "Admin"
                    : "Delivery Boy")}
              </p>

              <p className="text-xs text-gray-500">
                {userInfo?.role === "admin"
                  ? "Administrator"
                  : "Delivery Boy"}
              </p>

            </div>

          </div>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-3
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-red-500
              hover:bg-red-50
              transition
            "
          >

            <LogOut size={19} />

            <span
              className="
                text-sm
                font-medium
              "
            >
              Logout
            </span>

          </button>

        </div>

      </aside>
    </>
  );
};
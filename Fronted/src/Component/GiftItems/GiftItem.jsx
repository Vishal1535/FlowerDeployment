
import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Gift,
  CreditCard,
  Candy,
  CakeSlice,
  ArrowLeft,
} from "lucide-react";

export const GiftItem = () => {
  const navigate = useNavigate();

  const { isAuthorized, userInfo } = useSelector(
    (state) => state.user
  );

  // =====================================================
  // ADMIN AUTHORIZATION
  // =====================================================

  useEffect(() => {
    // User login nahi hai
    // Ya user admin nahi hai
    if (!isAuthorized || userInfo?.role !== "admin") {
      navigate("/", {
        replace: true,
      });
    }
  }, [isAuthorized, userInfo, navigate]);

  // =====================================================
  // NAVIGATION ITEMS
  // =====================================================

  const navItems = [
    {
      path: "/admin/GiftItem/card",
      label: "Cards",
      icon: CreditCard,
    },
    {
      path: "/admin/GiftItem/chocolate",
      label: "Chocolates",
      icon: Candy,
    },
    {
      path: "/admin/GiftItem/mini-cupcake",
      label: "Mini Cupcakes",
      icon: CakeSlice,
    },
  ];

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#fffafa] px-4 py-6 sm:px-6 sm:py-8">
      <div className="max-w-6xl mx-auto">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-7">
          <div className="flex items-center gap-3">

            {/* Back Button */}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                w-11 h-11
                rounded-xl
                bg-white
                border border-gray-100
                shadow-sm
                flex items-center justify-center
                text-gray-600
                hover:bg-pink-50
                hover:text-pink-500
                hover:border-pink-100
                hover:shadow-md
                transition-all duration-200
              "
              title="Go to Home"
            >
              <ArrowLeft size={20} />
            </button>

            {/* Gift Icon */}

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-pink-100
                flex items-center justify-center
                shrink-0
              "
            >
              <Gift
                size={22}
                className="text-pink-500"
              />
            </div>

            {/* Heading */}

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Gift Collection
              </h1>

              <p className="text-sm text-gray-500 mt-0.5">
                Manage your gift products
              </p>
            </div>

          </div>
        </div>

        {/* ================================================= */}
        {/* CATEGORY NAVIGATION */}
        {/* ================================================= */}

        <div
          className="
            bg-white
            rounded-2xl
            border border-gray-100
            shadow-sm
            p-2
          "
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className="w-full"
                >
                  {({ isActive }) => (
                    <div
                      className={`
                        w-full
                        flex items-center justify-center
                        gap-2.5
                        px-5 py-3
                        rounded-xl
                        text-sm
                        font-semibold
                        transition-all duration-200
                        ${
                          isActive
                            ? `
                              bg-pink-500
                              text-white
                              shadow-sm
                            `
                            : `
                              text-gray-600
                              hover:bg-pink-50
                              hover:text-pink-600
                            `
                        }
                      `}
                    >
                      <Icon size={18} />

                      <span>
                        {item.label}
                      </span>
                    </div>
                  )}
                </NavLink>
              );
            })}

          </div>
        </div>

        {/* ================================================= */}
        {/* CHILD CONTENT */}
        {/* ================================================= */}

        <div className="mt-6">

          <div
            className="
              bg-white
              rounded-2xl
              border border-gray-100
              shadow-sm
              p-5 sm:p-6
            "
          >
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
};

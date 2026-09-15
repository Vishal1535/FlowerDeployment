import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Gift,
  Flower2,
  Flower,
  Box,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useSelector } from "react-redux";

export const SpecialBouquet = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      path: "/admin/special-bouquets/ComboBouquet",
      label: "Combo Bouquets",
      description: "Beautiful combinations of flowers & gifts",
      icon: Gift,
    },
    {
      path: "/admin/special-bouquets/WoolenBouquet",
      label: "Woolen Bouquets",
      description: "Handcrafted flowers that last longer",
      icon: Flower2,
    },
    {
      path: "/admin/special-bouquets/FlowerInSleeve",
      label: "Flowers in Sleeve",
      description: "Fresh flowers wrapped with elegance",
      icon: Flower,
    },
    {
      path: "/admin/special-bouquets/FlowerInBox",
      label: "Flowers in Box",
      description: "Premium flowers arranged beautifully",
      icon: Box,
    },
  ];
  const { isAuthorized, userInfo } = useSelector((state) => state.user);

useEffect(() => {
  // User login nahi hai
  // Ya user admin nahi hai
  if (!isAuthorized || userInfo?.role !== "admin") {
    navigate("/", {
      replace: true,
    });
  }
}, [isAuthorized, userInfo, navigate]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7fa] via-white to-[#fffafa] px-4 py-6 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="relative overflow-hidden rounded-3xl bg-white border border-pink-100 shadow-sm px-5 py-6 sm:px-7 mb-8">

          {/* Decorative Background */}

          <div className="
            absolute
            -right-16
            -top-20
            w-48
            h-48
            rounded-full
            bg-pink-100/60
          " />

          <div className="
            absolute
            -left-20
            -bottom-24
            w-48
            h-48
            rounded-full
            bg-rose-50
          " />

          <div className="relative flex items-center gap-4">

            {/* Back Button */}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                w-11
                h-11
                shrink-0
                rounded-xl
                bg-white
                border
                border-gray-200
                flex
                items-center
                justify-center
                text-gray-600
                hover:bg-pink-50
                hover:text-pink-500
                hover:border-pink-200
                transition-all
                duration-200
              "
            >
              <ArrowLeft size={20} />
            </button>

            {/* Main Icon */}

            <div className="
              w-14
              h-14
              shrink-0
              rounded-2xl
              bg-gradient-to-br
              from-pink-500
              to-rose-400
              flex
              items-center
              justify-center
              shadow-lg
              shadow-pink-200
            ">
              <Sparkles
                size={26}
                className="text-white"
              />
            </div>

            {/* Heading */}

            <div>
              <div className="flex items-center gap-2">

                <h1 className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                  text-gray-800
                ">
                  Bouquet Collection
                </h1>

                <span className="
                  hidden
                  sm:inline-flex
                  px-2.5
                  py-1
                  rounded-full
                  bg-pink-50
                  text-pink-600
                  text-xs
                  font-medium
                ">
                  4 Categories
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-1">
                Create and manage your beautiful bouquet collection
              </p>
            </div>

          </div>

        </div>

        {/* ================= CATEGORY HEADING ================= */}

        <div className="flex items-end justify-between mb-5">

          <div>
            <h2 className="
              text-lg
              font-semibold
              text-gray-800
            ">
              Explore Categories
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Choose a category to manage your products
            </p>
          </div>

        </div>

        {/* ================= CATEGORY CARDS ================= */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-5
          mb-8
        ">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className="group"
              >
                {({ isActive }) => (
                  <div
                    className={`
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      p-5
                      bg-white
                      flex
                      items-center
                      gap-4
                      ${
                        isActive
                          ? "border-pink-300 bg-pink-50/70 shadow-md shadow-pink-100"
                          : "border-gray-100 shadow-sm hover:border-pink-200 hover:shadow-md"
                      }
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    `}
                  >

                    {/* Decorative Circle */}

                    <div className="
                      absolute
                      -right-10
                      -top-10
                      w-28
                      h-28
                      rounded-full
                      bg-pink-50
                      opacity-70
                      group-hover:scale-125
                      transition-transform
                      duration-500
                    " />

                    {/* Icon */}

                    <div
                      className={`
                        relative
                        w-14
                        h-14
                        shrink-0
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        ${
                          isActive
                            ? "bg-gradient-to-br from-pink-500 to-rose-400 text-white shadow-md shadow-pink-200"
                            : "bg-pink-50 text-pink-500 group-hover:bg-pink-100"
                        }
                        transition-all
                        duration-300
                        group-hover:scale-105
                      `}
                    >
                      <Icon size={25} />
                    </div>

                    {/* Content */}

                    <div className="relative flex-1">

                      <h3
                        className={`
                          text-base
                          font-semibold
                          ${
                            isActive
                              ? "text-pink-600"
                              : "text-gray-800 group-hover:text-pink-600"
                          }
                          transition-colors
                        `}
                      >
                        {item.label}
                      </h3>

                      <p className="
                        text-sm
                        text-gray-500
                        mt-1
                        leading-5
                      ">
                        {item.description}
                      </p>

                    </div>

                    {/* Arrow */}

                    <div
                      className={`
                        relative
                        shrink-0
                        w-9
                        h-9
                        rounded-full
                        flex
                        items-center
                        justify-center
                        ${
                          isActive
                            ? "bg-pink-100 text-pink-500"
                            : "bg-gray-50 text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-500"
                        }
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                      `}
                    >
                      <ChevronRight size={19} />
                    </div>

                  </div>
                )}
              </NavLink>
            );
          })}

        </div>

        {/* ================= CONTENT ================= */}

        <div className="
          overflow-hidden
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
        ">

          {/* Content Header */}

          <div className="
            px-5
            py-4
            sm:px-6
            border-b
            border-gray-100
            bg-[#fffafa]
          ">
            <h2 className="
              text-base
              font-semibold
              text-gray-800
            ">
              Manage Collection
            </h2>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">
              Add, update and manage your bouquet products
            </p>
          </div>

          {/* Outlet */}

          <div className="p-5 sm:p-7">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
};
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
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#fff7fa] via-white to-[#fffafa] px-3 py-4 min-[380px]:px-4 sm:px-6 lg:px-8 sm:py-6">
      <div className="max-w-6xl mx-auto min-w-0">

        {/* ================= HEADER ================= */}

        <div className="relative overflow-hidden rounded-2xl min-[380px]:rounded-3xl bg-white border border-pink-100 shadow-sm px-4 py-4 min-[380px]:px-5 min-[380px]:py-6 sm:px-7 mb-5 min-[380px]:mb-8">

          {/* Decorative Background */}

          <div
            className="
              absolute
              -right-16
              -top-20
              w-36
              h-36
              min-[380px]:w-48
              min-[380px]:h-48
              rounded-full
              bg-pink-100/60
            "
          />

          <div
            className="
              absolute
              -left-20
              -bottom-24
              w-36
              h-36
              min-[380px]:w-48
              min-[380px]:h-48
              rounded-full
              bg-rose-50
            "
          />

          <div className="relative flex items-center gap-2.5 min-[380px]:gap-4">

            {/* Back Button */}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                w-9
                h-9
                min-[380px]:w-11
                min-[380px]:h-11
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
              <ArrowLeft size={18} className="min-[380px]:w-5 min-[380px]:h-5" />
            </button>

            {/* Main Icon */}

            <div
              className="
                w-11
                h-11
                min-[380px]:w-14
                min-[380px]:h-14
                shrink-0
                rounded-xl
                min-[380px]:rounded-2xl
                bg-gradient-to-br
                from-pink-500
                to-rose-400
                flex
                items-center
                justify-center
                shadow-lg
                shadow-pink-200
              "
            >
              <Sparkles
                size={22}
                className="text-white min-[380px]:w-[26px] min-[380px]:h-[26px]"
              />
            </div>

            {/* Heading */}

            <div className="min-w-0">
              <div className="flex items-center gap-2">

                <h1
                  className="
                    text-lg
                    min-[380px]:text-2xl
                    sm:text-3xl
                    font-bold
                    text-gray-800
                    leading-tight
                  "
                >
                  Bouquet Collection
                </h1>

                <span
                  className="
                    hidden
                    sm:inline-flex
                    px-2.5
                    py-1
                    rounded-full
                    bg-pink-50
                    text-pink-600
                    text-xs
                    font-medium
                    whitespace-nowrap
                  "
                >
                  4 Categories
                </span>

              </div>

              <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1 leading-5">
                Create and manage your beautiful bouquet collection
              </p>
            </div>

          </div>

        </div>

        {/* ================= CATEGORY HEADING ================= */}

        <div className="flex items-end justify-between mb-3 min-[380px]:mb-5">

          <div>
            <h2
              className="
                text-base
                min-[380px]:text-lg
                font-semibold
                text-gray-800
              "
            >
              Explore Categories
            </h2>

            <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1">
              Choose a category to manage your products
            </p>
          </div>

        </div>

        {/* ================= CATEGORY CARDS ================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-3
            min-[380px]:gap-5
            mb-5
            min-[380px]:mb-8
          "
        >

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className="group min-w-0"
              >
                {({ isActive }) => (
                  <div
                    className={`
                      relative
                      overflow-hidden
                      rounded-xl
                      min-[380px]:rounded-2xl
                      border
                      p-3
                      min-[380px]:p-5
                      bg-white
                      flex
                      items-center
                      gap-3
                      min-[380px]:gap-4
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

                    <div
                      className="
                        absolute
                        -right-10
                        -top-10
                        w-24
                        h-24
                        min-[380px]:w-28
                        min-[380px]:h-28
                        rounded-full
                        bg-pink-50
                        opacity-70
                        group-hover:scale-125
                        transition-transform
                        duration-500
                      "
                    />

                    {/* Icon */}

                    <div
                      className={`
                        relative
                        w-11
                        h-11
                        min-[380px]:w-14
                        min-[380px]:h-14
                        shrink-0
                        rounded-xl
                        min-[380px]:rounded-2xl
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
                      <Icon
                        size={21}
                        className="min-[380px]:w-[25px] min-[380px]:h-[25px]"
                      />
                    </div>

                    {/* Content */}

                    <div className="relative flex-1 min-w-0">

                      <h3
                        className={`
                          text-sm
                          min-[380px]:text-base
                          font-semibold
                          truncate
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

                      <p
                        className="
                          text-xs
                          min-[380px]:text-sm
                          text-gray-500
                          mt-1
                          leading-5
                          line-clamp-2
                        "
                      >
                        {item.description}
                      </p>

                    </div>

                    {/* Arrow */}

                    <div
                      className={`
                        relative
                        shrink-0
                        w-8
                        h-8
                        min-[380px]:w-9
                        min-[380px]:h-9
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
                      <ChevronRight
                        size={17}
                        className="min-[380px]:w-[19px] min-[380px]:h-[19px]"
                      />
                    </div>

                  </div>
                )}
              </NavLink>
            );
          })}

        </div>

        {/* ================= CONTENT ================= */}

        <div
          className="
            min-w-0
            overflow-hidden
            bg-white
            rounded-xl
            min-[380px]:rounded-2xl
            border
            border-gray-100
            shadow-sm
          "
        >

          {/* Content Header */}

          <div
            className="
              px-4
              py-3
              min-[380px]:px-5
              min-[380px]:py-4
              sm:px-6
              border-b
              border-gray-100
              bg-[#fffafa]
            "
          >
            <h2
              className="
                text-sm
                min-[380px]:text-base
                font-semibold
                text-gray-800
              "
            >
              Manage Collection
            </h2>

            <p
              className="
                text-xs
                min-[380px]:text-sm
                text-gray-500
                mt-1
              "
            >
              Add, update and manage your bouquet products
            </p>
          </div>

          {/* Outlet */}

          <div className="p-3 min-[380px]:p-5 sm:p-7">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
};
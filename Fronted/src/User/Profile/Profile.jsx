import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  Heart,
  Package,
  MapPin,
  Settings,
  ChevronRight,
  ArrowLeft,
  Pencil,
  Sparkles,
  ShoppingBag,
  Truck,
  Bike,
} from "lucide-react";
import { logoutThunks } from "../../Store/AuthSlice/authApi";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthorized, userInfo } = useSelector(
    (state) => state.user
  );

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    const result = await dispatch(logoutThunks());

    if (logoutThunks.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  // =====================================================
  // LOGIN REQUIRED
  // =====================================================

  if (!isAuthorized || !userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-pink-100 shadow-xl p-6 sm:p-8 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-200">
            <User size={30} className="text-white" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-5">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Please login to access your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-semibold transition shadow-md shadow-pink-200"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // ROLE
  // =====================================================

  const role = userInfo?.role || "user";

  // =====================================================
  // ROLE BASED DATA
  // =====================================================

  const roleData = {
    user: {
      label: "Personal Account",
      description: "Manage your Flower account",
      badge: "Customer",
      icon: ShoppingBag,
      actions: [
        {
          title: "My Orders",
          description: "Track your orders",
          icon: Package,
          path: "/My-Order",
        },
        {
          title: "Wishlist",
          description: "Your saved products",
          icon: Heart,
          path: "/wishlist",
        },
        {
          title: "My Addresses",
          description: "Manage delivery addresses",
          icon: MapPin,
          path: "/address",
        },
        {
          title: "Account Settings",
          description: "Manage your account",
          icon: Settings,
          path: "/settings",
        },
      ],
    },

    admin: {
      label: "Admin Account",
      description: "Manage your Flower store",
      badge: "Administrator",
      icon: ShieldCheck,
      actions: [
        {
          title: "Manage Delivery boy",
          description: "Add and manage delivery boys",
          icon: Bike,
          path: "/admin/delivery-boys",
        },
        {
          title: "Manage Orders",
          description: "View and manage orders",
          icon: Package,
          path: "/admin/orders",
        },
        {
          title: "Account Settings",
          description: "Manage your account",
          icon: Settings,
          path: "/settings",
        },
      ],
    },

    deliveryBoy: {
      label: "Delivery Account",
      description: "Manage your delivery work",
      badge: "Delivery Partner",
      icon: Truck,
      actions: [
        {
          title: "Dashboard",
          description: "View your delivery dashboard",
          icon: Truck,
          path: "/delivery-boy/dashboard",
        },
        {
          title: "My Orders",
          description: "View your assigned delivery orders",
          icon: Package,
          path: "/delivery-boy/MyOrder",
        },
        {
          title: "Account Settings",
          description: "Manage your account",
          icon: Settings,
          path: "/settings",
        },
      ],
    },
  };

  const currentRoleData =
    roleData[role] || roleData.user;

  const RoleIcon = currentRoleData.icon;

  const firstLetter =
    userInfo?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#fafafa] px-3 py-3 sm:px-6 sm:py-8">
      <div className="max-w-6xl mx-auto">

        {/* =================================================
            TOP BAR
        ================================================= */}

        <div className="flex items-center justify-between mb-3 sm:mb-5">

          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-pink-600 transition"
          >
            <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:border-pink-200 group-hover:bg-pink-50 transition">
              <ArrowLeft size={17} />
            </div>

            <span className="hidden sm:block">
              Back
            </span>
          </button>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-400">
            <Sparkles
              size={13}
              className="text-pink-500"
            />

            My Account
          </div>
        </div>

        {/* =================================================
            PROFILE HERO
        ================================================= */}

        <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-white border border-gray-200 shadow-sm">

          {/* Decorative Background */}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-16 -right-12 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-pink-100/70 blur-2xl" />

            <div className="absolute -bottom-20 -left-12 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-rose-100/60 blur-3xl" />
          </div>

          <div className="relative p-4 sm:p-7 lg:p-8">

            {/* Top Label */}

            <div className="flex items-center justify-between">

              <div className="min-w-0">

                <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] font-bold text-pink-500">
                  {currentRoleData.label}
                </p>

                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 truncate">
                  {currentRoleData.description}
                </p>

              </div>

              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                <RoleIcon
                  size={16}
                  className="text-pink-600"
                />
              </div>

            </div>

            {/* Profile Information */}

            <div className="mt-4 sm:mt-7 flex flex-col md:flex-row md:items-center gap-3 sm:gap-5">

              {/* Avatar */}

              <div className="relative shrink-0">

                <div className="w-[72px] h-[72px] sm:w-28 sm:h-28 rounded-2xl sm:rounded-[28px] bg-gradient-to-br from-pink-500 to-rose-400 p-[2px] sm:p-[3px] shadow-md sm:shadow-lg shadow-pink-200">

                  <div className="w-full h-full rounded-[14px] sm:rounded-[25px] bg-white flex items-center justify-center">

                    <div className="w-[58px] h-[58px] sm:w-24 sm:h-24 rounded-xl sm:rounded-[22px] bg-pink-50 flex items-center justify-center">

                      <span className="text-2xl sm:text-5xl font-bold text-pink-600">
                        {firstLetter}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Active Indicator */}

                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-green-500 border-2 sm:border-4 border-white" />

              </div>

              {/* Name */}

              <div className="flex-1 min-w-0">

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">

                  <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate max-w-full">
                    {userInfo?.name}
                  </h1>

                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-pink-50 text-pink-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-wide">
                    {currentRoleData.badge}
                  </span>

                </div>

                {/* Email */}

                <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500 min-w-0">

                  <Mail
                    size={14}
                    className="text-pink-500 shrink-0"
                  />

                  <span className="truncate">
                    {userInfo?.email}
                  </span>

                </div>

                {/* Active */}

                <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">

                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />

                  <span className="text-[10px] sm:text-xs font-medium text-green-600">
                    Account Active
                  </span>

                </div>

              </div>

              {/* Edit Profile */}

              <button
                onClick={() => navigate("/settings")}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 h-10 sm:h-11 rounded-xl bg-gray-900 hover:bg-pink-600 text-white text-xs sm:text-sm font-semibold transition shadow-sm"
              >
                <Pencil size={14} />

                Edit Profile
              </button>

            </div>
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 mt-3 sm:mt-5">

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <div className="lg:col-span-4 bg-white rounded-2xl sm:rounded-[24px] border border-gray-200 shadow-sm p-4 sm:p-6">

            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">

              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-pink-50 flex items-center justify-center shrink-0">
                <User
                  size={18}
                  className="text-pink-600"
                />
              </div>

              <div>

                <h2 className="text-sm sm:text-base font-bold text-gray-900">
                  Personal Details
                </h2>

                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                  Your account information
                </p>

              </div>

            </div>

            <div className="space-y-2 sm:space-y-3">

              {/* Name */}

              <div className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-pink-50/70 transition">

                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  Full Name
                </p>

                <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2">

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                    <User
                      size={14}
                      className="text-pink-500"
                    />
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                    {userInfo?.name || "Not available"}
                  </p>

                </div>
              </div>

              {/* Email */}

              <div className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-pink-50/70 transition">

                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  Email Address
                </p>

                <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2 min-w-0">

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                    <Mail
                      size={14}
                      className="text-pink-500"
                    />
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                    {userInfo?.email || "Not available"}
                  </p>

                </div>
              </div>

              {/* Role */}

              <div className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-pink-50/70 transition">

                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  Account Type
                </p>

                <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2">

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                    <ShieldCheck
                      size={14}
                      className="text-pink-500"
                    />
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-gray-800">
                    {currentRoleData.badge}
                  </p>

                </div>
              </div>

            </div>

            {/* Account ID */}

            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">

              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-gray-400">
                Account ID
              </p>

              <p className="text-[9px] sm:text-[11px] font-mono text-gray-500 mt-1.5 sm:mt-2 break-all">
                {userInfo?.id}
              </p>

            </div>
          </div>

          {/* =================================================
              QUICK ACCESS
          ================================================= */}

          <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-[24px] border border-gray-200 shadow-sm p-4 sm:p-6">

            <div className="flex items-center justify-between mb-4 sm:mb-6">

              <div>

                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Quick Access
                </h2>

                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  {role === "user"
                    ? "Everything you need for your shopping experience"
                    : role === "admin"
                    ? "Manage your Flower store"
                    : "Manage your delivery work"}
                </p>

              </div>

              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-pink-50 items-center justify-center">
                <Sparkles
                  size={17}
                  className="text-pink-600"
                />
              </div>

            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">

              {currentRoleData.actions.map((item) => {

                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    onClick={() => navigate(item.path)}
                    className="group relative overflow-hidden flex items-center gap-2 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-pink-200 hover:shadow-md hover:shadow-pink-100/50 transition-all duration-300 text-left min-w-0"
                  >

                    {/* Hover Decoration */}

                    <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full bg-pink-50 opacity-0 group-hover:opacity-100 transition" />

                    {/* Icon */}

                    <div className="relative w-9 h-9 sm:w-12 sm:h-12 shrink-0 rounded-xl sm:rounded-2xl bg-white border border-gray-100 flex items-center justify-center group-hover:bg-pink-50 group-hover:border-pink-100 transition">

                      <Icon
                        size={17}
                        className="text-pink-600 sm:w-[21px] sm:h-[21px]"
                      />

                    </div>

                    {/* Text */}

                    <div className="relative flex-1 min-w-0">

                      <p className="text-[11px] sm:text-sm font-bold text-gray-900 truncate">
                        {item.title}
                      </p>

                      <p className="text-[9px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 line-clamp-2">
                        {item.description}
                      </p>

                    </div>

                    {/* Arrow */}

                    <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center group-hover:bg-pink-50 transition shrink-0">

                      <ChevronRight
                        size={14}
                        className="text-gray-300 group-hover:text-pink-500 group-hover:translate-x-0.5 transition sm:w-[17px] sm:h-[17px]"
                      />

                    </div>

                  </button>
                );
              })}

            </div>

            {/* Bottom Info */}

            <div className="mt-3 sm:mt-5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100">

              <div className="flex items-center gap-2.5 sm:gap-3">

                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white flex items-center justify-center shrink-0">

                  <Sparkles
                    size={14}
                    className="text-pink-500"
                  />

                </div>

                <div className="min-w-0">

                  <p className="text-[10px] sm:text-xs font-bold text-gray-800">

                    {role === "user"
                      ? "Enjoy your Flower experience"
                      : role === "admin"
                      ? "Manage your Flower store"
                      : "Manage your deliveries"}

                  </p>

                  <p className="text-[9px] sm:text-[11px] text-gray-500 mt-0.5">

                    {role === "user"
                      ? "Explore bouquets, gifts and beautiful flowers."
                      : role === "admin"
                      ? "Manage products and customer orders."
                      : "Check assigned orders and delivery information."}

                  </p>

                </div>

              </div>

            </div>
          </div>
        </div>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          onClick={handleLogout}
          className="w-full mt-3 sm:mt-5 h-11 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-red-100 hover:bg-red-50 hover:border-red-200 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-semibold text-xs sm:text-sm transition"
        >
          <LogOut size={16} />
          Logout
        </button>

        <p className="text-center text-[9px] sm:text-[11px] text-gray-400 mt-3 sm:mt-4 pb-2">
          Your account information is securely managed.
        </p>

      </div>
    </div>
  );
};
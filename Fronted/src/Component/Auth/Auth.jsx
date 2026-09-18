import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";

import { Search, Bell, Menu } from "lucide-react";

import { ProfileDropdown } from "./ProfileDropdown";
import { Sidebar } from "./Sidebar";

import { globalSearchThunk } from "../../Store/ProductData/ProductApi";

export const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // =====================================================
  // SEARCH
  // =====================================================

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  // =====================================================
  // SIDEBAR
  // =====================================================

  const [showSidebar, setShowSidebar] = useState(false);

  // =====================================================
  // USER
  // =====================================================

  const { isAuthorized, userInfo } = useSelector((state) => state.user);

  // =====================================================
  // ROLE
  // =====================================================

  const isAdmin = userInfo?.role === "admin";

  const isDeliveryBoy = userInfo?.role === "deliveryBoy";

  const isStaff = isAdmin || isDeliveryBoy;

  // =====================================================
  // NAV CLASS
  // =====================================================

  const navClass = ({ isActive }) =>
    `
      px-1.5
      xs:px-2
      sm:px-3
      py-1.5
      sm:py-2
      rounded-full
      text-[11px]
      sm:text-sm
      font-medium
      whitespace-nowrap
      transition-all
      duration-200

      ${
        isActive
          ? "bg-pink-100 text-pink-600 font-semibold"
          : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
      }
    `;

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = async () => {
    const value = query.trim();

    if (!value || searching) {
      return;
    }

    setSearching(true);

    try {
      await dispatch(globalSearchThunk(value)).unwrap();

      navigate(`/search?q=${encodeURIComponent(value)}`);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setSearching(false);
    }
  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSearch();
    }
  };

  return (
    <>
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      {isAuthorized && isStaff && (
        <Sidebar
          userInfo={userInfo}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      )}

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav
        className="
          sticky
          top-0
          z-50
          w-full
          bg-white
          border-b
          border-gray-100
          shadow-sm
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-2
            sm:px-4
            md:px-6
            py-2
            sm:py-3
          "
        >
          {/* =================================================
              TOP ROW
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-1.5
              sm:gap-3
              min-w-0
            "
          >
            {/* =================================================
                STAFF MENU
            ================================================= */}

            {isAuthorized && isStaff && (
              <button
                type="button"
                onClick={() => setShowSidebar(true)}
                className="
                  w-8
                  h-8
                  sm:w-10
                  sm:h-10
                  rounded-lg
                  sm:rounded-xl
                  bg-pink-50
                  text-pink-600
                  flex
                  items-center
                  justify-center
                  hover:bg-pink-100
                  hover:scale-105
                  transition-all
                  shrink-0
                  cursor-pointer
                "
                aria-label="Open sidebar"
              >
                <Menu size={18} className="sm:w-[21px] sm:h-[21px]" />
              </button>
            )}

            {/* =================================================
                FLOWER LOGO
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                navigate(isAdmin ? "/" : isDeliveryBoy ? "/" : "/")
              }
              className="
                flex
                items-center
                gap-1
                sm:gap-2
                shrink-0
                cursor-pointer
                min-w-0
              "
            >
              <span className="text-xl sm:text-3xl">🌸</span>

              <div className="text-left min-w-0">
                <span
                  className="
                    text-lg
                    sm:text-2xl
                    font-bold
                    text-gray-800
                  "
                >
                  Flower
                </span>

                {isAdmin && (
                  <p
                    className="
                      text-[7px]
                      sm:text-[10px]
                      text-pink-500
                      font-semibold
                      leading-tight
                    "
                  >
                    Admin Panel
                  </p>
                )}

                {isDeliveryBoy && (
                  <p
                    className="
                      text-[7px]
                      sm:text-[10px]
                      text-green-500
                      font-semibold
                      leading-tight
                    "
                  >
                    Delivery Panel
                  </p>
                )}
              </div>
            </button>

            {/* =================================================
                DESKTOP SEARCH
            ================================================= */}

            <div
              className="
                hidden
                md:flex
                flex-1
                min-w-0
                justify-center
                px-2
              "
            >
              <div
                className="
                  flex
                  items-center
                  w-full
                  max-w-xl
                  h-10
                  lg:h-11
                  border
                  border-gray-200
                  rounded-full
                  bg-gray-50
                  overflow-hidden

                  focus-within:bg-white
                  focus-within:border-pink-300
                  focus-within:ring-4
                  focus-within:ring-pink-50

                  transition-all
                "
              >
                <Search
                  size={18}
                  className="
                    ml-4
                    text-gray-400
                    shrink-0
                  "
                />

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isStaff
                      ? "Search anything..."
                      : "Search flowers, bouquets or occasions..."
                  }
                  className="
                    flex-1
                    min-w-0
                    h-full
                    px-3
                    bg-transparent
                    outline-none
                    text-sm
                    text-gray-700
                  "
                />

                {searching ? (
                  <span
                    className="
                      loading
                      loading-spinner
                      loading-sm
                      mr-4
                    "
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="
                      w-10
                      h-10
                      lg:w-11
                      lg:h-11
                      shrink-0
                      flex
                      items-center
                      justify-center
                      bg-pink-500
                      text-white
                      hover:bg-pink-600
                      transition
                      cursor-pointer
                    "
                    aria-label="Search"
                  >
                    <Search size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* =================================================
                RIGHT NAVIGATION
            ================================================= */}

            <div
              className="
                flex
                items-center
                gap-0
                sm:gap-1
                ml-auto
                shrink-0
                min-w-0
              "
            >
              {/* =================================================
                  STAFF NOTIFICATION
              ================================================= */}

              {isAuthorized && isStaff && (
                <button
                  type="button"
                  className="
                    relative
                    w-8
                    h-8
                    sm:w-10
                    sm:h-10
                    rounded-full
                    hover:bg-gray-100
                    flex
                    items-center
                    justify-center
                    text-gray-600
                    transition
                    cursor-pointer
                    shrink-0
                  "
                >
                  <Bell size={17} className="sm:w-[19px] sm:h-[19px]" />

                  <span
                    className="
                      absolute
                      top-1
                      right-1
                      w-1.5
                      h-1.5
                      sm:w-2
                      sm:h-2
                      bg-red-500
                      rounded-full
                    "
                  />
                </button>
              )}

              {/* =================================================
                  NOT AUTHORIZED
              ================================================= */}

              {!isAuthorized && (
                <>
                  <NavLink to="/" className={navClass}>
                    Home
                  </NavLink>

                  <NavLink to="/about" className={navClass}>
                    About
                  </NavLink>

                  <NavLink to="/contact" className={navClass}>
                    Contact
                  </NavLink>

                  <NavLink to="/login" className={navClass}>
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    className="
                      px-2
                      sm:px-4
                      py-1.5
                      sm:py-2
                      rounded-full
                      text-[11px]
                      sm:text-sm
                      font-semibold
                      bg-pink-500
                      text-white
                      hover:bg-pink-600
                      hover:shadow-md
                      transition-all
                      duration-200
                      whitespace-nowrap
                    "
                  >
                    Register
                  </NavLink>
                </>
              )}

              {/* =================================================
                  NORMAL USER
              ================================================= */}

              {isAuthorized && !isStaff && (
                <>
                  <NavLink to="/" className={navClass}>
                    Home
                  </NavLink>

                  <NavLink to="/about" className={navClass}>
                    About
                  </NavLink>

                  <NavLink to="/contact" className={navClass}>
                    Contact
                  </NavLink>

                  <NavLink to="/wishlist" className={navClass}>
                    ❤️ Wishlist
                  </NavLink>

                  <ProfileDropdown userInfo={userInfo} />
                </>
              )}

              {/* =================================================
                  ADMIN / DELIVERY BOY
              ================================================= */}

              {isAuthorized && isStaff && (
                <ProfileDropdown userInfo={userInfo} />
              )}
            </div>
          </div>

          {/* =================================================
              MOBILE SEARCH
          ================================================= */}

          <div
            className="
              flex
              md:hidden
              w-full
              mt-2
            "
          >
            <div
              className="
                flex
                items-center
                w-full
                h-10
                sm:h-11
                border
                border-gray-200
                rounded-full
                bg-gray-50
                overflow-hidden

                focus-within:bg-white
                focus-within:border-pink-300
                focus-within:ring-4
                focus-within:ring-pink-50

                transition-all
              "
            >
              <Search
                size={17}
                className="
                  ml-3
                  sm:ml-4
                  text-gray-400
                  shrink-0
                "
              />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isStaff
                    ? "Search anything..."
                    : "Search flowers, bouquets or occasions..."
                }
                className="
                  flex-1
                  min-w-0
                  h-full
                  px-2.5
                  sm:px-3
                  bg-transparent
                  outline-none
                  text-xs
                  sm:text-sm
                  text-gray-700
                "
              />

              {searching ? (
                <span
                  className="
                    loading
                    loading-spinner
                    loading-sm
                    mr-3
                    shrink-0
                  "
                />
              ) : (
                <button
                  type="button"
                  onClick={handleSearch}
                  className="
                    w-10
                    h-10
                    sm:w-11
                    sm:h-11
                    shrink-0
                    flex
                    items-center
                    justify-center
                    bg-pink-500
                    text-white
                    hover:bg-pink-600
                    transition
                    cursor-pointer
                  "
                  aria-label="Search"
                >
                  <Search size={17} />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  User,
  LogOut,
  ChevronDown,
  Settings,
  Bike,
} from "lucide-react";

import { logoutThunks } from "../../Store/AuthSlice/authApi";

export const ProfileDropdown = ({
  userInfo,
}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] =
    useState(false);

  const profileRef = useRef(null);

  // =====================================================
  // CLICK OUTSIDE
  // =====================================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setShowProfile(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // =====================================================
  // NAVIGATE
  // =====================================================

  const handleNavigate = (path) => {

    navigate(path);
    setShowProfile(false);

  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {

    await dispatch(logoutThunks());

    setShowProfile(false);

    navigate("/");

  };

  // =====================================================
  // ROLE
  // =====================================================

  const isAdmin =
    userInfo?.role === "admin";

  const isDeliveryBoy =
    userInfo?.role === "deliveryBoy";

  return (

    <div
      ref={profileRef}
      className="relative"
    >

      {/* =====================================================
          PROFILE BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() =>
          setShowProfile(!showProfile)
        }
        className="
          px-4
          py-2
          rounded-full
          text-gray-700
          hover:bg-gray-100
          transition
          flex
          items-center
          gap-2
        "
      >

        <User size={18} />

        <span className="hidden sm:inline">
          {userInfo?.name || "Profile"}
        </span>

        <ChevronDown
          size={16}
          className={`
            transition-transform
            ${
              showProfile
                ? "rotate-180"
                : ""
            }
          `}
        />

      </button>

      {/* =====================================================
          DROPDOWN
      ===================================================== */}

      {showProfile && (

        <div
          className="
            absolute
            right-0
            top-12
            w-56
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-gray-100
            p-2
            z-[70]
          "
        >

          {/* =================================================
              NORMAL USER
          ================================================= */}

          {userInfo?.role === "user" && (
            <>

              <button
                onClick={() =>
                  handleNavigate("/profile")
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  rounded-xl
                  hover:bg-gray-50
                  text-gray-700
                  flex
                  items-center
                  gap-3
                "
              >

                <User size={17} />

                <span>
                  My Profile
                </span>

              </button>

              <button
                onClick={() =>
                  handleNavigate("/cart")
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  rounded-xl
                  hover:bg-gray-50
                  text-gray-700
                  flex
                  items-center
                  gap-3
                "
              >

                <span>🛒</span>

                <span>
                  My Cart
                </span>

              </button>

              <button
                onClick={() =>
                  handleNavigate("/My-Order")
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  rounded-xl
                  hover:bg-gray-50
                  text-gray-700
                  flex
                  items-center
                  gap-3
                "
              >

                <span>📦</span>

                <span>
                  My Orders
                </span>

              </button>

              <button
                onClick={() =>
                  handleNavigate("/settings")
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  rounded-xl
                  hover:bg-gray-50
                  text-gray-700
                  flex
                  items-center
                  gap-3
                "
              >

                <Settings size={17} />

                <span>
                  Settings
                </span>

              </button>

            </>
          )}

          {/* =================================================
              ADMIN
          ================================================= */}

          {isAdmin && (
            <>

              <div
                className="
                  px-4
                  py-2
                  mb-1
                "
              >

                <p className="text-xs text-gray-400">
                  Signed in as
                </p>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-gray-800
                    truncate
                  "
                >
                  {userInfo?.email || "Admin"}
                </p>

              </div>

              <button
                onClick={() =>
                  handleNavigate(
                    "/admin/dashboard"
                  )
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  rounded-xl
                  hover:bg-pink-50
                  text-gray-700
                  flex
                  items-center
                  gap-3
                "
              >

                <span>📊</span>

                <span>
                  Dashboard
                </span>

              </button>

              <button
                onClick={() =>
                  handleNavigate(
                    "/admin/settings"
                  )
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  rounded-xl
                  hover:bg-pink-50
                  text-gray-700
                  flex
                  items-center
                  gap-3
                "
              >

                <Settings size={17} />

                <span>
                  Settings
                </span>

              </button>

            </>
          )}

          {/* =================================================
              DELIVERY BOY
          ================================================= */}

          {isDeliveryBoy && (
            <>

              <div
                className="
                  px-4
                  py-2
                  mb-1
                "
              >

                <p className="text-xs text-gray-400">
                  Signed in as
                </p>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-gray-800
                    truncate
                  "
                >
                  {userInfo?.email ||
                    "Delivery Boy"}
                </p>

              </div>

              <button
                onClick={() =>
                  handleNavigate(
                    "/delivery-boy/dashboard"
                  )
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  rounded-xl
                  hover:bg-green-50
                  text-gray-700
                  flex
                  items-center
                  gap-3
                "
              >

                <span>📊</span>

                <span>
                  Dashboard
                </span>

              </button>

              <button
                onClick={() =>
                  handleNavigate(
                    "/delivery-boy/profile"
                  )
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  rounded-xl
                  hover:bg-green-50
                  text-gray-700
                  flex
                  items-center
                  gap-3
                "
              >

                <Bike size={17} />

                <span>
                  My Profile
                </span>

              </button>

              <button
                onClick={() =>
                  handleNavigate(
                    "/delivery-boy/settings"
                  )
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2.5
                  rounded-xl
                  hover:bg-green-50
                  text-gray-700
                  flex
                  items-center
                  gap-3
                "
              >

                <Settings size={17} />

                <span>
                  Settings
                </span>

              </button>

            </>
          )}

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="border-t border-gray-100 my-2" />

          {/* =================================================
              LOGOUT
          ================================================= */}

          <button
            onClick={handleLogout}
            className="
              w-full
              text-left
              px-4
              py-2.5
              rounded-xl
              text-red-500
              hover:bg-red-50
              transition
              flex
              items-center
              gap-3
            "
          >

            <LogOut size={17} />

            <span>
              Logout
            </span>

          </button>

        </div>

      )}

    </div>
  );
};
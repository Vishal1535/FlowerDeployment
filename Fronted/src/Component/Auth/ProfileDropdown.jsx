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
          px-2.5
          sm:px-4
          py-2
          rounded-full
          text-gray-700
          hover:bg-gray-100
          transition
          flex
          items-center
          gap-1.5
          sm:gap-2
          max-w-[150px]
          sm:max-w-none
        "
      >

        <User
          size={17}
          className="sm:w-[18px] sm:h-[18px] shrink-0"
        />

        <span className="hidden sm:inline truncate text-sm sm:text-base">
          {userInfo?.name || "Profile"}
        </span>

        <ChevronDown
          size={15}
          className={`
            sm:w-4
            sm:h-4
            shrink-0
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
            top-11
            sm:top-12
            w-[calc(100vw-24px)]
            max-w-56
            bg-white
            rounded-xl
            sm:rounded-2xl
            shadow-xl
            border
            border-gray-100
            p-1.5
            sm:p-2
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
                  px-3
                  sm:px-4
                  py-2.5
                  rounded-lg
                  sm:rounded-xl
                  hover:bg-gray-50
                  text-gray-700
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  text-sm
                  sm:text-base
                "
              >

                <User
                  size={16}
                  className="sm:w-[17px] sm:h-[17px] shrink-0"
                />

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
                  px-3
                  sm:px-4
                  py-2.5
                  rounded-lg
                  sm:rounded-xl
                  hover:bg-gray-50
                  text-gray-700
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  text-sm
                  sm:text-base
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
                  px-3
                  sm:px-4
                  py-2.5
                  rounded-lg
                  sm:rounded-xl
                  hover:bg-gray-50
                  text-gray-700
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  text-sm
                  sm:text-base
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
                  px-3
                  sm:px-4
                  py-2.5
                  rounded-lg
                  sm:rounded-xl
                  hover:bg-gray-50
                  text-gray-700
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  text-sm
                  sm:text-base
                "
              >

                <Settings
                  size={16}
                  className="sm:w-[17px] sm:h-[17px] shrink-0"
                />

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
                  px-3
                  sm:px-4
                  py-2
                  mb-1
                "
              >

                <p className="text-[11px] sm:text-xs text-gray-400">
                  Signed in as
                </p>

                <p
                  className="
                    text-xs
                    sm:text-sm
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
                    "/settings"
                  )
                }
                className="
                  w-full
                  text-left
                  px-3
                  sm:px-4
                  py-2.5
                  rounded-lg
                  sm:rounded-xl
                  hover:bg-pink-50
                  text-gray-700
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  text-sm
                  sm:text-base
                "
              >

                <Settings
                  size={16}
                  className="sm:w-[17px] sm:h-[17px] shrink-0"
                />

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
                  px-3
                  sm:px-4
                  py-2
                  mb-1
                "
              >

                <p className="text-[11px] sm:text-xs text-gray-400">
                  Signed in as
                </p>

                <p
                  className="
                    text-xs
                    sm:text-sm
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
                  px-3
                  sm:px-4
                  py-2.5
                  rounded-lg
                  sm:rounded-xl
                  hover:bg-green-50
                  text-gray-700
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  text-sm
                  sm:text-base
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
                    "/profile"
                  )
                }
                className="
                  w-full
                  text-left
                  px-3
                  sm:px-4
                  py-2.5
                  rounded-lg
                  sm:rounded-xl
                  hover:bg-green-50
                  text-gray-700
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  text-sm
                  sm:text-base
                "
              >

                <Bike
                  size={16}
                  className="sm:w-[17px] sm:h-[17px] shrink-0"
                />

                <span>
                  My Profile
                </span>

              </button>

              <button
                onClick={() =>
                  handleNavigate(
                    "/settings"
                  )
                }
                className="
                  w-full
                  text-left
                  px-3
                  sm:px-4
                  py-2.5
                  rounded-lg
                  sm:rounded-xl
                  hover:bg-green-50
                  text-gray-700
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  text-sm
                  sm:text-base
                "
              >

                <Settings
                  size={16}
                  className="sm:w-[17px] sm:h-[17px] shrink-0"
                />

                <span>
                  Settings
                </span>

              </button>

            </>
          )}

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="border-t border-gray-100 my-1.5 sm:my-2" />

          {/* =================================================
              LOGOUT
          ================================================= */}

          <button
            onClick={handleLogout}
            className="
              w-full
              text-left
              px-3
              sm:px-4
              py-2.5
              rounded-lg
              sm:rounded-xl
              text-red-500
              hover:bg-red-50
              transition
              flex
              items-center
              gap-2.5
              sm:gap-3
              text-sm
              sm:text-base
            "
          >

            <LogOut
              size={16}
              className="sm:w-[17px] sm:h-[17px] shrink-0"
            />

            <span>
              Logout
            </span>

          </button>

        </div>

      )}

    </div>
  );
};
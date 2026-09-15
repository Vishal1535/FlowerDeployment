import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const LoginPopUp = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const { isAuthorized } = useSelector(
    (state) => state.user
  );

  // ==============================
  // SHOW POPUP AFTER 1 MINUTE
  // ==============================

  useEffect(() => {
    // User already login hai toh popup nahi dikhana
    if (isAuthorized) {
      setShowPopup(false);
      return;
    }

    // Agar current session mein already popup show ho chuka hai
    if (
      sessionStorage.getItem("loginPopupShown") === "true"
    ) {
      return;
    }

    // 1 minute = 60000 milliseconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 60000);

    // Component unmount hone par timer clear
    return () => clearTimeout(timer);

  }, [isAuthorized]);

  // ==============================
  // CLOSE POPUP
  // ==============================

  const closePopup = () => {
    setShowPopup(false);

    sessionStorage.setItem(
      "loginPopupShown",
      "true"
    );
  };

  // ==============================
  // LOGIN
  // ==============================

  const handleLogin = () => {
    closePopup();
    navigate("/login");
  };

  // ==============================
  // REGISTER
  // ==============================

  const handleRegister = () => {
    closePopup();
    navigate("/register");
  };

  // ==============================
  // HIDE POPUP
  // ==============================

  // Login hai toh popup bilkul nahi dikhega
  if (isAuthorized || !showPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-4 py-4">

      <div
        className="
          relative
          w-full
          max-w-md
          max-h-[95vh]
          overflow-y-auto
          bg-white
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
          overflow-hidden
          animate-[popupIn_0.45s_ease-out]
        "
      >

        {/* ================= CLOSE ================= */}

        <button
          type="button"
          onClick={closePopup}
          className="
            absolute
            top-3
            right-3
            sm:top-4
            sm:right-4
            z-10
            w-8
            h-8
            sm:w-9
            sm:h-9
            rounded-full
            bg-white/90
            text-gray-500
            text-lg
            sm:text-xl
            flex
            items-center
            justify-center
            shadow-sm
            hover:bg-gray-100
            hover:text-gray-900
            hover:rotate-90
            transition-all
            duration-300
          "
        >
          ×
        </button>

        {/* ================= TOP SECTION ================= */}

        <div
          className="
            relative
            h-28
            sm:h-32
            bg-gray-100
            flex
            items-center
            justify-center
            overflow-hidden
          "
        >

          <div
            className="
              absolute
              -top-10
              -left-10
              w-28
              h-28
              sm:w-32
              sm:h-32
              rounded-full
              bg-white/70
              animate-pulse
            "
          />

          <div
            className="
              absolute
              -bottom-10
              -right-8
              w-32
              h-32
              sm:w-36
              sm:h-36
              rounded-full
              bg-white/70
            "
          />

          <div
            className="
              relative
              text-5xl
              sm:text-6xl
              animate-[float_2.5s_ease-in-out_infinite]
            "
          >
            💐
          </div>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="px-5 sm:px-7 py-6 sm:py-7 text-center">

          <p
            className="
              text-[10px]
              sm:text-xs
              font-semibold
              tracking-[2px]
              sm:tracking-[3px]
              uppercase
              text-gray-400
            "
          >
            Welcome
          </p>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
            Welcome to Flower
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-5 sm:leading-6">
            Beautiful flowers for beautiful moments.
            <br />
            Login to continue your journey.
          </p>

          {/* ================= BUTTONS ================= */}

          <div className="mt-6 sm:mt-7 space-y-3">

            <button
              type="button"
              onClick={handleLogin}
              className="
                w-full
                h-11
                sm:h-12
                rounded-xl
                bg-gray-900
                text-white
                text-sm
                sm:text-base
                font-semibold
                hover:bg-gray-800
                hover:-translate-y-0.5
                transition-all
                duration-200
              "
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleRegister}
              className="
                w-full
                h-11
                sm:h-12
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-800
                text-sm
                sm:text-base
                font-semibold
                hover:bg-gray-50
                hover:-translate-y-0.5
                transition-all
                duration-200
              "
            >
              Create an Account
            </button>

          </div>

          <p className="text-[10px] sm:text-xs text-gray-400 mt-5 sm:mt-6 leading-5">
            Fresh flowers • Beautiful moments • Easy shopping
          </p>

        </div>

      </div>

      {/* ================= ANIMATION ================= */}

      <style>
        {`
          @keyframes popupIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }

            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-8px);
            }
          }
        `}
      </style>

    </div>
  );
};
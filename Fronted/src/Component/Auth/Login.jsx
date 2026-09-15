import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff, Flower2, ArrowRight, ArrowLeft } from "lucide-react";

import toast from "react-hot-toast";

import { loginThunks } from "../../Store/AuthSlice/authApi";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthorized } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // =====================================================
  // IF ALREADY LOGGED IN
  // =====================================================

  useEffect(() => {
    if (isAuthorized) {
      navigate("/", {
        replace: true,
      });
    }
  }, [isAuthorized, navigate]);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginThunks(formData)).unwrap();

      if (response?.success) {
        toast.success("Login successful!");

        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(error || "Invalid email or password");
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-3 sm:px-4 py-6 sm:py-8">

      <div
        className="
          w-full
          max-w-5xl
          grid
          md:grid-cols-2
          shadow-xl
          rounded-2xl
          overflow-hidden
          relative
        "
      >
        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            absolute
            top-3
            left-3
            sm:top-5
            sm:left-5
            z-30
            w-9
            h-9
            sm:w-10
            sm:h-10
            rounded-full
            bg-white/90
            backdrop-blur-sm
            border
            border-gray-200
            shadow-sm
            flex
            items-center
            justify-center
            text-gray-600
            hover:text-gray-900
            hover:bg-white
            hover:scale-105
            active:scale-95
            transition-all
            duration-200
            cursor-pointer
          "
          aria-label="Go back"
        >
          <ArrowLeft
            size={18}
            className="sm:w-[19px] sm:h-[19px]"
          />
        </button>

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div
          className="
            hidden
            md:flex
            relative
            overflow-hidden
            bg-[#f5eee8]
            min-h-[550px]
            items-center
            justify-center
          "
        >
          {/* Decorative Circle */}

          <div
            className="
              absolute
              -top-20
              -left-20
              w-64
              h-64
              rounded-full
              bg-white/50
            "
          />

          <div
            className="
              absolute
              -bottom-24
              -right-20
              w-72
              h-72
              rounded-full
              bg-white/40
            "
          />

          {/* Left Content */}

          <div className="relative z-10 text-center px-8 lg:px-10">
            {/* Flower */}

            <div
              className="
                text-[90px]
                lg:text-[115px]
                leading-none
                animate-[float_3s_ease-in-out_infinite]
              "
            >
              🌷
            </div>

            {/* Heading */}

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-5">
              Welcome Back
            </h2>

            {/* Description */}

            <p
              className="
                text-gray-600
                text-sm lg:text-base
                mt-4
                leading-6 lg:leading-7
                max-w-sm
                mx-auto
              "
            >
              Your favourite flowers are waiting for you. Login and continue
              your beautiful journey.
            </p>

            {/* Features */}

            <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mt-7">
              <span
                className="
                  px-3
                  lg:px-4
                  py-2
                  rounded-full
                  bg-white/70
                  text-xs
                  lg:text-sm
                  text-gray-600
                "
              >
                🌸 Fresh Flowers
              </span>

              <span
                className="
                  px-3
                  lg:px-4
                  py-2
                  rounded-full
                  bg-white/70
                  text-xs
                  lg:text-sm
                  text-gray-600
                "
              >
                ✨ Easy Shopping
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="p-5 sm:p-7 md:p-9 lg:p-12">
          {/* ================= LOGO ================= */}

          <div
            className="
              flex
              items-center
              gap-2
              text-gray-800
              mb-6
              sm:mb-8
            "
          >
            <div
              className="
                w-9
                h-9
                sm:w-10
                sm:h-10
                rounded-xl
                bg-gray-100
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <Flower2
                size={20}
                className="sm:w-[21px] sm:h-[21px]"
              />
            </div>

            <span className="font-semibold text-base sm:text-lg">
              Flower
            </span>
          </div>

          {/* ================= HEADING ================= */}

          <div className="mb-6 sm:mb-7">
            <h1
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-gray-900
              "
            >
              Welcome back
            </h1>

            <p className="text-sm text-gray-500 mt-2 leading-5 sm:leading-normal">
              Login to continue to your account.
            </p>
          </div>

          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* ================= EMAIL ================= */}

            <div>
              <label
                className="
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="
                  input
                  input-bordered
                  w-full
                  h-11
                  sm:h-12
                  mt-2
                  rounded-xl
                  text-sm
                  sm:text-base
                  focus:outline-none
                  focus:border-gray-500
                  focus:ring-2
                  focus:ring-gray-100
                  transition-all
                "
                required
              />
            </div>

            {/* ================= PASSWORD ================= */}

            <div>
              <label
                className="
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    input
                    input-bordered
                    w-full
                    h-11
                    sm:h-12
                    pr-12
                    rounded-xl
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:border-gray-500
                    focus:ring-2
                    focus:ring-gray-100
                    transition-all
                  "
                  required
                />

                {/* Eye Button */}

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-gray-700
                    transition
                    cursor-pointer
                    p-1
                  "
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Forgot Password */}

              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="
                    text-xs
                    sm:text-sm
                    font-medium
                    text-gray-600
                    hover:text-gray-900
                    hover:underline
                    transition
                  "
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* ================= BACKEND ERROR ================= */}

            {error && (
              <p
                className="
                  text-red-500
                  text-xs
                  break-words
                  animate-[shake_0.3s_ease-in-out]
                "
              >
                {error}
              </p>
            )}

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-11
                sm:h-12
                rounded-xl
                bg-gray-900
                hover:bg-gray-800
                text-white
                text-sm
                sm:text-base
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                shadow-md
                hover:shadow-lg
                hover:-translate-y-0.5
                active:translate-y-0
                transition-all
                duration-200
                disabled:opacity-60
                disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Login
                  <ArrowRight
                    size={17}
                    className="sm:w-[18px] sm:h-[18px]"
                  />
                </>
              )}
            </button>
          </form>

          {/* ================= REGISTER ================= */}

          <div className="text-center mt-6 sm:mt-7">
            <p className="text-xs sm:text-sm text-gray-500 leading-5">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="
                  font-semibold
                  text-gray-900
                  hover:underline
                "
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
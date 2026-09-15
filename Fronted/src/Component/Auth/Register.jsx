import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff, Flower2, ArrowRight, ArrowLeft } from "lucide-react";

import toast from "react-hot-toast";

import { registerThunks } from "../../Store/AuthSlice/authApi";

export const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // Name

    if (!name) {
      toast.error("Please enter your full name");
      return false;
    }

    if (name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error("Name can contain only alphabets");
      return false;
    }

    // Phone

    if (!phone) {
      toast.error("Please enter your phone number");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    // Email

    if (!email) {
      toast.error("Please enter your email");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    // Password

    if (!password) {
      toast.error("Please enter a password");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    // Confirm password

    if (!confirmPassword) {
      toast.error("Please confirm your password");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;

      const response = await dispatch(
        registerThunks({
          ...registerData,
          name: registerData.name.trim(),
          phone: registerData.phone.trim(),
          email: registerData.email.trim(),
        })
      ).unwrap();

      if (response?.success) {
        sessionStorage.setItem(
          "emailStoreForOtp",
          formData.email.trim()
        );

        toast.success("OTP sent to your email");

        navigate("/register-otp", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Register Error:", error);

      toast.error(
        error || "Registration failed. Please try again."
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] flex items-center justify-center px-3 sm:px-4 py-5 sm:py-8">
      <div
        className="
          w-full
          max-w-5xl
          bg-white
          rounded-2xl
          sm:rounded-[28px]
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          overflow-hidden
          grid
          md:grid-cols-2
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
            size={17}
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
            min-h-[600px]
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

          {/* Flower Animation */}

          <div className="relative z-10 text-center px-8 lg:px-10">
            <div
              className="
                text-[90px]
                lg:text-[120px]
                leading-none
                animate-bounce
              "
            >
              💐
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-5">
              Welcome to Flower
            </h2>

            <p className="text-gray-600 mt-4 leading-7 max-w-sm mx-auto">
              Discover beautiful bouquets and make every special moment a little
              more memorable.
            </p>

            <div className="flex justify-center gap-2 lg:gap-3 mt-7 flex-wrap">
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
                Fresh Flowers
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
                Easy Shopping
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="p-5 sm:p-7 md:p-9 lg:p-10">
          {/* Heading */}

          <div className="mb-5 sm:mb-6">
            <div
              className="
                flex
                items-center
                gap-2
                text-gray-800
                mb-2.5
                sm:mb-3
              "
            >
              <div
                className="
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-lg
                  sm:rounded-xl
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Flower2
                  size={18}
                  className="sm:w-5 sm:h-5"
                />
              </div>

              <span className="font-semibold text-sm sm:text-base">
                Flower
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Create your account
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-5 sm:leading-normal">
              Start your beautiful journey with us.
            </p>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-3.5"
          >
            {/* Name + Phone */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[A-Za-z ]*$/.test(value)) {
                    handleChange(e);
                  }
                }}
                className="
                  input
                  input-bordered
                  w-full
                  h-11
                  sm:h-12
                  rounded-xl
                  text-sm
                  sm:text-base
                  focus:outline-none
                  focus:border-gray-500
                  transition
                "
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^\d*$/.test(value)) {
                    handleChange(e);
                  }
                }}
                maxLength={10}
                className="
                  input
                  input-bordered
                  w-full
                  h-11
                  sm:h-12
                  rounded-xl
                  text-sm
                  sm:text-base
                  focus:outline-none
                  focus:border-gray-500
                  transition
                "
                required
              />
            </div>

            {/* Email */}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="
                input
                input-bordered
                w-full
                h-11
                sm:h-12
                rounded-xl
                text-sm
                sm:text-base
                focus:outline-none
                focus:border-gray-500
                transition
              "
              required
            />

            {/* Password */}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="
                  input
                  input-bordered
                  w-full
                  h-11
                  sm:h-12
                  pr-11
                  sm:pr-12
                  rounded-xl
                  text-sm
                  sm:text-base
                  focus:outline-none
                  focus:border-gray-500
                  transition
                "
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="
                  absolute
                  right-2.5
                  sm:right-3
                  top-1/2
                  -translate-y-1/2
                  p-1
                  text-gray-400
                  hover:text-gray-700
                  transition
                  cursor-pointer
                "
              >
                {showPassword ? (
                  <EyeOff
                    size={17}
                    className="sm:w-[18px] sm:h-[18px]"
                  />
                ) : (
                  <Eye
                    size={17}
                    className="sm:w-[18px] sm:h-[18px]"
                  />
                )}
              </button>
            </div>

            {/* Confirm Password */}

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="
                  input
                  input-bordered
                  w-full
                  h-11
                  sm:h-12
                  pr-11
                  sm:pr-12
                  rounded-xl
                  text-sm
                  sm:text-base
                  focus:outline-none
                  focus:border-gray-500
                  transition
                "
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                className="
                  absolute
                  right-2.5
                  sm:right-3
                  top-1/2
                  -translate-y-1/2
                  p-1
                  text-gray-400
                  hover:text-gray-700
                  transition
                  cursor-pointer
                "
              >
                {showConfirmPassword ? (
                  <EyeOff
                    size={17}
                    className="sm:w-[18px] sm:h-[18px]"
                  />
                ) : (
                  <Eye
                    size={17}
                    className="sm:w-[18px] sm:h-[18px]"
                  />
                )}
              </button>
            </div>

            {/* Backend Error */}

            {error && (
              <p className="text-red-500 text-xs break-words">
                {error}
              </p>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
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
                flex
                items-center
                justify-center
                gap-1.5
                sm:gap-2
                hover:bg-gray-800
                hover:-translate-y-0.5
                active:translate-y-0
                transition-all
                duration-200
                disabled:opacity-60
                cursor-pointer
              "
            >
              {loading ? (
                "Sending OTP..."
              ) : (
                <>
                  Create Account

                  <ArrowRight
                    size={17}
                    className="sm:w-[18px] sm:h-[18px]"
                  />
                </>
              )}
            </button>
          </form>

          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="text-center mt-5 sm:mt-6">
            <p className="text-xs sm:text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="
                  font-semibold
                  text-gray-900
                  hover:underline
                "
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
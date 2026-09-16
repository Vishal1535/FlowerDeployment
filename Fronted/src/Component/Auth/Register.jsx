import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
  Flower2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

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
    <div
      className="
        min-h-screen
        w-full
        flex
        items-center
        justify-center

        bg-gradient-to-br
        from-[#fffafa]
        via-white
        to-[#fff5f7]

        px-3
        sm:px-5
        py-6
        sm:py-10
      "
    >
      <div
        className="
          relative
          w-full
          max-w-5xl

          grid
          md:grid-cols-2

          overflow-hidden

          rounded-3xl

          bg-white

          border
          border-gray-100

          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        "
      >
        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="
            absolute
            top-4
            left-4
            sm:top-5
            sm:left-5

            z-30

            w-10
            h-10
            sm:w-11
            sm:h-11

            rounded-full

            bg-white

            border
            border-gray-200

            text-gray-600

            flex
            items-center
            justify-center

            shadow-sm

            hover:bg-gray-50
            hover:text-gray-900
            hover:border-gray-300
            hover:shadow-md

            active:scale-95

            transition-all
            duration-200

            cursor-pointer
          "
        >
          <ArrowLeft
            size={19}
            strokeWidth={2}
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

            bg-[#fff3f4]

            min-h-[610px]

            items-center
            justify-center
          "
        >
          {/* Decorative Circle */}

          <div
            className="
              absolute
              -top-24
              -left-24

              w-72
              h-72

              rounded-full

              bg-white/70
            "
          />

          <div
            className="
              absolute
              -bottom-28
              -right-24

              w-80
              h-80

              rounded-full

              bg-white/60
            "
          />

          <div
            className="
              absolute
              top-1/2
              left-1/2

              -translate-x-1/2
              -translate-y-1/2

              w-80
              h-80

              rounded-full

              border
              border-white/70
            "
          />

          {/* Left Content */}

          <div
            className="
              relative
              z-10

              text-center

              px-8
              lg:px-12
            "
          >
            {/* Flower */}

            <div
              className="
                text-[90px]
                lg:text-[110px]

                leading-none

                animate-[float_3s_ease-in-out_infinite]
              "
            >
              💐
            </div>

            {/* Heading */}

            <h2
              className="
                text-3xl
                lg:text-4xl

                font-bold

                text-gray-900

                mt-6
              "
            >
              Welcome to Flower
            </h2>

            {/* Description */}

            <p
              className="
                text-gray-600

                text-sm
                lg:text-base

                mt-4

                leading-6
                lg:leading-7

                max-w-sm

                mx-auto
              "
            >
              Discover beautiful bouquets and make every special
              moment a little more memorable.
            </p>

            {/* Features */}

            <div
              className="
                flex
                flex-wrap

                justify-center

                gap-2
                lg:gap-3

                mt-8
              "
            >
              <span
                className="
                  px-4
                  py-2

                  rounded-full

                  bg-white

                  border
                  border-white

                  shadow-sm

                  text-xs
                  lg:text-sm

                  text-gray-600
                "
              >
                🌸 Fresh Flowers
              </span>

              <span
                className="
                  px-4
                  py-2

                  rounded-full

                  bg-white

                  border
                  border-white

                  shadow-sm

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

        <div
          className="
            w-full

            bg-white

            px-5
            py-16

            sm:px-8
            sm:py-12

            md:px-10

            lg:px-14
            xl:px-16
          "
        >
          {/* ================= LOGO ================= */}

          <div
            className="
              flex
              items-center

              gap-2.5

              text-gray-900

              mb-6
              sm:mb-7
            "
          >
            <div
              className="
                w-10
                h-10

                rounded-xl

                bg-pink-50

                border
                border-pink-100

                flex
                items-center
                justify-center

                shrink-0
              "
            >
              <Flower2
                size={21}
                className="text-pink-500"
                strokeWidth={2}
              />
            </div>

            <span
              className="
                font-bold
                text-lg

                text-gray-900
              "
            >
              Flower
            </span>
          </div>

          {/* ================= HEADING ================= */}

          <div className="mb-7 sm:mb-8">
            <h1
              className="
                text-[28px]
                sm:text-3xl
                lg:text-4xl

                font-bold

                tracking-tight

                text-gray-900

                leading-tight
              "
            >
              Create your account
            </h1>

            <p
              className="
                text-sm
                sm:text-base

                text-gray-500

                mt-2
              "
            >
              Start your beautiful journey with us.
            </p>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
          >
            {/* ================= NAME + PHONE ================= */}

            <div
              className="
                grid
                grid-cols-1
                min-[430px]:grid-cols-2

                gap-3
              "
            >
              {/* Name */}

              <div>
                <label
                  htmlFor="name"
                  className="
                    block

                    text-sm
                    font-semibold

                    text-gray-700

                    mb-2
                  "
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^[A-Za-z ]*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  className="
                    w-full

                    h-12
                    sm:h-[52px]

                    px-4

                    rounded-xl

                    bg-white

                    text-gray-900

                    border
                    border-gray-200

                    placeholder:text-gray-400

                    text-sm
                    sm:text-base

                    shadow-sm

                    outline-none

                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50

                    hover:border-gray-300

                    transition-all
                    duration-200
                  "
                  required
                />
              </div>

              {/* Phone */}

              <div>
                <label
                  htmlFor="phone"
                  className="
                    block

                    text-sm
                    font-semibold

                    text-gray-700

                    mb-2
                  "
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^\d*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  maxLength={10}
                  className="
                    w-full

                    h-12
                    sm:h-[52px]

                    px-4

                    rounded-xl

                    bg-white

                    text-gray-900

                    border
                    border-gray-200

                    placeholder:text-gray-400

                    text-sm
                    sm:text-base

                    shadow-sm

                    outline-none

                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50

                    hover:border-gray-300

                    transition-all
                    duration-200
                  "
                  required
                />
              </div>
            </div>

            {/* ================= EMAIL ================= */}

            <div>
              <label
                htmlFor="email"
                className="
                  block

                  text-sm
                  font-semibold

                  text-gray-700

                  mb-2
                "
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="
                  w-full

                  h-12
                  sm:h-[52px]

                  px-4

                  rounded-xl

                  bg-white

                  text-gray-900

                  border
                  border-gray-200

                  placeholder:text-gray-400

                  text-sm
                  sm:text-base

                  shadow-sm

                  outline-none

                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50

                  hover:border-gray-300

                  transition-all
                  duration-200
                "
                required
              />
            </div>

            {/* ================= PASSWORD ================= */}

            <div>
              <label
                htmlFor="password"
                className="
                  block

                  text-sm
                  font-semibold

                  text-gray-700

                  mb-2
                "
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    w-full

                    h-12
                    sm:h-[52px]

                    px-4
                    pr-12

                    rounded-xl

                    bg-white

                    text-gray-900

                    border
                    border-gray-200

                    placeholder:text-gray-400

                    text-sm
                    sm:text-base

                    shadow-sm

                    outline-none

                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50

                    hover:border-gray-300

                    transition-all
                    duration-200
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute

                    right-3

                    top-1/2
                    -translate-y-1/2

                    w-9
                    h-9

                    rounded-lg

                    flex
                    items-center
                    justify-center

                    text-gray-400

                    hover:bg-gray-50
                    hover:text-gray-700

                    transition

                    cursor-pointer
                  "
                >
                  {showPassword ? (
                    <EyeOff
                      size={19}
                      strokeWidth={2}
                    />
                  ) : (
                    <Eye
                      size={19}
                      strokeWidth={2}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* ================= CONFIRM PASSWORD ================= */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="
                  block

                  text-sm
                  font-semibold

                  text-gray-700

                  mb-2
                "
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="
                    w-full

                    h-12
                    sm:h-[52px]

                    px-4
                    pr-12

                    rounded-xl

                    bg-white

                    text-gray-900

                    border
                    border-gray-200

                    placeholder:text-gray-400

                    text-sm
                    sm:text-base

                    shadow-sm

                    outline-none

                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50

                    hover:border-gray-300

                    transition-all
                    duration-200
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="
                    absolute

                    right-3

                    top-1/2
                    -translate-y-1/2

                    w-9
                    h-9

                    rounded-lg

                    flex
                    items-center
                    justify-center

                    text-gray-400

                    hover:bg-gray-50
                    hover:text-gray-700

                    transition

                    cursor-pointer
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      size={19}
                      strokeWidth={2}
                    />
                  ) : (
                    <Eye
                      size={19}
                      strokeWidth={2}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* ================= BACKEND ERROR ================= */}

            {error && (
              <div
                className="
                  rounded-xl

                  border
                  border-red-100

                  bg-red-50

                  px-3
                  py-2.5
                "
              >
                <p
                  className="
                    text-red-500

                    text-xs
                    sm:text-sm

                    break-words
                  "
                >
                  {error}
                </p>
              </div>
            )}

            {/* ================= SUBMIT ================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full

                h-12
                sm:h-[52px]

                rounded-xl

                bg-pink-500
                hover:bg-pink-600

                text-white

                text-sm
                sm:text-base

                font-bold

                flex
                items-center
                justify-center

                gap-2

                shadow-sm

                hover:shadow-lg
                hover:shadow-pink-100

                hover:-translate-y-0.5

                active:translate-y-0
                active:scale-[0.99]

                transition-all
                duration-200

                disabled:bg-gray-300
                disabled:text-gray-500
                disabled:shadow-none
                disabled:translate-y-0

                disabled:cursor-not-allowed

                cursor-pointer
              "
            >
              {loading ? (
                "Sending OTP..."
              ) : (
                <>
                  <span>Create Account</span>

                  <ArrowRight
                    size={18}
                    strokeWidth={2.2}
                  />
                </>
              )}
            </button>
          </form>

          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="text-center mt-7 sm:mt-8">
            <p
              className="
                text-xs
                sm:text-sm

                text-gray-500
              "
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="
                  font-bold

                  text-gray-900

                  hover:text-pink-500

                  transition-colors
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
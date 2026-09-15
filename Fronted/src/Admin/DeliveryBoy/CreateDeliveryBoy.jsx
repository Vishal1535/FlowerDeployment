import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, X, Bike, Mail, Phone, User } from "lucide-react";
import toast from "react-hot-toast";

import { createDeliveryBoyThunk } from "../../Store/Admin/DeliveryBoy/DeliveryApi";

import {
  closeCreateDeliveryPopup,
  clearDeliveryBoyError,
} from "../../Store/Admin/DeliveryBoy/DeliverySlice";

export const CreateDeliveryBoy = () => {
  const dispatch = useDispatch();

  // =====================================================
  // REDUX
  // =====================================================

  const {
    isCreateDeliveryPopupOpen,
    loading,
    error,
  } = useSelector(
    (state) => state.DeliveryBoyManagement
  );

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicleType: "bike",
    vehicleNumber: "",
  });

  // =====================================================
  // PASSWORD VISIBILITY
  // =====================================================

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const handleClose = () => {
    dispatch(closeCreateDeliveryPopup());

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      vehicleType: "bike",
      vehicleNumber: "",
    });

    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      dispatch(clearDeliveryBoyError());
    }
  };

  // =====================================================
  // FORM VALIDATION
  // =====================================================

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const vehicleNumber =
      formData.vehicleNumber.trim();

    // NAME
    if (!name) {
      toast.error("Please enter delivery boy name");
      return false;
    }

    if (name.length < 2) {
      toast.error(
        "Name must be at least 2 characters"
      );
      return false;
    }

    // EMAIL
    if (!email) {
      toast.error("Please enter email address");
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // PHONE
    if (!phone) {
      toast.error("Please enter phone number");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      toast.error(
        "Phone number must be exactly 10 digits"
      );
      return false;
    }

    // PASSWORD
    if (!password) {
      toast.error("Please enter password");
      return false;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return false;
    }

    // CONFIRM PASSWORD
    if (!confirmPassword) {
      toast.error("Please confirm password");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    // VEHICLE NUMBER
    if (vehicleNumber) {
      if (vehicleNumber.length < 4) {
        toast.error(
          "Please enter a valid vehicle number"
        );
        return false;
      }
    }

    return true;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // ===================================================
    // REMOVE CONFIRM PASSWORD
    // ===================================================

    const {
      confirmPassword,
      ...createData
    } = formData;

    try {
      const result = await dispatch(
        createDeliveryBoyThunk(createData)
      ).unwrap();

      toast.success(
        result?.message ||
          "Delivery boy created successfully"
      );

      handleClose();
    } catch (error) {
      toast.error(
        error || "Failed to create delivery boy"
      );
    }
  };

  // =====================================================
  // IF POPUP CLOSED
  // =====================================================

  if (!isCreateDeliveryPopupOpen) {
    return null;
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/30
        backdrop-blur-sm
        px-4
        py-6
      "
    >
      {/* =================================================
          POPUP
      ================================================= */}

      <div
        className="
          relative
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-3xl
          shadow-2xl
          border
          border-pink-100
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            sticky
            top-0
            z-10
            bg-white
            border-b
            border-gray-100
            px-6
            py-5
          "
        >
          <div className="flex items-center justify-between">
            {/* LEFT */}

            <div className="flex items-center gap-4">
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-pink-100
                  text-pink-600
                  flex
                  items-center
                  justify-center
                "
              >
                <Bike size={25} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Add Delivery Boy
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Create a new delivery team member
                </p>
              </div>
            </div>

            {/* CLOSE */}

            <button
              type="button"
              onClick={handleClose}
              className="
                w-9
                h-9
                rounded-full
                flex
                items-center
                justify-center
                text-gray-500
                hover:bg-red-50
                hover:text-red-500
                transition
              "
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* NAME */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <User
                    size={17}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-3
                      border
                      border-gray-200
                      rounded-xl
                      outline-none
                      text-sm
                      text-gray-700
                      focus:border-pink-400
                      focus:ring-4
                      focus:ring-pink-50
                      transition
                    "
                    required
                  />
                </div>
              </div>

              {/* PHONE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const value =
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);

                      setFormData((prev) => ({
                        ...prev,
                        phone: value,
                      }));
                    }}
                    placeholder="10 digit phone number"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-3
                      border
                      border-gray-200
                      rounded-xl
                      outline-none
                      text-sm
                      text-gray-700
                      focus:border-pink-400
                      focus:ring-4
                      focus:ring-pink-50
                      transition
                    "
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="deliveryboy@example.com"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-3
                      border
                      border-gray-200
                      rounded-xl
                      outline-none
                      text-sm
                      text-gray-700
                      focus:border-pink-400
                      focus:ring-4
                      focus:ring-pink-50
                      transition
                    "
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              LOGIN INFORMATION
          ================================================= */}

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Login Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* PASSWORD */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className="
                      w-full
                      h-11
                      px-3
                      pr-11
                      border
                      border-gray-200
                      rounded-xl
                      outline-none
                      text-sm
                      text-gray-700
                      focus:border-pink-400
                      focus:ring-4
                      focus:ring-pink-50
                      transition
                    "
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-pink-600
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="
                      w-full
                      h-11
                      px-3
                      pr-11
                      border
                      border-gray-200
                      rounded-xl
                      outline-none
                      text-sm
                      text-gray-700
                      focus:border-pink-400
                      focus:ring-4
                      focus:ring-pink-50
                      transition
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
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-pink-600
                    "
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              VEHICLE INFORMATION
          ================================================= */}

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Vehicle Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* VEHICLE TYPE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Vehicle Type
                </label>

                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="
                    w-full
                    h-11
                    px-3
                    border
                    border-gray-200
                    rounded-xl
                    outline-none
                    text-sm
                    text-gray-700
                    bg-white
                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50
                    transition
                  "
                >
                  <option value="bike">
                    Bike
                  </option>

                  <option value="scooter">
                    Scooter
                  </option>

                  <option value="car">
                    Car
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              {/* VEHICLE NUMBER */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Vehicle Number
                </label>

                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="e.g. MH 01 AB 1234"
                  className="
                    w-full
                    h-11
                    px-3
                    border
                    border-gray-200
                    rounded-xl
                    outline-none
                    text-sm
                    text-gray-700
                    uppercase
                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50
                    transition
                  "
                />
              </div>
            </div>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="
                px-4
                py-3
                rounded-xl
                bg-red-50
                border
                border-red-100
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              sm:justify-end
              gap-3
              pt-3
              border-t
              border-gray-100
            "
          >
            {/* CANCEL */}

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-gray-200
                text-gray-600
                font-medium
                hover:bg-gray-50
                transition
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            {/* CREATE */}

            <button
              type="submit"
              disabled={loading}
              className="
                px-6
                py-2.5
                rounded-xl
                bg-pink-500
                hover:bg-pink-600
                text-white
                font-semibold
                shadow-sm
                hover:shadow-md
                transition
                flex
                items-center
                justify-center
                gap-2
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating...
                </>
              ) : (
                <>
                  <Bike size={18} />
                  Create Delivery Boy
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
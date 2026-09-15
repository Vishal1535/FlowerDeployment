import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, User, Mail, Phone, Bike, Hash, Save, Loader2 } from "lucide-react";

import { updateDeliveryBoyThunk } from "../../Store/Admin/DeliveryBoy/DeliveryApi";
import { closeEditDeliveryPopup } from "../../Store/Admin/DeliveryBoy/DeliverySlice";
import toast from "react-hot-toast";

export const EditDeliveryBoy = () => {
  const dispatch = useDispatch();

  const { selectedDeliveryBoy, isEditDeliveryPopupOpen, loading, error } =
    useSelector((state) => state.DeliveryBoyManagement);

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicleType: "bike",
    vehicleNumber: "",
  });

  const [validationError, setValidationError] = useState("");

  // =====================================================
  // SET SELECTED DELIVERY BOY DATA
  // =====================================================

  useEffect(() => {
    if (selectedDeliveryBoy) {
      setFormData({
        name: selectedDeliveryBoy?.name || "",
        phone: selectedDeliveryBoy?.phone || "",
        vehicleType: selectedDeliveryBoy?.vehicleType || "bike",
        vehicleNumber: selectedDeliveryBoy?.vehicleNumber || "",
      });

      setValidationError("");
    }
  }, [selectedDeliveryBoy]);

  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const handleClose = () => {
    if (loading) return;

    dispatch(closeEditDeliveryPopup());
    setValidationError("");
  };

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationError("");
  };

  // =====================================================
  // SUBMIT
  // =====================================================

 const handleSubmit = async (e) => {
  e.preventDefault();

  // ===================================================
  // VALIDATION
  // ===================================================

  if (!formData.name.trim()) {
    setValidationError("Name is required");
    return;
  }

  if (!formData.phone.trim()) {
    setValidationError("Phone number is required");
    return;
  }

  if (formData.phone.trim().length < 10) {
    setValidationError("Please enter a valid phone number");
    return;
  }

  if (!formData.vehicleType) {
    setValidationError("Vehicle type is required");
    return;
  }

  if (!selectedDeliveryBoy?._id) {
    setValidationError("Delivery boy ID not found");
    return;
  }

  // ===================================================
  // DATA
  // ===================================================

  const updateData = {
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    vehicleType: formData.vehicleType,
    vehicleNumber: formData.vehicleNumber.trim(),
  };

  // ===================================================
  // UPDATE
  // ===================================================

  const result = await dispatch(
    updateDeliveryBoyThunk({
      id: selectedDeliveryBoy._id,
      data: updateData,
    })
  );

  // ===================================================
  // SUCCESS
  // ===================================================

  if (updateDeliveryBoyThunk.fulfilled.match(result)) {
    toast.success(
      result.payload?.message ||
        "Delivery boy updated successfully!"
    );

    dispatch(closeEditDeliveryPopup());
  }

  // ===================================================
  // ERROR
  // ===================================================

  else {
    toast.error(
      result.payload ||
        "Failed to update delivery boy"
    );
  }
};

  // =====================================================
  // POPUP CLOSED
  // =====================================================

  if (!isEditDeliveryPopupOpen || !selectedDeliveryBoy) {
    return null;
  }

  const email = selectedDeliveryBoy?.user?.email || "";

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        px-4
        py-6
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      {/* =====================================================
          MODAL
      ===================================================== */}

      <div
        className="
          w-full
          max-w-lg
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-3xl
          shadow-2xl
          border
          border-pink-100
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            sticky
            top-0
            z-10
            bg-white
            px-5
            sm:px-6
            py-5
            border-b
            border-gray-100
            flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-pink-100
                text-pink-600
                flex
                items-center
                justify-center
              "
            >
              <User size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Edit Delivery Boy
              </h2>

              <p className="text-sm text-gray-500 mt-0.5">
                Update delivery boy information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              w-9
              h-9
              rounded-xl
              flex
              items-center
              justify-center
              text-gray-400
              hover:bg-gray-100
              hover:text-gray-700
              transition
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* =================================================
              NAME
          ================================================= */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <User
                size={18}
                className="
                  absolute
                  left-3.5
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
                  h-12
                  pl-11
                  pr-4
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  text-gray-800
                  outline-none
                  focus:bg-white
                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50
                  transition
                "
              />
            </div>
          </div>

          {/* =================================================
              EMAIL
          ================================================= */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="email"
                value={email}
                disabled
                className="
                  w-full
                  h-12
                  pl-11
                  pr-4
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-100
                  text-gray-500
                  cursor-not-allowed
                "
              />
            </div>

            <p className="text-xs text-gray-400 mt-1.5">
              Email address cannot be changed here.
            </p>
          </div>

          {/* =================================================
              PHONE
          ================================================= */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="
                  w-full
                  h-12
                  pl-11
                  pr-4
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  text-gray-800
                  outline-none
                  focus:bg-white
                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50
                  transition
                "
              />
            </div>
          </div>

          {/* =================================================
              VEHICLE TYPE
          ================================================= */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vehicle Type <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Bike
                size={18}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  pointer-events-none
                "
              />

              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="
    w-full
    h-12
    pl-11
    pr-4
    rounded-xl
    border
    border-gray-200
    bg-gray-50
    text-gray-800
    outline-none
    focus:bg-white
    focus:border-pink-400
    focus:ring-4
    focus:ring-pink-50
    transition
    appearance-none
  "
              >
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="cycle">Cycle</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* =================================================
              VEHICLE NUMBER
          ================================================= */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vehicle Number
            </label>

            <div className="relative">
              <Hash
                size={18}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="e.g. MH 01 AB 1234"
                className="
                  w-full
                  h-12
                  pl-11
                  pr-4
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  text-gray-800
                  outline-none
                  focus:bg-white
                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50
                  transition
                  uppercase
                "
              />
            </div>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {(validationError || error) && (
            <div
              className="
                p-3.5
                rounded-xl
                bg-red-50
                border
                border-red-100
                text-red-600
                text-sm
              "
            >
              {validationError || error}
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
              gap-3
              pt-3
              border-t
              border-gray-100
            "
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                w-full
                sm:flex-1
                h-12
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-600
                font-semibold
                hover:bg-gray-50
                transition
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                sm:flex-1
                h-12
                rounded-xl
                bg-pink-500
                hover:bg-pink-600
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                shadow-sm
                hover:shadow-md
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Delivery Boy
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

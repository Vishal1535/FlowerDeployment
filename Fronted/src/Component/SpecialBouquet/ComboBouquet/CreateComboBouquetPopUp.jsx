import React, { useEffect, useState } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  closeCreateComboBouquetPopup,
  clearComboBouquetError,
  clearComboBouquetMessage,
  clearComboBouquetSuccess,
} from "../../../Store/ComboBouquet/ComboBouquetSlice";

import {
  CreateComboBouquetThunk,
} from "../../../Store/ComboBouquet/ComboBouquetApi";

export const CreateComboBouquetPopUp = () => {
  const dispatch = useDispatch();

  const {
    isCreateComboBouquetPopupOpen,
    loading,
    success,
    error,
    message,
  } = useSelector((state) => state.comboBouquet);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    occasion: "",
    category: "",
    stock: "",
    isAvailable: true,
  });

  // ================= RESET FORM =================

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      occasion: "",
      category: "",
      stock: "",
      isAvailable: true,
    });
  };

  // ================= HANDLE CHANGE =================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= SUCCESS TOAST =================

  useEffect(() => {
    if (success && message) {
      toast.success(message);

      dispatch(closeCreateComboBouquetPopup());

      resetForm();

      dispatch(clearComboBouquetSuccess());
      dispatch(clearComboBouquetMessage());
    }
  }, [success, message, dispatch]);

  // ================= ERROR TOAST =================

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearComboBouquetError());
    }
  }, [error, dispatch]);

  // ================= CLOSE POPUP =================

  const handleClose = () => {
    if (loading) return;

    dispatch(closeCreateComboBouquetPopup());

    resetForm();
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.image.trim() ||
      !formData.occasion.trim() ||
      !formData.category.trim() ||
      !formData.stock
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (Number(formData.price) < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    if (Number(formData.stock) < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    dispatch(
      CreateComboBouquetThunk({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        image: formData.image.trim(),
        occasion: formData.occasion.trim(),
        category: formData.category.trim(),
        stock: Number(formData.stock),
        isAvailable: formData.isAvailable,
      })
    );
  };

  // ================= POPUP =================

  if (!isCreateComboBouquetPopupOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 min-[380px]:p-3 sm:p-4">

      {/* ================= OVERLAY ================= */}

      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* ================= POPUP ================= */}

      <div
        className="
          relative
          w-full
          max-w-2xl
          max-h-[95vh]
          sm:max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-xl
          min-[380px]:rounded-2xl
          shadow-xl
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-3
            p-4
            min-[380px]:p-5
            border-b
            border-gray-100
          "
        >
          <div className="min-w-0">
            <h2 className="text-lg min-[380px]:text-xl font-semibold text-gray-800">
              Create Combo Bouquet
            </h2>

            <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1 leading-5">
              Add a new combo bouquet to your collection
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              w-9
              h-9
              min-[380px]:w-10
              min-[380px]:h-10
              shrink-0
              rounded-xl
              flex
              items-center
              justify-center
              text-gray-500
              hover:bg-gray-100
              disabled:opacity-50
              transition
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="p-4 min-[380px]:p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-[380px]:gap-5">

            {/* ================= NAME ================= */}

            <div className="sm:col-span-2">
              <label className="block text-xs min-[380px]:text-sm font-medium text-gray-700 mb-1.5 min-[380px]:mb-2">
                Bouquet Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter bouquet name"
                required
                disabled={loading}
                className="
                  w-full
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  min-[380px]:py-3
                  text-sm
                  rounded-xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* ================= PRICE ================= */}

            <div>
              <label className="block text-xs min-[380px]:text-sm font-medium text-gray-700 mb-1.5 min-[380px]:mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                placeholder="Enter price"
                required
                disabled={loading}
                className="
                  w-full
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  min-[380px]:py-3
                  text-sm
                  rounded-xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* ================= STOCK ================= */}

            <div>
              <label className="block text-xs min-[380px]:text-sm font-medium text-gray-700 mb-1.5 min-[380px]:mb-2">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="Enter stock"
                required
                disabled={loading}
                className="
                  w-full
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  min-[380px]:py-3
                  text-sm
                  rounded-xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* ================= OCCASION ================= */}

            <div>
              <label className="block text-xs min-[380px]:text-sm font-medium text-gray-700 mb-1.5 min-[380px]:mb-2">
                Occasion
              </label>

              <input
                type="text"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                placeholder="Birthday, Anniversary..."
                required
                disabled={loading}
                className="
                  w-full
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  min-[380px]:py-3
                  text-sm
                  rounded-xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* ================= CATEGORY ================= */}

            <div>
              <label className="block text-xs min-[380px]:text-sm font-medium text-gray-700 mb-1.5 min-[380px]:mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Premium, Romantic..."
                required
                disabled={loading}
                className="
                  w-full
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  min-[380px]:py-3
                  text-sm
                  rounded-xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* ================= IMAGE ================= */}

            <div className="sm:col-span-2">
              <label className="block text-xs min-[380px]:text-sm font-medium text-gray-700 mb-1.5 min-[380px]:mb-2">
                Image URL
              </label>

              <div className="relative">
                <Upload
                  size={17}
                  className="
                    absolute
                    left-3
                    min-[380px]:left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/bouquet.jpg"
                  required
                  disabled={loading}
                  className="
                    w-full
                    pl-10
                    min-[380px]:pl-11
                    pr-3
                    min-[380px]:pr-4
                    py-2.5
                    min-[380px]:py-3
                    text-sm
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50
                    disabled:bg-gray-50
                  "
                />
              </div>
            </div>

            {/* ================= IMAGE PREVIEW ================= */}

            {formData.image && (
              <div className="sm:col-span-2">
                <label className="block text-xs min-[380px]:text-sm font-medium text-gray-700 mb-1.5 min-[380px]:mb-2">
                  Image Preview
                </label>

                <div
                  className="
                    h-40
                    min-[380px]:h-48
                    rounded-xl
                    overflow-hidden
                    bg-gray-100
                    border
                    border-gray-100
                  "
                >
                  <img
                    src={formData.image}
                    alt="Combo bouquet preview"
                    className="w-full h-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* ================= DESCRIPTION ================= */}

            <div className="sm:col-span-2">
              <label className="block text-xs min-[380px]:text-sm font-medium text-gray-700 mb-1.5 min-[380px]:mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter bouquet description"
                required
                disabled={loading}
                className="
                  w-full
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  min-[380px]:py-3
                  text-sm
                  rounded-xl
                  border
                  border-gray-200
                  outline-none
                  resize-none
                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* ================= AVAILABILITY ================= */}

            <div className="sm:col-span-2">
              <label
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  p-3
                  min-[380px]:p-4
                  rounded-xl
                  border
                  border-gray-100
                  cursor-pointer
                "
              >
                <div className="min-w-0">
                  <p className="text-xs min-[380px]:text-sm font-medium text-gray-700">
                    Available for customers
                  </p>

                  <p className="text-[11px] min-[380px]:text-xs text-gray-500 mt-1 leading-4">
                    Enable or disable this combo bouquet.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-5 h-5 shrink-0 accent-pink-500"
                />
              </label>
            </div>
          </div>

          {/* ================= BUTTONS ================= */}

          <div
            className="
              flex
              flex-col
              min-[380px]:flex-row
              min-[380px]:justify-end
              gap-2.5
              min-[380px]:gap-3
              mt-6
              min-[380px]:mt-7
              pt-4
              min-[380px]:pt-5
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
                min-[380px]:w-auto
                px-5
                py-2.5
                rounded-xl
                border
                border-gray-200
                text-gray-600
                text-sm
                hover:bg-gray-50
                disabled:opacity-60
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                min-[380px]:w-auto
                flex
                items-center
                justify-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-pink-500
                text-white
                text-sm
                hover:bg-pink-600
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition
                min-[380px]:min-w-[150px]
              "
            >
              {loading && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {loading ? "Creating..." : "Create Bouquet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
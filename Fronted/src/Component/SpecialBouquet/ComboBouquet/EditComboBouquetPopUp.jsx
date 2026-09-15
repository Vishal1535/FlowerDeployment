import React, { useEffect, useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  closeEditComboBouquetPopup,
} from "../../../Store/ComboBouquet/ComboBouquetSlice";

import {
  UpdateComboBouquetThunk,
} from "../../../Store/ComboBouquet/ComboBouquetApi";

export const EditComboBouquetPopUp = () => {
  const dispatch = useDispatch();

  const {
    isEditComboBouquetPopupOpen,
    selectedComboBouquet,
    loading,
  } = useSelector((state) => state.comboBouquet);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    occasion: "",
    stock: "",
    isAvailable: true,
  });

  // ================= SET SELECTED DATA =================

  useEffect(() => {
    if (selectedComboBouquet) {
      setFormData({
        name: selectedComboBouquet.name || "",
        description: selectedComboBouquet.description || "",
        price: selectedComboBouquet.price || "",
        image: selectedComboBouquet.image || "",
        occasion: selectedComboBouquet.occasion || "",
        stock: selectedComboBouquet.stock || "",
        isAvailable: selectedComboBouquet.isAvailable ?? true,
      });
    }
  }, [selectedComboBouquet]);

  // ================= HANDLE CHANGE =================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedComboBouquet?._id) {
      return;
    }

    await dispatch(
      UpdateComboBouquetThunk({
        id: selectedComboBouquet._id,
        data: {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        },
      })
    );

    dispatch(closeEditComboBouquetPopup());
  };

  // ================= CLOSE POPUP =================

  const handleClose = () => {
    dispatch(closeEditComboBouquetPopup());
  };

  if (!isEditComboBouquetPopupOpen) {
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
              Edit Combo Bouquet
            </h2>

            <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1 leading-5">
              Update your combo bouquet details
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

            {/* NAME */}

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
                "
              />

            </div>

            {/* PRICE */}

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
                "
              />

            </div>

            {/* STOCK */}

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
                "
              />

            </div>

            {/* OCCASION */}

            <div className="sm:col-span-2">

              <label className="block text-xs min-[380px]:text-sm font-medium text-gray-700 mb-1.5 min-[380px]:mb-2">
                Occasion
              </label>

              <input
                type="text"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                placeholder="Birthday, Anniversary, Valentine's Day..."
                required
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
                "
              />

            </div>

            {/* IMAGE */}

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
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  required
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
                  "
                />

              </div>

            </div>

            {/* IMAGE PREVIEW */}

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
                  "
                >

                  <img
                    src={formData.image}
                    alt="Combo bouquet preview"
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>
            )}

            {/* DESCRIPTION */}

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
                "
              />

            </div>

            {/* AVAILABILITY */}

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

              {loading
                ? "Updating..."
                : "Update Bouquet"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};
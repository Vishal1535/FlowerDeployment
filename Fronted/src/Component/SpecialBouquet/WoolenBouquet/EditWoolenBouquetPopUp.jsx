
import React, { useEffect, useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  closeEditWoolenPopup,
} from "../../../Store/Woolen/WoolenSlice";

import {
  UpdateWoolenThunk,
} from "../../../Store/Woolen/WoolenApi";

export const EditWoolenBouquetPopUp = () => {
  const dispatch = useDispatch();

  const {
    isEditWoolenPopupOpen,
    selectedWoolen,
    loading,
  } = useSelector((state) => state.woolen);

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
    if (selectedWoolen) {
      setFormData({
        name: selectedWoolen.name || "",
        description: selectedWoolen.description || "",
        price: selectedWoolen.price || "",
        image: selectedWoolen.image || "",
        occasion: selectedWoolen.occasion || "",
        stock: selectedWoolen.stock || "",
        isAvailable: selectedWoolen.isAvailable ?? true,
      });
    }
  }, [selectedWoolen]);

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

    if (!selectedWoolen?._id) {
      return;
    }

    await dispatch(
      UpdateWoolenThunk({
        id: selectedWoolen._id,
        data: {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        },
      })
    );

    dispatch(closeEditWoolenPopup());
  };

  // ================= CLOSE POPUP =================

  const handleClose = () => {
    dispatch(closeEditWoolenPopup());
  };

  if (!isEditWoolenPopupOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* OVERLAY */}

      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* POPUP */}

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">

        {/* HEADER */}

        <div className="flex items-center justify-between p-5 border-b border-gray-100">

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Woolen Bouquet
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update your woolen bouquet details
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              text-gray-500
              hover:bg-gray-100
              transition
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="p-5 sm:p-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* NAME */}

            <div className="sm:col-span-2">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bouquet Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter woolen bouquet name"
                required
                className="
                  w-full
                  px-4
                  py-3
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

              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  px-4
                  py-3
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

              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  px-4
                  py-3
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

              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  px-4
                  py-3
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

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>

              <div className="relative">

                <Upload
                  size={18}
                  className="
                    absolute
                    left-4
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
                    pl-11
                    pr-4
                    py-3
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

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>

                <div className="h-48 rounded-xl overflow-hidden bg-gray-100">

                  <img
                    src={formData.image}
                    alt="Woolen bouquet preview"
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>
            )}

            {/* DESCRIPTION */}

            <div className="sm:col-span-2">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter woolen bouquet description"
                required
                className="
                  w-full
                  px-4
                  py-3
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
                  gap-4
                  p-4
                  rounded-xl
                  border
                  border-gray-100
                  cursor-pointer
                "
              >

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Available for customers
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Enable or disable this woolen bouquet.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="w-5 h-5 accent-pink-500"
                />

              </label>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-3 mt-7 pt-5 border-t border-gray-100">

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
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-pink-500
                text-white
                hover:bg-pink-600
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition
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
                : "Update Woolen Bouquet"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};


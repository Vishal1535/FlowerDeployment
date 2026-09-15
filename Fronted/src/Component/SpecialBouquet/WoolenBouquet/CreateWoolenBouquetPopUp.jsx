import React, { useEffect, useState } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { closeCreateWoolenPopup } from "../../../Store/Woolen/WoolenSlice";

import { CreateWoolenThunk } from "../../../Store/Woolen/WoolenApi";

export const CreateWoolenBouquetPopUp = () => {
  const dispatch = useDispatch();

  const { isCreateWoolenPopupOpen, loading, success, error, message } =
    useSelector((state) => state.woolen);

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

  // ================= SUCCESS =================

  useEffect(() => {
    if (success && message) {
      toast.success(message);

      dispatch(closeCreateWoolenPopup());

      resetForm();
    }
  }, [success, message, dispatch]);

  // ================= ERROR =================

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // ================= CLOSE POPUP =================

  const handleClose = () => {
    if (loading) return;

    dispatch(closeCreateWoolenPopup());

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
      CreateWoolenThunk({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        image: formData.image.trim(),
        occasion: formData.occasion.trim(),
        category: formData.category.trim(),
        stock: Number(formData.stock),
        isAvailable: formData.isAvailable,
      }),
    );
  };

  // ================= POPUP =================

  if (!isCreateWoolenPopupOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* OVERLAY */}

      <div onClick={handleClose} className="absolute inset-0 bg-black/40" />

      {/* POPUP */}

      <div
        className="
          relative
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-2xl
          shadow-xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            p-5
            border-b
            border-gray-100
          "
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Create Woolen Bouquet
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add a new woolen bouquet to your collection
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
              disabled:opacity-50
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
                Woolen Bouquet Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter woolen bouquet name"
                required
                disabled={loading}
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
                  disabled:bg-gray-50
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
                disabled={loading}
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
                  disabled:bg-gray-50
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
                disabled={loading}
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
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* OCCASION */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  px-4
                  py-3
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

            {/* CATEGORY */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Premium, Handmade..."
                required
                disabled={loading}
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
                  disabled:bg-gray-50
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
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/woolen-bouquet.jpg"
                  required
                  disabled={loading}
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
                    disabled:bg-gray-50
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

                <div
                  className="
                    h-48
                    rounded-xl
                    overflow-hidden
                    bg-gray-100
                    border
                    border-gray-100
                  "
                >
                  <img
                    src={formData.image}
                    alt="Woolen bouquet preview"
                    className="w-full h-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
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
                disabled={loading}
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
                  disabled:bg-gray-50
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
                  disabled={loading}
                  className="w-5 h-5 accent-pink-500"
                />
              </label>
            </div>
          </div>

          {/* BUTTONS */}

          <div
            className="
              flex
              justify-end
              gap-3
              mt-7
              pt-5
              border-t
              border-gray-100
            "
          >
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
                flex
                items-center
                justify-center
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
                min-w-[170px]
              "
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading ? "Creating..." : "Create Woolen Bouquet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

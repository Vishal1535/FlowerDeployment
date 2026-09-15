import React, { useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  hideFlowerInSleeve,
} from "../../../Store/FlowerSleeve/FlowerSleeveSlice";

import {
  AddFlowerInSleeveThunk,
} from "../../../Store/FlowerSleeve/FlowerSleeveApi";

export const CreateFlowerInSleevePopUp = () => {
  const dispatch = useDispatch();

  const {
    isShowFlowerInSleeve,
    loading,
  } = useSelector(
    (state) => state.flowerInSleeve
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    image: "",
    flowerType: "",
    sleeveType: "",
    color: "",
    occasion: "",
    size: "Medium",
    stock: "",
    isAvailable: true,
    isFeatured: false,
  });

  // ================= HANDLE CHANGE =================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert occasion string into array
    const occasions = formData.occasion
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const data = {
      name: formData.name.trim(),
      description: formData.description.trim(),

      price: Number(formData.price),

      discountPrice:
        formData.discountPrice === ""
          ? 0
          : Number(formData.discountPrice),

      image: formData.image.trim(),

      flowerType:
        formData.flowerType.trim(),

      sleeveType:
        formData.sleeveType.trim(),

      color:
        formData.color.trim(),

      occasion: occasions,

      size: formData.size,

      stock:
        formData.stock === ""
          ? 0
          : Number(formData.stock),

      isAvailable:
        formData.isAvailable,

      isFeatured:
        formData.isFeatured,
    };

    const result = await dispatch(
      AddFlowerInSleeveThunk(data)
    );

    // ================= SUCCESS =================

    if (
      AddFlowerInSleeveThunk.fulfilled.match(
        result
      )
    ) {
      toast.success(
        result.payload?.message ||
          "Flower in sleeve added successfully"
      );

      setFormData({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        image: "",
        flowerType: "",
        sleeveType: "",
        color: "",
        occasion: "",
        size: "Medium",
        stock: "",
        isAvailable: true,
        isFeatured: false,
      });

      dispatch(hideFlowerInSleeve());
    }

    // ================= ERROR =================

    else {
      toast.error(
        result.payload ||
          "Failed to add flower in sleeve"
      );
    }
  };

  // ================= CLOSE =================

  const handleClose = () => {
    if (!loading) {
      dispatch(hideFlowerInSleeve());
    }
  };

  if (!isShowFlowerInSleeve) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

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
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-2xl
          shadow-xl
        "
      >

        {/* ================= HEADER ================= */}

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
              Create Flower In Sleeve
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add a new flower sleeve product
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
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* ================= NAME ================= */}

            <div className="sm:col-span-2">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flower Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter flower name"
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

            {/* ================= PRICE ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
                placeholder="Enter price"
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

            {/* ================= DISCOUNT PRICE ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Price
              </label>

              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                min="0"
                placeholder="Optional"
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

            {/* ================= FLOWER TYPE ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flower Type <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="flowerType"
                value={formData.flowerType}
                onChange={handleChange}
                placeholder="Rose, Lily, Mixed..."
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

            {/* ================= SLEEVE TYPE ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleeve Type <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="sleeveType"
                value={formData.sleeveType}
                onChange={handleChange}
                placeholder="Paper Sleeve, Plastic Sleeve..."
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

            {/* ================= COLOR ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Red, Pink, White..."
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

            {/* ================= SIZE ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>

              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  outline-none
                  focus:border-pink-400
                  focus:ring-4
                  focus:ring-pink-50
                "
              >
                <option value="Small">
                  Small
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Large">
                  Large
                </option>
              </select>

            </div>

            {/* ================= STOCK ================= */}

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

            {/* ================= IMAGE ================= */}

            <div className="sm:col-span-2">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL <span className="text-red-500">*</span>
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

            {/* ================= IMAGE PREVIEW ================= */}

            {formData.image && (
              <div className="sm:col-span-2">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>

                <div className="h-48 rounded-xl overflow-hidden bg-gray-100">

                  <img
                    src={formData.image}
                    alt="Flower in sleeve preview"
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>
            )}

            {/* ================= OCCASION ================= */}

            <div className="sm:col-span-2">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occasion
              </label>

              <input
                type="text"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                placeholder="Birthday, Anniversary, Valentine's Day"
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

              <p className="text-xs text-gray-400 mt-1">
                Separate multiple occasions with commas.
              </p>

            </div>

            {/* ================= DESCRIPTION ================= */}

            <div className="sm:col-span-2">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter flower in sleeve description"
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

            {/* ================= AVAILABLE ================= */}

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
                    Enable or disable this flower sleeve.
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

            {/* ================= FEATURED ================= */}

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
                    Featured Flower
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Show this flower in featured sections.
                  </p>

                </div>

                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5 accent-pink-500"
                />

              </label>

            </div>

          </div>

          {/* ================= BUTTONS ================= */}

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
                disabled:opacity-50
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
              "
            >

              {loading && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {loading
                ? "Creating..."
                : "Create Flower Sleeve"}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};
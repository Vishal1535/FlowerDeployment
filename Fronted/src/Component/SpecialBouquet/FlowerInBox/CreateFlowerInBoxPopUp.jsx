import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { AddFlowerInBoxThunk } from "../../../Store/FlowerInBox/FlowerInBoxApi";

import {
  closeCreateFlowerInBoxPopup,
} from "../../../Store/FlowerInBox/FlowerInBoxSlice";

export const CreateFlowerInBoxPopUp = () => {
  const dispatch = useDispatch();

  const {
    isCreateFlowerInBoxPopupOpen,
    loading,
  } = useSelector((state) => state.flowerInBox);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    image: "",
    flowerType: "",
    boxType: "",
    color: "",
    occasion: "",
    size: "",
    stock: "",
    isAvailable: true,
    isFeatured: false,
  });

  // ================= CHANGE =================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= CLOSE =================

  const handleClose = () => {
    if (!loading) {
      dispatch(closeCreateFlowerInBoxPopup());
    }
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      AddFlowerInBoxThunk({
        ...formData,

        price: Number(formData.price),

        discountPrice:
          formData.discountPrice === ""
            ? undefined
            : Number(formData.discountPrice),

        stock:
          formData.stock === ""
            ? 0
            : Number(formData.stock),
      })
    );

    if (AddFlowerInBoxThunk.fulfilled.match(result)) {
      toast.success("Flower in box added successfully 🌸");

      setFormData({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        image: "",
        flowerType: "",
        boxType: "",
        color: "",
        occasion: "",
        size: "",
        stock: "",
        isAvailable: true,
        isFeatured: false,
      });

      dispatch(closeCreateFlowerInBoxPopup());
    } else {
      toast.error(
        result.payload || "Failed to add flower in box"
      );
    }
  };

  // ================= HIDE =================

  if (!isCreateFlowerInBoxPopupOpen) {
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
          max-w-2xl
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
            sticky
            top-0
            z-10
            bg-white
            flex
            items-center
            justify-between
            px-6
            py-4
            border-b
            border-gray-100
          "
        >

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Create Flower In Box
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add a new flower box product
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              w-9
              h-9
              rounded-lg
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
          className="p-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* ================= NAME ================= */}

            <div className="md:col-span-2">

              <label className="text-sm font-medium text-gray-700">
                Name{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter flower box name"
                required
                className="
                  input
                  input-bordered
                  w-full
                  mt-1
                "
              />

            </div>

            {/* ================= DESCRIPTION ================= */}

            <div className="md:col-span-2">

              <label className="text-sm font-medium text-gray-700">
                Description{" "}
                <span className="text-red-500">*</span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
                rows="3"
                className="
                  textarea
                  textarea-bordered
                  w-full
                  mt-1
                "
              />

            </div>

            {/* ================= PRICE ================= */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Price{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="999"
                min="0"
                required
                className="
                  input
                  input-bordered
                  w-full
                  mt-1
                "
              />

            </div>

            {/* ================= DISCOUNT PRICE ================= */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Discount Price
              </label>

              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="799"
                min="0"
                className="
                  input
                  input-bordered
                  w-full
                  mt-1
                "
              />

            </div>

            {/* ================= IMAGE ================= */}

            <div className="md:col-span-2">

              <label className="text-sm font-medium text-gray-700">
                Image URL{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                required
                className="
                  input
                  input-bordered
                  w-full
                  mt-1
                "
              />

            </div>

            {/* ================= FLOWER TYPE ================= */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Flower Type{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="flowerType"
                value={formData.flowerType}
                onChange={handleChange}
                placeholder="Rose"
                required
                className="
                  input
                  input-bordered
                  w-full
                  mt-1
                "
              />

            </div>

            {/* ================= BOX TYPE ================= */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Box Type{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="boxType"
                value={formData.boxType}
                onChange={handleChange}
                placeholder="Round Box"
                required
                className="
                  input
                  input-bordered
                  w-full
                  mt-1
                "
              />

            </div>

            {/* ================= COLOR ================= */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Color{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Pink"
                required
                className="
                  input
                  input-bordered
                  w-full
                  mt-1
                "
              />

            </div>

            {/* ================= OCCASION ================= */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Occasion
              </label>

              <input
                type="text"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                placeholder="Birthday"
                className="
                  input
                  input-bordered
                  w-full
                  mt-1
                "
              />

            </div>

            {/* ================= SIZE ================= */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Size
              </label>

              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="
                  select
                  select-bordered
                  w-full
                  mt-1
                "
              >

                <option value="">
                  Select Size
                </option>

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

              <label className="text-sm font-medium text-gray-700">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="20"
                min="0"
                className="
                  input
                  input-bordered
                  w-full
                  mt-1
                "
              />

            </div>

          </div>

          {/* ================= CHECKBOXES ================= */}

          <div className="flex gap-6 mt-5">

            {/* AVAILABLE */}

            <label
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-700
                cursor-pointer
              "
            >

              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="
                  checkbox
                  checkbox-sm
                  checkbox-primary
                "
              />

              Available

            </label>

            {/* FEATURED */}

            <label
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-700
                cursor-pointer
              "
            >

              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="
                  checkbox
                  checkbox-sm
                  checkbox-primary
                "
              />

              Featured

            </label>

          </div>

          {/* ================= BUTTONS ================= */}

          <div className="flex gap-3 mt-7">

            {/* CANCEL */}

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                flex-1
                py-2.5
                rounded-xl
                border
                border-gray-200
                text-gray-600
                font-medium
                hover:bg-gray-50
                disabled:opacity-60
              "
            >
              Cancel
            </button>

            {/* CREATE */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                py-2.5
                rounded-xl
                bg-pink-500
                text-white
                font-medium
                hover:bg-pink-600
                disabled:opacity-60
                flex
                items-center
                justify-center
                gap-2
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
                : "Create Flower Box"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};
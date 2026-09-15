import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateBouquetPopup } from "../../../Store/Bouquest/BouquestSlice";
import { createBouquetThunk } from "../../../Store/Bouquest/BouquestApi";
import toast from "react-hot-toast";

export const CreateBouquet = () => {
  const { isCreateBouquetPopupOpen, loading } = useSelector(
    (state) => state.bouquet
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    occasion: "",
    size: "",
    stock: "",
    category: "",
    flowerCount: "",
    flowers: "",
    isAvailable: true,
  });

  // ================= CHANGE =================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.image.trim() ||
      !formData.occasion ||
      !formData.size ||
      !formData.stock ||
      !formData.category.trim() ||
      !formData.flowerCount ||
      !formData.flowers.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Number validation
    if (Number(formData.price) < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    if (Number(formData.stock) < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    if (Number(formData.flowerCount) < 1) {
      toast.error("Flower count must be at least 1");
      return;
    }

    // ================= FLOWERS =================

    const flowersArray = formData.flowers
      .split(",")
      .map((flower) => flower.trim())
      .filter(Boolean);

    if (flowersArray.length === 0) {
      toast.error("Please enter at least one flower");
      return;
    }

    // ================= DATA =================

    const bouquetData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      image: formData.image.trim(),
      occasion: formData.occasion,
      size: formData.size,
      stock: Number(formData.stock),
      category: formData.category.trim(),
      flowerCount: Number(formData.flowerCount),
      flowers: flowersArray,
      isAvailable: formData.isAvailable,
    };

    try {
      const result = await dispatch(
        createBouquetThunk(bouquetData)
      );

      if (createBouquetThunk.fulfilled.match(result)) {
        toast.success("Bouquet created successfully!");

        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          image: "",
          occasion: "",
          size: "",
          stock: "",
          category: "",
          flowerCount: "",
          flowers: "",
          isAvailable: true,
        });

        dispatch(closeCreateBouquetPopup());
      } else {
        toast.error(
          result.payload || "Failed to create bouquet"
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ================= CLOSE =================

  if (!isCreateBouquetPopupOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">

      <div className="w-full max-w-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl bg-white shadow-xl">

        {/* ================= HEADER ================= */}

        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b px-4 sm:px-5 py-3 bg-white">

          <h2 className="text-base sm:text-lg font-semibold text-pink-600">
            Create Bouquet
          </h2>

          <button
            type="button"
            className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-xl text-gray-500 hover:bg-gray-100 hover:text-red-500"
            onClick={() => {
              dispatch(closeCreateBouquetPopup());
            }}
          >
            ×
          </button>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-5"
        >

          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3">

            {/* ================= NAME ================= */}

            <div>
              <label className="mb-1 block text-[11px] sm:text-xs font-medium text-gray-600">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Bouquet name"
                className="
                  w-full
                  min-w-0
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-pink-500
                "
              />
            </div>

            {/* ================= PRICE ================= */}

            <div>
              <label className="mb-1 block text-[11px] sm:text-xs font-medium text-gray-600">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="₹ Price"
                min="0"
                className="
                  w-full
                  min-w-0
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-pink-500
                "
              />
            </div>

            {/* ================= DESCRIPTION ================= */}

            <div className="min-[380px]:col-span-2">

              <label className="mb-1 block text-[11px] sm:text-xs font-medium text-gray-600">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="2"
                placeholder="Bouquet description"
                className="
                  w-full
                  min-w-0
                  resize-none
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-pink-500
                "
              />

            </div>

            {/* ================= IMAGE ================= */}

            <div className="min-[380px]:col-span-2">

              <label className="mb-1 block text-[11px] sm:text-xs font-medium text-gray-600">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="
                  w-full
                  min-w-0
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-pink-500
                "
              />

            </div>

            {/* ================= OCCASION ================= */}

            <div>

              <label className="mb-1 block text-[11px] sm:text-xs font-medium text-gray-600">
                Occasion
              </label>

              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="
                  w-full
                  min-w-0
                  rounded-md
                  border
                  bg-white
                  px-2
                  sm:px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-pink-500
                "
              >
                <option value="">Select</option>
                <option value="Birthday">Birthday</option>
                <option value="Wedding">Wedding</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Valentine">Valentine</option>
                <option value="Mother's Day">Mother's Day</option>
                <option value="Friendship">Friendship</option>
                <option value="GetWellSoon">Get well soon</option>
                <option value="Congratulations">
                  Congratulations
                </option>
              </select>

            </div>

            {/* ================= SIZE ================= */}

            <div>

              <label className="mb-1 block text-[11px] sm:text-xs font-medium text-gray-600">
                Size
              </label>

              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="
                  w-full
                  min-w-0
                  rounded-md
                  border
                  bg-white
                  px-2
                  sm:px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-pink-500
                "
              >
                <option value="">Select</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>

            </div>

            {/* ================= STOCK ================= */}

            <div>

              <label className="mb-1 block text-[11px] sm:text-xs font-medium text-gray-600">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                min="0"
                className="
                  w-full
                  min-w-0
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-pink-500
                "
              />

            </div>

            {/* ================= CATEGORY ================= */}

            <div>

              <label className="mb-1 block text-[11px] sm:text-xs font-medium text-gray-600">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="
                  w-full
                  min-w-0
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-pink-500
                "
              />

            </div>

            {/* ================= FLOWER COUNT ================= */}

            <div>

              <label className="mb-1 block text-[11px] sm:text-xs font-medium text-gray-600">
                Number of Flowers
              </label>

              <input
                type="number"
                name="flowerCount"
                value={formData.flowerCount}
                onChange={handleChange}
                placeholder="e.g. 12"
                min="1"
                className="
                  w-full
                  min-w-0
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-pink-500
                "
              />

            </div>

            {/* ================= FLOWERS ================= */}

            <div>

              <label className="mb-1 block text-[11px] sm:text-xs font-medium text-gray-600">
                Flowers
              </label>

              <input
                type="text"
                name="flowers"
                value={formData.flowers}
                onChange={handleChange}
                placeholder="Rose, Lily, Baby's Breath"
                className="
                  w-full
                  min-w-0
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-pink-500
                "
              />

              <p className="mt-1 text-[9px] sm:text-[10px] text-gray-400">
                Separate multiple flowers with commas
              </p>

            </div>

          </div>

          {/* ================= AVAILABLE ================= */}

          <label
            className="
              mt-3
              flex
              cursor-pointer
              items-center
              gap-2
              text-xs
              sm:text-sm
              text-gray-600
            "
          >

            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="accent-pink-600 shrink-0"
            />

            Available

          </label>

          {/* ================= BUTTONS ================= */}

          <div
            className="
              mt-4
              flex
              flex-col
              min-[380px]:flex-row
              justify-end
              gap-2
              border-t
              pt-3
            "
          >

            <button
              type="button"
              className="
                w-full
                min-[380px]:w-auto
                rounded-md
                border
                px-4
                py-2
                text-sm
                hover:bg-gray-100
              "
              onClick={() => {
                dispatch(closeCreateBouquetPopup());
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                min-[380px]:w-auto
                rounded-md
                bg-pink-600
                px-5
                py-2
                text-sm
                font-medium
                text-white
                hover:bg-pink-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? "Creating..." : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};
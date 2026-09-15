import React, { useState } from "react";
import { X, Flower2, LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { CreateFlowerThunk } from "../../../Store/flowerSlice/FlowerApi";
import { closeCreateFlowerPopup } from "../../../Store/flowerSlice/FlowerSlice";

export const CreateFlower = () => {
  const dispatch = useDispatch();

  const { loading, showCreateFlowerPopup } = useSelector(
    (state) => state.flower
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    color: "",
    stock: "",
    category: "",
  });

  // IMPORTANT:
  // Hooks ke baad conditional return hona chahiye
  if (!showCreateFlowerPopup) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.image ||
      !formData.color ||
      !formData.stock ||
      !formData.category
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await dispatch(
        CreateFlowerThunk({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        })
      ).unwrap();

      if (response?.success) {
        toast.success("Flower created successfully");

        dispatch(closeCreateFlowerPopup());

        setFormData({
          name: "",
          description: "",
          price: "",
          image: "",
          color: "",
          stock: "",
          category: "",
        });
      }
    } catch (error) {
      toast.error(error || "Failed to create flower");
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        p-3
        min-[380px]:p-4
        overflow-hidden
      "
    >
      {/* Popup */}
      <div
        className="
          w-full
          max-w-lg
          bg-white
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
          overflow-hidden
          flex
          flex-col
          max-h-[95vh]
          sm:max-h-[90vh]
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            px-4
            min-[380px]:px-5
            sm:px-6
            py-3.5
            sm:py-5
            border-b
            border-gray-100
            bg-white
            shrink-0
          "
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
              className="
                w-9
                h-9
                sm:w-11
                sm:h-11
                shrink-0
                rounded-xl
                bg-pink-50
                flex
                items-center
                justify-center
              "
            >
              <Flower2
                size={19}
                className="sm:w-[22px] sm:h-[22px] text-pink-600"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-bold text-gray-900 truncate">
                Add New Flower
              </h2>

              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 truncate">
                Add a new flower to your store
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() =>
              dispatch(closeCreateFlowerPopup())
            }
            className="
              w-8
              h-8
              sm:w-9
              sm:h-9
              shrink-0
              rounded-full
              flex
              items-center
              justify-center
              text-gray-500
              bg-gray-100
              hover:bg-gray-200
              hover:text-gray-900
              transition-all
            "
          >
            <X size={17} className="sm:w-[19px] sm:h-[19px]" />
          </button>
        </div>

        {/* ONLY THIS AREA SCROLLS */}
        <div
          className="
            overflow-y-auto
            flex-1
            min-h-0
            overscroll-contain
          "
        >
          <form
            onSubmit={handleSubmit}
            className="p-4 min-[380px]:p-5 sm:p-6 space-y-4 sm:space-y-5"
          >
            {/* Name */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-700">
                Flower Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Red Rose"
                className="
                  input
                  input-bordered
                  w-full
                  h-10
                  sm:h-11
                  mt-1.5
                  sm:mt-2
                  rounded-xl
                  text-sm
                "
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter flower description"
                rows="3"
                className="
                  textarea
                  textarea-bordered
                  w-full
                  mt-1.5
                  sm:mt-2
                  rounded-xl
                  resize-none
                  text-sm
                "
              />
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <div className="min-w-0">
                <label className="text-xs sm:text-sm font-semibold text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="299"
                  min="0"
                  className="
                    input
                    input-bordered
                    w-full
                    h-10
                    sm:h-11
                    mt-1.5
                    sm:mt-2
                    rounded-xl
                    text-sm
                  "
                />
              </div>

              <div className="min-w-0">
                <label className="text-xs sm:text-sm font-semibold text-gray-700">
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
                    h-10
                    sm:h-11
                    mt-1.5
                    sm:mt-2
                    rounded-xl
                    text-sm
                  "
                />
              </div>
            </div>

            {/* Color + Category */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <div className="min-w-0">
                <label className="text-xs sm:text-sm font-semibold text-gray-700">
                  Color
                </label>

                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Red"
                  className="
                    input
                    input-bordered
                    w-full
                    h-10
                    sm:h-11
                    mt-1.5
                    sm:mt-2
                    rounded-xl
                    text-sm
                  "
                />
              </div>

              <div className="min-w-0">
                <label className="text-xs sm:text-sm font-semibold text-gray-700">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Roses"
                  className="
                    input
                    input-bordered
                    w-full
                    h-10
                    sm:h-11
                    mt-1.5
                    sm:mt-2
                    rounded-xl
                    text-sm
                  "
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-700">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/rose.jpg"
                className="
                  input
                  input-bordered
                  w-full
                  h-10
                  sm:h-11
                  mt-1.5
                  sm:mt-2
                  rounded-xl
                  text-sm
                "
              />

              {/* Preview */}
              {formData.image && (
                <div className="mt-2.5 sm:mt-3 h-28 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={formData.image}
                    alt="Flower preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col min-[380px]:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2 pb-1 sm:pb-2">
              <button
                type="button"
                onClick={() =>
                  dispatch(closeCreateFlowerPopup())
                }
                disabled={loading}
                className="
                  w-full
                  min-[380px]:flex-1
                  h-11
                  sm:h-12
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-gray-700
                  text-sm
                  font-semibold
                  hover:bg-gray-50
                  disabled:cursor-not-allowed
                  transition-all
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  min-[380px]:flex-1
                  h-11
                  sm:h-12
                  rounded-xl
                  bg-gray-900
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-gray-800
                  disabled:bg-gray-400
                  disabled:cursor-not-allowed
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                "
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    <Flower2 size={18} />
                    Create Flower
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
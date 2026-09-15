import React, { useEffect, useState } from "react";
import { X, Flower2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { closeEditFlowerPopup } from "../../../Store/flowerSlice/FlowerSlice";
import { UpdateFlowerThunk } from "../../../Store/flowerSlice/FlowerApi";

export const EditFlower = () => {
  const dispatch = useDispatch();

  const { showEditFlowerPopup, singleFlower } = useSelector(
    (state) => state.flower,
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

  // singleFlower ka data popup open hote hi form mein load hoga
  useEffect(() => {
    if (singleFlower) {
      setFormData({
        name: singleFlower.name || "",
        description: singleFlower.description || "",
        price: singleFlower.price ?? "",
        image: singleFlower.image || "",
        color: singleFlower.color || "",
        stock: singleFlower.stock ?? "",
        category: singleFlower.category || "",
      });
    }
  }, [singleFlower]);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const value = {
        id: singleFlower._id,
        data: {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        },
      };

      await dispatch(UpdateFlowerThunk(value)).unwrap();

      toast.success("Data Updated successfully");
      dispatch(closeEditFlowerPopup());
    } catch (error) {
      toast.error(error || "Failed to update flower");
    }
  };

  // Popup closed hai toh kuch render nahi hoga
  if (!showEditFlowerPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-3 min-[380px]:px-4 py-4 sm:py-6 overflow-hidden">
      {/* Popup */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 min-[380px]:px-5 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-pink-50 flex items-center justify-center">
              <Flower2
                size={19}
                className="sm:w-[22px] sm:h-[22px] text-pink-600"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-bold text-gray-900 truncate">
                Edit Flower
              </h2>

              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 truncate">
                Update flower details
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() => dispatch(closeEditFlowerPopup())}
            className="
              w-8 h-8
              sm:w-9 sm:h-9
              shrink-0
              rounded-full
              flex items-center justify-center
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

        {/* Form */}
        <div className="max-h-[calc(95vh-72px)] sm:max-h-[calc(90vh-90px)] overflow-y-auto">
          <form
            onSubmit={HandleSubmit}
            className="p-4 min-[380px]:p-5 sm:p-6 space-y-4 sm:space-y-5"
          >
            {/* Flower Name */}
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
                className="input input-bordered w-full h-10 sm:h-11 mt-1.5 sm:mt-2 rounded-xl text-sm"
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
                  className="input input-bordered w-full h-10 sm:h-11 mt-1.5 sm:mt-2 rounded-xl text-sm"
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
                  className="input input-bordered w-full h-10 sm:h-11 mt-1.5 sm:mt-2 rounded-xl text-sm"
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
                  className="input input-bordered w-full h-10 sm:h-11 mt-1.5 sm:mt-2 rounded-xl text-sm"
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
                  className="input input-bordered w-full h-10 sm:h-11 mt-1.5 sm:mt-2 rounded-xl text-sm"
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
                className="input input-bordered w-full h-10 sm:h-11 mt-1.5 sm:mt-2 rounded-xl text-sm"
              />

              {/* Preview */}
              {formData.image ? (
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
              ) : (
                <div className="mt-2.5 sm:mt-3 h-28 sm:h-32 rounded-xl bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Flower2
                      size={26}
                      className="sm:w-[30px] sm:h-[30px] mx-auto mb-1.5 sm:mb-2"
                    />
                    <p className="text-[10px] sm:text-xs">Image preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col min-[380px]:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              {/* Cancel */}
              <button
                type="button"
                onClick={() => dispatch(closeEditFlowerPopup())}
                className="
                  w-full
                  min-[380px]:flex-1
                  h-10
                  sm:h-12
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-gray-700
                  text-sm
                  font-semibold
                  hover:bg-gray-50
                  transition-all
                "
              >
                Cancel
              </button>

              {/* Update */}
              <button
                type="submit"
                className="
                  w-full
                  min-[380px]:flex-1
                  h-10
                  sm:h-12
                  rounded-xl
                  bg-gray-900
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-gray-800
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                "
              >
                <Flower2 size={17} className="sm:w-[18px] sm:h-[18px]" />
                Update Flower
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
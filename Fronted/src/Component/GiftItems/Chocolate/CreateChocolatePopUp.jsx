import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  closeCreateChocolatePopup,
} from "../../../Store/Chocolate/ChocolateSlice";

import {
  CreateChocolateThunk,
} from "../../../Store/Chocolate/ChocolateApi";

export const CreateChocolatePopUp = () => {
  const dispatch = useDispatch();

  const {
    isCreateChocolatePopupOpen,
    loading,
  } = useSelector((state) => state.chocolate);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    size: "",
    stock: "",
    category: "",
    isAvailable: true,
  });

  if (!isCreateChocolatePopupOpen) {
    return null;
  }

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      CreateChocolateThunk({
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      })
    );

    if (CreateChocolateThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
          "Chocolate created successfully"
      );

      setData({
        name: "",
        description: "",
        price: "",
        image: "",
        size: "",
        stock: "",
        category: "",
        isAvailable: true,
      });

      dispatch(closeCreateChocolatePopup());
    }

    if (CreateChocolateThunk.rejected.match(result)) {
      toast.error(
        result.payload ||
          "Failed to create chocolate"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 sm:px-4 py-3 sm:py-6 overflow-y-auto">

      <div className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl bg-white shadow-xl">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">

          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Add Chocolate
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Create a new chocolate product
            </p>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              dispatch(closeCreateChocolatePopup())
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
              hover:bg-gray-100
              hover:text-gray-700
              transition
              disabled:opacity-50
            "
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

            {/* NAME */}

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Chocolate Name
              </label>

              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
                disabled={loading}
                className="
                  mt-1
                  sm:mt-1.5
                  w-full
                  rounded-lg
                  sm:rounded-xl
                  border
                  border-gray-200
                  px-3
                  sm:px-4
                  py-2
                  sm:py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-100
                "
              />
            </div>

            {/* PRICE */}

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                required
                disabled={loading}
                className="
                  mt-1
                  sm:mt-1.5
                  w-full
                  rounded-lg
                  sm:rounded-xl
                  border
                  border-gray-200
                  px-3
                  sm:px-4
                  py-2
                  sm:py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-100
                "
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={data.category}
                onChange={handleChange}
                placeholder="Dark Chocolate"
                required
                disabled={loading}
                className="
                  mt-1
                  sm:mt-1.5
                  w-full
                  rounded-lg
                  sm:rounded-xl
                  border
                  border-gray-200
                  px-3
                  sm:px-4
                  py-2
                  sm:py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-100
                "
              />
            </div>

            {/* SIZE */}

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Size
              </label>

              <input
                type="text"
                name="size"
                value={data.size}
                onChange={handleChange}
                placeholder="e.g. 100g"
                required
                disabled={loading}
                className="
                  mt-1
                  sm:mt-1.5
                  w-full
                  rounded-lg
                  sm:rounded-xl
                  border
                  border-gray-200
                  px-3
                  sm:px-4
                  py-2
                  sm:py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-100
                "
              />
            </div>

            {/* STOCK */}

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                placeholder="Enter stock"
                min="0"
                required
                disabled={loading}
                className="
                  mt-1
                  sm:mt-1.5
                  w-full
                  rounded-lg
                  sm:rounded-xl
                  border
                  border-gray-200
                  px-3
                  sm:px-4
                  py-2
                  sm:py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-100
                "
              />
            </div>

            {/* IMAGE */}

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={data.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
                disabled={loading}
                className="
                  mt-1
                  sm:mt-1.5
                  w-full
                  rounded-lg
                  sm:rounded-xl
                  border
                  border-gray-200
                  px-3
                  sm:px-4
                  py-2
                  sm:py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-100
                "
              />
            </div>

          </div>

          {/* DESCRIPTION */}

          <div className="mt-3 sm:mt-4">

            <label className="text-xs sm:text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter chocolate description"
              rows="2"
              required
              disabled={loading}
              className="
                mt-1
                sm:mt-1.5
                w-full
                resize-none
                rounded-lg
                sm:rounded-xl
                border
                border-gray-200
                px-3
                sm:px-4
                py-2
                sm:py-2.5
                text-sm
                outline-none
                focus:border-pink-400
                focus:ring-2
                focus:ring-pink-100
                disabled:bg-gray-100
              "
            />

          </div>

          {/* AVAILABILITY */}

          <label className="flex items-center gap-2 mt-3 sm:mt-4 cursor-pointer">

            <input
              type="checkbox"
              name="isAvailable"
              checked={data.isAvailable}
              onChange={handleChange}
              disabled={loading}
              className="h-4 w-4 accent-pink-500 shrink-0"
            />

            <span className="text-xs sm:text-sm text-gray-700">
              Product is available
            </span>

          </label>

          {/* BUTTONS */}

          <div className="flex flex-col min-[380px]:flex-row sm:justify-end gap-2 sm:gap-3 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100">

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                dispatch(closeCreateChocolatePopup())
              }
              className="
                w-full
                min-[380px]:w-auto
                px-5
                py-2
                sm:py-2.5
                rounded-lg
                sm:rounded-xl
                border
                border-gray-200
                text-sm
                text-gray-600
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
                min-[380px]:w-auto
                min-w-0
                sm:min-w-[160px]
                px-5
                sm:px-6
                py-2
                sm:py-2.5
                rounded-lg
                sm:rounded-xl
                bg-pink-500
                text-white
                text-sm
                font-medium
                hover:bg-pink-600
                disabled:opacity-70
                transition
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Creating...
                </>
              ) : (
                "Create Chocolate"
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};
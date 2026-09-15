import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  closeCreateCardPopup,
} from "../../../Store/Card/CardSlice";

import {
  CreateCardThunk,
} from "../../../Store/Card/CardApi";

export const CreateCardPopUp = () => {
  const dispatch = useDispatch();

  const {
    isCreateCardPopupOpen,
    loading,
  } = useSelector((state) => state.card);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    occasion: "",
    category: "",
    stock: "",
    isAvailable: true,
  });

  if (!isCreateCardPopupOpen) {
    return null;
  }

  // ============================
  // HANDLE CHANGE
  // ============================

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

  // ============================
  // SUBMIT
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      CreateCardThunk({
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      })
    );

    // ============================
    // SUCCESS
    // ============================

    if (CreateCardThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
        "Card created successfully"
      );

      setData({
        name: "",
        description: "",
        price: "",
        image: "",
        occasion: "",
        category: "",
        stock: "",
        isAvailable: true,
      });

      dispatch(closeCreateCardPopup());
    }

    // ============================
    // ERROR
    // ============================

    if (CreateCardThunk.rejected.match(result)) {
      toast.error(
        result.payload ||
        "Failed to create card"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 min-[380px]:px-4 py-3 sm:py-6 overflow-y-auto">

      <div className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">

        {/* ================= HEADER ================= */}

        <div className="flex items-start justify-between gap-3 px-4 min-[380px]:px-5 sm:px-6 py-3.5 min-[380px]:py-4 border-b border-gray-100">

          <div className="min-w-0">
            <h2 className="text-lg min-[380px]:text-xl font-semibold text-gray-800 truncate">
              Add Card
            </h2>

            <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1">
              Create a new greeting card
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              dispatch(closeCreateCardPopup())
            }
            disabled={loading}
            className="
              w-8
              h-8
              min-[380px]:w-9
              min-[380px]:h-9
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
              disabled:cursor-not-allowed
            "
          >
            <X size={18} className="min-[380px]:w-5 min-[380px]:h-5" />
          </button>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="p-4 min-[380px]:p-5 sm:p-6"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-[380px]:gap-4">

            {/* NAME */}

            <div>
              <label className="text-xs min-[380px]:text-sm font-medium text-gray-700">
                Card Name
              </label>

              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter card name"
                required
                disabled={loading}
                className="
                  mt-1.5
                  w-full
                  min-w-0
                  rounded-xl
                  border
                  border-gray-200
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* PRICE */}

            <div>
              <label className="text-xs min-[380px]:text-sm font-medium text-gray-700">
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
                  mt-1.5
                  w-full
                  min-w-0
                  rounded-xl
                  border
                  border-gray-200
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* OCCASION */}

            <div>
              <label className="text-xs min-[380px]:text-sm font-medium text-gray-700">
                Occasion
              </label>

              <input
                type="text"
                name="occasion"
                value={data.occasion}
                onChange={handleChange}
                placeholder="Birthday, Anniversary..."
                required
                disabled={loading}
                className="
                  mt-1.5
                  w-full
                  min-w-0
                  rounded-xl
                  border
                  border-gray-200
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="text-xs min-[380px]:text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={data.category}
                onChange={handleChange}
                placeholder="Birthday Card"
                required
                disabled={loading}
                className="
                  mt-1.5
                  w-full
                  min-w-0
                  rounded-xl
                  border
                  border-gray-200
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* STOCK */}

            <div>
              <label className="text-xs min-[380px]:text-sm font-medium text-gray-700">
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
                  mt-1.5
                  w-full
                  min-w-0
                  rounded-xl
                  border
                  border-gray-200
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* IMAGE */}

            <div>
              <label className="text-xs min-[380px]:text-sm font-medium text-gray-700">
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
                  mt-1.5
                  w-full
                  min-w-0
                  rounded-xl
                  border
                  border-gray-200
                  px-3
                  min-[380px]:px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-50
                "
              />
            </div>

          </div>

          {/* ================= DESCRIPTION ================= */}

          <div className="mt-3 min-[380px]:mt-4">

            <label className="text-xs min-[380px]:text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter card description"
              rows="3"
              required
              disabled={loading}
              className="
                mt-1.5
                w-full
                min-w-0
                resize-none
                rounded-xl
                border
                border-gray-200
                px-3
                min-[380px]:px-4
                py-2.5
                text-sm
                outline-none
                focus:border-pink-400
                focus:ring-2
                focus:ring-pink-100
                disabled:bg-gray-50
              "
            />

          </div>

          {/* ================= AVAILABILITY ================= */}

          <label className="flex items-center gap-2 mt-3 min-[380px]:mt-4 cursor-pointer">

            <input
              type="checkbox"
              name="isAvailable"
              checked={data.isAvailable}
              onChange={handleChange}
              disabled={loading}
              className="h-4 w-4 accent-pink-500 shrink-0"
            />

            <span className="text-xs min-[380px]:text-sm text-gray-700">
              Card is available
            </span>

          </label>

          {/* ================= BUTTONS ================= */}

          <div className="flex flex-col min-[380px]:flex-row min-[380px]:justify-end gap-2 min-[380px]:gap-3 mt-4 min-[380px]:mt-5 pt-3 min-[380px]:pt-4 border-t border-gray-100">

            <button
              type="button"
              onClick={() =>
                dispatch(closeCreateCardPopup())
              }
              disabled={loading}
              className="
                w-full
                min-[380px]:w-auto
                px-5
                py-2.5
                rounded-xl
                border
                border-gray-200
                text-sm
                font-medium
                text-gray-600
                hover:bg-gray-50
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
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
                px-6
                py-2.5
                rounded-xl
                bg-pink-500
                text-white
                text-sm
                font-medium
                hover:bg-pink-600
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
                flex
                items-center
                justify-center
                gap-2
                min-w-[135px]
              "
            >

              {loading && (
                <span
                  className="
                    h-4
                    w-4
                    rounded-full
                    border-2
                    border-white
                    border-t-transparent
                    animate-spin
                    shrink-0
                  "
                />
              )}

              {loading
                ? "Creating..."
                : "Create Card"}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};
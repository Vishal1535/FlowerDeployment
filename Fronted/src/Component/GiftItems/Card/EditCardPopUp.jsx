import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import {
  closeEditCardPopup,
} from "../../../Store/Card/CardSlice";

import { UpdateCardThunk } from "../../../Store/Card/CardApi";

export const EditCardPopUp = () => {
  const dispatch = useDispatch();

  const {
    isEditCardPopupOpen,
    selectedCard,
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

  // ============================
  // LOAD SELECTED CARD
  // ============================

  useEffect(() => {
    if (selectedCard) {
      setData({
        name: selectedCard.name || "",
        description: selectedCard.description || "",
        price: selectedCard.price ?? "",
        image: selectedCard.image || "",
        occasion: selectedCard.occasion || "",
        category: selectedCard.category || "",
        stock: selectedCard.stock ?? "",
        isAvailable: selectedCard.isAvailable ?? true,
      });
    }
  }, [selectedCard]);

  if (!isEditCardPopupOpen || !selectedCard) {
    return null;
  }

  // ============================
  // HANDLE CHANGE
  // ============================

  const handleChange = (e) => {
    const {
      name,
      value,
      checked,
      type,
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
      UpdateCardThunk({
        id: selectedCard._id,

        data: {
          ...data,
          price: Number(data.price),
          stock: Number(data.stock),
        },
      })
    );

    // ============================
    // SUCCESS
    // ============================

    if (UpdateCardThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message || "Card updated successfully"
      );

      dispatch(closeEditCardPopup());
      return;
    }

    // ============================
    // ERROR
    // ============================

    toast.error(
      result.payload || "Failed to update card"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 min-[380px]:px-4 py-3 sm:py-6 overflow-y-auto">

      <div className="w-full max-w-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between gap-3 px-4 min-[380px]:px-5 py-3.5 min-[380px]:py-4 border-b">

          <div className="min-w-0">
            <h2 className="text-base min-[380px]:text-lg font-semibold text-gray-800 truncate">
              Edit Card
            </h2>

            <p className="text-[11px] min-[380px]:text-xs text-gray-500">
              Update card details
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              dispatch(closeEditCardPopup())
            }
            disabled={loading}
            className="
              p-1.5
              min-[380px]:p-2
              shrink-0
              rounded-full
              hover:bg-gray-100
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <X size={18} className="min-[380px]:w-[19px] min-[380px]:h-[19px]" />
          </button>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="p-4 min-[380px]:p-5 space-y-3"
        >

          {/* NAME */}

          <div>
            <label className="text-[11px] min-[380px]:text-xs font-medium text-gray-600">
              Card Name
            </label>

            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              disabled={loading}
              required
              className="
                w-full
                min-w-0
                mt-1
                px-3
                py-2
                text-sm
                rounded-lg
                border
                border-gray-200
                outline-none
                focus:border-pink-400
                disabled:bg-gray-50
              "
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="text-[11px] min-[380px]:text-xs font-medium text-gray-600">
              Description
            </label>

            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              disabled={loading}
              rows={2}
              required
              className="
                w-full
                min-w-0
                mt-1
                px-3
                py-2
                text-sm
                rounded-lg
                border
                border-gray-200
                outline-none
                resize-none
                focus:border-pink-400
                disabled:bg-gray-50
              "
            />
          </div>

          {/* PRICE + STOCK */}

          <div className="grid grid-cols-2 gap-2 min-[380px]:gap-3">

            <div className="min-w-0">
              <label className="text-[11px] min-[380px]:text-xs font-medium text-gray-600">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                disabled={loading}
                min="0"
                required
                className="
                  w-full
                  min-w-0
                  mt-1
                  px-3
                  py-2
                  text-sm
                  rounded-lg
                  border
                  border-gray-200
                  outline-none
                  focus:border-pink-400
                  disabled:bg-gray-50
                "
              />
            </div>

            <div className="min-w-0">
              <label className="text-[11px] min-[380px]:text-xs font-medium text-gray-600">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                disabled={loading}
                min="0"
                required
                className="
                  w-full
                  min-w-0
                  mt-1
                  px-3
                  py-2
                  text-sm
                  rounded-lg
                  border
                  border-gray-200
                  outline-none
                  focus:border-pink-400
                  disabled:bg-gray-50
                "
              />
            </div>

          </div>

          {/* IMAGE */}

          <div>
            <label className="text-[11px] min-[380px]:text-xs font-medium text-gray-600">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={data.image}
              onChange={handleChange}
              disabled={loading}
              required
              className="
                w-full
                min-w-0
                mt-1
                px-3
                py-2
                text-sm
                rounded-lg
                border
                border-gray-200
                outline-none
                focus:border-pink-400
                disabled:bg-gray-50
              "
            />
          </div>

          {/* OCCASION + CATEGORY */}

          <div className="grid grid-cols-2 gap-2 min-[380px]:gap-3">

            <div className="min-w-0">
              <label className="text-[11px] min-[380px]:text-xs font-medium text-gray-600">
                Occasion
              </label>

              <input
                type="text"
                name="occasion"
                value={data.occasion}
                onChange={handleChange}
                disabled={loading}
                required
                className="
                  w-full
                  min-w-0
                  mt-1
                  px-3
                  py-2
                  text-sm
                  rounded-lg
                  border
                  border-gray-200
                  outline-none
                  focus:border-pink-400
                  disabled:bg-gray-50
                "
              />
            </div>

            <div className="min-w-0">
              <label className="text-[11px] min-[380px]:text-xs font-medium text-gray-600">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={data.category}
                onChange={handleChange}
                disabled={loading}
                required
                className="
                  w-full
                  min-w-0
                  mt-1
                  px-3
                  py-2
                  text-sm
                  rounded-lg
                  border
                  border-gray-200
                  outline-none
                  focus:border-pink-400
                  disabled:bg-gray-50
                "
              />
            </div>

          </div>

          {/* AVAILABILITY */}

          <label className="flex items-center gap-2 text-xs min-[380px]:text-sm text-gray-600">

            <input
              type="checkbox"
              name="isAvailable"
              checked={data.isAvailable}
              onChange={handleChange}
              disabled={loading}
              className="accent-pink-500 shrink-0"
            />

            Card is available

          </label>

          {/* ================= BUTTONS ================= */}

          <div className="flex flex-col min-[380px]:flex-row min-[380px]:justify-end gap-2 pt-3 border-t">

            <button
              type="button"
              onClick={() =>
                dispatch(closeEditCardPopup())
              }
              disabled={loading}
              className="
                w-full
                min-[380px]:w-auto
                px-4
                py-2
                rounded-lg
                border
                border-gray-200
                text-sm
                hover:bg-gray-50
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
                px-5
                py-2
                rounded-lg
                bg-pink-500
                text-white
                text-sm
                hover:bg-pink-600
                disabled:opacity-50
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2
                min-w-[125px]
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
                ? "Updating..."
                : "Update Card"}

            </button>

          </div>

        </form>
      </div>
    </div>
  );
};
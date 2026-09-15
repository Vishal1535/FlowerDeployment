import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  closeEditChocolatePopup,
} from "../../../Store/Chocolate/ChocolateSlice";

import {
  UpdateChocolateThunk,
} from "../../../Store/Chocolate/ChocolateApi";

export const EditChocolatePopUp = () => {
  const dispatch = useDispatch();

  const {
    isEditChocolatePopupOpen,
    selectedChocolate,
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

  // ================= LOAD SELECTED CHOCOLATE =================

  useEffect(() => {
    if (selectedChocolate) {
      setData({
        name: selectedChocolate.name || "",
        description: selectedChocolate.description || "",
        price: selectedChocolate.price ?? "",
        image: selectedChocolate.image || "",
        size: selectedChocolate.size || "",
        stock: selectedChocolate.stock ?? "",
        category: selectedChocolate.category || "",
        isAvailable:
          selectedChocolate.isAvailable ?? true,
      });
    }
  }, [selectedChocolate]);

  if (
    !isEditChocolatePopupOpen ||
    !selectedChocolate
  ) {
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
      UpdateChocolateThunk({
        id: selectedChocolate._id,

        data: {
          ...data,
          price: Number(data.price),
          stock: Number(data.stock),
        },
      })
    );

    // ================= SUCCESS =================

    if (UpdateChocolateThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
          "Chocolate updated successfully"
      );

      dispatch(closeEditChocolatePopup());
    }

    // ================= ERROR =================

    if (UpdateChocolateThunk.rejected.match(result)) {
      toast.error(
        result.payload ||
          "Failed to update chocolate"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Chocolate
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update chocolate details
            </p>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              dispatch(closeEditChocolatePopup())
            }
            className="
              w-9
              h-9
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
            <X size={20} />
          </button>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* NAME */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Chocolate Name
              </label>

              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-2.5
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
              <label className="text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                required
                min="0"
                disabled={loading}
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-2.5
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
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={data.category}
                onChange={handleChange}
                required
                disabled={loading}
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-2.5
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* SIZE */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Size
              </label>

              <input
                type="text"
                name="size"
                value={data.size}
                onChange={handleChange}
                required
                placeholder="e.g. 100g"
                disabled={loading}
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-2.5
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
              <label className="text-sm font-medium text-gray-700">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                min="0"
                disabled={loading}
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-2.5
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
              <label className="text-sm font-medium text-gray-700">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={data.image}
                onChange={handleChange}
                required
                disabled={loading}
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-2.5
                  outline-none
                  focus:border-pink-400
                  focus:ring-2
                  focus:ring-pink-100
                  disabled:bg-gray-50
                "
              />
            </div>

          </div>

          {/* DESCRIPTION */}

          <div className="mt-4">

            <label className="text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              rows="2"
              required
              disabled={loading}
              className="
                mt-1.5
                w-full
                resize-none
                rounded-xl
                border
                border-gray-200
                px-4
                py-2.5
                outline-none
                focus:border-pink-400
                focus:ring-2
                focus:ring-pink-100
                disabled:bg-gray-50
              "
            />

          </div>

          {/* AVAILABILITY */}

          <label
            className={`flex items-center gap-2 mt-4 ${
              loading
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer"
            }`}
          >

            <input
              type="checkbox"
              name="isAvailable"
              checked={data.isAvailable}
              onChange={handleChange}
              disabled={loading}
              className="h-4 w-4 accent-pink-500"
            />

            <span className="text-sm text-gray-700">
              Product is available
            </span>

          </label>

          {/* BUTTONS */}

          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">

            {/* CANCEL */}

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                dispatch(closeEditChocolatePopup())
              }
              className="
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

            {/* UPDATE */}

            <button
              type="submit"
              disabled={loading}
              className="
                min-w-[150px]
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
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Updating...
                </>
              ) : (
                "Update Chocolate"
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};
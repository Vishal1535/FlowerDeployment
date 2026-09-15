import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { closeEditMiniCupcakePopup } from "../../../Store/MiniCupCake/MiniCupCakeSlice";
import { UpdateMiniCupcakeThunk } from "../../../Store/MiniCupCake/MIniCupCakeApi";

export const EditMiniCupcakePopUp = () => {
  const dispatch = useDispatch();

  const {
    isEditMiniCupcakePopupOpen,
    selectedMiniCupcake,
    loading,
  } = useSelector((state) => state.miniCupCake);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    occasion: "",
    flavor: "",
    quantity: "",
    stock: "",
    category: "",
    isAvailable: true,
  });

  // ============================
  // LOAD SELECTED CUPCAKE
  // ============================

  useEffect(() => {
    if (selectedMiniCupcake) {
      setData({
        name: selectedMiniCupcake.name || "",
        description: selectedMiniCupcake.description || "",
        price: selectedMiniCupcake.price ?? "",
        image: selectedMiniCupcake.image || "",
        occasion: selectedMiniCupcake.occasion || "",
        flavor: selectedMiniCupcake.flavor || "",
        quantity: selectedMiniCupcake.quantity ?? "",
        stock: selectedMiniCupcake.stock ?? "",
        category: selectedMiniCupcake.category || "",
        isAvailable: selectedMiniCupcake.isAvailable ?? true,
      });
    }
  }, [selectedMiniCupcake]);

  if (
    !isEditMiniCupcakePopupOpen ||
    !selectedMiniCupcake
  ) {
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
      UpdateMiniCupcakeThunk({
        id: selectedMiniCupcake._id,

        data: {
          ...data,
          price: Number(data.price),
          quantity: Number(data.quantity),
          stock: Number(data.stock),
        },
      })
    );

    if (UpdateMiniCupcakeThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
          "Mini cupcake updated successfully"
      );

      dispatch(closeEditMiniCupcakePopup());
    } else {
      toast.error(
        result.payload ||
          "Failed to update mini cupcake"
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
              Edit Mini Cupcake
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update mini cupcake details
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              dispatch(closeEditMiniCupcakePopup())
            }
            disabled={loading}
            className="
              w-9
              h-9
              rounded-full
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

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* NAME */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Cupcake Name
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

            {/* OCCASION */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Occasion
              </label>

              <input
                type="text"
                name="occasion"
                value={data.occasion}
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

            {/* FLAVOR */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Flavor
              </label>

              <input
                type="text"
                name="flavor"
                value={data.flavor}
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

            {/* QUANTITY */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={data.quantity}
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

          {/* ================= DESCRIPTION ================= */}

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

          {/* ================= AVAILABILITY ================= */}

          <label className="flex items-center gap-2 mt-4 cursor-pointer">

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

          {/* ================= BUTTONS ================= */}

          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">

            <button
              type="button"
              onClick={() =>
                dispatch(closeEditMiniCupcakePopup())
              }
              disabled={loading}
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
                disabled:opacity-50
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                px-6
                py-2.5
                rounded-xl
                bg-pink-500
                text-white
                text-sm
                font-medium
                hover:bg-pink-600
                disabled:opacity-50
                transition
                flex
                items-center
                gap-2
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
                  "
                />
              )}

              {loading
                ? "Updating..."
                : "Update Mini Cupcake"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};
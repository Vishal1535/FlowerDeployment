import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { updateBouquetThunk } from "../../../Store/Bouquest/BouquestApi";
import { closeEditBouquetPopup } from "../../../Store/Bouquest/BouquestSlice";

export const EditBouquet = () => {
  const dispatch = useDispatch();

  const {
    singleBouquet,
    isEditBouquetPopupOpen,
    loading,
  } = useSelector((state) => state.bouquet);

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

  // ==============================
  // SET BOUQUET DATA
  // ==============================

  useEffect(() => {
    if (singleBouquet) {
      setFormData({
        name: singleBouquet.name || "",
        description: singleBouquet.description || "",
        price: singleBouquet.price ?? "",
        image: singleBouquet.image || "",
        occasion: singleBouquet.occasion || "",
        size: singleBouquet.size || "",
        stock: singleBouquet.stock ?? "",
        category: singleBouquet.category || "",

        flowerCount: singleBouquet.flowerCount ?? "",

        flowers: Array.isArray(singleBouquet.flowers)
          ? singleBouquet.flowers.join(", ")
          : "",

        isAvailable: singleBouquet.isAvailable ?? true,
      });
    }
  }, [singleBouquet]);

  // ==============================
  // HANDLE CHANGE
  // ==============================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==============================
  // HANDLE SUBMIT
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!singleBouquet?._id) {
      toast.error("Bouquet not found");
      return;
    }

    // Required fields
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      formData.price === "" ||
      !formData.image.trim() ||
      !formData.occasion ||
      !formData.size ||
      formData.stock === "" ||
      !formData.category.trim() ||
      formData.flowerCount === "" ||
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

    // ==============================
    // CONVERT FLOWERS STRING TO ARRAY
    // ==============================

    const flowersArray = formData.flowers
      .split(",")
      .map((flower) => flower.trim())
      .filter((flower) => flower.length > 0);

    if (flowersArray.length === 0) {
      toast.error("Please enter at least one flower");
      return;
    }

    // ==============================
    // DATA TO BACKEND
    // ==============================

    const data = {
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

    console.log("Update Bouquet Data:", data);

    try {
      const result = await dispatch(
        updateBouquetThunk({
          id: singleBouquet._id,
          data,
        })
      );

      if (updateBouquetThunk.fulfilled.match(result)) {
        toast.success("Bouquet updated successfully");

        dispatch(closeEditBouquetPopup());
      } else {
        toast.error(
          result.payload || "Failed to update bouquet"
        );
      }
    } catch (error) {
      console.error("Update Bouquet Error:", error);

      toast.error("Something went wrong");
    }
  };

  // ==============================
  // CLOSE POPUP
  // ==============================

  if (!isEditBouquetPopupOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-md
        p-4
        animate-overlay
      "
    >
      {/* ================= POPUP ================= */}

      <div
        className="
          w-full
          max-w-4xl
          max-h-[95vh]
          overflow-y-auto
          rounded-[28px]
          bg-white
          shadow-[0_30px_100px_rgba(0,0,0,0.28)]
          animate-popup
        "
      >
        {/* ================= HEADER ================= */}

        <div
          className="
            relative
            flex
            items-center
            justify-between
            px-6
            sm:px-8
            py-5
            bg-gradient-to-r
            from-pink-50
            via-white
            to-rose-50
            border-b
            border-pink-100
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-12
              w-32
              h-32
              rounded-full
              bg-pink-100/50
            "
          />

          <div className="relative flex items-center gap-3">
            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-white
                border
                border-pink-100
                shadow-sm
                flex
                items-center
                justify-center
                text-xl
                animate-icon
              "
            >
              💐
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  font-bold
                  text-pink-500
                "
              >
                Bouquet Management
              </p>

              <h2
                className="
                  text-xl
                  sm:text-2xl
                  font-extrabold
                  text-gray-900
                "
              >
                Edit Bouquet
              </h2>
            </div>
          </div>

          {/* Close */}

          <button
            type="button"
            onClick={() => {
              dispatch(closeEditBouquetPopup());
            }}
            className="
              relative
              z-10
              w-10
              h-10
              rounded-full
              bg-white
              border
              border-gray-200
              text-gray-500
              text-xl
              flex
              items-center
              justify-center
              hover:bg-gray-900
              hover:text-white
              hover:rotate-90
              hover:scale-105
              transition-all
              duration-300
            "
          >
            ×
          </button>
        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-7"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* ================= LEFT ================= */}

            <div className="space-y-4">

              {/* Name */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Bouquet Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Romantic Rose Bouquet"
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/60
                    text-sm
                    outline-none
                    focus:bg-white
                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50
                  "
                />
              </div>

              {/* Description */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe this beautiful bouquet..."
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/60
                    text-sm
                    leading-5
                    outline-none
                    resize-none
                    focus:bg-white
                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50
                  "
                />
              </div>

              {/* Price + Stock */}

              <div className="grid grid-cols-2 gap-3">

                {/* Price */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Price
                  </label>

                  <div className="relative">
                    <span
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        font-bold
                      "
                    >
                      ₹
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      placeholder="0"
                      className="
                        w-full
                        h-11
                        pl-8
                        pr-3
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50/60
                        font-semibold
                        outline-none
                        focus:bg-white
                        focus:border-pink-400
                        focus:ring-4
                        focus:ring-pink-50
                      "
                    />
                  </div>
                </div>

                {/* Stock */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                    className="
                      w-full
                      h-11
                      px-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50/60
                      font-semibold
                      outline-none
                      focus:bg-white
                      focus:border-pink-400
                      focus:ring-4
                      focus:ring-pink-50
                    "
                  />
                </div>
              </div>

              {/* Image URL */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/bouquet.jpg"
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/60
                    text-sm
                    outline-none
                    focus:bg-white
                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50
                  "
                />
              </div>

              {/* Flower Count */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Number of Flowers
                </label>

                <input
                  type="number"
                  name="flowerCount"
                  value={formData.flowerCount}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g. 12"
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/60
                    text-sm
                    font-semibold
                    outline-none
                    focus:bg-white
                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50
                  "
                />
              </div>

              {/* Flowers */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
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
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/60
                    text-sm
                    outline-none
                    focus:bg-white
                    focus:border-pink-400
                    focus:ring-4
                    focus:ring-pink-50
                  "
                />

                <p className="mt-1 text-[10px] text-gray-400">
                  Separate multiple flowers with commas
                </p>
              </div>
            </div>

            {/* ================= RIGHT ================= */}

            <div className="space-y-4">

              {/* Image Preview */}

              <div
                className="
                  relative
                  h-[180px]
                  rounded-2xl
                  overflow-hidden
                  bg-gradient-to-br
                  from-pink-50
                  to-rose-100
                  border
                  border-pink-100
                "
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Bouquet Preview"
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      hover:scale-105
                    "
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    className="
                      w-full
                      h-full
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-gray-400
                    "
                  >
                    <span className="text-3xl">
                      💐
                    </span>

                    <span className="text-xs mt-1">
                      Image Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Occasion + Category */}

              <div className="grid grid-cols-2 gap-3">

                {/* Occasion */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Occasion
                  </label>

                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="
                      w-full
                      h-11
                      px-3
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50/60
                      text-sm
                      outline-none
                      focus:bg-white
                      focus:border-pink-400
                      focus:ring-4
                      focus:ring-pink-50
                    "
                  >
                    <option value="">Select</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Valentine">Valentine</option>
                    
                    <option value="Mother's Day">
                      Mother's Day
                    </option>
                    <option value="Friendship">
                      Friendship
                    </option>
                    <option value="GetWellSoon">Get Well Soon</option>
                    <option value="Congratulations">
                      Congratulations
                    </option>
                  </select>
                </div>

                {/* Category */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Roses"
                    className="
                      w-full
                      h-11
                      px-3
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50/60
                      text-sm
                      outline-none
                      focus:bg-white
                      focus:border-pink-400
                      focus:ring-4
                      focus:ring-pink-50
                    "
                  />
                </div>
              </div>

              {/* Size */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Bouquet Size
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {["Small", "Medium", "Large"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          size,
                        }))
                      }
                      className={`
                        h-10
                        rounded-xl
                        border
                        text-sm
                        font-semibold
                        transition-all
                        duration-300
                        ${
                          formData.size === size
                            ? "bg-pink-500 text-white border-pink-500 shadow-lg shadow-pink-100 scale-[1.03]"
                            : "bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500"
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flower Information Preview */}

              <div
                className="
                  p-4
                  rounded-2xl
                  bg-pink-50
                  border
                  border-pink-100
                "
              >
                <p className="text-sm font-bold text-gray-800">
                  Flower Details
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {formData.flowerCount || 0} flowers
                </p>

                {formData.flowers && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.flowers
                      .split(",")
                      .map((flower) => flower.trim())
                      .filter(Boolean)
                      .map((flower, index) => (
                        <span
                          key={`${flower}-${index}`}
                          className="
                            px-2
                            py-1
                            rounded-full
                            bg-white
                            border
                            border-pink-100
                            text-xs
                            text-pink-600
                          "
                        >
                          {flower}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {/* Availability */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  p-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-green-50
                  to-emerald-50
                  border
                  border-green-100
                "
              >
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Bouquet Available
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Show this bouquet to customers
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isAvailable: !prev.isAvailable,
                    }))
                  }
                  className={`
                    relative
                    w-12
                    h-7
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      formData.isAvailable
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }
                  `}
                >
                  <span
                    className={`
                      absolute
                      top-1
                      w-5
                      h-5
                      rounded-full
                      bg-white
                      shadow-md
                      transition-all
                      duration-300
                      ${
                        formData.isAvailable
                          ? "left-6"
                          : "left-1"
                      }
                    `}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ================= BUTTONS ================= */}

          <div
            className="
              flex
              gap-3
              mt-6
              pt-5
              border-t
              border-gray-100
            "
          >
            <button
              type="button"
              onClick={() => {
                dispatch(closeEditBouquetPopup());
              }}
              className="
                flex-1
                h-11
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-700
                text-sm
                font-bold
                hover:bg-gray-50
                transition-all
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                h-11
                rounded-xl
                bg-gradient-to-r
                from-pink-500
                to-rose-500
                text-white
                text-sm
                font-bold
                shadow-lg
                shadow-pink-100
                hover:from-pink-600
                hover:to-rose-600
                active:scale-[0.98]
                disabled:opacity-50
                transition-all
              "
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* ================= ANIMATION ================= */}

      <style>
        {`
          @keyframes overlayFade {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes popupEnter {
            from {
              opacity: 0;
              transform: translateY(25px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes iconFloat {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-3px);
            }
          }

          .animate-overlay {
            animation: overlayFade 0.25s ease-out;
          }

          .animate-popup {
            animation: popupEnter 0.35s
              cubic-bezier(0.22, 1, 0.36, 1);
          }

          .animate-icon {
            animation: iconFloat 2.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};
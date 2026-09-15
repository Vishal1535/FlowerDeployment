import React from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  closeDeleteComboBouquetPopup,
} from "../../../Store/ComboBouquet/ComboBouquetSlice";

import {
  DeleteComboBouquetThunk,
} from "../../../Store/ComboBouquet/ComboBouquetApi";

export const DeleteComboBouquetPopUp = () => {
  const dispatch = useDispatch();

  const {
    isDeleteComboBouquetPopupOpen,
    selectedComboBouquet,
    loading,
  } = useSelector((state) => state.comboBouquet);

  const handleClose = () => {
    if (!loading) {
      dispatch(closeDeleteComboBouquetPopup());
    }
  };

  const handleDelete = async () => {
    if (!selectedComboBouquet?._id) {
      return;
    }

    await dispatch(
      DeleteComboBouquetThunk(selectedComboBouquet._id)
    );
  };

  if (!isDeleteComboBouquetPopupOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 min-[380px]:p-3 sm:p-4">

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
          max-w-md
          bg-white
          rounded-xl
          min-[380px]:rounded-2xl
          shadow-xl
          p-4
          min-[380px]:p-5
          sm:p-6
        "
      >

        {/* ================= CLOSE BUTTON ================= */}

        <button
          type="button"
          onClick={handleClose}
          disabled={loading}
          className="
            absolute
            top-3
            right-3
            min-[380px]:top-4
            min-[380px]:right-4
            w-8
            h-8
            min-[380px]:w-9
            min-[380px]:h-9
            rounded-lg
            flex
            items-center
            justify-center
            text-gray-500
            hover:bg-gray-100
            disabled:opacity-50
            transition
          "
        >
          <X size={19} />
        </button>

        {/* ================= WARNING ICON ================= */}

        <div
          className="
            w-12
            h-12
            min-[380px]:w-14
            min-[380px]:h-14
            rounded-xl
            min-[380px]:rounded-2xl
            bg-red-50
            flex
            items-center
            justify-center
            mb-4
            min-[380px]:mb-5
          "
        >
          <AlertTriangle
            size={25}
            className="text-red-500"
          />
        </div>

        {/* ================= CONTENT ================= */}

        <h2 className="text-lg min-[380px]:text-xl font-semibold text-gray-800 pr-8">
          Delete Combo Bouquet?
        </h2>

        <p className="text-xs min-[380px]:text-sm text-gray-500 mt-2 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-700 break-words">
            {selectedComboBouquet?.name}
          </span>
          ? This action cannot be undone.
        </p>

        {/* ================= BOUQUET INFO ================= */}

        {selectedComboBouquet?.image && (
          <div
            className="
              flex
              items-center
              gap-3
              mt-4
              min-[380px]:mt-5
              p-2.5
              min-[380px]:p-3
              bg-gray-50
              rounded-xl
            "
          >

            <img
              src={selectedComboBouquet.image}
              alt={selectedComboBouquet.name}
              className="
                w-11
                h-11
                min-[380px]:w-12
                min-[380px]:h-12
                shrink-0
                rounded-lg
                object-cover
              "
            />

            <div className="min-w-0">
              <p className="text-xs min-[380px]:text-sm font-medium text-gray-800 truncate">
                {selectedComboBouquet.name}
              </p>

              <p className="text-xs min-[380px]:text-sm text-pink-600 font-medium mt-0.5">
                ₹{selectedComboBouquet.price}
              </p>
            </div>

          </div>
        )}

        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col min-[380px]:flex-row gap-2.5 min-[380px]:gap-3 mt-6 min-[380px]:mt-7">

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              w-full
              min-[380px]:flex-1
              py-2.5
              rounded-xl
              border
              border-gray-200
              text-gray-600
              text-sm
              font-medium
              hover:bg-gray-50
              disabled:opacity-60
              transition
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="
              w-full
              min-[380px]:flex-1
              flex
              items-center
              justify-center
              gap-2
              py-2.5
              rounded-xl
              bg-red-500
              text-white
              text-sm
              font-medium
              hover:bg-red-600
              disabled:opacity-60
              disabled:cursor-not-allowed
              transition
            "
          >
            {loading && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
};
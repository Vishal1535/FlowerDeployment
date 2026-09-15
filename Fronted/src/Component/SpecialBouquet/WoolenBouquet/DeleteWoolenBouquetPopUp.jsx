import React from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  closeDeleteWoolenPopup,
} from "../../../Store/Woolen/WoolenSlice";

import {
  DeleteWoolenThunk,
} from "../../../Store/Woolen/WoolenApi";

export const DeleteWoolenBouquetPopUp = () => {
  const dispatch = useDispatch();

  const {
    isDeleteWoolenPopupOpen,
    selectedWoolen,
    loading,
  } = useSelector((state) => state.woolen);

  const handleClose = () => {
    if (!loading) {
      dispatch(closeDeleteWoolenPopup());
    }
  };

  const handleDelete = async () => {
    if (!selectedWoolen?._id) {
      return;
    }

    await dispatch(
      DeleteWoolenThunk(selectedWoolen._id)
    );
  };

  if (!isDeleteWoolenPopupOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* OVERLAY */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* POPUP */}
      <div
        className="
          relative
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-xl
          p-6
        "
      >

        {/* CLOSE */}
        <button
          type="button"
          onClick={handleClose}
          disabled={loading}
          className="
            absolute
            top-4
            right-4
            w-9
            h-9
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
          <X size={20} />
        </button>

        {/* WARNING ICON */}
        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-red-50
            flex
            items-center
            justify-center
            mb-5
          "
        >
          <AlertTriangle
            size={28}
            className="text-red-500"
          />
        </div>

        {/* CONTENT */}
        <h2 className="text-xl font-semibold text-gray-800">
          Delete Woolen Bouquet?
        </h2>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-700">
            {selectedWoolen?.name}
          </span>
          ? This action cannot be undone.
        </p>

        {/* WOOLEN INFO */}
        {selectedWoolen?.image && (
          <div
            className="
              flex
              items-center
              gap-3
              mt-5
              p-3
              bg-gray-50
              rounded-xl
            "
          >
            <img
              src={selectedWoolen.image}
              alt={selectedWoolen.name}
              className="
                w-12
                h-12
                rounded-lg
                object-cover
              "
            />

            <div>
              <p className="text-sm font-medium text-gray-800">
                {selectedWoolen.name}
              </p>

              <p className="text-sm text-pink-600 font-medium mt-0.5">
                ₹{selectedWoolen.price}
              </p>
            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex gap-3 mt-7">

          {/* CANCEL */}
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              flex-1
              py-2.5
              rounded-xl
              border
              border-gray-200
              text-gray-600
              font-medium
              hover:bg-gray-50
              disabled:opacity-60
              transition
            "
          >
            Cancel
          </button>

          {/* DELETE */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-2.5
              rounded-xl
              bg-red-500
              text-white
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
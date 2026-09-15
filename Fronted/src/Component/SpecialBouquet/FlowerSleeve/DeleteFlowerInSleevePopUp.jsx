import React from "react";
import { Trash2, X, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  closeDeleteFlowerInSleevePopup,
} from "../../../Store/FlowerSleeve/FlowerSleeveSlice";

import {
  DeleteFlowerInSleeveThunk,
} from "../../../Store/FlowerSleeve/FlowerSleeveApi";

export const DeleteFlowerInSleevePopUp = () => {
  const dispatch = useDispatch();

  const {
    isDeleteFlowerInSleevePopupOpen,
    selectedFlowerInSleeve,
    loading,
  } = useSelector(
    (state) => state.flowerInSleeve
  );

  // ================= DELETE =================

  const handleDelete = async () => {
    if (!selectedFlowerInSleeve?._id) {
      toast.error("Flower in sleeve not selected");
      return;
    }

    const result = await dispatch(
      DeleteFlowerInSleeveThunk(
        selectedFlowerInSleeve._id
      )
    );

    // ================= SUCCESS =================

    if (DeleteFlowerInSleeveThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
          "Flower in sleeve deleted successfully"
      );

      dispatch(
        closeDeleteFlowerInSleevePopup()
      );
    }

    // ================= ERROR =================

    else {
      toast.error(
        result.payload ||
          "Failed to delete flower in sleeve"
      );
    }
  };

  // ================= CLOSE =================

  const handleClose = () => {
    if (!loading) {
      dispatch(
        closeDeleteFlowerInSleevePopup()
      );
    }
  };

  // ================= HIDDEN =================

  if (!isDeleteFlowerInSleevePopupOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">

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
          rounded-2xl
          shadow-xl
          p-6
        "
      >

        {/* ================= CLOSE ================= */}

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
            rounded-xl
            flex
            items-center
            justify-center
            text-gray-500
            hover:bg-gray-100
            disabled:opacity-50
          "
        >
          <X size={19} />
        </button>

        {/* ================= ICON ================= */}

        <div
          className="
            w-14
            h-14
            rounded-full
            bg-red-50
            flex
            items-center
            justify-center
            mb-5
          "
        >
          <Trash2
            size={25}
            className="text-red-500"
          />
        </div>

        {/* ================= TITLE ================= */}

        <h2 className="text-xl font-semibold text-gray-800">
          Delete Flower In Sleeve?
        </h2>

        <p className="text-sm text-gray-500 mt-2 leading-6">
          Are you sure you want to delete
          {" "}
          <span className="font-medium text-gray-700">
            {selectedFlowerInSleeve?.name ||
              "this flower sleeve"}
          </span>
          ?
          This action cannot be undone.
        </p>

        {/* ================= BUTTONS ================= */}

        <div className="flex justify-end gap-3 mt-6">

          {/* CANCEL */}

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              px-5
              py-2.5
              rounded-xl
              border
              border-gray-200
              text-gray-600
              text-sm
              font-medium
              hover:bg-gray-50
              disabled:opacity-50
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
              flex
              items-center
              justify-center
              gap-2
              px-5
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
                size={17}
                className="animate-spin"
              />
            )}

            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
};
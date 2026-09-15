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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 min-[380px]:p-3 sm:p-4">

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
          max-h-[95vh]
          overflow-y-auto
          bg-white
          rounded-xl
          min-[380px]:rounded-2xl
          shadow-xl
          p-4
          min-[380px]:p-5
          sm:p-6
        "
      >

        {/* ================= CLOSE ================= */}

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
            rounded-xl
            flex
            items-center
            justify-center
            text-gray-500
            hover:bg-gray-100
            disabled:opacity-50
          "
        >
          <X size={18} />
        </button>

        {/* ================= ICON ================= */}

        <div
          className="
            w-12
            h-12
            min-[380px]:w-14
            min-[380px]:h-14
            rounded-full
            bg-red-50
            flex
            items-center
            justify-center
            mb-4
            min-[380px]:mb-5
          "
        >
          <Trash2
            size={23}
            className="text-red-500"
          />
        </div>

        {/* ================= TITLE ================= */}

        <h2 className="text-lg min-[380px]:text-xl font-semibold text-gray-800 pr-8">
          Delete Flower In Sleeve?
        </h2>

        <p className="text-xs min-[380px]:text-sm text-gray-500 mt-2 leading-5 min-[380px]:leading-6 break-words">
          Are you sure you want to delete
          {" "}
          <span className="font-medium text-gray-700 break-words">
            {selectedFlowerInSleeve?.name ||
              "this flower sleeve"}
          </span>
          ?
          This action cannot be undone.
        </p>

        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col min-[380px]:flex-row justify-end gap-2.5 min-[380px]:gap-3 mt-5 min-[380px]:mt-6">

          {/* CANCEL */}

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              w-full
              min-[380px]:w-auto
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
              w-full
              min-[380px]:w-auto
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
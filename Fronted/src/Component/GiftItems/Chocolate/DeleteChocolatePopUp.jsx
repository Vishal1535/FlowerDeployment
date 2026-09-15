import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  closeDeleteChocolatePopup,
} from "../../../Store/Chocolate/ChocolateSlice";

import {
  DeleteChocolateThunk,
} from "../../../Store/Chocolate/ChocolateApi";

export const DeleteChocolatePopUp = () => {
  const dispatch = useDispatch();

  const {
    isDeleteChocolatePopupOpen,
    selectedChocolate,
    loading,
  } = useSelector((state) => state.chocolate);

  if (
    !isDeleteChocolatePopupOpen ||
    !selectedChocolate
  ) {
    return null;
  }

  // ================= DELETE =================

  const handleDelete = async () => {
    const result = await dispatch(
      DeleteChocolateThunk(selectedChocolate._id)
    );

    if (DeleteChocolateThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
          "Chocolate deleted successfully"
      );

      dispatch(closeDeleteChocolatePopup());
    }

    if (DeleteChocolateThunk.rejected.match(result)) {
      toast.error(
        result.payload ||
          "Failed to delete chocolate"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 sm:px-4 py-4">

      <div className="w-full max-w-md bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">

          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">

            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle
                size={18}
                className="sm:w-5 sm:h-5 text-red-500"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                Delete Chocolate
              </h2>

              <p className="text-[11px] sm:text-xs text-gray-500">
                This action cannot be undone
              </p>
            </div>

          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              dispatch(closeDeleteChocolatePopup())
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
              transition
              disabled:opacity-50
            "
          >
            <X size={18} className="sm:w-[19px] sm:h-[19px]" />
          </button>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="px-4 sm:px-6 py-4 sm:py-5">

          <p className="text-sm text-gray-600 leading-5">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-800 break-words">
              {selectedChocolate.name}
            </span>
            ?
          </p>

          <p className="text-xs text-red-500 mt-2 leading-4">
            Once deleted, this chocolate cannot be recovered.
          </p>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col min-[380px]:flex-row sm:justify-end gap-2 min-[380px]:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              dispatch(closeDeleteChocolatePopup())
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
              font-medium
              text-gray-600
              hover:bg-gray-50
              transition
              disabled:opacity-50
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
              min-[380px]:w-auto
              min-w-0
              min-[380px]:min-w-[110px]
              px-5
              py-2
              sm:py-2.5
              rounded-lg
              sm:rounded-xl
              bg-red-500
              text-white
              text-sm
              font-medium
              hover:bg-red-600
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
                  size={17}
                  className="animate-spin"
                />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>

        </div>

      </div>
    </div>
  );
};
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle
                size={20}
                className="text-red-500"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Delete Chocolate
              </h2>

              <p className="text-xs text-gray-500">
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
              w-9
              h-9
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
            <X size={19} />
          </button>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="px-6 py-5">

          <p className="text-sm text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-800">
              {selectedChocolate.name}
            </span>
            ?
          </p>

          <p className="text-xs text-red-500 mt-2">
            Once deleted, this chocolate cannot be recovered.
          </p>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              dispatch(closeDeleteChocolatePopup())
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
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="
              min-w-[110px]
              px-5
              py-2.5
              rounded-xl
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
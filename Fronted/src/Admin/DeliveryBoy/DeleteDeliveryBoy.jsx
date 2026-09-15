
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { deleteDeliveryBoyThunk } from "../../Store/Admin/DeliveryBoy/DeliveryApi";
import { closeDeleteDeliveryPopup } from "../../Store/Admin/DeliveryBoy/DeliverySlice";

export const DeleteDeliveryBoy = () => {
  const dispatch = useDispatch();

  const {
    selectedDeliveryBoyId,
    isDeleteDeliveryPopupOpen,
    loading,
    error,
  } = useSelector(
    (state) => state.DeliveryBoyManagement
  );

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    if (loading) return;

    dispatch(closeDeleteDeliveryPopup());
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async () => {
    if (!selectedDeliveryBoyId) {
      toast.error("Delivery boy ID not found");
      return;
    }

    const result = await dispatch(
      deleteDeliveryBoyThunk(selectedDeliveryBoyId)
    );

    if (deleteDeliveryBoyThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
          "Delivery boy deleted successfully"
      );

      dispatch(closeDeleteDeliveryPopup());
    } else {
      toast.error(
        result.payload ||
          "Failed to delete delivery boy"
      );
    }
  };

  // =====================================================
  // POPUP CLOSED
  // =====================================================

  if (!isDeleteDeliveryPopupOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        px-2
        sm:px-4
        py-4
        sm:py-6
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <div
        className="
          w-full
          max-w-md
          max-h-[94vh]
          sm:max-h-[90vh]
          bg-white
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
          border
          border-red-100
          overflow-hidden
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            px-4
            sm:px-6
            py-4
            sm:py-5
            border-b
            border-gray-100
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
              className="
                w-10
                h-10
                sm:w-11
                sm:h-11
                shrink-0
                rounded-xl
                sm:rounded-2xl
                bg-red-50
                text-red-500
                flex
                items-center
                justify-center
              "
            >
              <Trash2
                size={20}
                className="sm:w-[22px] sm:h-[22px]"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 truncate">
                Delete Delivery Boy
              </h2>

              <p className="text-xs sm:text-sm text-gray-500">
                Confirm deletion
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              w-8
              h-8
              sm:w-9
              sm:h-9
              shrink-0
              rounded-lg
              sm:rounded-xl
              flex
              items-center
              justify-center
              text-gray-400
              hover:bg-gray-100
              hover:text-gray-700
              transition
              disabled:opacity-50
            "
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="px-4 sm:px-6 py-5 sm:py-6">
          <div
            className="
              p-3.5
              sm:p-4
              rounded-xl
              sm:rounded-2xl
              bg-red-50
              border
              border-red-100
            "
          >
            <p className="text-sm text-gray-700 leading-6">
              Are you sure you want to delete this delivery boy?
            </p>

            <p className="text-sm text-red-600 font-medium mt-1">
              This action cannot be undone.
            </p>
          </div>

          {/* ERROR */}

          {error && (
            <div
              className="
                mt-4
                p-3
                rounded-xl
                bg-red-50
                border
                border-red-100
                text-red-600
                text-sm
                break-words
              "
            >
              {error}
            </div>
          )}
        </div>

        {/* =====================================================
            BUTTONS
        ===================================================== */}

        <div
          className="
            px-4
            sm:px-6
            pb-4
            sm:pb-5
            flex
            flex-col-reverse
            sm:flex-row
            gap-2.5
            sm:gap-3
          "
        >
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              w-full
              sm:flex-1
              h-11
              sm:h-12
              rounded-xl
              border
              border-gray-200
              bg-white
              text-gray-600
              text-sm
              sm:text-base
              font-semibold
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
              sm:flex-1
              h-11
              sm:h-12
              rounded-xl
              bg-red-500
              hover:bg-red-600
              text-white
              text-sm
              sm:text-base
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-sm
              transition
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} />

                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


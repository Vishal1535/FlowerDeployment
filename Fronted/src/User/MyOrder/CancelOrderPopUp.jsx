import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  Ban,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  closeCancelOrderPopup,
} from "../../Store/Order/OrderSlice";

import {
  CancelOrderThunk,
} from "../../Store/Order/OrderApi";

export const CancelOrderPopUp = () => {
  const dispatch = useDispatch();

  const {
    cancelOrderId,
    cancelOrderLoading,
    error,
  } = useSelector(
    (state) => state.Order
  );

  // Popup closed
  if (!cancelOrderId) {
    return null;
  }

  // ===================================================
  // CLOSE
  // ===================================================

  const handleClose = () => {
    if (cancelOrderLoading) return;

    dispatch(closeCancelOrderPopup());
  };

  // ===================================================
  // CONFIRM CANCEL
  // ===================================================

  const handleConfirmCancel = async () => {
    if (!cancelOrderId) return;

    try {
      await dispatch(
        CancelOrderThunk(cancelOrderId)
      ).unwrap();
      toast.success("Order cancelled successfully!")

    } catch (error) {
      console.error(
        "Cancel order error:",
        error
      );
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        px-4
        bg-black/40
        backdrop-blur-sm
      "
      onClick={handleClose}
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
          border
          border-red-100
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div
          className="
            relative
            px-6
            pt-7
            pb-5
            text-center
          "
        >

          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={handleClose}
            disabled={cancelOrderLoading}
            className="
              absolute
              top-4
              right-4
              w-9
              h-9
              rounded-full
              bg-gray-100
              text-gray-500
              flex
              items-center
              justify-center
              hover:bg-gray-200
              transition
              cursor-pointer
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <X size={18} />
          </button>

          {/* ICON */}

          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-full
              bg-red-50
              border
              border-red-100
              flex
              items-center
              justify-center
            "
          >
            <AlertTriangle
              size={30}
              className="text-red-500"
            />
          </div>

          {/* TITLE */}

          <h2
            className="
              mt-4
              text-xl
              font-black
              text-gray-900
            "
          >
            Cancel Order?
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-gray-500
            "
          >
            Are you sure you want to cancel
            this order?
          </p>
        </div>

        {/* ========================================= */}
        {/* ORDER ID */}
        {/* ========================================= */}

        <div
          className="
            mx-6
            mb-4
            rounded-2xl
            bg-red-50
            border
            border-red-100
            px-4
            py-3
            text-center
          "
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-wider
              font-bold
              text-red-400
            "
          >
            Order ID
          </p>

          <p
            className="
              mt-1
              text-sm
              font-black
              text-red-600
              break-all
            "
          >
            #{cancelOrderId?.slice(-10)}
          </p>
        </div>

        {/* ========================================= */}
        {/* ERROR */}
        {/* ========================================= */}

        {error && (
          <div
            className="
              mx-6
              mb-4
              rounded-2xl
              bg-red-50
              border
              border-red-200
              px-4
              py-3
              text-xs
              font-semibold
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* ========================================= */}
        {/* BUTTONS */}
        {/* ========================================= */}

        <div
          className="
            px-6
            pb-6
            flex
            gap-3
          "
        >

          {/* KEEP ORDER */}

          <button
            type="button"
            onClick={handleClose}
            disabled={cancelOrderLoading}
            className="
              flex-1
              py-3
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-700
              text-sm
              font-bold
              hover:bg-gray-50
              transition
              cursor-pointer
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Keep Order
          </button>

          {/* CONFIRM CANCEL */}

          <button
            type="button"
            onClick={handleConfirmCancel}
            disabled={cancelOrderLoading}
            className="
              flex-1
              py-3
              rounded-full
              bg-red-500
              text-white
              text-sm
              font-bold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-red-600
              transition
              shadow-lg
              shadow-red-100
              cursor-pointer
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >

            {cancelOrderLoading ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />

                Cancelling...
              </>
            ) : (
              <>
                <Ban size={16} />

                Yes, Cancel
              </>
            )}

          </button>
        </div>
      </div>
    </div>
  );
};
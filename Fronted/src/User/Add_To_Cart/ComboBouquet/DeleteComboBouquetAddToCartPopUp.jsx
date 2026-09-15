import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  DeleteComboBouquetFromCartThunk,
} from "../../../Store/AddToCart/ComboBouquetAddToCart/ComboBouquetAddToCartApi";

import {
  hideDeletePopup,
} from "../../../Store/AddToCart/ComboBouquetAddToCart/ComboBouquetAddToCartSlice";

export const DeleteComboBouquetAddToCartPopUp = () => {
  const dispatch = useDispatch();

  const {
    isDeletePopupOpen,
    deleteCartId,
    loading,
  } = useSelector(
    (state) => state.ComboBouquetAddToCart
  );

  // ==============================
  // DELETE COMBO BOUQUET
  // ==============================

  const HandleDelete = async () => {
    if (!deleteCartId) {
      return;
    }

    const result = await dispatch(
      DeleteComboBouquetFromCartThunk(
        deleteCartId
      )
    );

    if (
      DeleteComboBouquetFromCartThunk.fulfilled.match(
        result
      )
    ) {
      toast.success(
        "Combo Bouquet removed from cart"
      );
    } else {
      toast.error(
        result.payload ||
          "Failed to remove combo bouquet"
      );
    }
  };

  // ==============================
  // CLOSE POPUP
  // ==============================

  const HandleClose = () => {
    dispatch(hideDeletePopup());
  };

  if (!isDeletePopupOpen) {
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
        bg-black/40
        px-4
      "
      onClick={HandleClose}
    >

      <div
        className="
          w-full
          max-w-sm
          bg-white
          rounded-2xl
          shadow-2xl
          p-5
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* ==============================
            HEADER
        ============================== */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-red-50
                flex
                items-center
                justify-center
              "
            >
              <Trash2
                size={19}
                className="text-red-500"
              />
            </div>

            <div>

              <h2 className="text-base font-bold text-gray-900">
                Remove Combo Bouquet
              </h2>

              <p className="text-xs text-gray-400">
                Remove this combo bouquet from cart?
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={HandleClose}
            className="
              w-8
              h-8
              rounded-full
              flex
              items-center
              justify-center
              text-gray-400
              hover:bg-gray-100
              hover:text-gray-700
              transition
              cursor-pointer
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* ==============================
            MESSAGE
        ============================== */}

        <p className="text-sm text-gray-500 mt-5">
          Are you sure you want to remove
          this combo bouquet from your cart?
        </p>

        {/* ==============================
            BUTTONS
        ============================== */}

        <div className="flex gap-3 mt-6">

          <button
            type="button"
            onClick={HandleClose}
            disabled={loading}
            className="
              flex-1
              h-10
              rounded-xl
              border
              border-gray-200
              bg-white
              text-gray-700
              text-sm
              font-semibold
              hover:bg-gray-50
              transition
              cursor-pointer
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={HandleDelete}
            disabled={loading}
            className="
              flex-1
              h-10
              rounded-xl
              bg-red-500
              text-white
              text-sm
              font-semibold
              hover:bg-red-600
              transition
              cursor-pointer
              disabled:opacity-50
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              gap-2
            "
          >

            {loading ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                Removing...
              </>
            ) : (
              <>
                <Trash2 size={15} />
                Remove
              </>
            )}

          </button>

        </div>

      </div>

    </div>
  );
};
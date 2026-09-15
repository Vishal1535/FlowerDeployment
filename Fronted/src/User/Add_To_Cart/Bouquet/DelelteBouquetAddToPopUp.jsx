
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { DeleteBouquetFromCartThunk } from "../../../Store/AddToCart/BouquetAddToCart/BouquetAddToCartApi";

import { hideDeletePopup } from "../../../Store/AddToCart/BouquetAddToCart/BouquetAddToCartSlice";

export const DelelteBouquetAddToPopUp = () => {
  const dispatch = useDispatch();

  const {
    isDeletePopupOpen,
    deleteCartId,
    loading,
  } = useSelector(
    (state) => state.BouquetAddToCart
  );

  // ==============================
  // DELETE BOUQUET
  // ==============================

  const HandleDelete = async () => {
    if (!deleteCartId) {
      return;
    }

    const result = await dispatch(
      DeleteBouquetFromCartThunk(deleteCartId)
    );

    if (
      DeleteBouquetFromCartThunk.fulfilled.match(
        result
      )
    ) {
      toast.success(
        "Bouquet removed from cart"
      );
    } else {
      toast.error(
        result.payload ||
          "Failed to remove bouquet"
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
        px-3
        sm:px-4
        py-4
      "
      onClick={HandleClose}
    >

      <div
        className="
          w-full
          max-w-sm
          bg-white
          rounded-xl
          sm:rounded-2xl
          shadow-2xl
          p-4
          sm:p-5
          max-h-[90vh]
          overflow-y-auto
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* ==============================
            HEADER
        ============================== */}

        <div className="flex items-start justify-between gap-3">

          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">

            <div
              className="
                w-9
                h-9
                sm:w-10
                sm:h-10
                rounded-full
                bg-red-50
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <Trash2
                size={17}
                className="text-red-500 sm:w-[19px] sm:h-[19px]"
              />
            </div>

            <div className="min-w-0">

              <h2 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                Remove Bouquet
              </h2>

              <p className="text-[11px] sm:text-xs text-gray-400 break-words">
                Remove this bouquet from cart?
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
              shrink-0
            "
          >
            <X size={17} />
          </button>

        </div>

        {/* ==============================
            MESSAGE
        ============================== */}

        <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-5 leading-relaxed">
          Are you sure you want to remove
          this bouquet from your cart?
        </p>

        {/* ==============================
            BUTTONS
        ============================== */}

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-5 sm:mt-6">

          <button
            type="button"
            onClick={HandleClose}
            disabled={loading}
            className="
              w-full
              min-h-10
              rounded-lg
              sm:rounded-xl
              border
              border-gray-200
              bg-white
              text-gray-700
              text-xs
              sm:text-sm
              font-semibold
              hover:bg-gray-50
              transition
              cursor-pointer
              disabled:opacity-50
              disabled:cursor-not-allowed
              px-2
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={HandleDelete}
            disabled={loading}
            className="
              w-full
              min-h-10
              rounded-lg
              sm:rounded-xl
              bg-red-500
              text-white
              text-xs
              sm:text-sm
              font-semibold
              hover:bg-red-600
              transition
              cursor-pointer
              disabled:opacity-50
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              gap-1.5
              px-2
            "
          >

            {loading ? (
              <>
                <span className="loading loading-spinner loading-xs shrink-0" />
                <span className="truncate">
                  Removing...
                </span>
              </>
            ) : (
              <>
                <Trash2 size={14} className="shrink-0" />
                <span>
                  Remove
                </span>
              </>
            )}

          </button>

        </div>

      </div>

    </div>
  );
};


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  DeleteFlowerInBoxFromCartThunk,
} from "../../../Store/AddToCart/FlowerInBox/FlowerInBoxAddToCartApi";

import {
  hideDeletePopup,
} from "../../../Store/AddToCart/FlowerInBox/FlowerInBoxAddToCartSlice";

export const DeleteFlowerInBoxPopUp = () => {
  const dispatch = useDispatch();

  const {
    isDeletePopupOpen,
    deleteCartId,
    loading,
  } = useSelector(
    (state) => state.FlowerInBoxAddToCart
  );

  if (!isDeletePopupOpen) {
    return null;
  }

  // ==============================
  // DELETE
  // ==============================

  const HandleDelete = async () => {
    if (!deleteCartId) {
      return;
    }

    const result = await dispatch(
      DeleteFlowerInBoxFromCartThunk(deleteCartId)
    );

    if (
      DeleteFlowerInBoxFromCartThunk.fulfilled.match(
        result
      )
    ) {
      toast.success(
        "Flower in box removed from cart"
      );
    } else {
      toast.error(
        result.payload ||
          "Failed to remove flower in box"
      );
    }
  };

  // ==============================
  // CLOSE
  // ==============================

  const HandleClose = () => {
    dispatch(hideDeletePopup());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl">

        {/* ==============================
            HEADER
        ============================== */}

        <div className="flex items-center justify-between px-5 py-4 border-b">

          <h2 className="text-lg font-semibold text-gray-800">
            Remove Item
          </h2>

          <button
            type="button"
            onClick={HandleClose}
            disabled={loading}
            className="
              text-gray-500
              hover:text-gray-800
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* ==============================
            CONTENT
        ============================== */}

        <div className="px-5 py-6 text-center">

          <div
            className="
              mx-auto
              w-14
              h-14
              rounded-full
              bg-red-50
              flex
              items-center
              justify-center
            "
          >
            <Trash2
              size={26}
              className="text-red-500"
            />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            Remove this flower in box?
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to remove this
            flower in box from your cart?
          </p>

        </div>

        {/* ==============================
            BUTTONS
        ============================== */}

        <div className="flex gap-3 px-5 pb-5">

          {/* CANCEL */}

          <button
            type="button"
            onClick={HandleClose}
            disabled={loading}
            className="
              flex-1
              h-10
              rounded-md
              border
              border-gray-300
              text-gray-700
              font-medium
              hover:bg-gray-50
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          {/* REMOVE */}

          <button
            type="button"
            onClick={HandleDelete}
            disabled={loading}
            className="
              flex-1
              h-10
              rounded-md
              bg-red-500
              text-white
              font-medium
              hover:bg-red-600
              disabled:opacity-50
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Removing...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Remove
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
};
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  closeDeleteCardPopup,
} from "../../../Store/Card/CardSlice";

import {
  DeleteCardThunk,
} from "../../../Store/Card/CardApi";

export const DeleteCardPopUp = () => {
  const dispatch = useDispatch();

  const {
    isDeleteCardPopupOpen,
    selectedCard,
    loading,
  } = useSelector((state) => state.card);

  if (!isDeleteCardPopupOpen || !selectedCard) {
    return null;
  }

  // ============================
  // DELETE CARD
  // ============================

  const handleDelete = async () => {
    const result = await dispatch(
      DeleteCardThunk(selectedCard._id)
    );

    // ============================
    // SUCCESS
    // ============================

    if (DeleteCardThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
        "Card deleted successfully"
      );

      dispatch(closeDeleteCardPopup());
    }

    // ============================
    // ERROR
    // ============================

    if (DeleteCardThunk.rejected.match(result)) {
      toast.error(
        result.payload ||
        "Failed to delete card"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 min-[380px]:px-4 py-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 min-[380px]:px-6 py-3.5 min-[380px]:py-4">

          <h2 className="text-base min-[380px]:text-lg font-semibold text-gray-800 truncate">
            Delete Card
          </h2>

          <button
            type="button"
            onClick={() =>
              dispatch(closeDeleteCardPopup())
            }
            disabled={loading}
            className="
              flex
              h-8
              w-8
              min-[380px]:h-9
              min-[380px]:w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              text-gray-500
              hover:bg-gray-100
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <X size={18} className="min-[380px]:w-[19px] min-[380px]:h-[19px]" />
          </button>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="px-4 min-[380px]:px-6 py-5 min-[380px]:py-6">

          <div className="flex justify-center mb-4 min-[380px]:mb-5">

            <div
              className="
                flex
                h-12
                w-12
                min-[380px]:h-14
                min-[380px]:w-14
                items-center
                justify-center
                rounded-full
                bg-red-50
              "
            >
              <Trash2
                size={22}
                className="text-red-500 min-[380px]:w-[25px] min-[380px]:h-[25px]"
              />
            </div>

          </div>

          <h3
            className="
              text-center
              text-base
              min-[380px]:text-lg
              font-semibold
              text-gray-800
            "
          >
            Delete this card?
          </h3>

          <p
            className="
              mt-2
              text-center
              text-xs
              min-[380px]:text-sm
              leading-5
              text-gray-500
              break-words
            "
          >
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-700">
              {selectedCard.name}
            </span>
            ? This action cannot be undone.
          </p>

        </div>

        {/* ================= BUTTONS ================= */}

        <div
          className="
            flex
            flex-col
            min-[380px]:flex-row
            min-[380px]:justify-end
            gap-2
            min-[380px]:gap-3
            border-t
            border-gray-100
            px-4
            min-[380px]:px-6
            py-3.5
            min-[380px]:py-4
          "
        >

          {/* CANCEL */}

          <button
            type="button"
            onClick={() =>
              dispatch(closeDeleteCardPopup())
            }
            disabled={loading}
            className="
              w-full
              min-[380px]:w-auto
              rounded-xl
              border
              border-gray-200
              px-5
              py-2.5
              text-sm
              font-medium
              text-gray-600
              hover:bg-gray-50
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
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
              min-w-[125px]
              rounded-xl
              bg-red-500
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              hover:bg-red-600
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
              flex
              items-center
              justify-center
              gap-2
            "
          >

            {loading && (
              <span
                className="
                  h-4
                  w-4
                  rounded-full
                  border-2
                  border-white
                  border-t-transparent
                  animate-spin
                  shrink-0
                "
              />
            )}

            {loading
              ? "Deleting..."
              : "Delete Card"}

          </button>

        </div>

      </div>
    </div>
  );
};
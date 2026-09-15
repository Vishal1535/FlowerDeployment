import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { closeDeleteMiniCupcakePopup } from "../../../Store/MiniCupCake/MiniCupCakeSlice";

import { DeleteMiniCupcakeThunk } from "../../../Store/MiniCupCake/MIniCupCakeApi";

export const DeleteMiniCupcakePopUp = () => {
  const dispatch = useDispatch();

  const {
    isDeleteMiniCupcakePopupOpen,
    selectedMiniCupcake,
    loading,
  } = useSelector((state) => state.miniCupCake);

  if (
    !isDeleteMiniCupcakePopupOpen ||
    !selectedMiniCupcake
  ) {
    return null;
  }

  // ============================
  // DELETE
  // ============================

  const handleDelete = async () => {
    const result = await dispatch(
      DeleteMiniCupcakeThunk(selectedMiniCupcake._id)
    );

    // ============================
    // SUCCESS
    // ============================

    if (DeleteMiniCupcakeThunk.fulfilled.match(result)) {
      toast.success(
        result.payload?.message ||
        "Mini cupcake deleted successfully"
      );

      dispatch(closeDeleteMiniCupcakePopup());

      return;
    }

    // ============================
    // ERROR
    // ============================

    toast.error(
      result.payload ||
      "Failed to delete mini cupcake"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <Trash2
                size={20}
                className="text-red-500"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Delete Mini Cupcake
              </h2>

              <p className="text-sm text-gray-500">
                This action cannot be undone
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              dispatch(closeDeleteMiniCupcakePopup())
            }
            disabled={loading}
            className="
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              text-gray-500
              hover:bg-gray-100
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="px-6 py-5">

          <div className="flex items-center gap-4">

            <img
              src={selectedMiniCupcake.image}
              alt={selectedMiniCupcake.name}
              className="
                w-16
                h-16
                rounded-xl
                object-cover
              "
            />

            <div>
              <h3 className="font-medium text-gray-800">
                {selectedMiniCupcake.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                ₹{selectedMiniCupcake.price}
              </p>
            </div>

          </div>

          <p className="text-sm text-gray-600 mt-5">
            Are you sure you want to delete this mini cupcake?
          </p>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">

          <button
            type="button"
            onClick={() =>
              dispatch(closeDeleteMiniCupcakePopup())
            }
            disabled={loading}
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
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-2
              min-w-[110px]
              px-5
              py-2.5
              rounded-xl
              bg-red-500
              text-white
              text-sm
              font-medium
              hover:bg-red-600
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
            "
          >

            {loading ? (
              <>
                <span
                  className="
                    h-4
                    w-4
                    rounded-full
                    border-2
                    border-white
                    border-t-transparent
                    animate-spin
                  "
                />

                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />

                Delete
              </>
            )}

          </button>

        </div>

      </div>
    </div>
  );
};
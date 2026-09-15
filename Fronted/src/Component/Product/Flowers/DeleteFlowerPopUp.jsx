import React from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteFlowerPopup } from "../../../Store/flowerSlice/FlowerSlice";
import { DeleteFlowerThunk } from "../../../Store/flowerSlice/FlowerApi";
import toast from "react-hot-toast";

export const DeleteFlowerPopUp = () => {
  const { showDeleteFlowerPopup,id } = useSelector((state) => state.flower);


  const dispatch = useDispatch();

  if (!showDeleteFlowerPopup) {
    return null;
  }

  const handleClose = () => {
    dispatch(closeDeleteFlowerPopup());
  };


const handleDelete = async (e) => {
  e.preventDefault();

  try {
    await dispatch(DeleteFlowerThunk(id)).unwrap();

    toast.success("Delete successful");

    dispatch(closeDeleteFlowerPopup());
  } catch (error) {
    toast.error(error || "Failed to delete flower");
  }
};



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3 min-[380px]:px-4 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 min-[380px]:px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-red-50 flex items-center justify-center">
              <Trash2 size={18} className="sm:w-[21px] sm:h-[21px] text-red-500" />
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                Delete Flower
              </h2>

              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                Remove this product from your store
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              w-8 h-8
              sm:w-9 sm:h-9
              shrink-0
              rounded-full
              flex items-center justify-center
              text-gray-500
              bg-gray-100
              hover:bg-gray-200
              hover:text-gray-900
              transition
            "
          >
            <X size={17} className="sm:w-[19px] sm:h-[19px]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 min-[380px]:px-5 sm:px-6 py-6 sm:py-7 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-3 sm:mb-4">
            <AlertTriangle
              size={26}
              className="sm:w-[30px] sm:h-[30px] text-red-500"
            />
          </div>

          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            Are you sure?
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
            This flower will be permanently removed from your product list. This
            action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col min-[380px]:flex-row gap-2.5 sm:gap-3 px-4 min-[380px]:px-5 sm:px-6 pb-5 sm:pb-6">
          <button
            type="button"
            onClick={handleClose}
            className="
              w-full
              min-[380px]:flex-1
              h-10
              sm:h-11
              rounded-xl
              border border-gray-200
              bg-white
              text-gray-700
              text-sm
              font-semibold
              hover:bg-gray-50
              transition
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="
              w-full
              min-[380px]:flex-1
              h-10
              sm:h-11
              rounded-xl
              bg-red-500
              text-white
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-red-600
              active:scale-[0.98]
              transition
            "
          >
            <Trash2 size={16} className="sm:w-[17px] sm:h-[17px]" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
              <Trash2 size={21} className="text-red-500" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">Delete Flower</h2>

              <p className="text-xs text-gray-500 mt-0.5">
                Remove this product from your store
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              w-9 h-9
              rounded-full
              flex items-center justify-center
              text-gray-500
              bg-gray-100
              hover:bg-gray-200
              hover:text-gray-900
              transition
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-7 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
            <AlertTriangle size={30} className="text-red-500" />
          </div>

          <h3 className="text-lg font-bold text-gray-900">Are you sure?</h3>

          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            This flower will be permanently removed from your product list. This
            action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={handleClose}
            className="
              flex-1
              h-11
              rounded-xl
              border border-gray-200
              bg-white
              text-gray-700
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
              flex-1
              h-11
              rounded-xl
              bg-red-500
              text-white
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
            <Trash2 size={17} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

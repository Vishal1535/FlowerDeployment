import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { closeDeleteBouquetPopup } from "../../../Store/Bouquest/BouquestSlice";
import { deleteBouquetThunk } from "../../../Store/Bouquest/BouquestApi";
import toast from "react-hot-toast";


export const DeleteBouquet = () => {
  const dispatch = useDispatch();

  const { id, isDeleteBouquetPopupOpen, loading } = useSelector(
    (state) => state.bouquet,
  );

  if (!isDeleteBouquetPopupOpen) {
    return null;
  }

 const handleDelete = async () => {
  const result = await dispatch(deleteBouquetThunk(id));

  if (deleteBouquetThunk.fulfilled.match(result)) {
    toast.success("Bouquet deleted successfully!");
    dispatch(closeDeleteBouquetPopup());
  } else {
    toast.error(
      result.payload || "Failed to delete bouquet"
    );
  }
};

  return (
    <>
      {/* ================= OVERLAY ================= */}

      <div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/60
          backdrop-blur-md
          px-3
          sm:px-4
          py-4
          overflow-y-auto
          animate-delete-overlay
        "
      >
        {/* ================= MODAL ================= */}

        <div
          className="
            relative
            w-full
            max-w-md
            max-h-[95vh]
            overflow-y-auto
            rounded-[22px]
            sm:rounded-[28px]
            bg-white
            shadow-[0_30px_100px_rgba(0,0,0,0.30)]
            overflow-hidden
            animate-delete-modal
          "
        >
          {/* Decorative Background */}

          <div
            className="
              absolute
              -top-16
              -right-16
              sm:-top-20
              sm:-right-20
              w-32
              h-32
              sm:w-44
              sm:h-44
              rounded-full
              bg-red-50
            "
          />

          <div
            className="
              absolute
              -bottom-16
              -left-16
              sm:-bottom-20
              sm:-left-20
              w-32
              h-32
              sm:w-40
              sm:h-40
              rounded-full
              bg-pink-50
            "
          />

          {/* ================= CLOSE ================= */}

          <button
            type="button"
            className="
              absolute
              top-3
              right-3
              sm:top-5
              sm:right-5
              z-20
              w-8
              h-8
              sm:w-9
              sm:h-9
              rounded-full
              bg-gray-100
              text-gray-500
              flex
              items-center
              justify-center
              hover:bg-gray-900
              hover:text-white
              hover:rotate-90
              transition-all
              duration-300
            "
            onClick={() => {
              // dispatch(closeDeleteBouquetPopup());
              dispatch(closeDeleteBouquetPopup())
            }}
          >
            <X size={16} className="sm:w-[17px] sm:h-[17px]" />
          </button>

          {/* ================= CONTENT ================= */}

          <div className="relative p-5 min-[380px]:p-6 sm:p-8 text-center">

            {/* Delete Icon */}

            <div
              className="
                mx-auto
                w-16
                h-16
                sm:w-20
                sm:h-20
                rounded-full
                bg-red-50
                border
                border-red-100
                flex
                items-center
                justify-center
                animate-delete-icon
              "
            >
              <div
                className="
                  w-11
                  h-11
                  sm:w-14
                  sm:h-14
                  rounded-full
                  bg-red-100
                  flex
                  items-center
                  justify-center
                "
              >
                <Trash2
                  size={23}
                  className="sm:w-[27px] sm:h-[27px] text-red-500"
                />
              </div>
            </div>

            {/* Small Warning */}

            <div
              className="
                inline-flex
                items-center
                gap-1
                sm:gap-1.5
                mt-4
                sm:mt-5
                px-2.5
                sm:px-3
                py-1.5
                rounded-full
                bg-red-50
                text-red-500
                text-[10px]
                sm:text-[11px]
                font-bold
                uppercase
                tracking-wider
              "
            >
              <AlertTriangle
                size={12}
                className="sm:w-[13px] sm:h-[13px]"
              />
              Warning
            </div>

            {/* Heading */}

            <h2
              className="
                mt-3
                sm:mt-4
                text-xl
                sm:text-2xl
                font-extrabold
                text-gray-900
              "
            >
              Delete Bouquet?
            </h2>

            {/* Description */}

            <p
              className="
                mt-2
                sm:mt-3
                text-xs
                sm:text-sm
                leading-5
                sm:leading-6
                text-gray-500
                max-w-sm
                mx-auto
              "
            >
              Are you sure you want to delete this bouquet? This action cannot
              be undone.
            </p>

            {/* ID */}

            {id && (
              <div
                className="
                  mt-3
                  sm:mt-4
                  px-3
                  sm:px-4
                  py-2.5
                  sm:py-3
                  rounded-xl
                  bg-gray-50
                  border
                  border-gray-100
                  text-[10px]
                  sm:text-xs
                  text-gray-500
                  break-all
                "
              >
                Bouquet ID:{" "}
                <span className="font-semibold text-gray-700">{id}</span>
              </div>
            )}

            {/* ================= BUTTONS ================= */}

            <div
              className="
                flex
                flex-col
                min-[380px]:flex-row
                gap-2.5
                sm:gap-3
                mt-5
                sm:mt-7
              "
            >
              {/* Cancel */}

              <button
                type="button"
                className="
                  flex-1
                  h-11
                  sm:h-12
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-gray-700
                  text-sm
                  font-bold
                  hover:bg-gray-50
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
                onClick={() => {
                  // dispatch(closeDeleteBouquetPopup());
                dispatch(closeDeleteBouquetPopup())
                }}
              >
                Cancel
              </button>

              {/* Delete */}

              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="
                  flex-1
                  h-11
                  sm:h-12
                  rounded-xl
                  bg-red-500
                  text-white
                  text-sm
                  font-bold
                  shadow-lg
                  shadow-red-100
                  hover:bg-red-600
                  hover:shadow-red-200
                  hover:-translate-y-0.5
                  active:scale-[0.97]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-2
                  whitespace-nowrap
                "
              >
                <Trash2 size={17} />

                {loading ? "Deleting..." : "Delete Bouquet"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
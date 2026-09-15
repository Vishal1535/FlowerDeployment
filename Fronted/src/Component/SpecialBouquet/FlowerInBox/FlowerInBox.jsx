import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { CreateFlowerInBoxPopUp } from "./CreateFlowerInBoxPopUp";
import { EditFlowerInBoxPopUp } from "./EditFlowerInBoxPopUp";
import { DeleteFlowerInBoxPopUp } from "./DeleteFlowerInBoxPopUp";
import { FlowerInBoxItem } from "./FlowerInBoxItem";

import {
  openCreateFlowerInBoxPopup,
} from "../../../Store/FlowerInBox/FlowerInBoxSlice";

import {
  GetAllFlowerInBoxThunk,
} from "../../../Store/FlowerInBox/FlowerInBoxApi";

export const FlowerInBox = () => {
  const dispatch = useDispatch();

  const { flowersInBox, loading } = useSelector(
    (state) => state.flowerInBox
  );

  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 8;

  // =========================
  // GET FLOWERS IN BOX
  // =========================

  useEffect(() => {
    dispatch(GetAllFlowerInBoxThunk());
  }, [dispatch]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    flowersInBox.length / ITEMS_PER_PAGE
  );

  const startIndex =
    currentPage * ITEMS_PER_PAGE;

  const currentFlowersInBox =
    flowersInBox.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  // =========================
  // NEXT
  // =========================

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(
        (previousPage) => previousPage + 1
      );
    }
  };

  // =========================
  // PREVIOUS
  // =========================

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(
        (previousPage) => previousPage - 1
      );
    }
  };

  // =========================
  // PAGE CHANGE
  // =========================

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>

      {/* =========================
          POPUPS
      ========================= */}

      <CreateFlowerInBoxPopUp />
      <EditFlowerInBoxPopUp />
      <DeleteFlowerInBoxPopUp />

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Flowers In Box
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage your flower in box collection
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            dispatch(
              openCreateFlowerInBoxPopup()
            )
          }
          className="
            flex
            items-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-pink-500
            text-white
            text-sm
            font-medium
            hover:bg-pink-600
            transition
          "
        >
          <Plus size={18} />
          Create Flower In Box
        </button>

      </div>

      {/* =========================
          LOADING
      ========================= */}

      {loading &&
        flowersInBox.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            Loading flowers in box...
          </div>
        )}

      {/* =========================
          EMPTY
      ========================= */}

      {!loading &&
        flowersInBox.length === 0 && (
          <div className="py-12 text-center">

            <p className="text-gray-500">
              No flowers in box found.
            </p>

            <button
              type="button"
              onClick={() =>
                dispatch(
                  openCreateFlowerInBoxPopup()
                )
              }
              className="
                mt-3
                text-sm
                text-pink-500
                hover:text-pink-600
              "
            >
              Create your first flower in box
            </button>

          </div>
        )}

      {/* =========================
          FLOWER IN BOX LIST
      ========================= */}

      {currentFlowersInBox.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-4
          "
        >
          {currentFlowersInBox.map(
            (flowerInBox) => (
              <FlowerInBoxItem
                key={flowerInBox._id}
                flowerInBox={flowerInBox}
              />
            )
          )}
        </div>
      )}

      {/* =========================
          PAGINATION
      ========================= */}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">

          {/* PREVIOUS */}

          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              border
              border-gray-200
              bg-white
              text-gray-600
              hover:bg-pink-50
              hover:text-pink-500
              disabled:opacity-40
              disabled:cursor-not-allowed
              transition
            "
          >
            <ChevronLeft size={18} />
          </button>

          {/* PAGE NUMBERS */}

          <div className="flex items-center gap-1">

            {Array.from({
              length: totalPages,
            }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  handlePageChange(index)
                }
                className={`
                  w-9
                  h-9
                  rounded-lg
                  text-sm
                  font-medium
                  transition

                  ${
                    currentPage === index
                      ? "bg-pink-500 text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-pink-50 hover:text-pink-500"
                  }
                `}
              >
                {index + 1}
              </button>
            ))}

          </div>

          {/* NEXT */}

          <button
            type="button"
            onClick={handleNext}
            disabled={
              currentPage === totalPages - 1
            }
            className="
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              border
              border-gray-200
              bg-white
              text-gray-600
              hover:bg-pink-50
              hover:text-pink-500
              disabled:opacity-40
              disabled:cursor-not-allowed
              transition
            "
          >
            <ChevronRight size={18} />
          </button>

        </div>
      )}

    </div>
  );
};
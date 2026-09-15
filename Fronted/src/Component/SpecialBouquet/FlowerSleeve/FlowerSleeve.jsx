import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  GetAllFlowerInSleeveThunk,
} from "../../../Store/FlowerSleeve/FlowerSleeveApi";

import {
  showFlowerInSleeve,
} from "../../../Store/FlowerSleeve/FlowerSleeveSlice";

import { CreateFlowerInSleevePopUp } from "./CreateFlowerInSleevePopUp";
import { DeleteFlowerInSleevePopUp } from "./DeleteFlowerInSleevePopUp";
import { EditFlowerInSleevePopUp } from "./EditFlowerInSleevePopUp";
import { FlowerInSleeveItem } from "./FlowerInSleeveItem";

export const FlowerSleeve = () => {
  const dispatch = useDispatch();

  const {
    flowersInSleeve,
    loading,
  } = useSelector(
    (state) => state.flowerInSleeve
  );

  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 8;

  // ================= GET ALL =================

  useEffect(() => {
    dispatch(GetAllFlowerInSleeveThunk());
  }, [dispatch]);

  // ================= PAGINATION =================

  const totalPages = Math.ceil(
    flowersInSleeve.length / ITEMS_PER_PAGE
  );

  const startIndex =
    currentPage * ITEMS_PER_PAGE;

  const currentFlowersInSleeve =
    flowersInSleeve.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  // ================= PAGE SAFETY =================

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage >= totalPages
    ) {
      setCurrentPage(totalPages - 1);
    }
  }, [currentPage, totalPages]);

  // ================= CREATE =================

  const handleCreate = () => {
    dispatch(showFlowerInSleeve());
  };

  // ================= NEXT =================

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(
        (previousPage) => previousPage + 1
      );
    }
  };

  // ================= PREVIOUS =================

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(
        (previousPage) => previousPage - 1
      );
    }
  };

  // ================= PAGE CHANGE =================

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>

      {/* ================= POPUPS ================= */}

      <CreateFlowerInSleevePopUp />

      <EditFlowerInSleevePopUp />

      <DeleteFlowerInSleevePopUp />

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Flower In Sleeve
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage your flower sleeve collection
          </p>
        </div>

        {/* CREATE BUTTON */}

        <button
          type="button"
          onClick={handleCreate}
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

          Create Flower Sleeve
        </button>

      </div>

      {/* ================= LOADING ================= */}

      {loading &&
        flowersInSleeve.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            Loading flower sleeves...
          </div>
        )}

      {/* ================= EMPTY ================= */}

      {!loading &&
        flowersInSleeve.length === 0 && (
          <div className="py-12 text-center">

            <p className="text-gray-500">
              No flower sleeves found.
            </p>

            <button
              type="button"
              onClick={handleCreate}
              className="
                mt-3
                text-sm
                text-pink-500
                hover:text-pink-600
              "
            >
              Create your first flower sleeve
            </button>

          </div>
        )}

      {/* ================= FLOWER SLEEVE LIST ================= */}

      {currentFlowersInSleeve.length > 0 && (
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
          {currentFlowersInSleeve.map(
            (flower) => (
              <FlowerInSleeveItem
                key={flower._id}
                flower={flower}
              />
            )
          )}
        </div>
      )}

      {/* ================= PAGINATION ================= */}

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
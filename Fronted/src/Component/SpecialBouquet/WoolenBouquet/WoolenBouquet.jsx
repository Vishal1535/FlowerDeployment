import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

import { WoolenBouquetItem } from "./WoolenBouquetItem";
import { EditWoolenBouquetPopUp } from "./EditWoolenBouquetPopUp";
import { DeleteWoolenBouquetPopUp } from "./DeleteWoolenBouquetPopUp";

import {
  openCreateWoolenPopup,
} from "../../../Store/Woolen/WoolenSlice";

import {
  GetAllWoolenThunk,
} from "../../../Store/Woolen/WoolenApi";

import { CreateWoolenBouquetPopUp } from "./CreateWoolenBouquetPopUp";

export const WoolenBouquet = () => {
  const dispatch = useDispatch();

  const { woolens, loading } = useSelector(
    (state) => state.woolen
  );

  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 8;

  // ================= GET WOOLENS =================

  useEffect(() => {
    dispatch(GetAllWoolenThunk());
  }, [dispatch]);

  // ================= PAGINATION =================

  const totalPages = Math.ceil(
    woolens.length / ITEMS_PER_PAGE
  );

  const startIndex = currentPage * ITEMS_PER_PAGE;

  const currentWoolens = woolens.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // ================= NEXT =================

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((previousPage) => previousPage + 1);
    }
  };

  // ================= PREVIOUS =================

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((previousPage) => previousPage - 1);
    }
  };

  // ================= PAGE CHANGE =================

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full min-w-0 overflow-hidden">

      {/* ================= CREATE POPUP ================= */}

      <CreateWoolenBouquetPopUp />
      <EditWoolenBouquetPopUp />
      <DeleteWoolenBouquetPopUp />

      {/* ================= HEADER ================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Woolen Bouquets
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your woolen bouquet collection
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            dispatch(openCreateWoolenPopup())
          }
          className="
            w-full
            sm:w-auto
            flex
            items-center
            justify-center
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
          Create Woolen Bouquet
        </button>

      </div>

      {/* ================= LOADING ================= */}

      {loading && woolens.length === 0 && (
        <div className="py-8 sm:py-10 text-center text-sm text-gray-500">
          Loading woolen bouquets...
        </div>
      )}

      {/* ================= EMPTY ================= */}

      {!loading && woolens.length === 0 && (
        <div className="py-10 sm:py-12 text-center px-3">

          <p className="text-sm text-gray-500">
            No woolen bouquets found.
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(openCreateWoolenPopup())
            }
            className="
              mt-3
              text-sm
              text-pink-500
              hover:text-pink-600
            "
          >
            Create your first woolen bouquet
          </button>

        </div>
      )}

      {/* ================= WOOLEN BOUQUET LIST ================= */}

      {currentWoolens.length > 0 && (
        <div
          className="
            w-full
            min-w-0
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-3
            min-[380px]:gap-4
          "
        >
          {currentWoolens.map((woolen) => (
            <WoolenBouquetItem
              key={woolen._id}
              woolen={woolen}
            />
          ))}
        </div>
      )}

      {/* ================= PAGINATION ================= */}

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 px-2">

          {/* PREVIOUS */}

          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="
              w-8
              h-8
              sm:w-9
              sm:h-9
              shrink-0
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
            <ChevronLeft size={17} />
          </button>

          {/* PAGE NUMBERS */}

          <div className="flex flex-wrap items-center justify-center gap-1">

            {Array.from({ length: totalPages }).map(
              (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handlePageChange(index)}
                  className={`
                    w-8
                    h-8
                    sm:w-9
                    sm:h-9
                    shrink-0
                    rounded-lg
                    text-xs
                    sm:text-sm
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
              )
            )}

          </div>

          {/* NEXT */}

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="
              w-8
              h-8
              sm:w-9
              sm:h-9
              shrink-0
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
            <ChevronRight size={17} />
          </button>

        </div>
      )}

    </div>
  );
};
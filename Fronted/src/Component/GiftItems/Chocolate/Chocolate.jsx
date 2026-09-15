import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

import { ChocolateItem } from "./ChocolateItem";

import {
  openCreateChocolatePopup,
} from "../../../Store/Chocolate/ChocolateSlice";

import {
  GetAllChocolateThunk,
} from "../../../Store/Chocolate/ChocolateApi";
import { CreateChocolatePopUp } from "./CreateChocolatePopUp";

export const Chocolate = () => {
  const dispatch = useDispatch();

  const { chocolates, loading } = useSelector(
    (state) => state.chocolate
  );

  useEffect(() => {
    dispatch(GetAllChocolateThunk());
  }, [dispatch]);

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <CreateChocolatePopUp />

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6">

        <div className="min-w-0">
          <h2 className="text-lg min-[380px]:text-xl font-semibold text-gray-800 truncate">
            Chocolates
          </h2>

          <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1">
            Manage your chocolate collection
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            dispatch(openCreateChocolatePopup())
          }
          className="
            flex
            items-center
            justify-center
            gap-1.5
            min-[380px]:gap-2
            w-full
            sm:w-auto
            px-3
            min-[380px]:px-4
            py-2
            min-[380px]:py-2.5
            rounded-xl
            bg-pink-500
            text-white
            text-xs
            min-[380px]:text-sm
            font-medium
            hover:bg-pink-600
            transition
            shrink-0
          "
        >
          <Plus
            size={17}
            className="min-[380px]:w-[18px] min-[380px]:h-[18px]"
          />
          Create Chocolate
        </button>

      </div>

      {/* Loading */}

      {loading && chocolates.length === 0 && (
        <div className="py-8 sm:py-10 text-center text-sm text-gray-500">
          Loading chocolates...
        </div>
      )}

      {/* Empty */}

      {!loading && chocolates.length === 0 && (
        <div className="py-9 sm:py-12 text-center px-3">

          <p className="text-sm text-gray-500">
            No chocolates found.
          </p>

          <button
            onClick={() =>
              dispatch(openCreateChocolatePopup())
            }
            className="mt-3 text-xs min-[380px]:text-sm text-pink-500 hover:text-pink-600"
          >
            Create your first chocolate
          </button>

        </div>
      )}

      {/* Chocolate List */}

      {chocolates.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-[380px]:gap-4 sm:gap-5 w-full min-w-0">

          {chocolates.map((chocolate) => (
            <ChocolateItem
              key={chocolate._id}
              chocolate={chocolate}
            />
          ))}

        </div>
      )}

    </div>
  );
};
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
    <div>
      <CreateChocolatePopUp/>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Chocolates
          </h2>

          <p className="text-sm text-gray-500 mt-1">
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
          Create Chocolate
        </button>

      </div>

      {/* Loading */}
      {loading && chocolates.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          Loading chocolates...
        </div>
      )}

      {/* Empty */}
      {!loading && chocolates.length === 0 && (
        <div className="py-12 text-center">

          <p className="text-gray-500">
            No chocolates found.
          </p>

          <button
            onClick={() =>
              dispatch(openCreateChocolatePopup())
            }
            className="mt-3 text-sm text-pink-500 hover:text-pink-600"
          >
            Create your first chocolate
          </button>

        </div>
      )}

      {/* Chocolate List */}
      {chocolates.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

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
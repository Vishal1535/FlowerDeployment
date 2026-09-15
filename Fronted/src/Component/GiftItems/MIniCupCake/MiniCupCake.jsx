import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

import { openCreateMiniCupcakePopup } from "../../../Store/MiniCupCake/MiniCupCakeSlice";
import { MiniCupcakeItem } from "./MiniCupcakeItem";
import { CreateMiniCupcakePopUp } from "./CreateMiniCupcakePopUp";
import { GetAllMiniCupcakeThunk } from "../../../Store/MiniCupCake/MIniCupCakeApi";

export const MiniCupCake = () => {
  const dispatch = useDispatch();

  const { miniCupcakes } = useSelector(
    (state) => state.miniCupCake
  );

  useEffect(() => {
    dispatch(GetAllMiniCupcakeThunk());
  }, []);

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <CreateMiniCupcakePopUp />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">

        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Mini Cupcakes
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your mini cupcake collection
          </p>
        </div>

        {/* Create Button */}
        <button
          type="button"
          onClick={() =>
            dispatch(openCreateMiniCupcakePopup())
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
          Add Mini Cupcake
        </button>
      </div>

      {/* Mini Cupcakes */}
      {miniCupcakes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {miniCupcakes.map((miniCupcake) => (
            <MiniCupcakeItem
              key={miniCupcake._id}
              miniCupcake={miniCupcake}
            />
          ))}
        </div>
      ) : (
        <div className="py-10 sm:py-12 px-4 text-center border border-dashed border-gray-200 rounded-xl sm:rounded-2xl">
          <p className="text-gray-500 text-xs sm:text-sm">
            No mini cupcakes found
          </p>
        </div>
      )}
    </div>
  );
};
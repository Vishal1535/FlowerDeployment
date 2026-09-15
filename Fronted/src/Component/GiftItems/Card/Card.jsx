import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

import { CardItem } from "./CardItem";
import { GetAllCardThunk } from "../../../Store/Card/CardApi";
import { openCreateCardPopup } from "../../../Store/Card/CardSlice";
import { CreateCardPopUp } from "./CreateCardPopUp";

export const Card = () => {
  const dispatch = useDispatch();

  const { cards, loading } = useSelector(
    (state) => state.card
  );

  // =========================
  // GET ALL CARDS
  // =========================

  useEffect(() => {
    dispatch(GetAllCardThunk());
  }, [dispatch]);

  // =========================
  // CREATE CARD
  // =========================

  const handleCreateCard = () => {
    dispatch(openCreateCardPopup());
  };

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <CreateCardPopUp />

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6">
        <div className="min-w-0">
          <h2 className="text-lg min-[380px]:text-xl font-semibold text-gray-800 truncate">
            Cards
          </h2>

          <p className="text-xs min-[380px]:text-sm text-gray-500 mt-1">
            Manage your greeting cards
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateCard}
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
            shadow-sm
            shrink-0
          "
        >
          <Plus size={17} className="min-[380px]:w-[18px] min-[380px]:h-[18px]" />

          Create Card
        </button>
      </div>

      {/* ================= CARDS ================= */}

      {loading ? (
        <div className="py-8 sm:py-10 text-center text-sm text-gray-500">
          Loading cards...
        </div>
      ) : cards.length === 0 ? (
        <div className="py-8 sm:py-10 text-center text-sm text-gray-500">
          No cards found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-[380px]:gap-4 sm:gap-5 w-full min-w-0">
          {cards.map((card) => (
            <CardItem
              key={card._id}
              card={card}
            />
          ))}
        </div>
      )}
    </div>
  );
};
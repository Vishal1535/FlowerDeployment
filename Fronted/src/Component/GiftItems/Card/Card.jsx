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
    <div className="w-full">
<CreateCardPopUp/>
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Cards
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage your greeting cards
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateCard}
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
            shadow-sm
          "
        >
          <Plus size={18} />

          Create Card
        </button>

      </div>

      {/* ================= CARDS ================= */}

      {loading ? (
        <div className="py-10 text-center text-gray-500">
          Loading cards...
        </div>
      ) : cards.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No cards found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

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
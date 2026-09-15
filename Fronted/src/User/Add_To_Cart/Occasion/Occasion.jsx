import React, { useEffect } from "react";
import {
  Gift,
  CreditCard,
  Sparkles,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// ==========================================
// MINI CUPCAKE
// ==========================================
import { GetAllMiniCupcakeFromCartThunk } from "../../../Store/AddToCart/MiniCupCake/MiniCupCakeAddToCartApi";
import { MiniCupCakeAddToCart } from "./MiniCupCake/MiniCupCakeAddToCart";

// ==========================================
// CARD
// ==========================================
import { CardAddToCart } from "./Card/CardAddToCart";
import { GetAllCardFromCartThunk } from "../../../Store/AddToCart/Card/CardAddToCardApi";

// ==========================================
// CHOCOLATE
// ==========================================
import { ChocolateAddToCart } from "./Chocolate/ChocolateAddToCart";
import { GetAllChocolateFromCartThunk } from "../../../Store/AddToCart/Chocolate/ChocolateAddToCartApi";

export const Occasion = () => {
  const dispatch = useDispatch();

  // ==========================================
  // CARD CART
  // ==========================================
  const { cardFromCart = [], loading: cardLoading } = useSelector(
    (state) => state.CardAddToCart
  );

  // ==========================================
  // MINI CUPCAKE CART
  // ==========================================
  const { miniCupcakeFromCart = [], loading: miniCupCakeLoading } = useSelector(
    (state) => state.MiniCupCakeAddToCart
  );

  // ==========================================
  // CHOCOLATE CART
  // ==========================================
  const { chocolateFromCart = [], loading: chocolateLoading } = useSelector(
    (state) => state.ChocolateAddToCart
  );

  // ==========================================
  // GET CART DATA
  // ==========================================
  useEffect(() => {
    dispatch(GetAllCardFromCartThunk());
    dispatch(GetAllChocolateFromCartThunk());
    dispatch(GetAllMiniCupcakeFromCartThunk());
  }, [dispatch]);

  // ==========================================
  // LOADING
  // ==========================================
  const loading = cardLoading || chocolateLoading || miniCupCakeLoading;

  return (
    <div className="w-full space-y-4">
      {/* =====================================
          CLEAN & ATTRACTIVE HEADER
      ===================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 p-4 sm:p-5 rounded-2xl border border-pink-100/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-md shadow-pink-200 shrink-0">
            <Gift size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Make it Extra Special
              </h2>
              <Sparkles size={15} className="text-pink-500 fill-pink-500" />
            </div>
            <p className="text-xs text-gray-500">
              Add greeting cards, chocolates or mini cupcakes to your order
            </p>
          </div>
        </div>

        {/* Dynamic Items Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {cardFromCart.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-semibold shadow-xs">
              <CreditCard size={12} /> Cards ({cardFromCart.length})
            </span>
          )}
          {chocolateFromCart.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-700 text-xs font-semibold shadow-xs">
              🍫 Chocolates ({chocolateFromCart.length})
            </span>
          )}
          {miniCupcakeFromCart.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-rose-200 text-rose-700 text-xs font-semibold shadow-xs">
              🧁 Cupcakes ({miniCupcakeFromCart.length})
            </span>
          )}
        </div>
      </div>

      {/* =====================================
          CARD SECTION
      ===================================== */}
      {cardFromCart.length > 0 && (
        <div className="bg-white rounded-2xl border border-pink-100/80 p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-50">
            <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <CreditCard size={15} />
            </div>
            <h3 className="text-sm font-bold text-gray-800">Greeting Cards</h3>
            <span className="text-[11px] text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full font-medium ml-auto">
              {cardFromCart.length} Selected
            </span>
          </div>

          <CardAddToCart cardFromCart={cardFromCart} />
        </div>
      )}

      {/* =====================================
          CHOCOLATE SECTION
      ===================================== */}
      {chocolateFromCart.length > 0 && (
        <div className="bg-white rounded-2xl border border-amber-100/80 p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-50">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-sm">
              🍫
            </div>
            <h3 className="text-sm font-bold text-gray-800">Chocolates</h3>
            <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium ml-auto">
              {chocolateFromCart.length} Selected
            </span>
          </div>

          <ChocolateAddToCart chocolateFromCart={chocolateFromCart} />
        </div>
      )}

      {/* =====================================
          MINI CUPCAKE SECTION
      ===================================== */}
      {miniCupcakeFromCart.length > 0 && (
        <div className="bg-white rounded-2xl border border-rose-100/80 p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-50">
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-sm">
              🧁
            </div>
            <h3 className="text-sm font-bold text-gray-800">Mini Cupcakes</h3>
            <span className="text-[11px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full font-medium ml-auto">
              {miniCupcakeFromCart.length} Selected
            </span>
          </div>

          <MiniCupCakeAddToCart miniCupcakeFromCart={miniCupcakeFromCart} />
        </div>
      )}

      {/* =====================================
          LOADING SKELETON
      ===================================== */}
      {loading &&
        cardFromCart.length === 0 &&
        chocolateFromCart.length === 0 &&
        miniCupcakeFromCart.length === 0 && (
          <div className="space-y-3">
            <div className="h-20 rounded-2xl bg-gray-50 border border-gray-100 animate-pulse" />
            <div className="h-20 rounded-2xl bg-gray-50 border border-gray-100 animate-pulse" />
          </div>
        )}

      {/* =====================================
          SIMPLE EMPTY STATE
      ===================================== */}
      {!loading &&
        cardFromCart.length === 0 &&
        chocolateFromCart.length === 0 &&
        miniCupcakeFromCart.length === 0 && (
          <div className="rounded-2xl border border-dashed border-pink-200 bg-pink-50/30 p-6 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-white border border-pink-100 shadow-xs flex items-center justify-center mb-2">
              <Gift size={20} className="text-pink-400" />
            </div>
            <p className="text-xs font-bold text-gray-700">
              No occasion items added yet
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Select greeting cards, chocolates, or cupcakes to include with your gift.
            </p>
          </div>
        )}
    </div>
  );
};
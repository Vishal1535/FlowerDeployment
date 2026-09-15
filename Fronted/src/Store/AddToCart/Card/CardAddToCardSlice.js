import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllCardFromCartThunk,
  AddCardToCartThunk,
  IncrementCardCartThunk,
  DecrementCardCartThunk,
  DeleteCardFromCartThunk,
} from "./CardAddToCardApi.js";

const initialState = {
  cardFromCart: [],

  loading: false,
  error: null,

  // ==============================
  // DELETE POPUP
  // ==============================

  isDeletePopupOpen: false,
  deleteCartId: null,
};

const CardAddToCartSlice = createSlice({
  name: "cardAddToCart",

  initialState,

  reducers: {
    // ==============================
    // SHOW DELETE POPUP
    // ==============================

    showDeletePopup: (state, action) => {
      state.isDeletePopupOpen = true;
      state.deleteCartId = action.payload;
    },

    // ==============================
    // HIDE DELETE POPUP
    // ==============================

    hideDeletePopup: (state) => {
      state.isDeletePopupOpen = false;
      state.deleteCartId = null;
    },
  },

  extraReducers: (builder) => {
    // =====================================================
    // GET ALL CARDS FROM CART
    // =====================================================

    builder
      .addCase(
        GetAllCardFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetAllCardFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.cardFromCart =
            action.payload?.cards || [];
        }
      )

      .addCase(
        GetAllCardFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch cards from cart";
        }
      );

    // =====================================================
    // ADD CARD TO CART
    // =====================================================

    builder
      .addCase(
        AddCardToCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        AddCardToCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.cardFromCart =
            action.payload?.cards || [];
        }
      )

      .addCase(
        AddCardToCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add card to cart";
        }
      );

    // =====================================================
    // INCREMENT CARD QUANTITY
    // =====================================================

    builder
      .addCase(
        IncrementCardCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        IncrementCardCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.cardFromCart =
            action.payload?.cards || [];
        }
      )

      .addCase(
        IncrementCardCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to increase card quantity";
        }
      );

    // =====================================================
    // DECREMENT CARD QUANTITY
    // =====================================================

    builder
      .addCase(
        DecrementCardCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DecrementCardCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.cardFromCart =
            action.payload?.cards || [];
        }
      )

      .addCase(
        DecrementCardCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to decrease card quantity";
        }
      );

    // =====================================================
    // DELETE CARD FROM CART
    // =====================================================

    builder
      .addCase(
        DeleteCardFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DeleteCardFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.cardFromCart =
            action.payload?.cards || [];

          // Delete ke baad popup close
          state.isDeletePopupOpen = false;
          state.deleteCartId = null;
        }
      )

      .addCase(
        DeleteCardFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to remove card from cart";
        }
      );
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  showDeletePopup,
  hideDeletePopup,
} = CardAddToCartSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const CardAddToCartReducer =
  CardAddToCartSlice.reducer;

export default CardAddToCartReducer;
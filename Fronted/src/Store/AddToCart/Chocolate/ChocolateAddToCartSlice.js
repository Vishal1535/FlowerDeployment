import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllChocolateFromCartThunk,
  AddChocolateToCartThunk,
  IncrementChocolateCartThunk,
  DecrementChocolateCartThunk,
  DeleteChocolateFromCartThunk,
} from "./ChocolateAddToCartApi.js";

const initialState = {
  chocolateFromCart: [],

  loading: false,
  error: null,

  // ==============================
  // DELETE POPUP
  // ==============================

  isDeletePopupOpen: false,
  deleteCartId: null,
};

const ChocolateAddToCartSlice = createSlice({
  name: "chocolateAddToCart",

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
    // GET ALL CHOCOLATES FROM CART
    // =====================================================

    builder
      .addCase(
        GetAllChocolateFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetAllChocolateFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.chocolateFromCart =
            action.payload?.chocolates || [];
        }
      )

      .addCase(
        GetAllChocolateFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch chocolates from cart";
        }
      );

    // =====================================================
    // ADD CHOCOLATE TO CART
    // =====================================================

    builder
      .addCase(
        AddChocolateToCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        AddChocolateToCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.chocolateFromCart =
            action.payload?.chocolates || [];
        }
      )

      .addCase(
        AddChocolateToCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add chocolate to cart";
        }
      );

    // =====================================================
    // INCREMENT CHOCOLATE QUANTITY
    // =====================================================

    builder
      .addCase(
        IncrementChocolateCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        IncrementChocolateCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.chocolateFromCart =
            action.payload?.chocolates || [];
        }
      )

      .addCase(
        IncrementChocolateCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to increase chocolate quantity";
        }
      );

    // =====================================================
    // DECREMENT CHOCOLATE QUANTITY
    // =====================================================

    builder
      .addCase(
        DecrementChocolateCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DecrementChocolateCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.chocolateFromCart =
            action.payload?.chocolates || [];
        }
      )

      .addCase(
        DecrementChocolateCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to decrease chocolate quantity";
        }
      );

    // =====================================================
    // DELETE CHOCOLATE FROM CART
    // =====================================================

    builder
      .addCase(
        DeleteChocolateFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DeleteChocolateFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.chocolateFromCart =
            action.payload?.chocolates || [];

          // Delete ke baad popup close
          state.isDeletePopupOpen = false;
          state.deleteCartId = null;
        }
      )

      .addCase(
        DeleteChocolateFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to remove chocolate from cart";
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
} = ChocolateAddToCartSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const ChocolateAddToCartReducer =
  ChocolateAddToCartSlice.reducer;

export default ChocolateAddToCartReducer;
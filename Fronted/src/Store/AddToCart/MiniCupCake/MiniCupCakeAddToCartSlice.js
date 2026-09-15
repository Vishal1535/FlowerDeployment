
import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllMiniCupcakeFromCartThunk,
  AddMiniCupcakeToCartThunk,
  IncrementMiniCupcakeCartThunk,
  DecrementMiniCupcakeCartThunk,
  DeleteMiniCupcakeFromCartThunk,
} from "./MiniCupCakeAddToCartApi.js";

const initialState = {
  miniCupcakeFromCart: [],

  loading: false,
  error: null,

  // ==============================
  // DELETE POPUP
  // ==============================

  isDeletePopupOpen: false,
  deleteCartId: null,
};

const MiniCupCakeAddToCartSlice = createSlice({
  name: "miniCupCakeAddToCart",

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
    // GET ALL MINI CUPCAKES FROM CART
    // =====================================================

    builder
      .addCase(
        GetAllMiniCupcakeFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetAllMiniCupcakeFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.miniCupcakeFromCart =
            action.payload?.miniCupcakes || [];
        }
      )

      .addCase(
        GetAllMiniCupcakeFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch mini cupcakes from cart";
        }
      );

    // =====================================================
    // ADD MINI CUPCAKE TO CART
    // =====================================================

    builder
      .addCase(
        AddMiniCupcakeToCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        AddMiniCupcakeToCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.miniCupcakeFromCart =
            action.payload?.miniCupcakes || [];
        }
      )

      .addCase(
        AddMiniCupcakeToCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add mini cupcake to cart";
        }
      );

    // =====================================================
    // INCREMENT MINI CUPCAKE QUANTITY
    // =====================================================

    builder
      .addCase(
        IncrementMiniCupcakeCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        IncrementMiniCupcakeCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.miniCupcakeFromCart =
            action.payload?.miniCupcakes || [];
        }
      )

      .addCase(
        IncrementMiniCupcakeCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to increase mini cupcake quantity";
        }
      );

    // =====================================================
    // DECREMENT MINI CUPCAKE QUANTITY
    // =====================================================

    builder
      .addCase(
        DecrementMiniCupcakeCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DecrementMiniCupcakeCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.miniCupcakeFromCart =
            action.payload?.miniCupcakes || [];
        }
      )

      .addCase(
        DecrementMiniCupcakeCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to decrease mini cupcake quantity";
        }
      );

    // =====================================================
    // DELETE MINI CUPCAKE FROM CART
    // =====================================================

    builder
      .addCase(
        DeleteMiniCupcakeFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DeleteMiniCupcakeFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.miniCupcakeFromCart =
            action.payload?.miniCupcakes || [];

          // Delete ke baad popup close
          state.isDeletePopupOpen = false;
          state.deleteCartId = null;
        }
      )

      .addCase(
        DeleteMiniCupcakeFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to remove mini cupcake from cart";
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
} = MiniCupCakeAddToCartSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const MiniCupCakeAddToCartReducer =
  MiniCupCakeAddToCartSlice.reducer;

export default MiniCupCakeAddToCartReducer;


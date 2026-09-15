import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllComboBouquetFromCartThunk,
  AddComboBouquetToCartThunk,
  IncrementComboBouquetCartThunk,
  DecrementComboBouquetCartThunk,
  DeleteComboBouquetFromCartThunk,
} from "./ComboBouquetAddToCartApi";

const initialState = {
  comboBouquetFromCart: [],

  loading: false,
  error: null,

  // ==============================
  // DELETE POPUP
  // ==============================

  isDeletePopupOpen: false,
  deleteCartId: null,
};

const ComboBouquetAddToCartSlice = createSlice({
  name: "comboBouquetAddToCart",

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
    // GET ALL COMBO BOUQUETS FROM CART
    // =====================================================

    builder
      .addCase(
        GetAllComboBouquetFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetAllComboBouquetFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.comboBouquetFromCart =
            action.payload?.comboBouquets || [];
        }
      )

      .addCase(
        GetAllComboBouquetFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch combo bouquets from cart";
        }
      );

    // =====================================================
    // ADD COMBO BOUQUET TO CART
    // =====================================================

    builder
      .addCase(
        AddComboBouquetToCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        AddComboBouquetToCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.comboBouquetFromCart =
            action.payload?.comboBouquets || [];
        }
      )

      .addCase(
        AddComboBouquetToCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add combo bouquet to cart";
        }
      );

    // =====================================================
    // INCREMENT COMBO BOUQUET QUANTITY
    // =====================================================

    builder
      .addCase(
        IncrementComboBouquetCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        IncrementComboBouquetCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.comboBouquetFromCart =
            action.payload?.comboBouquets || [];
        }
      )

      .addCase(
        IncrementComboBouquetCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to increase combo bouquet quantity";
        }
      );

    // =====================================================
    // DECREMENT COMBO BOUQUET QUANTITY
    // =====================================================

    builder
      .addCase(
        DecrementComboBouquetCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DecrementComboBouquetCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.comboBouquetFromCart =
            action.payload?.comboBouquets || [];
        }
      )

      .addCase(
        DecrementComboBouquetCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to decrease combo bouquet quantity";
        }
      );

    // =====================================================
    // DELETE COMBO BOUQUET FROM CART
    // =====================================================

    builder
      .addCase(
        DeleteComboBouquetFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DeleteComboBouquetFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.comboBouquetFromCart =
            action.payload?.comboBouquets || [];

          // Delete ke baad popup close
          state.isDeletePopupOpen = false;
          state.deleteCartId = null;
        }
      )

      .addCase(
        DeleteComboBouquetFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to remove combo bouquet from cart";
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
} = ComboBouquetAddToCartSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const ComboBouquetAddToCartReducer =
  ComboBouquetAddToCartSlice.reducer;

export default ComboBouquetAddToCartReducer;
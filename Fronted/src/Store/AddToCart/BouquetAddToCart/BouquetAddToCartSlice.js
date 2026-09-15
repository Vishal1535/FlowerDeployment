
import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllBouquetFromCartThunk,
  AddBouquetToCartThunk,
  IncrementBouquetCartThunk,
  DecrementBouquetCartThunk,
  DeleteBouquetFromCartThunk,
} from "./BouquetAddToCartApi";

const initialState = {
  bouquetFromCart: [],

  loading: false,
  error: null,

  // ==============================
  // DELETE POPUP
  // ==============================

  isDeletePopupOpen: false,
  deleteCartId: null,
};

const BouquetAddToCartSlice = createSlice({
  name: "bouquetAddToCart",

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
    // GET ALL BOUQUETS FROM CART
    // =====================================================

    builder
      .addCase(
        GetAllBouquetFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetAllBouquetFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.bouquetFromCart =
            action.payload?.bouquets || [];
        }
      )

      .addCase(
        GetAllBouquetFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch bouquets from cart";
        }
      );

    // =====================================================
    // ADD BOUQUET TO CART
    // =====================================================

    builder
      .addCase(
        AddBouquetToCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        AddBouquetToCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.bouquetFromCart =
            action.payload?.bouquets || [];
        }
      )

      .addCase(
        AddBouquetToCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add bouquet to cart";
        }
      );

    // =====================================================
    // INCREMENT BOUQUET QUANTITY
    // =====================================================

    builder
      .addCase(
        IncrementBouquetCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        IncrementBouquetCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.bouquetFromCart =
            action.payload?.bouquets || [];
        }
      )

      .addCase(
        IncrementBouquetCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to increase bouquet quantity";
        }
      );

    // =====================================================
    // DECREMENT BOUQUET QUANTITY
    // =====================================================

    builder
      .addCase(
        DecrementBouquetCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DecrementBouquetCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.bouquetFromCart =
            action.payload?.bouquets || [];
        }
      )

      .addCase(
        DecrementBouquetCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to decrease bouquet quantity";
        }
      );

    // =====================================================
    // DELETE BOUQUET FROM CART
    // =====================================================

    builder
      .addCase(
        DeleteBouquetFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DeleteBouquetFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.bouquetFromCart =
            action.payload?.bouquets || [];

          // Delete ke baad popup close
          state.isDeletePopupOpen = false;
          state.deleteCartId = null;
        }
      )

      .addCase(
        DeleteBouquetFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to remove bouquet from cart";
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
} = BouquetAddToCartSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const BouquetAddToCartReducer =
  BouquetAddToCartSlice.reducer;

export default BouquetAddToCartReducer;


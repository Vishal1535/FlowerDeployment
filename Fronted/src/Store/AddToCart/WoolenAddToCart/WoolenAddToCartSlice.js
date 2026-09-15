import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllWoolenBouquetFromCartThunk,
  AddWoolenBouquetToCartThunk,
  IncrementWoolenBouquetCartThunk,
  DecrementWoolenBouquetCartThunk,
  DeleteWoolenBouquetFromCartThunk,
} from "./WoolenAddToCartApi";

const initialState = {
  woolenBouquetFromCart: [],

  loading: false,
  error: null,

  // ==============================
  // DELETE POPUP
  // ==============================

  isDeletePopupOpen: false,
  deleteCartId: null,
};

const WoolenBouquetAddToCartSlice = createSlice({
  name: "woolenBouquetAddToCart",

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
    // GET ALL WOOLEN BOUQUETS FROM CART
    // =====================================================

    builder
      .addCase(
        GetAllWoolenBouquetFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetAllWoolenBouquetFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.woolenBouquetFromCart =
            action.payload?.woolenBouquets || [];
        }
      )

      .addCase(
        GetAllWoolenBouquetFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch woolen bouquets from cart";
        }
      );

    // =====================================================
    // ADD WOOLEN BOUQUET TO CART
    // =====================================================

    builder
      .addCase(
        AddWoolenBouquetToCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        AddWoolenBouquetToCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.woolenBouquetFromCart =
            action.payload?.woolenBouquets || [];
        }
      )

      .addCase(
        AddWoolenBouquetToCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add woolen bouquet to cart";
        }
      );

    // =====================================================
    // INCREMENT WOOLEN BOUQUET QUANTITY
    // =====================================================

    builder
      .addCase(
        IncrementWoolenBouquetCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        IncrementWoolenBouquetCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.woolenBouquetFromCart =
            action.payload?.woolenBouquets || [];
        }
      )

      .addCase(
        IncrementWoolenBouquetCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to increase woolen bouquet quantity";
        }
      );

    // =====================================================
    // DECREMENT WOOLEN BOUQUET QUANTITY
    // =====================================================

    builder
      .addCase(
        DecrementWoolenBouquetCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DecrementWoolenBouquetCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.woolenBouquetFromCart =
            action.payload?.woolenBouquets || [];
        }
      )

      .addCase(
        DecrementWoolenBouquetCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to decrease woolen bouquet quantity";
        }
      );

    // =====================================================
    // DELETE WOOLEN BOUQUET FROM CART
    // =====================================================

    builder
      .addCase(
        DeleteWoolenBouquetFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DeleteWoolenBouquetFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.woolenBouquetFromCart =
            action.payload?.woolenBouquets || [];

          // Delete ke baad popup close
          state.isDeletePopupOpen = false;
          state.deleteCartId = null;
        }
      )

      .addCase(
        DeleteWoolenBouquetFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to remove woolen bouquet from cart";
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
} = WoolenBouquetAddToCartSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const WoolenBouquetAddToCartReducer =
  WoolenBouquetAddToCartSlice.reducer;

export default WoolenBouquetAddToCartReducer;
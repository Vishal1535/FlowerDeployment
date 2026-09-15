
import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllFlowerFromCartThunk,
  AddFlowerToCartThunk,
  IncrementFlowerCartThunk,
  DecrementFlowerCartThunk,
  DeleteFlowerFromCartThunk,
} from "./FlowerAddToCartApi";

const initialState = {
  flowerFromCart: [],

  loading: false,
  error: null,

  // ==============================
  // DELETE POPUP
  // ==============================

  isDeletePopupOpen: false,
  deleteCartId: null,
};

const FlowerAddToCartSlice = createSlice({
  name: "flowerAddToCart",

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
    // GET ALL FLOWERS FROM CART
    // =====================================================

    builder
      .addCase(
        GetAllFlowerFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetAllFlowerFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.flowerFromCart =
            action.payload?.flowers || [];
        }
      )

      .addCase(
        GetAllFlowerFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch flowers from cart";
        }
      );

    // =====================================================
    // ADD FLOWER TO CART
    // =====================================================

    builder
      .addCase(
        AddFlowerToCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        AddFlowerToCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.flowerFromCart =
            action.payload?.flowers || [];
        }
      )

      .addCase(
        AddFlowerToCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add flower to cart";
        }
      );

    // =====================================================
    // INCREMENT FLOWER QUANTITY
    // =====================================================

    builder
      .addCase(
        IncrementFlowerCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        IncrementFlowerCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.flowerFromCart =
            action.payload?.flowers || [];
        }
      )

      .addCase(
        IncrementFlowerCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to increase quantity";
        }
      );

    // =====================================================
    // DECREMENT FLOWER QUANTITY
    // =====================================================

    builder
      .addCase(
        DecrementFlowerCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DecrementFlowerCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.flowerFromCart =
            action.payload?.flowers || [];
        }
      )

      .addCase(
        DecrementFlowerCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to decrease quantity";
        }
      );

    // =====================================================
    // DELETE FLOWER FROM CART
    // =====================================================

    builder
      .addCase(
        DeleteFlowerFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DeleteFlowerFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.flowerFromCart =
            action.payload?.flowers || [];

          // Delete ke baad popup close
          state.isDeletePopupOpen = false;
          state.deleteCartId = null;
        }
      )

      .addCase(
        DeleteFlowerFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to remove flower from cart";
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
} = FlowerAddToCartSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const FlowerAddToCartReducer =
  FlowerAddToCartSlice.reducer;

export default FlowerAddToCartReducer;


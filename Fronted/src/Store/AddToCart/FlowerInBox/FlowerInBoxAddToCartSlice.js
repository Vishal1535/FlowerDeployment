import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllFlowerInBoxFromCartThunk,
  AddFlowerInBoxToCartThunk,
  IncrementFlowerInBoxCartThunk,
  DecrementFlowerInBoxCartThunk,
  DeleteFlowerInBoxFromCartThunk,
} from "./FlowerInBoxAddToCartApi";

const initialState = {
  flowerInBoxFromCart: [],

  loading: false,
  error: null,

  // ==============================
  // DELETE POPUP
  // ==============================

  isDeletePopupOpen: false,
  deleteCartId: null,
};

const FlowerInBoxAddToCartSlice = createSlice({
  name: "flowerInBoxAddToCart",

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
    // GET ALL FLOWER IN BOX FROM CART
    // =====================================================

    builder
      .addCase(
        GetAllFlowerInBoxFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetAllFlowerInBoxFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.flowerInBoxFromCart =
            action.payload?.flowerInBoxes || [];
        }
      )

      .addCase(
        GetAllFlowerInBoxFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch flower in box from cart";
        }
      );

    // =====================================================
    // ADD FLOWER IN BOX TO CART
    // =====================================================

    builder
      .addCase(
        AddFlowerInBoxToCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        AddFlowerInBoxToCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.flowerInBoxFromCart =
            action.payload?.flowerInBoxes || [];
        }
      )

      .addCase(
        AddFlowerInBoxToCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add flower in box to cart";
        }
      );

    // =====================================================
    // INCREMENT FLOWER IN BOX QUANTITY
    // =====================================================

    builder
      .addCase(
        IncrementFlowerInBoxCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        IncrementFlowerInBoxCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.flowerInBoxFromCart =
            action.payload?.flowerInBoxes || [];
        }
      )

      .addCase(
        IncrementFlowerInBoxCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to increase flower in box quantity";
        }
      );

    // =====================================================
    // DECREMENT FLOWER IN BOX QUANTITY
    // =====================================================

    builder
      .addCase(
        DecrementFlowerInBoxCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DecrementFlowerInBoxCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.flowerInBoxFromCart =
            action.payload?.flowerInBoxes || [];
        }
      )

      .addCase(
        DecrementFlowerInBoxCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to decrease flower in box quantity";
        }
      );

    // =====================================================
    // DELETE FLOWER IN BOX FROM CART
    // =====================================================

    builder
      .addCase(
        DeleteFlowerInBoxFromCartThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        DeleteFlowerInBoxFromCartThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.flowerInBoxFromCart =
            action.payload?.flowerInBoxes || [];

          // Delete ke baad popup close
          state.isDeletePopupOpen = false;
          state.deleteCartId = null;
        }
      )

      .addCase(
        DeleteFlowerInBoxFromCartThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to remove flower in box from cart";
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
} = FlowerInBoxAddToCartSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const FlowerInBoxAddToCartReducer =
  FlowerInBoxAddToCartSlice.reducer;

export default FlowerInBoxAddToCartReducer;
import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllFlowerInSleeveFromCartThunk,
  AddFlowerInSleeveToCartThunk,
  IncrementFlowerInSleeveCartThunk,
  DecrementFlowerInSleeveCartThunk,
  DeleteFlowerInSleeveFromCartThunk,
} from "./FlowerInSleeveAddToCartApi";

const initialState = {
  flowerInSleeveFromCart: [],

  loading: false,
  error: null,

  // ==============================
  // DELETE POPUP
  // ==============================

  isDeletePopupOpen: false,
  deleteCartId: null,
};

const FlowerInSleeveAddToCartSlice = createSlice({
  name: "flowerInSleeveAddToCart",

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
    // GET ALL FLOWER IN SLEEVE FROM CART
    // =====================================================

    builder
      .addCase(GetAllFlowerInSleeveFromCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllFlowerInSleeveFromCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.flowerInSleeveFromCart = action.payload?.flowerInSleeves || [];
      })

      .addCase(GetAllFlowerInSleeveFromCartThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Failed to fetch flower in sleeve from cart";
      });

    // =====================================================
    // ADD FLOWER IN SLEEVE TO CART
    // =====================================================

    builder
      .addCase(AddFlowerInSleeveToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(AddFlowerInSleeveToCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.flowerInSleeveFromCart = action.payload?.flowerInSleeves || [];
      })

      .addCase(AddFlowerInSleeveToCartThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Failed to add flower in sleeve to cart";
      });

    // =====================================================
    // INCREMENT FLOWER IN SLEEVE QUANTITY
    // =====================================================

    builder
      .addCase(IncrementFlowerInSleeveCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(IncrementFlowerInSleeveCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.flowerInSleeveFromCart = action.payload?.flowerInSleeves || [];
      })

      .addCase(IncrementFlowerInSleeveCartThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Failed to increase flower in sleeve quantity";
      });

    // =====================================================
    // DECREMENT FLOWER IN SLEEVE QUANTITY
    // =====================================================

    builder
      .addCase(DecrementFlowerInSleeveCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(DecrementFlowerInSleeveCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.flowerInSleeveFromCart = action.payload?.flowerInSleeves || [];
      })

      .addCase(DecrementFlowerInSleeveCartThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Failed to decrease flower in sleeve quantity";
      });

    // =====================================================
    // DELETE FLOWER IN SLEEVE FROM CART
    // =====================================================

    builder
      .addCase(DeleteFlowerInSleeveFromCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(DeleteFlowerInSleeveFromCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.flowerInSleeveFromCart = action.payload?.flowerInSleeves || [];

        // Delete ke baad popup close
        state.isDeletePopupOpen = false;
        state.deleteCartId = null;
      })

      .addCase(DeleteFlowerInSleeveFromCartThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Failed to remove flower in sleeve from cart";
      });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const { showDeletePopup, hideDeletePopup } =
  FlowerInSleeveAddToCartSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const FlowerInSleeveAddToCartReducer = FlowerInSleeveAddToCartSlice.reducer;

export default FlowerInSleeveAddToCartReducer;

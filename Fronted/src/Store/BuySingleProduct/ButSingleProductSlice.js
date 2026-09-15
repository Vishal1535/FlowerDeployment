import { createSlice } from "@reduxjs/toolkit";

import { CreateSingleProductOrderThunk } from "./BuySingleProductApi";

// Get saved product from sessionStorage
const savedProduct = sessionStorage.getItem("buySingleProduct");

// Initial state
const initialState = {
  singleProduct: savedProduct ? JSON.parse(savedProduct) : null,

  quantity: savedProduct ? JSON.parse(savedProduct)?.quantity || 1 : 1,

  totalPrice: savedProduct ? JSON.parse(savedProduct)?.totalPrice || 0 : 0,

  loading: false,
  error: null,

  order: null,
};

const BuySingleProductSlice = createSlice({
  name: "buySingleProduct",

  initialState,

  reducers: {
    // BUY NOW CLICK
    setSingleProduct: (state, action) => {
      const product = action.payload;

      state.singleProduct = product;
      state.quantity = product?.quantity || 1;

      const price = product?.price || 0;
      const discountPrice = product?.discountPrice || 0;

      const hasDiscount = discountPrice > 0 && discountPrice < price;

      const finalPrice = hasDiscount ? discountPrice : price;

      state.totalPrice = finalPrice * state.quantity;

      state.error = null;
      state.order = null;

      // Save data in sessionStorage
      sessionStorage.setItem(
        "buySingleProduct",
        JSON.stringify({
          ...product,
          quantity: state.quantity,
          totalPrice: state.totalPrice,
        }),
      );
    },

    // INCREMENT
    incrementQuantity: (state) => {
      if (!state.singleProduct) return;

      const stock = state.singleProduct?.stock || 0;

      if (state.quantity < stock) {
        state.quantity += 1;

        const price = state.singleProduct?.price || 0;

        const discountPrice = state.singleProduct?.discountPrice || 0;

        const hasDiscount = discountPrice > 0 && discountPrice < price;

        const finalPrice = hasDiscount ? discountPrice : price;

        state.totalPrice = finalPrice * state.quantity;

        // Update sessionStorage
        sessionStorage.setItem(
          "buySingleProduct",
          JSON.stringify({
            ...state.singleProduct,
            quantity: state.quantity,
            totalPrice: state.totalPrice,
          }),
        );
      }
    },

    // DECREMENT
    decrementQuantity: (state) => {
      if (!state.singleProduct) return;

      if (state.quantity > 1) {
        state.quantity -= 1;

        const price = state.singleProduct?.price || 0;

        const discountPrice = state.singleProduct?.discountPrice || 0;

        const hasDiscount = discountPrice > 0 && discountPrice < price;

        const finalPrice = hasDiscount ? discountPrice : price;

        state.totalPrice = finalPrice * state.quantity;

        // Update sessionStorage
        sessionStorage.setItem(
          "buySingleProduct",
          JSON.stringify({
            ...state.singleProduct,
            quantity: state.quantity,
            totalPrice: state.totalPrice,
          }),
        );
      }
    },

    // REMOVE SINGLE PRODUCT
    removeSingleProduct: (state) => {
      state.singleProduct = null;
      state.quantity = 1;
      state.totalPrice = 0;
      state.error = null;
      state.order = null;

      // Remove from sessionStorage
      sessionStorage.removeItem("buySingleProduct");
    },

    // CLEAR
    clearSingleProduct: (state) => {
      state.singleProduct = null;
      state.quantity = 1;
      state.totalPrice = 0;
      state.loading = false;
      state.error = null;
      state.order = null;

      // Remove from sessionStorage
      sessionStorage.removeItem("buySingleProduct");
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE SINGLE PRODUCT ORDER
      .addCase(CreateSingleProductOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(CreateSingleProductOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.order = action.payload;
      })

      .addCase(CreateSingleProductOrderThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to create single product order";
      });
  },
});

export const {
  setSingleProduct,
  incrementQuantity,
  decrementQuantity,
  removeSingleProduct,
  clearSingleProduct,
} = BuySingleProductSlice.actions;

const BuySingleProductReducer = BuySingleProductSlice.reducer;

export default BuySingleProductReducer;

import { createSlice } from "@reduxjs/toolkit";

import {
  globalSearchThunk,
  GetAllProductsByOccasionThunk,
} from "./ProductApi";

const initialState = {
  // ================= SEARCH =================

  searchResults: [],
  searchLoading: false,
  searchError: null,

  // ================= OCCASION =================

  occasionProducts: [],
  occasionLoading: false,
  occasionError: null,

  // ================= SINGLE PRODUCT =================

  singleProduct: null,
  singleProductLoading: false,
  singleProductError: null,
};

const ProductSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
    },

    clearOccasionProducts: (state) => {
      state.occasionProducts = [];
      state.occasionError = null;
    },

    clearSingleProduct: (state) => {
      state.singleProduct = null;
      state.singleProductError = null;
    },
  },

  extraReducers: (builder) => {
    // =========================================
    // GLOBAL SEARCH
    // =========================================

    builder
      .addCase(
        globalSearchThunk.pending,
        (state) => {
          state.searchLoading = true;
          state.searchError = null;
        }
      )

      .addCase(
        globalSearchThunk.fulfilled,
        (state, action) => {
          state.searchLoading = false;

          state.searchResults =
            action.payload;
        }
      )

      .addCase(
        globalSearchThunk.rejected,
        (state, action) => {
          state.searchLoading = false;

          state.searchError =
            action.payload ||
            "Search failed";
        }
      );

    // =========================================
    // OCCASION PRODUCTS
    // =========================================

    builder
      .addCase(
        GetAllProductsByOccasionThunk.pending,
        (state) => {
          state.occasionLoading = true;
          state.occasionError = null;
        }
      )

      .addCase(
        GetAllProductsByOccasionThunk.fulfilled,
        (state, action) => {
          state.occasionLoading = false;

          state.occasionProducts =
            action.payload;
        }
      )

      .addCase(
        GetAllProductsByOccasionThunk.rejected,
        (state, action) => {
          state.occasionLoading = false;

          state.occasionError =
            action.payload ||
            "Failed to fetch products";
        }
      );
  },
});

export const {
  clearSearchResults,
  clearOccasionProducts,
  clearSingleProduct,
} = ProductSlice.actions;

const ProductReducer= ProductSlice.reducer;
export default ProductReducer
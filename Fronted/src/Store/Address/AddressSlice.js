import { createSlice } from "@reduxjs/toolkit";

import {
  AddAddressThunk,
  GetLatestAddressThunk,
} from "./AddressApi";

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  address: null,

  loading: false,

  error: null,
};

// =====================================================
// ADDRESS SLICE
// =====================================================

const AddressSlice = createSlice({
  name: "address",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // =================================================
    // ADD ADDRESS
    // =================================================

    builder
      .addCase(AddAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        AddAddressThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.address =
            action.payload?.address || null;
        }
      )

      .addCase(
        AddAddressThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add address";
        }
      );

    // =================================================
    // GET LATEST ADDRESS
    // =================================================

    builder
      .addCase(
        GetLatestAddressThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetLatestAddressThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.address =
            action.payload?.address || null;
        }
      )

      .addCase(
        GetLatestAddressThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch latest address";
        }
      );
  },
});

// =====================================================
// EXPORT
// =====================================================

const AddressReducer = AddressSlice.reducer;

export default AddressReducer;
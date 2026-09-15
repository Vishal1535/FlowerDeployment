import { createSlice } from "@reduxjs/toolkit";

import {
  CreateComboBouquetThunk,
  UpdateComboBouquetThunk,
  DeleteComboBouquetThunk,
  GetAllComboBouquetThunk,
  GetSingleComboBouquetThunk,
  GetComboBouquetByOccasionThunk,
} from "./ComboBouquetApi";

const initialState = {
  comboBouquets: [],
  singleComboBouquet: null,

  loading: false,
  error: null,
  success: false,
  message: "",

  // ================= POPUPS =================

  isCreateComboBouquetPopupOpen: false,
  isEditComboBouquetPopupOpen: false,
  isDeleteComboBouquetPopupOpen: false,

  selectedComboBouquet: null,
};

const ComboBouquetSlice = createSlice({
  name: "comboBouquet",

  initialState,

  reducers: {
    // ================= CREATE POPUP =================

    openCreateComboBouquetPopup: (state) => {
      state.isCreateComboBouquetPopupOpen = true;
    },

    closeCreateComboBouquetPopup: (state) => {
      state.isCreateComboBouquetPopupOpen = false;
    },

    // ================= EDIT POPUP =================

    openEditComboBouquetPopup: (state, action) => {
      state.isEditComboBouquetPopupOpen = true;
      state.selectedComboBouquet = action.payload;
    },

    closeEditComboBouquetPopup: (state) => {
      state.isEditComboBouquetPopupOpen = false;
      state.selectedComboBouquet = null;
    },

    // ================= DELETE POPUP =================

    openDeleteComboBouquetPopup: (state, action) => {
      state.isDeleteComboBouquetPopupOpen = true;
      state.selectedComboBouquet = action.payload;
    },

    closeDeleteComboBouquetPopup: (state) => {
      state.isDeleteComboBouquetPopupOpen = false;
      state.selectedComboBouquet = null;
    },

    // ================= CLEAR ERROR =================

    clearComboBouquetError: (state) => {
      state.error = null;
    },

    // ================= CLEAR MESSAGE =================

    clearComboBouquetMessage: (state) => {
      state.message = "";
    },

    // ================= CLEAR SUCCESS =================

    clearComboBouquetSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    // CREATE COMBO BOUQUET

    builder
      .addCase(CreateComboBouquetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(CreateComboBouquetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (action.payload.comboBouquet) {
          state.comboBouquets.unshift(action.payload.comboBouquet);
        }
      })

      .addCase(CreateComboBouquetThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // UPDATE COMBO BOUQUET

    builder
      .addCase(UpdateComboBouquetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(UpdateComboBouquetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const updatedComboBouquet = action.payload.comboBouquet;

        if (updatedComboBouquet) {
          const index = state.comboBouquets.findIndex(
            (comboBouquet) => comboBouquet._id === updatedComboBouquet._id,
          );

          if (index !== -1) {
            state.comboBouquets[index] = updatedComboBouquet;
          }

          if (state.singleComboBouquet?._id === updatedComboBouquet._id) {
            state.singleComboBouquet = updatedComboBouquet;
          }

          if (state.selectedComboBouquet?._id === updatedComboBouquet._id) {
            state.selectedComboBouquet = updatedComboBouquet;
          }
        }
      })

      .addCase(UpdateComboBouquetThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // DELETE COMBO BOUQUET

    builder
      .addCase(DeleteComboBouquetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(DeleteComboBouquetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const deletedId = action.meta.arg;

        state.comboBouquets = state.comboBouquets.filter(
          (comboBouquet) => comboBouquet._id !== deletedId,
        );

        if (state.singleComboBouquet?._id === deletedId) {
          state.singleComboBouquet = null;
        }

        if (state.selectedComboBouquet?._id === deletedId) {
          state.selectedComboBouquet = null;
        }

        state.isDeleteComboBouquetPopupOpen = false;
      })

      .addCase(DeleteComboBouquetThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // GET ALL COMBO BOUQUETS

    builder
      .addCase(GetAllComboBouquetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllComboBouquetThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.comboBouquets = action.payload.comboBouquets || [];
      })

      .addCase(GetAllComboBouquetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // GET SINGLE COMBO BOUQUET

    builder
      .addCase(GetSingleComboBouquetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetSingleComboBouquetThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.singleComboBouquet = action.payload.comboBouquet || null;
      })

      .addCase(GetSingleComboBouquetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleComboBouquet = null;
      });

    // GET BY OCCASION

    builder
      .addCase(GetComboBouquetByOccasionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetComboBouquetByOccasionThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.comboBouquets = action.payload.comboBouquets || [];
      })

      .addCase(GetComboBouquetByOccasionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// EXPORT ACTIONS

export const {
  openCreateComboBouquetPopup,
  closeCreateComboBouquetPopup,

  openEditComboBouquetPopup,
  closeEditComboBouquetPopup,

  openDeleteComboBouquetPopup,
  closeDeleteComboBouquetPopup,

  clearComboBouquetError,
  clearComboBouquetMessage,
  clearComboBouquetSuccess,
} = ComboBouquetSlice.actions;

// REDUCER

const ComboBouquetReducer = ComboBouquetSlice.reducer;

export default ComboBouquetReducer;

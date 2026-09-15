import { createSlice } from "@reduxjs/toolkit";

import {
  CreateWoolenThunk,
  UpdateWoolenThunk,
  DeleteWoolenThunk,
  GetAllWoolenThunk,
  GetSingleWoolenThunk,
  GetWoolenByOccasionThunk,
} from "./WoolenApi";

const initialState = {
  woolens: [],
  singleWoolen: null,

  loading: false,
  error: null,
  success: false,
  message: "",

  isCreateWoolenPopupOpen: false,
  isEditWoolenPopupOpen: false,
  isDeleteWoolenPopupOpen: false,

  selectedWoolen: null,
};

const WoolenSlice = createSlice({
  name: "woolen",

  initialState,

  reducers: {
    // ================= CREATE POPUP =================

    openCreateWoolenPopup: (state) => {
      state.isCreateWoolenPopupOpen = true;
    },

    closeCreateWoolenPopup: (state) => {
      state.isCreateWoolenPopupOpen = false;
    },

    // ================= EDIT POPUP =================

    openEditWoolenPopup: (state, action) => {
      state.isEditWoolenPopupOpen = true;
      state.selectedWoolen = action.payload;
    },

    closeEditWoolenPopup: (state) => {
      state.isEditWoolenPopupOpen = false;
      state.selectedWoolen = null;
    },

    // ================= DELETE POPUP =================

    openDeleteWoolenPopup: (state, action) => {
      state.isDeleteWoolenPopupOpen = true;
      state.selectedWoolen = action.payload;
    },

    closeDeleteWoolenPopup: (state) => {
      state.isDeleteWoolenPopupOpen = false;
      state.selectedWoolen = null;
    },
  },

  extraReducers: (builder) => {
    // =========================
    // CREATE WOOLEN
    // =========================

    builder
      .addCase(CreateWoolenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(CreateWoolenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (action.payload.woolen) {
          state.woolens.unshift(action.payload.woolen);
        }
      })

      .addCase(CreateWoolenThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =========================
    // UPDATE WOOLEN
    // =========================

    builder
      .addCase(UpdateWoolenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(UpdateWoolenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const updatedWoolen = action.payload.woolen;

        if (updatedWoolen) {
          const index = state.woolens.findIndex(
            (woolen) => woolen._id === updatedWoolen._id
          );

          if (index !== -1) {
            state.woolens[index] = updatedWoolen;
          }

          if (
            state.singleWoolen?._id === updatedWoolen._id
          ) {
            state.singleWoolen = updatedWoolen;
          }

          if (
            state.selectedWoolen?._id === updatedWoolen._id
          ) {
            state.selectedWoolen = updatedWoolen;
          }
        }
      })

      .addCase(UpdateWoolenThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =========================
    // DELETE WOOLEN
    // =========================

    builder
      .addCase(DeleteWoolenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(DeleteWoolenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const deletedId = action.meta.arg;

        state.woolens = state.woolens.filter(
          (woolen) => woolen._id !== deletedId
        );

        if (state.singleWoolen?._id === deletedId) {
          state.singleWoolen = null;
        }

        if (state.selectedWoolen?._id === deletedId) {
          state.selectedWoolen = null;
        }

        state.isDeleteWoolenPopupOpen = false;
      })

      .addCase(DeleteWoolenThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =========================
    // GET ALL WOOLENS
    // =========================

    builder
      .addCase(GetAllWoolenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllWoolenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.woolens = action.payload.woolens || [];
      })

      .addCase(GetAllWoolenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // GET SINGLE WOOLEN
    // =========================

    builder
      .addCase(GetSingleWoolenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetSingleWoolenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleWoolen = action.payload.woolen || null;
      })

      .addCase(GetSingleWoolenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleWoolen = null;
      });

    // =========================
    // GET WOOLEN BY OCCASION
    // =========================

    builder
      .addCase(GetWoolenByOccasionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        GetWoolenByOccasionThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.woolens = action.payload.woolens || [];
        }
      )

      .addCase(
        GetWoolenByOccasionThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  openCreateWoolenPopup,
  closeCreateWoolenPopup,

  openEditWoolenPopup,
  closeEditWoolenPopup,

  openDeleteWoolenPopup,
  closeDeleteWoolenPopup,
} = WoolenSlice.actions;

const WoolenReducer = WoolenSlice.reducer;

export default WoolenReducer;
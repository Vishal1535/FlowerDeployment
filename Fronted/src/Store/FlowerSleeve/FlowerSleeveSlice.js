import { createSlice } from "@reduxjs/toolkit";

import {
  AddFlowerInSleeveThunk,
  GetAllFlowerInSleeveThunk,
  GetSingleFlowerInSleeveThunk,
  UpdateFlowerInSleeveThunk,
  DeleteFlowerInSleeveThunk,
} from "./FlowerSleeveApi.js";

const initialState = {
  flowersInSleeve: [],
  singleFlowerInSleeve: null,

  loading: false,
  error: null,
  success: false,
  message: "",

  // POPUPS
  isCreateFlowerInSleevePopupOpen: false,
  isEditFlowerInSleevePopupOpen: false,
  isDeleteFlowerInSleevePopupOpen: false,

  selectedFlowerInSleeve: null,

  isShowFlowerInSleeve: false,
};

const FlowerInSleeveSlice = createSlice({
  name: "flowerInSleeve",

  initialState,

  reducers: {
    // ================= SHOW / HIDE =================

    showFlowerInSleeve: (state) => {
      state.isShowFlowerInSleeve = true;
    },

    hideFlowerInSleeve: (state) => {
      state.isShowFlowerInSleeve = false;
    },

    // ================= CREATE POPUP =================

    openCreateFlowerInSleevePopup: (state) => {
      state.isCreateFlowerInSleevePopupOpen = true;
    },

    closeCreateFlowerInSleevePopup: (state) => {
      state.isCreateFlowerInSleevePopupOpen = false;
    },

    // ================= EDIT POPUP =================

    openEditFlowerInSleevePopup: (state, action) => {
      state.isEditFlowerInSleevePopupOpen = true;
      state.selectedFlowerInSleeve = action.payload;
    },

    closeEditFlowerInSleevePopup: (state) => {
      state.isEditFlowerInSleevePopupOpen = false;
      state.selectedFlowerInSleeve = null;
    },

    // ================= DELETE POPUP =================

    openDeleteFlowerInSleevePopup: (state, action) => {
      state.isDeleteFlowerInSleevePopupOpen = true;
      state.selectedFlowerInSleeve = action.payload;
    },

    closeDeleteFlowerInSleevePopup: (state) => {
      state.isDeleteFlowerInSleevePopupOpen = false;
      state.selectedFlowerInSleeve = null;
    },

    // ================= CLEAR ERROR =================

    clearFlowerInSleeveError: (state) => {
      state.error = null;
    },

    // ================= CLEAR MESSAGE =================

    clearFlowerInSleeveMessage: (state) => {
      state.message = "";
    },

    // ================= CLEAR SUCCESS =================

    clearFlowerInSleeveSuccess: (state) => {
      state.success = false;
    },

    // ================= CLEAR SELECTED =================

    clearSelectedFlowerInSleeve: (state) => {
      state.selectedFlowerInSleeve = null;
    },
  },

  extraReducers: (builder) => {
    // ==================================================
    // ADD FLOWER IN SLEEVE
    // ==================================================

    builder
      .addCase(AddFlowerInSleeveThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(AddFlowerInSleeveThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (action.payload.flowerInSleeve) {
          state.flowersInSleeve.unshift(action.payload.flowerInSleeve);
        }

        state.isCreateFlowerInSleevePopupOpen = false;
      })

      .addCase(AddFlowerInSleeveThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // ==================================================
    // GET ALL FLOWER IN SLEEVE
    // ==================================================

    builder
      .addCase(GetAllFlowerInSleeveThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllFlowerInSleeveThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.flowersInSleeve = action.payload.flowersInSleeve || [];
      })

      .addCase(GetAllFlowerInSleeveThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ==================================================
    // GET SINGLE FLOWER IN SLEEVE
    // ==================================================

    builder
      .addCase(GetSingleFlowerInSleeveThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetSingleFlowerInSleeveThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.singleFlowerInSleeve = action.payload.flowerInSleeve || null;
      })

      .addCase(GetSingleFlowerInSleeveThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleFlowerInSleeve = null;
      });

    // ==================================================
    // UPDATE FLOWER IN SLEEVE
    // ==================================================

    builder
      .addCase(UpdateFlowerInSleeveThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(UpdateFlowerInSleeveThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const updatedFlowerInSleeve = action.payload.flowerInSleeve;

        if (updatedFlowerInSleeve) {
          const index = state.flowersInSleeve.findIndex(
            (item) => item._id === updatedFlowerInSleeve._id,
          );

          if (index !== -1) {
            state.flowersInSleeve[index] = updatedFlowerInSleeve;
          }

          if (state.singleFlowerInSleeve?._id === updatedFlowerInSleeve._id) {
            state.singleFlowerInSleeve = updatedFlowerInSleeve;
          }

          if (state.selectedFlowerInSleeve?._id === updatedFlowerInSleeve._id) {
            state.selectedFlowerInSleeve = updatedFlowerInSleeve;
          }
        }

        state.isEditFlowerInSleevePopupOpen = false;
        state.selectedFlowerInSleeve = null;
      })

      .addCase(UpdateFlowerInSleeveThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // ==================================================
    // DELETE FLOWER IN SLEEVE
    // ==================================================

    builder
      .addCase(DeleteFlowerInSleeveThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(DeleteFlowerInSleeveThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const deletedId = action.meta.arg;

        state.flowersInSleeve = state.flowersInSleeve.filter(
          (item) => item._id !== deletedId,
        );

        if (state.singleFlowerInSleeve?._id === deletedId) {
          state.singleFlowerInSleeve = null;
        }

        if (state.selectedFlowerInSleeve?._id === deletedId) {
          state.selectedFlowerInSleeve = null;
        }

        state.isDeleteFlowerInSleevePopupOpen = false;
      })

      .addCase(DeleteFlowerInSleeveThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// ==================================================
// EXPORT ACTIONS
// ==================================================

export const {
  showFlowerInSleeve,
  hideFlowerInSleeve,

  openCreateFlowerInSleevePopup,
  closeCreateFlowerInSleevePopup,

  openEditFlowerInSleevePopup,
  closeEditFlowerInSleevePopup,

  openDeleteFlowerInSleevePopup,
  closeDeleteFlowerInSleevePopup,

  clearFlowerInSleeveError,
  clearFlowerInSleeveMessage,
  clearFlowerInSleeveSuccess,

  clearSelectedFlowerInSleeve,
} = FlowerInSleeveSlice.actions;

// ==================================================
// REDUCER
// ==================================================

const FlowerInSleeveReducer = FlowerInSleeveSlice.reducer;

export default FlowerInSleeveReducer;

import { createSlice } from "@reduxjs/toolkit";

import {
  CreateMiniCupcakeThunk,
  UpdateMiniCupcakeThunk,
  DeleteMiniCupcakeThunk,
  GetAllMiniCupcakeThunk,
  GetSingleMiniCupcakeThunk,
  GetMiniCupcakeByOccasionThunk,
} from "./MIniCupCakeApi";

const initialState = {
  miniCupcakes: [],
  singleMiniCupcake: null,

  loading: false,
  error: null,
  success: false,
  message: "",

  isCreateMiniCupcakePopupOpen: false,
  isEditMiniCupcakePopupOpen: false,
  isDeleteMiniCupcakePopupOpen: false,

  selectedMiniCupcake: null,
};

const MiniCupCakeSlice = createSlice({
  name: "miniCupCake",

  initialState,

  reducers: {
    // =========================
    // CREATE POPUP
    // =========================

    openCreateMiniCupcakePopup: (state) => {
      state.isCreateMiniCupcakePopupOpen = true;
    },

    closeCreateMiniCupcakePopup: (state) => {
      state.isCreateMiniCupcakePopupOpen = false;
    },

    // =========================
    // EDIT POPUP
    // =========================

    openEditMiniCupcakePopup: (state, action) => {
      state.isEditMiniCupcakePopupOpen = true;
      state.selectedMiniCupcake = action.payload;
    },

    closeEditMiniCupcakePopup: (state) => {
      state.isEditMiniCupcakePopupOpen = false;
      state.selectedMiniCupcake = null;
    },

    // =========================
    // DELETE POPUP
    // =========================

    openDeleteMiniCupcakePopup: (state, action) => {
      state.isDeleteMiniCupcakePopupOpen = true;
      state.selectedMiniCupcake = action.payload;
    },

    closeDeleteMiniCupcakePopup: (state) => {
      state.isDeleteMiniCupcakePopupOpen = false;
      state.selectedMiniCupcake = null;
    },

    // =========================
    // CLEAR ERROR
    // =========================

    clearMiniCupcakeError: (state) => {
      state.error = null;
    },

    // =========================
    // CLEAR MESSAGE
    // =========================

    clearMiniCupcakeMessage: (state) => {
      state.message = "";
    },

    // =========================
    // CLEAR SUCCESS
    // =========================

    clearMiniCupcakeSuccess: (state) => {
      state.success = false;
    },

    // =========================
    // CLEAR SELECTED
    // =========================

    clearSelectedMiniCupcake: (state) => {
      state.selectedMiniCupcake = null;
    },
  },

  extraReducers: (builder) => {
    // =========================
    // CREATE MINI CUPCAKE
    // =========================

    builder
      .addCase(CreateMiniCupcakeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        CreateMiniCupcakeThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message;

          if (action.payload.miniCupcake) {
            state.miniCupcakes.unshift(
              action.payload.miniCupcake
            );
          }
        }
      )

      .addCase(
        CreateMiniCupcakeThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      );

    // =========================
    // UPDATE MINI CUPCAKE
    // =========================

    builder
      .addCase(UpdateMiniCupcakeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        UpdateMiniCupcakeThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message;

          const updatedMiniCupcake =
            action.payload.miniCupcake;

          if (updatedMiniCupcake) {
            const index = state.miniCupcakes.findIndex(
              (miniCupcake) =>
                miniCupcake._id ===
                updatedMiniCupcake._id
            );

            if (index !== -1) {
              state.miniCupcakes[index] =
                updatedMiniCupcake;
            }

            if (
              state.singleMiniCupcake?._id ===
              updatedMiniCupcake._id
            ) {
              state.singleMiniCupcake =
                updatedMiniCupcake;
            }

            if (
              state.selectedMiniCupcake?._id ===
              updatedMiniCupcake._id
            ) {
              state.selectedMiniCupcake =
                updatedMiniCupcake;
            }
          }
        }
      )

      .addCase(
        UpdateMiniCupcakeThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      );

    // =========================
    // DELETE MINI CUPCAKE
    // =========================

    builder
      .addCase(DeleteMiniCupcakeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        DeleteMiniCupcakeThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message;

          const deletedId = action.meta.arg;

          state.miniCupcakes =
            state.miniCupcakes.filter(
              (miniCupcake) =>
                miniCupcake._id !== deletedId
            );

          if (
            state.singleMiniCupcake?._id ===
            deletedId
          ) {
            state.singleMiniCupcake = null;
          }

          if (
            state.selectedMiniCupcake?._id ===
            deletedId
          ) {
            state.selectedMiniCupcake = null;
          }

          state.isDeleteMiniCupcakePopupOpen = false;
        }
      )

      .addCase(
        DeleteMiniCupcakeThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      );

    // =========================
    // GET ALL MINI CUPCAKES
    // =========================

    builder
      .addCase(GetAllMiniCupcakeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        GetAllMiniCupcakeThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          state.miniCupcakes =
            action.payload.miniCupcakes || [];
        }
      )

      .addCase(
        GetAllMiniCupcakeThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // =========================
    // GET SINGLE MINI CUPCAKE
    // =========================

    builder
      .addCase(
        GetSingleMiniCupcakeThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetSingleMiniCupcakeThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          state.singleMiniCupcake =
            action.payload.miniCupcake || null;
        }
      )

      .addCase(
        GetSingleMiniCupcakeThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.singleMiniCupcake = null;
        }
      );

    // =========================
    // GET MINI CUPCAKE BY OCCASION
    // =========================

    builder
      .addCase(
        GetMiniCupcakeByOccasionThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetMiniCupcakeByOccasionThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          state.miniCupcakes =
            action.payload.miniCupcakes || [];
        }
      )

      .addCase(
        GetMiniCupcakeByOccasionThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

// =========================
// EXPORT ACTIONS
// =========================

export const {
  openCreateMiniCupcakePopup,
  closeCreateMiniCupcakePopup,

  openEditMiniCupcakePopup,
  closeEditMiniCupcakePopup,

  openDeleteMiniCupcakePopup,
  closeDeleteMiniCupcakePopup,

  clearMiniCupcakeError,
  clearMiniCupcakeMessage,
  clearMiniCupcakeSuccess,

  clearSelectedMiniCupcake,
} = MiniCupCakeSlice.actions;

// =========================
// REDUCER
// =========================

const MiniCupCakeReducer = MiniCupCakeSlice.reducer;

export default MiniCupCakeReducer;
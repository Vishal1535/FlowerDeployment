import { createSlice } from "@reduxjs/toolkit";

import {
  CreateChocolateThunk,
  UpdateChocolateThunk,
  DeleteChocolateThunk,
  GetAllChocolateThunk,
  GetSingleChocolateThunk,
  GetChocolateByOccasionThunk,
} from "./ChocolateApi";

const initialState = {
  chocolates: [],
  singleChocolate: null,
  loading: false,
  error: null,
  success: false,
  message: "",
   isCreateChocolatePopupOpen: false,
  isEditChocolatePopupOpen: false,
  isDeleteChocolatePopupOpen: false,

  selectedChocolate: null,
};

const ChocolateSlice = createSlice({
  name: "chocolate",

  initialState,

reducers: {
  openCreateChocolatePopup: (state) => {
    state.isCreateChocolatePopupOpen = true;
  },

  closeCreateChocolatePopup: (state) => {
    state.isCreateChocolatePopupOpen = false;
  },

  openEditChocolatePopup: (state, action) => {
    state.isEditChocolatePopupOpen = true;
    state.selectedChocolate = action.payload;
  },

  closeEditChocolatePopup: (state) => {
    state.isEditChocolatePopupOpen = false;
    state.selectedChocolate = null;
  },

  openDeleteChocolatePopup: (state, action) => {
    state.isDeleteChocolatePopupOpen = true;
    state.selectedChocolate = action.payload;
  },

  closeDeleteChocolatePopup: (state) => {
    state.isDeleteChocolatePopupOpen = false;
    state.selectedChocolate = null;
  },
},

  extraReducers: (builder) => {
    // =========================
    // CREATE CHOCOLATE
    // =========================

    builder
      .addCase(CreateChocolateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(CreateChocolateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (action.payload.chocolate) {
          state.chocolates.unshift(
            action.payload.chocolate
          );
        }
      })

      .addCase(CreateChocolateThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =========================
    // UPDATE CHOCOLATE
    // =========================

    builder
      .addCase(UpdateChocolateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(UpdateChocolateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const updatedChocolate =
          action.payload.chocolate;

        if (updatedChocolate) {
          const index = state.chocolates.findIndex(
            (chocolate) =>
              chocolate._id === updatedChocolate._id
          );

          if (index !== -1) {
            state.chocolates[index] =
              updatedChocolate;
          }

          if (
            state.singleChocolate?._id ===
            updatedChocolate._id
          ) {
            state.singleChocolate =
              updatedChocolate;
          }
        }
      })

      .addCase(UpdateChocolateThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =========================
    // DELETE CHOCOLATE
    // =========================

    builder
      .addCase(DeleteChocolateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(DeleteChocolateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        // ID can be returned through thunk meta
        const deletedId = action.meta.arg;

        state.chocolates = state.chocolates.filter(
          (chocolate) =>
            chocolate._id !== deletedId
        );

        if (
          state.singleChocolate?._id === deletedId
        ) {
          state.singleChocolate = null;
        }
      })

      .addCase(DeleteChocolateThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =========================
    // GET ALL CHOCOLATES
    // =========================

    builder
      .addCase(GetAllChocolateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllChocolateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.chocolates =
          action.payload.chocolates || [];
      })

      .addCase(GetAllChocolateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // GET SINGLE CHOCOLATE
    // =========================

    builder
      .addCase(GetSingleChocolateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetSingleChocolateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleChocolate =
          action.payload.chocolate || null;
      })

      .addCase(GetSingleChocolateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleChocolate = null;
      });

    // =========================
    // GET CHOCOLATE BY OCCASION
    // =========================

    builder
      .addCase(
        GetChocolateByOccasionThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetChocolateByOccasionThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.chocolates =
            action.payload.chocolates || [];
        }
      )

      .addCase(
        GetChocolateByOccasionThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  openCreateChocolatePopup,
  closeCreateChocolatePopup,
  openEditChocolatePopup,
  closeEditChocolatePopup,
  openDeleteChocolatePopup,
  closeDeleteChocolatePopup,
} = ChocolateSlice.actions;

const ChocolateReducer=ChocolateSlice.reducer
export default ChocolateReducer
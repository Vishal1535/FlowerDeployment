import { createSlice } from "@reduxjs/toolkit";

import {
  createBouquetThunk,
  AllBouquetsThunk,
  SingleBouquetThunk,
  updateBouquetThunk,
  deleteBouquetThunk,
  GetHeroBouquetsThunk,
} from "./BouquestApi.js";

const initialState = {
  bouquets: [],
  singleBouquet: null,
  heroBouquets: [],

  currentPage: 1,
  totalPages: 0,
  totalBouquets: 0,

  loading: false,
  error: null,
  success: false,
  message: "",
  id:"",
  

  isCreateBouquetPopupOpen: false,
  isDeleteBouquetPopupOpen: false,
  isEditBouquetPopupOpen: false,
};

const BouquestSlice = createSlice({
  name: "bouquet",

  initialState,

  reducers: {
    openCreateBouquetPopup: (state) => {
      state.isCreateBouquetPopupOpen = true;
    },

    closeCreateBouquetPopup: (state) => {
      state.isCreateBouquetPopupOpen = false;
    },

    openDeleteBouquetPopup: (state,action) => {
      state.isDeleteBouquetPopupOpen = true;
      state.id=action.payload
    },

    closeDeleteBouquetPopup: (state) => {
      state.isDeleteBouquetPopupOpen = false;
      state.id=null
    },

    openEditBouquetPopup: (state,action) => {
      state.isEditBouquetPopupOpen = true;
      state.singleBouquet=action.payload
    },

    closeEditBouquetPopup: (state,) => {
      state.isEditBouquetPopupOpen = false;
      state.singleBouquet=null
    },
  },

  extraReducers: (builder) => {
    // CREATE BOUQUET

    builder
      .addCase(createBouquetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createBouquetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message || "Bouquet created successfully";

        if (action.payload?.bouquet) {
          state.bouquets.push(action.payload.bouquet);
        }
      })

      .addCase(createBouquetThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error = action.payload || "Bouquet creation failed";
      });

    // GET ALL BOUQUETS

 builder
  .addCase(AllBouquetsThunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  })

  .addCase(AllBouquetsThunk.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;

    state.bouquets = action.payload?.bouquets || [];

    state.currentPage =
      action.payload?.currentPage || 1;

    state.totalPages =
      action.payload?.totalPages || 0;

    state.totalBouquets =
      action.payload?.totalBouquets || 0;
  })

  .addCase(AllBouquetsThunk.rejected, (state, action) => {
    state.loading = false;

    state.error =
      action.payload || "Failed to fetch bouquets";
  });

    // GET SINGLE BOUQUET

    builder
      .addCase(SingleBouquetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(SingleBouquetThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.singleBouquet =
          action.payload?.bouquet || action.payload?.data || action.payload;
      })

      .addCase(SingleBouquetThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch single bouquet";
      });

    // UPDATE BOUQUET

    builder
      .addCase(updateBouquetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateBouquetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message || "Bouquet updated successfully";

        const updatedBouquet = action.payload?.bouquet || action.payload?.data;

        if (updatedBouquet?._id) {
          const index = state.bouquets.findIndex(
            (item) => item._id === updatedBouquet._id,
          );

          if (index !== -1) {
            state.bouquets[index] = updatedBouquet;
          }
        }
      })

      .addCase(updateBouquetThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error = action.payload || "Bouquet update failed";
      });

    // DELETE BOUQUET

    builder
      .addCase(deleteBouquetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteBouquetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message || "Bouquet deleted successfully";

        const deletedId = action.meta.arg;

        state.bouquets = state.bouquets.filter(
          (item) => item._id !== deletedId,
        );
      })

      .addCase(deleteBouquetThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Bouquet deletion failed";
      });
      builder

  // ================= HERO BOUQUETS =================

  .addCase(GetHeroBouquetsThunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  })

  .addCase(GetHeroBouquetsThunk.fulfilled, (state, action) => {
    state.loading = false;
    state.heroBouquets = action.payload?.bouquets || [];
  })

  .addCase(GetHeroBouquetsThunk.rejected, (state, action) => {
    state.loading = false;
    state.error =
      action.payload || "Failed to fetch hero bouquets";
  });
  },
});

export const {
  openCreateBouquetPopup,
  closeCreateBouquetPopup,
  openEditBouquetPopup,
  closeEditBouquetPopup,
  openDeleteBouquetPopup,
  closeDeleteBouquetPopup,
} = BouquestSlice.actions;

const BouquetReducer = BouquestSlice.reducer;
export default BouquetReducer;

import { createSlice } from "@reduxjs/toolkit";

import {
  CreateFlowerThunk,
  DeleteFlowerThunk,
  UpdateFlowerThunk,
  GetAllFlowersThunk,
  GetSingleFlowerThunk,
  SearchFlowerThunk,
  getAllAvailableFlowersThunks,
} from "./FlowerApi.js";

const initialState = {
  // All flowers
  flowers: [],
  allAvailableFlowers: [],

  // Single flower
  showCreateFlowerPopup: false,
  showEditFlowerPopup: false,
  singleFlower: null,
  showDeleteFlowerPopup: false,
  id: null,

  // Search results
  searchResult: {
    flowers: [],
    bouquets: [],
  },

  // Search information
  searchQuery: "",
  resultType: "all",

  // API state
  loading: false,
  error: null,
  success: false,
  message: "",
};

const flowerSlice = createSlice({
  name: "flower",

  initialState,

  reducers: {
    openCreateFlowerPopup: (state) => {
      state.showCreateFlowerPopup = true;
    },

    closeCreateFlowerPopup: (state) => {
      state.showCreateFlowerPopup = false;
    },

    openEditFlowerPopup: (state, action) => {
      state.showEditFlowerPopup = true;
      state.singleFlower = action.payload;
    },

    closeEditFlowerPopup: (state) => {
      state.showEditFlowerPopup = false;
      state.singleFlower = null;
    },
    openDeleteFlowerPopup: (state, action) => {
      state.id = action.payload;

      state.showDeleteFlowerPopup = true;
    },

    closeDeleteFlowerPopup: (state) => {
      state.showDeleteFlowerPopup = false;
      state.id = null;
    },
  },

  extraReducers: (builder) => {
    // =====================================================
    // CREATE FLOWER
    // =====================================================

    builder
      .addCase(CreateFlowerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(CreateFlowerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.message =
          action.payload?.message || "Flower created successfully";

        const newFlower = action.payload?.flower;

        if (newFlower) {
          state.flowers.push(newFlower);
        }
      })

      .addCase(CreateFlowerThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error = action.payload || "Flower creation failed";
      });

    // =====================================================
    // DELETE FLOWER
    // =====================================================

    builder
      .addCase(DeleteFlowerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(DeleteFlowerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.message =
          action.payload?.message || "Flower deleted successfully";

        const deletedId = action.meta.arg;

        state.flowers = state.flowers.filter(
          (flower) => flower._id !== deletedId,
        );

        // Agar currently single flower open hai
        if (state.singleFlower?._id === deletedId) {
          state.singleFlower = null;
        }
      })

      .addCase(DeleteFlowerThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error = action.payload || "Flower deletion failed";
      });

    // =====================================================
    // UPDATE FLOWER
    // =====================================================

    builder
      .addCase(UpdateFlowerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(UpdateFlowerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.message =
          action.payload?.message || "Flower updated successfully";

        const updatedFlower = action.payload?.flower;

        if (updatedFlower) {
          const index = state.flowers.findIndex(
            (flower) => flower._id === updatedFlower._id,
          );

          if (index !== -1) {
            state.flowers[index] = updatedFlower;
          }

          // Update single flower also
          if (state.singleFlower?._id === updatedFlower._id) {
            state.singleFlower = updatedFlower;
          }
        }
      })

      .addCase(UpdateFlowerThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error = action.payload || "Flower update failed";
      });

    // =====================================================
    // GET ALL FLOWERS
    // =====================================================

    builder
      .addCase(GetAllFlowersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllFlowersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        /*
          Backend response:

          {
            success: true,
            flowers: [],
            currentPage: 1,
            totalPages: 5,
            totalFlowers: 50
          }
        */

        if (Array.isArray(action.payload?.flowers)) {
          state.flowers = action.payload.flowers;
        }

        // Safety: agar direct array aaye
        else if (Array.isArray(action.payload)) {
          state.flowers = action.payload;
        }
      })

      .addCase(GetAllFlowersThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch flowers";
      });

    // =====================================================
    // GET SINGLE FLOWER
    // =====================================================

    builder
      .addCase(GetSingleFlowerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetSingleFlowerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        /*
          Backend:

          {
            success: true,
            message: "...",
            flower: {...}
          }
        */

        state.singleFlower = action.payload?.flower || action.payload || null;
      })

      .addCase(GetSingleFlowerThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch flower";
      });

    // =====================================================
    // GLOBAL SEARCH
    // =====================================================

    builder
      .addCase(SearchFlowerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(SearchFlowerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        /*
          Backend response:

          {
            success: true,
            query: "red bouquet",
            resultType: "bouquet",
            flowers: [],
            bouquets: []
          }
        */

        state.searchQuery = action.payload?.query || "";

        state.resultType = action.payload?.resultType || "all";

        state.searchResult = {
          flowers: Array.isArray(action.payload?.flowers)
            ? action.payload.flowers
            : [],

          bouquets: Array.isArray(action.payload?.bouquets)
            ? action.payload.bouquets
            : [],
        };
      })

      .addCase(SearchFlowerThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Search failed";

        state.searchResult = {
          flowers: [],
          bouquets: [],
        };
      });
    builder.addCase(getAllAvailableFlowersThunks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAllAvailableFlowersThunks.fulfilled, (state, action) => {
     
      
      state.loading = false;
      state.allAvailableFlowers = action.payload.flowers;
    });

    builder.addCase(getAllAvailableFlowersThunks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  openCreateFlowerPopup,
  openEditFlowerPopup,
  closeCreateFlowerPopup,
  closeEditFlowerPopup,
  openDeleteFlowerPopup,
  closeDeleteFlowerPopup,
} = flowerSlice.actions;

const flowerReducer = flowerSlice.reducer;
export default flowerReducer;

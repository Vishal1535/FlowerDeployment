import { createSlice } from "@reduxjs/toolkit";

import {
  AddFlowerInBoxThunk,
  GetAllFlowerInBoxThunk,
  GetSingleFlowerInBoxThunk,
  UpdateFlowerInBoxThunk,
  DeleteFlowerInBoxThunk,
} from "./FlowerInBoxApi.js";

const initialState = {
  flowersInBox: [],
  singleFlowerInBox: null,

  loading: false,
  error: null,
  success: false,
  message: "",

  
  // POPUPS
  

  isCreateFlowerInBoxPopupOpen: false,
  isEditFlowerInBoxPopupOpen: false,
  isDeleteFlowerInBoxPopupOpen: false,

  selectedFlowerInBox: null,

  isShowFlowerInBox: false,
};

const FlowerInBoxSlice = createSlice({
  name: "flowerInBox",

  initialState,

  reducers: {
    
    // SHOW / HIDE
    

    showFlowerInBox: (state) => {
      state.isShowFlowerInBox = true;
    },

    hideFlowerInBox: (state) => {
      state.isShowFlowerInBox = false;
    },

    
    // CREATE POPUP
    

    openCreateFlowerInBoxPopup: (state) => {
      state.isCreateFlowerInBoxPopupOpen = true;
    },

    closeCreateFlowerInBoxPopup: (state) => {
      state.isCreateFlowerInBoxPopupOpen = false;
    },

    
    // EDIT POPUP
    

    openEditFlowerInBoxPopup: (state, action) => {
      state.isEditFlowerInBoxPopupOpen = true;
      state.selectedFlowerInBox = action.payload;
    },

    closeEditFlowerInBoxPopup: (state) => {
      state.isEditFlowerInBoxPopupOpen = false;
      state.selectedFlowerInBox = null;
    },

    
    // DELETE POPUP
    

    openDeleteFlowerInBoxPopup: (state, action) => {
      state.isDeleteFlowerInBoxPopupOpen = true;
      state.selectedFlowerInBox = action.payload;
    },

    closeDeleteFlowerInBoxPopup: (state) => {
      state.isDeleteFlowerInBoxPopupOpen = false;
      state.selectedFlowerInBox = null;
    },

    
    // CLEAR ERROR
    

    clearFlowerInBoxError: (state) => {
      state.error = null;
    },

    
    // CLEAR MESSAGE
    

    clearFlowerInBoxMessage: (state) => {
      state.message = "";
    },

    
    // CLEAR SUCCESS
    

    clearFlowerInBoxSuccess: (state) => {
      state.success = false;
    },

    
    // CLEAR SELECTED
    

    clearSelectedFlowerInBox: (state) => {
      state.selectedFlowerInBox = null;
    },
  },

  extraReducers: (builder) => {
    
    // ADD FLOWER IN BOX
    

    builder
      .addCase(AddFlowerInBoxThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(AddFlowerInBoxThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (action.payload.flowerInBox) {
          state.flowersInBox.unshift(
            action.payload.flowerInBox
          );
        }

        state.isCreateFlowerInBoxPopupOpen = false;
      })

      .addCase(AddFlowerInBoxThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    
    // GET ALL FLOWER IN BOX
    

    builder
      .addCase(GetAllFlowerInBoxThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllFlowerInBoxThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.flowersInBox =
          action.payload.flowersInBox || [];
      })

      .addCase(GetAllFlowerInBoxThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    
    // GET SINGLE FLOWER IN BOX
    

    builder
      .addCase(GetSingleFlowerInBoxThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        GetSingleFlowerInBoxThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          state.singleFlowerInBox =
            action.payload.flowerInBox || null;
        }
      )

      .addCase(
        GetSingleFlowerInBoxThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.singleFlowerInBox = null;
        }
      );

    
    // UPDATE FLOWER IN BOX
    

    builder
      .addCase(UpdateFlowerInBoxThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        UpdateFlowerInBoxThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message;

          const updatedFlowerInBox =
            action.payload.flowerInBox;

          if (updatedFlowerInBox) {
            const index =
              state.flowersInBox.findIndex(
                (item) =>
                  item._id === updatedFlowerInBox._id
              );

            if (index !== -1) {
              state.flowersInBox[index] =
                updatedFlowerInBox;
            }

            if (
              state.singleFlowerInBox?._id ===
              updatedFlowerInBox._id
            ) {
              state.singleFlowerInBox =
                updatedFlowerInBox;
            }

            if (
              state.selectedFlowerInBox?._id ===
              updatedFlowerInBox._id
            ) {
              state.selectedFlowerInBox =
                updatedFlowerInBox;
            }
          }

          state.isEditFlowerInBoxPopupOpen = false;
          state.selectedFlowerInBox = null;
        }
      )

      .addCase(
        UpdateFlowerInBoxThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      );

    
    // DELETE FLOWER IN BOX
    

    builder
      .addCase(DeleteFlowerInBoxThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        DeleteFlowerInBoxThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message;

          const deletedId = action.meta.arg;

          state.flowersInBox =
            state.flowersInBox.filter(
              (item) => item._id !== deletedId
            );

          if (
            state.singleFlowerInBox?._id ===
            deletedId
          ) {
            state.singleFlowerInBox = null;
          }

          if (
            state.selectedFlowerInBox?._id ===
            deletedId
          ) {
            state.selectedFlowerInBox = null;
          }

          state.isDeleteFlowerInBoxPopupOpen = false;
        }
      )

      .addCase(
        DeleteFlowerInBoxThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      );
  },
});


// EXPORT ACTIONS


export const {
  showFlowerInBox,
  hideFlowerInBox,

  openCreateFlowerInBoxPopup,
  closeCreateFlowerInBoxPopup,

  openEditFlowerInBoxPopup,
  closeEditFlowerInBoxPopup,

  openDeleteFlowerInBoxPopup,
  closeDeleteFlowerInBoxPopup,

  clearFlowerInBoxError,
  clearFlowerInBoxMessage,
  clearFlowerInBoxSuccess,

  clearSelectedFlowerInBox,
} = FlowerInBoxSlice.actions;


// REDUCER


const FlowerInBoxReducer =
  FlowerInBoxSlice.reducer;

export default FlowerInBoxReducer;
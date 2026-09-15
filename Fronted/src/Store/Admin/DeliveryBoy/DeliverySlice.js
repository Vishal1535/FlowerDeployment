import { createSlice } from "@reduxjs/toolkit";

import {
  createDeliveryBoyThunk,
  getAllDeliveryBoysThunk,
  getSingleDeliveryBoyThunk,
  updateDeliveryBoyThunk,
  updateDeliveryBoyAvailabilityThunk,
  deleteDeliveryBoyThunk,
} from "./DeliveryApi";

const initialState = {
  deliveryBoys: [],
  selectedDeliveryBoy: null,

  // Delete ke liye selected ID
  selectedDeliveryBoyId: null,

  loading: false,
  error: null,

  success: false,
  message: "",

  // =====================================================
  // DELIVERY BOY POPUPS
  // =====================================================

  isCreateDeliveryPopupOpen: false,
  isDeleteDeliveryPopupOpen: false,
  isEditDeliveryPopupOpen: false,
};

const deliveryBoyManagementSlice = createSlice({
  name: "deliveryBoyManagement",

  initialState,

  reducers: {
    // =====================================================
    // CREATE POPUP
    // =====================================================

    openCreateDeliveryPopup: (state) => {
      state.isCreateDeliveryPopupOpen = true;
      state.error = null;
    },

    closeCreateDeliveryPopup: (state) => {
      state.isCreateDeliveryPopupOpen = false;
      state.error = null;
    },

    // =====================================================
    // DELETE POPUP
    // =====================================================

    openDeleteDeliveryPopup: (state, action) => {
      state.isDeleteDeliveryPopupOpen = true;

      // Sirf ID store karo
      state.selectedDeliveryBoyId = action.payload;

      state.error = null;
    },

    closeDeleteDeliveryPopup: (state) => {
      state.isDeleteDeliveryPopupOpen = false;
      state.selectedDeliveryBoyId = null;
      state.error = null;
    },

    // =====================================================
    // EDIT POPUP
    // =====================================================

    openEditDeliveryPopup: (state) => {
      state.isEditDeliveryPopupOpen = true;
      state.error = null;
    },

    closeEditDeliveryPopup: (state) => {
      state.isEditDeliveryPopupOpen = false;
      state.error = null;

      // selectedDeliveryBoy yahan null nahi kar rahe
      // taaki popup close/open flow mein data safely rahe
    },

    // =====================================================
    // CLEAR ERROR
    // =====================================================

    clearDeliveryBoyError: (state) => {
      state.error = null;
    },

    // =====================================================
    // CLEAR MESSAGE
    // =====================================================

    clearDeliveryBoyMessage: (state) => {
      state.message = "";
      state.success = false;
    },

    // =====================================================
    // CLEAR SELECTED DELIVERY BOY
    // =====================================================

    clearSelectedDeliveryBoy: (state) => {
      state.selectedDeliveryBoy = null;
    },
  },

  extraReducers: (builder) => {
    // =====================================================
    // CREATE DELIVERY BOY
    // =====================================================

    builder
      .addCase(createDeliveryBoyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createDeliveryBoyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message ||
          "Delivery boy created successfully";

        if (action.payload?.deliveryBoy) {
          state.deliveryBoys.unshift(
            action.payload.deliveryBoy
          );
        }

        // Close create popup
        state.isCreateDeliveryPopupOpen = false;
      })

      .addCase(createDeliveryBoyThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed to create delivery boy";
      });

    // =====================================================
    // GET ALL DELIVERY BOYS
    // =====================================================

    builder
      .addCase(getAllDeliveryBoysThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllDeliveryBoysThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.deliveryBoys =
          action.payload?.deliveryBoys || [];

        state.message =
          action.payload?.message || "";
      })

      .addCase(getAllDeliveryBoysThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed to fetch delivery boys";
      });

    // =====================================================
    // GET SINGLE DELIVERY BOY
    // =====================================================

    builder
      .addCase(getSingleDeliveryBoyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSingleDeliveryBoyThunk.fulfilled, (state, action) => {
        state.loading = false;

        // Backend se complete delivery boy
        // selectedDeliveryBoy mein store hoga
        state.selectedDeliveryBoy =
          action.payload?.deliveryBoy || null;

        state.message =
          action.payload?.message || "";
      })

      .addCase(getSingleDeliveryBoyThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed to fetch delivery boy";
      });

    // =====================================================
    // UPDATE DELIVERY BOY
    // =====================================================

    builder
      .addCase(updateDeliveryBoyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateDeliveryBoyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message ||
          "Delivery boy updated successfully";

        const updatedDeliveryBoy =
          action.payload?.deliveryBoy;

        if (updatedDeliveryBoy) {
          // Update list
          const index =
            state.deliveryBoys.findIndex(
              (boy) =>
                boy._id === updatedDeliveryBoy._id
            );

          if (index !== -1) {
            state.deliveryBoys[index] =
              updatedDeliveryBoy;
          }

          // Update selected delivery boy
          state.selectedDeliveryBoy =
            updatedDeliveryBoy;
        }

        // Close edit popup
        state.isEditDeliveryPopupOpen = false;

        // Selected data clear kar sakte ho
        state.selectedDeliveryBoy = null;
      })

      .addCase(updateDeliveryBoyThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed to update delivery boy";
      });

    // =====================================================
    // UPDATE AVAILABILITY
    // =====================================================

    builder
      .addCase(
        updateDeliveryBoyAvailabilityThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        updateDeliveryBoyAvailabilityThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Availability updated successfully";

          const id = action.meta.arg.id;

          const deliveryBoy =
            state.deliveryBoys.find(
              (boy) => boy._id === id
            );

          if (deliveryBoy) {
            deliveryBoy.isAvailable =
              action.payload?.isAvailable;
          }

          if (
            state.selectedDeliveryBoy?._id === id
          ) {
            state.selectedDeliveryBoy.isAvailable =
              action.payload?.isAvailable;
          }
        }
      )

      .addCase(
        updateDeliveryBoyAvailabilityThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to update availability";
        }
      );

    // =====================================================
    // DELETE DELIVERY BOY
    // =====================================================

    builder
      .addCase(deleteDeliveryBoyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(deleteDeliveryBoyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message ||
          "Delivery boy deleted successfully";

        const id = action.meta.arg;

        // List se remove
        state.deliveryBoys =
          state.deliveryBoys.filter(
            (boy) => boy._id !== id
          );

        // Selected data clear
        if (
          state.selectedDeliveryBoy?._id === id
        ) {
          state.selectedDeliveryBoy = null;
        }

        // Selected ID clear
        if (state.selectedDeliveryBoyId === id) {
          state.selectedDeliveryBoyId = null;
        }

        // Close delete popup
        state.isDeleteDeliveryPopupOpen = false;
      })

      .addCase(deleteDeliveryBoyThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed to delete delivery boy";
      });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  openCreateDeliveryPopup,
  closeCreateDeliveryPopup,

  openDeleteDeliveryPopup,
  closeDeleteDeliveryPopup,

  openEditDeliveryPopup,
  closeEditDeliveryPopup,

  clearDeliveryBoyError,
  clearDeliveryBoyMessage,
  clearSelectedDeliveryBoy,
} = deliveryBoyManagementSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const DeliveryBoyManagementReducer =
  deliveryBoyManagementSlice.reducer;

export default DeliveryBoyManagementReducer;
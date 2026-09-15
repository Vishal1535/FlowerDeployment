import { createSlice } from "@reduxjs/toolkit";

import {
  assignOrderToDeliveryBoyThunk,
  unassignOrderFromDeliveryBoyThunk,
  reassignOrderThunk,
  getOrderAssignmentThunk,
} from "./AssignOrderApi";

const initialState = {
  assignment: null,

  loading: false,
  error: null,
  success: false,
  message: "",
};

const assignOrderSlice = createSlice({
  name: "assignOrder",

  initialState,

  reducers: {
    clearAssignOrderError: (state) => {
      state.error = null;
    },

    clearAssignOrderMessage: (state) => {
      state.message = "";
      state.success = false;
    },

    clearAssignment: (state) => {
      state.assignment = null;
    },

    resetAssignOrderState: (state) => {
      state.assignment = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    // =====================================================
    // ASSIGN
    // =====================================================

    builder
      .addCase(assignOrderToDeliveryBoyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = "";
      })

      .addCase(
        assignOrderToDeliveryBoyThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Order assigned to delivery boy successfully";

          state.assignment = action.payload || null;
        }
      )

      .addCase(
        assignOrderToDeliveryBoyThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to assign order to delivery boy";
        }
      );

    // =====================================================
    // UNASSIGN
    // =====================================================

    builder
      .addCase(unassignOrderFromDeliveryBoyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        unassignOrderFromDeliveryBoyThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Order unassigned from delivery boy successfully";

          state.assignment = null;
        }
      )

      .addCase(
        unassignOrderFromDeliveryBoyThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to unassign order from delivery boy";
        }
      );

    // =====================================================
    // REASSIGN
    // =====================================================

    builder
      .addCase(reassignOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        reassignOrderThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Order reassigned successfully";

          state.assignment = action.payload || null;
        }
      )

      .addCase(
        reassignOrderThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to reassign order";
        }
      );

    // =====================================================
    // GET ASSIGNMENT DETAILS
    // =====================================================

    builder
      .addCase(getOrderAssignmentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getOrderAssignmentThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.message =
            action.payload?.message || "";

          state.assignment =
            action.payload?.assignment ||
            action.payload ||
            null;
        }
      )

      .addCase(
        getOrderAssignmentThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to get order assignment details";
        }
      );
  },
});

export const {
  clearAssignOrderError,
  clearAssignOrderMessage,
  clearAssignment,
  resetAssignOrderState,
} = assignOrderSlice.actions;

export default assignOrderSlice.reducer;
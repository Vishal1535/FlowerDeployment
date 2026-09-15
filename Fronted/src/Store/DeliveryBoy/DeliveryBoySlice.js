import { createSlice } from "@reduxjs/toolkit";

import {
  getMyDeliveryBoyProfileThunk,
  getMyAssignedOrdersThunk,
  getMySingleOrderThunk,
  acceptOrderThunk,
  updateMyLocationThunk,
  markOrderDeliveredThunk,
  getMyDeliveryStatsThunk,
} from "./DeliveryBoyApi";

const initialState = {
  // =====================================================
  // DELIVERY BOY PROFILE
  // =====================================================

  profile: null,

  // =====================================================
  // ASSIGNED ORDERS
  // =====================================================

  assignedOrders: [],

  // =====================================================
  // SINGLE ORDER
  // =====================================================

  selectedOrder: null,

  // =====================================================
  // DELIVERY STATS
  // =====================================================

  stats: null,

  // =====================================================
  // COMMON STATE
  // =====================================================

  loading: false,
  error: null,
  success: false,
  message: "",
};

const deliveryBoySlice = createSlice({
  name: "deliveryBoy",
  initialState,

  reducers: {
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
    // CLEAR SELECTED ORDER
    // =====================================================

    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },

    // =====================================================
    // RESET STATE
    // =====================================================

    resetDeliveryBoyState: (state) => {
      state.profile = null;
      state.assignedOrders = [];
      state.selectedOrder = null;
      state.stats = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {

    // =====================================================
    // GET MY PROFILE
    // =====================================================

    builder

      .addCase(
        getMyDeliveryBoyProfileThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getMyDeliveryBoyProfileThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.profile =
            action.payload?.deliveryBoy ||
            action.payload?.profile ||
            action.payload;

          state.message =
            action.payload?.message || "";
        }
      )

      .addCase(
        getMyDeliveryBoyProfileThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch delivery boy profile";
        }
      );

    // =====================================================
    // GET MY ASSIGNED ORDERS
    // =====================================================

    builder

      .addCase(
        getMyAssignedOrdersThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getMyAssignedOrdersThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.assignedOrders =
            action.payload?.orders ||
            action.payload?.assignedOrders ||
            [];

          state.message =
            action.payload?.message || "";
        }
      )

      .addCase(
        getMyAssignedOrdersThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch assigned orders";
        }
      );

    // =====================================================
    // GET MY SINGLE ORDER
    // =====================================================

    builder

      .addCase(
        getMySingleOrderThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getMySingleOrderThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.selectedOrder =
            action.payload?.order ||
            action.payload;

          state.message =
            action.payload?.message || "";
        }
      )

      .addCase(
        getMySingleOrderThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch order";
        }
      );

    // =====================================================
    // ACCEPT ORDER
    // =====================================================

    builder

      .addCase(
        acceptOrderThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        acceptOrderThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Order accepted successfully";

          // Update selected order if available
          if (action.payload?.order) {
            state.selectedOrder =
              action.payload.order;
          }

          // Update order inside assigned orders
          const updatedOrder =
            action.payload?.order;

          if (updatedOrder?._id) {
            state.assignedOrders =
              state.assignedOrders.map((order) =>
                order._id === updatedOrder._id
                  ? {
                      ...order,
                      ...updatedOrder,
                    }
                  : order
              );
          }
        }
      )

      .addCase(
        acceptOrderThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to accept order";
        }
      );

    // =====================================================
    // UPDATE MY LOCATION
    // =====================================================

    builder

      .addCase(
        updateMyLocationThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        updateMyLocationThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Location updated successfully";

          // Profile location update
          if (
            action.payload?.location &&
            state.profile
          ) {
            state.profile.location =
              action.payload.location;
          }
        }
      )

      .addCase(
        updateMyLocationThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to update location";
        }
      );

    // =====================================================
    // MARK ORDER DELIVERED
    // =====================================================

    builder

      .addCase(
        markOrderDeliveredThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        markOrderDeliveredThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Order marked as delivered successfully";

          // Update selected order
          if (action.payload?.order) {
            state.selectedOrder =
              action.payload.order;
          }

          // Update order inside assigned orders
          const updatedOrder =
            action.payload?.order;

          if (updatedOrder?._id) {
            state.assignedOrders =
              state.assignedOrders.map((order) =>
                order._id === updatedOrder._id
                  ? {
                      ...order,
                      ...updatedOrder,
                    }
                  : order
              );
          }
        }
      )

      .addCase(
        markOrderDeliveredThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to mark order delivered";
        }
      );

    // =====================================================
    // GET MY DELIVERY STATS
    // =====================================================

    builder

      .addCase(
        getMyDeliveryStatsThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getMyDeliveryStatsThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.stats =
            action.payload?.stats ||
            action.payload;

          state.message =
            action.payload?.message || "";
        }
      )

      .addCase(
        getMyDeliveryStatsThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch delivery statistics";
        }
      );
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearDeliveryBoyError,
  clearDeliveryBoyMessage,
  clearSelectedOrder,
  resetDeliveryBoyState,
} = deliveryBoySlice.actions;

// =====================================================
// REDUCER
// =====================================================

const DeliveryBoyReducer =
  deliveryBoySlice.reducer;

export default DeliveryBoyReducer;
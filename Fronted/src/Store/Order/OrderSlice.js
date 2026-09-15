import { createSlice } from "@reduxjs/toolkit";

import {
  CreateOrderThunk,
  GetMyOrdersThunk,
  CancelOrderThunk,
  ChangeOrderStatusThunk,
  GetAllOrdersThunk,
} from "./OrderApi";

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  orders: [],
  currentOrder: null,

  loading: false,
  error: null,

  orderCreated: false,

  // ===================================================
  // CANCEL ORDER POPUP
  // ===================================================

  cancelOrderId: null,
  cancelOrderLoading: false,

  // ===================================================
  // CHANGE STATUS
  // ===================================================

  statusChangingOrderId: null,
};

// =====================================================
// SLICE
// =====================================================

const OrderSlice = createSlice({
  name: "Order",

  initialState,

  reducers: {
    // =================================================
    // CLEAR CURRENT ORDER
    // =================================================

    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },

    // =================================================
    // RESET ORDER CREATED
    // =================================================

    resetOrderCreated: (state) => {
      state.orderCreated = false;
    },

    // =================================================
    // CLEAR ERROR
    // =================================================

    clearOrderError: (state) => {
      state.error = null;
    },

    // =================================================
    // OPEN CANCEL ORDER POPUP
    // =================================================

    openCancelOrderPopup: (state, action) => {
      state.cancelOrderId = action.payload;
      state.cancelOrderLoading = false;
      state.error = null;
    },

    // =================================================
    // CLOSE CANCEL ORDER POPUP
    // =================================================

    closeCancelOrderPopup: (state) => {
      state.cancelOrderId = null;
      state.cancelOrderLoading = false;
    },
  },

  // ===================================================
  // EXTRA REDUCERS
  // ===================================================

  extraReducers: (builder) => {
    // =================================================
    // CREATE ORDER
    // =================================================

    builder.addCase(CreateOrderThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.orderCreated = false;
    });

    builder.addCase(CreateOrderThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      const newOrder = action.payload?.order;

      state.currentOrder = newOrder || null;

      state.orderCreated = true;

      // Latest order beginning mein
      if (newOrder) {
        state.orders.unshift(newOrder);
      }
    });

    builder.addCase(CreateOrderThunk.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload || "Failed to create order";

      state.orderCreated = false;
    });

    // =================================================
    // GET MY ORDERS
    // =================================================

    builder.addCase(GetMyOrdersThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(GetMyOrdersThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      state.orders = action.payload?.orders || [];
    });

    builder.addCase(GetMyOrdersThunk.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload || "Failed to fetch orders";
    });

    // =================================================
    // GET ALL ORDERS
    // OWNER / ADMIN
    // =================================================

    builder.addCase(GetAllOrdersThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(GetAllOrdersThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      state.orders = action.payload?.orders || [];
    });

    builder.addCase(GetAllOrdersThunk.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload || "Failed to fetch all orders";
    });

    // =================================================
    // CANCEL ORDER
    // =================================================

    builder.addCase(CancelOrderThunk.pending, (state) => {
      state.cancelOrderLoading = true;
      state.error = null;
    });

    builder.addCase(CancelOrderThunk.fulfilled, (state, action) => {
      state.cancelOrderLoading = false;
      state.error = null;

      const cancelledOrderId = action.meta.arg;

      // Remove cancelled order
      state.orders = state.orders.filter(
        (order) => order?._id !== cancelledOrderId,
      );

      // Current order clear
      if (state.currentOrder?._id === cancelledOrderId) {
        state.currentOrder = null;
      }

      // Close popup
      state.cancelOrderId = null;
    });

    builder.addCase(CancelOrderThunk.rejected, (state, action) => {
      state.cancelOrderLoading = false;

      state.error = action.payload || "Failed to cancel order";
    });

    // =================================================
    // CHANGE ORDER STATUS
    // =================================================

    builder.addCase(ChangeOrderStatusThunk.pending, (state, action) => {
      state.statusChangingOrderId = action.meta.arg?.orderId;

      state.error = null;
    });

    builder.addCase(ChangeOrderStatusThunk.fulfilled, (state, action) => {
      state.statusChangingOrderId = null;
      state.error = null;

      const updatedOrder = action.payload?.order;

      if (!updatedOrder?._id) {
        return;
      }

      // =============================================
      // UPDATE ORDERS ARRAY
      // =============================================

      const index = state.orders.findIndex(
        (order) => order?._id === updatedOrder._id,
      );

      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }

      // =============================================
      // UPDATE CURRENT ORDER
      // =============================================

      if (state.currentOrder?._id === updatedOrder._id) {
        state.currentOrder = updatedOrder;
      }
    });

    builder.addCase(ChangeOrderStatusThunk.rejected, (state, action) => {
      state.statusChangingOrderId = null;

      state.error = action.payload || "Failed to change order status";
    });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearCurrentOrder,
  resetOrderCreated,
  clearOrderError,
  openCancelOrderPopup,
  closeCancelOrderPopup,
} = OrderSlice.actions;

// =====================================================
// REDUCER
// =====================================================

const OrderReducer = OrderSlice.reducer;

export default OrderReducer;

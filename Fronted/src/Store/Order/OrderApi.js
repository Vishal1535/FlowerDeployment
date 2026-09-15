import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../axiosInstance";

// =====================================================
// CREATE ORDER
// =====================================================

export const CreateOrderThunk = createAsyncThunk(
  "order/createOrder",

  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/orders",
        orderData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to create order"
      );
    }
  }
);

// =====================================================
// GET MY ORDERS
// =====================================================

export const GetMyOrdersThunk = createAsyncThunk(
  "order/getMyOrders",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/orders/my"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch orders"
      );
    }
  }
);

// =====================================================
// CANCEL ORDER
// =====================================================

export const CancelOrderThunk = createAsyncThunk(
  "order/cancelOrder",

  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/orders/cancel/${orderId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to cancel order"
      );
    }
  }
);

// =====================================================
// CHANGE ORDER STATUS
// =====================================================

export const ChangeOrderStatusThunk = createAsyncThunk(
  "order/changeOrderStatus",

  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/orders/status/${orderId}`,
        {
          status,
        }
      );

      return response.data;

    } catch (error) {
      console.error(
        "Change Order Status API Error:",
        error?.response?.data || error.message
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to change order status"
      );
    }
  }
);
// =====================================================
// GET ALL ORDERS - OWNER / ADMIN
// =====================================================

export const GetAllOrdersThunk = createAsyncThunk(
  "order/getAllOrders",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/all-orders"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch all orders"
      );
    }
  }
);


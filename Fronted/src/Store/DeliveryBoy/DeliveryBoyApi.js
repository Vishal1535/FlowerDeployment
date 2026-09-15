import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// =====================================================
// GET MY DELIVERY BOY PROFILE
// =====================================================

export const getMyDeliveryBoyProfileThunk = createAsyncThunk(
  "deliveryBoy/getMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/delivery-boy/my-profile"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch delivery boy profile"
      );
    }
  }
);

// =====================================================
// GET MY ASSIGNED ORDERS
// =====================================================

export const getMyAssignedOrdersThunk = createAsyncThunk(
  "deliveryBoy/getMyAssignedOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/delivery-boy/my-assigned-orders"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch assigned orders"
      );
    }
  }
);

// =====================================================
// GET MY SINGLE ORDER
// =====================================================

export const getMySingleOrderThunk = createAsyncThunk(
  "deliveryBoy/getMySingleOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/delivery-boy/my-order/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch order"
      );
    }
  }
);

// =====================================================
// ACCEPT ORDER
// =====================================================

export const acceptOrderThunk = createAsyncThunk(
  "deliveryBoy/acceptOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/delivery-boy/accept-order/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to accept order"
      );
    }
  }
);

// =====================================================
// UPDATE MY LOCATION
// =====================================================

export const updateMyLocationThunk = createAsyncThunk(
  "deliveryBoy/updateMyLocation",
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/delivery-boy/update-my-location",
        {
          latitude,
          longitude,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update location"
      );
    }
  }
);

// =====================================================
// MARK ORDER DELIVERED
// =====================================================

export const markOrderDeliveredThunk = createAsyncThunk(
  "deliveryBoy/markOrderDelivered",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/delivery-boy/mark-order-delivered/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to mark order delivered"
      );
    }
  }
);

// =====================================================
// GET MY DELIVERY STATS
// =====================================================

export const getMyDeliveryStatsThunk = createAsyncThunk(
  "deliveryBoy/getMyDeliveryStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/delivery-boy/my-delivery-stats"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch delivery statistics"
      );
    }
  }
);
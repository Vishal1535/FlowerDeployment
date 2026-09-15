import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

// =====================================================
// ASSIGN ORDER TO DELIVERY BOY
// =====================================================

export const assignOrderToDeliveryBoyThunk = createAsyncThunk(
  "orderAssignment/assignOrderToDeliveryBoy",
  async ({ orderId, deliveryBoyId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/admin/orders/${orderId}/assign-delivery-boy`,
        {
          deliveryBoyId,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to assign order to delivery boy"
      );
    }
  }
);

// =====================================================
// UNASSIGN ORDER FROM DELIVERY BOY
// =====================================================

export const unassignOrderFromDeliveryBoyThunk = createAsyncThunk(
  "orderAssignment/unassignOrderFromDeliveryBoy",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/orders/${orderId}/unassign-delivery-boy`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to unassign order from delivery boy"
      );
    }
  }
);

// =====================================================
// REASSIGN ORDER TO ANOTHER DELIVERY BOY
// =====================================================

export const reassignOrderThunk = createAsyncThunk(
  "orderAssignment/reassignOrder",
  async ({ orderId, deliveryBoyId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/orders/${orderId}/reassign-delivery-boy`,
        {
          deliveryBoyId,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to reassign order"
      );
    }
  }
);

// =====================================================
// GET ORDER ASSIGNMENT DETAILS
// =====================================================

export const getOrderAssignmentThunk = createAsyncThunk(
  "orderAssignment/getOrderAssignment",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/admin/orders/${orderId}/assignment-details`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get order assignment details"
      );
    }
  }
);
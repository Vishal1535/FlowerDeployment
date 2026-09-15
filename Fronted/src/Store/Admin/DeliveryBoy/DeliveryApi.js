import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";


// CREATE DELIVERY BOY


export const createDeliveryBoyThunk = createAsyncThunk(
  "deliveryBoy/createDeliveryBoy",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/admin/create-delivery-boy",
        data,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create delivery boy",
      );
    }
  },
);


// GET ALL DELIVERY BOYS


export const getAllDeliveryBoysThunk = createAsyncThunk(
  "deliveryBoy/getAllDeliveryBoys",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/admin/get-all-delivery-boys",
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch delivery boys",
      );
    }
  },
);


// GET SINGLE DELIVERY BOY


export const getSingleDeliveryBoyThunk = createAsyncThunk(
  "deliveryBoy/getSingleDeliveryBoy",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/admin/get-single-delivery-boy/${id}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch delivery boy",
      );
    }
  },
);


// UPDATE DELIVERY BOY


export const updateDeliveryBoyThunk = createAsyncThunk(
  "deliveryBoy/updateDeliveryBoy",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/admin/update-delivery-boy/${id}`,
        data,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update delivery boy",
      );
    }
  },
);


// CHANGE DELIVERY BOY AVAILABILITY


export const updateDeliveryBoyAvailabilityThunk = createAsyncThunk(
  "deliveryBoy/updateAvailability",
  async ({ id, isAvailable }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/change-delivery-boy-availability/${id}`,
        {
          isAvailable,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update availability",
      );
    }
  },
);


// DELETE DELIVERY BOY


export const deleteDeliveryBoyThunk = createAsyncThunk(
  "deliveryBoy/deleteDeliveryBoy",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete-delivery-boy/${id}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete delivery boy",
      );
    }
  },
);
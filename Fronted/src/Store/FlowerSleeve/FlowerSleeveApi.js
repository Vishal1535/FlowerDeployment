import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Add Flower In Sleeve
export const AddFlowerInSleeveThunk = createAsyncThunk(
  "flowerInSleeve/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/add-flower-in-sleeve",
        data,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add flower in sleeve",
      );
    }
  },
);

// Get All Flower In Sleeve
export const GetAllFlowerInSleeveThunk = createAsyncThunk(
  "flowerInSleeve/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/get-all-flower-in-sleeve",
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get flowers in sleeve",
      );
    }
  },
);

// Get Single Flower In Sleeve
export const GetSingleFlowerInSleeveThunk = createAsyncThunk(
  "flowerInSleeve/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/get-single-flower-in-sleeve/${id}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get flower in sleeve",
      );
    }
  },
);

// Update Flower In Sleeve
export const UpdateFlowerInSleeveThunk = createAsyncThunk(
  "flowerInSleeve/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/update-flower-in-sleeve/${id}`,
        data,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update flower in sleeve",
      );
    }
  },
);

// Delete Flower In Sleeve
export const DeleteFlowerInSleeveThunk = createAsyncThunk(
  "flowerInSleeve/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/delete-flower-in-sleeve/${id}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete flower in sleeve",
      );
    }
  },
);
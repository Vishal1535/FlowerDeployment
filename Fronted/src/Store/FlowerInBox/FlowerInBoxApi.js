import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance.js";

// Add Flower In Box
export const AddFlowerInBoxThunk = createAsyncThunk(
  "flowerInBox/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/add-flower-in-box",
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add flower in box"
      );
    }
  }
);

// Get All Flower In Box
export const GetAllFlowerInBoxThunk = createAsyncThunk(
  "flowerInBox/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/get-all-flower-in-box"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get flowers in box"
      );
    }
  }
);

// Get Single Flower In Box
export const GetSingleFlowerInBoxThunk = createAsyncThunk(
  "flowerInBox/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/get-single-flower-in-box/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get flower in box"
      );
    }
  }
);

// Update Flower In Box
export const UpdateFlowerInBoxThunk = createAsyncThunk(
  "flowerInBox/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/update-flower-in-box/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update flower in box"
      );
    }
  }
);

// Delete Flower In Box
export const DeleteFlowerInBoxThunk = createAsyncThunk(
  "flowerInBox/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/delete-flower-in-box/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete flower in box"
      );
    }
  }
);
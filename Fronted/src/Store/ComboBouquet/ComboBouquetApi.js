import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Create Combo Bouquet
export const CreateComboBouquetThunk = createAsyncThunk(
  "comboBouquet/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/combo-bouquet/create",
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create combo bouquet"
      );
    }
  }
);

// Update Combo Bouquet
export const UpdateComboBouquetThunk = createAsyncThunk(
  "comboBouquet/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/combo-bouquet/update/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update combo bouquet"
      );
    }
  }
);

// Delete Combo Bouquet
export const DeleteComboBouquetThunk = createAsyncThunk(
  "comboBouquet/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/combo-bouquet/delete/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete combo bouquet"
      );
    }
  }
);

// Get All Combo Bouquets
export const GetAllComboBouquetThunk = createAsyncThunk(
  "comboBouquet/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/combo-bouquet/all"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch combo bouquets"
      );
    }
  }
);

// Get Single Combo Bouquet
export const GetSingleComboBouquetThunk = createAsyncThunk(
  "comboBouquet/single",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/combo-bouquet/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch combo bouquet"
      );
    }
  }
);

// Get Combo Bouquet By Occasion
export const GetComboBouquetByOccasionThunk = createAsyncThunk(
  "comboBouquet/occasion",
  async (occasion, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/combo-bouquet/occasion",
        { occasion }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch combo bouquets by occasion"
      );
    }
  }
);
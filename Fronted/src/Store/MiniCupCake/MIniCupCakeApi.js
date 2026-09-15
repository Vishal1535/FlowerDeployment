import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Create Mini Cupcake
export const CreateMiniCupcakeThunk = createAsyncThunk(
  "miniCupcake/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/mini-cupcake/create",
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create mini cupcake"
      );
    }
  }
);

// Update Mini Cupcake
export const UpdateMiniCupcakeThunk = createAsyncThunk(
  "miniCupcake/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/mini-cupcake/update/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update mini cupcake"
      );
    }
  }
);

// Delete Mini Cupcake
export const DeleteMiniCupcakeThunk = createAsyncThunk(
  "miniCupCake/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/mini-cupcake/delete/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete mini cupcake"
      );
    }
  }
);

// Get All Mini Cupcakes
export const GetAllMiniCupcakeThunk = createAsyncThunk(
  "miniCupCake/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/mini-cupcake/all"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch mini cupcakes"
      );
    }
  }
);

// Get Single Mini Cupcake
export const GetSingleMiniCupcakeThunk = createAsyncThunk(
  "miniCupCake/single",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/mini-cupcake/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch mini cupcake"
      );
    }
  }
);

// Get Mini Cupcakes By Occasion
export const GetMiniCupcakeByOccasionThunk = createAsyncThunk(
  "miniCupCake/occasion",
  async (occasion, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/mini-cupcake/occasion",
        { occasion }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch mini cupcakes by occasion"
      );
    }
  }
);
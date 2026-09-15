import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance.js";

// Create Chocolate
export const CreateChocolateThunk = createAsyncThunk(
  "chocolate/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/chocolate/create",
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create chocolate"
      );
    }
  }
);

// Update Chocolate
export const UpdateChocolateThunk = createAsyncThunk(
  "chocolate/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/chocolate/update/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update chocolate"
      );
    }
  }
);

// Delete Chocolate
export const DeleteChocolateThunk = createAsyncThunk(
  "chocolate/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/chocolate/delete/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete chocolate"
      );
    }
  }
);

// Get All Chocolates
export const GetAllChocolateThunk = createAsyncThunk(
  "chocolate/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/chocolate/all"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch chocolates"
      );
    }
  }
);

// Get Single Chocolate
export const GetSingleChocolateThunk = createAsyncThunk(
  "chocolate/single",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/chocolate/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch chocolate"
      );
    }
  }
);

// Get Chocolates By Occasion
export const GetChocolateByOccasionThunk = createAsyncThunk(
  "chocolate/occasion",
  async (occasion, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/chocolate/occasion",
        { occasion }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch chocolates by occasion"
      );
    }
  }
);
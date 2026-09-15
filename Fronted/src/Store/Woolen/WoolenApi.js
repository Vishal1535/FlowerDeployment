import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance.js";

// Create Woolen
export const CreateWoolenThunk = createAsyncThunk(
  "woolen/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/woolen/create",
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create woolen"
      );
    }
  }
);

// Update Woolen
export const UpdateWoolenThunk = createAsyncThunk(
  "woolen/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/woolen/update/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update woolen"
      );
    }
  }
);

// Delete Woolen
export const DeleteWoolenThunk = createAsyncThunk(
  "woolen/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/woolen/delete/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete woolen"
      );
    }
  }
);

// Get All Woolens
export const GetAllWoolenThunk = createAsyncThunk(
  "woolen/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/woolen/all"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch woolens"
      );
    }
  }
);

// Get Single Woolen
export const GetSingleWoolenThunk = createAsyncThunk(
  "woolen/single",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/woolen/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch woolen"
      );
    }
  }
);

// Get Woolens By Occasion
export const GetWoolenByOccasionThunk = createAsyncThunk(
  "woolen/occasion",
  async (occasion, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/woolen/occasion",
        { occasion }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch woolens by occasion"
      );
    }
  }
);
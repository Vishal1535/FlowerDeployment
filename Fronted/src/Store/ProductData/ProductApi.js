import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// ================= GLOBAL SEARCH =================

export const globalSearchThunk = createAsyncThunk(
  "product/globalSearch",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/search?q=${encodeURIComponent(query)}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Search failed"
      );
    }
  }
);

// ================= OCCASION PRODUCTS =================

export const GetAllProductsByOccasionThunk = createAsyncThunk(
  "product/getAllProductsByOccasion",
  async (occasion, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/occasion/${encodeURIComponent(occasion)}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get products"
      );
    }
  }
);
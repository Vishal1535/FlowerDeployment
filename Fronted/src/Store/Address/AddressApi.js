import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// =====================================================
// ADD ADDRESS
// =====================================================

export const AddAddressThunk = createAsyncThunk(
  "address/add",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/add-address", addressData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address",
      );
    }
  },
);

// =====================================================
// GET LATEST ADDRESS
// =====================================================

export const GetLatestAddressThunk = createAsyncThunk(
  "address/getLatest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/get-latest-address");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch latest address",
      );
    }
  },
);

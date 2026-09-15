import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const CreateFlowerThunk = createAsyncThunk(
  "flower/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/createflower", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Flower creation failed",
      );
    }
  },
);

export const DeleteFlowerThunk = createAsyncThunk(
  "flower/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/deleteflower/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Flower deletion failed",
      );
    }
  },
);


export const UpdateFlowerThunk = createAsyncThunk(
  "flower/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/updateflower/${id}`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Flower update failed",
      );
    }
  },
);

export const GetAllFlowersThunk = createAsyncThunk(
  "flower/getAll",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/getAllFlower?page=${page}&limit=${limit}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch flowers",
      );
    }
  },
);

// ================= GET SINGLE FLOWER =================
export const GetSingleFlowerThunk = createAsyncThunk(
  "flower/single",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/singleflower/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch flower",
      );
    }
  },
);

export const SearchFlowerThunk = createAsyncThunk(
  "flower/search",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/searchFlower?q=${encodeURIComponent(query)}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Search failed");
    }
  },
);
export const getAllAvailableFlowersThunks = createAsyncThunk(
  "flower/getAllAvailableFlowerThunks",
  async (_, { rejectWithValue }) => {
    try {
     
      
      const response = await axiosInstance.get("/all-available");
      
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch flowers"
      );
    }
  }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Create Card
export const CreateCardThunk = createAsyncThunk(
  "card/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/card/create", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create card",
      );
    }
  },
);

// Update Card
export const UpdateCardThunk = createAsyncThunk(
  "card/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/card/update/${id}`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update card",
      );
    }
  },
);

// Delete Card
export const DeleteCardThunk = createAsyncThunk(
  "card/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/card/delete/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete card",
      );
    }
  },
);

// Get All Cards
export const GetAllCardThunk = createAsyncThunk(
  "card/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/card/all");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cards",
      );
    }
  },
);

// Get Single Card
export const GetSingleCardThunk = createAsyncThunk(
  "card/single",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/card/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch card",
      );
    }
  },
);

// Get Cards By Occasion
export const GetCardByOccasionThunk = createAsyncThunk(
  "card/occasion",
  async (occasion, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/card/occasion", { occasion });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cards by occasion",
      );
    }
  },
);

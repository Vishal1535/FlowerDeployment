import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const createBouquetThunk = createAsyncThunk(
  "bouquet/create",

  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/create", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Bouquet creation failed",
      );
    }
  },
);

export const AllBouquetsThunk = createAsyncThunk(
  "bouquet/getAll",

  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/all?page=${page}&limit=${limit}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bouquets",
      );
    }
  },
);

export const SingleBouquetThunk = createAsyncThunk(
  "bouquet/getSingle",

  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/singleBouquet/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bouquet",
      );
    }
  },
);

export const updateBouquetThunk = createAsyncThunk(
  "bouquet/update",

  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/update/${id}`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Bouquet update failed",
      );
    }
  },
);

export const deleteBouquetThunk = createAsyncThunk(
  "bouquet/delete",

  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/delete/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Bouquet deletion failed",
      );
    }
  },
);
export const GetHeroBouquetsThunk = createAsyncThunk(
  "bouquet/heroGet",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/bouquet-hero");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch hero bouquets",
      );
    }
  },
);

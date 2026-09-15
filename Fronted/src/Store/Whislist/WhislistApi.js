
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// 
// GET ALL USER WISHLIST
// 

export const GetAllWishlistThunk = createAsyncThunk(
  "wishlist/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/wishlist");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch wishlist"
      );
    }
  }
);

// 
// FLOWER WISHLIST
// 

export const FlowerWishlistThunk = createAsyncThunk(
  "wishlist/flower",
  async (id, { rejectWithValue }) => {
    try {
      // Add / Remove flower
      await axiosInstance.post(
        `/wishlist/flower/${id}`
      );

      // Get updated wishlist with full objects
      const response = await axiosInstance.get(
        "/wishlist"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update flower wishlist"
      );
    }
  }
);

// 
// BOUQUET WISHLIST
// 

export const BouquetWishlistThunk = createAsyncThunk(
  "wishlist/bouquet",
  async (id, { rejectWithValue }) => {
    try {
      // Add / Remove bouquet
      await axiosInstance.post(
        `/wishlist/bouquet/${id}`
      );

      // Get updated wishlist with full objects
      const response = await axiosInstance.get(
        "/wishlist"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update bouquet wishlist"
      );
    }
  }
);

// 
// COMBO BOUQUET WISHLIST
// 

export const ComboBouquetWishlistThunk = createAsyncThunk(
  "wishlist/comboBouquet",
  async (id, { rejectWithValue }) => {
    try {
      // Add / Remove combo bouquet
      await axiosInstance.post(
        `/wishlist/combo-bouquet/${id}`
      );

      // Get updated wishlist with full objects
      const response = await axiosInstance.get(
        "/wishlist"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update combo bouquet wishlist"
      );
    }
  }
);

// 
// FLOWER IN BOX WISHLIST
// 

export const FlowerInBoxWishlistThunk = createAsyncThunk(
  "wishlist/flowerInBox",
  async (id, { rejectWithValue }) => {
    try {
      // Add / Remove flower in box
      await axiosInstance.post(
        `/wishlist/flower-in-box/${id}`
      );

      // Get updated wishlist with full objects
      const response = await axiosInstance.get(
        "/wishlist"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update flower in box wishlist"
      );
    }
  }
);

// 
// FLOWER IN SLEEVE WISHLIST
// 

export const FlowerInSleeveWishlistThunk = createAsyncThunk(
  "wishlist/flowerInSleeve",
  async (id, { rejectWithValue }) => {
    try {
      // Add / Remove flower in sleeve
      await axiosInstance.post(
        `/wishlist/flower-in-sleeve/${id}`
      );

      // Get updated wishlist with full objects
      const response = await axiosInstance.get(
        "/wishlist"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update flower in sleeve wishlist"
      );
    }
  }
);

// 
// WOOLEN WISHLIST
// 

export const WoolenWishlistThunk = createAsyncThunk(
  "wishlist/woolen",
  async (id, { rejectWithValue }) => {
    try {
      // Add / Remove woolen
      await axiosInstance.post(
        `/wishlist/woolen/${id}`
      );

      // Get updated wishlist with full objects
      const response = await axiosInstance.get(
        "/wishlist"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update woolen wishlist"
      );
    }
  }
);


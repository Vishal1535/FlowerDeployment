import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

// GET ALL BOUQUETS FROM CART

export const GetAllBouquetFromCartThunk = createAsyncThunk(
  "bouquetCart/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/get-all-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch bouquets from cart",
      );
    }
  },
);

// ADD BOUQUET TO CART

export const AddBouquetToCartThunk = createAsyncThunk(
  "bouquetCart/add",
  async (bouquetId, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/add-bouquet-to-cart", {
        bouquetId,
      });

      const response = await axiosInstance.get(
        "/get-all-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add bouquet to cart",
      );
    }
  },
);

// INCREMENT BOUQUET CART

export const IncrementBouquetCartThunk = createAsyncThunk(
  "bouquetCart/increment",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/increment-bouquet-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to increase bouquet quantity",
      );
    }
  },
);

// DECREMENT BOUQUET CART

export const DecrementBouquetCartThunk = createAsyncThunk(
  "bouquetCart/decrement",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/decrement-bouquet-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to decrease bouquet quantity",
      );
    }
  },
);

// DELETE BOUQUET FROM CART

export const DeleteBouquetFromCartThunk = createAsyncThunk(
  "bouquetCart/delete",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/delete-bouquet-from-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove bouquet from cart",
      );
    }
  },
);


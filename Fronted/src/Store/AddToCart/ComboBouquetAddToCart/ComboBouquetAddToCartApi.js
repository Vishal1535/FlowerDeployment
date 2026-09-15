import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

// GET ALL COMBO BOUQUETS FROM CART

export const GetAllComboBouquetFromCartThunk = createAsyncThunk(
  "comboBouquetCart/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/get-all-combo-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch combo bouquets from cart",
      );
    }
  },
);

// ADD COMBO BOUQUET TO CART

export const AddComboBouquetToCartThunk = createAsyncThunk(
  "comboBouquetCart/add",
  async (comboBouquetId, { rejectWithValue }) => {
    try {
      await axiosInstance.post(
        "/add-combo-bouquet-to-cart",
        {
          comboBouquetId,
        }
      );

      const response = await axiosInstance.get(
        "/get-all-combo-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add combo bouquet to cart",
      );
    }
  },
);

// INCREMENT COMBO BOUQUET CART

export const IncrementComboBouquetCartThunk = createAsyncThunk(
  "comboBouquetCart/increment",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/increment-combo-bouquet-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-combo-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to increase combo bouquet quantity",
      );
    }
  },
);

// DECREMENT COMBO BOUQUET CART

export const DecrementComboBouquetCartThunk = createAsyncThunk(
  "comboBouquetCart/decrement",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/decrement-combo-bouquet-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-combo-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to decrease combo bouquet quantity",
      );
    }
  },
);

// DELETE COMBO BOUQUET FROM CART

export const DeleteComboBouquetFromCartThunk = createAsyncThunk(
  "comboBouquetCart/delete",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/delete-combo-bouquet-from-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-combo-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove combo bouquet from cart",
      );
    }
  },
);
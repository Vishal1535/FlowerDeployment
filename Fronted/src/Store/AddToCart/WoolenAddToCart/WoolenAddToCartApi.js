import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

// GET ALL WOOLEN BOUQUETS FROM CART

export const GetAllWoolenBouquetFromCartThunk = createAsyncThunk(
  "woolenBouquetCart/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/get-all-woolen-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch woolen bouquets from cart",
      );
    }
  },
);

// ADD WOOLEN BOUQUET TO CART

export const AddWoolenBouquetToCartThunk = createAsyncThunk(
  "woolenBouquetCart/add",
  async (woolenBouquetId, { rejectWithValue }) => {
    try {
      await axiosInstance.post(
        "/add-woolen-bouquet-to-cart",
        {
          woolenBouquetId,
        }
      );

      const response = await axiosInstance.get(
        "/get-all-woolen-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add woolen bouquet to cart",
      );
    }
  },
);

// INCREMENT WOOLEN BOUQUET CART

export const IncrementWoolenBouquetCartThunk = createAsyncThunk(
  "woolenBouquetCart/increment",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/increment-woolen-bouquet-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-woolen-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to increase woolen bouquet quantity",
      );
    }
  },
);

// DECREMENT WOOLEN BOUQUET CART

export const DecrementWoolenBouquetCartThunk = createAsyncThunk(
  "woolenBouquetCart/decrement",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/decrement-woolen-bouquet-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-woolen-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to decrease woolen bouquet quantity",
      );
    }
  },
);

// DELETE WOOLEN BOUQUET FROM CART

export const DeleteWoolenBouquetFromCartThunk = createAsyncThunk(
  "woolenBouquetCart/delete",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/delete-woolen-bouquet-from-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-woolen-bouquet-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove woolen bouquet from cart",
      );
    }
  },
);
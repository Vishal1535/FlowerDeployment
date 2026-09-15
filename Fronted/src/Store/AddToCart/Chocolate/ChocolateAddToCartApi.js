import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

// ==========================================
// GET ALL CHOCOLATES FROM CART
// ==========================================

export const GetAllChocolateFromCartThunk = createAsyncThunk(
  "chocolateCart/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/get-all-chocolate-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch chocolates from cart"
      );
    }
  }
);

// ==========================================
// ADD CHOCOLATE TO CART
// ==========================================

export const AddChocolateToCartThunk = createAsyncThunk(
  "chocolateCart/add",
  async (chocolateId, { rejectWithValue }) => {
    try {
      await axiosInstance.post(
        "/add-chocolate-to-cart",
        {
          chocolateId,
        }
      );

      const response = await axiosInstance.get(
        "/get-all-chocolate-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add chocolate to cart"
      );
    }
  }
);

// ==========================================
// INCREMENT CHOCOLATE CART
// ==========================================

export const IncrementChocolateCartThunk = createAsyncThunk(
  "chocolateCart/increment",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/increment-chocolate-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-chocolate-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to increase chocolate quantity"
      );
    }
  }
);

// ==========================================
// DECREMENT CHOCOLATE CART
// ==========================================

export const DecrementChocolateCartThunk = createAsyncThunk(
  "chocolateCart/decrement",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/decrement-chocolate-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-chocolate-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to decrease chocolate quantity"
      );
    }
  }
);

// ==========================================
// DELETE CHOCOLATE FROM CART
// ==========================================

export const DeleteChocolateFromCartThunk = createAsyncThunk(
  "chocolateCart/delete",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/delete-chocolate-from-cart/${cartId}`
      );

      const response = await axiosInstance.get(
        "/get-all-chocolate-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove chocolate from cart"
      );
    }
  }
);
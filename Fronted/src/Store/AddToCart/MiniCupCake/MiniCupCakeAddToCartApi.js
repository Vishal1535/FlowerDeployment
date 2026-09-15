
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

// ==========================================
// GET ALL MINI CUPCAKES FROM CART
// ==========================================

export const GetAllMiniCupcakeFromCartThunk =
  createAsyncThunk(
    "miniCupcakeCart/getAll",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(
          "/get-all-mini-cupcake-from-cart"
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch mini cupcakes from cart"
        );
      }
    }
  );

// ==========================================
// ADD MINI CUPCAKE TO CART
// ==========================================

export const AddMiniCupcakeToCartThunk =
  createAsyncThunk(
    "miniCupcakeCart/add",
    async (miniCupcakeId, { rejectWithValue }) => {
      try {
        await axiosInstance.post(
          "/add-mini-cupcake-to-cart",
          {
            miniCupcakeId,
          }
        );

        const response = await axiosInstance.get(
          "/get-all-mini-cupcake-from-cart"
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to add mini cupcake to cart"
        );
      }
    }
  );

// ==========================================
// INCREMENT MINI CUPCAKE CART
// ==========================================

export const IncrementMiniCupcakeCartThunk =
  createAsyncThunk(
    "miniCupcakeCart/increment",
    async (cartId, { rejectWithValue }) => {
      try {
        await axiosInstance.patch(
          `/increment-mini-cupcake-cart/${cartId}`
        );

        const response = await axiosInstance.get(
          "/get-all-mini-cupcake-from-cart"
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to increase mini cupcake quantity"
        );
      }
    }
  );

// ==========================================
// DECREMENT MINI CUPCAKE CART
// ==========================================

export const DecrementMiniCupcakeCartThunk =
  createAsyncThunk(
    "miniCupcakeCart/decrement",
    async (cartId, { rejectWithValue }) => {
      try {
        await axiosInstance.patch(
          `/decrement-mini-cupcake-cart/${cartId}`
        );

        const response = await axiosInstance.get(
          "/get-all-mini-cupcake-from-cart"
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to decrease mini cupcake quantity"
        );
      }
    }
  );

// ==========================================
// DELETE MINI CUPCAKE FROM CART
// ==========================================

export const DeleteMiniCupcakeFromCartThunk =
  createAsyncThunk(
    "miniCupcakeCart/delete",
    async (cartId, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(
          `/delete-mini-cupcake-from-cart/${cartId}`
        );

        const response = await axiosInstance.get(
          "/get-all-mini-cupcake-from-cart"
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to remove mini cupcake from cart"
        );
      }
    }
  );


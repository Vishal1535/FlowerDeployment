import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

// GET ALL FLOWERS FROM CART

export const GetAllFlowerFromCartThunk = createAsyncThunk(
  "flowerCart/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/get-all-flower-from-cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch flowers from cart",
      );
    }
  },
);

// ADD FLOWER TO CART

export const AddFlowerToCartThunk = createAsyncThunk(
  "flowerCart/add",
  async (flowerId, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/add-flower-to-cart", {
        flowerId,
      });

      // Get updated cart
      const response = await axiosInstance.get("/get-all-flower-from-cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add flower to cart",
      );
    }
  },
);

// INCREMENT FLOWER CART

export const IncrementFlowerCartThunk = createAsyncThunk(
  "flowerCart/increment",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/increment-flower-cart/${cartId}`);

      // Get updated cart
      const response = await axiosInstance.get("/get-all-flower-from-cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to increase flower quantity",
      );
    }
  },
);

// DECREMENT FLOWER CART

export const DecrementFlowerCartThunk = createAsyncThunk(
  "flowerCart/decrement",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/decrement-flower-cart/${cartId}`);

      // Get updated cart
      const response = await axiosInstance.get("/get-all-flower-from-cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to decrease flower quantity",
      );
    }
  },
);

// DELETE FLOWER FROM CART

export const DeleteFlowerFromCartThunk = createAsyncThunk(
  "flowerCart/delete",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/delete-flower-from-cart/${cartId}`);

      // Get updated cart
      const response = await axiosInstance.get("/get-all-flower-from-cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove flower from cart",
      );
    }
  },
);

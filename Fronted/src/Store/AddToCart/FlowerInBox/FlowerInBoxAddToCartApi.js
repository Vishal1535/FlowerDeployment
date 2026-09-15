import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

// GET ALL FLOWER IN BOX FROM CART

export const GetAllFlowerInBoxFromCartThunk = createAsyncThunk(
  "flowerInBoxCart/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/get-all-flower-in-box-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch flower in box from cart",
      );
    }
  },
);

// ADD FLOWER IN BOX TO CART

export const AddFlowerInBoxToCartThunk = createAsyncThunk(
  "flowerInBoxCart/add",
  async (flowerInBoxId, { rejectWithValue }) => {
    try {
      await axiosInstance.post(
        "/add-flower-in-box-to-cart",
        {
          flowerInBoxId,
        }
      );

      // Get updated cart
      const response = await axiosInstance.get(
        "/get-all-flower-in-box-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add flower in box to cart",
      );
    }
  },
);

// INCREMENT FLOWER IN BOX CART

export const IncrementFlowerInBoxCartThunk = createAsyncThunk(
  "flowerInBoxCart/increment",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/increment-flower-in-box-cart/${cartId}`
      );

      // Get updated cart
      const response = await axiosInstance.get(
        "/get-all-flower-in-box-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to increase flower in box quantity",
      );
    }
  },
);

// DECREMENT FLOWER IN BOX CART

export const DecrementFlowerInBoxCartThunk = createAsyncThunk(
  "flowerInBoxCart/decrement",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/decrement-flower-in-box-cart/${cartId}`
      );

      // Get updated cart
      const response = await axiosInstance.get(
        "/get-all-flower-in-box-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to decrease flower in box quantity",
      );
    }
  },
);

// DELETE FLOWER IN BOX FROM CART

export const DeleteFlowerInBoxFromCartThunk = createAsyncThunk(
  "flowerInBoxCart/delete",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/delete-flower-in-box-from-cart/${cartId}`
      );

      // Get updated cart
      const response = await axiosInstance.get(
        "/get-all-flower-in-box-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove flower in box from cart",
      );
    }
  },
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

// GET ALL FLOWER IN SLEEVE FROM CART

export const GetAllFlowerInSleeveFromCartThunk = createAsyncThunk(
  "flowerInSleeveCart/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/get-all-flower-in-sleeve-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch flower in sleeve from cart",
      );
    }
  },
);

// ADD FLOWER IN SLEEVE TO CART

export const AddFlowerInSleeveToCartThunk = createAsyncThunk(
  "flowerInSleeveCart/add",
  async (flowerInSleeveId, { rejectWithValue }) => {
    try {
      await axiosInstance.post(
        "/add-flower-in-sleeve-to-cart",
        {
          flowerInSleeveId,
        }
      );

      // Get updated cart
      const response = await axiosInstance.get(
        "/get-all-flower-in-sleeve-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add flower in sleeve to cart",
      );
    }
  },
);

// INCREMENT FLOWER IN SLEEVE CART

export const IncrementFlowerInSleeveCartThunk = createAsyncThunk(
  "flowerInSleeveCart/increment",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/increment-flower-in-sleeve-cart/${cartId}`
      );

      // Get updated cart
      const response = await axiosInstance.get(
        "/get-all-flower-in-sleeve-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to increase flower in sleeve quantity",
      );
    }
  },
);

// DECREMENT FLOWER IN SLEEVE CART

export const DecrementFlowerInSleeveCartThunk = createAsyncThunk(
  "flowerInSleeveCart/decrement",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(
        `/decrement-flower-in-sleeve-cart/${cartId}`
      );

      // Get updated cart
      const response = await axiosInstance.get(
        "/get-all-flower-in-sleeve-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to decrease flower in sleeve quantity",
      );
    }
  },
);

// DELETE FLOWER IN SLEEVE FROM CART

export const DeleteFlowerInSleeveFromCartThunk = createAsyncThunk(
  "flowerInSleeveCart/delete",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/delete-flower-in-sleeve-from-cart/${cartId}`
      );

      // Get updated cart
      const response = await axiosInstance.get(
        "/get-all-flower-in-sleeve-from-cart"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove flower in sleeve from cart",
      );
    }
  },
);
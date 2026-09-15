import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

// ==========================================
// GET ALL CARDS FROM CART
// ==========================================

export const GetAllCardFromCartThunk = createAsyncThunk(
  "cardCart/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/get-all-card-from-cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cards from cart",
      );
    }
  },
);

// ==========================================
// ADD CARD TO CART
// ==========================================

export const AddCardToCartThunk = createAsyncThunk(
  "cardCart/add",
  async (cardId, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/add-card-to-cart", {
        cardId,
      });

      const response = await axiosInstance.get("/get-all-card-from-cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add card to cart",
      );
    }
  },
);

// ==========================================
// INCREMENT CARD CART
// ==========================================

export const IncrementCardCartThunk = createAsyncThunk(
  "cardCart/increment",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/increment-card-cart/${cartId}`);

      const response = await axiosInstance.get("/get-all-card-from-cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to increase card quantity",
      );
    }
  },
);

// ==========================================
// DECREMENT CARD CART
// ==========================================

export const DecrementCardCartThunk = createAsyncThunk(
  "cardCart/decrement",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/decrement-card-cart/${cartId}`);

      const response = await axiosInstance.get("/get-all-card-from-cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to decrease card quantity",
      );
    }
  },
);

// ==========================================
// DELETE CARD FROM CART
// ==========================================

export const DeleteCardFromCartThunk = createAsyncThunk(
  "cardCart/delete",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/delete-card-from-cart/${cartId}`);

      const response = await axiosInstance.get("/get-all-card-from-cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove card from cart",
      );
    }
  },
);


import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// CREATE SINGLE PRODUCT ORDER
export const CreateSingleProductOrderThunk = createAsyncThunk(
  "order/createSingleProductOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/orders/single",
        orderData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create single product order"
      );
    }
  }
);


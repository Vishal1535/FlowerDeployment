import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

export const CreateRazorpayOrderThunk = createAsyncThunk(
  "payment/createRazorpayOrder",

  async (amount, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/create-payment-order",
        {
          amount,
        }
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create payment order"
      );
    }
  }
);


// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

export const VerifyRazorpayPaymentThunk = createAsyncThunk(
  "payment/verifyRazorpayPayment",

  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/verify-payment",
        paymentData
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Payment verification failed"
      );
    }
  }
);
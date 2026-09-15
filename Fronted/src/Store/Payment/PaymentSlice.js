
import { createSlice } from "@reduxjs/toolkit";

import {
  CreateRazorpayOrderThunk,
  VerifyRazorpayPaymentThunk,
} from "./PaymentApi.js";

const initialState = {
  // Razorpay order
  razorpayOrder: null,

  // Payment verification
  paymentVerified: false,
  paymentId: null,

  loading: false,
  verifyLoading: false,

  error: null,
  verifyError: null,
};

const PaymentSlice = createSlice({
  name: "payment",

  initialState,

  reducers: {
    clearPayment: (state) => {
      state.razorpayOrder = null;
      state.paymentVerified = false;
      state.paymentId = null;

      state.loading = false;
      state.verifyLoading = false;

      state.error = null;
      state.verifyError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================================
      // CREATE RAZORPAY ORDER - PENDING
      // =========================================

      .addCase(
        CreateRazorpayOrderThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // =========================================
      // CREATE RAZORPAY ORDER - SUCCESS
      // =========================================

      .addCase(
        CreateRazorpayOrderThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.razorpayOrder =
            action.payload?.order || null;
        }
      )

      // =========================================
      // CREATE RAZORPAY ORDER - FAILED
      // =========================================

      .addCase(
        CreateRazorpayOrderThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to create payment order";
        }
      )

      // =========================================
      // VERIFY PAYMENT - PENDING
      // =========================================

      .addCase(
        VerifyRazorpayPaymentThunk.pending,
        (state) => {
          state.verifyLoading = true;
          state.verifyError = null;
          state.paymentVerified = false;
        }
      )

      // =========================================
      // VERIFY PAYMENT - SUCCESS
      // =========================================

      .addCase(
        VerifyRazorpayPaymentThunk.fulfilled,
        (state, action) => {
          state.verifyLoading = false;
          state.verifyError = null;

          if (action.payload?.success) {
            state.paymentVerified = true;

            state.paymentId =
              action.payload?.paymentId || null;
          }
        }
      )

      // =========================================
      // VERIFY PAYMENT - FAILED
      // =========================================

      .addCase(
        VerifyRazorpayPaymentThunk.rejected,
        (state, action) => {
          state.verifyLoading = false;
          state.paymentVerified = false;

          state.verifyError =
            action.payload ||
            "Payment verification failed";
        }
      );
  },
});

export const { clearPayment } =
  PaymentSlice.actions;

const PaymentReducer = PaymentSlice.reducer;

export default PaymentReducer;

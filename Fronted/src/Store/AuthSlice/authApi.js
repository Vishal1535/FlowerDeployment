import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance.js";

export const registerThunks = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/register", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const registerVerifyOtpThunks = createAsyncThunk(
  "user/registerVerifyOtp",

  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/registerOtpVerify", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);
export const loginThunks = createAsyncThunk(
  "user/login",

  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const logoutThunks = createAsyncThunk(
  "user/logout",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/logout");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);
export const forgetPasswordThunks = createAsyncThunk(
  "user/forgetPassword",
  async (data, { rejectWithValue }) => {
    try {
      
      
      const response = await axiosInstance.post("/forget-password", data);

      return {
        ...response.data,
        email: data.email,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

export const forgotPasswordOtpThunks = createAsyncThunk(
  "user/forgotPasswordOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/forget-password-otp", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);
export const updatePasswordThunks = createAsyncThunk(
  "user/updatePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/update-password", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update password",
      );
    }
  },
);

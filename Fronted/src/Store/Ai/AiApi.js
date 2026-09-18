import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const getAIRecommendation = createAsyncThunk(
  "ai/getAIRecommendation",
  async (question, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/recommend", {
        question,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "AI recommendation failed",
      );
    }
  },
);

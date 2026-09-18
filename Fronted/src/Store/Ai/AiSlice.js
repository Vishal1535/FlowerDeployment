import { createSlice } from "@reduxjs/toolkit";
import { getAIRecommendation } from "./AiApi";

const initialState = {
  loading: false,
  answer: "",
  products: [],
  error: null,
};

const AiSlice = createSlice({
  name: "ai",
  initialState,

  reducers: {
    clearAIResponse: (state) => {
      state.answer = "";
      state.products = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAIRecommendation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAIRecommendation.fulfilled, (state, action) => {
        state.loading = false;
        state.answer = action.payload.answer;
        state.products = action.payload.products || [];
      })

      .addCase(getAIRecommendation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAIResponse } = AiSlice.actions;
const AiReducer=AiSlice.reducer
export default AiReducer;
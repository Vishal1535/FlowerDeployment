import { createSlice } from "@reduxjs/toolkit";

import {
  forgetPasswordThunks,
  forgotPasswordOtpThunks,
  loginThunks,
  logoutThunks,
  registerThunks,
  registerVerifyOtpThunks,
  updatePasswordThunks,
  updateProfileThunks,
} from "./authApi.js";

// =====================================================
// SAVED USER
// =====================================================

const savedUser = localStorage.getItem("userInfo");

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  // LocalStorage mein user hai = logged in
  isAuthorized: !!savedUser,

  userInfo: savedUser ? JSON.parse(savedUser) : null,

  emailStoreForOtp: null,

  loading: false,

  error: null,

  showPopup: true,
};

// =====================================================
// SLICE
// =====================================================

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    closePopup: (state) => {
      state.showPopup = false;
    },
  },

  extraReducers: (builder) => {
    // =====================================================
    // REGISTER
    // =====================================================

    builder
      .addCase(registerThunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerThunks.fulfilled, (state, action) => {
        state.loading = false;

        // Register hone se login nahi hota
        state.isAuthorized = false;

        state.userInfo = null;

        state.emailStoreForOtp = action.payload.data;

        state.error = null;
      })

      .addCase(registerThunks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =====================================================
    // REGISTER OTP VERIFY
    // =====================================================

    builder
      .addCase(registerVerifyOtpThunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerVerifyOtpThunks.fulfilled, (state, action) => {
        state.loading = false;

        // IMPORTANT:
        // OTP verify hone ke baad LOGIN nahi hua
        // Isliye false hi rahega
        state.isAuthorized = false;

        state.userInfo = null;

        state.error = null;

        // OTP email ki zarurat nahi
        state.emailStoreForOtp = null;
      })

      .addCase(registerVerifyOtpThunks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        state.isAuthorized = false;
      });

    // =====================================================
    // LOGIN
    // =====================================================

    builder
      .addCase(loginThunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginThunks.fulfilled, (state, action) => {
        state.loading = false;

        // ONLY LOGIN SUCCESS = TRUE
        state.isAuthorized = true;

        state.userInfo = action.payload.user;

        state.error = null;

        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })

      .addCase(loginThunks.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        state.isAuthorized = false;
        state.userInfo = null;

        localStorage.removeItem("userInfo");
      });

    // =====================================================
    // LOGOUT
    // =====================================================

    builder
      .addCase(logoutThunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logoutThunks.fulfilled, (state) => {
        state.loading = false;

        state.isAuthorized = false;

        state.userInfo = null;

        state.emailStoreForOtp = null;

        state.error = null;

        localStorage.removeItem("userInfo");
      })

      .addCase(logoutThunks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =====================================================
    // FORGOT PASSWORD
    // =====================================================

    builder
      .addCase(forgetPasswordThunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(forgetPasswordThunks.fulfilled, (state, action) => {
        state.loading = false;

        state.error = null;

        state.emailStoreForOtp = action.payload.email;

        // IMPORTANT:
        // isAuthorized ko touch nahi karna
      })

      .addCase(forgetPasswordThunks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =====================================================
    // FORGOT PASSWORD OTP
    // =====================================================

    builder
      .addCase(forgotPasswordOtpThunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(forgotPasswordOtpThunks.fulfilled, (state, action) => {
        state.loading = false;

        state.error = null;

        state.emailStoreForOtp = action.payload.data;

        // IMPORTANT:
        // isAuthorized ko change nahi karna
      })

      .addCase(forgotPasswordOtpThunks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =====================================================
    // UPDATE PASSWORD
    // =====================================================

    builder
      .addCase(updatePasswordThunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePasswordThunks.fulfilled, (state) => {
        state.loading = false;

        state.error = null;

        state.emailStoreForOtp = null;

        // IMPORTANT:
        // isAuthorized ko change nahi karna
      })

      .addCase(updatePasswordThunks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateProfileThunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProfileThunks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Updated user Redux mein save
        state.userInfo = action.payload.user;

        // Updated user localStorage mein bhi save
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })

      .addCase(updateProfileThunks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { closePopup } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;

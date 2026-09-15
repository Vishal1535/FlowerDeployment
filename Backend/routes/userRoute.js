import express from "express";
import {
  forgetPassword,
  forgetPasswordOtp,
  login,
  logout,
  register,
  updatePassword,
  verifyRegisterOtp,
} from "../controllers/UserController.js";
const userRoute = express.Router();
userRoute.post("/register", register);
userRoute.post("/registerOtpVerify", verifyRegisterOtp);
userRoute.post("/login", login);
userRoute.post("/logout", logout);
userRoute.post("/forget-password", forgetPassword);
userRoute.post("/forget-password-otp", forgetPasswordOtp);
userRoute.post("/update-password", updatePassword);
export default userRoute;

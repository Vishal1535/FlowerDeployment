import express from "express";
import {
  forgetPassword,
  forgetPasswordOtp,
  login,
  logout,
  register,
  updatePassword,
  verifyRegisterOtp,
  updateProfile,
  updateProfilePassword,
} from "../controllers/UserController.js";
import isAuthorized from "../middlewares/isAuthorized.js";
const userRoute = express.Router();
userRoute.post("/register", register);
userRoute.post("/registerOtpVerify", verifyRegisterOtp);
userRoute.post("/login", login);
userRoute.post("/logout", logout);
userRoute.post("/forget-password", forgetPassword);
userRoute.post("/forget-password-otp", forgetPasswordOtp);
userRoute.post("/update-password", updatePassword);
userRoute.put("/update-profile", isAuthorized, updateProfile);
userRoute.put("/update-profile-password", isAuthorized, updateProfilePassword);
export default userRoute;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerVerifyOtpThunks } from "../../Store/AuthSlice/authApi";

export const RegisterOtp = () => {
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    if (!domain) return email;
    const visibleName = name.slice(0, 2);
    return `${visibleName}***@${domain}`;
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  const email = sessionStorage.getItem("emailStoreForOtp");
  const { isAuthorized } = useSelector((state) => state.user);

useEffect(() => {
  if (isAuthorized) {
    navigate("/", {
      replace: true,
    });
  }
}, [isAuthorized, navigate]);

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Please register again.");
      navigate("/register");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
        const data={
            email,
            otp
        }
      const response = await dispatch(
        registerVerifyOtpThunks(data),
      ).unwrap();

      if (response?.success) {
        toast.success("Email verified successfully!");

        sessionStorage.removeItem("emailStoreForOtp");

        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("OTP Verify Error:", error);

      toast.error(error || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gray-50 px-3 sm:px-4 py-5 sm:py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-7">
          {/* Icon */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl">
              ✉️
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
              Verify Your Email
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-5">
              We've sent a 6-digit verification code to
            </p>

            <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-1 break-all">
             {maskEmail(email)}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="mt-5 sm:mt-6">
            <label className="text-xs sm:text-sm font-medium text-gray-700">
              Enter OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={handleChange}
              className="input input-bordered w-full mt-2 h-12 sm:h-13 text-center text-xl sm:text-2xl tracking-[7px] sm:tracking-[10px] font-semibold focus:outline-none focus:border-gray-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn w-full h-11 sm:h-12 mt-4 sm:mt-5 bg-gray-900 hover:bg-gray-800 border-none text-sm sm:text-base text-white rounded-lg"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          {/* Bottom text */}
          <p className="text-[11px] sm:text-xs text-gray-400 text-center mt-4 sm:mt-5 leading-4">
            The OTP will expire after a limited time.
          </p>
        </div>
      </div>
    </div>
  );
};
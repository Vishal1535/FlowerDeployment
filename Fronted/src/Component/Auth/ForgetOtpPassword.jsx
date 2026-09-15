
import React, { useEffect, useState } from "react";
import { Flower2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { forgotPasswordOtpThunks } from "../../Store/AuthSlice/authApi.js";

export const ForgetOtpPassword = () => {
  const { loading, emailStoreForOtp } = useSelector(
    (state) => state.user
  );

  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state) => state.user);

useEffect(() => {
  if (isAuthorized) {
    navigate("/", {
      replace: true,
    });
  }
}, [isAuthorized, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!emailStoreForOtp) {
      toast.error("Email not found. Please restart the process.");
      navigate("/forget-password");
      return;
    }

    const data = {
      email: emailStoreForOtp,
      otp,
    };

    try {
      const response = await dispatch(
        forgotPasswordOtpThunks(data)
      ).unwrap();

      if (response?.success) {
        toast.success("OTP verified successfully");
        navigate("/new-password");
      }
    } catch (error) {
      toast.error(error || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">

      <div className="w-full max-w-md shadow-xl rounded-2xl p-7 sm:p-9 md:p-12 bg-white">

        {/* Logo */}
        <div className="flex items-center gap-2 text-gray-800 mb-8">

          <div
            className="w-10 h-10
                       rounded-xl
                       bg-gray-100
                       flex items-center justify-center"
          >
            <Flower2 size={21} />
          </div>

          <span className="font-semibold text-lg">
            Flower
          </span>

        </div>

        {/* Heading */}
        <div className="mb-7">

          <h1 className="text-3xl font-bold text-gray-900">
            Verify OTP
          </h1>

          <p className="text-sm text-gray-500 mt-2 leading-6">
            Enter the OTP sent to your registered email address
            to reset your password.
          </p>

          {emailStoreForOtp && (
            <p className="text-xs text-gray-400 mt-3">
              OTP sent to{" "}
              <span className="font-semibold text-gray-600">
                {emailStoreForOtp}
              </span>
            </p>
          )}

        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

          {/* OTP */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Enter OTP
            </label>

            <input
              type="text"
              name="otp"
              value={otp}
              placeholder="Enter 6-digit OTP"
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              inputMode="numeric"
              className="input input-bordered w-full mt-2
                         rounded-xl text-center
                         tracking-[8px] text-lg font-semibold
                         focus:outline-none
                         focus:border-gray-500
                         focus:ring-2 focus:ring-gray-100
                         transition-all"
              required
            />

          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl
                       bg-gray-900 hover:bg-gray-800
                       disabled:bg-gray-400
                       disabled:cursor-not-allowed
                       text-white font-semibold
                       flex items-center justify-center gap-2
                       shadow-md hover:shadow-lg
                       transition-all"
          >

            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Verifying...
              </>
            ) : (
              <>
                Verify OTP
                <ArrowRight size={18} />
              </>
            )}

          </button>

        </form>

        {/* Resend OTP */}
        <div className="text-center mt-6">

          <p className="text-sm text-gray-500">
            Didn't receive the OTP?{" "}

            <button
              type="button"
              className="font-semibold text-gray-900 hover:underline"
            >
              Resend OTP
            </button>
          </p>

        </div>

        {/* Back to Login */}
        <div className="text-center mt-5">

          <Link
            to="/login"
            className="text-sm font-semibold text-gray-900 hover:underline"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};


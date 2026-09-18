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
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8">

      <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-5 sm:p-7 md:p-9 lg:p-10">

        {/* Logo */}
        <div className="flex items-center gap-3 text-gray-900 mb-6 sm:mb-8">

          <div
            className="w-10 h-10 sm:w-11 sm:h-11
                       rounded-xl
                       bg-gray-100
                       border border-gray-200
                       flex items-center justify-center
                       shrink-0"
          >
            <Flower2
              size={21}
              className="text-gray-800"
            />
          </div>

          <span className="font-semibold text-lg sm:text-xl text-gray-900">
            Flower
          </span>

        </div>

        {/* Heading */}
        <div className="mb-6 sm:mb-7">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            Verify OTP
          </h1>

          <p className="text-sm sm:text-[15px] text-gray-600 mt-2 leading-6">
            Enter the OTP sent to your registered email address
            to reset your password.
          </p>

          {emailStoreForOtp && (
            <p className="text-xs sm:text-sm text-gray-500 mt-3 break-all leading-5">
              OTP sent to{" "}
              <span className="font-semibold text-gray-800">
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

            <label className="block text-sm font-medium text-gray-800 mb-2">
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
              className="w-full h-12 sm:h-13
                         rounded-xl
                         border border-gray-300
                         bg-white
                         text-gray-900
                         placeholder:text-gray-400
                         text-center
                         tracking-[6px] sm:tracking-[8px]
                         text-base sm:text-lg
                         font-semibold
                         outline-none
                         focus:border-gray-500
                         focus:ring-2
                         focus:ring-gray-100
                         transition-all"
              required
            />

          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 sm:h-[50px]
                       rounded-xl
                       bg-gray-900
                       hover:bg-gray-800
                       active:bg-gray-950
                       disabled:bg-gray-400
                       disabled:cursor-not-allowed
                       text-white
                       font-semibold
                       text-sm sm:text-base
                       flex items-center justify-center
                       gap-2
                       shadow-md
                       hover:shadow-lg
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
                <ArrowRight
                  size={18}
                  className="shrink-0"
                />
              </>
            )}

          </button>

        </form>

        {/* Resend OTP */}
        <div className="text-center mt-6">

          <p className="text-xs sm:text-sm text-gray-600 leading-5">
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
            className="inline-block text-xs sm:text-sm font-semibold text-gray-800 hover:text-gray-950 hover:underline"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};
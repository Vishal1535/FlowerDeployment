import React, { useEffect, useState } from "react";
import { Flower2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { forgetPasswordThunks } from "../../Store/AuthSlice/authApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, emailStoreForOtp } = useSelector((state) => state.user);

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

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const data = {
      email,
    };

    try {
      const response = await dispatch(
        forgetPasswordThunks(data)
      ).unwrap();

      if (response?.success) {
        toast.success("OTP sent successfully");

        navigate("/forget-otp-password");
      }
    } catch (error) {
      toast.error(
        error || "Failed to send OTP"
      );
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
            Forgot Password?
          </h1>

          <p className="text-sm sm:text-[15px] text-gray-600 mt-2 leading-6">
            Enter your registered email address to generate an OTP
            for password reset.
          </p>

        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div>

            <label
              className="block
                         text-sm
                         font-medium
                         text-gray-800
                         mb-2"
            >
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="w-full
                         h-12
                         rounded-xl
                         border
                         border-gray-300
                         bg-white
                         text-gray-900
                         placeholder:text-gray-400
                         px-4
                         text-sm
                         sm:text-base
                         outline-none
                         focus:border-gray-500
                         focus:ring-2
                         focus:ring-gray-100
                         transition-all"
              required
            />

          </div>

          {/* Generate OTP Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full
                       h-12
                       sm:h-[50px]
                       rounded-xl
                       bg-gray-900
                       hover:bg-gray-800
                       active:bg-gray-950
                       disabled:bg-gray-400
                       disabled:cursor-not-allowed
                       text-white
                       text-sm
                       sm:text-base
                       font-semibold
                       flex
                       items-center
                       justify-center
                       gap-2
                       shadow-md
                       hover:shadow-lg
                       transition-all"
          >

            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Sending OTP...
              </>
            ) : (
              <>
                Generate OTP
                <ArrowRight
                  size={18}
                  className="shrink-0"
                />
              </>
            )}

          </button>

        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">

          <Link
            to="/login"
            className="inline-block
                       text-xs
                       sm:text-sm
                       font-semibold
                       text-gray-800
                       hover:text-gray-950
                       hover:underline"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};
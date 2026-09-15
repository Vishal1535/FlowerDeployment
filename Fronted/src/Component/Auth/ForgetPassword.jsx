
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

  const { loading ,emailStoreForOtp} = useSelector((state) => state.user);
  
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
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md shadow-xl rounded-2xl p-7 sm:p-9 md:p-12">

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
            Forgot Password?
          </h1>

          <p className="text-sm text-gray-500 mt-2 leading-6">
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
              className="text-sm
                         font-medium
                         text-gray-700"
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
              className="input
                         input-bordered
                         w-full
                         mt-2
                         rounded-xl
                         focus:outline-none
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
                       rounded-xl
                       bg-gray-900
                       hover:bg-gray-800
                       disabled:bg-gray-400
                       disabled:cursor-not-allowed
                       text-white
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
                <ArrowRight size={18} />
              </>
            )}

          </button>

        </form>

        {/* Back to Login */}
        <div className="text-center mt-7">

          <Link
            to="/login"
            className="text-sm
                       font-semibold
                       text-gray-900
                       hover:underline"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};



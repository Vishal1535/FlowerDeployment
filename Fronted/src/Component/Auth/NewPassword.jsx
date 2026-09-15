import React, { useEffect, useState } from "react";
import { Flower2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updatePasswordThunks } from "../../Store/AuthSlice/authApi";

export const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, emailStoreForOtp } = useSelector(
    (state) => state.user
  );

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

    if (!emailStoreForOtp) {
      toast.error("Email not found. Please restart the process.");
      navigate("/forgot-password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      email: emailStoreForOtp,
      password,
    };

    try {
      const response = await dispatch(
        updatePasswordThunks(data)
      ).unwrap();

      if (response?.success) {
        toast.success("Password updated successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error || "Failed to update password"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">

      <div className="w-full max-w-md shadow-xl rounded-2xl p-5 sm:p-7 md:p-9 lg:p-12 bg-white">

        {/* Logo */}

        <div className="flex items-center gap-2 text-gray-800 mb-6 sm:mb-8">

          <div
            className="w-9 h-9 sm:w-10 sm:h-10
                       rounded-xl
                       bg-gray-100
                       flex items-center justify-center
                       shrink-0"
          >
            <Flower2
              size={20}
              className="sm:w-[21px] sm:h-[21px]"
            />
          </div>

          <span className="font-semibold text-base sm:text-lg">
            Flower
          </span>

        </div>

        {/* Heading */}

        <div className="mb-6 sm:mb-7">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create New Password
          </h1>

          <p className="text-sm text-gray-500 mt-2 leading-5 sm:leading-6">
            Enter your new password below to secure your account.
          </p>

        </div>

        {/* Form */}

        <form
          className="space-y-4 sm:space-y-5"
          onSubmit={handleSubmit}
        >

          {/* New Password */}

          <div>

            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input
                           input-bordered
                           w-full
                           h-11
                           sm:h-12
                           pr-12
                           rounded-xl
                           text-sm
                           sm:text-base
                           focus:outline-none
                           focus:border-gray-500
                           focus:ring-2
                           focus:ring-gray-100
                           transition-all"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute
                           right-3
                           top-1/2
                           -translate-y-1/2
                           p-1
                           text-gray-400
                           hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative mt-2">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="input
                           input-bordered
                           w-full
                           h-11
                           sm:h-12
                           pr-12
                           rounded-xl
                           text-sm
                           sm:text-base
                           focus:outline-none
                           focus:border-gray-500
                           focus:ring-2
                           focus:ring-gray-100
                           transition-all"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                className="absolute
                           right-3
                           top-1/2
                           -translate-y-1/2
                           p-1
                           text-gray-400
                           hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Update Password */}

          <button
            type="submit"
            disabled={loading}
            className="w-full
                       h-11
                       sm:h-12
                       rounded-xl
                       bg-gray-900
                       hover:bg-gray-800
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
                Updating...
              </>
            ) : (
              <>
                Update Password
                <ArrowRight
                  size={17}
                  className="sm:w-[18px] sm:h-[18px]"
                />
              </>
            )}

          </button>

        </form>

        {/* Back to Login */}

        <div className="text-center mt-5 sm:mt-7">

          <Link
            to="/login"
            className="text-xs
                       sm:text-sm
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
import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Save,
  ShieldCheck,
  ChevronRight,
  KeyRound,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  updateProfileThunks,
  logoutThunks,
  updatePasswordThunks,
} from "../../Store/AuthSlice/authApi";

export const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthorized, userInfo, loading } = useSelector(
    (state) => state.user
  );

  const [activeSection, setActiveSection] = useState(null);

  // ================= PROFILE DATA =================

  const [profileData, setProfileData] = useState({
    name: userInfo?.name || "",
    phone: userInfo?.phone || "",
  });

  // ================= PASSWORD DATA =================

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // =================================================
  // PROFILE VALIDATION
  // =================================================

  const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const phoneRegex = /^[0-9]{10}$/;

  const isNameValid =
    profileData.name.trim().length > 0 &&
    nameRegex.test(profileData.name.trim());

  const isPhoneValid =
    phoneRegex.test(profileData.phone.trim());

  // =================================================
  // PROFILE
  // =================================================

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      // Only letters and spaces
      const cleanedValue = value.replace(
        /[^A-Za-z\s]/g,
        ""
      );

      setProfileData((prev) => ({
        ...prev,
        name: cleanedValue,
      }));

      return;
    }

    if (name === "phone") {
      // Only numbers and maximum 10 digits
      const cleanedValue = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setProfileData((prev) => ({
        ...prev,
        phone: cleanedValue,
      }));

      return;
    }

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!profileData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!isNameValid) {
      toast.error(
        "Name should contain only letters and spaces"
      );
      return;
    }

    if (!profileData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!isPhoneValid) {
      toast.error(
        "Phone number must contain exactly 10 digits"
      );
      return;
    }

    const result = await dispatch(
      updateProfileThunks({
        name: profileData.name.trim(),
        phone: profileData.phone.trim(),
      })
    );

    if (updateProfileThunks.fulfilled.match(result)) {
      toast.success("Profile updated successfully");

      // Close profile section
      setActiveSection(null);
    } else {
      toast.error(
        result.payload || "Failed to update profile"
      );
    }
  };

  // =================================================
  // PASSWORD
  // =================================================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const password = passwordData.password;

  const passwordRules = {
    length: password.length >= 6,
    capital: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.capital &&
    passwordRules.number &&
    passwordRules.special;

  const passwordsMatch =
    passwordData.confirmPassword.length > 0 &&
    passwordData.password ===
      passwordData.confirmPassword;

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error(
        "Please complete all password requirements"
      );
      return;
    }

    if (
      passwordData.password !==
      passwordData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await dispatch(
      updatePasswordThunks({
        email: userInfo?.email,
        password: passwordData.password,
      })
    );

    if (updatePasswordThunks.fulfilled.match(result)) {
      toast.success("Password updated successfully");

      setPasswordData({
        password: "",
        confirmPassword: "",
      });

      setShowPassword(false);
      setShowConfirmPassword(false);

      // Close password section
      setActiveSection(null);
    } else {
      toast.error(
        result.payload || "Failed to update password"
      );
    }
  };

  // =================================================
  // LOGOUT
  // =================================================

  const handleLogout = async () => {
    const result = await dispatch(logoutThunks());

    if (logoutThunks.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  // =================================================
  // LOGIN CHECK
  // =================================================

  if (!isAuthorized || !userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white border border-pink-100 rounded-3xl p-7 text-center shadow-lg">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-50 flex items-center justify-center">
            <User
              size={28}
              className="text-pink-600"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-5">
            Login Required
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Please login to manage your account settings.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full h-11 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // =================================================
  // MAIN SETTINGS
  // =================================================

  if (!activeSection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-6 sm:py-10">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:border-pink-200 transition shadow-sm shrink-0"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Settings
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Manage your account and security
              </p>
            </div>
          </div>

          {/* Account Card */}
          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-5 sm:p-6 mb-5">
            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center text-white text-xl font-bold shadow-md shrink-0">
                {userInfo?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}
              </div>

              {/* User Info */}
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-gray-900 truncate">
                  {userInfo?.name}
                </h2>

                <p className="text-sm text-gray-500 truncate mt-1">
                  {userInfo?.email}
                </p>
              </div>

              {/* Active */}
              <div className="hidden sm:flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Active
              </div>

              <ShieldCheck
                size={21}
                className="text-green-500 sm:hidden shrink-0"
              />
            </div>
          </div>

          {/* Settings Options */}
          <div className="space-y-3">

            {/* Profile */}
            <button
              onClick={() =>
                setActiveSection("profile")
              }
              className="group w-full bg-white border border-gray-200 hover:border-pink-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 text-left shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-50 group-hover:bg-pink-100 flex items-center justify-center shrink-0 transition">
                <User
                  size={21}
                  className="text-pink-600"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900">
                  Profile Information
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Change your name and phone number
                </p>
              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 group-hover:text-pink-600 transition shrink-0"
              />
            </button>

            {/* Password */}
            <button
              onClick={() =>
                setActiveSection("password")
              }
              className="group w-full bg-white border border-gray-200 hover:border-purple-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 text-left shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center shrink-0 transition">
                <KeyRound
                  size={21}
                  className="text-purple-600"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900">
                  Password & Security
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Change your password and secure your account
                </p>
              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 group-hover:text-purple-600 transition shrink-0"
              />
            </button>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full mt-6 h-12 rounded-2xl bg-white border border-red-100 hover:bg-red-50 hover:border-red-200 text-red-500 font-semibold flex items-center justify-center gap-2 transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    );
  }

  // =================================================
  // PROFILE SECTION
  // =================================================

  if (activeSection === "profile") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-6 sm:py-10">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setActiveSection(null)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:border-pink-200 transition shadow-sm shrink-0"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Profile Information
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Update your personal information
              </p>
            </div>
          </div>

          {/* Profile Card */}
          <form
            onSubmit={handleUpdateProfile}
            className="bg-white border border-gray-200 rounded-3xl shadow-sm p-5 sm:p-7"
          >

            {/* Top */}
            <div className="flex items-center gap-4 pb-5 mb-5 border-b border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center shrink-0">
                <User
                  size={25}
                  className="text-pink-600"
                />
              </div>

              <div className="min-w-0">
                <h2 className="font-bold text-gray-900">
                  Personal Details
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Keep your information up to date
                </p>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="relative mt-2">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className={`w-full h-12 rounded-xl border pl-11 pr-4 text-sm outline-none transition ${
                    profileData.name.length > 0
                      ? isNameValid
                        ? "border-green-400 focus:ring-2 focus:ring-green-100"
                        : "border-red-300 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Name validation */}
              {profileData.name.length > 0 &&
                !isNameValid && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500 mt-2">
                    <XCircle size={14} />
                    Name should contain only letters and spaces.
                  </p>
                )}

              {isNameValid && (
                <p className="flex items-center gap-1.5 text-xs text-green-600 mt-2">
                  <CheckCircle2 size={14} />
                  Name looks good.
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mt-5">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={userInfo?.email || ""}
                  disabled
                  className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-400 cursor-not-allowed"
                />
              </div>

              <p className="text-[11px] text-gray-400 mt-1.5">
                Email address cannot be changed here.
              </p>
            </div>

            {/* Phone */}
            <div className="mt-5">
              <label className="text-sm font-semibold text-gray-700">
                Phone Number
              </label>

              <div className="relative mt-2">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  inputMode="numeric"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  maxLength={10}
                  className={`w-full h-12 rounded-xl border pl-11 pr-4 text-sm outline-none transition ${
                    profileData.phone.length > 0
                      ? isPhoneValid
                        ? "border-green-400 focus:ring-2 focus:ring-green-100"
                        : "border-red-300 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                  }`}
                  placeholder="Enter 10 digit phone number"
                />
              </div>

              {/* Phone validation */}
              {profileData.phone.length > 0 &&
                !isPhoneValid && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500 mt-2">
                    <XCircle size={14} />
                    Phone number must contain exactly 10 digits.
                  </p>
                )}

              {isPhoneValid && (
                <p className="flex items-center gap-1.5 text-xs text-green-600 mt-2">
                  <CheckCircle2 size={14} />
                  Phone number is valid.
                </p>
              )}
            </div>

            {/* Save */}
            <button
              type="submit"
              disabled={
                loading ||
                !isNameValid ||
                !isPhoneValid
              }
              className="w-full mt-7 h-12 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2 transition"
            >
              <Save size={18} />

              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </form>
        </div>
      </div>
    );
  }

  // =================================================
  // PASSWORD SECTION
  // =================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-6 sm:py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setActiveSection(null)}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:border-purple-200 transition shadow-sm shrink-0"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Password & Security
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Create a strong password for your account
            </p>
          </div>
        </div>

        {/* Password Card */}
        <form
          onSubmit={handleUpdatePassword}
          className="bg-white border border-gray-200 rounded-3xl shadow-sm p-5 sm:p-7"
        >

          {/* Security Header */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-purple-50 border border-purple-100 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
              <Lock
                size={19}
                className="text-purple-600"
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900">
                Create New Password
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                Use a combination of letters, numbers and symbols.
              </p>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              New Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={passwordData.password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="w-full h-12 rounded-xl border border-gray-200 pl-11 pr-12 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-3 rounded-xl bg-gray-50 border border-gray-100 p-3.5">
              <p className="text-xs font-semibold text-gray-600 mb-3">
                Password must contain:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <PasswordRule
                  valid={passwordRules.length}
                  text="At least 6 characters"
                />

                <PasswordRule
                  valid={passwordRules.capital}
                  text="One capital letter (A-Z)"
                />

                <PasswordRule
                  valid={passwordRules.number}
                  text="One number (0-9)"
                />

                <PasswordRule
                  valid={passwordRules.special}
                  text="One special character (!@#$)"
                />
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mt-5">
            <label className="text-sm font-semibold text-gray-700">
              Confirm New Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className={`w-full h-12 rounded-xl border pl-11 pr-12 text-sm outline-none transition ${
                  passwordData.confirmPassword.length > 0
                    ? passwordsMatch
                      ? "border-green-400 focus:ring-2 focus:ring-green-100"
                      : "border-red-300 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition"
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {/* Confirm Password Status */}
            {passwordData.confirmPassword.length > 0 &&
              !passwordsMatch && (
                <p className="flex items-center gap-1.5 text-xs text-red-500 mt-2">
                  <XCircle size={14} />
                  Passwords do not match.
                </p>
              )}

            {passwordsMatch && (
              <p className="flex items-center gap-1.5 text-xs text-green-600 mt-2">
                <CheckCircle2 size={14} />
                Passwords match.
              </p>
            )}
          </div>

          {/* Update Button */}
          <button
            type="submit"
            disabled={
              loading ||
              !isPasswordValid ||
              !passwordsMatch
            }
            className="w-full mt-7 h-12 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2 transition"
          >
            <ShieldCheck size={18} />

            {loading
              ? "Updating Password..."
              : "Update Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

// =================================================
// PASSWORD RULE COMPONENT
// =================================================

const PasswordRule = ({ valid, text }) => {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        valid
          ? "text-green-600"
          : "text-red-500"
      }`}
    >
      {valid ? (
        <CheckCircle2 size={15} />
      ) : (
        <XCircle size={15} />
      )}

      <span>{text}</span>
    </div>
  );
};
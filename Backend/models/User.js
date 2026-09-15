import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "deliveryBoy"],
      default: "user",
    },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpire: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;

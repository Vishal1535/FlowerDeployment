import mongoose from "mongoose";

const MiniCupcakeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
    },

    occasion: {
      type: String,
      required: true,
      trim: true,
    },

    flavor: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    createBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const MiniCupcakeModel = mongoose.model(
  "MiniCupcake",
  MiniCupcakeSchema
);

export default MiniCupcakeModel;
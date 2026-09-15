import mongoose from "mongoose";

const ChocolateSchema = new mongoose.Schema(
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

    size: {
      type: String,
      required: true,
      trim: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ChocolateModel = mongoose.model(
  "Chocolate",
  ChocolateSchema
);

export default ChocolateModel;
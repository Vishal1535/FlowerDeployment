import mongoose from "mongoose";

const flowerInBoxSchema = new mongoose.Schema(
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

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    image: {
      type: String,
      required: true,
    },

    flowerType: {
      type: String,
      required: true,
      trim: true,
    },

    boxType: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    occasion: [
      {
        type: String,
        trim: true,
      },
    ],

    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      default: "Medium",
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const FlowerInBoxModel = mongoose.model("FlowerInBox", flowerInBoxSchema);

export default FlowerInBoxModel;

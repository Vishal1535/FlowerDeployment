import mongoose from "mongoose";

const FlowerInBoxAddToCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    flowerInBox: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FlowerInBox",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
);

const FlowerInBoxAddToCartModel = mongoose.model(
  "FlowerInBoxAddToCart",
  FlowerInBoxAddToCartSchema
);

export default FlowerInBoxAddToCartModel;
import mongoose from "mongoose";

const FlowerInSleeveAddToCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    flowerInSleeve: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FlowerInSleeve",
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

const FlowerInSleeveAddToCartModel = mongoose.model(
  "FlowerInSleeveAddToCart",
  FlowerInSleeveAddToCartSchema
);

export default FlowerInSleeveAddToCartModel;
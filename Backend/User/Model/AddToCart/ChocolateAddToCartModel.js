import mongoose from "mongoose";

const ChocolateAddToCartSchema = new mongoose.Schema(
  {
    chocolate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chocolate",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const ChocolateAddToCartModel = mongoose.model(
  "ChocolateAddToCart",
  ChocolateAddToCartSchema
);

export default ChocolateAddToCartModel;
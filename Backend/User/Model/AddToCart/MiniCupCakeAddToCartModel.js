import mongoose from "mongoose";

const MiniCupcakeAddToCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    miniCupcake: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiniCupcake",
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

const MiniCupcakeAddToCartModel = mongoose.model(
  "MiniCupcakeAddToCart",
  MiniCupcakeAddToCartSchema
);

export default MiniCupcakeAddToCartModel;
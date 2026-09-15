import mongoose from "mongoose";

const FlowerAddToCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    flower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flower",
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

const FlowerAddToCartModel = mongoose.model("FlowerAddToCart", FlowerAddToCartSchema);
export default FlowerAddToCartModel

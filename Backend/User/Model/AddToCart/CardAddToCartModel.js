import mongoose from "mongoose";

const CardAddToCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
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

const CardAddToCartModel = mongoose.model(
  "CardAddToCart",
  CardAddToCartSchema
);

export default CardAddToCartModel;
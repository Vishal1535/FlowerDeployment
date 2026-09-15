import mongoose from "mongoose";

const WoolenBouquetAddToCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    woolenBouquet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Woolen",
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

const WoolenBouquetAddToCartModel = mongoose.model(
  "WoolenBouquetAddToCart",
  WoolenBouquetAddToCartSchema
);

export default WoolenBouquetAddToCartModel;
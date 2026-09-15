import mongoose from "mongoose";

const BouquetAddToCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bouquet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bouquet",
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

const BouquetAddToCartModel = mongoose.model(
  "BouquetAddToCart",
  BouquetAddToCartSchema,
);

export default BouquetAddToCartModel;

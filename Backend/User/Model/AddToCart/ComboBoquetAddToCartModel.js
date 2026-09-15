import mongoose from "mongoose";

const ComboBouquetAddToCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comboBouquet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ComboBouquet",
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

const ComboBouquetAddToCartModel = mongoose.model(
  "ComboBouquetAddToCart",
  ComboBouquetAddToCartSchema
);

export default ComboBouquetAddToCartModel;
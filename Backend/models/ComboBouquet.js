import mongoose from "mongoose";

const ComboBouquetSchema = new mongoose.Schema(
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

    image: {
      type: String,
      required: true,
    },

    occasion: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      default: "Combo Bouquet",
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

    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ComboBouquetModel = mongoose.model(
  "ComboBouquet",
  ComboBouquetSchema
);

export default ComboBouquetModel;
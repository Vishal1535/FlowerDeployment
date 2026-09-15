import mongoose from "mongoose";

const BouquetSchema = new mongoose.Schema(
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

    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    // ================= FLOWER DETAILS =================

    flowerCount: {
      type: Number,
      required: true,
      min: 1,
    },

    flowers: [
      {
        type: String,
        trim: true,
      },
    ],

    // ================= AVAILABILITY =================

    isAvailable: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bouquetModel = mongoose.model(
  "Bouquet",
  BouquetSchema
);

export default bouquetModel;
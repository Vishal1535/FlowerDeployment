import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    Flower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flower",
      },
    ],

    Bouquet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bouquet",
      },
    ],

    ComboBouquet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ComboBouquet",
      },
    ],

    FlowerInBox: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FlowerInBox",
      },
    ],

    FlowerInSleeve: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FlowerInSleeve",
      },
    ],

    Woolen: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Woolen",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const WishlistModel = mongoose.model(
  "Wishlist",
  WishlistSchema
);

export default WishlistModel;
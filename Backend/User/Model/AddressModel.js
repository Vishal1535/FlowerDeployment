import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    // =====================================================
    // USER
    // =====================================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =====================================================
    // PERSONAL DETAILS
    // =====================================================

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================================
    // ADDRESS DETAILS
    // =====================================================

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    houseNumber: {
      type: String,
      required: true,
      trim: true,
    },

    area: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
      default: "India",
    },

    // =====================================================
    // MAP LOCATION
    // =====================================================

    location: {
      latitude: {
        type: Number,
        default: null,
      },

      longitude: {
        type: Number,
        default: null,
      },
    },
  },

  {
    timestamps: true,
  }
);

// =====================================================
// MODEL
// =====================================================

const AddressModel = mongoose.model(
  "Address",
  AddressSchema
);

export default AddressModel;
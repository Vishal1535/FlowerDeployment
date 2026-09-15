
import mongoose from "mongoose";

const DeliveryBoySchema = new mongoose.Schema(
  {
    // =====================================================
    // USER
    // =====================================================

    // Delivery boy ka login/user account
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // =====================================================
    // DELIVERY BOY DETAILS
    // =====================================================

    name: {
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
    // DELIVERY STATUS
    // =====================================================

    // true  = Available
    // false = Busy

    isAvailable: {
      type: Boolean,
      default: true,
    },

    // =====================================================
    // CURRENT LOCATION
    // =====================================================

    currentLocation: {
      latitude: {
        type: Number,
        default: null,
      },

      longitude: {
        type: Number,
        default: null,
      },
    },

    // =====================================================
    // VEHICLE DETAILS
    // =====================================================

    vehicleType: {
      type: String,
      enum: [
        "bike",
        "scooter",
        "cycle",
        "other",
      ],
      default: "bike",
    },

    vehicleNumber: {
      type: String,
      trim: true,
      default: "",
    },

    // =====================================================
    // DELIVERY STATISTICS
    // =====================================================

    totalDeliveries: {
      type: Number,
      default: 0,
      min: 0,
    },

    completedDeliveries: {
      type: Number,
      default: 0,
      min: 0,
    },

    cancelledDeliveries: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================================
// MODEL
// =====================================================

const DeliveryBoyModel = mongoose.model(
  "DeliveryBoy",
  DeliveryBoySchema
);

export default DeliveryBoyModel;


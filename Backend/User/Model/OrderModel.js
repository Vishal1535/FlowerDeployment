import mongoose from "mongoose";

// =====================================================
// ORDER ITEM SCHEMA
// =====================================================

const OrderItemSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      required: true,

      enum: [
        "flower",
        "flowerInSleeve",
        "flowerInBox",
        "bouquet",
        "comboBouquet",
        "woolenBouquet",
        "card",
        "chocolate",
        "miniCupcake",
      ],
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

// =====================================================
// ORDER SCHEMA
// =====================================================

const OrderSchema = new mongoose.Schema(
  {
    // =================================================
    // USER
    // =================================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =================================================
    // PRODUCTS
    // =================================================

    items: {
      type: [OrderItemSchema],

      required: true,

      validate: {
        validator: (items) =>
          Array.isArray(items) && items.length > 0,

        message: "Order must contain at least one item",
      },
    },

    // =================================================
    // DELIVERY ADDRESS
    // =================================================

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    // =================================================
    // DELIVERY BOY
    // =================================================

    deliveryBoy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryBoy",
      default: null,
    },

    // =================================================
    // AMOUNT
    // =================================================

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // =================================================
    // DELIVERY TYPE
    // =================================================

    deliveryType: {
      type: String,

      enum: [
        "standard",
        "tomorrow",
      ],

      default: "standard",

      required: true,
    },

    // =================================================
    // DELIVERY DATE
    // =================================================

    deliverDate: {
      type: Date,
      required: true,
    },

    // =================================================
    // PAYMENT METHOD
    // =================================================

    paymentMethod: {
      type: String,

      enum: ["online"],

      default: "online",

      required: true,
    },

    // =================================================
    // PAYMENT TYPE
    // =================================================

    paymentType: {
      type: String,

      enum: [
        "full",
        "partial",
      ],

      required: true,
    },

    // =================================================
    // PAID AMOUNT
    // =================================================

    paidAmount: {
      type: Number,

      default: 0,

      min: 0,
    },

    // =================================================
    // REMAINING AMOUNT
    // =================================================

    remainingAmount: {
      type: Number,

      default: 0,

      min: 0,
    },

    // =================================================
    // PAYMENT STATUS
    // =================================================

    paymentStatus: {
      type: String,

      enum: [
        "pending",
        "partial",
        "paid",
        "failed",
      ],

      default: "pending",
    },

    // =================================================
    // ORDER STATUS
    // =================================================

    orderStatus: {
      type: String,

      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],

      default: "pending",
    },

    // =================================================
    // STATUS CHANGED AT
    // =================================================

    statusChangedAt: {
      type: Date,

      default: Date.now,
    },

    // =================================================
    // RAZORPAY
    // =================================================

    paymentOrderId: {
      type: String,

      default: "",

      trim: true,
    },

    paymentId: {
      type: String,

      default: "",

      trim: true,
    },

    paymentSignature: {
      type: String,

      default: "",

      trim: true,
    },

    // =================================================
    // ORDER DATE
    // =================================================

    orderedAt: {
      type: Date,

      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

// =====================================================
// TTL INDEX
// =====================================================

OrderSchema.index(
  {
    statusChangedAt: 1,
  },
  {
    expireAfterSeconds: 86400,

    partialFilterExpression: {
      orderStatus: {
        $in: [
          "delivered",
          "cancelled",
        ],
      },
    },
  }
);

// =====================================================
// MODEL
// =====================================================

const OrderModel = mongoose.model(
  "Order",
  OrderSchema
);

export default OrderModel;
import mongoose from "mongoose";

import OrderModel from "../../User/Model/OrderModel.js";
import DeliveryBoyModel from "../Model/DeliveryBoyModel.js";

// ASSIGN ORDER TO DELIVERY BOY

// Admin kisi order ko delivery boy ko assign karega.
//
// Body:
// {
//   deliveryBoyId: "delivery boy _id"
// }

export const AssignOrderToDeliveryBoy = async (req, res) => {
  try {
    // =================================================
    // ADMIN CHECK
    // =================================================

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can assign orders",
      });
    }

    // =================================================
    // ORDER ID
    // =================================================

    const { orderId } = req.params;

    // =================================================
    // DELIVERY BOY ID
    // =================================================

    const { deliveryBoyId } = req.body;

    // =================================================
    // REQUIRED
    // =================================================

    if (!deliveryBoyId) {
      return res.status(400).json({
        success: false,
        message: "Delivery boy ID is required",
      });
    }

    // =================================================
    // VALIDATE ORDER ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    // =================================================
    // VALIDATE DELIVERY BOY ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(deliveryBoyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery boy ID",
      });
    }

    // =================================================
    // FIND ORDER
    // =================================================

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // =================================================
    // ORDER STATUS CHECK
    // =================================================
    //
    // Delivered / cancelled order ko assign nahi karna.
    // =================================================

    if (
      order.orderStatus === "delivered" ||
      order.orderStatus === "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Delivered or cancelled order cannot be assigned",
      });
    }

    // =================================================
    // FIND DELIVERY BOY
    // =================================================

    const deliveryBoy = await DeliveryBoyModel.findById(deliveryBoyId);

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy not found",
      });
    }

    // =================================================
    // CHECK DELIVERY BOY USER
    // =================================================

    if (!deliveryBoy.user) {
      return res.status(400).json({
        success: false,
        message: "Delivery boy does not have a valid user account",
      });
    }

    // =================================================
    // CHECK AVAILABILITY
    // =================================================
    //
    // true = available
    // false = busy
    //
    // Agar already busy hai toh new order assign nahi hoga.
    // =================================================

    if (!deliveryBoy.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Delivery boy is currently busy",
      });
    }

    // =================================================
    // CHECK ALREADY ASSIGNED
    // =================================================

    if (order.deliveryBoy) {
      return res.status(400).json({
        success: false,
        message: "Order is already assigned to a delivery boy",
      });
    }

    // =================================================
    // ASSIGN ORDER
    // =================================================

    order.deliveryBoy = deliveryBoy._id;

    // =================================================
    // ORDER STATUS
    // =================================================
    //
    // Admin assignment ke baad order processing/shipped
    // flow mein ja sakta hai.
    //
    // Hum yahan shipped rakhenge, jisse delivery boy
    // accept karne ke baad out_for_delivery karega.
    // =================================================

    if (
      order.orderStatus === "pending" ||
      order.orderStatus === "confirmed" ||
      order.orderStatus === "processing"
    ) {
      order.orderStatus = "shipped";
      order.statusChangedAt = new Date();
    }

    await order.save();

    // =================================================
    // DELIVERY BOY BUSY
    // =================================================
    //
    // Assignment ke turant baad busy karna better nahi hai
    // agar delivery boy ko pehle order accept karna hai.
    //
    // Isliye yahan isAvailable ko TRUE hi rakhenge.
    //
    // AcceptOrder controller mein:
    // true -> false
    // hoga.
    // =================================================

    return res.status(200).json({
      success: true,

      message: "Order assigned to delivery boy successfully",

      order: {
        id: order._id,
        orderStatus: order.orderStatus,
        deliveryBoy: order.deliveryBoy,
      },

      deliveryBoy: {
        id: deliveryBoy._id,
        name: deliveryBoy.name,
        phone: deliveryBoy.phone,
        isAvailable: deliveryBoy.isAvailable,
      },
    });
  } catch (error) {
    console.error("Assign Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to assign order",
      error: error.message,
    });
  }
};

// UNASSIGN ORDER

// Admin assigned delivery boy ko remove kar sakta hai.
//
// Example:
// deliveryBoy accidentally assign ho gaya.

export const UnassignOrderFromDeliveryBoy = async (req, res) => {
  try {
    // =================================================
    // ADMIN CHECK
    // =================================================

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can unassign orders",
      });
    }

    const { orderId } = req.params;

    // =================================================
    // VALIDATE ORDER ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    // =================================================
    // FIND ORDER
    // =================================================

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // =================================================
    // CHECK ASSIGNMENT
    // =================================================

    if (!order.deliveryBoy) {
      return res.status(400).json({
        success: false,
        message: "No delivery boy is assigned to this order",
      });
    }

    // =================================================
    // CANNOT UNASSIGN DELIVERED ORDER
    // =================================================

    if (order.orderStatus === "delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered order cannot be unassigned",
      });
    }

    // =================================================
    // OLD DELIVERY BOY
    // =================================================

    const oldDeliveryBoy = await DeliveryBoyModel.findById(order.deliveryBoy);

    // =================================================
    // REMOVE ASSIGNMENT
    // =================================================

    order.deliveryBoy = null;

    // =================================================
    // ORDER STATUS
    // =================================================

    if (order.orderStatus === "out_for_delivery") {
      order.orderStatus = "processing";
      order.statusChangedAt = new Date();
    }

    await order.save();

    // =================================================
    // MAKE DELIVERY BOY AVAILABLE
    // =================================================

    if (oldDeliveryBoy) {
      oldDeliveryBoy.isAvailable = true;

      await oldDeliveryBoy.save();
    }

    return res.status(200).json({
      success: true,

      message: "Order unassigned successfully",

      order,
    });
  } catch (error) {
    console.error("Unassign Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to unassign order",
      error: error.message,
    });
  }
};

// REASSIGN ORDER

// Admin ek delivery boy se doosre delivery boy ko order
// assign kar sakta hai.
//
// Example:
// Delivery Boy A busy/unavailable ho gaya.
// Admin → Delivery Boy B ko assign karega.

export const ReassignOrder = async (req, res) => {
  try {
    // =================================================
    // ADMIN CHECK
    // =================================================

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can reassign orders",
      });
    }

    const { orderId } = req.params;

    const { deliveryBoyId } = req.body;

    // =================================================
    // REQUIRED
    // =================================================

    if (!deliveryBoyId) {
      return res.status(400).json({
        success: false,
        message: "New delivery boy ID is required",
      });
    }

    // =================================================
    // VALIDATE IDS
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(deliveryBoyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery boy ID",
      });
    }

    // =================================================
    // FIND ORDER
    // =================================================

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // =================================================
    // ORDER STATUS CHECK
    // =================================================

    if (
      order.orderStatus === "delivered" ||
      order.orderStatus === "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Delivered or cancelled order cannot be reassigned",
      });
    }

    // =================================================
    // FIND NEW DELIVERY BOY
    // =================================================

    const newDeliveryBoy = await DeliveryBoyModel.findById(deliveryBoyId);

    if (!newDeliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "New delivery boy not found",
      });
    }

    // =================================================
    // SAME DELIVERY BOY CHECK
    // =================================================

    if (
      order.deliveryBoy &&
      order.deliveryBoy.toString() === newDeliveryBoy._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "This delivery boy is already assigned",
      });
    }

    // =================================================
    // NEW DELIVERY BOY AVAILABILITY
    // =================================================

    if (!newDeliveryBoy.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "New delivery boy is currently busy",
      });
    }

    // =================================================
    // OLD DELIVERY BOY
    // =================================================

    let oldDeliveryBoy = null;

    if (order.deliveryBoy) {
      oldDeliveryBoy = await DeliveryBoyModel.findById(order.deliveryBoy);
    }

    // =================================================
    // ASSIGN NEW DELIVERY BOY
    // =================================================

    order.deliveryBoy = newDeliveryBoy._id;

    // =================================================
    // STATUS
    // =================================================

    if (order.orderStatus === "out_for_delivery") {
      order.orderStatus = "shipped";
      order.statusChangedAt = new Date();
    }

    await order.save();

    // =================================================
    // OLD DELIVERY BOY AVAILABLE
    // =================================================

    if (oldDeliveryBoy) {
      oldDeliveryBoy.isAvailable = true;

      await oldDeliveryBoy.save();
    }

    return res.status(200).json({
      success: true,

      message: "Order reassigned successfully",

      order,

      deliveryBoy: {
        id: newDeliveryBoy._id,
        name: newDeliveryBoy.name,
        phone: newDeliveryBoy.phone,
        isAvailable: newDeliveryBoy.isAvailable,
      },
    });
  } catch (error) {
    console.error("Reassign Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reassign order",
      error: error.message,
    });
  }
};

// GET ORDER ASSIGNMENT DETAILS

// Admin kisi order ka assigned delivery boy dekh sakta hai.

export const GetOrderAssignment = async (req, res) => {
  try {
    // =================================================
    // ADMIN CHECK
    // =================================================

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can view assignment",
      });
    }

    const { orderId } = req.params;

    // =================================================
    // VALIDATE ORDER ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    // =================================================
    // FIND ORDER
    // =================================================

    const order = await OrderModel.findById(orderId)
      .populate(
        "deliveryBoy",
        "name phone vehicleType vehicleNumber isAvailable currentLocation",
      )
      .populate("user", "name email phone")
      .populate("address");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Order assignment details fetched successfully",

      assignment: {
        orderId: order._id,

        orderStatus: order.orderStatus,

        deliveryBoy: order.deliveryBoy,
      },

      order,
    });
  } catch (error) {
    console.error("Get Order Assignment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch assignment details",
      error: error.message,
    });
  }
};

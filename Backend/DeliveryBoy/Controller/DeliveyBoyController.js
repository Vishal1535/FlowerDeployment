import mongoose from "mongoose";

import DeliveryBoyModel from "../Model/DeliveryBoyModel.js";
import OrderModel from "../../User/Model/OrderModel.js";
import sendEmail from "../../configs/nodemailer.js";

// =================================================
// GET MY DELIVERY BOY PROFILE
// =================================================

export const GetMyDeliveryBoyProfile = async (req, res) => {
  try {
    // =================================================
    // USER LOGIN CHECK
    // =================================================

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // =================================================
    // ROLE CHECK
    // =================================================

    if (req.role !== "deliveryBoy") {
      return res.status(403).json({
        success: false,
        message: "Only delivery boy can access this",
      });
    }

    // =================================================
    // FIND DELIVERY BOY
    // =================================================

    const deliveryBoy = await DeliveryBoyModel.findOne({
      user: req.id,
    }).populate("user", "name email phone role isVerified");

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery boy profile fetched successfully",
      deliveryBoy,
    });
  } catch (error) {
    console.error("Get Delivery Boy Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

// =================================================
// GET MY ASSIGNED ORDERS
// =================================================

export const GetMyAssignedOrders = async (req, res) => {
  try {
    // =================================================
    // LOGIN CHECK
    // =================================================

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // =================================================
    // ROLE CHECK
    // =================================================

    if (req.role !== "deliveryBoy") {
      return res.status(403).json({
        success: false,
        message: "Only delivery boy can access orders",
      });
    }

    // =================================================
    // FIND DELIVERY BOY
    // =================================================

    const deliveryBoy = await DeliveryBoyModel.findOne({
      user: req.id,
    });

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy profile not found",
      });
    }

    // =================================================
    // FIND ORDERS
    // =================================================

    const orders = await OrderModel.find({
      deliveryBoy: deliveryBoy._id,
    })
      .populate("user", "name email phone")
      .populate("address")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      message: "Assigned orders fetched successfully",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get My Assigned Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch assigned orders",
      error: error.message,
    });
  }
};

// =================================================
// GET SINGLE ASSIGNED ORDER
// =================================================

export const GetMySingleOrder = async (req, res) => {
  try {
    // =================================================
    // LOGIN CHECK
    // =================================================

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // =================================================
    // ROLE CHECK
    // =================================================

    if (req.role !== "deliveryBoy") {
      return res.status(403).json({
        success: false,
        message: "Only delivery boy can access order",
      });
    }

    const { id } = req.params;

    // =================================================
    // ORDER ID VALIDATION
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    // =================================================
    // FIND DELIVERY BOY
    // =================================================

    const deliveryBoy = await DeliveryBoyModel.findOne({
      user: req.id,
    });

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy profile not found",
      });
    }

    // =================================================
    // FIND ORDER
    // =================================================

    const order = await OrderModel.findOne({
      _id: id,
      deliveryBoy: deliveryBoy._id,
    })
      .populate("user", "name email phone")
      .populate("address")
      .populate(
        "deliveryBoy",
        "name phone vehicleType vehicleNumber currentLocation",
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Assigned order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Get My Single Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// =================================================
// ACCEPT ORDER
// =================================================

// Admin assignment ke baad delivery boy order accept karega.
//
// Order:
// shipped / processing -> out_for_delivery
//
// Delivery boy:
// available -> busy
//
// Customer ko email:
// Order Out for Delivery
// Delivery boy name
// Delivery boy phone
// =================================================

export const AcceptOrder = async (req, res) => {
  try {
    // =================================================
    // LOGIN CHECK
    // =================================================

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // =================================================
    // ROLE CHECK
    // =================================================

    if (req.role !== "deliveryBoy") {
      return res.status(403).json({
        success: false,
        message: "Only delivery boy can accept order",
      });
    }

    const { id } = req.params;

    // =================================================
    // ORDER ID VALIDATION
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    // =================================================
    // FIND DELIVERY BOY
    // =================================================

    const deliveryBoy = await DeliveryBoyModel.findOne({
      user: req.id,
    }).populate("user", "name email phone");

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy profile not found",
      });
    }

    // =================================================
    // FIND ASSIGNED ORDER
    // =================================================

    const order = await OrderModel.findOne({
      _id: id,
      deliveryBoy: deliveryBoy._id,
    }).populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order is not assigned to you",
      });
    }

    // =================================================
    // ORDER STATUS CHECK
    // =================================================

    if (order.orderStatus !== "shipped" && order.orderStatus !== "processing") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be accepted in current status",
      });
    }

    // =================================================
    // UPDATE ORDER
    // =================================================

    order.orderStatus = "out_for_delivery";
    order.statusChangedAt = new Date();

    await order.save();

    // =================================================
    // DELIVERY BOY BUSY
    // =================================================

    deliveryBoy.isAvailable = false;

    await deliveryBoy.save();

    // =================================================
    // DELIVERY BOY DETAILS
    // =================================================

    const deliveryBoyName =
      deliveryBoy?.user?.name || deliveryBoy?.name || "Our Delivery Partner";

    const deliveryBoyPhone =
      deliveryBoy?.user?.phone || deliveryBoy?.phone || "Not available";

    // =================================================
    // CUSTOMER EMAIL
    // =================================================

    if (order?.user?.email) {
      try {
        await sendEmail({
          to: order.user.email,

          subject: "Your Flower Order Is Out for Delivery 🚚",

          html: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 20px;
              background-color: #ffffff;
              border: 1px solid #f3d6e0;
              border-radius: 12px;
            ">

              <h2 style="
                color: #e91e63;
                margin-bottom: 10px;
              ">
                Your Order Is Out for Delivery 🚚
              </h2>

              <p>
                Hi ${order.user.name || "there"},
              </p>

              <p>
                Good news! Your Flower order is now
                <strong>Out for Delivery</strong>.
              </p>

              <div style="
                background-color: #fff3f7;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
              ">

                <p style="margin: 5px 0;">
                  📦
                  <strong>
                    Good news! Your order is on its way and is expected to be delivered today.
                  </strong>
                </p>

                <p style="margin: 5px 0;">
                  Please keep your phone available so our
                  delivery partner can contact you if required.
                </p>

              </div>

              <hr style="
                border: none;
                border-top: 1px solid #eeeeee;
                margin: 20px 0;
              " />

              <h3 style="color: #444444;">
                Delivery Partner Details
              </h3>

              <p>
                <strong>Name:</strong>
                ${deliveryBoyName}
              </p>

              <p>
                <strong>Phone:</strong>
                ${deliveryBoyPhone}
              </p>

              <p>
                <strong>Order Status:</strong>

                <span style="
                  color: #e91e63;
                  font-weight: bold;
                ">
                  Out for Delivery
                </span>
              </p>

              <p style="
                margin-top: 25px;
                color: #777777;
                font-size: 14px;
              ">
                Thank you for shopping with Flower 💐
              </p>

            </div>
          `,
        });

        console.log("✅ Out for delivery email sent to:", order.user.email);
      } catch (emailError) {
        console.error("❌ Out for Delivery Email Error:", emailError);
      }
    } else {
      console.log("❌ Customer email not found for order:", order._id);
    }

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,
      message: "Order accepted successfully and customer notified",

      order,

      deliveryBoy: {
        name: deliveryBoyName,
        phone: deliveryBoyPhone,
        isAvailable: deliveryBoy.isAvailable,
      },
    });
  } catch (error) {
    console.error("Accept Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to accept order",
      error: error.message,
    });
  }
};

// =================================================
// UPDATE DELIVERY BOY LOCATION
// =================================================

export const UpdateMyLocation = async (req, res) => {
  try {
    // =================================================
    // LOGIN CHECK
    // =================================================

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // =================================================
    // ROLE CHECK
    // =================================================

    if (req.role !== "deliveryBoy") {
      return res.status(403).json({
        success: false,
        message: "Only delivery boy can update location",
      });
    }

    const { latitude, longitude } = req.body;

    // =================================================
    // PARSE LOCATION
    // =================================================

    const parsedLatitude = Number(latitude);
    const parsedLongitude = Number(longitude);

    // =================================================
    // VALIDATION
    // =================================================

    if (!Number.isFinite(parsedLatitude) || !Number.isFinite(parsedLongitude)) {
      return res.status(400).json({
        success: false,
        message: "Valid latitude and longitude are required",
      });
    }

    if (parsedLatitude < -90 || parsedLatitude > 90) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude",
      });
    }

    if (parsedLongitude < -180 || parsedLongitude > 180) {
      return res.status(400).json({
        success: false,
        message: "Invalid longitude",
      });
    }

    // =================================================
    // FIND DELIVERY BOY
    // =================================================

    const deliveryBoy = await DeliveryBoyModel.findOne({
      user: req.id,
    });

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy profile not found",
      });
    }

    // =================================================
    // UPDATE LOCATION
    // =================================================

    deliveryBoy.currentLocation = {
      latitude: parsedLatitude,
      longitude: parsedLongitude,
    };

    await deliveryBoy.save();

    return res.status(200).json({
      success: true,
      message: "Location updated successfully",
      currentLocation: deliveryBoy.currentLocation,
    });
  } catch (error) {
    console.error("Update My Location Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update location",
      error: error.message,
    });
  }
};

// =================================================
// MARK ORDER AS DELIVERED
// =================================================

// Delivery boy delivery complete karega.
//
// Order:
// out_for_delivery -> delivered
//
// Delivery boy:
// busy -> available
//
// completedDeliveries +1
// totalDeliveries +1
//
// Customer ko email:
// Order Delivered
// Delivery boy name
// Delivery boy phone
// =================================================

export const MarkOrderDelivered = async (req, res) => {
  try {
    // =================================================
    // LOGIN CHECK
    // =================================================

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // =================================================
    // ROLE CHECK
    // =================================================

    if (req.role !== "deliveryBoy") {
      return res.status(403).json({
        success: false,
        message: "Only delivery boy can mark order delivered",
      });
    }

    const { id } = req.params;

    // =================================================
    // ORDER ID VALIDATION
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    // =================================================
    // FIND DELIVERY BOY
    // =================================================

    const deliveryBoy = await DeliveryBoyModel.findOne({
      user: req.id,
    }).populate("user", "name email phone");

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy profile not found",
      });
    }

    // =================================================
    // FIND ORDER
    // =================================================

    const order = await OrderModel.findOne({
      _id: id,
      deliveryBoy: deliveryBoy._id,
    }).populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order is not assigned to you",
      });
    }

    // =================================================
    // STATUS CHECK
    // =================================================

    if (order.orderStatus !== "out_for_delivery") {
      return res.status(400).json({
        success: false,
        message: "Only out for delivery order can be marked delivered",
      });
    }

    // =================================================
    // UPDATE ORDER
    // =================================================

    order.orderStatus = "delivered";
    order.statusChangedAt = new Date();

    await order.save();

    // =================================================
    // UPDATE DELIVERY BOY
    // =================================================

    deliveryBoy.isAvailable = true;

    deliveryBoy.totalDeliveries += 1;

    deliveryBoy.completedDeliveries += 1;

    await deliveryBoy.save();

    // =================================================
    // DELIVERY BOY DETAILS
    // =================================================

    const deliveryBoyName =
      deliveryBoy?.user?.name || deliveryBoy?.name || "Our Delivery Partner";

    const deliveryBoyPhone =
      deliveryBoy?.user?.phone || deliveryBoy?.phone || "Not available";

    // =================================================
    // CUSTOMER EMAIL
    // =================================================

    if (order?.user?.email) {
      try {
        await sendEmail({
          to: order.user.email,

          subject: "Your Flower Order Has Been Delivered 💐",

          html: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 20px;
              background-color: #ffffff;
              border: 1px solid #f3d6e0;
              border-radius: 12px;
            ">

              <h2 style="
                color: #e91e63;
                margin-bottom: 10px;
              ">
                Order Delivered Successfully 💐
              </h2>

              <p>
                Hi ${order.user.name || "there"},
              </p>

              <p>
                Great news! Your Flower order has been
                <strong>successfully delivered</strong>.
              </p>

              <div style="
                background-color: #f1fff3;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
              ">

                <p style="margin: 5px 0;">
                  📦
                  <strong>Your order has been delivered successfully.</strong>
                </p>

                <p style="margin: 5px 0;">
                  <strong>Order Status:</strong>

                  <span style="
                    color: #2e7d32;
                    font-weight: bold;
                  ">
                    Delivered
                  </span>
                </p>

              </div>

              <h3 style="color: #444444;">
                Delivery Partner Details
              </h3>

              <p>
                <strong>Name:</strong>
                ${deliveryBoyName}
              </p>

              <p>
                <strong>Phone:</strong>
                ${deliveryBoyPhone}
              </p>

              <p>
                We hope you enjoyed your order. ❤️
              </p>

              <p>
                Thank you for shopping with
                <strong>Flower</strong> 💐
              </p>

              <p style="
                margin-top: 25px;
                color: #777777;
                font-size: 13px;
              ">
                Your order has been marked as delivered.
              </p>

            </div>
          `,
        });

        console.log("✅ Delivered email sent to:", order.user.email);
      } catch (emailError) {
        console.error("❌ Order Delivered Email Error:", emailError);
      }
    } else {
      console.log("❌ Customer email not found for order:", order._id);
    }

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,
      message: "Order delivered successfully and customer notified",

      order,

      deliveryBoy: {
        name: deliveryBoyName,
        phone: deliveryBoyPhone,
        isAvailable: deliveryBoy.isAvailable,
        totalDeliveries: deliveryBoy.totalDeliveries,
        completedDeliveries: deliveryBoy.completedDeliveries,
      },
    });
  } catch (error) {
    console.error("Mark Order Delivered Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to mark order delivered",
      error: error.message,
    });
  }
};

// =================================================
// GET DELIVERY STATISTICS
// =================================================

export const GetMyDeliveryStats = async (req, res) => {
  try {
    // =================================================
    // LOGIN CHECK
    // =================================================

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // =================================================
    // ROLE CHECK
    // =================================================

    if (req.role !== "deliveryBoy") {
      return res.status(403).json({
        success: false,
        message: "Only delivery boy can view statistics",
      });
    }

    // =================================================
    // FIND DELIVERY BOY
    // =================================================

    const deliveryBoy = await DeliveryBoyModel.findOne({
      user: req.id,
    });

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery statistics fetched successfully",

      statistics: {
        totalDeliveries: deliveryBoy.totalDeliveries,

        completedDeliveries: deliveryBoy.completedDeliveries,

        cancelledDeliveries: deliveryBoy.cancelledDeliveries,

        isAvailable: deliveryBoy.isAvailable,

        currentLocation: deliveryBoy.currentLocation,
      },
    });
  } catch (error) {
    console.error("Get Delivery Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch delivery statistics",
      error: error.message,
    });
  }
};

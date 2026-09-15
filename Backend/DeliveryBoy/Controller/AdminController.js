import mongoose from "mongoose";

import userModel from "../../models/User.js";
import DeliveryBoyModel from "../Model/DeliveryBoyModel.js";

// CREATE DELIVERY BOY

// Admin panel se delivery boy ka account create hoga.
//
// Body:
// {
//   name,
//   email,
//   phone,
//   password,
//   vehicleType,
//   vehicleNumber
// }
//
// Is controller mein User + DeliveryBoy dono create honge.

export const CreateDeliveryBoy = async (req, res) => {
  try {
    // ADMIN CHECK

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can create delivery boy",
      });
    }

    // REQUEST BODY

    const { name, email, phone, password, vehicleType, vehicleNumber } =
      req.body;

    // REQUIRED FIELDS

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone and password are required",
      });
    }

    // CHECK EXISTING USER

    const existingUser = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // CREATE USER ACCOUNT

    //
    // IMPORTANT:
    // Password ko plain text mein save mat karna.
    //
    // Tumhare project mein register controller already
    // bcrypt use karta hai.
    //
    // Isliye yahan bhi bcrypt use karna hai.

    const bcrypt = (await import("bcryptjs")).default;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name: name.trim(),

      email: email.toLowerCase().trim(),

      phone: phone.trim(),

      password: hashedPassword,

      role: "deliveryBoy",

      isVerified: true,
    });

    // CREATE DELIVERY BOY PROFILE

    const deliveryBoy = await DeliveryBoyModel.create({
      user: newUser._id,

      name: name.trim(),

      phone: phone.trim(),

      isAvailable: true,

      vehicleType: vehicleType || "bike",

      vehicleNumber: vehicleNumber ? vehicleNumber.trim() : "",
    });

    // RESPONSE

   return res.status(201).json({
  success: true,
  message: "Delivery boy created successfully",

  deliveryBoy: {
    _id: deliveryBoy._id,
    user: {
      _id: newUser._id,
      email: newUser.email,
    },

    name: deliveryBoy.name,
    phone: deliveryBoy.phone,
    role: newUser.role,
    isAvailable: deliveryBoy.isAvailable,
    vehicleType: deliveryBoy.vehicleType,
    vehicleNumber: deliveryBoy.vehicleNumber,
  },
});
  } catch (error) {
    console.error("Create Delivery Boy Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create delivery boy",
      error: error.message,
    });
  }
};

// GET ALL DELIVERY BOYS

export const GetAllDeliveryBoys = async (req, res) => {
  try {
    // ADMIN CHECK

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can view delivery boys",
      });
    }

    // GET DELIVERY BOYS

    const deliveryBoys = await DeliveryBoyModel.find()
      .populate("user", "name email phone role isVerified")
      .sort({
        createdAt: -1,
      });

    // RESPONSE

    return res.status(200).json({
      success: true,

      message: "Delivery boys fetched successfully",

      count: deliveryBoys.length,

      deliveryBoys,
    });
  } catch (error) {
    console.error("Get All Delivery Boys Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch delivery boys",
      error: error.message,
    });
  }
};

// GET SINGLE DELIVERY BOY

export const GetSingleDeliveryBoy = async (req, res) => {
  try {
    // ADMIN CHECK

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can view delivery boy",
      });
    }

    const { id } = req.params;

    // ID VALIDATION

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery boy ID",
      });
    }

    // FIND DELIVERY BOY

    const deliveryBoy = await DeliveryBoyModel.findById(id).populate(
      "user",
      "name email phone role isVerified",
    );

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy not found",
      });
    }

    // RESPONSE

    return res.status(200).json({
      success: true,

      message: "Delivery boy fetched successfully",

      deliveryBoy,
    });
  } catch (error) {
    console.error("Get Single Delivery Boy Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch delivery boy",
      error: error.message,
    });
  }
};

// UPDATE DELIVERY BOY

export const UpdateDeliveryBoy = async (req, res) => {
  try {
    // =====================================================
    // ADMIN CHECK
    // =====================================================

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can update delivery boy",
      });
    }

    // =====================================================
    // ID
    // =====================================================

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery boy ID",
      });
    }

    // =====================================================
    // REQUEST BODY
    // =====================================================

    const {
      name,
      phone,
      vehicleType,
      vehicleNumber,
    } = req.body;

    // =====================================================
    // FIND DELIVERY BOY
    // =====================================================

    const deliveryBoy =
      await DeliveryBoyModel.findById(id);

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy not found",
      });
    }

    // =====================================================
    // UPDATE DELIVERY BOY
    // =====================================================

    if (name !== undefined) {
      deliveryBoy.name = String(name).trim();
    }

    if (phone !== undefined) {
      deliveryBoy.phone = String(phone).trim();
    }

    if (vehicleType !== undefined) {
      const allowedVehicleTypes = [
        "bike",
        "scooter",
        "cycle",
        "other",
      ];

      if (!allowedVehicleTypes.includes(vehicleType)) {
        return res.status(400).json({
          success: false,
          message: "Invalid vehicle type",
        });
      }

      deliveryBoy.vehicleType = vehicleType;
    }

    if (vehicleNumber !== undefined) {
      deliveryBoy.vehicleNumber =
        String(vehicleNumber).trim();
    }

    await deliveryBoy.save();

    // =====================================================
    // UPDATE USER DETAILS
    // =====================================================

    const user = await userModel.findById(
      deliveryBoy.user
    );

    if (user) {
      if (name !== undefined) {
        user.name = String(name).trim();
      }

      if (phone !== undefined) {
        user.phone = String(phone).trim();
      }

      await user.save();
    }

    // =====================================================
    // GET UPDATED DATA WITH USER
    // =====================================================

    const updatedDeliveryBoy =
      await DeliveryBoyModel.findById(id)
        .populate(
          "user",
          "name email phone role"
        );

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      message:
        "Delivery boy updated successfully",

      deliveryBoy: updatedDeliveryBoy,
    });
  } catch (error) {
    console.error(
      "Update Delivery Boy Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to update delivery boy",

      error: error.message,
    });
  }
};
// UPDATE DELIVERY BOY AVAILABILITY

//
// true  = Available
// false = Busy
//
// Admin manually status change kar sakta hai.

export const UpdateDeliveryBoyAvailability = async (req, res) => {
  try {
    // ADMIN CHECK

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can change availability",
      });
    }

    const { id } = req.params;

    const { isAvailable } = req.body;

    // ID VALIDATION

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery boy ID",
      });
    }

    // STATUS VALIDATION

    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isAvailable must be true or false",
      });
    }

    // UPDATE

    const deliveryBoy = await DeliveryBoyModel.findByIdAndUpdate(
      id,
      {
        isAvailable,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy not found",
      });
    }

    // RESPONSE

    return res.status(200).json({
      success: true,

      message: isAvailable
        ? "Delivery boy is now available"
        : "Delivery boy is now busy",

      isAvailable: deliveryBoy.isAvailable,
    });
  } catch (error) {
    console.error("Update Availability Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update availability",
      error: error.message,
    });
  }
};

// DELETE DELIVERY BOY

// DeliveryBoy profile + User login account dono delete.

export const DeleteDeliveryBoy = async (req, res) => {
  try {
    // ADMIN CHECK

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete delivery boy",
      });
    }

    const { id } = req.params;

    // ID VALIDATION

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery boy ID",
      });
    }

    // FIND DELIVERY BOY

    const deliveryBoy = await DeliveryBoyModel.findById(id);

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery boy not found",
      });
    }

    // DELETE USER ACCOUNT

    await userModel.findByIdAndDelete(deliveryBoy.user);

    // DELETE DELIVERY BOY PROFILE

    await DeliveryBoyModel.findByIdAndDelete(id);

    // RESPONSE

    return res.status(200).json({
      success: true,

      message: "Delivery boy deleted successfully",
    });
  } catch (error) {
    console.error("Delete Delivery Boy Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete delivery boy",
      error: error.message,
    });
  }
};

import FlowerInBoxModel from "../models/FlowerInBoxModel.js";

// Add Flower In Box
export const addFlowerInBox = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      image,
      flowerType,
      boxType,
      color,
      occasion,
      size,
      stock,
      isAvailable,
      isFeatured,
    } = req.body;

    // ================= REQUIRED FIELDS =================

    if (
      !name ||
      !description ||
      price === undefined ||
      !image ||
      !flowerType ||
      !boxType ||
      !color
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ================= CREATE =================

    const flowerInBox = await FlowerInBoxModel.create({
      name,
      description,
      price,
      discountPrice,
      image,
      flowerType,
      boxType,
      color,
      occasion,
      size,
      stock,
      isAvailable,
      isFeatured,
    });

    return res.status(201).json({
      success: true,
      message: "Flower in box added successfully",
      flowerInBox,
    });
  } catch (error) {
    console.error("Add Flower In Box Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add flower in box",
      error: error.message,
    });
  }
};

// Get All Flowers In Box
export const getAllFlowerInBox = async (req, res) => {
  try {
    const flowersInBox = await FlowerInBoxModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: flowersInBox.length,
      flowersInBox,
    });
  } catch (error) {
    console.error("Get All Flower In Box Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get flowers in box",
      error: error.message,
    });
  }
};

// Get Single Flower In Box
export const getSingleFlowerInBox = async (req, res) => {
  try {
    const { id } = req.params;

    const flowerInBox = await FlowerInBoxModel.findById(id);

    if (!flowerInBox) {
      return res.status(404).json({
        success: false,
        message: "Flower in box not found",
      });
    }

    return res.status(200).json({
      success: true,
      flowerInBox,
    });
  } catch (error) {
    console.error("Get Single Flower In Box Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get flower in box",
      error: error.message,
    });
  }
};

// Update Flower In Box
// Update Flower In Box
export const updateFlowerInBox = async (req, res) => {
  try {
    const { id } = req.params;

    // ================= FIND FLOWER =================

    const flowerInBox = await FlowerInBoxModel.findById(id);

    if (!flowerInBox) {
      return res.status(404).json({
        success: false,
        message: "Flower in box not found",
      });
    }

    // ================= UPDATE =================

    const updatedFlowerInBox =
      await FlowerInBoxModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        {
          new: true,
          runValidators: true,
        },
      );

    // ================= RESPONSE =================

    return res.status(200).json({
      success: true,
      message: "Flower in box updated successfully",
      flowerInBox: updatedFlowerInBox,
    });
  } catch (error) {
    console.error(
      "Update Flower In Box Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update flower in box",
      error: error.message,
    });
  }
};
// Delete Flower In Box
export const deleteFlowerInBox = async (req, res) => {
  try {
    const { id } = req.params;

    const flowerInBox = await FlowerInBoxModel.findById(id);

    if (!flowerInBox) {
      return res.status(404).json({
        success: false,
        message: "Flower in box not found",
      });
    }

    await FlowerInBoxModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Flower in box deleted successfully",
    });
  } catch (error) {
    console.error("Delete Flower In Box Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete flower in box",
      error: error.message,
    });
  }
};

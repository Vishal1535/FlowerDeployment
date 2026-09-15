import FlowerInSleeveModel from "../models/FlowerInSleeveModel.js";

// Add Flower In Sleeve
export const addFlowerInSleeve = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      flowerType,
      sleeveType,
      color,
      occasion,
      size,
      discountPrice,
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
      !sleeveType ||
      !color
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ================= OCCASION =================

    const formattedOccasion = Array.isArray(occasion)
      ? occasion.filter((item) => item?.trim() !== "")
      : [];

    // ================= CREATE =================

    const flowerInSleeve = await FlowerInSleeveModel.create({
      name,
      description,
      price,
      image,
      flowerType,
      sleeveType,
      color,

      // Optional fields
      occasion: formattedOccasion,

      ...(discountPrice !== undefined &&
        discountPrice !== "" && {
          discountPrice,
        }),

      ...(size && {
        size,
      }),

      ...(stock !== undefined &&
        stock !== "" && {
          stock,
        }),

      ...(isAvailable !== undefined && {
        isAvailable,
      }),

      ...(isFeatured !== undefined && {
        isFeatured,
      }),
    });

    return res.status(201).json({
      success: true,
      message: "Flower in sleeve added successfully",
      flowerInSleeve,
    });
  } catch (error) {
    console.error("Add Flower In Sleeve Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add flower in sleeve",
      error: error.message,
    });
  }
};

// Get All Flowers In Sleeve
export const getAllFlowerInSleeve = async (req, res) => {
  try {
    const flowersInSleeve = await FlowerInSleeveModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: flowersInSleeve.length,
      flowersInSleeve,
    });
  } catch (error) {
    console.error("Get All Flower In Sleeve Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get flowers in sleeve",
      error: error.message,
    });
  }
};

// Get Single Flower In Sleeve
export const getSingleFlowerInSleeve = async (req, res) => {
  try {
    const { id } = req.params;

    const flowerInSleeve = await FlowerInSleeveModel.findById(id);

    if (!flowerInSleeve) {
      return res.status(404).json({
        success: false,
        message: "Flower in sleeve not found",
      });
    }

    return res.status(200).json({
      success: true,
      flowerInSleeve,
    });
  } catch (error) {
    console.error("Get Single Flower In Sleeve Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get flower in sleeve",
      error: error.message,
    });
  }
};

// Update Flower In Sleeve
export const updateFlowerInSleeve = async (req, res) => {
  try {
    const { id } = req.params;

    // ================= FIND FLOWER =================

    const flowerInSleeve = await FlowerInSleeveModel.findById(id);

    if (!flowerInSleeve) {
      return res.status(404).json({
        success: false,
        message: "Flower in sleeve not found",
      });
    }

    const {
      name,
      description,
      price,
      image,
      flowerType,
      sleeveType,
      color,
      occasion,
      size,
      discountPrice,
      stock,
      isAvailable,
      isFeatured,
    } = req.body;

    // ================= REQUIRED FIELDS =================

    if (
      name === "" ||
      description === "" ||
      image === "" ||
      flowerType === "" ||
      sleeveType === "" ||
      color === "" ||
      price === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields cannot be empty",
      });
    }

    // ================= UPDATE DATA =================

    const updateData = {};

    // Required fields
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined && price !== "") {
      updateData.price = price;
    }
    if (image !== undefined) updateData.image = image;
    if (flowerType !== undefined) updateData.flowerType = flowerType;
    if (sleeveType !== undefined) updateData.sleeveType = sleeveType;
    if (color !== undefined) updateData.color = color;

    // ================= OCCASION =================

    if (occasion !== undefined) {
      updateData.occasion = Array.isArray(occasion)
        ? occasion.filter((item) => item?.trim() !== "")
        : [];
    }

    // ================= OPTIONAL FIELDS =================

    if (discountPrice !== undefined && discountPrice !== "") {
      updateData.discountPrice = discountPrice;
    }

    // Size empty nahi hona chahiye
    if (size !== undefined && size !== "") {
      updateData.size = size;
    }

    if (stock !== undefined && stock !== "") {
      updateData.stock = stock;
    }

    if (isAvailable !== undefined) {
      updateData.isAvailable = isAvailable;
    }

    if (isFeatured !== undefined) {
      updateData.isFeatured = isFeatured;
    }

    // ================= UPDATE =================

    const updatedFlowerInSleeve =
      await FlowerInSleeveModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        },
      );

    return res.status(200).json({
      success: true,
      message: "Flower in sleeve updated successfully",
      flowerInSleeve: updatedFlowerInSleeve,
    });
  } catch (error) {
    console.error("Update Flower In Sleeve Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update flower in sleeve",
      error: error.message,
    });
  }
};
// Delete Flower In Sleeve
export const deleteFlowerInSleeve = async (req, res) => {
  try {
    const { id } = req.params;

    const flowerInSleeve = await FlowerInSleeveModel.findById(id);

    if (!flowerInSleeve) {
      return res.status(404).json({
        success: false,
        message: "Flower in sleeve not found",
      });
    }

    await FlowerInSleeveModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Flower in sleeve deleted successfully",
    });
  } catch (error) {
    console.error("Delete Flower In Sleeve Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete flower in sleeve",
      error: error.message,
    });
  }
};

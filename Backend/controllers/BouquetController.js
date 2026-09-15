import bouquetModel from "../models/Bouquet.js";

export const createBouquet = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      occasion,
      size,
      stock,
      category,
      flowerCount,
      flowers,
      isAvailable,
    } = req.body;

    // Required fields check
    if (
      !name ||
      !description ||
      price === undefined ||
      !image ||
      !occasion ||
      !size ||
      stock === undefined ||
      !category ||
      flowerCount === undefined ||
      !flowers
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are required",
      });
    }

    // Size validation
    if (!["Small", "Medium", "Large"].includes(size)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bouquet size",
      });
    }

    // Flower count validation
    if (Number(flowerCount) < 1) {
      return res.status(400).json({
        success: false,
        message: "Flower count must be at least 1",
      });
    }

    // Flowers validation
    if (!Array.isArray(flowers) || flowers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one flower is required",
      });
    }

    // Create bouquet
    const bouquet = await bouquetModel.create({
      name,
      description,
      price: Number(price),
      image,
      occasion,
      size,
      stock: Number(stock),
      category,

      flowerCount: Number(flowerCount),

      flowers: flowers.map((flower) => String(flower).trim()),

      isAvailable: isAvailable !== undefined ? isAvailable : true,

      createdBy: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Bouquet created successfully",
      bouquet,
    });
  } catch (error) {
    console.error("Create Bouquet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create bouquet",
      error: error.message,
    });
  }
};

export const updateBouquet = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      image,
      occasion,
      size,
      stock,
      category,
      flowerCount,
      flowers,
      isAvailable,
    } = req.body;

    // Find bouquet
    const bouquet = await bouquetModel.findById(id);

    if (!bouquet) {
      return res.status(404).json({
        success: false,
        message: "Bouquet not found",
      });
    }

    // Size validation
    if (size !== undefined && !["Small", "Medium", "Large"].includes(size)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bouquet size",
      });
    }

    // Flower count validation
    if (flowerCount !== undefined && Number(flowerCount) < 1) {
      return res.status(400).json({
        success: false,
        message: "Flower count must be at least 1",
      });
    }

    // Flowers validation
    if (flowers !== undefined) {
      if (!Array.isArray(flowers) || flowers.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one flower is required",
        });
      }

      bouquet.flowers = flowers.map((flower) => String(flower).trim());
    }

    // Update only provided fields

    if (name !== undefined) {
      bouquet.name = name;
    }

    if (description !== undefined) {
      bouquet.description = description;
    }

    if (price !== undefined) {
      bouquet.price = Number(price);
    }

    if (image !== undefined) {
      bouquet.image = image;
    }

    if (occasion !== undefined) {
      bouquet.occasion = occasion;
    }

    if (size !== undefined) {
      bouquet.size = size;
    }

    if (stock !== undefined) {
      bouquet.stock = Number(stock);
    }

    if (category !== undefined) {
      bouquet.category = category;
    }

    if (flowerCount !== undefined) {
      bouquet.flowerCount = Number(flowerCount);
    }

    if (isAvailable !== undefined) {
      bouquet.isAvailable = isAvailable;
    }

    // Save updated bouquet
    const updatedBouquet = await bouquet.save();

    return res.status(200).json({
      success: true,
      message: "Bouquet updated successfully",
      bouquet: updatedBouquet,
    });
  } catch (error) {
    console.error("Update Bouquet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update bouquet",
      error: error.message,
    });
  }
};
export const deleteBouquet = async (req, res) => {
  try {
    const { id } = req.params;

    const bouquet = await bouquetModel.findById(id);

    if (!bouquet) {
      return res.status(404).json({
        success: false,
        message: "Bouquet not found",
      });
    }

    await bouquetModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Bouquet deleted successfully",
    });
  } catch (error) {
    console.error("Delete Bouquet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete bouquet",
      error: error.message,
    });
  }
};
export const getAllBouquets = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const bouquets = await bouquetModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBouquets = await bouquetModel.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Bouquets fetched successfully",
      bouquets,
      currentPage: page,
      limit,
      totalPages: Math.ceil(totalBouquets / limit),
      totalBouquets,
    });
  } catch (error) {
    console.error("Get All Bouquets Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bouquets",
      error: error.message,
    });
  }
};
export const getSingleBouquet = async (req, res) => {
  try {
    const { id } = req.params;

    const bouquet = await bouquetModel.findById(id);

    if (!bouquet) {
      return res.status(404).json({
        success: false,
        message: "Bouquet not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bouquet fetched successfully",
      bouquet,
    });
  } catch (error) {
    console.error("Get Single Bouquet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bouquet",
      error: error.message,
    });
  }
};
export const getBouquetsForHero = async (req, res) => {
  try {
    const bouquets = await bouquetModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bouquets,
    });
  } catch (error) {
    console.error("Get Hero Bouquets Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch hero bouquets",
    });
  }
};

import flowerModel from "../models/Flower.js";
import bouquetModel from "../models/Bouquet.js";
export const createFlower = async (req, res) => {
  try {
    const { name, description, price, image, color, stock, category } =
      req.body;

    // Check if flower already exists
    const alreadyFlower = await flowerModel.findOne({ name });

    if (alreadyFlower) {
      return res.status(400).json({
        success: false,
        message: "Flower already exists",
      });
    }

    // Create flower
    const flower = await flowerModel.create({
      name,
      description,
      price,
      image,
      color,
      stock,
      category,
      createdBy: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Flower created successfully",
      flower,
    });
  } catch (error) {
    console.error("Create Flower Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create flower",
      error: error.message,
    });
  }
};
export const deleteFlower = async (req, res) => {
  try {
    const { id } = req.params;

    const flower = await flowerModel.findById(id);

    if (!flower) {
      return res.status(404).json({
        success: false,
        message: "Flower not found",
      });
    }

    await flowerModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Flower deleted successfully",
    });
  } catch (error) {
    console.error("Delete Flower Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete flower",
      error: error.message,
    });
  }
};

export const updateFlower = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, price, image, color, stock, category } =
      req.body;

    const flower = await flowerModel.findById(id);

    if (!flower) {
      return res.status(404).json({
        success: false,
        message: "Flower not found",
      });
    }

    flower.name = name || flower.name;
    flower.description = description || flower.description;
    flower.price = price || flower.price;
    flower.image = image || flower.image;
    flower.color = color || flower.color;
    flower.stock = stock ?? flower.stock;
    flower.category = category || flower.category;

    await flower.save();

    return res.status(200).json({
      success: true,
      message: "Flower updated successfully",
      flower,
    });
  } catch (error) {
    console.error("Update Flower Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update flower",
      error: error.message,
    });
  }
};

export const getAllFlowers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;

    const skip = (page - 1) * limit;

    const flowers = await flowerModel
      .find({ isAvailable: true })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalFlowers = await flowerModel.countDocuments({
      isAvailable: true,
    });

    return res.status(200).json({
      success: true,
      flowers,
      currentPage: page,
      totalPages: Math.ceil(totalFlowers / limit),
      totalFlowers,
    });
  } catch (error) {
    console.error("Get Flowers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch flowers",
    });
  }
};

export const SingleFlower = async (req, res) => {
  try {
    const { id } = req.params;

    const flower = await flowerModel.findById(id);

    if (!flower) {
      return res.status(404).json({
        success: false,
        message: "Flower not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Flower fetched successfully",
      flower,
    });
  } catch (error) {
    console.error("Single Flower Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch flower",
      error: error.message,
    });
  }
};
export const getAllAvailableFlowers = async (req, res) => {
  try {
    
    
    const flowers = await flowerModel
      .find({ isAvailable: true })
      .sort({ createdAt: -1 });
      
      


    return res.status(200).json({
      success: true,
      flowers,
      totalFlowers: flowers.length,
    });
  } catch (error) {
    console.error("Get All Available Flowers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch all flowers",
    });
  }
};


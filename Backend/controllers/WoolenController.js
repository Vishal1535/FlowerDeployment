import WoolenModel from "../models/Woolen.js";

// CREATE WOOLEN

export const CreateWoolen = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      occasion,
      category,
      stock,
      isAvailable,
    } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      !image ||
      !occasion ||
      !category ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are required",
      });
    }

    const woolen = await WoolenModel.create({
      name,
      description,
      price,
      image,
      occasion,
      category,
      stock,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      createBy: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Woolen created successfully",
      woolen,
    });
  } catch (error) {
    console.error("Create Woolen Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create woolen",
      error: error.message,
    });
  }
};

// UPDATE WOOLEN

export const UpdateWoolen = async (req, res) => {
  try {
    const { id } = req.params;

    const woolen = await WoolenModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!woolen) {
      return res.status(404).json({
        success: false,
        message: "Woolen not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Woolen updated successfully",
      woolen,
    });
  } catch (error) {
    console.error("Update Woolen Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update woolen",
      error: error.message,
    });
  }
};

// DELETE WOOLEN

export const DeleteWoolen = async (req, res) => {
  try {
    const { id } = req.params;

    const woolen = await WoolenModel.findByIdAndDelete(id);

    if (!woolen) {
      return res.status(404).json({
        success: false,
        message: "Woolen not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Woolen deleted successfully",
    });
  } catch (error) {
    console.error("Delete Woolen Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete woolen",
      error: error.message,
    });
  }
};

// GET ALL WOOLEN

export const GetAllWoolen = async (req, res) => {
  try {
    const woolens = await WoolenModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      woolens,
    });
  } catch (error) {
    console.error("Get All Woolen Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch woolens",
      error: error.message,
    });
  }
};

// GET SINGLE WOOLEN

export const GetSingleWoolen = async (req, res) => {
  try {
    const { id } = req.params;

    const woolen = await WoolenModel.findById(id);

    if (!woolen) {
      return res.status(404).json({
        success: false,
        message: "Woolen not found",
      });
    }

    return res.status(200).json({
      success: true,
      woolen,
    });
  } catch (error) {
    console.error("Get Single Woolen Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch woolen",
      error: error.message,
    });
  }
};

// GET WOOLEN BY OCCASION

export const GetWoolenByOccasion = async (req, res) => {
  try {
    const { occasion } = req.body;

    if (!occasion) {
      return res.status(400).json({
        success: false,
        message: "Occasion is required",
      });
    }

    const woolens = await WoolenModel.find({
      occasion,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      woolens,
    });
  } catch (error) {
    console.error("Get Woolen By Occasion Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch woolens by occasion",
      error: error.message,
    });
  }
};

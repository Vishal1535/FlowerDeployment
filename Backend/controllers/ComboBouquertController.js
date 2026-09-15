import ComboBouquetModel from "../models/ComboBouquet.js";

// CREATE COMBO BOUQUET

export const CreateComboBouquet = async (req, res) => {
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

    const comboBouquet = await ComboBouquetModel.create({
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
      message: "Combo bouquet created successfully",
      comboBouquet,
    });
  } catch (error) {
    console.error("Create Combo Bouquet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create combo bouquet",
      error: error.message,
    });
  }
};

// UPDATE COMBO BOUQUET

export const UpdateComboBouquet = async (req, res) => {
  try {
    const { id } = req.params;

    const comboBouquet = await ComboBouquetModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!comboBouquet) {
      return res.status(404).json({
        success: false,
        message: "Combo bouquet not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Combo bouquet updated successfully",
      comboBouquet,
    });
  } catch (error) {
    console.error("Update Combo Bouquet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update combo bouquet",
      error: error.message,
    });
  }
};

// DELETE COMBO BOUQUET

export const DeleteComboBouquet = async (req, res) => {
  try {
    const { id } = req.params;

    const comboBouquet = await ComboBouquetModel.findByIdAndDelete(id);

    if (!comboBouquet) {
      return res.status(404).json({
        success: false,
        message: "Combo bouquet not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Combo bouquet deleted successfully",
    });
  } catch (error) {
    console.error("Delete Combo Bouquet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete combo bouquet",
      error: error.message,
    });
  }
};

// GET ALL COMBO BOUQUETS

export const GetAllComboBouquet = async (req, res) => {
  try {
    const comboBouquets = await ComboBouquetModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      comboBouquets,
    });
  } catch (error) {
    console.error("Get All Combo Bouquet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch combo bouquets",
      error: error.message,
    });
  }
};

// GET SINGLE COMBO BOUQUET

export const GetSingleComboBouquet = async (req, res) => {
  try {
    const { id } = req.params;

    const comboBouquet = await ComboBouquetModel.findById(id);

    if (!comboBouquet) {
      return res.status(404).json({
        success: false,
        message: "Combo bouquet not found",
      });
    }

    return res.status(200).json({
      success: true,
      comboBouquet,
    });
  } catch (error) {
    console.error("Get Single Combo Bouquet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch combo bouquet",
      error: error.message,
    });
  }
};

// GET COMBO BOUQUET BY OCCASION

export const GetComboBouquetByOccasion = async (req, res) => {
  try {
    const { occasion } = req.body;

    if (!occasion) {
      return res.status(400).json({
        success: false,
        message: "Occasion is required",
      });
    }

    const comboBouquets = await ComboBouquetModel.find({
      occasion,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comboBouquets,
    });
  } catch (error) {
    console.error("Get Combo Bouquet By Occasion Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch combo bouquets by occasion",
      error: error.message,
    });
  }
};

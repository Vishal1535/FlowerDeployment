import MiniCupcakeModel from "../models/MiniCupCake.js";

export const CreateMiniCupcake = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      occasion,
      flavor,
      quantity,
      stock,
      category,
      isAvailable,
    } = req.body;

    // Required fields validation
    if (
      !name ||
      !description ||
      price === undefined ||
      !image ||
      !occasion ||
      !flavor ||
      quantity === undefined ||
      stock === undefined ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are required",
      });
    }

    // Create mini cupcake
    const miniCupcake = await MiniCupcakeModel.create({
      name,
      description,
      price,
      image,
      occasion,
      flavor,
      quantity,
      stock,
      category,
      isAvailable:
        isAvailable !== undefined ? isAvailable : true,
      createBy: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Mini cupcake created successfully",
      miniCupcake,
    });
  } catch (error) {
    console.error("Create Mini Cupcake Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create mini cupcake",
      error: error.message,
    });
  }
};

export const UpdateMiniCupcake = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      image,
      occasion,
      flavor,
      quantity,
      stock,
      category,
      isAvailable,
    } = req.body;

    const miniCupcake = await MiniCupcakeModel.findById(id);

    if (!miniCupcake) {
      return res.status(404).json({
        success: false,
        message: "Mini cupcake not found",
      });
    }

    if (name !== undefined) miniCupcake.name = name;

    if (description !== undefined) {
      miniCupcake.description = description;
    }

    if (price !== undefined) miniCupcake.price = price;

    if (image !== undefined) miniCupcake.image = image;

    if (occasion !== undefined) {
      miniCupcake.occasion = occasion;
    }

    if (flavor !== undefined) {
      miniCupcake.flavor = flavor;
    }

    if (quantity !== undefined) {
      miniCupcake.quantity = quantity;
    }

    if (stock !== undefined) {
      miniCupcake.stock = stock;
    }

    if (category !== undefined) {
      miniCupcake.category = category;
    }

    if (isAvailable !== undefined) {
      miniCupcake.isAvailable = isAvailable;
    }

    await miniCupcake.save();

    return res.status(200).json({
      success: true,
      message: "Mini cupcake updated successfully",
      miniCupcake,
    });
  } catch (error) {
    console.error("Update Mini Cupcake Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update mini cupcake",
      error: error.message,
    });
  }
};

export const DeleteMiniCupcake = async (req, res) => {
  try {
    const { id } = req.params;

    const miniCupcake = await MiniCupcakeModel.findById(id);

    if (!miniCupcake) {
      return res.status(404).json({
        success: false,
        message: "Mini cupcake not found",
      });
    }

    await MiniCupcakeModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Mini cupcake deleted successfully",
    });
  } catch (error) {
    console.error("Delete Mini Cupcake Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete mini cupcake",
      error: error.message,
    });
  }
};

export const GetAllMiniCupcake = async (req, res) => {
  try {
    const miniCupcakes = await MiniCupcakeModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Mini cupcakes fetched successfully",
      miniCupcakes,
    });
  } catch (error) {
    console.error("Get All Mini Cupcake Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch mini cupcakes",
      error: error.message,
    });
  }
};

export const GetSingleMiniCupcake = async (req, res) => {
  try {
    const { id } = req.params;

    const miniCupcake = await MiniCupcakeModel.findById(id);

    if (!miniCupcake) {
      return res.status(404).json({
        success: false,
        message: "Mini cupcake not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mini cupcake fetched successfully",
      miniCupcake,
    });
  } catch (error) {
    console.error("Get Single Mini Cupcake Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch mini cupcake",
      error: error.message,
    });
  }
};

export const GetMiniCupcakeByOccasion = async (req, res) => {
  try {
    const { occasion } = req.body;

    if (!occasion) {
      return res.status(400).json({
        success: false,
        message: "Occasion is required",
      });
    }

    const miniCupcakes = await MiniCupcakeModel.find({
      occasion: {
        $regex: new RegExp(`^${occasion}$`, "i"),
      },
      isAvailable: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Mini cupcakes fetched successfully",
      miniCupcakes,
    });
  } catch (error) {
    console.error(
      "Get Mini Cupcake By Occasion Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch mini cupcakes by occasion",
      error: error.message,
    });
  }
};
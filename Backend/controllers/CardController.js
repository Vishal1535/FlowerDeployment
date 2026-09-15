import CardModel from "../models/Card.js";

// ================= CREATE CARD =================

export const CreateCard = async (req, res) => {
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
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const card = await CardModel.create({
      name,
      description,
      price,
      image,
      occasion,
      category,
      stock,
      isAvailable,
      createBy: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Card created successfully",
      card,
    });
  } catch (error) {
    console.error("Create Card Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create card",
      error: error.message,
    });
  }
};


// ================= UPDATE CARD =================

export const UpdateCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await CardModel.findById(id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

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

    if (name !== undefined) card.name = name;
    if (description !== undefined) card.description = description;
    if (price !== undefined) card.price = price;
    if (image !== undefined) card.image = image;
    if (occasion !== undefined) card.occasion = occasion;
    if (category !== undefined) card.category = category;
    if (stock !== undefined) card.stock = stock;
    if (isAvailable !== undefined) {
      card.isAvailable = isAvailable;
    }

    await card.save();

    return res.status(200).json({
      success: true,
      message: "Card updated successfully",
      card,
    });
  } catch (error) {
    console.error("Update Card Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update card",
      error: error.message,
    });
  }
};


// ================= DELETE CARD =================

export const DeleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await CardModel.findById(id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    await CardModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    console.error("Delete Card Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete card",
      error: error.message,
    });
  }
};


// ================= GET ALL CARDS =================

export const GetAllCard = async (req, res) => {
  try {
    const cards = await CardModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Cards fetched successfully",
      cards,
    });
  } catch (error) {
    console.error("Get All Card Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cards",
      error: error.message,
    });
  }
};


// ================= GET SINGLE CARD =================

export const GetSingleCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await CardModel.findById(id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Card fetched successfully",
      card,
    });
  } catch (error) {
    console.error("Get Single Card Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch card",
      error: error.message,
    });
  }
};


// ================= GET CARD BY OCCASION =================

export const GetCardByOccasion = async (req, res) => {
  try {
    const { occasion } = req.body;

    if (!occasion) {
      return res.status(400).json({
        success: false,
        message: "Occasion is required",
      });
    }

    const cards = await CardModel.find({
      occasion: {
        $regex: new RegExp(`^${occasion}$`, "i"),
      },
      isAvailable: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Cards fetched successfully",
      cards,
    });
  } catch (error) {
    console.error("Get Card By Occasion Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cards by occasion",
      error: error.message,
    });
  }
};
import ChocolateModel from "../models/Chocolate.js";
export const CreateChocolate = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      size,
      stock,
      category,
      isAvailable,
    } = req.body;

    // ================= VALIDATION =================

    if (
      !name ||
      !description ||
      price === undefined ||
      !image ||
      !size ||
      stock === undefined ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are required",
      });
    }

    // ================= NUMBER VALIDATION =================

    if (Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    if (Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    // ================= CREATE CHOCOLATE =================

    const chocolate = await ChocolateModel.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      image: image.trim(),
      size: size.trim(),
      stock: Number(stock),
      category: category.trim(),

      isAvailable:
        isAvailable !== undefined
          ? isAvailable
          : true,

      createBy: req.id,
    });

    // ================= RESPONSE =================

    return res.status(201).json({
      success: true,
      message: "Chocolate created successfully",
      chocolate,
    });

  } catch (error) {
    console.error(
      "Create Chocolate Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create chocolate",
      error: error.message,
    });
  }
};
export const UpdateChocolate = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      image,
      occasion,
      size,
      flowerCount,
      stock,
      category,
      isAvailable,
    } = req.body;

    // ============================
    // FIND CHOCOLATE
    // ============================

    const chocolate =
      await ChocolateModel.findById(id);

    if (!chocolate) {
      return res.status(404).json({
        success: false,
        message: "Chocolate not found",
      });
    }

    // ============================
    // UPDATE FIELDS
    // ============================

    if (name !== undefined) {
      chocolate.name = name;
    }

    if (description !== undefined) {
      chocolate.description = description;
    }

    if (price !== undefined) {
      chocolate.price = price;
    }

    if (image !== undefined) {
      chocolate.image = image;
    }

    // Occasion is optional
    if (occasion !== undefined) {
      chocolate.occasion = occasion;
    }

    if (size !== undefined) {
      chocolate.size = size;
    }

    if (flowerCount !== undefined) {
      chocolate.flowerCount = flowerCount;
    }

    if (stock !== undefined) {
      chocolate.stock = stock;
    }

    if (category !== undefined) {
      chocolate.category = category;
    }

    if (isAvailable !== undefined) {
      chocolate.isAvailable = isAvailable;
    }

    // ============================
    // SAVE UPDATED CHOCOLATE
    // ============================

    await chocolate.save();

    // ============================
    // SUCCESS RESPONSE
    // ============================

    return res.status(200).json({
      success: true,
      message: "Chocolate updated successfully",
      chocolate,
    });
  } catch (error) {
    console.error(
      "Update Chocolate Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update chocolate",
      error: error.message,
    });
  }
};
export const DeleteChocolate = async (req, res) => {
  try {
    const { id } = req.params;

    const chocolate = await ChocolateModel.findById(id);

    if (!chocolate) {
      return res.status(404).json({
        success: false,
        message: "Chocolate not found",
      });
    }

    await ChocolateModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Chocolate deleted successfully",
    });
  } catch (error) {
    console.error("Delete Chocolate Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete chocolate",
      error: error.message,
    });
  }
};
export const GetAllChocolate = async (req, res) => {
  try {
    const chocolates = await ChocolateModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Chocolates fetched successfully",
      chocolates,
    });
  } catch (error) {
    console.error("Get All Chocolate Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chocolates",
      error: error.message,
    });
  }
};
export const GetSingleChocolate = async (req, res) => {
  try {
    const { id } = req.params;

    const chocolate = await ChocolateModel.findById(id);

    if (!chocolate) {
      return res.status(404).json({
        success: false,
        message: "Chocolate not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chocolate fetched successfully",
      chocolate,
    });
  } catch (error) {
    console.error("Get Single Chocolate Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chocolate",
      error: error.message,
    });
  }
};
export const GetChocolateByOccasion = async (req, res) => {
  try {
    const { occasion } = req.body;

    if (!occasion) {
      return res.status(400).json({
        success: false,
        message: "Occasion is required",
      });
    }

    const chocolates = await ChocolateModel.find({
      occasion: {
        $regex: new RegExp(`^${occasion}$`, "i"),
      },
      isAvailable: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Chocolates fetched successfully",
      chocolates,
    });
  } catch (error) {
    console.error("Get Chocolate By Occasion Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chocolates by occasion",
      error: error.message,
    });
  }
};
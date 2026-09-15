import FlowerInSleeveAddToCartModel from "../../Model/AddToCart/FlowerInSleeveAddToC artModel.js";
import FlowerInSleeveModel from "../../../models/FlowerInSleeveModel.js";
// ADD FLOWER IN SLEEVE TO CART

export const AddFlowerInSleeveToCart = async (req, res) => {
  try {
    const { flowerInSleeveId } = req.body;

    const userId = req.id;

    if (!flowerInSleeveId) {
      return res.status(400).json({
        success: false,
        message: "Flower In Sleeve ID is required",
      });
    }

    // Check flower in sleeve exists
    const flowerInSleeve = await FlowerInSleeveModel.findById(flowerInSleeveId);

    if (!flowerInSleeve) {
      return res.status(404).json({
        success: false,
        message: "Flower In Sleeve not found",
      });
    }

    // Check already added
    const alreadyAdded = await FlowerInSleeveAddToCartModel.findOne({
      user: userId,
      flowerInSleeve: flowerInSleeveId,
    });

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Flower In Sleeve already added to cart",
      });
    }

    // Check stock
    if (flowerInSleeve.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Flower In Sleeve is out of stock",
      });
    }

    const cart = await FlowerInSleeveAddToCartModel.create({
      user: userId,
      flowerInSleeve: flowerInSleeveId,
      quantity: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Flower In Sleeve added to cart",
      cart,
    });
  } catch (error) {
    console.log("Add Flower In Sleeve To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// INCREMENT FLOWER IN SLEEVE QUANTITY

export const IncrementFlowerInSleeveCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await FlowerInSleeveAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Flower In Sleeve cart item not found",
      });
    }

    // Find flower in sleeve
    const flowerInSleeve = await FlowerInSleeveModel.findById(
      cart.flowerInSleeve,
    );

    if (!flowerInSleeve) {
      return res.status(404).json({
        success: false,
        message: "Flower In Sleeve not found",
      });
    }

    // Stock check
    if (cart.quantity >= flowerInSleeve.stock) {
      return res.status(400).json({
        success: false,
        message: "Maximum available stock reached",
      });
    }

    cart.quantity += 1;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Flower In Sleeve quantity increased",
      cart,
    });
  } catch (error) {
    console.log("Increment Flower In Sleeve Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DECREMENT FLOWER IN SLEEVE QUANTITY

export const DecrementFlowerInSleeveCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await FlowerInSleeveAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Flower In Sleeve cart item not found",
      });
    }

    // Minimum quantity = 1
    if (cart.quantity <= 1) {
      return res.status(400).json({
        success: false,
        message: "Minimum quantity is 1",
      });
    }

    cart.quantity -= 1;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Flower In Sleeve quantity decreased",
      cart,
    });
  } catch (error) {
    console.log("Decrement Flower In Sleeve Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DELETE FLOWER IN SLEEVE FROM CART

export const DeleteFlowerInSleeveFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await FlowerInSleeveAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Flower In Sleeve cart item not found",
      });
    }

    await FlowerInSleeveAddToCartModel.findByIdAndDelete(cartId);

    return res.status(200).json({
      success: true,
      message: "Flower In Sleeve removed from cart",
    });
  } catch (error) {
    console.log("Delete Flower In Sleeve Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// GET ALL FLOWER IN SLEEVE FROM CART

export const GetAllFlowerInSleeveFromCart = async (req, res) => {
  try {
    const userId = req.id;

    const flowerInSleeves = await FlowerInSleeveAddToCartModel.find({
      user: userId,
    }).populate("flowerInSleeve");

    return res.status(200).json({
      success: true,
      message: "Flower In Sleeve cart fetched successfully",
      flowerInSleeves,
    });
  } catch (error) {
    console.log("Get All Flower In Sleeve From Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

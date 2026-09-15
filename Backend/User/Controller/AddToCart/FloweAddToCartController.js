import FlowerAddToCartModel from "../../Model/AddToCart/FlowerAddtoCartModel.js";
import flowerModel from "../../../models/Flower.js";

// ADD FLOWER TO CART

export const AddFlowerToCart = async (req, res) => {
  try {
    const { flowerId } = req.body;

    const userId = req.id;

    if (!flowerId) {
      return res.status(400).json({
        success: false,
        message: "Flower ID is required",
      });
    }

    // Check flower exists
    const flower = await flowerModel.findById(flowerId);

    if (!flower) {
      return res.status(404).json({
        success: false,
        message: "Flower not found",
      });
    }

    // Check already added
    const alreadyAdded = await FlowerAddToCartModel.findOne({
      user: userId,
      flower: flowerId,
    });

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Flower already added to cart",
      });
    }

    // Check stock
    if (flower.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Flower is out of stock",
      });
    }

    const cart = await FlowerAddToCartModel.create({
      user: userId,
      flower: flowerId,
      quantity: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Flower added to cart",
      cart,
    });
  } catch (error) {
    console.log("Add Flower To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// INCREMENT FLOWER QUANTITY

export const IncrementFlowerCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await FlowerAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Flower cart item not found",
      });
    }

    // Find flower
    const flower = await flowerModel.findById(cart.flower);

    if (!flower) {
      return res.status(404).json({
        success: false,
        message: "Flower not found",
      });
    }

    // Stock check
    if (cart.quantity >= flower.stock) {
      return res.status(400).json({
        success: false,
        message: "Maximum available stock reached",
      });
    }

    cart.quantity += 1;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Flower quantity increased",
      cart,
    });
  } catch (error) {
    console.log("Increment Flower Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DECREMENT FLOWER QUANTITY

export const DecrementFlowerCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await FlowerAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Flower cart item not found",
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
      message: "Flower quantity decreased",
      cart,
    });
  } catch (error) {
    console.log("Decrement Flower Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DELETE FLOWER FROM CART

export const DeleteFlowerFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await FlowerAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Flower cart item not found",
      });
    }

    await FlowerAddToCartModel.findByIdAndDelete(cartId);

    return res.status(200).json({
      success: true,
      message: "Flower removed from cart",
    });
  } catch (error) {
    console.log("Delete Flower Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// GET ALL FLOWERS FROM CART

export const GetAllFlowerFromCart = async (req, res) => {
  try {
    const userId = req.id;

    const flowers = await FlowerAddToCartModel.find({
      user: userId,
    }).populate("flower");

    return res.status(200).json({
      success: true,
      message: "Flower cart fetched successfully",
      flowers,
    });
  } catch (error) {
    console.log("Get All Flower From Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

import FlowerInBoxAddToCartModel from "../../Model/AddToCart/FLowerInBox.js";
import FlowerInBoxModel from "../../../models/FlowerInBoxModel.js";

// ADD FLOWER IN BOX TO CART

export const AddFlowerInBoxToCart = async (req, res) => {
  try {
    const { flowerInBoxId } = req.body;

    const userId = req.id;

    if (!flowerInBoxId) {
      return res.status(400).json({
        success: false,
        message: "Flower In Box ID is required",
      });
    }

    // Check flower in box exists
    const flowerInBox = await FlowerInBoxModel.findById(
      flowerInBoxId
    );

    if (!flowerInBox) {
      return res.status(404).json({
        success: false,
        message: "Flower In Box not found",
      });
    }

    // Check already added
    const alreadyAdded =
      await FlowerInBoxAddToCartModel.findOne({
        user: userId,
        flowerInBox: flowerInBoxId,
      });

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Flower In Box already added to cart",
      });
    }

    // Check stock
    if (flowerInBox.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Flower In Box is out of stock",
      });
    }

    const cart = await FlowerInBoxAddToCartModel.create({
      user: userId,
      flowerInBox: flowerInBoxId,
      quantity: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Flower In Box added to cart",
      cart,
    });
  } catch (error) {
    console.log("Add Flower In Box To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// INCREMENT FLOWER IN BOX QUANTITY

export const IncrementFlowerInBoxCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await FlowerInBoxAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Flower In Box cart item not found",
      });
    }

    // Find flower in box
    const flowerInBox = await FlowerInBoxModel.findById(
      cart.flowerInBox
    );

    if (!flowerInBox) {
      return res.status(404).json({
        success: false,
        message: "Flower In Box not found",
      });
    }

    // Stock check
    if (cart.quantity >= flowerInBox.stock) {
      return res.status(400).json({
        success: false,
        message: "Maximum available stock reached",
      });
    }

    cart.quantity += 1;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Flower In Box quantity increased",
      cart,
    });
  } catch (error) {
    console.log("Increment Flower In Box Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DECREMENT FLOWER IN BOX QUANTITY

export const DecrementFlowerInBoxCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await FlowerInBoxAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Flower In Box cart item not found",
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
      message: "Flower In Box quantity decreased",
      cart,
    });
  } catch (error) {
    console.log("Decrement Flower In Box Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DELETE FLOWER IN BOX FROM CART

export const DeleteFlowerInBoxFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await FlowerInBoxAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Flower In Box cart item not found",
      });
    }

    await FlowerInBoxAddToCartModel.findByIdAndDelete(cartId);

    return res.status(200).json({
      success: true,
      message: "Flower In Box removed from cart",
    });
  } catch (error) {
    console.log("Delete Flower In Box Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// GET ALL FLOWER IN BOX FROM CART

export const GetAllFlowerInBoxFromCart = async (req, res) => {
  try {
    const userId = req.id;

    const flowerInBoxes =
      await FlowerInBoxAddToCartModel.find({
        user: userId,
      }).populate("flowerInBox");

    return res.status(200).json({
      success: true,
      message: "Flower In Box cart fetched successfully",
      flowerInBoxes,
    });
  } catch (error) {
    console.log(
      "Get All Flower In Box From Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
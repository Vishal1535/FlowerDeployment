import ComboBouquetModel from "../../../models/ComboBouquet.js";

import ComboBouquetAddToCartModel from "../../Model/AddToCart/ComboBoquetAddToCartModel.js";

// ADD COMBO BOUQUET TO CART

export const AddComboBouquetToCart = async (req, res) => {
  try {
    const { comboBouquetId } = req.body;

    const userId = req.id;

    if (!comboBouquetId) {
      return res.status(400).json({
        success: false,
        message: "Combo Bouquet ID is required",
      });
    }

    // Check combo bouquet exists
    const comboBouquet = await ComboBouquetModel.findById(
      comboBouquetId
    );

    if (!comboBouquet) {
      return res.status(404).json({
        success: false,
        message: "Combo Bouquet not found",
      });
    }

    // Check already added
    const alreadyAdded = await ComboBouquetAddToCartModel.findOne({
      user: userId,
      comboBouquet: comboBouquetId,
    });

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Combo Bouquet already added to cart",
      });
    }

    // Check stock
    if (comboBouquet.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Combo Bouquet is out of stock",
      });
    }

    const cart = await ComboBouquetAddToCartModel.create({
      user: userId,
      comboBouquet: comboBouquetId,
      quantity: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Combo Bouquet added to cart",
      cart,
    });
  } catch (error) {
    console.log("Add Combo Bouquet To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// INCREMENT COMBO BOUQUET QUANTITY

export const IncrementComboBouquetCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await ComboBouquetAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Combo Bouquet cart item not found",
      });
    }

    // Find combo bouquet
    const comboBouquet = await ComboBouquetModel.findById(
      cart.comboBouquet
    );

    if (!comboBouquet) {
      return res.status(404).json({
        success: false,
        message: "Combo Bouquet not found",
      });
    }

    // Stock check
    if (cart.quantity >= comboBouquet.stock) {
      return res.status(400).json({
        success: false,
        message: "Maximum available stock reached",
      });
    }

    cart.quantity += 1;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Combo Bouquet quantity increased",
      cart,
    });
  } catch (error) {
    console.log("Increment Combo Bouquet Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DECREMENT COMBO BOUQUET QUANTITY

export const DecrementComboBouquetCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await ComboBouquetAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Combo Bouquet cart item not found",
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
      message: "Combo Bouquet quantity decreased",
      cart,
    });
  } catch (error) {
    console.log("Decrement Combo Bouquet Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DELETE COMBO BOUQUET FROM CART

export const DeleteComboBouquetFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await ComboBouquetAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Combo Bouquet cart item not found",
      });
    }

    await ComboBouquetAddToCartModel.findByIdAndDelete(cartId);

    return res.status(200).json({
      success: true,
      message: "Combo Bouquet removed from cart",
    });
  } catch (error) {
    console.log("Delete Combo Bouquet Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// GET ALL COMBO BOUQUETS FROM CART

export const GetAllComboBouquetFromCart = async (req, res) => {
  try {
    const userId = req.id;

    const comboBouquets = await ComboBouquetAddToCartModel.find({
      user: userId,
    }).populate("comboBouquet");

    return res.status(200).json({
      success: true,
      message: "Combo Bouquet cart fetched successfully",
      comboBouquets,
    });
  } catch (error) {
    console.log("Get All Combo Bouquet From Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
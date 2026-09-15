// import WoolenModel from "../../../models/Woolen.js";
import WoolenModel from "../../../models/Woolen.js";

import WoolenBouquetAddToCartModel from "../../Model/AddToCart/WoolenBouquetAddToCartModel.js";

// ADD WOOLEN BOUQUET TO CART

export const AddWoolenBouquetToCart = async (req, res) => {
  try {
    const { woolenBouquetId } = req.body;

    const userId = req.id;

    if (!woolenBouquetId) {
      return res.status(400).json({
        success: false,
        message: "Woolen Bouquet ID is required",
      });
    }

    // Check woolen bouquet exists
    const woolenBouquet = await WoolenModel.findById(
      woolenBouquetId
    );

    if (!woolenBouquet) {
      return res.status(404).json({
        success: false,
        message: "Woolen Bouquet not found",
      });
    }

    // Check already added
    const alreadyAdded =
      await WoolenBouquetAddToCartModel.findOne({
        user: userId,
        woolenBouquet: woolenBouquetId,
      });

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Woolen Bouquet already added to cart",
      });
    }

    // Check stock
    if (woolenBouquet.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Woolen Bouquet is out of stock",
      });
    }

    const cart =
      await WoolenBouquetAddToCartModel.create({
        user: userId,
        woolenBouquet: woolenBouquetId,
        quantity: 1,
      });

    return res.status(201).json({
      success: true,
      message: "Woolen Bouquet added to cart",
      cart,
    });
  } catch (error) {
    console.log(
      "Add Woolen Bouquet To Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// INCREMENT WOOLEN BOUQUET QUANTITY

export const IncrementWoolenBouquetCart = async (
  req,
  res
) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart =
      await WoolenBouquetAddToCartModel.findOne({
        _id: cartId,
        user: userId,
      });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Woolen Bouquet cart item not found",
      });
    }

    // Find woolen bouquet
    const woolenBouquet =
      await WoolenModel.findById(
        cart.woolenBouquet
      );

    if (!woolenBouquet) {
      return res.status(404).json({
        success: false,
        message: "Woolen Bouquet not found",
      });
    }

    // Stock check
    if (cart.quantity >= woolenBouquet.stock) {
      return res.status(400).json({
        success: false,
        message: "Maximum available stock reached",
      });
    }

    cart.quantity += 1;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Woolen Bouquet quantity increased",
      cart,
    });
  } catch (error) {
    console.log(
      "Increment Woolen Bouquet Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DECREMENT WOOLEN BOUQUET QUANTITY

export const DecrementWoolenBouquetCart = async (
  req,
  res
) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart =
      await WoolenBouquetAddToCartModel.findOne({
        _id: cartId,
        user: userId,
      });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Woolen Bouquet cart item not found",
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
      message: "Woolen Bouquet quantity decreased",
      cart,
    });
  } catch (error) {
    console.log(
      "Decrement Woolen Bouquet Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DELETE WOOLEN BOUQUET FROM CART

export const DeleteWoolenBouquetFromCart = async (
  req,
  res
) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart =
      await WoolenBouquetAddToCartModel.findOne({
        _id: cartId,
        user: userId,
      });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Woolen Bouquet cart item not found",
      });
    }

    await WoolenBouquetAddToCartModel.findByIdAndDelete(
      cartId
    );

    return res.status(200).json({
      success: true,
      message: "Woolen Bouquet removed from cart",
    });
  } catch (error) {
    console.log(
      "Delete Woolen Bouquet Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// GET ALL WOOLEN BOUQUETS FROM CART

export const GetAllWoolenBouquetFromCart = async (
  req,
  res
) => {
  try {
    const userId = req.id;

    const woolenBouquets =
      await WoolenBouquetAddToCartModel.find({
        user: userId,
      }).populate("woolenBouquet");

    return res.status(200).json({
      success: true,
      message:
        "Woolen Bouquet cart fetched successfully",
      woolenBouquets,
    });
  } catch (error) {
    console.log(
      "Get All Woolen Bouquet From Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
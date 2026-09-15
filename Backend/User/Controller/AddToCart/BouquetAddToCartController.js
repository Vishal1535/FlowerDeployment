
import BouquetAddToCartModel from "../../Model/AddToCart/BouquetAddToCartModel.js";
import bouquetModel from "../../../models/Bouquet.js";

// ADD BOUQUET TO CART

export const AddBouquetToCart = async (req, res) => {
  try {
    const { bouquetId } = req.body;

    const userId = req.id;

    if (!bouquetId) {
      return res.status(400).json({
        success: false,
        message: "Bouquet ID is required",
      });
    }

    // Check bouquet exists
    const bouquet = await bouquetModel.findById(bouquetId);

    if (!bouquet) {
      return res.status(404).json({
        success: false,
        message: "Bouquet not found",
      });
    }

    // Check already added
    const alreadyAdded = await BouquetAddToCartModel.findOne({
      user: userId,
      bouquet: bouquetId,
    });

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Bouquet already added to cart",
      });
    }

    // Check stock
    if (bouquet.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Bouquet is out of stock",
      });
    }

    const cart = await BouquetAddToCartModel.create({
      user: userId,
      bouquet: bouquetId,
      quantity: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Bouquet added to cart",
      cart,
    });
  } catch (error) {
    console.log("Add Bouquet To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// INCREMENT BOUQUET QUANTITY

export const IncrementBouquetCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await BouquetAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Bouquet cart item not found",
      });
    }

    // Find bouquet
    const bouquet = await bouquetModel.findById(cart.bouquet);

    if (!bouquet) {
      return res.status(404).json({
        success: false,
        message: "Bouquet not found",
      });
    }

    // Stock check
    if (cart.quantity >= bouquet.stock) {
      return res.status(400).json({
        success: false,
        message: "Maximum available stock reached",
      });
    }

    cart.quantity += 1;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Bouquet quantity increased",
      cart,
    });
  } catch (error) {
    console.log("Increment Bouquet Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DECREMENT BOUQUET QUANTITY

export const DecrementBouquetCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await BouquetAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Bouquet cart item not found",
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
      message: "Bouquet quantity decreased",
      cart,
    });
  } catch (error) {
    console.log("Decrement Bouquet Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// DELETE BOUQUET FROM CART

export const DeleteBouquetFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    const cart = await BouquetAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Bouquet cart item not found",
      });
    }

    await BouquetAddToCartModel.findByIdAndDelete(cartId);

    return res.status(200).json({
      success: true,
      message: "Bouquet removed from cart",
    });
  } catch (error) {
    console.log("Delete Bouquet Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// GET ALL BOUQUETS FROM CART

export const GetAllBouquetFromCart = async (req, res) => {
  try {
    const userId = req.id;

    const bouquets = await BouquetAddToCartModel.find({
      user: userId,
    }).populate("bouquet");

    return res.status(200).json({
      success: true,
      message: "Bouquet cart fetched successfully",
      bouquets,
    });
  } catch (error) {
    console.log("Get All Bouquet From Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


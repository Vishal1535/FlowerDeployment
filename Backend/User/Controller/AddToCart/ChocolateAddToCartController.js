import ChocolateAddToCartModel from "../../Model/AddToCart/ChocolateAddToCartModel.js";
import ChocolateModel from "../../../models/Chocolate.js";

// ==========================================
// ADD CHOCOLATE TO CART
// ==========================================

export const AddChocolateToCart = async (req, res) => {
  try {
    const { chocolateId } = req.body;

    const userId = req.id;

    // CHECK CHOCOLATE ID
    if (!chocolateId) {
      return res.status(400).json({
        success: false,
        message: "Chocolate ID is required",
      });
    }

    // CHECK CHOCOLATE EXISTS
    const chocolate = await ChocolateModel.findById(
      chocolateId
    );

    if (!chocolate) {
      return res.status(404).json({
        success: false,
        message: "Chocolate not found",
      });
    }

    // CHECK ALREADY ADDED
    const alreadyAdded =
      await ChocolateAddToCartModel.findOne({
        user: userId,
        chocolate: chocolateId,
      });

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Chocolate already added to cart",
      });
    }

    // CHECK STOCK
    if (chocolate.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Chocolate is out of stock",
      });
    }

    // CREATE CART
    const cart = await ChocolateAddToCartModel.create({
      user: userId,
      chocolate: chocolateId,
      quantity: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Chocolate added to cart",
      cart,
    });
  } catch (error) {
    console.log(
      "Add Chocolate To Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// INCREMENT CHOCOLATE QUANTITY
// ==========================================

export const IncrementChocolateCart = async (
  req,
  res
) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    // FIND CART
    const cart =
      await ChocolateAddToCartModel.findOne({
        _id: cartId,
        user: userId,
      });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Chocolate cart item not found",
      });
    }

    // FIND CHOCOLATE
    const chocolate =
      await ChocolateModel.findById(
        cart.chocolate
      );

    if (!chocolate) {
      return res.status(404).json({
        success: false,
        message: "Chocolate not found",
      });
    }

    // CHECK STOCK
    if (cart.quantity >= chocolate.stock) {
      return res.status(400).json({
        success: false,
        message: "Maximum available stock reached",
      });
    }

    // INCREASE QUANTITY
    cart.quantity += 1;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Chocolate quantity increased",
      cart,
    });
  } catch (error) {
    console.log(
      "Increment Chocolate Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// DECREMENT CHOCOLATE QUANTITY
// ==========================================

export const DecrementChocolateCart = async (
  req,
  res
) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    // FIND CART
    const cart =
      await ChocolateAddToCartModel.findOne({
        _id: cartId,
        user: userId,
      });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Chocolate cart item not found",
      });
    }

    // MINIMUM QUANTITY = 1
    if (cart.quantity <= 1) {
      return res.status(400).json({
        success: false,
        message: "Minimum quantity is 1",
      });
    }

    // DECREASE QUANTITY
    cart.quantity -= 1;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Chocolate quantity decreased",
      cart,
    });
  } catch (error) {
    console.log(
      "Decrement Chocolate Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// DELETE CHOCOLATE FROM CART
// ==========================================

export const DeleteChocolateFromCart = async (
  req,
  res
) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    // FIND CART
    const cart =
      await ChocolateAddToCartModel.findOne({
        _id: cartId,
        user: userId,
      });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Chocolate cart item not found",
      });
    }

    // DELETE
    await ChocolateAddToCartModel.findByIdAndDelete(
      cartId
    );

    return res.status(200).json({
      success: true,
      message: "Chocolate removed from cart",
    });
  } catch (error) {
    console.log(
      "Delete Chocolate Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// GET ALL CHOCOLATES FROM CART
// ==========================================

export const GetAllChocolateFromCart = async (
  req,
  res
) => {
  try {
    const userId = req.id;

    const chocolates =
      await ChocolateAddToCartModel.find({
        user: userId,
      }).populate("chocolate");

    return res.status(200).json({
      success: true,
      message: "Chocolate cart fetched successfully",
      chocolates,
    });
  } catch (error) {
    console.log(
      "Get All Chocolate From Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
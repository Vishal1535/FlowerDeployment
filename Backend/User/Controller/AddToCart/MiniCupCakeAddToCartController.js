import MiniCupcakeAddToCartModel from "../../Model/AddToCart/MiniCupCakeAddToCartModel.js";
import MiniCupcakeModel from "../../../models/MiniCupCake.js";

// ==========================================
// ADD MINI CUPCAKE TO CART
// ==========================================

export const AddMiniCupcakeToCart = async (req, res) => {
  try {
    const { miniCupcakeId } = req.body;

    const userId = req.id;

    // CHECK MINI CUPCAKE ID
    if (!miniCupcakeId) {
      return res.status(400).json({
        success: false,
        message: "Mini Cupcake ID is required",
      });
    }

    // CHECK MINI CUPCAKE EXISTS
    const miniCupcake = await MiniCupcakeModel.findById(miniCupcakeId);

    if (!miniCupcake) {
      return res.status(404).json({
        success: false,
        message: "Mini Cupcake not found",
      });
    }

    // CHECK ALREADY ADDED
    const alreadyAdded = await MiniCupcakeAddToCartModel.findOne({
      user: userId,
      miniCupcake: miniCupcakeId,
    });

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Mini Cupcake already added to cart",
      });
    }

    // CHECK STOCK
    if (miniCupcake.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Mini Cupcake is out of stock",
      });
    }

    // CREATE CART
    const cart = await MiniCupcakeAddToCartModel.create({
      user: userId,
      miniCupcake: miniCupcakeId,
      quantity: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Mini Cupcake added to cart",
      cart,
    });
  } catch (error) {
    console.log("Add Mini Cupcake To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// INCREMENT MINI CUPCAKE QUANTITY
// ==========================================

export const IncrementMiniCupcakeCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    // FIND CART
    const cart = await MiniCupcakeAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Mini Cupcake cart item not found",
      });
    }

    // FIND MINI CUPCAKE
    const miniCupcake = await MiniCupcakeModel.findById(cart.miniCupcake);

    if (!miniCupcake) {
      return res.status(404).json({
        success: false,
        message: "Mini Cupcake not found",
      });
    }

    // CHECK STOCK
    if (cart.quantity >= miniCupcake.stock) {
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
      message: "Mini Cupcake quantity increased",
      cart,
    });
  } catch (error) {
    console.log("Increment Mini Cupcake Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// DECREMENT MINI CUPCAKE QUANTITY
// ==========================================

export const DecrementMiniCupcakeCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    // FIND CART
    const cart = await MiniCupcakeAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Mini Cupcake cart item not found",
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
      message: "Mini Cupcake quantity decreased",
      cart,
    });
  } catch (error) {
    console.log("Decrement Mini Cupcake Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// DELETE MINI CUPCAKE FROM CART
// ==========================================

export const DeleteMiniCupcakeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    // FIND CART
    const cart = await MiniCupcakeAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Mini Cupcake cart item not found",
      });
    }

    // DELETE
    await MiniCupcakeAddToCartModel.findByIdAndDelete(cartId);

    return res.status(200).json({
      success: true,
      message: "Mini Cupcake removed from cart",
    });
  } catch (error) {
    console.log("Delete Mini Cupcake Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// GET ALL MINI CUPCAKES FROM CART
// ==========================================

export const GetAllMiniCupcakeFromCart = async (req, res) => {
  try {
    const userId = req.id;

    const miniCupcakes = await MiniCupcakeAddToCartModel.find({
      user: userId,
    }).populate("miniCupcake");

    return res.status(200).json({
      success: true,
      message: "Mini Cupcake cart fetched successfully",
      miniCupcakes,
    });
  } catch (error) {
    console.log("Get All Mini Cupcake From Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

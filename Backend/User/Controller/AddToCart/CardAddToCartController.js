import CardAddToCartModel from "../../Model/AddToCart/CardAddToCartModel.js";
import CardModel from "../../../models/Card.js";

// ==========================================
// ADD CARD TO CART
// ==========================================

export const AddCardToCart = async (req, res) => {
  try {
    const { cardId } = req.body;

    const userId = req.id;

    // CHECK CARD ID
    if (!cardId) {
      return res.status(400).json({
        success: false,
        message: "Card ID is required",
      });
    }

    // CHECK CARD EXISTS
    const card = await CardModel.findById(cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    // CHECK ALREADY ADDED
    const alreadyAdded =
      await CardAddToCartModel.findOne({
        user: userId,
        card: cardId,
      });

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Card already added to cart",
      });
    }

    // CHECK STOCK
    if (card.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Card is out of stock",
      });
    }

    // CREATE CART
    const cart = await CardAddToCartModel.create({
      user: userId,
      card: cardId,
      quantity: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Card added to cart",
      cart,
    });
  } catch (error) {
    console.log("Add Card To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// INCREMENT CARD QUANTITY
// ==========================================

export const IncrementCardCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    // FIND CART
    const cart = await CardAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Card cart item not found",
      });
    }

    // FIND CARD
    const card = await CardModel.findById(
      cart.card
    );

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    // CHECK STOCK
    if (cart.quantity >= card.stock) {
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
      message: "Card quantity increased",
      cart,
    });
  } catch (error) {
    console.log(
      "Increment Card Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// DECREMENT CARD QUANTITY
// ==========================================

export const DecrementCardCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    // FIND CART
    const cart = await CardAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Card cart item not found",
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
      message: "Card quantity decreased",
      cart,
    });
  } catch (error) {
    console.log(
      "Decrement Card Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// DELETE CARD FROM CART
// ==========================================

export const DeleteCardFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.id;

    // FIND CART
    const cart = await CardAddToCartModel.findOne({
      _id: cartId,
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Card cart item not found",
      });
    }

    // DELETE
    await CardAddToCartModel.findByIdAndDelete(
      cartId
    );

    return res.status(200).json({
      success: true,
      message: "Card removed from cart",
    });
  } catch (error) {
    console.log(
      "Delete Card Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ==========================================
// GET ALL CARDS FROM CART
// ==========================================

export const GetAllCardFromCart = async (req, res) => {
  try {
    const userId = req.id;

    const cards = await CardAddToCartModel.find({
      user: userId,
    }).populate("card");

    return res.status(200).json({
      success: true,
      message: "Card cart fetched successfully",
      cards,
    });
  } catch (error) {
    console.log(
      "Get All Card From Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
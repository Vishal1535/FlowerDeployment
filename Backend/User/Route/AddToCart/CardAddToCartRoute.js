import express from "express";

import {
  AddCardToCart,
  GetAllCardFromCart,
  IncrementCardCart,
  DecrementCardCart,
  DeleteCardFromCart,
} from "../../Controller/AddToCart/CardAddToCartController.js";

import isAuthorized from "../../../middlewares/isAuthorized.js";

const CardAddToCartRoute = express.Router();

// ==========================================
// GET ALL CARDS FROM CART
// ==========================================

CardAddToCartRoute.get(
  "/get-all-card-from-cart",
  isAuthorized,
  GetAllCardFromCart
);

// ==========================================
// ADD CARD TO CART
// ==========================================

CardAddToCartRoute.post(
  "/add-card-to-cart",
  isAuthorized,
  AddCardToCart
);

// ==========================================
// INCREMENT CARD CART QUANTITY
// ==========================================

CardAddToCartRoute.patch(
  "/increment-card-cart/:cartId",
  isAuthorized,
  IncrementCardCart
);

// ==========================================
// DECREMENT CARD CART QUANTITY
// ==========================================

CardAddToCartRoute.patch(
  "/decrement-card-cart/:cartId",
  isAuthorized,
  DecrementCardCart
);

// ==========================================
// DELETE CARD FROM CART
// ==========================================

CardAddToCartRoute.delete(
  "/delete-card-from-cart/:cartId",
  isAuthorized,
  DeleteCardFromCart
);

export default CardAddToCartRoute;
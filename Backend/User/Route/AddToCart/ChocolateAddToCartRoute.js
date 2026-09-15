import express from "express";

import {
  AddChocolateToCart,
  GetAllChocolateFromCart,
  IncrementChocolateCart,
  DecrementChocolateCart,
  DeleteChocolateFromCart,
} from "../../Controller/AddToCart/ChocolateAddToCartController.js";

import isAuthorized from "../../../middlewares/isAuthorized.js";

const ChocolateAddToCartRoute = express.Router();

// ==========================================
// GET ALL CHOCOLATES FROM CART
// ==========================================

ChocolateAddToCartRoute.get(
  "/get-all-chocolate-from-cart",
  isAuthorized,
  GetAllChocolateFromCart
);

// ==========================================
// ADD CHOCOLATE TO CART
// ==========================================

ChocolateAddToCartRoute.post(
  "/add-chocolate-to-cart",
  isAuthorized,
  AddChocolateToCart
);

// ==========================================
// INCREMENT CHOCOLATE CART QUANTITY
// ==========================================

ChocolateAddToCartRoute.patch(
  "/increment-chocolate-cart/:cartId",
  isAuthorized,
  IncrementChocolateCart
);

// ==========================================
// DECREMENT CHOCOLATE CART QUANTITY
// ==========================================

ChocolateAddToCartRoute.patch(
  "/decrement-chocolate-cart/:cartId",
  isAuthorized,
  DecrementChocolateCart
);

// ==========================================
// DELETE CHOCOLATE FROM CART
// ==========================================

ChocolateAddToCartRoute.delete(
  "/delete-chocolate-from-cart/:cartId",
  isAuthorized,
  DeleteChocolateFromCart
);

export default ChocolateAddToCartRoute;
import express from "express";

import {
  AddMiniCupcakeToCart,
  GetAllMiniCupcakeFromCart,
  IncrementMiniCupcakeCart,
  DecrementMiniCupcakeCart,
  DeleteMiniCupcakeFromCart,
} from "../../Controller/AddToCart/MiniCupCakeAddToCartController.js";

import isAuthorized from "../../../middlewares/isAuthorized.js";

const MiniCupcakeAddToCartRoute = express.Router();

// ==========================================
// GET ALL MINI CUPCAKES FROM CART
// ==========================================

MiniCupcakeAddToCartRoute.get(
  "/get-all-mini-cupcake-from-cart",
  isAuthorized,
  GetAllMiniCupcakeFromCart
);

// ==========================================
// ADD MINI CUPCAKE TO CART
// ==========================================

MiniCupcakeAddToCartRoute.post(
  "/add-mini-cupcake-to-cart",
  isAuthorized,
  AddMiniCupcakeToCart
);

// ==========================================
// INCREMENT MINI CUPCAKE CART QUANTITY
// ==========================================

MiniCupcakeAddToCartRoute.patch(
  "/increment-mini-cupcake-cart/:cartId",
  isAuthorized,
  IncrementMiniCupcakeCart
);

// ==========================================
// DECREMENT MINI CUPCAKE CART QUANTITY
// ==========================================

MiniCupcakeAddToCartRoute.patch(
  "/decrement-mini-cupcake-cart/:cartId",
  isAuthorized,
  DecrementMiniCupcakeCart
);

// ==========================================
// DELETE MINI CUPCAKE FROM CART
// ==========================================

MiniCupcakeAddToCartRoute.delete(
  "/delete-mini-cupcake-from-cart/:cartId",
  isAuthorized,
  DeleteMiniCupcakeFromCart
);

export default MiniCupcakeAddToCartRoute;
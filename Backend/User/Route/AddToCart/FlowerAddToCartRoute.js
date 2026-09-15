import express from "express";

import {
  AddFlowerToCart,
  GetAllFlowerFromCart,
  IncrementFlowerCart,
  DecrementFlowerCart,
  DeleteFlowerFromCart,
} from "../../Controller/AddToCart/FloweAddToCartController.js";

import isAuthorized from "../../../middlewares/isAuthorized.js";

const FlowerAddToCartRoute = express.Router();

// GET ALL FLOWERS FROM CART

FlowerAddToCartRoute.get(
  "/get-all-flower-from-cart",
  isAuthorized,
  GetAllFlowerFromCart,
);

// ADD FLOWER TO CART

FlowerAddToCartRoute.post("/add-flower-to-cart", isAuthorized, AddFlowerToCart);

// INCREMENT FLOWER CART QUANTITY

FlowerAddToCartRoute.patch(
  "/increment-flower-cart/:cartId",
  isAuthorized,
  IncrementFlowerCart,
);

// DECREMENT FLOWER CART QUANTITY

FlowerAddToCartRoute.patch(
  "/decrement-flower-cart/:cartId",
  isAuthorized,
  DecrementFlowerCart,
);

// DELETE FLOWER FROM CART

FlowerAddToCartRoute.delete(
  "/delete-flower-from-cart/:cartId",
  isAuthorized,
  DeleteFlowerFromCart,
);

export default FlowerAddToCartRoute;

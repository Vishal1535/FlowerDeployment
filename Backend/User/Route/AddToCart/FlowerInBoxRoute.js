import express from "express";

import {
  AddFlowerInBoxToCart,
  GetAllFlowerInBoxFromCart,
  IncrementFlowerInBoxCart,
  DecrementFlowerInBoxCart,
  DeleteFlowerInBoxFromCart,
} from "../../Controller/AddToCart/FlowerInBoxController.js";

import isAuthorized from "../../../middlewares/isAuthorized.js";

const FlowerInBoxAddToCartRoute = express.Router();

// GET ALL FLOWER IN BOX FROM CART

FlowerInBoxAddToCartRoute.get(
  "/get-all-flower-in-box-from-cart",
  isAuthorized,
  GetAllFlowerInBoxFromCart,
);

// ADD FLOWER IN BOX TO CART

FlowerInBoxAddToCartRoute.post(
  "/add-flower-in-box-to-cart",
  isAuthorized,
  AddFlowerInBoxToCart,
);

// INCREMENT FLOWER IN BOX CART QUANTITY

FlowerInBoxAddToCartRoute.patch(
  "/increment-flower-in-box-cart/:cartId",
  isAuthorized,
  IncrementFlowerInBoxCart,
);

// DECREMENT FLOWER IN BOX CART QUANTITY

FlowerInBoxAddToCartRoute.patch(
  "/decrement-flower-in-box-cart/:cartId",
  isAuthorized,
  DecrementFlowerInBoxCart,
);

// DELETE FLOWER IN BOX FROM CART

FlowerInBoxAddToCartRoute.delete(
  "/delete-flower-in-box-from-cart/:cartId",
  isAuthorized,
  DeleteFlowerInBoxFromCart,
);

export default FlowerInBoxAddToCartRoute;
import express from "express";

import {
  AddFlowerInSleeveToCart,
  GetAllFlowerInSleeveFromCart,
  IncrementFlowerInSleeveCart,
  DecrementFlowerInSleeveCart,
  DeleteFlowerInSleeveFromCart,
} from "../../Controller/AddToCart/FlowerInSleeveAddToCartController.js";

import isAuthorized from "../../../middlewares/isAuthorized.js";

const FlowerInSleeveAddToCartRoute = express.Router();

// GET ALL FLOWER IN SLEEVE FROM CART

FlowerInSleeveAddToCartRoute.get(
  "/get-all-flower-in-sleeve-from-cart",
  isAuthorized,
  GetAllFlowerInSleeveFromCart,
);

// ADD FLOWER IN SLEEVE TO CART

FlowerInSleeveAddToCartRoute.post(
  "/add-flower-in-sleeve-to-cart",
  isAuthorized,
  AddFlowerInSleeveToCart,
);

// INCREMENT FLOWER IN SLEEVE CART QUANTITY

FlowerInSleeveAddToCartRoute.patch(
  "/increment-flower-in-sleeve-cart/:cartId",
  isAuthorized,
  IncrementFlowerInSleeveCart,
);

// DECREMENT FLOWER IN SLEEVE CART QUANTITY

FlowerInSleeveAddToCartRoute.patch(
  "/decrement-flower-in-sleeve-cart/:cartId",
  isAuthorized,
  DecrementFlowerInSleeveCart,
);

// DELETE FLOWER IN SLEEVE FROM CART

FlowerInSleeveAddToCartRoute.delete(
  "/delete-flower-in-sleeve-from-cart/:cartId",
  isAuthorized,
  DeleteFlowerInSleeveFromCart,
);

export default FlowerInSleeveAddToCartRoute;
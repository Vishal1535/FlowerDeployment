import express from "express";

import {
  AddWoolenBouquetToCart,
  GetAllWoolenBouquetFromCart,
  IncrementWoolenBouquetCart,
  DecrementWoolenBouquetCart,
  DeleteWoolenBouquetFromCart,
} from "../../Controller/AddToCart/WoolenBouquetAddToCartController.js";

import isAuthorized from "../../../middlewares/isAuthorized.js";

const WoolenBouquetAddToCartRoute = express.Router();

// GET ALL WOOLEN BOUQUETS FROM CART

WoolenBouquetAddToCartRoute.get(
  "/get-all-woolen-bouquet-from-cart",
  isAuthorized,
  GetAllWoolenBouquetFromCart,
);

// ADD WOOLEN BOUQUET TO CART

WoolenBouquetAddToCartRoute.post(
  "/add-woolen-bouquet-to-cart",
  isAuthorized,
  AddWoolenBouquetToCart,
);

// INCREMENT WOOLEN BOUQUET CART QUANTITY

WoolenBouquetAddToCartRoute.patch(
  "/increment-woolen-bouquet-cart/:cartId",
  isAuthorized,
  IncrementWoolenBouquetCart,
);

// DECREMENT WOOLEN BOUQUET CART QUANTITY

WoolenBouquetAddToCartRoute.patch(
  "/decrement-woolen-bouquet-cart/:cartId",
  isAuthorized,
  DecrementWoolenBouquetCart,
);

// DELETE WOOLEN BOUQUET FROM CART

WoolenBouquetAddToCartRoute.delete(
  "/delete-woolen-bouquet-from-cart/:cartId",
  isAuthorized,
  DeleteWoolenBouquetFromCart,
);

export default WoolenBouquetAddToCartRoute;

import express from "express";

import {
  AddBouquetToCart,
  GetAllBouquetFromCart,
  IncrementBouquetCart,
  DecrementBouquetCart,
  DeleteBouquetFromCart,
} from "../../Controller/AddToCart/BouquetAddToCartController.js";

import isAuthorized from "../../../middlewares/isAuthorized.js";

const BouquetAddToCartRoute = express.Router();

// GET ALL BOUQUETS FROM CART

BouquetAddToCartRoute.get(
  "/get-all-bouquet-from-cart",
  isAuthorized,
  GetAllBouquetFromCart,
);

// ADD BOUQUET TO CART

BouquetAddToCartRoute.post(
  "/add-bouquet-to-cart",
  isAuthorized,
  AddBouquetToCart,
);

// INCREMENT BOUQUET CART QUANTITY

BouquetAddToCartRoute.patch(
  "/increment-bouquet-cart/:cartId",
  isAuthorized,
  IncrementBouquetCart,
);

// DECREMENT BOUQUET CART QUANTITY

BouquetAddToCartRoute.patch(
  "/decrement-bouquet-cart/:cartId",
  isAuthorized,
  DecrementBouquetCart,
);

// DELETE BOUQUET FROM CART

BouquetAddToCartRoute.delete(
  "/delete-bouquet-from-cart/:cartId",
  isAuthorized,
  DeleteBouquetFromCart,
);

export default BouquetAddToCartRoute;


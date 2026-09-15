import express from "express";

import {
  AddComboBouquetToCart,
  GetAllComboBouquetFromCart,
  IncrementComboBouquetCart,
  DecrementComboBouquetCart,
  DeleteComboBouquetFromCart,
} from "../../Controller/AddToCart/ComboBouquetController.js";

import isAuthorized from "../../../middlewares/isAuthorized.js";

const ComboBouquetAddToCartRoute = express.Router();

// GET ALL COMBO BOUQUETS FROM CART

ComboBouquetAddToCartRoute.get(
  "/get-all-combo-bouquet-from-cart",
  isAuthorized,
  GetAllComboBouquetFromCart,
);

// ADD COMBO BOUQUET TO CART

ComboBouquetAddToCartRoute.post(
  "/add-combo-bouquet-to-cart",
  isAuthorized,
  AddComboBouquetToCart,
);

// INCREMENT COMBO BOUQUET CART QUANTITY

ComboBouquetAddToCartRoute.patch(
  "/increment-combo-bouquet-cart/:cartId",
  isAuthorized,
  IncrementComboBouquetCart,
);

// DECREMENT COMBO BOUQUET CART QUANTITY

ComboBouquetAddToCartRoute.patch(
  "/decrement-combo-bouquet-cart/:cartId",
  isAuthorized,
  DecrementComboBouquetCart,
);

// DELETE COMBO BOUQUET FROM CART

ComboBouquetAddToCartRoute.delete(
  "/delete-combo-bouquet-from-cart/:cartId",
  isAuthorized,
  DeleteComboBouquetFromCart,
);

export default ComboBouquetAddToCartRoute;
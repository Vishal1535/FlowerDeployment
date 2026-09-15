import express from "express";

import {
  WoolenWishlistController,
  GetAllWishlistController,
  FlowerWishlistController,
  BouquetWishlistController,
  ComboBouquetWishlistController,
  FlowerInBoxWishlistController,
  FlowerInSleeveWishlistController,
} from "../Controller/WhislistController.js";

import isAuthorized from "../../middlewares/isAuthorized.js";

const WishlistRoute = express.Router();

// =====================================================
// GET USER WISHLIST
// =====================================================

WishlistRoute.get(
  "/wishlist",
  isAuthorized,
  GetAllWishlistController
);

// =====================================================
// ADD / REMOVE FLOWER FROM WISHLIST
// =====================================================

WishlistRoute.post(
  "/wishlist/flower/:id",
  isAuthorized,
  FlowerWishlistController
);

// =====================================================
// ADD / REMOVE BOUQUET FROM WISHLIST
// =====================================================

WishlistRoute.post(
  "/wishlist/bouquet/:id",
  isAuthorized,
  BouquetWishlistController
);

// =====================================================
// ADD / REMOVE COMBO BOUQUET FROM WISHLIST
// =====================================================

WishlistRoute.post(
  "/wishlist/combo-bouquet/:id",
  isAuthorized,
  ComboBouquetWishlistController
);

// =====================================================
// ADD / REMOVE FLOWER IN BOX FROM WISHLIST
// =====================================================

WishlistRoute.post(
  "/wishlist/flower-in-box/:id",
  isAuthorized,
  FlowerInBoxWishlistController
);

// =====================================================
// ADD / REMOVE FLOWER IN SLEEVE FROM WISHLIST
// =====================================================

WishlistRoute.post(
  "/wishlist/flower-in-sleeve/:id",
  isAuthorized,
  FlowerInSleeveWishlistController
);

// =====================================================
// ADD / REMOVE WOOLEN FROM WISHLIST
// =====================================================

WishlistRoute.post(
  "/wishlist/woolen/:id",
  isAuthorized,
  WoolenWishlistController
);

export default WishlistRoute;
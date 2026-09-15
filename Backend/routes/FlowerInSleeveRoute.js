import express from "express";

import {
  addFlowerInSleeve,
  getAllFlowerInSleeve,
  getSingleFlowerInSleeve,
  updateFlowerInSleeve,
  deleteFlowerInSleeve,
} from "../controllers/FlowerSleeveController.js";

import isAuthorized from "../middlewares/isAuthorized.js";

const FlowerInSleeveRoute = express.Router();

// Admin Routes
FlowerInSleeveRoute.post(
  "/add-flower-in-sleeve",
  isAuthorized,
  addFlowerInSleeve,
);

FlowerInSleeveRoute.put(
  "/update-flower-in-sleeve/:id",
  isAuthorized,
  updateFlowerInSleeve,
);

FlowerInSleeveRoute.delete(
  "/delete-flower-in-sleeve/:id",
  isAuthorized,
  deleteFlowerInSleeve,
);

// Public Routes
FlowerInSleeveRoute.get(
  "/get-all-flower-in-sleeve",
  getAllFlowerInSleeve,
);

FlowerInSleeveRoute.get(
  "/get-single-flower-in-sleeve/:id",
  getSingleFlowerInSleeve,
);

export default FlowerInSleeveRoute;
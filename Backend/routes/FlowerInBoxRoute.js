import express from "express";

import {
  addFlowerInBox,
  getAllFlowerInBox,
  getSingleFlowerInBox,
  updateFlowerInBox,
  deleteFlowerInBox,
} from "../controllers/FlowerInBoxController.js";

import isAuthorized from "../middlewares/isAuthorized.js";

const FlowerInBoxRoute = express.Router();

// Admin Routes

FlowerInBoxRoute.post(
  "/add-flower-in-box",
  isAuthorized,
  addFlowerInBox,
);

FlowerInBoxRoute.put(
  "/update-flower-in-box/:id",
  isAuthorized,
  updateFlowerInBox,
);

FlowerInBoxRoute.delete(
  "/delete-flower-in-box/:id",
  isAuthorized,
  deleteFlowerInBox,
);

// Public Routes

FlowerInBoxRoute.get(
  "/get-all-flower-in-box",
  getAllFlowerInBox,
);

FlowerInBoxRoute.get(
  "/get-single-flower-in-box/:id",
  getSingleFlowerInBox,
);

export default FlowerInBoxRoute;
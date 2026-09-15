import express from "express";

import {
  createFlower,
  deleteFlower,
  updateFlower,
  getAllFlowers,
  SingleFlower,
  getAllAvailableFlowers,
} from "../controllers/FlowerController.js";

import isAuthorized from "../middlewares/isAuthorized.js";

const flowerRoute = express.Router();

// Create flower
flowerRoute.post("/createflower", isAuthorized, createFlower);

// Delete flower
flowerRoute.delete("/deleteflower/:id", isAuthorized, deleteFlower);

// Update flower
flowerRoute.put("/updateflower/:id", isAuthorized, updateFlower);

// Get all flowers with pagination
flowerRoute.get("/getAllFlower", getAllFlowers);

// Get single flower
flowerRoute.get("/singleflower/:id", SingleFlower);
flowerRoute.get('/all-available',getAllAvailableFlowers)

export default flowerRoute;

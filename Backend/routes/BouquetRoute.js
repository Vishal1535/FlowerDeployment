import express from "express";

import {
  createBouquet,
  updateBouquet,
  deleteBouquet,
  getAllBouquets,
  getSingleBouquet,
  getBouquetsForHero,
} from "../controllers/BouquetController.js";

import isAuthorized from "../middlewares/isAuthorized.js";

const BouquetRoute = express.Router();

// Create Bouquet
BouquetRoute.post("/create", isAuthorized, createBouquet);

// Get All Bouquets
BouquetRoute.get("/all", getAllBouquets);

// Get Single Bouquet
BouquetRoute.get("/singleBouquet/:id", getSingleBouquet);

// Update Bouquet
BouquetRoute.put("/update/:id", isAuthorized, updateBouquet);

// Delete Bouquet
BouquetRoute.delete("/delete/:id", isAuthorized, deleteBouquet);
BouquetRoute.get("/bouquet-hero", getBouquetsForHero);

export default BouquetRoute;

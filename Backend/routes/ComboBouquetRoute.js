import express from "express";

import {
  CreateComboBouquet,
  UpdateComboBouquet,
  DeleteComboBouquet,
  GetAllComboBouquet,
  GetSingleComboBouquet,
  GetComboBouquetByOccasion,
} from "../controllers/ComboBouquertController.js";

import isAuthorized from "../middlewares/isAuthorized.js";

const ComboBouquetRoute = express.Router();

// Create
ComboBouquetRoute.post(
  "/combo-bouquet/create",
  isAuthorized,
  CreateComboBouquet
);

// Update
ComboBouquetRoute.put(
  "/combo-bouquet/update/:id",
  isAuthorized,
  UpdateComboBouquet
);

// Delete
ComboBouquetRoute.delete(
  "/combo-bouquet/delete/:id",
  isAuthorized,
  DeleteComboBouquet
);

// Get All
ComboBouquetRoute.get(
  "/combo-bouquet/all",
  GetAllComboBouquet
);

// Get Single
ComboBouquetRoute.get(
  "/combo-bouquet/:id",
  GetSingleComboBouquet
);

// Get By Occasion
ComboBouquetRoute.post(
  "/combo-bouquet/occasion",
  GetComboBouquetByOccasion
);

export default ComboBouquetRoute;
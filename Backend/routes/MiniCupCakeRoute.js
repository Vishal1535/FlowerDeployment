import express from "express";

import {
  CreateMiniCupcake,
  UpdateMiniCupcake,
  DeleteMiniCupcake,
  GetAllMiniCupcake,
  GetSingleMiniCupcake,
  GetMiniCupcakeByOccasion,
} from "../controllers/MiniCupcakeController.js";

import isAuthorized from "../middlewares/isAuthorized.js";

const MiniCupCakeRoute = express.Router();

// Create
MiniCupCakeRoute.post(
  "/mini-cupcake/create",
  isAuthorized,
  CreateMiniCupcake
);

// Update
MiniCupCakeRoute.put(
  "/mini-cupcake/update/:id",
  isAuthorized,
  UpdateMiniCupcake
);

// Delete
MiniCupCakeRoute.delete(
  "/mini-cupcake/delete/:id",
  isAuthorized,
  DeleteMiniCupcake
);

// Get All
MiniCupCakeRoute.get(
  "/mini-cupcake/all",
  GetAllMiniCupcake
);

// Get Single
MiniCupCakeRoute.get(
  "/mini-cupcake/:id",
  GetSingleMiniCupcake
);

// Get By Occasion
MiniCupCakeRoute.post(
  "/mini-cupcake/occasion",
  GetMiniCupcakeByOccasion
);

export default MiniCupCakeRoute;
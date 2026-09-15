import express from "express";

import {
  CreateWoolen,
  UpdateWoolen,
  DeleteWoolen,
  GetAllWoolen,
  GetSingleWoolen,
  GetWoolenByOccasion,
} from "../controllers/WoolenController.js";

import isAuthorized from "../middlewares/isAuthorized.js";

const WoolenRoute = express.Router();

// Create
WoolenRoute.post("/woolen/create", isAuthorized, CreateWoolen);

// Update
WoolenRoute.put("/woolen/update/:id", isAuthorized, UpdateWoolen);

// Delete
WoolenRoute.delete("/woolen/delete/:id", isAuthorized, DeleteWoolen);

// Get All
WoolenRoute.get("/woolen/all", GetAllWoolen);

// Get Single
WoolenRoute.get("/woolen/:id", GetSingleWoolen);

// Get By Occasion
WoolenRoute.post("/woolen/occasion", GetWoolenByOccasion);

export default WoolenRoute;

import express from "express";

import {
  CreateChocolate,
  UpdateChocolate,
  DeleteChocolate,
  GetAllChocolate,
  GetSingleChocolate,
  GetChocolateByOccasion,
} from "../controllers/ChocolateController.js";

import isAuthorized from "../middlewares/isAuthorized.js";

const ChocolateRoute = express.Router();

ChocolateRoute.post(
  "/chocolate/create",
  isAuthorized,
  CreateChocolate
);

ChocolateRoute.put(
  "/chocolate/update/:id",
  isAuthorized,
  UpdateChocolate
);

ChocolateRoute.delete(
  "/chocolate/delete/:id",
  isAuthorized,
  DeleteChocolate
);

ChocolateRoute.get(
  "/chocolate/all",
  GetAllChocolate
);

ChocolateRoute.get(
  "/chocolate/:id",
  GetSingleChocolate
);

ChocolateRoute.post(
  "/chocolate/occasion",
  GetChocolateByOccasion
);

export default ChocolateRoute;
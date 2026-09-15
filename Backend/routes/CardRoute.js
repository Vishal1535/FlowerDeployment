import express from "express";

import {
  CreateCard,
  UpdateCard,
  DeleteCard,
  GetAllCard,
  GetSingleCard,
  GetCardByOccasion,
} from "../controllers/CardController.js";

import isAuthorized from "../middlewares/isAuthorized.js";

const CardRoute = express.Router();

// ================= CREATE CARD =================

CardRoute.post(
  "/card/create",
  isAuthorized,
  CreateCard
);

// ================= UPDATE CARD =================

CardRoute.put(
  "/card/update/:id",
  isAuthorized,
  UpdateCard
);

// ================= DELETE CARD =================

CardRoute.delete(
  "/card/delete/:id",
  isAuthorized,
  DeleteCard
);

// ================= GET ALL CARDS =================

CardRoute.get(
  "/card/all",
  GetAllCard
);

// ================= GET SINGLE CARD =================

CardRoute.get(
  "/card/:id",
  GetSingleCard
);

// ================= GET CARD BY OCCASION =================

CardRoute.post(
  "/card/occasion",
  GetCardByOccasion
);

export default CardRoute;
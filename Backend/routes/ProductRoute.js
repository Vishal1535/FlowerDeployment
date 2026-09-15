import express from "express";

import {
  globalSearch,
  GetAllProductsByOccasion,
} from "../controllers/ProductController.js";

const ProductRoute = express.Router();

// ================= GLOBAL SEARCH =================
ProductRoute.get("/search", globalSearch);

// ================= OCCASION FILTER =================
ProductRoute.get("/occasion/:occasion", GetAllProductsByOccasion);

export default ProductRoute;

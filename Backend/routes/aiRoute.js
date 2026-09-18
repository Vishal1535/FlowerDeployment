import express from "express";
import { getAIRecommendation } from "../controllers/aiController.js";

const Airouter = express.Router();

Airouter.post("/recommend", getAIRecommendation);

export default Airouter;

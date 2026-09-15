import express from "express";

import {
  CreateRazorpayOrder,
  VerifyRazorpayPayment,
} from "../controllers/PaymentController.js";

const PaymentRoute = express.Router();

PaymentRoute.post(
  "/create-payment-order",
  CreateRazorpayOrder
);

PaymentRoute.post(
  "/verify-payment",
  VerifyRazorpayPayment
);

export default PaymentRoute;
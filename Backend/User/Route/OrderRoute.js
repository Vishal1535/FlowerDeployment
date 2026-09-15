import express from "express";

import {
  CreateOrder,
  GetMyOrders,
  ChangeOrderStatus,
  CancelOrders,
  GetAllOrders,
  CreateSingleProductOrder,
} from "../Controller/OrderController.js";

import isAuthorized from "../../middlewares/isAuthorized.js";

const OrderRouter = express.Router();

// =====================================================
// CREATE NEW ORDER
// =====================================================

OrderRouter.post("/orders", isAuthorized, CreateOrder);

// =====================================================
// GET MY ORDERS
// =====================================================

OrderRouter.get("/orders/my", isAuthorized, GetMyOrders);

// =====================================================
// CANCEL ORDER
// Order delete from OrderModel
// =====================================================

OrderRouter.delete("/orders/cancel/:orderId", isAuthorized, CancelOrders);

// =====================================================
// CHANGE ORDER STATUS
// =====================================================

OrderRouter.patch("/orders/status/:orderId", isAuthorized, ChangeOrderStatus);
OrderRouter.get("/all-orders", isAuthorized, GetAllOrders);
OrderRouter.post("/orders/single", isAuthorized, CreateSingleProductOrder);
export default OrderRouter;

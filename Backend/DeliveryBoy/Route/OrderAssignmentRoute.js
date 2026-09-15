import express from "express";

import {
  AssignOrderToDeliveryBoy,
  UnassignOrderFromDeliveryBoy,
  ReassignOrder,
  GetOrderAssignment,
} from "../Controller/OrderAssignmentController.js";

import isAuthorized from "../../middlewares/isAuthorized.js";

const OrderAssignmentRoute = express.Router();

// =====================================================
// ORDER ASSIGNMENT ROUTES
// =====================================================

// Assign order to delivery boy
OrderAssignmentRoute.post(
  "/admin/orders/:orderId/assign-delivery-boy",
  isAuthorized,
  AssignOrderToDeliveryBoy
);

// Unassign delivery boy from order
OrderAssignmentRoute.patch(
  "/admin/orders/:orderId/unassign-delivery-boy",
  isAuthorized,
  UnassignOrderFromDeliveryBoy
);

// Reassign order to another delivery boy
OrderAssignmentRoute.patch(
  "/admin/orders/:orderId/reassign-delivery-boy",
  isAuthorized,
  ReassignOrder
);

// Get order assignment details
OrderAssignmentRoute.get(
  "/admin/orders/:orderId/assignment-details",
  isAuthorized,
  GetOrderAssignment
);

export default OrderAssignmentRoute;
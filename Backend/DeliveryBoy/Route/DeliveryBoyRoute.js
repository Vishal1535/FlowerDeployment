import express from "express";

import isAuthorized from "../../middlewares/isAuthorized.js";

import {
  GetMyDeliveryBoyProfile,
  GetMyAssignedOrders,
  GetMySingleOrder,
  AcceptOrder,
  UpdateMyLocation,
  MarkOrderDelivered,
  GetMyDeliveryStats,
} from "../Controller/DeliveyBoyController.js";

const DeliveryBoyRoute = express.Router();

// =====================================================
// DELIVERY BOY PROFILE
// =====================================================

// Delivery boy apni profile dekhega
DeliveryBoyRoute.get(
  "/delivery-boy/my-profile",
  isAuthorized,
  GetMyDeliveryBoyProfile,
);

// =====================================================
// ASSIGNED ORDERS
// =====================================================

// Delivery boy ko apne saare assigned orders milenge
DeliveryBoyRoute.get(
  "/delivery-boy/my-assigned-orders",
  isAuthorized,
  GetMyAssignedOrders,
);

// =====================================================
// SINGLE ASSIGNED ORDER
// =====================================================

// Delivery boy ek particular assigned order dekhega
DeliveryBoyRoute.get(
  "/delivery-boy/my-order/:id",
  isAuthorized,
  GetMySingleOrder,
);

// =====================================================
// ACCEPT ORDER
// =====================================================

// Delivery boy assigned order accept karega
DeliveryBoyRoute.patch(
  "/delivery-boy/accept-order/:id",
  isAuthorized,
  AcceptOrder,
);

// =====================================================
// UPDATE MY LOCATION
// =====================================================

// Delivery boy apni current location update karega
DeliveryBoyRoute.patch(
  "/delivery-boy/update-my-location",
  isAuthorized,
  UpdateMyLocation,
);

// =====================================================
// MARK ORDER DELIVERED
// =====================================================

// Delivery boy order ko delivered mark karega
DeliveryBoyRoute.patch(
  "/delivery-boy/mark-order-delivered/:id",
  isAuthorized,
  MarkOrderDelivered,
);

// =====================================================
// DELIVERY STATISTICS
// =====================================================

// Delivery boy apni delivery statistics dekhega
DeliveryBoyRoute.get(
  "/delivery-boy/my-delivery-stats",
  isAuthorized,
  GetMyDeliveryStats,
);

export default DeliveryBoyRoute;

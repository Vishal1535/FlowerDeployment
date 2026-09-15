import express from "express";

import isAuthorized from "../../middlewares/isAuthorized.js";

import {
  CreateDeliveryBoy,
  GetAllDeliveryBoys,
  GetSingleDeliveryBoy,
  UpdateDeliveryBoy,
  UpdateDeliveryBoyAvailability,
  DeleteDeliveryBoy,
} from "../Controller/AdminController.js";

const AdminRoute = express.Router();

// =====================================================
// CREATE DELIVERY BOY
// =====================================================

AdminRoute.post("/admin/create-delivery-boy", isAuthorized, CreateDeliveryBoy);

// =====================================================
// GET ALL DELIVERY BOYS
// =====================================================

AdminRoute.get(
  "/admin/get-all-delivery-boys",
  isAuthorized,
  GetAllDeliveryBoys,
);

// =====================================================
// GET SINGLE DELIVERY BOY
// =====================================================

AdminRoute.get(
  "/admin/get-single-delivery-boy/:id",
  isAuthorized,
  GetSingleDeliveryBoy,
);

// =====================================================
// UPDATE DELIVERY BOY
// =====================================================

AdminRoute.put(
  "/admin/update-delivery-boy/:id",
  isAuthorized,
  UpdateDeliveryBoy,
);

// =====================================================
// CHANGE DELIVERY BOY AVAILABILITY
// =====================================================

AdminRoute.patch(
  "/admin/change-delivery-boy-availability/:id",
  isAuthorized,
  UpdateDeliveryBoyAvailability,
);

// =====================================================
// DELETE DELIVERY BOY
// =====================================================

AdminRoute.delete(
  "/admin/delete-delivery-boy/:id",
  isAuthorized,
  DeleteDeliveryBoy,
);

export default AdminRoute;

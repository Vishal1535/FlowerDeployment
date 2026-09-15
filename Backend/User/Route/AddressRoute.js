import express from "express";

import {
  AddAddress,
  GetLatestAddress,
} from "../Controller/AddressController.js";

import isAuthorized from "../../middlewares/isAuthorized.js";

const AddressRoute = express.Router();

// =====================================================
// ADD ADDRESS
// =====================================================

AddressRoute.post(
  "/add-address",
  isAuthorized,
  AddAddress
);

// =====================================================
// GET LATEST ADDRESS
// =====================================================

AddressRoute.get(
  "/get-latest-address",
  isAuthorized,
  GetLatestAddress
);

export default AddressRoute;
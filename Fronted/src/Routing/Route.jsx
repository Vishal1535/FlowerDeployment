
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AuthRouting from "./Auth.jsx";
import NavBarRoute from "./NavbarRoute.jsx";
import { Flower } from "./Flower.jsx";
import Gift from "./GIftItem.jsx";
import SingleProduct from "./SingleProduct.jsx";
import SpecialBouquetRoutes from "./SpecialBouquet.jsx";
import { ProductRoute } from "./Product.jsx";
import { AdminRoute } from "./Admin.jsx";
import DeliveryBoyRoute from "./DeliveryBoy.jsx";
import UserRoute from "./User.jsx";
const router = createBrowserRouter([
  ...AuthRouting,
  ...NavBarRoute,
  ...Flower,
  ...Gift,
  ...SingleProduct,
  ...SpecialBouquetRoutes,
  ...ProductRoute,
  ...UserRoute,
  ...AdminRoute,
  ...DeliveryBoyRoute
  
]);

export const Route = () => {
  return <RouterProvider router={router} />;
};


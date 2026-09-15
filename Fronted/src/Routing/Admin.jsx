import { Order } from "../Admin/Order/Order";
import { OrderDetails } from "../Admin/Order/OrderDetails";

import { DeliveryBoy } from "../Admin/DeliveryBoy/DeliveryBoy";
import { DeliveryBoyDetails } from "../Admin/DeliveryBoy/DeliveryBoyDetails";
import { AssignOrder } from "../Admin/OrderManagement/AssignOrder";
export const AdminRoute = [
  // =====================================================
  // ORDERS
  // =====================================================

  {
    path: "/admin/orders",
    element: <Order />,
  },

  {
    path: "/admin/orders/:id",
    element: <OrderDetails />,
  },

  // =====================================================
  // DELIVERY BOYS
  // =====================================================

  {
    path: "/admin/delivery-boys",
    element: <DeliveryBoy />,
  },
  {
    path:'/admin/delivery-boys/:id',
    element:<DeliveryBoyDetails/>
  },
  {
    path:'/admin/delivery-boys/:DeliveryBoyId/assign-order',
    element:<AssignOrder/>
  }
];

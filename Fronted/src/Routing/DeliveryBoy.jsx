import { DashBoard } from "../DeliveryBoy/DashBoard/DashBoard";

import { MyAssignmentOrder } from "../DeliveryBoy/DashBoard/MyAssignmentOrder/MyAssignmentOrder";
import { SignalOrder } from "../DeliveryBoy/DashBoard/MyAssignmentOrder/SignalOrder";
import { MyOrder } from "../DeliveryBoy/MyOrder/MyOrder";
const DeliveryBoyRoute = [
  {
    path: "/delivery-boy/dashboard",
    element: <DashBoard />,
  },
  {
    path: "/delivery-boy/orders",
    element: <MyAssignmentOrder />,
  },
 
  {
    path:'/delivery-boy/order/:id',
    element:<SignalOrder/>
  },
  {
    path:"/delivery-boy/MyOrder",
    element:<MyOrder/>
  }
];

export default DeliveryBoyRoute;
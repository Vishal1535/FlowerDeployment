import { AddToCart } from "../User/Add_To_Cart/AddToCart";
import { Wishlist } from "../User/Wislist/Wishlist";
import { Address } from "../User/Address/Address";
import { Checkout } from "../User/Checkout/Checkout";
import { MyOrder } from "../User/MyOrder/MyOrder";
import { OrderDetails } from "../User/MyOrder/OrderDetails";
import { About } from "../Component/About/About";
import { Contact } from "../Component/Contact/Contact";
import { BuytheSingleProduct } from "../User/BuySingleProduct/BuytheSingleProduct";
import { BuySingleProductAddress } from "../User/BuySingleProduct/BuySingleProductAddress";
import { ButSingleProductSummary } from "../User/BuySingleProduct/ButSingleProductSummary";
import { Profile } from "../User/Profile/Profile";
import { Setting } from "../User/Setting/Setting";
const UserRoute = [
  {
    path: "/cart",
    element: <AddToCart />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path:'/address',
    element:<Address/>
  },
  {
    path:'/check-out',
    element:<Checkout/>
  },
  {
    path:'/My-Order',
    element:<MyOrder/>
  }
  ,{
    path:'/My-Order/:id',
    element:<OrderDetails/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/contact',
    element:<Contact/>
  },
  {
    path:'/buy-single-product',
    element:<BuytheSingleProduct/>
  },{
    path:'/buy-single-product-address',
    element:<BuySingleProductAddress/>
  },
  {
    path:"/buy-single-product-checkout",
    element:<ButSingleProductSummary/>
  },
  {
    path:"/profile",
    element:<Profile/>

  },
  {
    path:"/settings",
    element:<Setting/>
  }
];
export default UserRoute

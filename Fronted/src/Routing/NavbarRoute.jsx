import { LoginPopUp } from "../Component/Auth/LoginPopUp";
import { Navbar } from "../Component/NavBar/Navbar";
import { Product } from "../Component/Product/Product";

const NavBarRoute = [
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <LoginPopUp />
      </>
    ),
    
  },
  {
    path:"/admin/products",
    element:<Product/>
  }
];

export default NavBarRoute;
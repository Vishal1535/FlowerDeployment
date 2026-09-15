
import { ForgetOtpPassword } from "../Component/Auth/ForgetOtpPassword";
import { ForgetPassword } from "../Component/Auth/ForgetPassword";
import { Login } from "../Component/Auth/Login";
import { NewPassword } from "../Component/Auth/NewPassword";
import { Register } from "../Component/Auth/Register";
import { RegisterOtp } from "../Component/Auth/RegisterOtp";

const AuthRouting = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-otp",
    element: <RegisterOtp />,
  },
  {
    path:"/forgot-password",
    element:<ForgetPassword/>
  },
  {
    path:'/forget-otp-password',
    element:<ForgetOtpPassword/>
  },
  {
    path:'/new-password',
    element:<NewPassword/>
  }
];

export default AuthRouting;


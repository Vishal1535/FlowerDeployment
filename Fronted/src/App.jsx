import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route } from "./Routing/Route";
import { useSelector } from "react-redux";
import { LoginPopUp } from "./Component/Auth/LoginPopUp";

function App() {
  
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />

      <Route />
    </>
  );
}

export default App;

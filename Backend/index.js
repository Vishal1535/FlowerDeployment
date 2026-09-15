import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./configs/db.js";

import userRoute from "./routes/userRoute.js";
import flowerRoute from "./routes/flowerRoute.js";
import BouquetRoute from "./routes/BouquetRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import ChocolateRoute from "./routes/ChocolateRoute.js";
import CardRoute from "./routes/CardRoute.js";
import MiniCupCakeRoute from "./routes/MiniCupCakeRoute.js";
import ComboBouquetRoute from "./routes/ComboBouquetRoute.js";
import WoolenRoute from "./routes/WoolenRoute.js";
import FlowerInBoxRoute from "./routes/FlowerInBoxRoute.js";
import FlowerInSleeveRoute from "./routes/FlowerInSleeveRoute.js";
import WhisListRoute from "./User/Route/WhislistRoute.js";
import FlowerAddToCartRoute from "./User/Route/AddToCart/FlowerAddToCartRoute.js";
import BouquetAddToCartRoute from "./User/Route/AddToCart/BouquetAddToCartRoute.js";
import ComboBouquetAddToCartRoute from "./User/Route/AddToCart/ComboBouquetRoute.js";
import WoolenBouquetAddToCartRoute from "./User/Route/AddToCart/WoolenBouquetAddToCartRoute.js";
import FlowerInBoxAddToCartRoute from "./User/Route/AddToCart/FlowerInBoxRoute.js";
import FlowerInSleeveAddToCartRoute from "./User/Route/AddToCart/FlowerInSleeveAddToCartRoute.js";
import CardAddToCartRoute from "./User/Route/AddToCart/CardAddToCartRoute.js";
import ChocolateAddToCartRoute from "./User/Route/AddToCart/ChocolateAddToCartRoute.js";
import MiniCupcakeAddToCartRoute from "./User/Route/AddToCart/MiniCupCakeAddToCartRoute.js";
import AddressRoute from "./User/Route/AddressRoute.js";
import OrderRouter from "./User/Route/OrderRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import AdminRoute from "./DeliveryBoy/Route/AdminRoute.js";
import DeliveryBoyRoute from "./DeliveryBoy/Route/DeliveryBoyRoute.js";
import OrderAssignmentRoute from "./DeliveryBoy/Route/OrderAssignmentRoute.js";


const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://flower-fronted.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
res.send("sever is running")
})

// Test Route
app.use("/", userRoute);
app.use("/", flowerRoute);
app.use("/", BouquetRoute);
app.use("/", ProductRoute);
app.use("/", ChocolateRoute);
app.use("/", CardRoute);
app.use("/", MiniCupCakeRoute);
app.use("/", ComboBouquetRoute);
app.use("/", WoolenRoute);
app.use("/", FlowerInBoxRoute);
app.use('/',FlowerInSleeveRoute)
app.use('/',WhisListRoute)
app.use('/',FlowerAddToCartRoute)
app.use('/',BouquetAddToCartRoute)
app.use('/',ComboBouquetAddToCartRoute)
app.use('/',WoolenBouquetAddToCartRoute)
app.use('/',FlowerInBoxAddToCartRoute)
app.use('/',FlowerInSleeveAddToCartRoute)
app.use('/',CardAddToCartRoute)
app.use('/',ChocolateAddToCartRoute)
app.use('/',MiniCupcakeAddToCartRoute)
app.use('/',AddressRoute)
app.use('/',OrderRouter)
app.use('/',PaymentRoute)
app.use('/',AdminRoute)
app.use('/',DeliveryBoyRoute)
app.use('/',OrderAssignmentRoute)
// Server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});

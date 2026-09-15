import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./AuthSlice/AuthSlice";
import flowerReducer from "./flowerSlice/FlowerSlice";
import BouquetReducer from "./Bouquest/BouquestSlice";
import ChocolateReducer from "./Chocolate/ChocolateSlice";
import MiniCupCakeReducer from "./MiniCupCake/MiniCupCakeSlice";
import CardReducer from "./Card/CardSlice";
import ComboBouquetReducer from "./ComboBouquet/ComboBouquetSlice";
import WoolenReducer from "./Woolen/WoolenSlice";
import FlowerInBoxReducer from "./FlowerInBox/FlowerInBoxSlice";
import FlowerInSleeveReducer from "./FlowerSleeve/FlowerSleeveSlice";
import ProductReducer from "./ProductData/ProductSlice";
import WishlistReducer from "./Whislist/WhislistSlice";
import FlowerAddToCartReducer from "./AddToCart/FlowerAddToCart/FlowerAddToCartSlice";
import BouquetAddToCartReducer from "./AddToCart/BouquetAddToCart/BouquetAddToCartSlice";
import ComboBouquetAddToCartReducer from "./AddToCart/ComboBouquetAddToCart/ComboBouquetAddToCartSlice";
import WoolenBouquetAddToCartReducer from "./AddToCart/WoolenAddToCart/WoolenAddToCartSlice";
import FlowerInBoxAddToCartReducer from "./AddToCart/FlowerInBox/FlowerInBoxAddToCartSlice";
import FlowerInSleeveAddToCartReducer from "./AddToCart/FlowerInSleeve/FlowerInSleeveAddToCartSlice";
import CardAddToCartReducer from "./AddToCart/Card/CardAddToCardSlice";
import ChocolateAddToCartReducer from "./AddToCart/Chocolate/ChocolateAddToCartSlice";
import MiniCupCakeAddToCartReducer from "./AddToCart/MiniCupCake/MiniCupCakeAddToCartSlice";
import AddressReducer from "./Address/AddressSlice";
import OrderReducer from "./Order/OrderSlice";
import PaymentReducer from "./Payment/PaymentSlice";
import DeliveryBoyManagementReducer from "./Admin/DeliveryBoy/DeliverySlice";
import AssignOrderReducer from "./Admin/AssignmentOrder/AssignOrderSlice";
import DeliveryBoyReducer from "./DeliveryBoy/DeliveryBoySlice";
import BuySingleProductReducer from "./BuySingleProduct/ButSingleProductSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    flower: flowerReducer,
    bouquet: BouquetReducer,
    chocolate: ChocolateReducer,
    miniCupCake: MiniCupCakeReducer,
    card: CardReducer,
    comboBouquet:ComboBouquetReducer,
    woolen:WoolenReducer,
    flowerInBox:FlowerInBoxReducer,
    flowerInSleeve:FlowerInSleeveReducer,
    product:ProductReducer,
    wishlist:WishlistReducer,
    FlowerAddToCart:FlowerAddToCartReducer,
    BouquetAddToCart:BouquetAddToCartReducer,
    ComboBouquetAddToCart:ComboBouquetAddToCartReducer,
    WoolenBouquetAddToCart:WoolenBouquetAddToCartReducer,
    FlowerInBoxAddToCart:FlowerInBoxAddToCartReducer,
    FlowerInSleeveAddToCart:FlowerInSleeveAddToCartReducer,
    CardAddToCart:CardAddToCartReducer,
    ChocolateAddToCart:ChocolateAddToCartReducer,
    MiniCupCakeAddToCart:MiniCupCakeAddToCartReducer,
    Address:AddressReducer,
    Order:OrderReducer,
    payment:PaymentReducer,
    DeliveryBoyManagement:DeliveryBoyManagementReducer,
    AssignOrder:AssignOrderReducer,
    DeliveryBoy:DeliveryBoyReducer,
    BuySingleProduct:BuySingleProductReducer


  },
});

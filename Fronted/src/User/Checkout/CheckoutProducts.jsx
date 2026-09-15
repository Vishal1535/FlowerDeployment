
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Package,
  Plus,
  Minus,
} from "lucide-react";

import {
  GetAllBouquetFromCartThunk,
} from "../../Store/AddToCart/BouquetAddToCart/BouquetAddToCartApi";

import {
  GetAllCardFromCartThunk,
} from "../../Store/AddToCart/Card/CardAddToCardApi";

import {
  GetAllChocolateFromCartThunk,
} from "../../Store/AddToCart/Chocolate/ChocolateAddToCartApi";

import {
  GetAllComboBouquetFromCartThunk,
} from "../../Store/AddToCart/ComboBouquetAddToCart/ComboBouquetAddToCartApi";

import {
  GetAllFlowerFromCartThunk,
} from "../../Store/AddToCart/FlowerAddToCart/FlowerAddToCartApi";

import {
  GetAllFlowerInBoxFromCartThunk,
} from "../../Store/AddToCart/FlowerInBox/FlowerInBoxAddToCartApi";

import {
  GetAllFlowerInSleeveFromCartThunk,
} from "../../Store/AddToCart/FlowerInSleeve/FlowerInSleeveAddToCartApi";

import {
  GetAllMiniCupcakeFromCartThunk,
} from "../../Store/AddToCart/MiniCupCake/MiniCupCakeAddToCartApi";

import {
  GetAllWoolenBouquetFromCartThunk,
} from "../../Store/AddToCart/WoolenAddToCart/WoolenAddToCartApi";

export const CheckoutProducts = () => {
  const dispatch = useDispatch();

  // =========================================
  // CART STATES
  // =========================================

  const { bouquetFromCart = [] } = useSelector(
    (state) => state.BouquetAddToCart
  );

  const { cardFromCart = [] } = useSelector(
    (state) => state.CardAddToCart
  );

  const { chocolateFromCart = [] } = useSelector(
    (state) => state.ChocolateAddToCart
  );

  const { comboBouquetFromCart = [] } = useSelector(
    (state) => state.ComboBouquetAddToCart
  );

  const { flowerFromCart = [] } = useSelector(
    (state) => state.FlowerAddToCart
  );

  const { flowerInBoxFromCart = [] } = useSelector(
    (state) => state.FlowerInBoxAddToCart
  );

  const { flowerInSleeveFromCart = [] } = useSelector(
    (state) => state.FlowerInSleeveAddToCart
  );

  const { miniCupcakeFromCart = [] } = useSelector(
    (state) => state.MiniCupCakeAddToCart
  );

  const { woolenBouquetFromCart = [] } = useSelector(
    (state) => state.WoolenBouquetAddToCart
  );

  // =========================================
  // GET ALL CART DATA
  // =========================================

  useEffect(() => {
    dispatch(GetAllBouquetFromCartThunk());
    dispatch(GetAllCardFromCartThunk());
    dispatch(GetAllChocolateFromCartThunk());
    dispatch(GetAllComboBouquetFromCartThunk());
    dispatch(GetAllFlowerFromCartThunk());
    dispatch(GetAllFlowerInBoxFromCartThunk());
    dispatch(GetAllFlowerInSleeveFromCartThunk());
    dispatch(GetAllMiniCupcakeFromCartThunk());
    dispatch(GetAllWoolenBouquetFromCartThunk());
  }, [dispatch]);

  // =========================================
  // COMBINE ALL PRODUCTS
  // =========================================

  const products = [
    ...flowerFromCart.map((item) => ({
      ...item,
      type: "Flower",
      product: item?.flower,
    })),

    ...flowerInSleeveFromCart.map((item) => ({
      ...item,
      type: "Flower In Sleeve",
      product: item?.flowerInSleeve,
    })),

    ...bouquetFromCart.map((item) => ({
      ...item,
      type: "Bouquet",
      product: item?.bouquet,
    })),

    ...comboBouquetFromCart.map((item) => ({
      ...item,
      type: "Combo Bouquet",
      product: item?.comboBouquet,
    })),

    ...woolenBouquetFromCart.map((item) => ({
      ...item,
      type: "Woolen Bouquet",
      product: item?.woolenBouquet,
    })),

    ...flowerInBoxFromCart.map((item) => ({
      ...item,
      type: "Flower In Box",
      product: item?.flowerInBox,
    })),

    ...cardFromCart.map((item) => ({
      ...item,
      type: "Card",
      product: item?.card,
    })),

    ...chocolateFromCart.map((item) => ({
      ...item,
      type: "Chocolate",
      product: item?.chocolate,
    })),

    ...miniCupcakeFromCart.map((item) => ({
      ...item,
      type: "Mini Cupcake",
      product: item?.miniCupcake,
    })),
  ];

  // =========================================
  // EMPTY CART
  // =========================================

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">

        <div
          className="
            mx-auto
            w-14
            h-14
            rounded-full
            bg-pink-50
            flex
            items-center
            justify-center
            text-pink-400
          "
        >
          <Package size={25} />
        </div>

        <h3 className="mt-3 text-base font-bold text-gray-700">
          Your cart is empty
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          Add some products before checkout.
        </p>

      </div>
    );
  }

  return (
    <div className="divide-y divide-pink-50">

      {products.map((item) => {
        const product = item?.product;

        const quantity = item?.quantity || 1;
        const price = product?.price || 0;

        const totalPrice = price * quantity;

        return (
          <div
            key={`${item?.type}-${item?._id}`}
            className="
              p-4
              sm:p-5
              hover:bg-pink-50/20
              transition
            "
          >

            <div className="flex gap-4">

              {/* =================================
                  IMAGE
              ================================= */}

              <div
                className="
                  w-20
                  h-20
                  sm:w-24
                  sm:h-24
                  rounded-xl
                  overflow-hidden
                  shrink-0
                  bg-pink-50
                  border
                  border-pink-100
                  flex
                  items-center
                  justify-center
                "
              >

                {product?.image ? (
                  <img
                    src={product.image}
                    alt={product?.name || item?.type}
                    draggable="false"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                ) : (
                  <Package
                    size={25}
                    className="text-pink-300"
                  />
                )}

              </div>

              {/* =================================
                  DETAILS
              ================================= */}

              <div className="flex-1 min-w-0">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-wide
                        font-semibold
                        text-pink-400
                      "
                    >
                      {item?.type}
                    </p>

                    <h4
                      className="
                        mt-0.5
                        text-sm
                        sm:text-base
                        font-bold
                        text-gray-700
                        line-clamp-2
                      "
                    >
                      {product?.name ||
                        `Delicious ${item?.type}`}
                    </h4>

                  </div>

                  {/* TOTAL */}

                  <div className="text-right shrink-0">

                    <p className="text-base font-extrabold text-gray-800">
                      ₹{totalPrice}
                    </p>

                    {quantity > 1 && (
                      <p className="text-[10px] text-gray-400">
                        ₹{price} × {quantity}
                      </p>
                    )}

                  </div>

                </div>

                {/* =================================
                    PRICE + QUANTITY
                ================================= */}

                <div className="mt-3 flex items-center justify-between">

                  <p className="text-xs text-gray-400">
                    ₹{price} per item
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      rounded-lg
                      border
                      border-pink-100
                      overflow-hidden
                    "
                  >

                    <button
                      type="button"
                      disabled
                      className="
                        w-7
                        h-7
                        flex
                        items-center
                        justify-center
                        bg-pink-50
                        text-pink-300
                      "
                    >
                      <Minus size={12} />
                    </button>

                    <span
                      className="
                        min-w-8
                        h-7
                        px-2
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-bold
                        text-gray-700
                        border-x
                        border-pink-100
                      "
                    >
                      {quantity}
                    </span>

                    <button
                      type="button"
                      disabled
                      className="
                        w-7
                        h-7
                        flex
                        items-center
                        justify-center
                        bg-pink-50
                        text-pink-300
                      "
                    >
                      <Plus size={12} />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
};

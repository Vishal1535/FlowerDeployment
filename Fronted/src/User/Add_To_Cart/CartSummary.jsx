
import React, { useEffect } from "react";
import {
  ArrowRight,
  ShoppingBag,
  Flower2,
  Gift,
  Layers,
  Package,
  Box,
  CreditCard,
  Cake,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const CartSummary = () => {
  // ==============================
  // FLOWER CART
  // ==============================
const navigate = useNavigate();
  const { flowerFromCart = [] } = useSelector(
    (state) => state.FlowerAddToCart
  );

  
  // ==============================
  // FLOWER IN SLEEVE CART
  // ==============================
  const { isAuthorized } = useSelector((state) => state.user);

useEffect(() => {
  // User login nahi hai
  // Ya user admin nahi hai
  if (!isAuthorized) {
    navigate("/", {
      replace: true,
    });
  }
}, [isAuthorized, navigate]);

  const { flowerInSleeveFromCart = [] } = useSelector(
    (state) => state.FlowerInSleeveAddToCart
  );

  // ==============================
  // BOUQUET CART
  // ==============================

  const { bouquetFromCart = [] } = useSelector(
    (state) => state.BouquetAddToCart
  );

  // ==============================
  // COMBO BOUQUET CART
  // ==============================

  const { comboBouquetFromCart = [] } = useSelector(
    (state) => state.ComboBouquetAddToCart
  );

  // ==============================
  // WOOLEN BOUQUET CART
  // ==============================

  const { woolenBouquetFromCart = [] } = useSelector(
    (state) => state.WoolenBouquetAddToCart
  );

  // ==============================
  // FLOWER IN BOX CART
  // ==============================

  const { flowerInBoxFromCart = [] } = useSelector(
    (state) => state.FlowerInBoxAddToCart
  );

  // ==============================
  // CARD CART
  // ==============================

  const { cardFromCart = [] } = useSelector(
    (state) => state.CardAddToCart
  );

  // ==============================
  // CHOCOLATE CART
  // ==============================

  const { chocolateFromCart = [] } = useSelector(
    (state) => state.ChocolateAddToCart
  );

  // ==============================
  // MINI CUPCAKE CART
  // ==============================

  const { miniCupcakeFromCart = [] } = useSelector(
    (state) => state.MiniCupCakeAddToCart
  );

  // =====================================================
  // QUANTITY
  // =====================================================

  // FLOWERS

  const flowerQuantity = flowerFromCart.reduce(
    (total, item) =>
      total + (item?.quantity || 0),
    0
  );

  // FLOWER IN SLEEVE

  const flowerInSleeveQuantity =
    flowerInSleeveFromCart.reduce(
      (total, item) =>
        total + (item?.quantity || 0),
      0
    );

  // BOUQUETS

  const bouquetQuantity = bouquetFromCart.reduce(
    (total, item) =>
      total + (item?.quantity || 0),
    0
  );

  // COMBO BOUQUETS

  const comboBouquetQuantity =
    comboBouquetFromCart.reduce(
      (total, item) =>
        total + (item?.quantity || 0),
      0
    );

  // WOOLEN BOUQUETS

  const woolenBouquetQuantity =
    woolenBouquetFromCart.reduce(
      (total, item) =>
        total + (item?.quantity || 0),
      0
    );

  // FLOWER IN BOX

  const flowerInBoxQuantity =
    flowerInBoxFromCart.reduce(
      (total, item) =>
        total + (item?.quantity || 0),
      0
    );

  // CARDS

  const cardQuantity = cardFromCart.reduce(
    (total, item) =>
      total + (item?.quantity || 0),
    0
  );

  // CHOCOLATES

  const chocolateQuantity =
    chocolateFromCart.reduce(
      (total, item) =>
        total + (item?.quantity || 0),
      0
    );

  // MINI CUPCAKES

  const miniCupcakeQuantity =
    miniCupcakeFromCart.reduce(
      (total, item) =>
        total + (item?.quantity || 0),
      0
    );

  // ==============================
  // TOTAL QUANTITY
  // ==============================

  const totalQuantity =
    flowerQuantity +
    flowerInSleeveQuantity +
    bouquetQuantity +
    comboBouquetQuantity +
    woolenBouquetQuantity +
    flowerInBoxQuantity +
    cardQuantity +
    chocolateQuantity +
    miniCupcakeQuantity;

  // =====================================================
  // AMOUNTS
  // =====================================================

  // ==============================
  // FLOWER AMOUNT
  // ==============================

  const flowerAmount = flowerFromCart.reduce(
    (total, item) =>
      total +
      (item?.flower?.price || 0) *
        (item?.quantity || 0),
    0
  );

  // ==============================
  // FLOWER IN SLEEVE AMOUNT
  // ==============================

  const flowerInSleeveAmount =
    flowerInSleeveFromCart.reduce(
      (total, item) => {
        const flowerInSleeve =
          item?.flowerInSleeve;

        const price =
          flowerInSleeve?.price || 0;

        const discountPrice =
          flowerInSleeve?.discountPrice || 0;

        const finalPrice =
          discountPrice > 0 &&
          discountPrice < price
            ? discountPrice
            : price;

        return (
          total +
          finalPrice *
            (item?.quantity || 0)
        );
      },
      0
    );

  // ==============================
  // BOUQUET AMOUNT
  // ==============================

  const bouquetAmount =
    bouquetFromCart.reduce(
      (total, item) => {
        const bouquet =
          item?.bouquet;

        const price =
          bouquet?.price || 0;

        const discountPrice =
          bouquet?.discountPrice || 0;

        const finalPrice =
          discountPrice > 0 &&
          discountPrice < price
            ? discountPrice
            : price;

        return (
          total +
          finalPrice *
            (item?.quantity || 0)
        );
      },
      0
    );

  // ==============================
  // COMBO BOUQUET AMOUNT
  // ==============================

  const comboBouquetAmount =
    comboBouquetFromCart.reduce(
      (total, item) => {
        const comboBouquet =
          item?.comboBouquet;

        const price =
          comboBouquet?.price || 0;

        const discountPrice =
          comboBouquet?.discountPrice || 0;

        const finalPrice =
          discountPrice > 0 &&
          discountPrice < price
            ? discountPrice
            : price;

        return (
          total +
          finalPrice *
            (item?.quantity || 0)
        );
      },
      0
    );

  // ==============================
  // WOOLEN BOUQUET AMOUNT
  // ==============================

  const woolenBouquetAmount =
    woolenBouquetFromCart.reduce(
      (total, item) => {
        const woolenBouquet =
          item?.woolenBouquet;

        const price =
          woolenBouquet?.price || 0;

        const discountPrice =
          woolenBouquet?.discountPrice || 0;

        const finalPrice =
          discountPrice > 0 &&
          discountPrice < price
            ? discountPrice
            : price;

        return (
          total +
          finalPrice *
            (item?.quantity || 0)
        );
      },
      0
    );

  // ==============================
  // FLOWER IN BOX AMOUNT
  // ==============================

  const flowerInBoxAmount =
    flowerInBoxFromCart.reduce(
      (total, item) => {
        const flowerInBox =
          item?.flowerInBox;

        const price =
          flowerInBox?.price || 0;

        const discountPrice =
          flowerInBox?.discountPrice || 0;

        const finalPrice =
          discountPrice > 0 &&
          discountPrice < price
            ? discountPrice
            : price;

        return (
          total +
          finalPrice *
            (item?.quantity || 0)
        );
      },
      0
    );

  // ==============================
  // CARD AMOUNT
  // ==============================

  const cardAmount =
    cardFromCart.reduce(
      (total, item) => {
        const card =
          item?.card;

        const price =
          card?.price || 0;

        const discountPrice =
          card?.discountPrice || 0;

        const finalPrice =
          discountPrice > 0 &&
          discountPrice < price
            ? discountPrice
            : price;

        return (
          total +
          finalPrice *
            (item?.quantity || 0)
        );
      },
      0
    );

  // ==============================
  // CHOCOLATE AMOUNT
  // ==============================

  const chocolateAmount =
    chocolateFromCart.reduce(
      (total, item) => {
        const chocolate =
          item?.chocolate;

        const price =
          chocolate?.price || 0;

        return (
          total +
          price *
            (item?.quantity || 0)
        );
      },
      0
    );

  // ==============================
  // MINI CUPCAKE AMOUNT
  // ==============================

  const miniCupcakeAmount =
    miniCupcakeFromCart.reduce(
      (total, item) => {
        const miniCupcake =
          item?.miniCupcake;

        const price =
          miniCupcake?.price || 0;

        return (
          total +
          price *
            (item?.quantity || 0)
        );
      },
      0
    );

  // =====================================================
  // TOTAL AMOUNT
  // =====================================================

  const totalAmount =
    flowerAmount +
    flowerInSleeveAmount +
    bouquetAmount +
    comboBouquetAmount +
    woolenBouquetAmount +
    flowerInBoxAmount +
    cardAmount +
    chocolateAmount +
    miniCupcakeAmount;

  // =====================================================
  // TOTAL PRODUCTS
  // =====================================================

  const totalProducts =
    flowerFromCart.length +
    flowerInSleeveFromCart.length +
    bouquetFromCart.length +
    comboBouquetFromCart.length +
    woolenBouquetFromCart.length +
    flowerInBoxFromCart.length +
    cardFromCart.length +
    chocolateFromCart.length +
    miniCupcakeFromCart.length;

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        w-full
        lg:fixed
        lg:top-24
        lg:right-6
        lg:w-[330px]
        lg:z-40
      "
    >
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-pink-100
          bg-white
          shadow-[0_10px_35px_rgba(236,72,153,0.10)]
        "
      >

        {/* ==============================
            HEADER
        ============================== */}

        <div
          className="
            bg-gradient-to-r
            from-pink-500
            to-rose-500
            px-4
            py-3.5
            flex
            items-center
            justify-between
          "
        >

          <div className="flex items-center gap-2.5">

            <div
              className="
                w-9
                h-9
                rounded-lg
                bg-white/20
                flex
                items-center
                justify-center
                text-white
              "
            >
              <ShoppingBag size={19} />
            </div>

            <div>

              <h2
                className="
                  text-base
                  font-extrabold
                  text-white
                "
              >
                Cart Summary
              </h2>

              <p
                className="
                  text-[11px]
                  text-pink-100
                "
              >
                {totalProducts} products •{" "}
                {totalQuantity} items
              </p>

            </div>

          </div>

          <span
            className="
              rounded-full
              bg-white
              px-2.5
              py-1
              text-xs
              font-extrabold
              text-pink-600
            "
          >
            ₹{totalAmount}
          </span>

        </div>

        {/* ==============================
            CATEGORIES
        ============================== */}

        <div className="px-4 py-3.5">

          <div className="space-y-1.5">

            {/* ==============================
                FLOWERS
            ============================== */}

            {flowerFromCart.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-2
                  py-2
                "
              >

                <div className="flex items-center gap-2.5">

                  <Flower2
                    size={17}
                    className="text-pink-500"
                  />

                  <span className="text-sm text-gray-600">
                    Flowers
                  </span>

                </div>

                <span className="text-sm font-bold text-gray-800">
                  {flowerQuantity}
                </span>

              </div>
            )}

            {/* ==============================
                FLOWER IN SLEEVE
            ============================== */}

            {flowerInSleeveFromCart.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-2
                  py-2
                "
              >

                <div className="flex items-center gap-2.5">

                  <Flower2
                    size={17}
                    className="text-rose-500"
                  />

                  <span className="text-sm text-gray-600">
                    Flower In Sleeve
                  </span>

                </div>

                <span className="text-sm font-bold text-gray-800">
                  {flowerInSleeveQuantity}
                </span>

              </div>
            )}

            {/* ==============================
                BOUQUETS
            ============================== */}

            {bouquetFromCart.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-2
                  py-2
                "
              >

                <div className="flex items-center gap-2.5">

                  <Gift
                    size={17}
                    className="text-rose-500"
                  />

                  <span className="text-sm text-gray-600">
                    Bouquets
                  </span>

                </div>

                <span className="text-sm font-bold text-gray-800">
                  {bouquetQuantity}
                </span>

              </div>
            )}

            {/* ==============================
                COMBO BOUQUETS
            ============================== */}

            {comboBouquetFromCart.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-2
                  py-2
                "
              >

                <div className="flex items-center gap-2.5">

                  <Layers
                    size={17}
                    className="text-purple-500"
                  />

                  <span className="text-sm text-gray-600">
                    Combo Bouquets
                  </span>

                </div>

                <span className="text-sm font-bold text-gray-800">
                  {comboBouquetQuantity}
                </span>

              </div>
            )}

            {/* ==============================
                WOOLEN BOUQUETS
            ============================== */}

            {woolenBouquetFromCart.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-2
                  py-2
                "
              >

                <div className="flex items-center gap-2.5">

                  <Package
                    size={17}
                    className="text-amber-500"
                  />

                  <span className="text-sm text-gray-600">
                    Woolen Bouquets
                  </span>

                </div>

                <span className="text-sm font-bold text-gray-800">
                  {woolenBouquetQuantity}
                </span>

              </div>
            )}

            {/* ==============================
                FLOWER IN BOX
            ============================== */}

            {flowerInBoxFromCart.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-2
                  py-2
                "
              >

                <div className="flex items-center gap-2.5">

                  <Box
                    size={17}
                    className="text-fuchsia-500"
                  />

                  <span className="text-sm text-gray-600">
                    Flower In Box
                  </span>

                </div>

                <span className="text-sm font-bold text-gray-800">
                  {flowerInBoxQuantity}
                </span>

              </div>
            )}

            {/* ==============================
                CARDS
            ============================== */}

            {cardFromCart.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-2
                  py-2
                "
              >

                <div className="flex items-center gap-2.5">

                  <CreditCard
                    size={17}
                    className="text-blue-500"
                  />

                  <span className="text-sm text-gray-600">
                    Cards
                  </span>

                </div>

                <span className="text-sm font-bold text-gray-800">
                  {cardQuantity}
                </span>

              </div>
            )}

            {/* ==============================
                CHOCOLATES
            ============================== */}

            {chocolateFromCart.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-2
                  py-2
                "
              >

                <div className="flex items-center gap-2.5">

                  <span
                    className="
                      w-[17px]
                      h-[17px]
                      flex
                      items-center
                      justify-center
                      text-sm
                    "
                  >
                    🍫
                  </span>

                  <span className="text-sm text-gray-600">
                    Chocolates
                  </span>

                </div>

                <span className="text-sm font-bold text-gray-800">
                  {chocolateQuantity}
                </span>

              </div>
            )}

            {/* ==============================
                MINI CUPCAKES
            ============================== */}

            {miniCupcakeFromCart.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-2
                  py-2
                "
              >

                <div className="flex items-center gap-2.5">

                  <Cake
                    size={17}
                    className="text-pink-500"
                  />

                  <span className="text-sm text-gray-600">
                    Mini CupCakes
                  </span>

                </div>

                <span className="text-sm font-bold text-gray-800">
                  {miniCupcakeQuantity}
                </span>

              </div>
            )}

          </div>

          {/* ==============================
              TOTAL QUANTITY
          ============================== */}

          <div
            className="
              mt-2
              border-t
              border-gray-100
              pt-3
              flex
              items-center
              justify-between
            "
          >

            <span className="text-sm font-semibold text-gray-500">
              Total Quantity
            </span>

            <span
              className="
                rounded-full
                bg-pink-50
                px-3
                py-1
                text-xs
                font-extrabold
                text-pink-600
              "
            >
              {totalQuantity}
            </span>

          </div>

        </div>

        {/* ==============================
            TOTAL
        ============================== */}

        <div
          className="
            mx-4
            rounded-xl
            bg-gradient-to-r
            from-pink-50
            to-rose-50
            border
            border-pink-100
            px-4
            py-3
            flex
            items-center
            justify-between
          "
        >

          <span className="text-sm font-semibold text-gray-600">
            Total Amount
          </span>

          <span className="text-xl font-black text-pink-600">
            ₹{totalAmount}
          </span>

        </div>

        {/* ==============================
            CHECKOUT
        ============================== */}

        <div className="p-4">

          <button
            type="button"
            className="
              group
              w-full
              h-11
              rounded-xl
              bg-gray-900
              text-white
              text-sm
              font-bold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-pink-600
              transition-all
              active:scale-[0.98]
              cursor-pointer
            "
            onClick={()=>{
              navigate('/address')
            }}
          >
            Proceed to Checkout

            <ArrowRight
              size={16}
              className="
                transition-transform
                group-hover:translate-x-1
              "
            />

          </button>

        </div>

      </div>
    </div>
  );
};


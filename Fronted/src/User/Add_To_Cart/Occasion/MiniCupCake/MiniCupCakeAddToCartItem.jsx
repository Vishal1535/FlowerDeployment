
import React from "react";
import { useDispatch } from "react-redux";
import {
  Minus,
  Plus,
  Trash2,
  CupSoda,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  IncrementMiniCupcakeCartThunk,
  DecrementMiniCupcakeCartThunk,
} from "../../../../Store/AddToCart/MiniCupCake/MiniCupCakeAddToCartApi";

import {
  showDeletePopup,
} from "../../../../Store/AddToCart/MiniCupCake/MiniCupCakeAddToCartSlice";

export const MiniCupCakeAddToCartItem = ({ item }) => {
  const dispatch = useDispatch();

  const miniCupcake = item?.miniCupcake;

  const quantity = item?.quantity || 1;

  const price = miniCupcake?.price || 0;

  const stock = miniCupcake?.stock || 0;

  // ==============================
  // TOTAL PRICE
  // ==============================

  const totalPrice = price * quantity;

  // ==============================
  // INCREMENT
  // ==============================

  const HandleIncrement = async () => {
    if (quantity >= stock) {
      toast.error(
        "Maximum available quantity reached"
      );
      return;
    }

    const result = await dispatch(
      IncrementMiniCupcakeCartThunk(item?._id)
    );

    if (
      IncrementMiniCupcakeCartThunk.rejected.match(
        result
      )
    ) {
      toast.error(
        result.payload ||
          "Unable to increase quantity"
      );
    }
  };

  // ==============================
  // DECREMENT
  // ==============================

  const HandleDecrement = async () => {
    if (quantity <= 1) {
      return;
    }

    const result = await dispatch(
      DecrementMiniCupcakeCartThunk(item?._id)
    );

    if (
      DecrementMiniCupcakeCartThunk.rejected.match(
        result
      )
    ) {
      toast.error(
        result.payload ||
          "Unable to decrease quantity"
      );
    }
  };

  // ==============================
  // DELETE
  // ==============================

  const HandleDelete = () => {
    dispatch(
      showDeletePopup(item?._id)
    );
  };

  return (
    <div className="bg-white">

      {/* ==============================
          MAIN MINI CUPCAKE
      ============================== */}

      <div className="p-4 sm:p-5">

        <div className="flex gap-4">

          {/* ==============================
              MINI CUPCAKE IMAGE
          ============================== */}

          <div
            className="
              w-24
              h-24
              sm:w-28
              sm:h-28
              md:w-32
              md:h-32
              shrink-0
              rounded-2xl
              overflow-hidden
              bg-gradient-to-br
              from-pink-50
              to-orange-50
              border
              border-pink-100/70
              flex
              items-center
              justify-center
            "
          >

            {miniCupcake?.image ? (
              <img
                src={miniCupcake.image}
                alt={
                  miniCupcake?.name ||
                  "Mini Cupcake"
                }
                draggable="false"
                className="
                  w-full
                  h-full
                  object-cover
                "
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />
            ) : (
              <span className="text-3xl">
                🧁
              </span>
            )}

          </div>

          {/* ==============================
              MINI CUPCAKE DETAILS
          ============================== */}

          <div className="flex-1 min-w-0">

            {/* NAME */}

            <h2
              className="
                text-base
                sm:text-lg
                font-bold
                text-gray-700
                line-clamp-2
              "
            >
              {miniCupcake?.name ||
                "Delicious Mini Cupcake"}
            </h2>

            {/* FLAVOR */}

            {miniCupcake?.flavor && (
              <span
                className="
                  inline-flex
                  mt-1.5
                  px-2.5
                  py-1
                  rounded-full
                  bg-pink-50
                  text-pink-500
                  text-[11px]
                  font-semibold
                "
              >
                {miniCupcake.flavor}
              </span>
            )}

            {/* PRICE */}

            <div className="mt-2">

              <span
                className="
                  text-lg
                  sm:text-xl
                  font-extrabold
                  text-gray-800
                "
              >
                ₹{price}
              </span>

              <span className="ml-2 text-xs text-gray-400">
                per cupcake
              </span>

            </div>

            {/* STOCK */}

            {stock > 0 && (
              <p
                className="
                  text-xs
                  text-teal-400
                  mt-1
                  font-medium
                "
              >
                In Stock
              </p>
            )}

            {/* ==============================
                QUANTITY + REMOVE
            ============================== */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
                mt-4
              "
            >

              {/* QUANTITY */}

              <div
                className="
                  flex
                  items-center
                  rounded-xl
                  border
                  border-pink-100
                  overflow-hidden
                  bg-white
                "
              >

                {/* MINUS */}

                <button
                  type="button"
                  onClick={HandleDecrement}
                  disabled={quantity <= 1}
                  className="
                    w-8
                    h-8
                    flex
                    items-center
                    justify-center
                    bg-pink-50/70
                    text-pink-400
                    hover:bg-pink-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                    cursor-pointer
                  "
                >
                  <Minus size={14} />
                </button>

                {/* QUANTITY */}

                <span
                  className="
                    w-9
                    h-8
                    flex
                    items-center
                    justify-center
                    border-x
                    border-pink-100
                    text-sm
                    font-bold
                    text-gray-700
                  "
                >
                  {quantity}
                </span>

                {/* PLUS */}

                <button
                  type="button"
                  onClick={HandleIncrement}
                  disabled={quantity >= stock}
                  className="
                    w-8
                    h-8
                    flex
                    items-center
                    justify-center
                    bg-pink-50/70
                    text-pink-400
                    hover:bg-pink-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                    cursor-pointer
                  "
                >
                  <Plus size={14} />
                </button>

              </div>

              {/* REMOVE */}

              <button
                type="button"
                onClick={HandleDelete}
                className="
                  flex
                  items-center
                  gap-1.5
                  text-sm
                  text-gray-400
                  hover:text-red-400
                  font-medium
                  cursor-pointer
                  transition
                "
              >
                <Trash2 size={15} />
                Remove
              </button>

            </div>

          </div>

          {/* ==============================
              TOTAL PRICE
          ============================== */}

          <div
            className="
              text-right
              shrink-0
              hidden
              sm:block
            "
          >

            <p
              className="
                text-[11px]
                text-gray-400
                uppercase
                tracking-wide
              "
            >
              Total
            </p>

            <p
              className="
                text-lg
                font-extrabold
                text-pink-400
                mt-1
              "
            >
              ₹{totalPrice}
            </p>

          </div>

        </div>

        {/* ==============================
            MOBILE TOTAL
        ============================== */}

        <div
          className="
            sm:hidden
            mt-4
            pt-3
            border-t
            border-pink-50
            flex
            items-center
            justify-between
          "
        >

          <span className="text-xs text-gray-400">
            Total
          </span>

          <span
            className="
              text-base
              font-extrabold
              text-pink-400
            "
          >
            ₹{totalPrice}
          </span>

        </div>

      </div>

    </div>
  );
};


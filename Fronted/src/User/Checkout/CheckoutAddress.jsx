
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapPin,
  Phone,
  User,
  Home,
  Pencil,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { GetLatestAddressThunk } from "../../Store/Address/AddressApi";

export const CheckoutAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    address,
    loading,
    error,
  } = useSelector((state) => state.Address);

  // =========================================
  // GET LATEST ADDRESS
  // =========================================

  useEffect(() => {
    dispatch(GetLatestAddressThunk());
  }, [dispatch]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <span className="loading loading-spinner loading-md text-pink-500"></span>

        <span className="ml-3 text-sm text-gray-500">
          Loading address...
        </span>
      </div>
    );
  }

  // =========================================
  // NO ADDRESS
  // =========================================

  if (!address) {
    return (
      <div className="text-center py-7">

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
            text-pink-500
          "
        >
          <MapPin size={25} />
        </div>

        <h3 className="mt-3 text-base font-bold text-gray-700">
          No delivery address found
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          Add an address to continue with your order.
        </p>

        <button
          type="button"
          onClick={() => navigate("/address")}
          className="
            mt-4
            px-5
            h-10
            rounded-xl
            bg-pink-500
            text-white
            text-sm
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            mx-auto
            hover:bg-pink-600
            transition
            cursor-pointer
          "
        >
          <Plus size={16} />
          Add Address
        </button>

      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {
    return (
      <div className="py-6 text-center">

        <p className="text-sm text-red-500">
          {error}
        </p>

        <button
          type="button"
          onClick={() =>
            dispatch(GetLatestAddressThunk())
          }
          className="
            mt-3
            text-sm
            font-semibold
            text-pink-500
            hover:underline
            cursor-pointer
          "
        >
          Try Again
        </button>

      </div>
    );
  }

  return (
    <div className="relative">

      {/* =========================================
          ADDRESS CARD
      ========================================= */}

      <div
        className="
          rounded-2xl
          border
          border-pink-100
          bg-gradient-to-br
          from-pink-50/70
          via-white
          to-rose-50/40
          p-4
          sm:p-5
        "
      >

        {/* HEADER */}

        <div className="flex items-start justify-between gap-3">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-pink-100
                text-pink-600
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <MapPin size={19} />
            </div>

            <div>

              <p className="text-sm font-extrabold text-gray-800">
                Delivery Address
              </p>

              <p className="text-[11px] text-green-500 font-medium mt-0.5">
                Latest address
              </p>

            </div>

          </div>

          {/* CHANGE ADDRESS */}

          <button
            type="button"
            onClick={() => navigate("/address")}
            className="
              flex
              items-center
              gap-1
              text-xs
              font-semibold
              text-pink-500
              hover:text-pink-600
              hover:underline
              cursor-pointer
            "
          >
            <Pencil size={13} />
            Change
          </button>

        </div>

        {/* =========================================
            DETAILS
        ========================================= */}

        <div className="mt-4 space-y-3">

          {/* NAME */}

          <div className="flex items-start gap-2.5">

            <User
              size={16}
              className="mt-0.5 text-gray-400 shrink-0"
            />

            <div>

              <p className="text-sm font-bold text-gray-700">
                {address?.fullName}
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                {address?.phone}
              </p>

            </div>

          </div>

          {/* ADDRESS */}

          <div className="flex items-start gap-2.5">

            <Home
              size={16}
              className="mt-0.5 text-gray-400 shrink-0"
            />

            <div className="text-sm text-gray-600 leading-relaxed">

              <p>
                {address?.houseNumber},{" "}
                {address?.area}
              </p>

              {address?.landmark && (
                <p>
                  Near {address.landmark}
                </p>
              )}

              <p>
                {address?.city},{" "}
                {address?.state} -{" "}
                <span className="font-semibold">
                  {address?.pincode}
                </span>
              </p>

              <p className="text-xs text-gray-400">
                {address?.country || "India"}
              </p>

            </div>

          </div>

        </div>

        {/* =========================================
            DELIVERY MESSAGE
        ========================================= */}

        <div
          className="
            mt-4
            pt-3
            border-t
            border-pink-100
            flex
            items-center
            gap-2
          "
        >

          <div className="w-2 h-2 rounded-full bg-green-500"></div>

          <p className="text-xs text-gray-500">
            Your order will be delivered to this address.
          </p>

        </div>

      </div>

    </div>
  );
};

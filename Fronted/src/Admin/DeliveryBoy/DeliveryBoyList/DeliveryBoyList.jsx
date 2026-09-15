
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  Users,
  X,
} from "lucide-react";

import { DeliveryBoyListItem } from "./DeliveryBoyListItem";
import { getAllDeliveryBoysThunk } from "../../../Store/Admin/DeliveryBoy/DeliveryApi";

export const DeliveryBoyList = () => {
  const dispatch = useDispatch();

  const { deliveryBoys, loading, error } = useSelector(
    (state) => state.DeliveryBoyManagement
  );

  const [search, setSearch] = useState("");

  // =====================================================
  // GET DELIVERY BOYS
  // =====================================================

  useEffect(() => {
    dispatch(getAllDeliveryBoysThunk());
  }, [dispatch]);

  // =====================================================
  // SEARCH FILTER
  // =====================================================

  const filteredDeliveryBoys = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return deliveryBoys;
    }

    return deliveryBoys.filter((boy) => {
      const name = boy?.name?.toLowerCase() || "";
      const phone = boy?.phone?.toLowerCase() || "";
      const email = boy?.user?.email?.toLowerCase() || "";
      const vehicleType =
        boy?.vehicleType?.toLowerCase() || "";
      const vehicleNumber =
        boy?.vehicleNumber?.toLowerCase() || "";

      return (
        name.includes(value) ||
        phone.includes(value) ||
        email.includes(value) ||
        vehicleType.includes(value) ||
        vehicleNumber.includes(value)
      );
    });
  }, [deliveryBoys, search]);

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* =====================================================
          SEARCH + COUNT
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">

        {/* SEARCH */}

        <div className="relative w-full sm:max-w-md">

          <Search
            size={19}
            className="
              absolute
              left-3.5
              sm:left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone or email..."
            className="
              w-full
              h-11
              pl-10
              sm:pl-11
              pr-10
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              text-sm
              text-gray-700
              outline-none
              transition
              focus:bg-white
              focus:border-pink-400
              focus:ring-4
              focus:ring-pink-50
            "
          />

          {/* CLEAR SEARCH */}

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                absolute
                right-2.5
                sm:right-3
                top-1/2
                -translate-y-1/2
                w-7
                h-7
                rounded-lg
                flex
                items-center
                justify-center
                text-gray-400
                hover:bg-gray-100
                hover:text-gray-600
                transition
              "
            >
              <X size={16} />
            </button>
          )}

        </div>

        {/* COUNT */}

        <div
          className="
            flex
            items-center
            gap-2
            px-3.5
            sm:px-4
            py-2.5
            rounded-xl
            bg-pink-50
            text-pink-600
            text-sm
            font-medium
            w-fit
            max-w-full
          "
        >
          <Users size={17} className="shrink-0" />

          <span className="whitespace-nowrap">
            {filteredDeliveryBoys.length}{" "}
            {filteredDeliveryBoys.length === 1
              ? "Delivery Boy"
              : "Delivery Boys"}
          </span>
        </div>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          className="
            p-3.5
            sm:p-4
            rounded-xl
            bg-red-50
            border
            border-red-100
            text-red-600
            text-sm
            break-words
          "
        >
          {error}
        </div>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && deliveryBoys.length === 0 && (
        <div className="flex justify-center py-10 sm:py-12">
          <span className="loading loading-spinner loading-md text-pink-500" />
        </div>
      )}

      {/* =====================================================
          DELIVERY BOY LIST
      ===================================================== */}

      {!loading && filteredDeliveryBoys.length > 0 && (
        <div className="space-y-3">

          {filteredDeliveryBoys.map((deliveryBoy) => (
            <DeliveryBoyListItem
              key={deliveryBoy._id}
              deliveryBoy={deliveryBoy}
            />
          ))}

        </div>
      )}

      {/* =====================================================
          NO DELIVERY BOY
      ===================================================== */}

      {!loading && filteredDeliveryBoys.length === 0 && (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            py-10
            sm:py-14
            px-4
            sm:px-5
            rounded-2xl
            border
            border-dashed
            border-gray-200
            bg-gray-50/50
            text-center
          "
        >
          <div
            className="
              w-12
              h-12
              sm:w-14
              sm:h-14
              rounded-2xl
              bg-pink-100
              text-pink-500
              flex
              items-center
              justify-center
              mb-3
              sm:mb-4
              shrink-0
            "
          >
            <Users size={23} className="sm:w-[25px] sm:h-[25px]" />
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {search
              ? "No delivery boy found"
              : "No delivery boys yet"}
          </h3>

          <p className="text-sm text-gray-500 mt-1 max-w-sm leading-5 break-words">
            {search
              ? `No delivery boy matches "${search}". Try another name, phone or email.`
              : "Add your first delivery boy to start managing your delivery team."}
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                mt-4
                w-full
                sm:w-auto
                px-4
                py-2
                rounded-xl
                bg-pink-500
                hover:bg-pink-600
                text-white
                text-sm
                font-medium
                transition
              "
            >
              Clear Search
            </button>
          )}
        </div>
      )}

    </div>
  );
};


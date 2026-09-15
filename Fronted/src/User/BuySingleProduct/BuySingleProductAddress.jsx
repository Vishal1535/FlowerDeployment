import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapPin,
  User,
  Phone,
  Home,
  Navigation,
  Globe,
  Save,
  RefreshCw,
  ArrowLeft,
  LocateFixed,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
//  GetLatestAddressThunk
import { AddAddressThunk ,GetLatestAddressThunk} from "../../Store/Address/AddressApi";

export const BuySingleProductAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(
    (state) => state.Address
  );

  const { isAuthorized } = useSelector(
    (state) => state.user
  );
  
useEffect(() => {
  // User login nahi hai
  // Ya user admin nahi hai
  if (!isAuthorized) {
    navigate("/", {
      replace: true,
    });
  }
}, [isAuthorized, navigate]);


  const [latestLoading, setLatestLoading] =
    useState(false);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    houseNumber: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    country: "India",

    latitude: null,
    longitude: null,
  });

  const [errors, setErrors] = useState({});

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // =====================================================
  // USE MY CURRENT LOCATION
  // =====================================================

  const HandleCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error(
        "Geolocation is not supported by your browser"
      );
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (location) => {
        try {
          const latitude =
            location.coords.latitude;

          const longitude =
            location.coords.longitude;

          // =============================================
          // REVERSE GEOCODING
          // =============================================

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch address"
            );
          }

          const data = await response.json();

          const address =
            data?.address || {};

          // =============================================
          // GET ADDRESS VALUES
          // =============================================

          const pincode =
            address.postcode || "";

          const area =
            address.suburb ||
            address.neighbourhood ||
            address.residential ||
            address.road ||
            "";

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            "";

          const state =
            address.state || "";

          const country =
            address.country || "India";

          const houseNumber =
            address.house_number || "";

          // =============================================
          // UPDATE FORM
          // =============================================

          setFormData((prev) => ({
            ...prev,

            pincode,

            houseNumber:
              houseNumber || prev.houseNumber,

            area,

            city,

            state,

            country,

            latitude,

            longitude,
          }));

          // =============================================
          // CLEAR AUTO-FILLED FIELD ERRORS
          // =============================================

          setErrors((prev) => ({
            ...prev,
            pincode: "",
            houseNumber: "",
            area: "",
            city: "",
            state: "",
            country: "",
          }));

          toast.success(
            "Current location detected and address filled"
          );
        } catch (error) {
          console.error(
            "Reverse Geocoding Error:",
            error
          );

          toast.error(
            "Location detected, but address could not be found. Please enter the address manually."
          );

          // GPS coordinates still save
          setFormData((prev) => ({
            ...prev,
            latitude:
              location.coords.latitude,
            longitude:
              location.coords.longitude,
          }));
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        console.error(
          "Location Error:",
          error
        );

        setLocationLoading(false);

        if (error.code === 1) {
          toast.error(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === 2) {
          toast.error(
            "Unable to detect your location."
          );
        } else if (error.code === 3) {
          toast.error(
            "Location request timed out."
          );
        } else {
          toast.error(
            "Failed to get current location."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const ValidateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Full name is required";
    } else if (
      formData.fullName.trim().length < 2
    ) {
      newErrors.fullName =
        "Full name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        "Pincode is required";
    } else if (
      !/^\d{6}$/.test(
        formData.pincode
      )
    ) {
      newErrors.pincode =
        "Pincode must be exactly 6 digits";
    }

    if (!formData.houseNumber.trim()) {
      newErrors.houseNumber =
        "Flat / house / building is required";
    }

    if (!formData.area.trim()) {
      newErrors.area =
        "Area / street is required";
    } else if (
      formData.area.trim().length < 2
    ) {
      newErrors.area =
        "Area must be at least 2 characters";
    }

    if (
      formData.landmark.trim() &&
      formData.landmark.trim().length < 2
    ) {
      newErrors.landmark =
        "Landmark must be at least 2 characters";
    }

    if (!formData.city.trim()) {
      newErrors.city =
        "City is required";
    } else if (
      formData.city.trim().length < 2
    ) {
      newErrors.city =
        "City must be at least 2 characters";
    }

    if (!formData.state.trim()) {
      newErrors.state =
        "State is required";
    } else if (
      formData.state.trim().length < 2
    ) {
      newErrors.state =
        "State must be at least 2 characters";
    }

    if (!formData.country.trim()) {
      newErrors.country =
        "Country is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =====================================================
  // ADD ADDRESS
  // =====================================================

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!ValidateForm()) {
      toast.error(
        "Please correct the highlighted fields"
      );
      return;
    }

    const cleanedData = {
      fullName:
        formData.fullName.trim(),

      phone:
        formData.phone.trim(),

      pincode:
        formData.pincode.trim(),

      houseNumber:
        formData.houseNumber.trim(),

      area:
        formData.area.trim(),

      landmark:
        formData.landmark.trim(),

      city:
        formData.city.trim(),

      state:
        formData.state.trim(),

      country:
        formData.country.trim(),

      latitude:
        formData.latitude,

      longitude:
        formData.longitude,
    };

    const result = await dispatch(
      AddAddressThunk(cleanedData)
    );

    if (
      AddAddressThunk.fulfilled.match(result)
    ) {
      toast.success(
        "Address added successfully"
      );

      setFormData({
        fullName: "",
        phone: "",
        pincode: "",
        houseNumber: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        country: "India",
        latitude: null,
        longitude: null,
      });

      setErrors({});

      navigate("/buy-single-product-checkout");
    } else {
      toast.error(
        result.payload ||
          "Failed to add address"
      );
    }
  };

  // =====================================================
  // GET LATEST ADDRESS
  // =====================================================

  const HandleGetLatestAddress =
    async () => {
      setLatestLoading(true);

      const result = await dispatch(
        GetLatestAddressThunk()
      );

      if (
        GetLatestAddressThunk.fulfilled.match(
          result
        )
      ) {
        const latestAddress =
          result.payload?.address;

        if (!latestAddress) {
          toast.error(
            "No saved address found"
          );

          setLatestLoading(false);
          return;
        }

        setFormData({
          fullName:
            latestAddress.fullName || "",

          phone:
            latestAddress.phone || "",

          pincode:
            latestAddress.pincode || "",

          houseNumber:
            latestAddress.houseNumber || "",

          area:
            latestAddress.area || "",

          landmark:
            latestAddress.landmark || "",

          city:
            latestAddress.city || "",

          state:
            latestAddress.state || "",

          country:
            latestAddress.country ||
            "India",

          latitude:
            latestAddress.location
              ?.latitude ?? null,

          longitude:
            latestAddress.location
              ?.longitude ?? null,
        });

        setErrors({});

        toast.success(
          "Latest address loaded"
        );
      } else {
        toast.error(
          result.payload ||
            "Failed to fetch latest address"
        );
      }

      setLatestLoading(false);
    };

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!isAuthorized) {
    return null;
  }

  // =====================================================
  // INPUT CLASS
  // =====================================================

  const InputClass = (field) => `
    w-full
    h-11
    rounded-lg
    border
    ${
      errors[field]
        ? "border-red-400 focus:ring-red-100"
        : "border-gray-300 focus:border-pink-400 focus:ring-pink-200"
    }
    px-3
    text-sm
    text-gray-700
    outline-none
    focus:ring-1
  `;

  // =====================================================
  // LABEL
  // =====================================================

  const Label = ({
    children,
    required = false,
  }) => (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}

      {required && (
        <span className="text-red-500 ml-1">
          *
        </span>
      )}
    </label>
  );

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">

      {/* =================================================
          BACK
      ================================================= */}

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="
          mb-4
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-gray-600
          hover:text-pink-500
          transition
          cursor-pointer
        "
      >
        <ArrowLeft size={18} />
        Back
      </button>
      {/* =================================================
    STEP INDICATOR
================================================= */}

<div className="mb-6">
  <div className="flex items-center justify-center gap-2 sm:gap-3">

    {/* STEP 1 - PRODUCT */}

    <div className="flex items-center gap-2">

      <div
        className="
          w-8
          h-8
          rounded-full
          bg-green-500
          text-white
          flex
          items-center
          justify-center
          text-sm
          font-bold
        "
      >
        ✓
      </div>

      <span className="hidden sm:block text-sm font-semibold text-green-600">
        Product
      </span>

    </div>

    {/* LINE */}

    <div className="w-8 sm:w-14 h-px bg-green-300" />

    {/* STEP 2 - ADDRESS */}

    <div className="flex items-center gap-2">

      <div
        className="
          w-8
          h-8
          rounded-full
          bg-pink-500
          text-white
          flex
          items-center
          justify-center
          text-sm
          font-bold
        "
      >
        2
      </div>

      <span className="text-sm font-bold text-pink-600">
        Address
      </span>

    </div>

    {/* LINE */}

    <div className="w-8 sm:w-14 h-px bg-gray-200" />

    {/* STEP 3 - CHECKOUT */}

    <div className="flex items-center gap-2">

      <div
        className="
          w-8
          h-8
          rounded-full
          bg-gray-100
          text-gray-400
          flex
          items-center
          justify-center
          text-sm
          font-bold
        "
      >
        3
      </div>

      <span className="hidden sm:block text-sm font-medium text-gray-400">
        Checkout
      </span>

    </div>

  </div>
</div>

      {/* =================================================
          CARD
      ================================================= */}

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            px-5
            sm:px-6
            py-5
            border-b
            border-gray-100
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-pink-50
              text-pink-500
              flex
              items-center
              justify-center
            "
          >
            <MapPin size={20} />
          </div>

          <div>

            <h2 className="text-lg font-bold text-gray-800">
              Delivery Address
            </h2>

            <p className="text-xs text-gray-400 mt-0.5">
              Enter your delivery details
            </p>

          </div>

        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={HandleSubmit}
          className="p-5 sm:p-6"
        >

          {/* =================================================
              CURRENT LOCATION
          ================================================= */}

          <div className="mb-6">

            <button
              type="button"
              onClick={
                HandleCurrentLocation
              }
              disabled={locationLoading}
              className="
                w-full
                h-12
                rounded-xl
                border
                border-pink-200
                bg-pink-50
                text-pink-600
                text-sm
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:bg-pink-100
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
                cursor-pointer
              "
            >

              {locationLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>

                  Detecting your location...
                </>
              ) : (
                <>
                  <LocateFixed size={18} />

                  Use My Current Location
                </>
              )}

            </button>

            <p className="text-[11px] text-gray-400 text-center mt-2">
              Click here to automatically fill your
              address using your current location.
            </p>

            {formData.latitude !== null &&
              formData.longitude !== null && (
                <div
                  className="
                    mt-3
                    px-3
                    py-2
                    rounded-lg
                    bg-green-50
                    border
                    border-green-100
                    text-xs
                    text-green-700
                    text-center
                  "
                >
                  ✓ Current location detected
                </div>
              )}

          </div>

          {/* =================================================
              INPUT GRID
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* FULL NAME */}

            <div className="sm:col-span-2">

              <Label required>
                Full Name
              </Label>

              <div className="relative">

                <User
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="fullName"
                  value={
                    formData.fullName
                  }
                  onChange={
                    HandleChange
                  }
                  placeholder="Enter your full name"
                  className={`${InputClass(
                    "fullName"
                  )} pl-10`}
                />

              </div>

              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.fullName}
                </p>
              )}

            </div>

            {/* PHONE */}

            <div>

              <Label required>
                Phone Number
              </Label>

              <div className="relative">

                <Phone
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    HandleChange
                  }
                  placeholder="10-digit phone number"
                  maxLength={10}
                  className={`${InputClass(
                    "phone"
                  )} pl-10`}
                />

              </div>

              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone}
                </p>
              )}

            </div>

            {/* PINCODE */}

            <div>

              <Label required>
                Pincode
              </Label>

              <input
                type="text"
                name="pincode"
                value={
                  formData.pincode
                }
                onChange={
                  HandleChange
                }
                placeholder="6-digit pincode"
                maxLength={6}
                className={InputClass(
                  "pincode"
                )}
              />

              {errors.pincode && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.pincode}
                </p>
              )}

            </div>

            {/* HOUSE */}

            <div>

              <Label required>
                Flat / House No. / Building
              </Label>

              <div className="relative">

                <Home
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="houseNumber"
                  value={
                    formData.houseNumber
                  }
                  onChange={
                    HandleChange
                  }
                  placeholder="Flat, house no. or building"
                  className={`${InputClass(
                    "houseNumber"
                  )} pl-10`}
                />

              </div>

              {errors.houseNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.houseNumber}
                </p>
              )}

            </div>

            {/* AREA */}

            <div>

              <Label required>
                Area / Street
              </Label>

              <div className="relative">

                <Navigation
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="area"
                  value={
                    formData.area
                  }
                  onChange={
                    HandleChange
                  }
                  placeholder="Area, street or colony"
                  className={`${InputClass(
                    "area"
                  )} pl-10`}
                />

              </div>

              {errors.area && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.area}
                </p>
              )}

            </div>

            {/* LANDMARK */}

            <div className="sm:col-span-2">

              <Label>
                Landmark
                <span className="text-gray-400 font-normal ml-1">
                  (Optional)
                </span>
              </Label>

              <input
                type="text"
                name="landmark"
                value={
                  formData.landmark
                }
                onChange={
                  HandleChange
                }
                placeholder="Nearby landmark"
                className={InputClass(
                  "landmark"
                )}
              />

              {errors.landmark && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.landmark}
                </p>
              )}

            </div>

            {/* CITY */}

            <div>

              <Label required>
                City
              </Label>

              <input
                type="text"
                name="city"
                value={
                  formData.city
                }
                onChange={
                  HandleChange
                }
                placeholder="Enter city"
                className={InputClass(
                  "city"
                )}
              />

              {errors.city && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.city}
                </p>
              )}

            </div>

            {/* STATE */}

            <div>

              <Label required>
                State
              </Label>

              <input
                type="text"
                name="state"
                value={
                  formData.state
                }
                onChange={
                  HandleChange
                }
                placeholder="Enter state"
                className={InputClass(
                  "state"
                )}
              />

              {errors.state && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.state}
                </p>
              )}

            </div>

            {/* COUNTRY */}

            <div className="sm:col-span-2">

              <Label required>
                Country
              </Label>

              <div className="relative">

                <Globe
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="country"
                  value={
                    formData.country
                  }
                  onChange={
                    HandleChange
                  }
                  className={`${InputClass(
                    "country"
                  )} pl-10`}
                />

              </div>

              {errors.country && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.country}
                </p>
              )}

            </div>

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              mt-6
              pt-5
              border-t
              border-gray-100
              flex
              flex-col-reverse
              sm:flex-row
              gap-3
            "
          >

            {/* GET LATEST ADDRESS */}

            <button
              type="button"
              onClick={
                HandleGetLatestAddress
              }
              disabled={
                loading ||
                latestLoading ||
                locationLoading
              }
              className="
                flex-1
                h-11
                rounded-lg
                border
                border-gray-300
                bg-white
                text-gray-700
                text-sm
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:bg-gray-50
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
                cursor-pointer
              "
            >

              {latestLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>

                  Loading...
                </>
              ) : (
                <>
                  <RefreshCw size={16} />

                  Get Latest Address
                </>
              )}

            </button>

            {/* SAVE ADDRESS */}

            <button
              type="submit"
              disabled={
                loading ||
                latestLoading ||
                locationLoading
              }
              className="
                flex-1
                h-11
                rounded-lg
                bg-pink-500
                text-white
                text-sm
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:bg-pink-600
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
                cursor-pointer
              "
            >

              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>

                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />

                  Save Address
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};
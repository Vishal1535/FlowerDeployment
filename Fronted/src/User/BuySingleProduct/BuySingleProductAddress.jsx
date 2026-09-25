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

import {
  AddAddressThunk,
  GetLatestAddressThunk,
} from "../../Store/Address/AddressApi";

export const BuySingleProductAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.Address);

  const { isAuthorized } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/", {
        replace: true,
      });
    }
  }, [isAuthorized, navigate]);

  const [latestLoading, setLatestLoading] = useState(false);

  const [locationLoading, setLocationLoading] = useState(false);

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
  // INPUT SANITIZATION
  // =====================================================

  // Only letters and spaces
  const SanitizeLetters = (value) => {
    return value
      .replace(/[^A-Za-z\s]/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^\s+/, "");
  };

  // Only numbers
  const SanitizeDigits = (value, maxLength) => {
    return value.replace(/\D/g, "").slice(0, maxLength);
  };

  // Address characters
  // Allowed:
  // letters, numbers, spaces, . , / # ' ( ) -
  const SanitizeAddress = (value) => {
    return value
      .replace(/[^A-Za-z0-9\s.,/#'()-]/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^\s+/, "");
  };

  // =====================================================
  // PREVENT INVALID CHARACTER WHILE TYPING
  // =====================================================

  const HandleBeforeInput = (e, field) => {
    const input = e.data;

    if (!input) return;

    const patterns = {
      fullName: /[A-Za-z\s]/,
      city: /[A-Za-z\s]/,
      state: /[A-Za-z\s]/,
      country: /[A-Za-z\s]/,

      phone: /\d/,
      pincode: /\d/,

      houseNumber: /[A-Za-z0-9\s.,/#'()-]/,

      area: /[A-Za-z0-9\s.,/#'()-]/,

      landmark: /[A-Za-z0-9\s.,/#'()-]/,
    };

    const pattern = patterns[field];

    if (!pattern) return;

    // If even one character is invalid,
    // prevent the input.
    const isValid = [...input].every((char) => pattern.test(char));

    if (!isValid) {
      e.preventDefault();
    }
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const HandleChange = (e) => {
    const { name, value } = e.target;

    let sanitizedValue = value;

    switch (name) {
      // Letters + spaces only
      case "fullName":
      case "city":
      case "state":
      case "country":
        sanitizedValue = SanitizeLetters(value);
        break;

      // Numbers only
      case "phone":
        sanitizedValue = SanitizeDigits(value, 10);
        break;

      case "pincode":
        sanitizedValue = SanitizeDigits(value, 6);
        break;

      // Address-safe characters
      case "houseNumber":
      case "area":
      case "landmark":
        sanitizedValue = SanitizeAddress(value);
        break;

      default:
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
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
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (location) => {
        try {
          const latitude = location.coords.latitude;

          const longitude = location.coords.longitude;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                Accept: "application/json",
              },
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch address");
          }

          const data = await response.json();

          const address = data?.address || {};

          const pincode = SanitizeDigits(address.postcode || "", 6);

          const area = SanitizeAddress(
            address.suburb ||
              address.neighbourhood ||
              address.residential ||
              address.road ||
              "",
          );

          const city = SanitizeLetters(
            address.city ||
              address.town ||
              address.village ||
              address.municipality ||
              "",
          );

          const state = SanitizeLetters(address.state || "");

          const country = SanitizeLetters(address.country || "India");

          const houseNumber = SanitizeAddress(address.house_number || "");

          setFormData((prev) => ({
            ...prev,
            pincode,
            houseNumber: houseNumber || prev.houseNumber,
            area,
            city,
            state,
            country,
            latitude,
            longitude,
          }));

          setErrors((prev) => ({
            ...prev,
            pincode: "",
            houseNumber: "",
            area: "",
            city: "",
            state: "",
            country: "",
          }));

          toast.success("Current location detected and address filled");
        } catch (error) {
          console.error("Reverse Geocoding Error:", error);

          toast.error(
            "Location detected, but address could not be found. Please enter the address manually.",
          );

          setFormData((prev) => ({
            ...prev,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }));
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        console.error("Location Error:", error);

        setLocationLoading(false);

        if (error.code === 1) {
          toast.error(
            "Location permission denied. Please allow location access.",
          );
        } else if (error.code === 2) {
          toast.error("Unable to detect your location.");
        } else if (error.code === 3) {
          toast.error("Location request timed out.");
        } else {
          toast.error("Failed to get current location.");
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const ValidateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    if (!formData.houseNumber.trim()) {
      newErrors.houseNumber = "Flat / house / building is required";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area / street is required";
    } else if (formData.area.trim().length < 2) {
      newErrors.area = "Area must be at least 2 characters";
    }

    if (formData.landmark.trim() && formData.landmark.trim().length < 2) {
      newErrors.landmark = "Landmark must be at least 2 characters";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (formData.city.trim().length < 2) {
      newErrors.city = "City must be at least 2 characters";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    } else if (formData.state.trim().length < 2) {
      newErrors.state = "State must be at least 2 characters";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // ADD ADDRESS
  // =====================================================

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!ValidateForm()) {
      toast.error("Please correct the highlighted fields");
      return;
    }

    const cleanedData = {
      fullName: formData.fullName.trim(),

      phone: formData.phone.trim(),

      pincode: formData.pincode.trim(),

      houseNumber: formData.houseNumber.trim(),

      area: formData.area.trim(),

      landmark: formData.landmark.trim(),

      city: formData.city.trim(),

      state: formData.state.trim(),

      country: formData.country.trim(),

      latitude: formData.latitude,

      longitude: formData.longitude,
    };

    const result = await dispatch(AddAddressThunk(cleanedData));

    if (AddAddressThunk.fulfilled.match(result)) {
      toast.success("Address added successfully");

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
      toast.error(result.payload || "Failed to add address");
    }
  };

  // =====================================================
  // GET LATEST ADDRESS
  // =====================================================

  const HandleGetLatestAddress = async () => {
    setLatestLoading(true);

    const result = await dispatch(GetLatestAddressThunk());

    if (GetLatestAddressThunk.fulfilled.match(result)) {
      const latestAddress = result.payload?.address;

      if (!latestAddress) {
        toast.error("No saved address found");

        setLatestLoading(false);
        return;
      }

      setFormData({
        fullName: SanitizeLetters(latestAddress.fullName || ""),

        phone: SanitizeDigits(latestAddress.phone || "", 10),

        pincode: SanitizeDigits(latestAddress.pincode || "", 6),

        houseNumber: SanitizeAddress(latestAddress.houseNumber || ""),

        area: SanitizeAddress(latestAddress.area || ""),

        landmark: SanitizeAddress(latestAddress.landmark || ""),

        city: SanitizeLetters(latestAddress.city || ""),

        state: SanitizeLetters(latestAddress.state || ""),

        country: SanitizeLetters(latestAddress.country || "India"),

        latitude: latestAddress.location?.latitude ?? null,

        longitude: latestAddress.location?.longitude ?? null,
      });

      setErrors({});

      toast.success("Latest address loaded");
    } else {
      toast.error(result.payload || "Failed to fetch latest address");
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
    transition
  `;

  // =====================================================
  // LABEL
  // =====================================================

  const Label = ({ children, required = false }) => (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}

      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* BACK */}

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
          {/* STEP 1 */}

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
                shrink-0
              "
            >
              ✓
            </div>

            <span className="hidden sm:block text-sm font-semibold text-green-600">
              Product
            </span>
          </div>

          <div className="w-8 sm:w-14 h-px bg-green-300" />

          {/* STEP 2 */}

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
                shrink-0
              "
            >
              2
            </div>

            <span className="text-sm font-bold text-pink-600">Address</span>
          </div>

          <div className="w-8 sm:w-14 h-px bg-gray-200" />

          {/* STEP 3 */}

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
                shrink-0
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
        {/* HEADER */}

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
              shrink-0
            "
          >
            <MapPin size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-800">
              Delivery Address
            </h2>

            <p className="text-xs text-gray-400 mt-0.5">
              Enter your delivery details
            </p>
          </div>
        </div>

        {/* FORM */}

        <form onSubmit={HandleSubmit} className="p-5 sm:p-6">
          {/* CURRENT LOCATION */}

          <div className="mb-6">
            <button
              type="button"
              onClick={HandleCurrentLocation}
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
              Click here to automatically fill your address using your current
              location.
            </p>

            {formData.latitude !== null && formData.longitude !== null && (
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

          {/* INPUT GRID */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* FULL NAME */}

            <div className="sm:col-span-2">
              <Label required>Full Name</Label>

              <div className="relative">
                <User
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    pointer-events-none
                  "
                />

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={HandleChange}
                  onBeforeInput={(e) => HandleBeforeInput(e, "fullName")}
                  placeholder="Enter your full name"
                  className={`${InputClass("fullName")} pl-10`}
                />
              </div>

              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* PHONE NUMBER */}

            <div>
              <Label required>Phone Number</Label>

              <div className="relative">
                <Phone
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    pointer-events-none
                  "
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={HandleChange}
                  onBeforeInput={(e) => HandleBeforeInput(e, "phone")}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  inputMode="numeric"
                  className={`
                    ${InputClass("phone")}
                    pl-10
                    pr-3
                    tracking-wide
                  `}
                />
              </div>

              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* PINCODE */}

            <div>
              <Label required>Pincode</Label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={HandleChange}
                onBeforeInput={(e) => HandleBeforeInput(e, "pincode")}
                placeholder="6-digit pincode"
                maxLength={6}
                inputMode="numeric"
                className={InputClass("pincode")}
              />

              {errors.pincode && (
                <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>
              )}
            </div>

            {/* HOUSE */}

            <div>
              <Label required>Flat / House No. / Building</Label>

              <div className="relative">
                <Home
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    pointer-events-none
                  "
                />

                <input
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 3);

                    HandleChange({
                      target: {
                        name: "houseNumber",
                        value: value,
                      },
                    });
                  }}
                  placeholder="Flat / House No."
                  maxLength={3}
                  inputMode="numeric"
                  autoComplete="street-address"
                  className={`${InputClass("houseNumber")} pl-10`}
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
              <Label required>Area / Street</Label>

              <div className="relative">
                <Navigation
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    pointer-events-none
                  "
                />

                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={HandleChange}
                  onBeforeInput={(e) => HandleBeforeInput(e, "area")}
                  placeholder="Area, street or colony"
                  className={`${InputClass("area")} pl-10`}
                />
              </div>

              {errors.area && (
                <p className="text-xs text-red-500 mt-1">{errors.area}</p>
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
                value={formData.landmark}
                onChange={HandleChange}
                onBeforeInput={(e) => HandleBeforeInput(e, "landmark")}
                placeholder="Nearby landmark"
                className={InputClass("landmark")}
              />

              {errors.landmark && (
                <p className="text-xs text-red-500 mt-1">{errors.landmark}</p>
              )}
            </div>

            {/* CITY */}

            <div>
              <Label required>City</Label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={HandleChange}
                onBeforeInput={(e) => HandleBeforeInput(e, "city")}
                placeholder="Enter city"
                className={InputClass("city")}
              />

              {errors.city && (
                <p className="text-xs text-red-500 mt-1">{errors.city}</p>
              )}
            </div>

            {/* STATE */}

            <div>
              <Label required>State</Label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={HandleChange}
                onBeforeInput={(e) => HandleBeforeInput(e, "state")}
                placeholder="Enter state"
                className={InputClass("state")}
              />

              {errors.state && (
                <p className="text-xs text-red-500 mt-1">{errors.state}</p>
              )}
            </div>

            {/* COUNTRY */}

            <div className="sm:col-span-2">
              <Label required>Country</Label>

              <div className="relative">
                <Globe
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    pointer-events-none
                  "
                />

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={HandleChange}
                  onBeforeInput={(e) => HandleBeforeInput(e, "country")}
                  className={`${InputClass("country")} pl-10`}
                />
              </div>

              {errors.country && (
                <p className="text-xs text-red-500 mt-1">{errors.country}</p>
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
              flex-col
              sm:flex-row
              gap-3
            "
          >
            {/* SAVE ADDRESS */}

            <button
              type="submit"
              disabled={loading || latestLoading || locationLoading}
              className="
                order-1
                sm:order-2

                w-full
                sm:flex-1

                h-12

                rounded-xl

                bg-pink-500
                text-white

                text-sm
                sm:text-base

                font-semibold

                flex
                items-center
                justify-center

                gap-2

                shadow-sm

                hover:bg-pink-600
                hover:shadow-md

                active:scale-[0.99]

                disabled:opacity-50
                disabled:cursor-not-allowed

                transition
                cursor-pointer
              "
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Address</span>
                </>
              )}
            </button>

            {/* GET LATEST ADDRESS */}

            <button
              type="button"
              onClick={HandleGetLatestAddress}
              disabled={loading || latestLoading || locationLoading}
              className="
                order-2
                sm:order-1

                w-full
                sm:flex-1

                h-12

                rounded-xl

                border
                border-gray-300

                bg-white
                text-gray-700

                text-sm
                sm:text-base

                font-semibold

                flex
                items-center
                justify-center

                gap-2

                hover:bg-gray-50

                active:scale-[0.99]

                disabled:opacity-50
                disabled:cursor-not-allowed

                transition
                cursor-pointer
              "
            >
              {latestLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <RefreshCw size={18} />
                  <span>Get Latest Address</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

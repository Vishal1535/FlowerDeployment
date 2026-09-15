import AddressModel from "../Model/AddressModel.js";

// =====================================================
// ADD ADDRESS
// =====================================================

export const AddAddress = async (req, res) => {
  try {
    // =================================================
    // USER
    // =================================================

    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // =================================================
    // REQUEST BODY
    // =================================================

    const {
      fullName,
      phone,
      pincode,
      houseNumber,
      area,
      landmark,
      city,
      state,
      country,
      latitude,
      longitude,
    } = req.body;

    // =================================================
    // REQUIRED FIELDS
    // =================================================

    if (
      !fullName ||
      !phone ||
      !pincode ||
      !houseNumber ||
      !area ||
      !city ||
      !state
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, phone, pincode, house number, area, city and state are required",
      });
    }

    // =================================================
    // CLEAN DATA
    // =================================================

    const cleanFullName = String(fullName).trim();
    const cleanPhone = String(phone).trim();
    const cleanPincode = String(pincode).trim();
    const cleanHouseNumber = String(houseNumber).trim();
    const cleanArea = String(area).trim();
    const cleanLandmark = landmark
      ? String(landmark).trim()
      : "";
    const cleanCity = String(city).trim();
    const cleanState = String(state).trim();
    const cleanCountry = country
      ? String(country).trim()
      : "India";

    // =================================================
    // LOCATION
    // =================================================
    // Map/current location se coordinates aaye toh save
    // honge.
    //
    // Agar coordinates nahi aaye toh bhi address save hoga.
    // =================================================

    let finalLatitude = null;
    let finalLongitude = null;

    if (
      latitude !== undefined &&
      longitude !== undefined &&
      latitude !== null &&
      longitude !== null &&
      latitude !== "" &&
      longitude !== ""
    ) {
      const parsedLatitude = Number(latitude);
      const parsedLongitude = Number(longitude);

      if (
        Number.isFinite(parsedLatitude) &&
        Number.isFinite(parsedLongitude) &&
        parsedLatitude >= -90 &&
        parsedLatitude <= 90 &&
        parsedLongitude >= -180 &&
        parsedLongitude <= 180
      ) {
        finalLatitude = parsedLatitude;
        finalLongitude = parsedLongitude;
      }
    }

    // =================================================
    // CREATE ADDRESS
    // =================================================

    const address = await AddressModel.create({
      user: userId,

      fullName: cleanFullName,

      phone: cleanPhone,

      pincode: cleanPincode,

      houseNumber: cleanHouseNumber,

      area: cleanArea,

      landmark: cleanLandmark,

      city: cleanCity,

      state: cleanState,

      country: cleanCountry,

      location: {
        latitude: finalLatitude,
        longitude: finalLongitude,
      },
    });

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    console.error("Add Address Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// =====================================================
// GET LATEST ADDRESS
// =====================================================

export const GetLatestAddress = async (req, res) => {
  try {
    // =================================================
    // USER
    // =================================================

    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // =================================================
    // FIND LATEST ADDRESS
    // =================================================

    const address = await AddressModel.findOne({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    // =================================================
    // NO ADDRESS
    // =================================================

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "No address found",
      });
    }

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,
      message: "Latest address fetched successfully",
      address,
    });
  } catch (error) {
    console.error("Get Latest Address Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
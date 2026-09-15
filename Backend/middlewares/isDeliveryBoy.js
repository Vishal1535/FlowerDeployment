const isDeliveryBoy = (req, res, next) => {
  if (req.role !== "deliveryBoy") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Delivery boy only.",
    });
  }

  next();
};

export default isDeliveryBoy;

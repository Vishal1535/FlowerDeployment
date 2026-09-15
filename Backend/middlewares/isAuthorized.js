import jwt from "jsonwebtoken";

const isAuthorized = (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Token nahi mila
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // Verify token
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // User ID request mein store
    req.id = decode.userId;

    // Role bhi chahiye toh
    req.role = decode.role;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });

  }
};

export default isAuthorized;
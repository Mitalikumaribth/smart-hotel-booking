import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protected route middleware - requires valid JWT token
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }
    
    // Support both "Bearer <token>" and just "<token>" formats
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Admin middleware - requires user to be admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }
    
    next();
  } catch (error) {
    console.log("Admin Check Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error checking admin status",
    });
  }
};

import userModel from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../utils/sendEmail.js";

// Normalize email for consistent storage and lookup
const normalizeEmail = (e) => String(e || "").toLowerCase().trim();

// Register with OTP verification
export const registerController = async (req, res) => {
  try {
    const { name, email: rawEmail, password, otp: rawOtp } = req.body;
    const email = normalizeEmail(rawEmail);
    // Normalize OTP: only digits, exactly 6 (handles paste/input quirks)
    const otp = String(rawOtp ?? "")
      .replace(/\D/g, "")
      .slice(0, 6);

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required including OTP",
      });
    }

    if (otp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit OTP",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Verify OTP (same email/otp format as send-otp)
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      const anyOtp = await Otp.findOne({ email });
      if (anyOtp) {
        console.warn("Register: OTP mismatch for", email, "(wrong code entered)");
      } else {
        console.warn("Register: No OTP found for", email, "(expired or not sent)");
      }
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Please request a new one.",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        });
      } else {
        // Update existing unverified user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        existingUser.name = name;
        existingUser.password = hashedPassword;
        existingUser.isVerified = true;
        await existingUser.save();

        // Delete OTP
        await Otp.deleteMany({ email });

        // Send welcome email (non-blocking)
        sendWelcomeEmail(email, name);

        return res.status(200).json({
          success: true,
          message: "Account verified and registered successfully!",
        });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new verified user (email stored normalized)
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      isVerified: true,
    });

    // Delete OTP after successful registration
    await Otp.deleteMany({ email });

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, name);

    return res.status(201).json({
      success: true,
      message: "Registration successful! Welcome to Hotel Booking.",
    });
  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
      error: error.message,
    });
  }
};

// Login
export const loginController = async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body;
    const email = normalizeEmail(rawEmail);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user (email stored in lowercase from register)
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
        needsVerification: true,
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
      error: error.message,
    });
  }
};

// import Otp from "../models/Otp.js";
// import User from "../models/User.js";
// import { generateOTP, sendOTPEmail } from "../utils/sendEmail.js";

// // Send OTP to email
// export const sendOtpController = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     // Check if email format is valid
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email format",
//       });
//     }

//     // Check if user already exists and is verified
//     const existingUser = await User.findOne({ email });
//     if (existingUser && existingUser.isVerified) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is already registered and verified",
//       });
//     }

//     // Delete any existing OTP for this email
//     await Otp.deleteMany({ email });

//     // Generate new OTP
//     const otp = generateOTP();

//     // Save OTP to database
//     await Otp.create({ email, otp });

//     // Send OTP via email
//     await sendOTPEmail(email, otp);

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent successfully to your email",
//     });
//   } catch (error) {
//     console.error("Send OTP Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to send OTP. Please try again.",
//       error: error.message,
//     });
//   }
// };

// // Verify OTP
// export const verifyOtpController = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and OTP are required",
//       });
//     }

//     // Find OTP in database
//     const otpRecord = await Otp.findOne({ email, otp });

//     if (!otpRecord) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP or OTP has expired",
//       });
//     }

//     // OTP is valid - delete it
//     await Otp.deleteMany({ email });

//     return res.status(200).json({
//       success: true,
//       message: "OTP verified successfully",
//       verified: true,
//     });
//   } catch (error) {
//     console.error("Verify OTP Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "OTP verification failed. Please try again.",
//       error: error.message,
//     });
//   }
// };

// // Resend OTP
// export const resendOtpController = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     // Check if there's a recent OTP (prevent spam)
//     const recentOtp = await Otp.findOne({ email });
//     if (recentOtp) {
//       const timeDiff = Date.now() - recentOtp.createdAt.getTime();
//       const waitTime = 60000; // 1 minute

//       if (timeDiff < waitTime) {
//         const remainingTime = Math.ceil((waitTime - timeDiff) / 1000);
//         return res.status(429).json({
//           success: false,
//           message: `Please wait ${remainingTime} seconds before requesting a new OTP`,
//         });
//       }
//     }

//     // Delete old OTP and create new one
//     await Otp.deleteMany({ email });
//     const otp = generateOTP();
//     await Otp.create({ email, otp });
//     await sendOTPEmail(email, otp);

//     return res.status(200).json({
//       success: true,
//       message: "New OTP sent successfully",
//     });
//   } catch (error) {
//     console.error("Resend OTP Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to resend OTP. Please try again.",
//       error: error.message,
//     });
//   }
// };
// // 


import Otp from "../models/Otp.js";
import User from "../models/User.js";
import { generateOTP, sendOTPEmail } from "../utils/sendEmail.js";

const normalizeEmail = (e) => String(e || "").toLowerCase().trim();

export const sendOtpController = async (req, res) => {
  try {
    const rawEmail = req.body.email;
    if (!rawEmail) {
      return res.status(400).json({ success: false, message: "Email required" });
    }
    const email = normalizeEmail(rawEmail);

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    await Otp.deleteMany({ email });

    const otp = generateOTP();
    await Otp.create({ email, otp });

    try {
      await sendOTPEmail(email, otp);
    } catch (emailErr) {
      console.error("Send OTP Error:", emailErr.message);
      console.log("[DEV] OTP for", email, ":", otp, "- use this if email failed");
      // Still return 200 so registration flow continues; user can get OTP from server console
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send OTP",
    });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || "").trim();

    if (!otp || otp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit OTP",
      });
    }

    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    await Otp.deleteMany({ email });

    res.status(200).json({
      success: true,
      message: "OTP verified",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};

export const resendOtpController = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    await Otp.deleteMany({ email });

    const otp = generateOTP();
    await Otp.create({ email, otp });

    try {
      await sendOTPEmail(email, otp);
    } catch (emailErr) {
      console.error("Resend OTP Error:", emailErr.message);
      console.log("[DEV] OTP for", email, ":", otp);
    }

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to resend OTP",
    });
  }
};

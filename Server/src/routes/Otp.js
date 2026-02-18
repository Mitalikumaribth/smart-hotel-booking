// import express from "express";
// import {
//   sendOtpController,
//   verifyOtpController,
//   resendOtpController,
// } from "../controller/Otp.js";

// const router = express.Router();

// // Send OTP
// router.post("/send-otp", sendOtpController);

// // Verify OTP
// router.post("/verify-otp", verifyOtpController);

// // Resend OTP
// router.post("/resend-otp", resendOtpController);

// export default router;


import express from "express";
import {
  sendOtpController,
  verifyOtpController,
  resendOtpController,
} from "../controller/Otp.js";

const router = express.Router();

router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/resend-otp", resendOtpController);

export default router;

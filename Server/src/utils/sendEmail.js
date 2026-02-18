

import nodemailer from "nodemailer";

const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return null;
  // Use service: "gmail" so Nodemailer sets correct host/port/secure for Gmail
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
};

// OTP Generator
export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP Email (with dev fallback if Gmail not configured)
export const sendOTPEmail = async (email, otp) => {
  const transporter = getTransporter();
  if (!transporter) {
    console.log("[DEV] Email not configured. OTP for", email, ":", otp);
    return;
  }
  try {
    await transporter.verify();
  } catch (verifyErr) {
    console.error("Gmail connection error:", verifyErr.message);
    throw new Error(
      "Gmail login failed. In .env use EMAIL_PASS = 16-character App Password (Google Account → Security → App Passwords). Normal password does not work."
    );
  }
  try {
    await transporter.sendMail({
      from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code - Hotel Booking",
      text: `Your OTP is ${otp}. Valid for 5 minutes. Do not share.`,
      html: `
        <h2>Your OTP: <b>${otp}</b></h2>
        <p>Valid for 5 minutes. Do not share with anyone.</p>
      `,
    });
    console.log("OTP email sent to", email);
  } catch (err) {
    console.error("Send OTP email error:", err.message);
    throw new Error(
      err.message?.includes("Invalid login") || err.message?.includes("Username and Password")
        ? "Gmail rejected login. Use App Password (not normal password) in .env."
        : "Failed to send OTP email: " + (err.message || "Check EMAIL_USER and EMAIL_PASS.")
    );
  }
};

// Welcome Email (non-blocking; don't fail registration if it errors)
export const sendWelcomeEmail = async (email, name) => {
  const transporter = getTransporter();
  if (!transporter) return;
  try {
    await transporter.sendMail({
      from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Hotel Booking 🎉",
      html: `<h2>Welcome ${name}!</h2><p>Your account is successfully created.</p>`,
    });
  } catch (err) {
    console.error("Welcome email error:", err.message);
  }
};

// Startup: log email status (Gmail needs App Password – not normal password)
if (getTransporter()) {
  console.log("Email: configured (Gmail). Use App Password in .env if OTP not received.");
} else {
  console.log("Email: not configured. Set EMAIL_USER & EMAIL_PASS in .env for OTP emails, or use OTP from server console.");
}

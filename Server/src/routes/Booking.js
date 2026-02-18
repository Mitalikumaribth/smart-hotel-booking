import express from "express";
import { createBooking, getMyBookings } from "../controller/Booking.js";
import { requireSignIn } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/", requireSignIn, createBooking);
router.get("/", requireSignIn, getMyBookings);

export default router;

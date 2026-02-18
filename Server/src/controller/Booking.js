import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { hotelName, hotelLocation, pricePerNight, checkIn, checkOut, guests } = req.body;
    const userId = req.user._id;

    if (!hotelName || !hotelLocation || pricePerNight == null || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: "Hotel details, check-in and check-out dates are required",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out must be after check-in",
      });
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalAmount = Math.round(Number(pricePerNight) * nights);
    const numGuests = Math.max(1, parseInt(guests, 10) || 1);

    const booking = await Booking.create({
      user: userId,
      hotelName,
      hotelLocation,
      pricePerNight: Number(pricePerNight),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: numGuests,
      totalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Booking confirmed!",
      booking: {
        id: booking._id,
        hotelName: booking.hotelName,
        hotelLocation: booking.hotelLocation,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        totalAmount: booking.totalAmount,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error("Create Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get Bookings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

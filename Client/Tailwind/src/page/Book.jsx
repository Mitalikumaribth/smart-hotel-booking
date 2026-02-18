import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/UserContext";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const Book = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth] = useAuth();
  const hotel = location.state?.hotel;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hotel) {
      toast.error("Please select a hotel to book");
      navigate("/discover");
    }
  }, [hotel, navigate]);

  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;
  const nights =
    checkInDate && checkOutDate && checkOutDate > checkInDate
      ? Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
      : 0;
  const totalAmount = nights > 0 ? hotel?.price * nights : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hotel) return;
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    if (checkOutDate <= checkInDate) {
      toast.error("Check-out must be after check-in");
      return;
    }
    if (!auth?.token) {
      toast.error("Please login to book");
      navigate("/login", { state: { from: "/book", hotel } });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/booking`,
        {
          hotelName: hotel.name,
          hotelLocation: hotel.location,
          pricePerNight: hotel.price,
          checkIn,
          checkOut,
          guests: Math.max(1, parseInt(guests, 10) || 1),
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      toast.success(res.data?.message || "Booking confirmed!");
      navigate("/orders");
    } catch (err) {
      const msg = err.response?.data?.message || "Booking failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) return null;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-slate-50 to-indigo-50/20 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Link to="/discover" className="text-indigo-600 hover:text-indigo-700 font-medium mb-6 inline-block">
          ← Back to hotels
        </Link>

        {/* Hotel summary */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mb-8">
          <div className="h-40 bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
            <span className="text-white text-5xl font-bold">{hotel.image}</span>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{hotel.name}</h1>
                <p className="flex items-center text-slate-500 mt-1">
                  <FaMapMarkerAlt className="mr-2 text-indigo-400" />
                  {hotel.location}
                </p>
                <p className="flex items-center text-amber-600 mt-1">
                  <FaStar className="mr-1" /> {hotel.rating} · ₹{hotel.price}/night
                </p>
              </div>
            </div>
          </div>
        </div>

        {!auth?.token ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Login to continue</h2>
            <p className="text-slate-600 mb-6">You need to sign in to complete your booking.</p>
            <button
              onClick={() => navigate("/login", { state: { from: "/book", hotel } })}
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600"
            >
              Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Booking details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || undefined}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Guests</label>
              <input
                type="number"
                min={1}
                max={10}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10) || 1)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
              />
            </div>
            {nights > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <p className="text-slate-600">
                  {nights} night{nights > 1 ? "s" : ""} × ₹{hotel.price} = <strong className="text-slate-800">₹{totalAmount}</strong>
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading || nights < 1}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Confirming..." : `Confirm Booking · ₹${totalAmount || hotel.price}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Book;

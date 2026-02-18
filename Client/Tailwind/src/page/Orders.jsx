import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const Orders = () => {
  const [auth] = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token) return;
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/booking`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setBookings(res.data?.bookings || []);
      } catch (err) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [auth?.token]);

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-slate-50 to-indigo-50/20 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">My Bookings</h1>
        <p className="text-slate-500 mb-8">Your confirmed hotel bookings</p>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-12 text-center">
            <p className="text-slate-600 mb-6">You haven't made any bookings yet.</p>
            <Link
              to="/discover"
              className="inline-block bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600"
            >
              Discover Hotels
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{b.hotelName}</h2>
                  <p className="flex items-center text-slate-500 mt-1">
                    <FaMapMarkerAlt className="mr-2 text-indigo-400" />
                    {b.hotelLocation}
                  </p>
                  <p className="flex items-center text-slate-500 mt-1">
                    <FaCalendarAlt className="mr-2 text-indigo-400" />
                    {formatDate(b.checkIn)} → {formatDate(b.checkOut)} · {b.guests} guest{b.guests > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-800">₹{b.totalAmount}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-lg text-sm font-medium ${
                    b.status === "confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                  }`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

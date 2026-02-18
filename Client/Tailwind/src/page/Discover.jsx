import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaStar, FaMapMarkerAlt, FaWifi, FaParking, FaSwimmingPool } from "react-icons/fa";
import { toast } from "react-toastify";

const Discover = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [searchDates, setSearchDates] = useState({ checkIn: "", checkOut: "" });

  // When coming from Home search, pre-fill location and show dates if any
  useEffect(() => {
    const state = location.state;
    if (state?.location) {
      setSearchQuery(state.location);
      if (state.checkIn || state.checkOut) {
        setSearchDates({ checkIn: state.checkIn || "", checkOut: state.checkOut || "" });
        toast.success(`Showing hotels for ${state.location}${state.checkIn ? ` (Check-in: ${state.checkIn})` : ""}`);
      }
    }
  }, [location.state]);

  const hotels = [
    { id: 1, name: "Grand Palace Hotel", location: "Mumbai, Maharashtra", price: 2500, rating: 4.8, image: "GP", amenities: ["wifi", "parking", "pool"] },
    { id: 2, name: "Seaside Resort", location: "Goa", price: 3500, rating: 4.5, image: "SR", amenities: ["wifi", "pool"] },
    { id: 3, name: "Mountain View Inn", location: "Shimla, Himachal Pradesh", price: 1800, rating: 4.2, image: "MV", amenities: ["wifi", "parking"] },
    { id: 4, name: "Royal Heritage", location: "Jaipur, Rajasthan", price: 4200, rating: 4.9, image: "RH", amenities: ["wifi", "parking", "pool"] },
    { id: 5, name: "Lake View Hotel", location: "Udaipur, Rajasthan", price: 3200, rating: 4.6, image: "LV", amenities: ["wifi", "pool"] },
    { id: 6, name: "City Center Inn", location: "Delhi", price: 1500, rating: 4.0, image: "CC", amenities: ["wifi", "parking"] },
  ];

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "budget" && hotel.price <= 2000) ||
      (priceRange === "mid" && hotel.price > 2000 && hotel.price <= 3500) ||
      (priceRange === "luxury" && hotel.price > 3500);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-slate-50 to-indigo-50/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">
            Discover Hotels
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Find the perfect hotel for your next adventure
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-lg" />
              <input
                type="text"
                placeholder="Search by hotel name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-shadow"
              />
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-white"
            >
              <option value="all">All Prices</option>
              <option value="budget">Budget (≤ ₹2000)</option>
              <option value="mid">Mid-Range (₹2000-₹3500)</option>
              <option value="luxury">Luxury (₹3500+)</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <p className="text-slate-600 font-medium">
            Showing {filteredHotels.length} hotels
            {searchQuery && (
              <span className="text-indigo-600 ml-1">for &quot;{searchQuery}&quot;</span>
            )}
          </p>
          {searchDates.checkIn && (
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              Check-in: {searchDates.checkIn}
              {searchDates.checkOut && ` · Check-out: ${searchDates.checkOut}`}
            </span>
          )}
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
            >
              <div className="h-52 bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                <span className="text-white text-5xl font-bold drop-shadow-md">{hotel.image}</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center bg-amber-100 px-2.5 py-1 rounded-lg">
                    <FaStar className="text-amber-500 mr-1" size={14} />
                    <span className="text-sm font-semibold text-amber-800">
                      {hotel.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-slate-500 mb-4">
                  <FaMapMarkerAlt className="mr-2 text-indigo-400" size={14} />
                  <span className="text-sm">{hotel.location}</span>
                </div>
                <div className="flex gap-3 mb-4">
                  {hotel.amenities.includes("wifi") && (
                    <FaWifi className="text-indigo-500" title="Free WiFi" />
                  )}
                  {hotel.amenities.includes("parking") && (
                    <FaParking className="text-indigo-500" title="Parking" />
                  )}
                  {hotel.amenities.includes("pool") && (
                    <FaSwimmingPool className="text-indigo-500" title="Pool" />
                  )}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-2xl font-bold text-slate-800">
                      ₹{hotel.price}
                    </span>
                    <span className="text-slate-500 text-sm">/night</span>
                  </div>
                  <Link
                    to="/book"
                    state={{ hotel }}
                    className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600 shadow-lg shadow-indigo-200 transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-20 bg-white/80 rounded-2xl border border-slate-100">
            <p className="text-slate-500 text-xl mb-4">No hotels found matching your criteria</p>
            <button
              onClick={() => { setSearchQuery(""); setPriceRange("all"); }}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;

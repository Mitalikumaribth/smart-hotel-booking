import { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // Pre-fill location when coming from Discover "Book Now"
  useEffect(() => {
    if (routeState?.location) {
      setLocation(routeState.location);
      if (routeState.fromBook) {
        toast.info("Select dates and click Search to see hotels");
      }
    }
  }, [routeState]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      toast.info("Please enter a location to search");
      return;
    }
    navigate("/discover", { state: { location: location.trim(), checkIn, checkOut } });
  };

  const handleDestinationClick = (city) => {
    setLocation(city);
    navigate("/discover", { state: { location: city, checkIn: "", checkOut: "" } });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-slate-50 to-indigo-50/20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Discover amazing hotels at the best prices
            </p>
            {auth?.user ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20">
                <p className="text-lg mb-2 text-indigo-100">Welcome back,</p>
                <p className="text-2xl font-bold">{auth.user?.name || auth.user?.email}</p>
              </div>
            ) : (
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  to="/login"
                  className="bg-white text-indigo-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-indigo-50 shadow-lg transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-white/10 border-2 border-white text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Mumbai, Goa, Delhi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Check In
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Check Out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || undefined}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-2.5 px-4 rounded-xl hover:from-indigo-700 hover:to-indigo-600 font-semibold shadow-lg shadow-indigo-200 transition-all"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4">
          Why Choose Us?
        </h2>
        <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
          Trusted by thousands of travelers across India
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-100 text-center hover:shadow-2xl hover:border-indigo-100 transition-all duration-300">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Best Prices</h3>
            <p className="text-slate-600">
              We guarantee the best prices for all our hotels
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-100 text-center hover:shadow-2xl hover:border-emerald-100 transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Verified Hotels</h3>
            <p className="text-slate-600">
              All hotels are verified for quality and safety
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-100 text-center hover:shadow-2xl hover:border-violet-100 transition-all duration-300">
            <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">24/7 Support</h3>
            <p className="text-slate-600">
              Our support team is available round the clock
            </p>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-slate-100/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4">
            Popular Destinations
          </h2>
          <p className="text-slate-500 text-center mb-12">
            Explore top cities and find your perfect stay
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Mumbai", "Delhi", "Goa", "Jaipur"].map((city) => (
              <div
                key={city}
                onClick={() => handleDestinationClick(city)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleDestinationClick(city)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer"
              >
                <div className="h-44 bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center group-hover:from-indigo-600 group-hover:to-indigo-700 transition-all">
                  <span className="text-white text-5xl font-bold drop-shadow-sm">{city[0]}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800">{city}</h3>
                  <p className="text-sm text-slate-500">Explore hotels</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

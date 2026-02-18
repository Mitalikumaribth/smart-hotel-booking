import { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isSignedIn = auth?.user && auth?.token;

  const handleDropDownToggle = () => {
    setIsDropDownOpen((prevState) => !prevState);
  };

  const closeDropDown = () => {
    setIsDropDownOpen(false);
  };

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/login");
    closeDropDown();
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-3 bg-white/90 backdrop-blur-sm shadow-md border-b border-slate-100">
      {/* Brand logo */}
      <Link to="/" className="flex items-center space-x-2 group">
        <img
          src="/aeroplane.png"
          alt="logo"
          className="h-11 w-11 object-contain"
        />
        <span className="text-xl font-bold text-slate-800 hidden sm:block group-hover:text-indigo-600 transition-colors">
          Hotel Booking
        </span>
      </Link>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Navbar Links - Desktop */}
      <div className="hidden md:flex items-center space-x-1">
        {["Home", "Discover", "Activities", "Contact", "About"].map((label) => (
          <Link
            key={label}
            to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
            className="px-4 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-b border-slate-100 z-50 md:hidden rounded-b-xl overflow-hidden">
          <div className="flex flex-col p-4 space-y-1">
            {["Home", "Discover", "Activities", "Contact", "About"].map((label) => (
              <Link
                key={label}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                className="px-4 py-3 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* User profile and actions */}
      <div className="hidden md:flex items-center space-x-4 relative">
        {isSignedIn && (
          <span className="text-slate-600 text-sm">
            Welcome, <strong className="text-slate-800">{auth.user?.name || auth.user?.email}</strong>
          </span>
        )}
        <button
          onClick={handleDropDownToggle}
          className="p-2.5 rounded-xl hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <FaUser size={20} />
        </button>

        {isDropDownOpen && (
          <div
            className="absolute right-0 top-14 w-52 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50"
            onMouseLeave={closeDropDown}
          >
            <ul className="py-1">
              {isSignedIn ? (
                <>
                  <li>
                    <Link to="/profile" onClick={closeDropDown} className="block px-4 py-2.5 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      Your Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" onClick={closeDropDown} className="block px-4 py-2.5 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      Your Orders
                    </Link>
                  </li>
                  <li className="border-t border-slate-100 mt-1 pt-1">
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={closeDropDown} className="block px-4 py-2.5 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={closeDropDown} className="block px-4 py-2.5 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

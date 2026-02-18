import { useAuth } from "../context/UserContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const [auth] = useAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-slate-50 to-indigo-50/20 py-12">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Your Profile</h1>
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-2xl mx-auto mb-6">
            <span className="text-3xl font-bold text-indigo-600">
              {auth?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <p className="text-slate-600 text-center mb-1"><strong>Name:</strong> {auth?.user?.name}</p>
          <p className="text-slate-600 text-center mb-6"><strong>Email:</strong> {auth?.user?.email}</p>
          <Link
            to="/orders"
            className="block text-center bg-indigo-100 text-indigo-700 py-2 rounded-xl font-medium hover:bg-indigo-200"
          >
            View My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;

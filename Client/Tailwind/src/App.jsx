import Navbar from "./Components/Navbar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import Home from "./page/Home.jsx";
import Discover from "./page/Discover.jsx";
import Book from "./page/Book.jsx";
import Orders from "./page/Orders.jsx";
import Profile from "./page/Profile.jsx";
import Activities from "./page/Activities.jsx";
import Contact from "./page/Contact.jsx";
import About from "./page/About.jsx";
import { useAuth } from "./context/UserContext.jsx";

// Protected Route - redirects to login if not authenticated
const PrivateRoute = ({ children }) => {
  const [auth] = useAuth();
  return auth?.token ? children : <Navigate to="/login" />;
};

// Guest Route - redirects to home if already authenticated
const GuestRoute = ({ children }) => {
  const [auth] = useAuth();
  return !auth?.token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/book" element={<Book />} />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/activities" element={<Activities />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        
        {/* Guest Only Routes - redirect to home if logged in */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

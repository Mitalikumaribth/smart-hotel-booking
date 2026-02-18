import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUser, FaArrowLeft } from "react-icons/fa";

const Register = () => {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step management: 1 = Email, 2 = OTP + then Name/Password, 3 = Register (no second OTP)
  const [step, setStep] = useState(1);

  // Timer for resend OTP
  const [resendTimer, setResendTimer] = useState(0);

  const navigate = useNavigate();
  const otpRefs = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Step 1: Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/otp/send-otp`, {
        email,
      });

      toast.success("OTP sent to your email!");
      setStep(2);
      setResendTimer(60); // 60 seconds cooldown
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to send OTP";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  // Step 2: Enter OTP and go to step 3 (no separate verify – we verify at register)
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }
    toast.success("Now complete your profile.");
    setStep(3);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setError("");

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/otp/resend-otp`, {
        email,
      });

      toast.success("New OTP sent!");
      setOtp(["", "", "", "", "", ""]);
      setResendTimer(60);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to resend OTP";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Register with same OTP (one verification only)
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const otpString = otp.join("").replace(/\D/g, "").slice(0, 6);
    if (otpString.length !== 6) {
      setError("Please enter the 6-digit OTP from your email");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
        name,
        email: email.trim(),
        password,
        otp: otpString,
      });

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Registration failed";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-amber-50/40">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 p-8 md:p-10">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-1 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    step >= s
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-200"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 rounded-full transition-all duration-300 ${
                      step > s ? "bg-indigo-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Enter Email */}
          {step === 1 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-1">
                Create Account
              </h2>
              <p className="text-slate-500 text-center mb-8">
                Enter your email to get started
              </p>

              <form onSubmit={handleSendOtp}>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-lg" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-shadow"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-3 px-1">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:from-indigo-700 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </>
          )}

          {/* Step 2: Verify OTP */}
          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="flex items-center text-slate-600 hover:text-indigo-600 mb-6 transition-colors"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>

              <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-1">
                Verify Email
              </h2>
              <p className="text-slate-500 text-center mb-8">
                Enter the 6-digit code sent to
                <br />
                <span className="font-semibold text-slate-700">{email}</span>
              </p>

              <form onSubmit={handleVerifyOtp}>
                <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all"
                >
                  Continue
                </button>

                <p className="text-center mt-5 text-sm text-slate-500">
                  Didn't receive the code?{" "}
                  {resendTimer > 0 ? (
                    <span className="text-slate-400">
                      Resend in {resendTimer}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </form>
            </>
          )}

          {/* Step 3: Complete Registration */}
          {step === 3 && (
            <>
              <button
                onClick={() => setStep(2)}
                className="flex items-center text-slate-600 hover:text-indigo-600 mb-6 transition-colors"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>

              <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-1">
                Complete Registration
              </h2>
              <p className="text-slate-500 text-center mb-8">
                Your OTP is verified. Set your name and password.
              </p>

              <form onSubmit={handleRegister}>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-lg" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                      placeholder="Your full name"
                      className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-shadow"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-lg" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                      minLength={6}
                      placeholder="Min 6 characters"
                      className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-shadow"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-3 px-1">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:from-emerald-700 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Complete Registration"}
                </button>
              </form>
            </>
          )}

          <p className="text-center mt-8 text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Button } from "./Button";
import AnnouncementBar from "../../Shared/AnnouncementBar";
import { useNavigate, Link } from "react-router-dom";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerOrLogin } from "../../Redux/OnlyemailCreateacc";
import { authService } from "../../Redux/Auth";

export const Step_onlyemail = ({ onNext }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading: emailLoading, error } = useSelector((state) => state.onlyemail);
  const [email, setEmail] = useState("");
  const [activeView, setActiveView] = useState("signup"); // signup, login, forgotPassword, forgotOtp, resetPassword

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Email-only signup handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    
    try {
      const response = await dispatch(registerOrLogin({ email })).unwrap();
      
      // Save data in the expected structure in local storage
      if (response.tokens) {
        localStorage.setItem("access_token", response.tokens.access);
        localStorage.setItem("refresh_token", response.tokens.refresh);
      }
      if (response.user) {
        localStorage.setItem("user_info", JSON.stringify(response.user));
      }
      localStorage.setItem("login_response", JSON.stringify(response));
      
      if (onNext) {
        onNext(email);
      }
      navigate('/pricing');
    } catch (err) {
      console.error("Failed to register or login:", err);
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login({
        email: loginEmail,
        password: loginPassword,
      });

      // Save full response to localStorage
      if (response) {
        localStorage.setItem("login_response", JSON.stringify(response));
      }

      // Check subscription status
      const isSubscribed = response.user?.is_subscribed;

      // Redirect based on subscription status
      if (isSubscribed) {
        navigate("/dashboard");
      } else {
        navigate("/pricing");
      }
    } catch (error) {
      setLoginError(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // Forgot password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotError("");

    if (!forgotEmail) {
      setForgotError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.forgetPassword({ email: forgotEmail });
      setSuccessMessage(response.message || "OTP sent to your email!");
      setOtpEmail(forgotEmail);
      setActiveView("forgotOtp");
    } catch (error) {
      setForgotError(error.message || "Failed to send reset OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Verify forgot password OTP
  const handleVerifyForgotOTP = async (e) => {
    e.preventDefault();
    setOtpError("");

    if (!otp || otp.length < 4) {
      setOtpError("Please enter a valid OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOTP({
        email: otpEmail,
        otp: otp,
      });

      if (response.access) {
        setResetToken(response.access);
        setSuccessMessage("OTP verified! Please set your new password.");
        setOtp("");
        setActiveView("resetPassword");
      }
    } catch (error) {
      setOtpError(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setOtpError("");
    setLoading(true);
    try {
      const response = await authService.resendOTP({ email: otpEmail });
      setSuccessMessage(response.message || "OTP resent successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setOtpError(error.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Reset password handler
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError("");

    if (!newPassword || !confirmNewPassword) {
      setResetError("Please fill all fields.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setResetError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setResetError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword(
        { new_password: newPassword },
        resetToken
      );
      setSuccessMessage("Password changed successfully! Please login.");
      setNewPassword("");
      setConfirmNewPassword("");
      setResetToken("");
      setForgotEmail("");
      setTimeout(() => {
        setActiveView("login");
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      setResetError(error.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic heading based on activeView
  const getHeading = () => {
    switch (activeView) {
      case "login":
        return "Login to your account";
      case "forgotPassword":
        return "Forgot your password?";
      case "forgotOtp":
        return "Verify OTP";
      case "resetPassword":
        return "Set new password";
      default:
        return (
          <>
            Enter your email to start creating
            <br />
            and viewing your memories.
          </>
        );
    }
  };

  // Dynamic subheading
  const getSubheading = () => {
    switch (activeView) {
      case "login":
        return "Enter your email and password to access your memories.";
      case "forgotPassword":
        return "Enter your email to receive a password reset OTP.";
      case "forgotOtp":
        return "Enter the OTP sent to your email to reset your password.";
      case "resetPassword":
        return "Enter your new password below.";
      default:
        return (
          <>
            <FaCheck className="inline mr-1 text-green-500" /> Make sure it's
            correct, so your moment reaches safely!
          </>
        );
    }
  };

  return (
    <section>
      <AnnouncementBar />
      <div className="w-full mx-auto text-center animate-in fade-in zoom-in-95 duration-500 px-4 sm:px-0 pb-10">
        <Link to="/">
          <header className="px-4 sm:px-6 md:px-12 py-4 sm:py-6 flex items-center justify-center mb-8 sm:mb-10 border-b border-gray-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
            <div className="text-xl md:text-2xl font-serif tracking-tight text-[#7c602e] font-bold">
              PureMotion
            </div>
          </header>
        </Link>

        {/* Success Message */}
        {successMessage && (
          <div className="max-w-sm mx-auto mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {successMessage}
          </div>
        )}

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight font-medium mx-auto">
          {getHeading()}
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-xs sm:text-sm mb-8 sm:mb-10 font-medium tracking-tight">
          {getSubheading()}
        </p>

        {/* Auth Forms */}
        <div className="max-w-sm mx-auto space-y-4">

          {/* Email-only Signup Form */}
          {activeView === "signup" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                autoComplete="email"
                required
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">
                  {error.message || "An error occurred. Please try again."}
                </p>
              )}
              <Button
                className="w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-sm"
                type="submit"
                disabled={emailLoading}
              >
                {emailLoading ? "Loading..." : "Continue"}
              </Button>
              <div className="text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => setActiveView("login")}
                  className="text-[#7c602e] font-semibold cursor-pointer hover:underline"
                >
                  Login
                </span>
              </div>
            </form>
          )}

          {/* Login Form */}
          {activeView === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="text-red-500 text-sm font-medium mb-2">
                  {loginError}
                </div>
              )}
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                autoComplete="email"
                required
              />
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="text-right">
                <span
                  onClick={() => setActiveView("forgotPassword")}
                  className="text-sm text-[#7c602e] font-semibold cursor-pointer hover:underline"
                >
                  Forgot Password?
                </span>
              </div>
              <Button
                className="w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <span
                  onClick={() => setActiveView("signup")}
                  className="text-[#7c602e] font-semibold cursor-pointer hover:underline"
                >
                  Create Account
                </span>
              </div>
            </form>
          )}

          {/* Forgot Password Form */}
          {activeView === "forgotPassword" && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {forgotError && (
                <div className="text-red-500 text-sm font-medium mb-2">
                  {forgotError}
                </div>
              )}
              <input
                type="email"
                placeholder="Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                autoComplete="email"
                required
              />
              <Button
                className="w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset OTP"}
              </Button>
              <div className="text-sm text-gray-600">
                Remember your password?{" "}
                <span
                  onClick={() => setActiveView("login")}
                  className="text-[#7c602e] font-semibold cursor-pointer hover:underline"
                >
                  Login
                </span>
              </div>
            </form>
          )}

          {/* Forgot Password OTP Verification */}
          {activeView === "forgotOtp" && (
            <form onSubmit={handleVerifyForgotOTP} className="space-y-4">
              {otpError && (
                <div className="text-red-500 text-sm font-medium mb-2">
                  {otpError}
                </div>
              )}
              <p className="text-sm text-gray-600 mb-4">
                We sent a reset code to <strong>{otpEmail}</strong>
              </p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300 text-center text-xl tracking-widest"
                maxLength="6"
                required
              />
              <Button
                className="w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <div className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <span
                  onClick={handleResendOTP}
                  className="text-[#7c602e] font-semibold cursor-pointer hover:underline"
                >
                  Resend OTP
                </span>
              </div>
            </form>
          )}

          {/* Reset Password Form */}
          {activeView === "resetPassword" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {resetError && (
                <div className="text-red-500 text-sm font-medium mb-2">
                  {resetError}
                </div>
              )}
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <Button
                className="w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}
        </div>

        <p className="text-xs sm:text-[14px] text-gray-400 leading-relaxed font-medium mt-6">
          We respect your privacy. We will never sell, rent or share your email
          address. That's more than a{" "}
          <Link to="/privacy-policy" className="text-blue-600 underline">
            policy
          </Link>
          , it's our personal guarantee.
        </p>
      </div>
    </section>
  );
};

export default Step_onlyemail;
import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import AnnouncementBar from "../../Shared/AnnouncementBar";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { authService } from "../../Redux/Auth";
import { Toast } from "../../Shared/Toast";
import { useDispatch } from "react-redux";
import {
  uploadVideo,
  getVideoFormData,
  clearVideoFormData,
  getVideoImageFiles,
} from "../../Redux/VideoUpload";
import { Link } from "react-router-dom";
import { trackLead } from "../../utils/metaPixel";

export const Step5_Login = ({ onNext }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState("signup"); // signup, login, otp, forgotPassword, forgotOtp, resetPassword

  // Debug: Check video data on mount
  useEffect(() => {
    const videoData = getVideoFormData();
    const imageFiles = getVideoImageFiles();
    console.log("Step5_Login mounted - checking stored video data:", {
      videoData,
      hasImageOne: !!imageFiles?.image_one,
      hasImageTwo: !!imageFiles?.image_two,
      localStorageVideoData: localStorage.getItem("video_form_data"),
      localStorageImagesData: localStorage.getItem("video_images_data")
        ? "exists (base64)"
        : "null",
    });
  }, []);

  // Signup form state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupError, setSignupError] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // OTP state
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpEmail, setOtpEmail] = useState("");

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetError, setResetError] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Password visibility states
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Helper function to handle video upload after authentication
  const handlePendingVideoUpload = async () => {
    const videoData = getVideoFormData();
    const imageFiles = getVideoImageFiles();
    const token = localStorage.getItem("access_token");

    console.log("Checking for pending video upload...", {
      videoData,
      hasToken: !!token,
      hasImageOne: !!imageFiles.image_one,
      hasImageTwo: !!imageFiles.image_two,
    });

    if (videoData && token && imageFiles.image_one) {
      try {
        setSuccessMessage("Uploading your video...");
        console.log("Starting video upload...");
        const result = await dispatch(uploadVideo()).unwrap();
        console.log("Video upload successful:", result);
        setSuccessMessage("Video uploaded successfully!");
        setToastMessage("Video uploaded successfully!");
        return true;
      } catch (error) {
        console.error("Video upload failed:", error);
        console.log("Step5_Login: Error type:", typeof error);
        console.log("Step5_Login: Error keys:", Object.keys(error || {}));
        console.log("Step5_Login: error.message:", error?.message);
        setSuccessMessage("");
        const errorMsg =
          error?.message ||
          error?.error ||
          "Video upload failed. Please try again.";
        console.log("Step5_Login: Setting toast to:", errorMsg);
        setToastMessage(errorMsg);
        // Don't clear video data on failure - let user retry
        return false;
      }
    } else if (videoData && !token) {
      console.log("Video data exists but no token yet");
    } else if (videoData && !imageFiles.image_one) {
      console.log("Video metadata exists but no image file found");
    }
    return true; // No video data to upload or no token
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");
    setSuccessMessage("");

    if (
      !signupEmail ||
      !signupFirstName ||
      // !signupLastName ||
      !signupPassword ||
      !signupConfirm
    ) {
      setSignupError("Please fill all required fields.");
      return;
    }
    if (signupPassword !== signupConfirm) {
      setSignupError("Passwords do not match.");
      return;
    }
    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: signupEmail,
        first_name: signupFirstName,
        last_name: signupLastName,
        password: signupPassword,
      };

      if (referenceCode) {
        payload.reference_code = referenceCode;
      }

      const response = await authService.register(payload);
      setSuccessMessage(response.message || "OTP sent to your email!");
      setOtpEmail(signupEmail);

      // Meta Pixel: Lead — email successfully captured
      trackLead();

      setActiveView("otp");
    } catch (error) {
      setSignupError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
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

      console.log("OTP verification successful, response:", response);

      // Save response to localStorage
      if (response) {
        localStorage.setItem("signup_response", JSON.stringify(response));
      }

      // Check if there's pending video data and upload it
      const uploadSuccess = await handlePendingVideoUpload();
      console.log("Video upload attempt result:", uploadSuccess);

      setSuccessMessage(
        "Email verified successfully! Redirecting to pricing...",
      );
      // Clear signup form
      setSignupEmail("");
      setSignupFirstName("");
      setSignupLastName("");
      setSignupPassword("");
      setSignupConfirm("");
      setReferenceCode("");
      setOtp("");

      // Check subscription status and redirect accordingly
      const isSubscribed = response.user?.is_subscribed;

      // Navigate based on subscription status
      setTimeout(() => {
        if (isSubscribed) {
          navigate("/dashboard");
        } else {
          navigate("/pricing");
        }
      }, 1500);
    } catch (error) {
      setOtpError(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

      console.log("Login successful, response:", response);

      // Save full response to localStorage
      if (response) {
        localStorage.setItem("login_response", JSON.stringify(response));
      }

      // Check subscription status
      const isSubscribed = response.user?.is_subscribed;
      console.log("User subscription status:", isSubscribed);

      // Check if there's pending video data and upload it
      const uploadSuccess = await handlePendingVideoUpload();
      console.log("Video upload attempt result:", uploadSuccess);

      // Redirect based on subscription status
      if (isSubscribed) {
        navigate("/dashboard");
      } else {
        navigate("/pricing");
      }
    } catch (error) {
      setLoginError(
        error.message || "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

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

      // Store the access token for password reset
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
        resetToken,
      );
      setSuccessMessage("Password changed successfully! Please login.");
      // Clear reset form
      setNewPassword("");
      setConfirmNewPassword("");
      setResetToken("");
      setForgotEmail("");
      // Switch to login view
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
          {activeView === "login" && "Login to your account"}
          {activeView === "signup" && (
            <>
              Enter your email to start creating
              <br />
              and viewing your memories.
            </>
          )}
          {activeView === "otp" && "Verify your email"}
          {activeView === "forgotPassword" && "Forgot your password?"}
          {activeView === "forgotOtp" && "Verify OTP"}
          {activeView === "resetPassword" && "Set new password"}
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-xs sm:text-sm mb-8 sm:mb-10 font-medium tracking-tight">
          {activeView === "login" &&
            "Enter your email and password to access your memories."}
          {activeView === "signup" && (
            <>
              <FaCheck className="inline mr-1 text-green-500" /> Make sure it's
              correct, so your moment reaches safely!
            </>
          )}
          {activeView === "otp" && "Enter the OTP sent to your email address."}
          {activeView === "forgotPassword" &&
            "Enter your email to receive a password reset OTP."}
          {activeView === "forgotOtp" &&
            "Enter the OTP sent to your email to reset your password."}
          {activeView === "resetPassword" && "Enter your new password below."}
        </p>

        {/* Auth Forms */}
        <div className="max-w-sm mx-auto space-y-4">
          {/* Signup Form */}
          {activeView === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              {signupError && (
                <div className="text-red-500 text-sm font-medium mb-2">
                  {signupError}
                </div>
              )}

              <input
                type="text"
                placeholder="Full Name *"
                value={signupFirstName}
                onChange={(e) => setSignupFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                required
              />
              {/* <input
                type="text"
                placeholder="Last Name *"
                value={signupLastName}
                onChange={(e) => setSignupLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                required
              /> */}
              <input
                type="email"
                placeholder="Email *"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                autoComplete="email"
                required
              />
              <div className="relative">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="Password *"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showSignupPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showSignupConfirm ? "text" : "password"}
                  placeholder="Confirm Password *"
                  value={signupConfirm}
                  onChange={(e) => setSignupConfirm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSignupConfirm(!showSignupConfirm)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showSignupConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <input
                type="text"
                placeholder="Reference Code (Optional)"
                value={referenceCode}
                onChange={(e) => setReferenceCode(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all placeholder:text-gray-300"
              />
              <Button
                className="w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Continue"}
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

          {/* OTP Verification Form (After Signup) */}
          {activeView === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              {otpError && (
                <div className="text-red-500 text-sm font-medium mb-2">
                  {otpError}
                </div>
              )}
              <p className="text-sm text-gray-600 mb-4">
                We sent a verification code to <strong>{otpEmail}</strong>
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

        {/* Toast notification */}
        {toastMessage && (
          <Toast
            message={toastMessage}
            onClose={() => setToastMessage(null)}
            duration={5000}
          />
        )}
      </div>
    </section>
  );
};

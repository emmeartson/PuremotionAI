import React, { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import AnnouncementBar from "../../Shared/AnnouncementBar";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Check, Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerOrLogin } from "../../Redux/OnlyemailCreateacc";
import { authService } from "../../Redux/Auth";
import { googleLoginOnly } from "../../Redux/GoogleauthforLoginonly";
import { trackLead } from "../../utils/metaPixel";

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

  // Google auth state
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const googlePopupRef = useRef(null);
  const googleIntervalRef = useRef(null);

 const GOOGLE_AUTH_URL =
    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://www.puremotion.co/&prompt=consent&response_type=code&client_id=378868666274-f5mbkg4s1rnu8ik1g3amoce3fg1dhciv.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline";

  // Cleanup Google popup on unmount
  useEffect(() => {
    return () => {
      if (googleIntervalRef.current) clearInterval(googleIntervalRef.current);
      if (googlePopupRef.current && !googlePopupRef.current.closed) {
        googlePopupRef.current.close();
      }
    };
  }, []);

  // --- Google Auth Handlers ---
  const handleGoogleAuth = () => {
    setLoginError("");
    setGoogleError("");
    setGoogleLoading(true);

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      GOOGLE_AUTH_URL,
      "googleAuth",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
    );

    googlePopupRef.current = popup;

    // Poll the popup to extract the authorization code
    googleIntervalRef.current = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(googleIntervalRef.current);
          setGoogleLoading(false);
          return;
        }

        const currentUrl = popup.location.href;

        if (currentUrl && currentUrl.includes("code=")) {
          const url = new URL(currentUrl);
          let code = url.searchParams.get("code");

          // If code is nested in the 'next' param (double-encoded)
          if (!code) {
            const next = url.searchParams.get("next");
            if (next) {
              const decoded = decodeURIComponent(next);
              const qIndex = decoded.indexOf("?");
              if (qIndex !== -1) {
                const nestedParams = new URLSearchParams(
                  decoded.substring(qIndex + 1)
                );
                code = nestedParams.get("code");
              }
            }
          }

          if (code) {
            popup.close();
            clearInterval(googleIntervalRef.current);
            handleGoogleCode(code);
          }
        }
      } catch (e) {
        // Cross-origin error — ignore and keep polling
      }
    }, 500);
  };

  const handleGoogleCode = async (code) => {
    try {
      const response = await dispatch(googleLoginOnly({ code })).unwrap();

      // Save auth data to localStorage
      if (response.tokens) {
        localStorage.setItem("access_token", response.tokens.access);
        localStorage.setItem("refresh_token", response.tokens.refresh);
      }
      if (response.user) {
        localStorage.setItem("user_info", JSON.stringify(response.user));
      }
      localStorage.setItem("login_response", JSON.stringify(response));

      // Redirect based on subscription status
      const isSubscribed = response.user?.is_subscribed;
      if (isSubscribed) {
        navigate("/dashboard");
      } else {
        navigate("/pricing");
      }
    } catch (error) {
      const errorMsg =
        error?.message || "Google authentication failed. Please try again.";
      setGoogleError(errorMsg);
      setLoginError(errorMsg);
    } finally {
      setGoogleLoading(false);
    }
  };

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

      // Fire Meta Pixel Lead event after successful email submission
      trackLead();
      
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
            Save your memory before it's <span className="italic text-[#8B6A2B]">gone</span>
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
        return "Enter your email to securely save your memory and access it anytime.";
    }
  };

  return (
    <section className="relative overflow-hidden h-auto min-h-screen bg-[#fbf8f3]">
      <AnnouncementBar />
      <div className="absolute inset-0 bg-warm-glow pointer-events-none" />

      <div className="relative w-full mx-auto text-center animate-in fade-in zoom-in-95 duration-500 px-4 sm:px-0 pb-10">
        <Link to="/">
          <header className="px-4 sm:px-6 md:px-12 py-4 sm:py-6 flex items-center justify-center mb-4 sm:mb-6 border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
            <div className="text-xl md:text-2xl font-serif tracking-tight text-[#7c602e] font-bold">
              PureMotion
            </div>
          </header>
        </Link>

        <div className="mx-auto max-w-md px-5 pt-2 pb-8 text-center sm:pt-4 sm:pb-10">
          {activeView === "signup" && (
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#7c602e]/10 text-[#7c602e]">
              <Mail className="h-5 w-5" />
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="max-w-sm mx-auto mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {successMessage}
            </div>
          )}

          {/* Heading */}
          <h1 className="font-serif text-3xl text-balance sm:text-4xl text-gray-900 mb-2">
            {getHeading()}
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-2 max-w-sm text-[14px] text-gray-500 mb-6">
            {getSubheading()}
          </p>

          {/* Auth Forms */}
          <div className="w-full text-left">
            {/* Email-only Signup Form */}
            {activeView === "signup" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-base shadow-sm outline-none transition-all focus:border-[#8B6A2B] focus:ring-2 focus:ring-[#8B6A2B]/20 placeholder:text-gray-400"
                />
                {error && (
                  <p className="text-red-500 text-sm">
                    {error.message || "An error occurred. Please try again."}
                  </p>
                )}
                
                <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <Lock className="h-3 w-3" /> We never share your email with anyone.
                </p>

                <button
                  type="submit"
                  disabled={emailLoading || googleLoading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-6 text-base font-semibold text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] disabled:opacity-60"
                  style={{ minHeight: 56 }}
                >
                  {emailLoading ? "Saving..." : "Save My Memory \u2192"}
                </button>

                {/* Divider */}
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold text-gray-400">
                    <span className="bg-[#fbf8f3] px-3">Or</span>
                  </div>
                </div>

                {googleError && (
                  <p className="text-red-500 text-sm mt-1 text-center">{googleError}</p>
                )}

                <div className="text-sm text-gray-600 text-center mt-2">
                  Already have an account?{" "}
                  <span
                    onClick={() => setActiveView("login")}
                    className="text-[#7c602e] font-semibold cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </div>

                <ul className="mx-auto mt-6 w-fit space-y-1.5 text-left text-sm text-gray-900">
                  {[
                    "Access your memory anytime",
                    "Never lose your generated video",
                    "Secure & private storage",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </form>
            )}

            {/* Login Form */}
            {activeView === "login" && (
              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                {loginError && (
                  <div className="text-red-500 text-sm font-medium mb-2 text-center">
                    {loginError}
                  </div>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-base shadow-sm outline-none transition-all focus:border-[#8B6A2B] focus:ring-2 focus:ring-[#8B6A2B]/20 placeholder:text-gray-400"
                  autoComplete="email"
                  required
                />
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-base shadow-sm outline-none transition-all focus:border-[#8B6A2B] focus:ring-2 focus:ring-[#8B6A2B]/20 placeholder:text-gray-400"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="text-right mt-1">
                  <span
                    onClick={() => setActiveView("forgotPassword")}
                    className="text-sm text-[#7c602e] font-semibold cursor-pointer hover:underline"
                  >
                    Forgot Password?
                  </span>
                </div>
                
                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-6 text-base font-semibold text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] disabled:opacity-60"
                  style={{ minHeight: 56 }}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                {/* Divider */}
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold text-gray-400">
                    <span className="bg-[#fbf8f3] px-3">Or</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={loading || googleLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 h-14 rounded-2xl font-semibold transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
                >
                  {googleLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                  )}
                  {googleLoading ? "Connecting..." : "Continue with Google"}
                </button>

                <div className="text-sm text-gray-600 text-center mt-4">
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
              <form onSubmit={handleForgotPassword} className="flex flex-col gap-3">
                {forgotError && (
                  <div className="text-red-500 text-sm font-medium mb-2 text-center">
                    {forgotError}
                  </div>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-base shadow-sm outline-none transition-all focus:border-[#8B6A2B] focus:ring-2 focus:ring-[#8B6A2B]/20 placeholder:text-gray-400"
                  autoComplete="email"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-6 text-base font-semibold text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] disabled:opacity-60"
                  style={{ minHeight: 56 }}
                >
                  {loading ? "Sending..." : "Send Reset OTP"}
                </button>
                <div className="text-sm text-gray-600 text-center mt-4">
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
              <form onSubmit={handleVerifyForgotOTP} className="flex flex-col gap-3">
                {otpError && (
                  <div className="text-red-500 text-sm font-medium mb-2 text-center">
                    {otpError}
                  </div>
                )}
                <p className="text-sm text-gray-600 mb-2 text-center">
                  We sent a reset code to <br/><strong>{otpEmail}</strong>
                </p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-xl tracking-widest text-center shadow-sm outline-none transition-all focus:border-[#8B6A2B] focus:ring-2 focus:ring-[#8B6A2B]/20 placeholder:text-gray-300"
                  maxLength="6"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-6 text-base font-semibold text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] disabled:opacity-60"
                  style={{ minHeight: 56 }}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <div className="text-sm text-gray-600 text-center mt-4">
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
              <form onSubmit={handleResetPassword} className="flex flex-col gap-3">
                {resetError && (
                  <div className="text-red-500 text-sm font-medium mb-2 text-center">
                    {resetError}
                  </div>
                )}
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-base shadow-sm outline-none transition-all focus:border-[#8B6A2B] focus:ring-2 focus:ring-[#8B6A2B]/20 placeholder:text-gray-400"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-base shadow-sm outline-none transition-all focus:border-[#8B6A2B] focus:ring-2 focus:ring-[#8B6A2B]/20 placeholder:text-gray-400"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-6 text-base font-semibold text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] disabled:opacity-60"
                  style={{ minHeight: 56 }}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
          </div>

          <p className="text-xs sm:text-[12px] text-gray-400 leading-relaxed font-medium mt-8">
            We respect your privacy. We will never sell, rent or share your email
            address. That's more than a{" "}
            <Link to="/privacy-policy" className="text-blue-600 underline">
              policy
            </Link>
            , it's our personal guarantee.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Step_onlyemail;
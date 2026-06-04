import React, { useState, useEffect, useRef } from "react";
import { User, Copy, LogOut, Edit2, Save, X, ShieldCheck, Mail, Key, Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../Redux/Profile";
import { clearAuthTokens } from "../../Redux/Config";
import { authService } from "../../Redux/Auth";
import { clear } from "localforage";
import { Toast } from "../../Shared/Toast";
import axios from "axios";
import { BASE_URL } from "../../Redux/Config";
import { googleLogin } from "../../Redux/Continuewithgoogle";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const ProfileSettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: profile, loading } = useSelector((state) => state.profile);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Profile updated successfully!");
  const [copied, setCopied] = useState(false);

  // Verification state
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyStep, setVerifyStep] = useState("idle"); // idle | otp | password
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const googlePopupRef = useRef(null);
  const googleIntervalRef = useRef(null);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        image: null,
      });
      setImagePreview(profile.image || null);
    }
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyReferral = () => {
    if (profile?.referral_link) {
      navigator.clipboard.writeText(profile.referral_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await dispatch(updateProfile(formData)).unwrap();

      // Fetch fresh profile data from server
      await dispatch(getProfile());

      setIsEditing(false);
      setToastMessage("Profile updated successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(error.message || "Failed to update profile");
    }
  };

  // --- Verification Handlers ---
  const handleSendOtp = async () => {
    setVerifyLoading(true);
    setVerifyError("");
    try {
      await axios.post(`${BASE_URL}accounts/api/resend-otp`, {
        email: profile?.email,
      });
      setVerifyStep("otp");
    } catch (error) {
      setVerifyError(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setVerifyLoading(true);
    setVerifyError("");
    try {
      await axios.patch(`${BASE_URL}accounts/api/verify-otp`, {
        email: profile?.email,
        otp: otp,
      });
      setVerifyStep("password");
      setOtp("");
    } catch (error) {
      setVerifyError(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setVerifyError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setVerifyError("Password must be at least 6 characters.");
      return;
    }
    setVerifyLoading(true);
    setVerifyError("");
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(
        `${BASE_URL}accounts/api/change-password`,
        { new_password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Verification complete
      setShowVerifyModal(false);
      setVerifyStep("idle");
      setNewPassword("");
      setConfirmPassword("");
      setToastMessage("Account verified and password set successfully!");
      setShowToast(true);
      // Refresh profile to update is_verified
      dispatch(getProfile());
    } catch (error) {
      setVerifyError(
        error.response?.data?.message || "Failed to set password. Please try again."
      );
    } finally {
      setVerifyLoading(false);
    }
  };

  const openVerifyModal = () => {
    setShowVerifyModal(true);
    setVerifyStep("idle");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setVerifyError("");
    setGoogleLoading(false);
  };

  // --- Google Auth Handler ---
  const GOOGLE_AUTH_URL =
    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:5174/dashboard/settings&prompt=consent&response_type=code&client_id=936293546348-fbrmd7f8tgl56hsv9o6togbap2doiou2.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline";

  const handleGoogleAuth = () => {
    setVerifyError("");
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
          // Try direct query param first
          const url = new URL(currentUrl);
          let code = url.searchParams.get("code");

          // If code is nested in the 'next' param (double-encoded)
          if (!code) {
            const next = url.searchParams.get("next");
            if (next) {
              const decoded = decodeURIComponent(next);
              const qIndex = decoded.indexOf("?");
              if (qIndex !== -1) {
                const nestedParams = new URLSearchParams(decoded.substring(qIndex + 1));
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
      const response = await dispatch(googleLogin({ code })).unwrap();

      // Save auth data to localStorage
      if (response.tokens) {
        localStorage.setItem("access_token", response.tokens.access);
        localStorage.setItem("refresh_token", response.tokens.refresh);
      }
      if (response.user) {
        localStorage.setItem("user_info", JSON.stringify(response.user));
      }
      localStorage.setItem("login_response", JSON.stringify(response));

      setShowVerifyModal(false);
      setVerifyStep("idle");
      setToastMessage("Account verified with Google successfully!");
      setShowToast(true);
      dispatch(getProfile());
    } catch (error) {
      setVerifyError(
        error?.message || "Google authentication failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  // Cleanup popup on unmount
  useEffect(() => {
    return () => {
      if (googleIntervalRef.current) clearInterval(googleIntervalRef.current);
      if (googlePopupRef.current && !googlePopupRef.current.closed) {
        googlePopupRef.current.close();
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      authService.logout();
      try {
        await clear();
      } catch (err) {
        console.error("Failed to clear localForage:", err);
      }
      localStorage.removeItem("user_info");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("login_response");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/");
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex-1 bg-[#fdfcfb] py-12 px-6 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#fdfcfb] py-12 px-6 flex flex-col items-center animate-in fade-in duration-500 overflow-y-auto">
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="w-full max-w-xl">
        {/* Header */}
        <h1 className="text-3xl font-serif font-bold text-gray-900 text-center mb-10">
          Settings
        </h1>

        {/* Profile Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-[#7c602e] flex items-center justify-center text-white mb-4 shadow-lg overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={48} fill="currentColor" />
            )}
          </div>
          <p className="text-sm font-medium text-gray-500 italic">
            {profile?.email || "No email"}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-bold text-gray-600 uppercase">
              Credit Balance:
            </span>
            <span className="text-lg font-bold text-[#7c602e]">
              {profile?.credit_balance || 0}
            </span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 mb-10">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
              First Name
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              disabled={!isEditing}
              className="w-full bg-white border border-gray-100 rounded-xl py-3.5 px-5 text-sm text-gray-900 font-medium outline-none shadow-sm disabled:text-gray-400"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
              Last Name
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              disabled={!isEditing}
              className="w-full bg-white border border-gray-100 rounded-xl py-3.5 px-5 text-sm text-gray-900 font-medium outline-none shadow-sm disabled:text-gray-400"
              placeholder="Enter last name"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
              Profile Image
            </label>
            {isEditing ? (
              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="w-full bg-white border border-gray-100 rounded-xl py-3.5 px-5 text-sm text-gray-500 font-medium shadow-sm cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formData.image ? formData.image.name : "Choose Image"}
                </label>
              </div>
            ) : (
              <div className="w-full bg-white border border-gray-100 rounded-xl py-3.5 px-5 text-sm text-gray-400 font-medium shadow-sm">
                {imagePreview ? "Image uploaded" : "No image"}
              </div>
            )}
          </div>

          {/* Edit/Save Buttons */}
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-[#7c602e] hover:bg-[#634d25] text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      first_name: profile?.first_name || "",
                      last_name: profile?.last_name || "",
                      image: null,
                    });
                    setImagePreview(profile?.image || null);
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
              </>
            )}
          </div>

          {/* Verify Account Button - shown when not verified */}
          {profile && profile.is_verified === false && (
            <button
              onClick={openVerifyModal}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              Verify Account
            </button>
          )}

          {/* Referral Code */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
              Referral Code
            </label>
            <div className="relative">
              <input
                readOnly
                value={profile?.reference_code || ""}
                className="w-full bg-white border border-gray-100 rounded-xl py-3.5 px-5 text-sm text-gray-400 font-medium outline-none shadow-sm"
              />
              <button
                onClick={handleCopyReferral}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7c602e] transition-colors"
              >
                {copied ? (
                  <span className="text-xs text-green-600 font-bold">
                    Copied!
                  </span>
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Referral Link */}
          {/* <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
              Referral Link
            </label>
            <div className="relative">
              <input
                readOnly
                value={profile?.referral_link || ""}
                className="w-full bg-white border border-gray-100 rounded-xl py-3.5 px-5 text-sm text-gray-400 font-medium outline-none shadow-sm"
              />
            </div>
          </div> */}

          {/* Credit History Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1 px-1">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
                Credit uses history
              </label>
              <button className="text-[11px] font-bold text-[#7c602e]/60 hover:text-[#7c602e]">
                View All
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden shadow-sm">
              <table className="w-full text-center text-[11px]">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-500 font-bold border-b border-gray-100">
                    <th className="py-4 font-bold uppercase tracking-wider">
                      Moment ID
                    </th>
                    <th className="py-4 font-bold uppercase tracking-wider">
                      Credit Use
                    </th>
                    <th className="py-4 font-bold uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {profile?.credit_usage_history &&
                  profile.credit_usage_history.length > 0 ? (
                    profile.credit_usage_history.map((row) => (
                      <tr
                        key={row.id}
                        className="text-gray-900 font-medium border-b border-gray-50 last:border-0"
                      >
                        <td className="py-5 underline decoration-[#7c602e]/30 underline-offset-4 text-gray-400 cursor-pointer">
                          {row.moment_id}
                        </td>
                        <td className="py-5 text-gray-400">
                          {row.used_credits}
                        </td>
                        <td className="py-5 text-gray-400">
                          {formatDate(row.used_at)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-8 text-gray-400 text-sm">
                        No credit usage history yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Logout Footer */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-bold text-red-500/80 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowVerifyModal(false)}
          />

          <div className="relative bg-white rounded-2xl p-8 mx-4 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            {/* Step: Send OTP */}
            {verifyStep === "idle" && (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                  <Mail size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Verify Your Account
                </h3>
                <p className="text-gray-500 text-sm mb-2 leading-relaxed">
                  We will send a verification code to:
                </p>
                <p className="text-gray-900 font-semibold text-sm mb-6">
                  {profile?.email}
                </p>

                {verifyError && (
                  <p className="text-red-500 text-sm mb-4">{verifyError}</p>
                )}

                <button
                  onClick={handleSendOtp}
                  disabled={verifyLoading || googleLoading}
                  className="w-full px-4 py-3 bg-[#7c602e] hover:bg-[#634d25] text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-all disabled:opacity-50"
                >
                  {verifyLoading ? "Sending..." : "Send Verification Code"}
                </button>

                {/* Divider */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold text-gray-400">
                    <span className="bg-white px-3">Or</span>
                  </div>
                </div>

                {/* Continue with Google */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={verifyLoading || googleLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
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

                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="w-full mt-3 px-4 py-2.5 text-gray-500 hover:text-gray-700 text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Step: Enter OTP */}
            {verifyStep === "otp" && (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                  <Key size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Enter Verification Code
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Enter the code sent to <span className="font-semibold text-gray-700">{profile?.email}</span>
                </p>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-5 text-sm text-gray-900 font-medium outline-none shadow-sm focus:ring-2 focus:ring-[#7c602e]/20 text-center tracking-[0.3em] text-lg mb-4"
                  maxLength={6}
                />

                {verifyError && (
                  <p className="text-red-500 text-sm mb-4">{verifyError}</p>
                )}

                <button
                  onClick={handleVerifyOtp}
                  disabled={verifyLoading || !otp}
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-all disabled:opacity-50"
                >
                  {verifyLoading ? "Verifying..." : "Verify Code"}
                </button>
                <button
                  onClick={() => {
                    setVerifyStep("idle");
                    setVerifyError("");
                  }}
                  className="w-full mt-3 px-4 py-2.5 text-gray-500 hover:text-gray-700 text-sm font-semibold transition-colors"
                >
                  Resend Code
                </button>
              </div>
            )}

            {/* Step: Set Password */}
            {verifyStep === "password" && (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-5">
                  <Lock size={32} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Set Your Password
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Create a secure password for your account.
                </p>

                <div className="space-y-4 mb-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-5 pr-12 text-sm text-gray-900 font-medium outline-none shadow-sm focus:ring-2 focus:ring-[#7c602e]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-5 pr-12 text-sm text-gray-900 font-medium outline-none shadow-sm focus:ring-2 focus:ring-[#7c602e]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {verifyError && (
                  <p className="text-red-500 text-sm mb-4">{verifyError}</p>
                )}

                <button
                  onClick={handleSetPassword}
                  disabled={verifyLoading || !newPassword || !confirmPassword}
                  className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-all disabled:opacity-50"
                >
                  {verifyLoading ? "Setting Password..." : "Set Password"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

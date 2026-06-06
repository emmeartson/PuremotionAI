import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Lock, Eye, EyeOff, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  clearChangePasswordState,
} from "../../Redux/ChangePassword";

export const ChangePasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.changePassword
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setNewPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
      setLocalError("");
      dispatch(clearChangePasswordState());
    }
  }, [isOpen, dispatch]);

  // Close modal on success after a short delay
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose(true); // pass true to indicate success
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!newPassword.trim()) {
      setLocalError("Password is required.");
      return;
    }

    if (newPassword.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    dispatch(changePassword({ new_password: newPassword }));
  };

  if (!isOpen) return null;

  const displayError =
    localError ||
    (error?.message || error?.detail || (typeof error === "string" ? error : ""));

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => !loading && onClose(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-8 mx-4 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={() => !loading && onClose(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Success State */}
        {success ? (
          <div className="text-center py-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Password Changed!
            </h3>
            <p className="text-gray-500 text-sm">
              Your password has been updated successfully.
            </p>
          </div>
        ) : (
          /* Form State */
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-5">
              <Lock size={32} className="text-[#7c602e]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Change Password
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Enter a new secure password for your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-5 pr-12 text-sm text-gray-900 font-medium outline-none shadow-sm focus:ring-2 focus:ring-[#7c602e]/20"
                  disabled={loading}
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
                  placeholder="Confirm New Password"
                  className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-5 pr-12 text-sm text-gray-900 font-medium outline-none shadow-sm focus:ring-2 focus:ring-[#7c602e]/20"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {displayError && (
                <p className="text-red-500 text-sm">{displayError}</p>
              )}

              <button
                type="submit"
                disabled={loading || !newPassword || !confirmPassword}
                className="w-full px-4 py-3 bg-[#7c602e] hover:bg-[#634d25] text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? "Changing Password..." : "Change Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ChangePasswordModal;

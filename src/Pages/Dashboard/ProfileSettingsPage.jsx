import React, { useState, useEffect } from "react";
import { User, Copy, LogOut, Edit2, Save, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../Redux/Profile";
import { clearAuthTokens } from "../../Redux/Config";
import { authService } from "../../Redux/Auth";
import { clear } from "localforage";
import { Toast } from "../../Shared/Toast";

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
  const [copied, setCopied] = useState(false);

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
      setShowToast(true);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(error.message || "Failed to update profile");
    }
  };

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
          message="Profile updated successfully!"
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
    </div>
  );
};

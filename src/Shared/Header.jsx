import React, { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import Button from "./Button";
import { FaArrowRightLong } from "react-icons/fa6";
import AuthModal from "../Pages/Authentication/AuthModal";
import { useNavigate } from "react-router-dom";
import { authService } from "../Redux/Auth";
import { clear } from "localforage";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated on component mount
    if (authService.isAuthenticated()) {
      const userInfo = authService.getCurrentUser();
      setUser(userInfo);
    }
  }, []);

  const handleLogout = async () => {
    try {
      authService.logout();
      setUser(null);
      setIsDropdownOpen(false);
      try {
        await clear(); // Clear localForage
      } catch (err) {
        console.error("Failed to clear localForage:", err);
      }
      localStorage.removeItem("user_info"); // Clear user info from localStorage
      localStorage.removeItem("access_token"); // Clear access token from localStorage
      localStorage.removeItem("refresh_token"); // Clear refresh token from localStorage
      localStorage.removeItem("login_response"); // Clear persisted Redux state
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/");
    }
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    if (user.full_name && user.full_name !== "None None") {
      return user.full_name;
    }
    return user.email?.split("@")[0] || "User";
  };
  return (
    <>
      {/* Top Bar Responsive */}
      <div className="bg-[#634910] text-white text-sm topbar-marquee-wrapper">
        <div className="max-w-2xl mx-auto flex sm:flex-row items-center justify-between px-2 sm:px-4 py-0.5 gap-6 sm:gap-0 topbar-marquee">
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <span>3 Easy Steps</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-center mt-1 sm:mt-0">
            <div className="flex items-center text-white space-x-0.5">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
            </div>
            <span className="hidden xs:inline">
              Thousands of Happy Customers
            </span>
            <span className="inline xs:hidden text-xs">
              Thousands of Happy Customers
            </span>
          </div>

          <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-1 sm:mt-0">
            <span className="hidden xs:inline">Encrypted &amp; Secure</span>
            <span className="inline xs:hidden text-xs">
              Encrypted &amp; Secure
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Responsive */}
      <header className="bg-white border-b border-amber-900/20 shadow-sm">
        <div className="max-w-9xl mx-2 sm:mx-8 md:mx-16 px-2 sm:px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto justify-center sm:justify-start">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="PureMotion logo"
                  className="h-7 sm:h-8 w-auto"
                />
              </Link>
            </div>
            {/* <nav className="hidden md:flex gap-4 sm:gap-6 text-black font-medium">
              <a href="#features" className="hover:text-gray-900">
                Features
              </a>
              <a href="#how" className="hover:text-gray-900">
                How It Works
              </a>
              <a href="#faq" className="hover:text-gray-900">
                FAQ
              </a>
            </nav> */}
          </div>
          {/* Mobile Nav */}
          {/* <nav className="flex md:hidden w-full justify-center mt-2">
            <a
              href="#features"
              className="mx-2 text-black font-medium text-sm hover:text-gray-900"
            >
              Features
            </a>
            <a
              href="#how"
              className="mx-2 text-black font-medium text-sm hover:text-gray-900"
            >
              How It Works
            </a>
            <a
              href="#faq"
              className="mx-2 text-black font-medium text-sm hover:text-gray-900"
            >
              FAQ
            </a>
          </nav> */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c602e] hover:bg-[#634910] text-white font-medium transition-colors"
                >
                  <FaUser className="text-sm" />
                  <span className="hidden sm:inline">
                    {getUserDisplayName()}
                  </span>
                  <span className="sm:hidden text-xs truncate max-w-[90px] inline-block">
                    {String(getUserDisplayName()).split(" ")[0]}
                  </span>
                  <FaChevronDown
                    className={`text-xs transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    {/* Backdrop to close dropdown */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate("/dashboard");
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                      >
                        <MdDashboard className="text-[#7c602e]" />
                        <span>Dashboard</span>
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600 transition-colors"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Button
                className="w-full sm:w-auto"
                onClick={() => navigate("/step-login")}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </header>
    </>
  );
}

export default Header;

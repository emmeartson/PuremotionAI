import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Landmark,
  Gift,
  MessageSquare,
  ChevronRight,
  User,
  MoreVertical,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { clear } from "localforage";
import { authService } from "../../Redux/Auth";

const navItems = [
  {
    icon: <Home size={20} />,
    label: "Home",
    path: "/dashboard",
  },
  {
    icon: <Landmark size={20} />,
    label: "Get More Credits",
    path: "/dashboard/get-Credit",
  },
];

export const Sidebar = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Used to check the current URL
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    // Fetch user data from localStorage
    const userInfo = localStorage.getItem("user_info");
    if (userInfo) {
      try {
        const parsedData = JSON.parse(userInfo);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user_info:", error);
      }
    }
  }, []);

  return (
    <aside
      className={`${className} bg-[#fdfcfb] p-4 sm:p-5 lg:p-6 flex flex-col justify-between border-r border-gray-100`}
    >
      <div className="space-y-6 lg:space-y-8">
        {/* Navigation Links */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            // Check if this item is currently active based on the URL
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? "text-[#7c602e] bg-[#f2ede4]/50" // Added a subtle background for active state
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                {/* Clone icon to apply active color if necessary */}
                {React.cloneElement(item.icon, {
                  className: isActive ? "text-[#7c602e]" : "text-gray-400",
                })}
                <span className="text-sm lg:text-[15px]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Promo Cards */}
        <div className="space-y-4">
          {/* Invite Card */}
          <div
            onClick={() => navigate("/dashboard/invite")}
            className="bg-gradient-to-br from-[#7c602e] to-[#b4925a] p-5 rounded-[1.5rem] text-white relative cursor-pointer group shadow-lg shadow-[#7c602e]/10"
          >
            <div className="flex justify-between items-start">
              <div className="bg-white/20 p-2 rounded-lg">
                <Gift size={24} />
              </div>
              <ChevronRight
                size={20}
                className="text-white/60 group-hover:translate-x-1 transition-transform"
              />
            </div>
            <div className="mt-4">
              <p className="font-bold text-[15px]">Invite a friend</p>
              <p className="text-[11px] text-white/80 leading-tight mt-1">
                Get 10 Credits for each
                <br /> invitation
              </p>
            </div>
          </div>

          {/* Survey Card */}
          <div
            onClick={() => navigate("/dashboard/survey")}
            className="border border-gray-200 p-5 rounded-[1.5rem] flex items-center justify-between group cursor-pointer hover:border-[#7c602e]/30 transition-colors bg-white"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <MessageSquare size={20} className="text-gray-600" />
              </div>
              <p className="text-[12px]  text-gray-700 leading-tight">
                Get free credits by
                <br /> completing survey
              </p>
            </div>
            <ChevronRight
              size={18}
              className="text-gray-300 group-hover:text-[#7c602e] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Profile & Footer */}
      <div className="space-y-4">
        <div className="relative">
          <div
            onClick={() => navigate("/dashboard/settings")}
            className="border border-gray-100 rounded-2xl p-3 flex items-center justify-between bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f2ede4] flex items-center justify-center text-[#7c602e] overflow-hidden">
                {userData?.image ? (
                  <img
                    src={userData.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} fill="currentColor" />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-[13px] font-bold truncate">
                  {userData?.full_name || "Profile"}
                </p>
                <p className="text-[11px] text-gray-400 truncate">
                  {userData?.email || "Loading..."}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              aria-label="open profile menu"
              className="p-1 rounded-full"
            >
              <MoreVertical size={18} className="text-gray-400 flex-shrink-0" />
            </button>
          </div>

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-md shadow-lg z-50"
            >
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  try {
                    await clear(); // Clear localForage
                  } catch (err) {
                    console.error("Failed to clear localForage:", err);
                  }
                  authService.logout();
                  localStorage.removeItem("user_info"); // Clear user info from localStorage
                  localStorage.removeItem("access_token"); // Clear access token from localStorage
                  localStorage.removeItem("refresh_token"); // Clear refresh token from localStorage
                  localStorage.removeItem("login_response"); // Clear persisted Redux state
                  navigate("/");
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <p
          className="text-[10px] text-gray-400 px-2 font-medium cursor-pointer"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </p>
        <p
          className="text-[10px] text-gray-400 px-2 font-medium cursor-pointer"
          onClick={() => navigate("/terms-of-service")}
        >
          Terms of Service
        </p>
        <p
          className="text-[10px] text-gray-400 px-2 font-medium cursor-pointer"
          onClick={() => navigate("/privacy-policy")}
        >
          Privacy Policy
        </p>
      </div>
    </aside>
  );
};

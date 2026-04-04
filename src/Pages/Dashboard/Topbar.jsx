import React, { useState, useEffect } from "react";
import { Globe, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/Profile";
import { Link } from "react-router-dom";
import {
  fetchNotifications,
  connectNotificationSocket,
  disconnectNotificationSocket,
} from "../../Redux/Notification";
import NotificationModal from "./NotificationModal";

export const Topbar = () => {
  const [openNotif, setOpenNotif] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profile } = useSelector((state) => state.profile);
  const { unreadCount, socketConnected } = useSelector(
    (state) => state.notifications,
  );

  useEffect(() => {
    // Fetch profile data when component mounts
    dispatch(getProfile());

    // Fetch notifications
    dispatch(fetchNotifications());

    // Connect to WebSocket for real-time notifications
    dispatch(connectNotificationSocket());

    // Cleanup on unmount
    return () => {
      disconnectNotificationSocket();
    };
  }, [dispatch]);

  return (
    <header className="fixed top-0 left-0 right-0 h-[64px] sm:h-[72px] bg-white border-b border-primary flex items-center justify-between px-4 sm:px-6 md:px-8 z-50">
      <Link to="/">
        <div className="w-auto lg:w-72">
          {" "}
          {/* Align logo with sidebar width */}
          <span className="text-lg sm:text-xl font-serif font-bold text-[#7c602e] tracking-tight">
            PureMotion
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-3 sm:gap-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenNotif((v) => !v);
          }}
          className="text-gray-700 hover:text-[#7c602e] transition-colors relative"
          aria-label="Open notifications"
        >
          <Bell size={18} className="sm:w-5 sm:h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Credit Badge (clickable) */}
        <button
          onClick={() => navigate("/dashboard/get-Credit")}
          className="bg-[#f2ede4] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 border border-[#7c602e]/10 hover:shadow-sm"
          aria-label="Get Credit"
        >
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            Credit:
          </span>
          <span className="text-xs sm:text-sm text-[#7c602e] font-bold">
            {profile?.credit_balance || 0}
          </span>
        </button>
      </div>

      {openNotif && (
        <NotificationModal
          anchor="top-right"
          onClose={() => setOpenNotif(false)}
        />
      )}
    </header>
  );
};

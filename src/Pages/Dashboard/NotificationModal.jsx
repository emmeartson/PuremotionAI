import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  markAsRead,
  deleteNotification,
  fetchNotifications,
} from "../../Redux/Notification";
import { Bell, Trash2 } from "lucide-react";
import Button from "../../Shared/Button";

function NotificationItem({ notification, onClick, onDelete }) {
  const timeAgo = (dateString) => {
    if (!dateString) return null;

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn("Invalid date string:", dateString, "for notification");
      return null;
    }

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  return (
    <div
      className={`group relative cursor-pointer transition-colors ${
        !notification.is_read
          ? "bg-[#f7efe2] rounded-lg p-4"
          : "py-3 hover:bg-gray-50"
      }`}
    >
      <div onClick={onClick} className="flex items-start gap-3 pr-8">
        <div className="bg-[#7c602e]/10 p-2 rounded-lg flex-shrink-0">
          <Bell size={20} className="text-[#7c602e]" />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm ${!notification.is_read ? "font-semibold text-[#7c602e]" : "text-gray-700"}`}
          >
            {notification.message}
          </p>
          {timeAgo(
            notification.created_at ||
              notification.timestamp ||
              notification.date,
          ) && (
            <p className="text-xs text-gray-500 mt-1">
              {timeAgo(
                notification.created_at ||
                  notification.timestamp ||
                  notification.date,
              )}
            </p>
          )}
        </div>
        {!notification.is_read && (
          <div className="w-2 h-2 bg-[#7c602e] rounded-full flex-shrink-0 mt-1"></div>
        )}
      </div>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

function NotificationModal({ onClose, anchor }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(
    (state) => state.notifications,
  );

  // Fetch fresh notifications each time the modal mounts (i.e., each open)
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose && onClose();
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [onClose]);

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      dispatch(markAsRead(notification.id));
    }
  };

  const handleDeleteNotification = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  const handleMarkAllRead = () => {
    notifications
      .filter((n) => !n.is_read)
      .forEach((n) => dispatch(markAsRead(n.id)));
  };

  const unreadNotifications = notifications.filter((n) => !n.is_read);

  if (anchor === "top-right") {
    return (
      <div className="fixed z-50 right-2 sm:right-6" style={{ top: 72 }}>
        <div
          ref={ref}
          className="bg-white rounded-xl w-[calc(100vw-16px)] sm:w-[420px] max-w-[420px] max-h-[70vh] sm:max-h-[500px] flex flex-col border border-gray-200 shadow-lg"
        >
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold">
              Notifications{" "}
              {unreadNotifications.length > 0 && (
                <span className="text-sm font-normal text-gray-500">
                  ({unreadNotifications.length} new)
                </span>
              )}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {loading && notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell size={40} className="mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500 text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    onClick={() => handleNotificationClick(notification)}
                    onDelete={handleDeleteNotification}
                  />
                  {index < notifications.length - 1 && (
                    <div className="border-t border-gray-100" />
                  )}
                </React.Fragment>
              ))
            )}
          </div>

          {unreadNotifications.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              {/* <Button
                onClick={handleMarkAllRead}
                variant="primary"
                size="md"
                className="w-full"
              >
                Mark all as read
              </Button> */}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-0">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        ref={ref}
        className="relative bg-white rounded-xl w-full max-w-[520px] max-h-[82vh] sm:max-h-[600px] flex flex-col border border-gray-200 shadow-lg z-10"
      >
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-xl sm:text-2xl font-bold">
            Notifications{" "}
            {unreadNotifications.length > 0 && (
              <span className="text-sm sm:text-lg font-normal text-gray-500">
                ({unreadNotifications.length} new)
              </span>
            )}
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
          {loading && notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <NotificationItem
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                  onDelete={handleDeleteNotification}
                />
                {index < notifications.length - 1 && (
                  <div className="border-t border-gray-100" />
                )}
              </React.Fragment>
            ))
          )}
        </div>

        {unreadNotifications.length > 0 && (
          <div className="p-6 border-t border-gray-100">
            {/* <Button
              onClick={handleMarkAllRead}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Mark all as read
            </Button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationModal;

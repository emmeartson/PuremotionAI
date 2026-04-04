import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./Config";

// WebSocket connection instance
let notificationSocket = null;
let reconnectTimeout = null;
let intentionalClose = false;

// Fetch all notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return rejectWithValue({
          message: "No authentication token found.",
          code: "no_token",
        });
      }

      const response = await axios.get(`${BASE_URL}core/api/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to fetch notifications" });
    }
  },
);

// Mark notification as read
export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return rejectWithValue({
          message: "No authentication token found.",
          code: "no_token",
        });
      }

      await axios.patch(
        `${BASE_URL}core/api/notifications/${notificationId}/`,
        { is_read: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return notificationId;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "Failed to mark notification as read",
      });
    }
  },
);

// Delete notification
export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (notificationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return rejectWithValue({
          message: "No authentication token found.",
          code: "no_token",
        });
      }

      await axios.delete(
        `${BASE_URL}core/api/notifications/${notificationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return notificationId;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "Failed to delete notification",
      });
    }
  },
);

// WebSocket connection management
export const connectNotificationSocket = () => (dispatch) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.error("No access token found for WebSocket connection");
    return;
  }

  // Clear any pending reconnect timer
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  // Close existing connection if any (intentionally)
  if (notificationSocket) {
    console.log("Closing existing notification WebSocket");
    intentionalClose = true;
    notificationSocket.onclose = null; // Remove event handler to prevent reconnect
    notificationSocket.close();
    notificationSocket = null;
    intentionalClose = false;
  }

  // Create WebSocket URL - ensure proper format
  let wsBaseUrl = BASE_URL.replace("http://", "ws://").replace(
    "https://",
    "wss://",
  );
  // Remove trailing slash if present
  if (wsBaseUrl.endsWith("/")) {
    wsBaseUrl = wsBaseUrl.slice(0, -1);
  }
  const wsUrl = `${wsBaseUrl}/ws/notifications/?token=${token}`;

  console.log("Connecting to notification WebSocket:", wsUrl);

  try {
    notificationSocket = new WebSocket(wsUrl);

    notificationSocket.onopen = () => {
      console.log("Notification WebSocket connected successfully");
      dispatch(setSocketConnected(true));
      // Clear any error states
      dispatch(clearNotificationsError());
    };

    notificationSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received notification:", data);

        // Handle different notification message structures
        if (
          data.type === "notification" &&
          data.data &&
          data.data.notification
        ) {
          // New nested structure: { type: "notification", data: { notification: {...} } }
          dispatch(addNotification(data.data.notification));
        } else if (data.type === "send_notification" && data.notification) {
          // Alternative structure: { type: "send_notification", notification: {...} }
          dispatch(addNotification(data.notification));
        } else if (data.message && data.id !== undefined) {
          // Direct notification object
          dispatch(addNotification(data));
        } else {
          console.warn("Unknown notification structure:", data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    notificationSocket.onerror = (error) => {
      console.error("Notification WebSocket error:", error);
      dispatch(setSocketConnected(false));
    };

    notificationSocket.onclose = (event) => {
      console.log(
        "Notification WebSocket disconnected",
        event.code,
        event.reason,
      );
      dispatch(setSocketConnected(false));
      notificationSocket = null;

      // Only reconnect if the close was not intentional and not due to auth issues
      if (!intentionalClose && event.code !== 1000 && event.code !== 1006) {
        console.log("Scheduling reconnect in 5 seconds...");
        reconnectTimeout = setTimeout(() => {
          console.log("Attempting to reconnect notification WebSocket...");
          reconnectTimeout = null;
          dispatch(connectNotificationSocket());
        }, 5000);
      }
    };
  } catch (error) {
    console.error("Failed to create notification WebSocket:", error);
    dispatch(setSocketConnected(false));
  }
};

export const disconnectNotificationSocket = () => {
  // Clear any pending reconnect timer
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  if (notificationSocket) {
    intentionalClose = true;
    notificationSocket.close();
    notificationSocket = null;
  }
};

// Notifications slice
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
    socketConnected: false,
    unreadCount: 0,
  },
  reducers: {
    addNotification: (state, action) => {
      // Add new notification to the beginning
      state.notifications.unshift(action.payload);
      // Update unread count
      if (!action.payload.is_read) {
        state.unreadCount += 1;
      }
    },
    setSocketConnected: (state, action) => {
      state.socketConnected = action.payload;
    },
    clearNotificationsError: (state) => {
      state.error = null;
    },
    updateUnreadCount: (state) => {
      state.unreadCount = state.notifications.filter((n) => !n.is_read).length;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.is_read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch notifications";
      })
      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (n) => n.id === action.payload,
        );
        if (notification && !notification.is_read) {
          notification.is_read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      // Delete notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const deletedNotification = state.notifications.find(
          (n) => n.id === action.payload,
        );
        if (deletedNotification && !deletedNotification.is_read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications = state.notifications.filter(
          (n) => n.id !== action.payload,
        );
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Failed to delete notification";
      });
  },
});

export const {
  addNotification,
  setSocketConnected,
  clearNotificationsError,
  updateUnreadCount,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;

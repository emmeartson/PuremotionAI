import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './Profile';
import videoReducer from './VideoUpload';
import videosReducer from './Videos';
import notificationsReducer from './Notification';
import contactReducer from './Contact';
import onlyemailReducer from './OnlyemailCreateacc';
import googleAuthReducer from './Continuewithgoogle';
import changePasswordReducer from './ChangePassword';

// Create the Redux store
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    video: videoReducer,
    videos: videosReducer,
    notifications: notificationsReducer,
    contact: contactReducer,
    onlyemail: onlyemailReducer,
    googleAuth: googleAuthReducer,
    changePassword: changePasswordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

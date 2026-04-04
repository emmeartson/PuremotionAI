import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './Profile';
import videoReducer from './VideoUpload';
import videosReducer from './Videos';
import notificationsReducer from './Notification';
import contactReducer from './Contact';

// Create the Redux store
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    video: videoReducer,
    videos: videosReducer,
    notifications: notificationsReducer,
    contact: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

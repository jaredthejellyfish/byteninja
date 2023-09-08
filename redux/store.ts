import { configureStore } from '@reduxjs/toolkit';

import currentCourseReducer from './features/currentCourseSlice';
import sidebarStatusReducer from './features/sidebarStatusSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    authReducer,
    currentCourseReducer,
    sidebarStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

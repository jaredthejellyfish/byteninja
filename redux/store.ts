import { configureStore } from '@reduxjs/toolkit';

import currentCourseReducer from './features/currentCourseSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    authReducer,
    currentCourseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

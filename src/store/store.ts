import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // مسیر صحیح به فایل authSlice
import uiReducer from './slices/uiSlice'; // مسیر صحیح به فایل uiSlice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

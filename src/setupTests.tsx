import '@testing-library/jest-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import authReducer from './store/slices/authSlice';
import uiReducer from './store/slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});

interface ProviderProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<ProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const renderWithProviders = (ui: React.ReactElement) =>
  render(ui, { wrapper: AllTheProviders });

export * from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import authReducer from './store/slices/authSlice';
import uiReducer from './store/slices/uiSlice';
import { vi } from 'vitest';

declare global {
  const describe: typeof vi.describe;
  const it: typeof vi.it;
  const expect: typeof vi.expect;
  const beforeEach: typeof vi.beforeEach;
  const afterEach: typeof vi.afterEach;

  interface Window {
    console: Console;
    localStorage: Storage;
    location: Location;
  }
}

window.describe = vi.describe;
window.it = vi.it;
window.expect = vi.expect;
window.beforeEach = vi.beforeEach;
window.afterEach = vi.afterEach;

interface CustomMatchers<R = void> {
  toBeInTheDocument(): R;
}

declare module 'vitest' {
  interface Assertion extends CustomMatchers {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

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
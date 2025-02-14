import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

// تعریف interface برای state
interface AuthState {
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  currentTime: string;
}

interface RootState {
  auth: AuthState;
  ui: UIState;
}

const mockInitialState: RootState = {
  auth: {
    user: {
      id: '1',
      username: 'Mojim47',
      email: 'test@example.com'
    },
    token: 'test-token',
    isAuthenticated: true,
    loading: false,
    error: null
  },
  ui: {
    darkMode: false,
    sidebarOpen: true,
    currentTime: '2025-02-13 18:24:40'
  }
};

afterEach(() => {
  cleanup();
});

function setupStore(preloadedState: Partial<RootState> = {}) {
  return configureStore({
    reducer: {
      auth: (state = mockInitialState.auth) => state,
      ui: (state = mockInitialState.ui) => state
    },
    preloadedState: {
      ...mockInitialState,
      ...preloadedState
    }
  });
}

// تعریف تایپ برای props کامپوننت Wrapper
interface WrapperProps {
  children: React.ReactNode;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    route = '/',
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: WrapperProps) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}

export * from '@testing-library/react';
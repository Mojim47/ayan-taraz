import '@testing-library/jest-dom';
import { afterEach, expect, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// افزودن matcher های Testing Library به Vitest
expect.extend(matchers);

// تنظیمات RTL برای Emotion
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// تعریف interface های State
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

// ایجاد تم با پالت مشکی-طلایی
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700',
      dark: '#B8860B',
      light: '#FFE44D'
    },
    secondary: {
      main: '#121212',
      dark: '#000000',
      light: '#1E1E1E'
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFD700',
      secondary: '#B8860B'
    }
  },
  direction: 'rtl',
  typography: {
    fontFamily: 'IRANSans, Vazirmatn, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#FFD700 #1E1E1E",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#1E1E1E",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#FFD700",
            minHeight: 24,
          },
        },
      },
    },
  },
});

// تنظیم state اولیه با زمان به‌روز
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
    darkMode: true,
    sidebarOpen: true,
    currentTime: '2025-02-15 10:19:01'
  }
};

// پاکسازی بعد از هر تست
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// تنظیم store برای تست‌ها
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

// تعریف props برای کامپوننت Wrapper
interface WrapperProps {
  children: React.ReactNode;
}

// تنظیمات آینده React Router
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

// تابع render با provider ها
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
    const router = createMemoryRouter(
      [
        {
          path: '/*',
          element: children
        }
      ],
      {
        initialEntries: [route],
        ...routerConfig
      }
    );

    return (
      <CacheProvider value={cacheRtl}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </CacheProvider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}

// تنظیم matchMedia برای تست‌های Material-UI
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

export * from '@testing-library/react';
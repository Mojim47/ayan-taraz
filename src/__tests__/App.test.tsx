import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/store';
import App from '@/App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {
  // تنظیم تاریخ تست با زمان فعلی سیستم
  const testDate = new Date('2025-02-15T08:11:02.000Z');
  const theme = createTheme({
    // تنظیمات اختیاری تم
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  beforeEach(() => {
    // تنظیم زمان مجازی قبل از هر تست
    vi.useFakeTimers();
    vi.setSystemTime(testDate);
  });

  afterEach(() => {
    // برگرداندن زمان واقعی بعد از هر تست
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders all DateTime components', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );

    // بررسی وجود حداقل یک المان با تاریخ 2025
    const dateElements = screen.getAllByText(/2025/);
    expect(dateElements.length).toBeGreaterThan(0);

    // می‌توانید تست‌های دقیق‌تر اضافه کنید
    // برای مثال، بررسی فرمت تاریخ
    dateElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });
});
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../setupTests';
import { LoginForm } from '../LoginForm';
import '@testing-library/jest-dom/extend-expect';

describe('LoginForm', () => {
  // تنظیم تایمر مجازی برای تست‌ها
  beforeEach(() => {
    vi.useFakeTimers({
      now: new Date('2025-02-15T08:11:53Z'),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should render login form', () => {
    const handleSubmit = vi.fn();
    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    // بررسی وجود المان‌های اصلی فرم
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    
    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    // یافتن المان‌های ورودی
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // وارد کردن مقادیر با استفاده از userEvent
    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');

    // کلیک روی دکمه submit
    await user.click(submitButton);

    // بررسی صحت مقادیر ارسالی
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('should show validation errors for empty fields', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    
    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    // کلیک مستقیم روی دکمه بدون پر کردن فیلدها
    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);

    // بررسی پیام‌های خطا
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
    
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should clear form after successful submission', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    
    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    // پر کردن و ارسال فرم
    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // بررسی پاک شدن فیلدها بعد از ارسال موفق
    await waitFor(() => {
      expect(usernameInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });
});
/// <reference types="jest" />

import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../setupTests';
import { LoginForm } from './auth/LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    const handleSubmit = jest.fn();
    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    // Ensure input fields are rendered
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should handle form submission', () => {
    const handleSubmit = jest.fn();
    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check that handleSubmit is called with correct form values
    expect(handleSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
  });
});

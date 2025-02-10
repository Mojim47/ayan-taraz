import React from 'react';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../App';
import { renderWithProviders } from '../setupTests';

describe('App', () => {
  test('renders main layout', () => {
    renderWithProviders(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
    // برای مثال می‌توانید یک assertion اضافه کنید:
    // expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});

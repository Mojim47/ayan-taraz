import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../App';
import { renderWithProviders } from '../setupTests';

describe('App', () => {
  it('renders main layout', () => {
    renderWithProviders(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
    // Add your assertions here
  });
});
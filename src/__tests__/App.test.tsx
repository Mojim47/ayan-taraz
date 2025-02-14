import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import App from '@/App';

describe('App', () => {
  const testDate = new Date('2025-02-13T18:09:33.000Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(testDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders all DateTime components', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const dateElements = screen.getAllByText(/2025/);
    expect(dateElements.length).toBeGreaterThan(0);
  });
});
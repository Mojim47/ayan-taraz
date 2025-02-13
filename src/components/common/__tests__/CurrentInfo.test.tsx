import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentInfo from '../CurrentInfo';

describe('CurrentInfo', () => {
  const username = 'Mojim47';

  beforeEach(() => {
    // Mock the Date object
    jest.useFakeTimers();
    const mockDate = new Date('2025-02-13T16:36:34.000Z');
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders current date time and username', () => {
    render(<CurrentInfo username={username} />);
    
    expect(screen.getByText(/Current Date and Time/)).toBeInTheDocument();
    expect(screen.getByText(/2025-02-13 16:36:34/)).toBeInTheDocument();
    expect(screen.getByText(/Current User's Login: Mojim47/)).toBeInTheDocument();
  });

  it('updates time every second', () => {
    render(<CurrentInfo username={username} />);
    
    expect(screen.getByText(/16:36:34/)).toBeInTheDocument();
    
    // Advance timer by 1 second
    jest.advanceTimersByTime(1000);
    
    expect(screen.getByText(/16:36:35/)).toBeInTheDocument();
  });
});
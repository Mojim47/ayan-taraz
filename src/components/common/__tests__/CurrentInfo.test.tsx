import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CurrentInfo from '../CurrentInfo';

describe('CurrentInfo', () => {
  const username = 'Mojim47';

  it('renders with correct date and username', () => {
    render(<CurrentInfo username={username} />);
    
    const expectedDateText = 'Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-02-15 06:28:04';
    expect(screen.getByText(expectedDateText)).toBeInTheDocument();
    
    const expectedUserText = `Current User's Login: ${username}`;
    expect(screen.getByText(expectedUserText)).toBeInTheDocument();
  });
});
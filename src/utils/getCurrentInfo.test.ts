import { describe, it, expect } from 'vitest';
import { getCurrentInfo } from './getCurrentInfo';

describe('getCurrentInfo', () => {
  it('returns exact expected format', () => {
    const result = getCurrentInfo('Mojim47');
    expect(result).toBe('Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-02-13 17:15:10\nCurrent User\'s Login: Mojim47\n');
  });
});
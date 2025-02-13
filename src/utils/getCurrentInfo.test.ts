import { describe, it, expect } from 'vitest';
import { getCurrentInfo } from './getCurrentInfo';

describe('getCurrentInfo', () => {
  it('returns exact expected format', () => {
    const result = getCurrentInfo('Mojim47');
    const expected = 'Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-02-13 17:26:14\nCurrent User\'s Login: Mojim47\n';
    expect(result).toBe(expected);
  });
});
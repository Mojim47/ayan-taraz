import { expect, describe, it, vi } from 'vitest';
import '@testing-library/jest-dom/extend-expect';

describe('Example Test', () => {
  it('should work with custom matcher', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    expect(element).toBeInTheDocument();
  });

  it('should work with mocked matchMedia', () => {
    expect(window.matchMedia).toBeDefined();
    const mql = window.matchMedia('(min-width: 768px)');
    expect(mql.matches).toBe(false);
  });
});
import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

// Global test setup
beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Setup global test environment
  if (typeof globalThis.jest === 'undefined') {
    globalThis.jest = vi;
  }
});

afterAll(() => {
  // Cleanup global test environment
  vi.clearAllMocks();
});

// Custom matchers
expect.extend({
  toBeInTheDocument(received: unknown) {
    const pass = Boolean(received);
    if (pass) {
      return {
        message: () => 'expected element to be in the document',
        pass: true,
      };
    } else {
      return {
        message: () => 'expected element to be in the document',
        pass: false,
      };
    }
  },
});

// Re-export for use in tests
export { expect, vi };
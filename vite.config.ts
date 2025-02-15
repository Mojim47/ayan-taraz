import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import path from 'path';

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react({
      include: /\.(mdx|js|jsx|ts|tsx)$/,
      jsxImportSource: '@emotion/react',
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          '@babel/plugin-transform-runtime',
          '@emotion/babel-plugin' // اضافه کردن پشتیبانی از Emotion
        ],
        babelrc: false,
        configFile: false
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.tsx'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.tsx',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/__mocks__/**'
      ],
      provider: 'v8'
    },
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    testTimeout: 10000,
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    reporters: ['default', 'html'],
    pool: 'vmThreads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    },
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:3000'
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"test"',
    'process.env.VITE_CURRENT_TIME': '"2025-02-15 08:14:06"', // زمان فعلی
    'process.env.VITE_USER_LOGIN': '"Mojim47"' // نام کاربری فعلی
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        '@emotion/react/jsx-runtime'
      ]
    }
  }
});
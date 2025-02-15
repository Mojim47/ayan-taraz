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
        plugins: ['@babel/plugin-transform-runtime', '@emotion/babel-plugin'],
        babelrc: false,
        configFile: false,
      },
    }),
  ],
  define: {
    'process.env.NODE_ENV': '"development"',
    'process.env.VITE_CURRENT_TIME': '"2025-02-15 10:04:22"',
    'process.env.VITE_USER_LOGIN': '"Mojim47"',
    // فعال‌سازی فیچرهای React Router v7
    'process.env.VITE_ROUTER_FUTURE_FLAGS': JSON.stringify({
      v7_startTransition: true,
      v7_relativeSplatPath: true
    })
  },
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
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.tsx',
        '**/*.d.ts',
        '**/__mocks__/**'
      ]
    }
  }
});
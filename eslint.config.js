import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
        // سایر متغیرهای جهانی که نیاز دارید
      },
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
      noInlineConfig: false,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslint,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/prop-types': 'off',
    },
  },
];

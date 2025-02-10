module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ['jest.config.ts', '*.config.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.eslint.json'], // Use the new tsconfig file
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['@typescript-eslint', 'react-refresh', 'react-hooks'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'prettier/prettier': ['error', { singleQuote: true }],
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      ignorePatterns: ['dist', '.eslintrc.cjs'],
    },
  ],
};

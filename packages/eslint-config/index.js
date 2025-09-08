// Shared ESLint config for the monorepo (no React here; Next.js apps add 'next/core-web-vitals' locally)

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: false, // extended by apps/packages
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // Next.js apps should extend 'next/core-web-vitals' in their local config
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': { typescript: true },
  },
  env: {
    es2022: true,
    node: true,
    browser: false,
  },
  rules: {
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'import/order': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['**/*.config.{js,cjs,mjs}'],
      env: { node: true },
    },
    {
      files: ['**/*.{test,spec}.{ts,tsx}', '**/__tests__/**'],
      env: { jest: true },
    },
  ],
};

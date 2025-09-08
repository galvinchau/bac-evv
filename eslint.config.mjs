// ESLint flat config for BAC-EVV monorepo (ESLint v9)
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // === Ignore patterns (glob) ===
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.next/**',
      '**/*.d.ts',
      'package.backup.json',
      '**/eslint.config.*',
      '**/.eslintrc.*',
    ],
  },

  // === Base JS + TS recommended ===
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // === Disable rules conflicting with Prettier ===
  prettier,

  // === Project-wide rules (browser + node mix) ===
  {
    plugins: {
      import: pluginImport,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      // Khai báo globals cho code chạy trên browser & node
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Sắp xếp import/export
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Xoá import/biến không dùng
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // Giảm “ồn” của một số rule TS
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // === Overrides cho file cấu hình (Node/CommonJS) & *.cjs ===
  {
    files: [
      '**/*.config.{js,cjs,mjs,ts}',
      '**/*.configs.{js,cjs,mjs,ts}',
      '**/*.cjs',
      'apps/**/next.config.js',
      '**/postcss.config.{js,ts}',
      '**/tailwind.config.{js,ts}',
      '**/.eslintrc.{js,cjs}',
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'writable',
        require: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },
];

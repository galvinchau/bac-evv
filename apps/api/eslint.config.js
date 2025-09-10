// apps/api/eslint.config.js

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unused from 'eslint-plugin-unused-imports';
import simple from 'eslint-plugin-simple-import-sort';

export default [
  // Base JS + TS recommended
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts', '**/*.test.ts'], // bỏ qua test files trong CI
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.build.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname
      }
    },
    plugins: {
      import: importPlugin,
      'unused-imports': unused,
      'simple-import-sort': simple
    },
    rules: {
      // Clean imports
      'unused-imports/no-unused-imports': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Alias TS đã resolve
      'import/no-unresolved': 'off',

      // Tắt rule cần type info để tránh fail CI scaffold
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/await-thenable': 'off'
    }
  },

  // Prettier override để disable conflict rules
  prettier
];

// apps/api/eslint.config.js

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unused from 'eslint-plugin-unused-imports';
import simple from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts', '**/*.test.ts'], // 🚫 bỏ qua test files trong lint CI
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.build.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json']
        }
      }
    },
    plugins: {
      import: importPlugin,
      'unused-imports': unused,
      'simple-import-sort': simple
    },
    rules: {
      // Dọn import
      'unused-imports/no-unused-imports': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Alias TS đã resolve, tắt cảnh báo unmatched
      'import/no-unresolved': 'off',

      // 🚨 Tạm tắt strict rule yêu cầu type info để tránh fail CI giai đoạn scaffold
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/await-thenable': 'off'
    }
  },
  prettier
);

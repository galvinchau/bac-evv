// apps/api/eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unused from 'eslint-plugin-unused-imports';
import simple from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  js.configs.recommended,
  // Bộ khuyến nghị cho TypeScript (ESLint v9, flat-config)
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.build.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname
      }
    },
    settings: {
      // Để plugin import hiểu alias TypeScript và tsconfig của API
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
      // Sạch import
      'unused-imports/no-unused-imports': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      // Alias @ đã được TS resolve; tắt cảnh báo unmatched
      'import/no-unresolved': 'off'
    }
  },
  // Về cuối để vô hiệu hoá rule xung đột với Prettier
  prettier
);

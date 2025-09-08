// D:\bac-evv\apps\mobile\eslint.config.js
// ESLint v9 flat config bridge to use shared @bac/eslint-config for Expo/React Native
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  // 1) Ignore build/tooling dirs
  {
    ignores: ['**/node_modules/**', 'dist/**', 'build/**', '.expo/**', 'android/**', 'ios/**'],
  },

  // 2) Base JS rules
  js.configs.recommended,

  // 3) Load shared legacy config
  ...compat.extends('@bac/eslint-config'),

  // 4) Allow require() in JS and config files
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/eslint.config.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },

  // 5) RN + ESLint v9 compatibility tweaks
  {
    settings: {
      'import/ignore': ['react-native', 'react-native/*', 'expo', 'expo/*'],
    },
    rules: {
      'import/namespace': 'off',
      'import/no-unresolved': 'off',
      'import/no-named-as-default-member': 'off',

      'react-native/no-unstable-styles': 'off',
      'react-native/no-unused-styles': 'off',
      'react-native/no-inline-styles': 'off',
      'react-native/no-color-literals': 'off',
      'react-native/no-single-element-style-arrays': 'off',
      'react-native/no-raw-text': 'off',
      'react-native/split-platform-components': 'off',
      'react-native/sort-styles': 'off',
    },
  },
];

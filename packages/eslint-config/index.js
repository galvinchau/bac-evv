/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: false, // will be extended by apps/packages
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: false,
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "react-native",
    "import",
    "simple-import-sort",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // Web (Next.js) projects can add "next" in their local config
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  settings: {
    react: { version: "detect" },
  },
  env: {
    es2022: true,
    node: true,
    browser: true,
  },
  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "import/order": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["**/*.config.{js,cjs,mjs}"],
      env: { node: true },
    },
    {
      files: ["**/*.test.{ts,tsx}", "**/__tests__/**"],
      env: { jest: true },
    },
  ],
};

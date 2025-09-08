/** ESLint config for apps/web (Next.js) */
module.exports = {
  root: true,
  extends: ['next/core-web-vitals', '@bac/eslint-config'],
  parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
  ignorePatterns: ['.next', 'node_modules', 'dist', 'build', 'coverage'],
};

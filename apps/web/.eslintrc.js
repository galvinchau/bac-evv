/** ESLint config for apps/web (Next.js) � Next only to avoid plugin conflicts */
module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
  ignorePatterns: ['.next', 'node_modules', 'dist', 'build', 'coverage'],
};

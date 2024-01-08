module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: [
    'client-dist',
    'server-dist',
    'types',
    'node_modules',
    'bin',
    'temp',
    '*.d.ts',
    '*.html',
    '.eslintrc.cjs',
    'docs'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    "@typescript-eslint/no-explicit-any": "warn"
  },
}

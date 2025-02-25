// Import required modules
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const eslintImport = require('eslint-plugin-import');

module.exports = {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    parser: tsparser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': tseslint,
    'prettier': prettier,
    'import': eslintImport,
  },
  rules: {
    ...tseslint.configs.recommended.rules,
    ...tseslint.configs['recommended-requiring-type-checking'].rules,
    ...prettier.configs.recommended.rules,

    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'import/order': ['error', { alphabetize: { order: 'asc' }, 'newlines-between': 'always' }],
    'import/no-default-export': 'error',
    'import/no-unresolved': 'error',
  }
};

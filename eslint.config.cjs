// Import required modules
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const eslintImport = require('eslint-plugin-import');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

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
    'simple-import-sort': simpleImportSort,
  },
  ignores: ['node_modules', 'dist', 'eslint.config.cjs'],
  rules: {
    ...tseslint.configs.recommended.rules,
    ...tseslint.configs['recommended-requiring-type-checking'].rules,
    ...prettier.configs.recommended.rules,

    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        newlinesBetween: 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-default-export': 'error',
    'import/no-unresolved': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var', 'import'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var', 'import'],
        next: ['const', 'let', 'var', 'import'],
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  }
};

const path = require('path');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const baseConfig = require('../../eslint.config.cjs');

module.exports = [
  baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        project: [path.resolve(__dirname, 'tsconfig.json')],
        tsconfigRootDir: __dirname,
      },
      globals: {
        global: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: [path.resolve(__dirname, 'tsconfig.json')],
        },
        node: {
          extensions: ['.js', '.ts', '.jsx', '.tsx'],
        },
      },
    },
    ignores: [
      'node_modules',
      'dist',
      '*.config.js',
    ],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always', // Use kebab-case here
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }
];
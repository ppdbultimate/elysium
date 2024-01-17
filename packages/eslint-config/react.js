const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/react',
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  plugins: ['only-warn'],
  globals: {
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
  // add rules configurations here
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/prefer-reduce-type-parameter': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-floating-promises': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'eslint-comments/require-description': 'off',

    'no-nested-ternary': 'off',

    'react/display-name': 'off',
    'react/function-component-definition': 'off',
    'react/no-leaked-render': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/no-array-index-key': 'off',

    'import/no-named-as-default': 'off',
    'import/no-default-export': 'off',
    'import/order': ['warn'],
  },
};

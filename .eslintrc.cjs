/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  'rules': {
    'no-var': 'error',
    'semi': [
      'error',
      'always',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'object-curly-spacing': [
      'warn',
      'always',
    ],
    'array-bracket-spacing': [
      'warn',
      'always',
    ],
    'space-in-parens': [
      'warn',
      'never',
    ],
    'array-bracket-newline': [
      'warn',
      'consistent',
    ],
    'object-curly-newline': [
      'warn',
      {
        'consistent': true,
      },
    ],
    'space-before-blocks': [
      'warn',
      'always',
    ],
  },
};

module.exports = {
  extends: ['eslint-config-airbnb', 'eslint-config-prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9, // ES9 === ES2018
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      impliedStrict: true,
    },
  },
  plugins: [
    'eslint-plugin-babel',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-markdown',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'value-list-comma-newline-after': 0,
    'prefer-promise-reject-errors': 0,
    'max-lines': [
      2,
      {
        max: 1000,
      },
    ],
  },
};

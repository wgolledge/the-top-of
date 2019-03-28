module.exports = {
  env: {
    browser: true,
    jest: true
  },
  extends: ['airbnb', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['import', 'react', 'import', 'jsx-a11y', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/button-has-type': 'off',
    'newline-after-var': ['error', 'always'],
    'import/order': ['error', { 'newlines-between': 'always' }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ]
  }
};

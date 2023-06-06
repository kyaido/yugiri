module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    // eslint default rules
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
  },
};

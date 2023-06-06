module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: null,
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ['import', 'react'],
  rules: {
    // eslint default rules
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
      }
    ],
    camelcase: [
      'error',
      {
        properties: 'never'
      }
    ],

    // plugin: import
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal'
          }
        ]
      }
    ],

    // plugin: react
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',

    // plugin: typescript-eslint
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/camelcase': [
      'error',
      {
        properties: 'never'
      }
    ],
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'warn'
  }
};

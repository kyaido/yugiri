module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-prettier/recommended'],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested', 'blockless-after-same-name-blockless'],
      },
    ],
    'at-rule-semicolon-newline-after': 'always',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always',
    'block-opening-brace-newline-after': 'always',
    'block-opening-brace-space-before': 'always',
    'color-hex-length': 'short',
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'function-comma-space-after': 'always',
    'function-comma-space-before': 'never',
    indentation: 2,
    'max-empty-lines': 2,
    'no-duplicate-selectors': null,
    'number-leading-zero': 'always',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-list-comma-newline-after': 'always',
    'selector-pseudo-element-colon-notation': 'double',
    'string-quotes': 'double',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',
  },
  ignoreFiles: ['**/*.css', '**/*.tsx'],
};

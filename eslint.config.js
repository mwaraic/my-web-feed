module.exports = {
  languageOptions: {
    globals: {
      browser: true,
      node: true,
      es2021: true,
    }
  },  
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2, { 'SwitchCase': 1 }], // Specify 'SwitchCase' option if needed
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'space-before-blocks': ['error', 'always'],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'no-console': 'off',
  }
};

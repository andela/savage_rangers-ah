// Find more about the rules below here https://eslint.org/docs/rules/
module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  rules: {
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: true,
        properties: true
      }
    ],
    'consistent-return': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    curly: ['error', 'multi-line'],
    'import/no-unresolved': [2, { commonjs: true }],
    'no-shadow': ['error', { allow: ['req', 'res', 'err'] }],
    'valid-jsdoc': [
      'error',
      {
        requireReturn: true,
        requireReturnType: true,
        requireParamDescription: false,
        requireReturnDescription: true
      }
    ],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true
        }
      }
    ],
    'no-extra-parens': ['error', 'all', { conditionalAssign: false }],
    'no-irregular-whitespace': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'use-isnan': 'error',
    'block-scoped-var': 'error',
    'dot-notation': 'error',
    eqeqeq: ['error', 'always'],
    'no-else-return': 'error',
    'no-extra-bind': 'error',
    'no-invalid-this': 'error',
    'no-magic-numbers': [
      'error',
      {
        ignore: [1],
        ignoreArrayIndexes: true
      }
    ],
    'no-self-assign': 'error',
    'no-useless-catch': 'error',
    'wrap-iife': ['error', 'outside'],
    'no-use-before-define': ['error', { functions: true, classes: true }]
  }
};

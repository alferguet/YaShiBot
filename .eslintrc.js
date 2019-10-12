module.exports = {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
        project: 'tsconfig.json'
    },
    rules: {
        'max-len': ['error', 150],
        "comma-dangle": ["error", "always-multiline"],
        'semi': ['error', 'never'],
        'eqeqeq': ['error', 'smart'],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': ['error'],
        'indent': 'off',
        '@typescript-eslint/indent': ['error', 2],
        'no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': ['error'],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/prefer-readonly': ['error'],
        '@typescript-eslint/promise-function-async': ['error'],
        'quotes': 'off',
        '@typescript-eslint/quotes': ['error', 'single'],
        'arrow-parens': ["error", "as-needed"],
        '@typescript-eslint/no-useless-constructor': ['warn'],
        '@typescript-eslint/prefer-for-of': ['warn'],

    },
};

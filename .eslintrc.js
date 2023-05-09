module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'prettier',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            ts: true,
        },
    },
    ignorePatterns: ['mock-api/*.js', 'craco.config.js'],
    rules: {
        'react/prop-types': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};

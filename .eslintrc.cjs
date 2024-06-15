/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    parser: '@typescript-eslint/parser',
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json', './apps/*/tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: false,
            },
        ],
    },
};

module.exports = {
    extends: ['plugin:jasmine/recommended', 'airbnb-base'],

    globals: {
        EC: true,
        allure: true,
        $: true,
        $$: true,
        element: true,
        browser: true,
        protractor: true,
        ui: true,
        testConfig: true,
    },

    env: {
        jasmine: true,
        protractor: true,
        es2020: true,
        node: true,
    },

    rules: {
        indent: ['error', 4],
        'max-len': ['error', { code: 120 }],
        'padded-blocks': 'off',
        'class-methods-use-this': 'off',
        'no-continue': 'off',
        'object-curly-newline': ['error', {
            ObjectExpression: {
                minProperties: 6,
                multiline: true,
                consistent: true,
            },
        }],
        'no-use-before-define': 'off',
        'arrow-parens': 'off',
        'no-underscore-dangle': 'off',
    },

    plugins: [
        'jasmine',
    ],
};

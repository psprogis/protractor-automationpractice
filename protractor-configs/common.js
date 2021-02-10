// https://github.com/angular/protractor/blob/master/lib/config.ts
require('../log4js-config').init();

const { SpecReporter } = require('jasmine-spec-reporter');
const AllureReporter = require('jasmine-allure-reporter');

exports.config = {
    ignoreUncaughtExceptions: true,
    specs: [
        '../specs/login.spec.js',
        '../specs/search.spec.js',
        '../specs/shopping.cart.spec.js',
    ],

    SELENIUM_PROMISE_MANAGER: false,
    framework: 'jasmine2',
    allScriptsTimeout: 300000,
    getPageTimeout: 120000,
    baseUrl: 'http://automationpractice.com',

    onPrepare: function() {
        const width = 1800;
        const height = 1200;
        browser.driver.manage().window().setSize(width, height);

        // eslint-disable-next-line global-require
        global.ui = require('../src/ui').initApplicationUI();

        // can be replaced with config module in the future
        global.testConfig = Object.freeze({
            LOGIN_TIMEOUT: 8000,
            ELEMENT_VISIBLE_TIMEOUT: 4000,
        });

        // reporters
        jasmine.getEnv().addReporter(
            new SpecReporter({
                suite: {
                    displayNumber: true,
                },
                spec: {
                    displayStackTrace: true,
                    displayDuration: true,
                },
                summary: {
                    displayDuration: true,
                },

            }),
        );

        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results',
        }));

        jasmine.getEnv().afterEach(async () => {
            const png = await browser.takeScreenshot();
            const pngBuffer = Buffer.from(png, 'base64');

            allure.createAttachment('Screenshot', pngBuffer, 'image/png');
        });
    },

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        print() {}, // turn off dots
    },
};

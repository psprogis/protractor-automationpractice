// https://github.com/angular/protractor/blob/master/lib/config.ts
// TODO: add browser logs

require('./log4js-config').init();
const log = require('log4js').getLogger('conf-logger');

const { SpecReporter } = require('jasmine-spec-reporter');
const AllureReporter = require('jasmine-allure-reporter');
// const { initApplicationUI } = require('./src/ui');

exports.config = {
    // https://www.protractortest.org/#/browser-setup
    // https://sites.google.com/a/chromium.org/chromedriver/capabilities
    capabilities: {
        browserName: 'chrome',
        enableVNC: true,
        version: '',
        platform: 'ANY',
        chromeOptions: {
            args: ['--lang=en'],
        },
    },

    // uncomment for debug
    // useBlockingProxy: true,
    // highlightDelay: 3000,
    // webDriverLogDir: 'logs',
    // seleniumSessionId: '091cda6b89457082ee779ccc358f473c',

    seleniumAddress: 'http://localhost:4444/wd/hub',
    ignoreUncaughtExceptions: true,
    specs: [
        'specs/login.spec.js',
        'specs/search.spec.js',
    ],

    SELENIUM_PROMISE_MANAGER: false,
    framework: 'jasmine2',
    allScriptsTimeout: 300000,
    getPageTimeout: 120000,
    baseUrl: 'http://automationpractice.com',

    onPrepare() {
        const width = 1800;
        const height = 1200;
        browser.driver.manage().window().setSize(width, height);

        global.ui = require('./src/ui').initApplicationUI({
            baseUrl: 'http://automationpractice.com/index.php',
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

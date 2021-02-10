const { config } = require('./common');
const log = require('log4js').getLogger('local-run'); // eslint-disable-line

exports.config = Object.assign(config, {
    browserstackUser: process.env.BROWSERSTACK_USERNAME,
    browserstackKey: process.env.BROWSERSTACK_ACCESS_KEY,

    capabilities: {
        build: 'protractor-browserstack',
        name: 'automationpractice',
        browserName: 'chrome',
        resolution: '1920x1080',
        'browserstack.debug': 'true',
    },

    // Code to mark the status of test on BrowserStack based on test assertions
    onComplete(passed) {
        if (!passed) {
            browser.executeScript('browserstack_executor: {"action": "setSessionStatus",'
                + ' "arguments": {"status":"failed","reason": "At least 1 assertion has failed"}}');
        }
        if (passed) {
            browser.executeScript('browserstack_executor: {"action": "setSessionStatus", '
                + '"arguments": {"status":"passed","reason": "All assertions passed"}}');
        }
    },
});

log.info('current config:');
log.info(config);

const { config } = require('./common');
const log = require('log4js').getLogger('gitlab-run'); // eslint-disable-line

exports.config = Object.assign(config, {
    // https://www.protractortest.org/#/browser-setup
    // https://sites.google.com/a/chromium.org/chromedriver/capabilities
    capabilities: {
        browserName: 'chrome',
        version: '',
        platform: 'ANY',
        chromeOptions: {
            args: ['--lang=en'],
        },
    },

    seleniumAddress: 'http://selenium__standalone-chrome:4444/wd/hub',
});

log.info('current config:');
log.info(config);

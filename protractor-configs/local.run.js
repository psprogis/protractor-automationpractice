const { config } = require('./common');
const log = require('log4js').getLogger('local-run'); // eslint-disable-line

exports.config = Object.assign(config, {
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

    seleniumAddress: 'http://localhost:4444/wd/hub',

    // directConnect: true,

    // saucelab config
    // sauceUser: "",
    // sauceKey: "",
    // sauceRegion: "ondemand.us-west-1.saucelabs.com:443/wd/hub",
    // sauceSeleniumUseHttp: true,

    // seleniumServerJar: '',
});

log.info('current config:');
log.info(config);

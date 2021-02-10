const log4js = require('log4js');

module.exports.init = () => {
    log4js.configure({
        appenders: {
            out: {
                type: 'console',
                layout: {
                    type: 'pattern',
                    pattern: '%[[%d{ABSOLUTE}] [%4.4p] [%15.15c] -%] %m',
                },
            },
        },
        categories: {
            default: {
                appenders: ['out'],
                level: 'debug',
            },
        },
    });
};

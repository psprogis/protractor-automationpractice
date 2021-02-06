const MainPage = require('./components/MainPage');

function initApplicationUI({ baseUrl }) {
    const app = {};
    app.mainPage = new MainPage({ baseUrl });

    return app;
}

module.exports.initApplicationUI = initApplicationUI;

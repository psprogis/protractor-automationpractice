const MainPage = require('./components/MainPage');
const ShoppingCartPage = require('./components/ShoppingCartPage');

function initApplicationUI({ baseUrl }) {
    const app = {};
    app.mainPage = new MainPage({ baseUrl });
    app.shoppingCartPage = new ShoppingCartPage();

    return app;
}

module.exports.initApplicationUI = initApplicationUI;

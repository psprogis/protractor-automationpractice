const MainPage = require('./pages/MainPage');
const ShoppingCartPage = require('./pages/ShoppingCartPage');

function initApplicationUI() {
    const app = {};
    app.mainPage = new MainPage();
    app.shoppingCartPage = new ShoppingCartPage();

    return app;
}

module.exports.initApplicationUI = initApplicationUI;

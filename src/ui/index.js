const MainPage = require('./components/MainPage');
const ShoppingCartPage = require('./components/ShoppingCartPage');

function initApplicationUI() {
    const app = {};
    app.mainPage = new MainPage();
    app.shoppingCartPage = new ShoppingCartPage();

    return app;
}

module.exports.initApplicationUI = initApplicationUI;

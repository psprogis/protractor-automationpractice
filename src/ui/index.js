const MainPage = require('./pages/MainPage');
const ShoppingCartPage = require('./pages/ShoppingCartPage');
const ProductsPage = require('./pages/ProductsPage');

function initApplicationUI() {
    const app = {};
    app.mainPage = new MainPage();
    app.shoppingCartPage = new ShoppingCartPage();
    app.productsPage = new ProductsPage();

    return app;
}

module.exports.initApplicationUI = initApplicationUI;

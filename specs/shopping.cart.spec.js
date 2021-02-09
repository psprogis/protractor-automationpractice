const log = require('log4js').getLogger('spec-logger');
const { setNonAngularSite, deleteAllCookies } = require('../src/ui/browserHelper');

describe('Shopping cart', () => {

    beforeAll(async () => {
        await setNonAngularSite(); // TODO: move to config
    });

    beforeEach(async () => {
        await ui.mainPage.open();
        await deleteAllCookies(); // for now it is enough to get fresh cart before each test
    });

    it('can add item to shopping cart', async () => {
        await ui.mainPage.selectCategory({ name: 'Dresses' });
        await ui.productsPage.addFirstProductToCart();

        expect(ui.mainPage.shoppingCartWidget.getNumberOfProducts())
            .toBe('1', 'got wrong number of products in shopping cart');
    });

    it('can delete item from the shopping cart', async () => {

        // TODO: add product(s) via post request
        await ui.mainPage.selectCategory({ name: 'T-shirts' });
        await ui.productsPage.addFirstProductToCart();

        await ui.shoppingCartPage.open();
        const numberOfProductsBefore = await ui.shoppingCartPage.getNumberOfProducts();

        log.info(`number of products in shopping cart before delete operation: ${numberOfProductsBefore}`);

        await ui.shoppingCartPage.deleteFirstProduct();
        const isCartEmpty = await ui.shoppingCartPage.checkIfEmpty();

        log.info(`any products in the cart: ${!isCartEmpty}`);

        expect(isCartEmpty).toBe(true, 'cart is not empty after delete a product');
    });
});

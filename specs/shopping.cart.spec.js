const log = require('log4js').getLogger('spec-logger');
const { setNonAngularSite, deleteAllCookies } = require('../src/ui/browserHelpers');

describe('Shopping cart', () => {

    beforeAll(async () => {
        await setNonAngularSite(); // move to config
    });

    beforeEach(async () => {
        await ui.mainPage.open();
        await deleteAllCookies();
    });

    it('can add item to shopping cart', async () => {
        await ui.mainPage.selectCategory({ name: 'Dresses' });
        await ui.mainPage.addFirstProductToCart();

        expect(ui.mainPage.shoppingCartWidget.getNumberOfProducts())
            .toBe('1', 'got wrong number of products in shopping cart');
    });

    it('can delete item from the shopping cart', async () => {

        // TODO: add product via post request
        await ui.mainPage.selectCategory({ name: 'T-shirts' });
        await ui.mainPage.addFirstProductToCart();

        await ui.shoppingCartPage.open();
        const numberOfProductsBefore = await ui.shoppingCartPage.getNumberOfProducts();

        log.info(`number of products in shopping cart before delete operation: ${numberOfProductsBefore}`);

        await ui.shoppingCartPage.deleteFirstProduct();
        const isCartEmpty = await ui.shoppingCartPage.checkIfEmpty();

        log.info(isCartEmpty);

        expect(isCartEmpty).toBe(true);

        await browser.sleep(5000);

    });
});

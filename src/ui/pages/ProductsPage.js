const log = require('log4js').getLogger('products-page');
const BasePage = require('./BasePage');
const { waitElementVisible, scrollIntoView } = require('../browserHelper');

class ProductsPage extends BasePage {

    async addFirstProductToCart() {
        const firstProduct = await $$('.product_list .product-container').first();
        const position = await firstProduct.getLocation();

        log.info(position);

        await scrollIntoView({ element: firstProduct });

        await browser.actions()
            .mouseMove(firstProduct)
            .perform();

        await firstProduct.$('[title="Add to cart"]').click();

        const closeBtn = $('#layer_cart [title="Close window"]');
        await waitElementVisible({ element: closeBtn });
        await closeBtn.click();

        // const clickScript = '(document.querySelector(\'#layer_cart [title="Close window"]\')).click()';
        // await browser.executeScript(clickScript);
    }
}

module.exports = ProductsPage;

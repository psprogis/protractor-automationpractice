const BasePage = require('./BasePage');
const { waitElementVisible } = require('../browserHelpers');

class ShoppingCartPage extends BasePage {
    async open() {
        return super.open({ url: '/index.php?controller=order' });
    }

    async getNumberOfProducts() {
        return $('#summary_products_quantity').getText();
    }

    async deleteFirstProduct() {
        // move to table
        return $$('#cart_summary tr .icon-trash').first().click();
    }

    // delete product by index

    // delete all products

    async checkIfEmpty() {
        const alert = $('.alert');

        await waitElementVisible({ element: alert });

        return (await alert.getText()) === 'Your shopping cart is empty.';
    }
}

module.exports = ShoppingCartPage;

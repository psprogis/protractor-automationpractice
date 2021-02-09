const { waitElementVisible } = require('../browserHelper');

class QuickView {
    async addToCart() {
        await browser.sleep(5000);
        await waitElementVisible({ element: $('#add_to_cart [type="submit"]'), timeout: 5000 });
        await $('#add_to_cart [type="submit"]').click();
        await waitElementVisible({ element: $('#layer_cart') });

        return $('#layer_cart [title="Close window"]').click();
    }
}

module.exports = QuickView;

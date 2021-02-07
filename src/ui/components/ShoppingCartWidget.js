class ShoppingCartWidget {
    constructor() {
        this._root = $('.shopping_cart');
    }

    async getNumberOfProducts() {
        // wait for changes / update ?
        return this._root.$('.ajax_cart_quantity').getText();
    }
}

module.exports = ShoppingCartWidget;

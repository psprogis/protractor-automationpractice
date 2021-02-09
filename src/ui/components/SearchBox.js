const { waitElementVisible } = require('../browserHelper');

class SearchBox {
    constructor({ id }) {
        this._root = $(`form#${id}`);
    }

    async search({ query }) {
        await waitElementVisible({ element: this._root });

        await this._root.$('#search_query_top').clear().sendKeys(query);
        return this._root.$('button[type="submit"]').click();
    }
}

module.exports = SearchBox;

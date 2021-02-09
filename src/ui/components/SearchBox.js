const SearchResults = require('./SearchResults');
const { waitElementVisible } = require('../browserHelper');

class SearchBox {
    constructor({ id }) {
        this._root = $(`form#${id}`);
    }

    async search({ query }) {
        await waitElementVisible({ element: this._root, timeout: 5000 });

        await this._root.$('#search_query_top').clear().sendKeys(query);
        await this._root.$('button[type="submit"]').click();

        return new SearchResults();
    }
}

module.exports = SearchBox;

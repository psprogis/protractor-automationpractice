const { waitElementVisible } = require('../browserHelper');

class SearchResults {

    constructor() {
        this._root = $('#center_column');
    }

    async getResults() {
        const topCountLabel = this._root.$('.top-pagination-content .product-count');

        try {
            await waitElementVisible({ element: topCountLabel, timeout: 2000 });
        } catch (e) {
            if (!e.message.includes('Wait timed out')) {
                log.warn(`got unexpected error: ${e.message()}`);
                throw e;
            }

            // no results were found, just return warning/error message
            return {
                warningMessage: (await this._root.$('.alert').getText()).trim(),
            };
        }

        const showingResultsText = (await topCountLabel.getText()).trim();

        // TODO: create products component
        const items = await $$('.product_list .product-container .right-block').map(async (elm) => {
            const item = {};

            item.name = await elm.$('.product-name').getText();
            item.price = await elm.$('.price').getText();

            if (await elm.$('.old-price').isPresent()) {
                item.oldPrice = await elm.$('.old-price').getText();
            }

            if (await elm.$('.price-percent-reduction').isPresent()) {
                item.priceReduction = await elm.$('.price-percent-reduction').getText();
            }

            return item;
        });

        return {
            showingResultsText,
            items,
        };
    }
}

module.exports = SearchResults;

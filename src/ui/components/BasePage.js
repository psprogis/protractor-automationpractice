
const Header = require('./Header');
const LoginForm = require('./LoginForm');
const SearchBox = require('./SearchBox');
const log = require('log4js').getLogger('base-page');
const { waitElementVisible } = require('../browserHelpers');

class BasePage {
    constructor() {
        this.header = new Header();
        this.searchBox = new SearchBox({ id: 'searchbox' } );
    }

    async openLoginForm() {
        const isLoggedIn = await this.header.isLoggedIn();

        if (!isLoggedIn) {
            log.info('already logged in, cannot open login form');
            throw new Error('already logged in, cannot open login form');
        }

        await this.header.clickLoginLink();

        return new LoginForm({ id: 'login_form' });
    }

    async login({ email, password }) {
        const loginFrom = await this.openLoginForm();

        return loginFrom.login( { email, password } );
    }

    async getCurrentUserInfo() {
        const fullText = await this.header.userInfo.getText();

        log.info(`current user info: ${fullText}`);

        const fullTextSplitted = fullText.split(' ');

        return {
            name: fullTextSplitted[0],
            lastName: fullTextSplitted[1],
        }
    }

    async simpleSearch({ query }) {
        await this.searchBox.search({ query });

        // TODO: search results
        const root = $('#center_column');
        const topCountLabel = root.$('.top-pagination-content .product-count');

        try {
            await waitElementVisible({ element: topCountLabel, timeout: 2000 })
        } catch (e) {
            if (! e.message.includes('Wait timed out')) {
                log.warn(`got unexpected error: ${e.message()}`);
                throw e;
            }

            return {
                warningMessage: (await root.$('.alert').getText()).trim()
            };
        }

        const showingResultsText = (await topCountLabel.getText()).trim();

        // products component
        let items = await $$('.product_list .product-container .right-block').map(async (elm) => {
            let item = {};

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
            items
        }
    }

}

module.exports = BasePage;

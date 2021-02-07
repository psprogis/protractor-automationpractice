const log = require('log4js').getLogger('base-page');

const Header = require('./Header');
const LoginForm = require('./LoginForm');
const SearchBox = require('./SearchBox');
const ShoppingCartWidget = require('./ShoppingCartWidget');

const { waitElementVisible, scrollIntoView } = require('../browserHelpers');

class BasePage {
    constructor() {
        this.header = new Header();
        this.searchBox = new SearchBox({ id: 'searchbox' });
        this.shoppingCartWidget = new ShoppingCartWidget();
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

        return loginFrom.login({ email, password });
    }

    async getCurrentUserInfo() {
        const fullText = await this.header.userInfo.getText();

        log.info(`current user info: ${fullText}`);

        const fullTextSplitted = fullText.split(' ');

        return {
            name: fullTextSplitted[0],
            lastName: fullTextSplitted[1],
        };
    }

    async simpleSearch({ query }) {
        await this.searchBox.search({ query });

        // TODO: search results
        const root = $('#center_column');
        const topCountLabel = root.$('.top-pagination-content .product-count');

        try {
            await waitElementVisible({ element: topCountLabel, timeout: 2000 });
        } catch (e) {
            if (!e.message.includes('Wait timed out')) {
                log.warn(`got unexpected error: ${e.message()}`);
                throw e;
            }

            return {
                warningMessage: (await root.$('.alert').getText()).trim(),
            };
        }

        const showingResultsText = (await topCountLabel.getText()).trim();

        // products component
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

    async selectCategory({ name }) {
        const supportedCategories = ['Women', 'Dresses', 'T-shirts'];

        if (!supportedCategories.includes(name)) {
            throw new Error(`Category ${name} cannot be selected.`);
        }

        waitElementVisible({ element: $('#block_top_menu') });
        await $$(`a[title="${name}"]`).get(1).click();

        return waitElementVisible({ element: $('.heading-counter') });
    }

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

module.exports = BasePage;

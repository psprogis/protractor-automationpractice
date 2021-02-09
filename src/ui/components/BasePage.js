const log = require('log4js').getLogger('base-page');

const Header = require('./Header');
const SearchBox = require('./SearchBox');
const ShoppingCartWidget = require('./ShoppingCartWidget');

const { waitElementVisible, scrollIntoView } = require('../browserHelper');

class BasePage {
    constructor() {
        this.header = new Header();
        this.searchBox = new SearchBox({ id: 'searchbox' });
        this.shoppingCartWidget = new ShoppingCartWidget();
    }

    async open({ url }) {
        return browser.get(url);
    }

    async openAuthenticationPage() {
        const isLoggedIn = await this.header.isLoggedIn();

        if (!isLoggedIn) {
            log.info('already logged in, cannot open login form');
            throw new Error('already logged in, cannot open login form');
        }

        await this.header.clickLoginLink();

        // do not require auth page at the top, it will not be able to extend BasePage
        return new (require('./AuthenticationPage'));
    }

    async getCurrentUserInfo() {
        await waitElementVisible({ element: this.header.userInfo });
        const fullText = await this.header.userInfo.getText();

        log.info(`current user info: ${fullText}`);

        const fullTextSplitted = fullText.split(' ');

        return {
            name: fullTextSplitted[0],
            lastName: fullTextSplitted[1],
        };
    }

    async simpleSearch({ query }) {
        return (await this.searchBox.search({ query })).getResults();
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


const BasePage = require('./BasePage');

// TODO: remove argument
class MainPage extends BasePage {
    constructor({ baseUrl }) {
        super();
        this.baseUrl = baseUrl;
    }

    async open() {
        return browser.get('/index.php');
    }
}

module.exports = MainPage;

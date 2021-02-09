const BasePage = require('./BasePage');

class MainPage extends BasePage {
    async open() {
        super.open({ url: '/index.php' });
    }
}

module.exports = MainPage;

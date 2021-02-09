const { waitElementVisible } = require('../browserHelper');

class Header {
    constructor() {
        this.loginLink = $('.login');
        this.userInfo = $('.header_user_info span');
    }

    async isLoggedIn() {
        await waitElementVisible({ element: $('.login') });
        return $('.login').isDisplayed();
    }

    async clickLoginLink() {
        return this.loginLink.click();
    }
}

module.exports = Header;

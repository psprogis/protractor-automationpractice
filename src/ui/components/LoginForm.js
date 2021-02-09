const { waitElementVisible } = require('../browserHelpers');

class LoginForm {
    constructor({ id }) {
        this._root = $(`form#${id}`);
    }

    async login({ email, password }) {
        const emailInput = this._root.$('#email');

        await waitElementVisible({ element: emailInput });
        await emailInput.clear().sendKeys(email);
        await this._root.$('#passwd').clear().sendKeys(password);

        await this._root.$('#SubmitLogin').click();

        // TODO: check authentication errors

        // move to Header ? or merge Header into BasePage
        return waitElementVisible({ element: $('.logout'), timeout: testConfig.LOGIN_TIMEOUT });
    }
}

module.exports = LoginForm;

const BasePage = require('./BasePage');
const LoginForm = require('./LoginForm');

class AuthenticationPage extends BasePage {
    constructor() {
        super();
        this.loginForm = new LoginForm({ id: 'login_form' });
        // this.createAccountForm
    }

    async login({ email, password }) {
        return this.loginForm.login({ email, password });
    }
}

module.exports = AuthenticationPage;

const { setNonAngularSite } = require('../src/ui/browserHelpers');

describe('Login functionality', () => {

    beforeAll(async () => {
        await setNonAngularSite();

        // create test user via rest api, db, etc.
    });

    it('should allow to login with valid username and credentials', async () => {
        await ui.mainPage.open();

        // TODO: use default values or env variables
        await ui.mainPage.login({
            email: 'test-bitpanda@gmail.com',
            password: 'PPtz@7__vY!44v@',
        });

        const testUser = await ui.mainPage.getCurrentUserInfo();

        expect(testUser).toEqual({ name: 'Testname', lastName: 'TestLastName' }, 'got wrong user after login');
    });
});

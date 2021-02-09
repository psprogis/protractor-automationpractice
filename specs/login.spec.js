const { setNonAngularSite } = require('../src/ui/browserHelpers');
const { getValueOrThrow } = require('../src/envHelper');

describe('Login functionality', () => {

    beforeAll(async () => {
        await setNonAngularSite();
        // TODO: create test user via rest api, db, etc.
    });

    it('should allow to login with valid username and credentials', async () => {
        await ui.mainPage.open();

        (await ui.mainPage.openAuthenticationPage()).login({
            email: getValueOrThrow('TEST_USER'),
            password: getValueOrThrow('TEST_USER_PASSWORD'),
        });

        const testUser = await ui.mainPage.getCurrentUserInfo();

        expect(testUser).toEqual({ name: 'Testname', lastName: 'TestLastName' }, 'got wrong user after login');
    });
});

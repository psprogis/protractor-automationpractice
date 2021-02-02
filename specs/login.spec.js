const { setNonAngularSite } = require('../src/ui/browserHelpers');

describe('Login functionallity', () => {
    
    beforeAll(async () => {
        await setNonAngularSite();
    });
    
    it('should allow to login with valid username and credentials', async () => {
        await browser.get('http://automationpractice.com/index.php');
        await browser.sleep(1000);
    });
});

const { ExpectedConditions: EC } = protractor;

async function setNonAngularSite() {
    return browser.waitForAngularEnabled(false);
}

async function scrollIntoView({ element }) {
    return browser.executeScript('arguments[0].scrollIntoView(true)', element);
}

async function deleteAllCookies() {
    return browser.driver.manage().deleteAllCookies();
}

async function waitElementVisible({ element, timeout = testConfig.ELEMENT_VISIBLE_TIMEOUT }) {
    return browser.wait(EC.visibilityOf(element), timeout);
}

async function waitElementNotVisible({ element, timeout = testConfig.ELEMENT_VISIBLE_TIMEOUT }) {
    return browser.wait(EC.not(EC.visibilityOf(element)), timeout);
}

module.exports = {
    setNonAngularSite,
    scrollIntoView,
    deleteAllCookies,
    waitElementVisible,
    waitElementNotVisible,
};

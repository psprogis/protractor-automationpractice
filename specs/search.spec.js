const log = require('log4js').getLogger('spec-logger');
const { setNonAngularSite } = require('../src/ui/browserHelper');
const positiveScenariosInput = require('../test-data/simpleSearch');

describe('Simple search', () => {

    beforeAll(async () => {
        await setNonAngularSite();
        // TODO: create products for search: using REST api, db dump, etc.
    });

    beforeEach(async () => {
        await ui.mainPage.open();

        allure.story('STORY-22: simple search functionality');
    });

    positiveScenariosInput.forEach(test => {
        it(test.description, async () => {
            const searchResults = await ui.mainPage.simpleSearch({ query: test.query });

            log.info(searchResults);

            expect(searchResults.showingResultsText).toBe(test.result.showingResultsText);
            expect(searchResults.items).toEqual(test.result.items, 'got wrong items in search result');
        });
    });

    it('should display warning if no results found', async () => {
        const searchResults = await ui.mainPage.simpleSearch({ query: 'rubber ducks' });

        log.info(searchResults);

        expect(searchResults).toEqual({ warningMessage: 'No results were found for your search "rubber ducks"' });
    });
});

const { setNonAngularSite, waitElementVisible } = require('../src/ui/browserHelpers');
const positiveScenariosInput = require('../test-data/simpleSearch');

describe('Simple search', () => {

    beforeAll(async () => {
        await setNonAngularSite();
    });

    beforeEach(async () => {
        await ui.mainPage.open();
    })

    positiveScenariosInput.forEach(test => {
        it(test.description, async () => {
            const searchResults = await ui.mainPage.simpleSearch({ query: test.query });

            console.log(searchResults);

            expect(searchResults.showingResultsText).toBe(test.result.showingResultsText);
            expect(searchResults.items).toEqual(test.result.items);
        });
    });

    it('should display warning if no results found', async () => {
        const searchResults = await ui.mainPage.simpleSearch({ query: 'rubber ducks' });

        console.log(searchResults);

        expect(searchResults).toEqual({warningMessage: 'No results were found for your search "rubber ducks"'});
    });
});

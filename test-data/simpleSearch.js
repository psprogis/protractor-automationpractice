module.exports = [
    {
        description: 'should find all blouses',
        query: 'blouse',
        result: {
            showingResultsText: 'Showing 1 - 1 of 1 item',
            items: [{ name: 'Blouse', price: '$27.00' }],

        },
    },
    {
        description: 'should find all dresses',
        query: 'dress',
        result: {
            showingResultsText: 'Showing 1 - 7 of 7 items',
            items: [
                {
                    name: 'Printed Summer Dress',
                    price: '$28.98',
                    oldPrice: '$30.51',
                    priceReduction: '-5%',
                },
                { name: 'Printed Dress', price: '$50.99' },
                { name: 'Printed Summer Dress', price: '$30.50' },
                {
                    name: 'Printed Chiffon Dress',
                    price: '$16.40',
                    oldPrice: '$20.50',
                    priceReduction: '-20%',
                },
                { name: 'Printed Dress', price: '$26.00' },
                { name: 'Faded Short Sleeve T-shirts', price: '$16.51' },
                { name: 'Blouse', price: '$27.00' },
            ],
        },
    },
];

const parser = require('./parser');
// This ensures that when server.js calls index.initialize(), 
// it is reaching the parser logic we updated above.
module.exports = {
    initialize: () => parser.initialize(),
    searchErrors: (query) => parser.listErrors({ keyword: query }), // or your search logic
    updateStock: (sku, qty) => parser.updateStock(sku, qty),
    createUser: (email) => parser.createUser(email)
};

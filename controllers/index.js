// A barrel module provides one stable import path for all book controllers.
const booksController = require("./books");

// This exports the controller methods directly, so consumers call getAll/getById.
module.exports = booksController;

// TODO: These imports and payloadSchema are currently unused in this router.
// Validation should be delegated to validateBody and a schema from /schemas.
const books = require("../../books.json");
const express = require("express");
const { HttpError } = require("../../helpers");
const Joi = require("joi");
// The controllers contain the request-handling logic for each book endpoint.
const booksController = require("../../controllers");

const payloadSchema = Joi.object({
	title: Joi.string().required(),
	author: Joi.string().required(),
});

// Create an isolated router that is mounted at /api/books in app.js.
const router = express.Router();

// GET /api/books - return the complete book collection.
router.get("/", booksController.getAll);

// GET /api/books/:id - return one book selected by its URL parameter.
router.get("/:id", booksController.getById);

// Middleware composition places validation before a controller. However, GET requests
// normally have no body, so validateBody belongs on POST/PUT/PATCH routes instead.
// router.get("/:id", validateBody(booksSchema), booksController.getById);

// POST /api/books - create a book.
router.post("/", booksController.createBook);

// PUT /api/books/:id - replace a book resource.
router.put("/:id", booksController.updateById);

// PATCH /api/books/:id - partially update a book resource.
// TODO: Replace this placeholder response with a controller implementation.
router.patch("/:id", (req, res) => {
	res.json(books[0]);
});

// DELETE /api/books/:id - remove a book resource.
router.delete("/:id", booksController.deleteBook);

// Export the configured router so app.js can mount it.
module.exports = router;

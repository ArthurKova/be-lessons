// ctrlWrapper forwards rejected promises and thrown errors to Express error middleware.
// In Express 5, rejected promises from async handlers are forwarded automatically;
// this wrapper remains useful when supporting Express 4 or enforcing one style.
const { ctrlWrapper } = require("../helpers");

// TODO: Import books, HttpError, Joi, and the Joi schema before using these handlers.

// Send the complete in-memory collection as JSON.
const getAll = (req, res) => res.json(books);

// Find a single book by the dynamic :id route parameter.
const getById = (req, res, next) => {
	try {
		const { id } = req.params;
		const result = books.find((book) => book.id === id);

		if (!result) {
			// Throwing a status-aware error lets the central handler build the response.
			throw HttpError(404, "Not Found");
		}

		res.json(result);
	} catch (error) {
		next(error);
	}
};

// Validate the payload, add the new book, and return HTTP 201 Created.
const createBook = (req, res, next) => {
	try {
		// TODO: Joi.ValidationError is an error class, not a validation function.
		// Current Joi usage is: const { error } = bookSchema.validate(req.body).
		const { error } = Joi.ValidationError(req.body);

		if (error) {
			throw HttpError(400, error.message);
		}

		books.push(req.body);
		res.status(201).json(req.body);
	} catch (error) {
		next(error);
	}
};

// Replace the data for the book identified by :id.
const updateById = (req, res) => {
	try {
		// TODO: Validate with bookSchema.validate(req.body), as described above.
		const { error } = Joi.ValidationError(req.body);

		if (error) {
			throw HttpError(400, error.message);
		}

		const { id } = req.params;
		const result = books.find((book) => book.id === id);

		if (!result) {
			throw HttpError(404, "Not Found");
		}

		res.status(200).json(req.body);
	} catch (error) {
		// TODO: Add next to this function's parameters before calling it here.
		next(error);
	}
};

// Delete the book identified by :id.
const deleteBook = (req, res) => {
	try {
		const { id } = req.params;
		const result = books.find((book) => book.id === id);

		if (!result) {
			throw HttpError(404, "Not Found");
		}

		// A successful DELETE commonly returns 204 No Content with no response body.
		// The current response is only a placeholder and does not remove the array item.
		res.json(req.body);
	} catch (error) {
		// TODO: Add next to this function's parameters before calling it here.
		next(error);
	}
};

// Wrapping only getAll demonstrates the wrapper pattern; normally apply one
// consistent error-handling strategy to every asynchronous controller.
module.exports = {
	getAll: ctrlWrapper(getAll),
	getById,
	createBook,
	updateById,
	deleteBook,
};

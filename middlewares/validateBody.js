const { HttpError } = require("../helpers");

// Build reusable middleware for validating req.body against any Joi schema.
const validateBody = (schema) => (req, res, next) => {
	const { error } = schema.validate(req.body);

	if (error) {
		// TODO: Return next(error) here so Express does not receive a second next() call.
		next(HttpError(400, error.message));
	}

	// Continue to the controller only when validation succeeds.
	next();
};

module.exports = validateBody;

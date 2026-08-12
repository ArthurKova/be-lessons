// Create a normal Error enriched with the HTTP status expected by the error handler.
const HttpError = (status, message) => {
	const error = new Error(message);
	error.status = status;
	return error;
};

// Named export: consumers must import it with { HttpError }.
module.exports = {
	HttpError,
};

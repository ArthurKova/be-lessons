// Re-export helpers from one barrel module to simplify imports elsewhere.
const { HttpError } = require("./HttpError");
const ctrlWrapper = require("./ctrlWrapper");

module.exports = {
	HttpError,
	ctrlWrapper,
};

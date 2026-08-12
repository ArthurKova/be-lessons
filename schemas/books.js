const Joi = require("joi");

// Define the accepted JSON shape for creating or fully replacing a book.
const schema = Joi.object({
	title: Joi.string().required(),
	author: Joi.string().required(),
});

// The validation middleware receives and applies this schema to req.body.
module.exports = schema;

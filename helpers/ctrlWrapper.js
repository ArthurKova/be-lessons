// Convert a controller into middleware that forwards sync/async failures to next().
// Express 5 handles rejected async route promises natively; this helper is mainly
// required by Express 4 applications or retained for a uniform controller pattern.
const ctrlWrapper = (ctrl) => async (req, res, next) => {
	try {
		await ctrl(req, res, next);
	} catch (error) {
		next(error);
	}
};

// Default CommonJS export: import this helper without destructuring its own file.
module.exports = ctrlWrapper;

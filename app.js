const express = require("express");
// Moment is a legacy date library in maintenance mode. New projects usually use
// the native Intl/Date APIs or a modern library such as date-fns, Luxon, or Day.js.
const moment = require("moment");
// The promise-based fs API lets this file use await instead of callbacks.
const fs = require("fs/promises");
const cors = require("cors");
const booksRoute = require("./routes/api/books");

// Create the Express application instance.
const app = express();

// Allow requests from other origins. In production, configure the allowed origins.
app.use(cors());
// Parse JSON request bodies and make the parsed value available as req.body.
app.use(express.json());

// Application-level middleware that records every incoming request.
app.use(async (req, res, next) => {
	console.log("Middleware");
	const { method, url } = req;
	const time = moment().format("DD-MM-YYYY_hh:mm:ss");
	await fs.appendFile("./server.log", `\n${method} ${url} ${time}`);
	// Pass control to the next matching middleware or route handler.
	next();
});

// A simple health/home endpoint.
app.get("/", (request, response) => {
	return response.send("<h1>Home Page<h1>");
});

// Mount all book routes under the /api/books URL prefix.
app.use("/api/books", booksRoute);

app.get("/products", (req, res) => {
	res.json([]);
});

// Central Express error handler. Error middleware must have four parameters and
// must be registered after all routes and regular middleware.
app.use((err, req, res, next) => {
	// Use safe defaults for native Error objects that do not contain an HTTP status.
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

// Start accepting HTTP connections on port 3000.
app.listen(3000, () => console.log("Server is running..."));

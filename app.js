const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");
const booksRoute = require("./routes/api/books");

const app = express(); // app

app.use(cors());

app.use(async (req, res, next) => {
	console.log("Middleware");
	const { method, url } = req;
	const time = moment().format("DD-MM-YYYY_hh:mm:ss");
	await fs.appendFile("./server.log", `\n${method} ${url} ${time}`);
	next();
});

app.get("/", (request, response) => {
	return response.send("<h1>Home Page<h1>");
});

app.use("/api/books", booksRoute);

app.get("/products", (req, res) => {
	res.json([]);
});

app.use((req, res) => {
	res.status(404).json({ message: "Not Found" });
});

app.listen(3000, () => console.log("Server is running..."));

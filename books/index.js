const fs = require("fs/promises");

const path = require("path");

const booksPath = path.join(__dirname, "books.json");

const getAll = async () => {
	const data = await fs.readFile(booksPath);
	return JSON.parse(data);
};

const getBookById = async (id) => {
	const books = await getAll();
	const book = books.find((i) => i.id === id);
	return book ?? null;
};

const addBook = async (data) => {
	const books = await getAll();
	const id = String(books.length + 1);
	const newBook = {
		...data,
		id,
	};
	books.push(newBook);
	await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
	return newBook;
};

const updateBook = async (id, data) => {
	const books = await getAll();
	const index = books.findIndex((i) => i.id === id);

	if (index === -1) {
		return null;
	}

	books[index] = { id, ...data };
	await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
	return books[index];
};

const deleteBook = async (id) => {
	const books = await getAll();
	const index = books.findIndex((i) => i.id === id);

	if (index === -1) {
		return null;
	}

	const [result] = books.splice(index, 1);
	await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
	return result;
};

module.exports = {
	getAll,
	getBookById,
	addBook,
	updateBook,
	deleteBook,
};

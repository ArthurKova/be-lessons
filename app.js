const books = require("./books");
const { program } = require("commander");

const invokeAction = async ({ action, id, title, author }) => {
	switch (action) {
		case "read": {
			const data = await books.getAll();
			return console.log(data);
		}
		case "getBookById": {
			const data = await books.getBookById(id);
			return console.log(data);
		}
		case "add": {
			const newBook = await books.addBook({ title, author });
			return console.log(newBook);
		}
		case "updateBookById": {
			const updatedBook = await books.updateBook(id, { author, title });
			return console.log(updatedBook);
		}
		case "deleteBookById": {
			const deletedBook = await books.deleteBook(id);
			return console.log(deletedBook);
		}
		default: {
			return console.log("Unknown action");
		}
	}
};

// invokeAction({ action: "read" });
// invokeAction({ action: "getById", id: "2" });
// invokeAction({ action: "add", author: "Bruce Lee", title: "Kung-Fu Panda" });
// invokeAction({
// 	action: "updateBookById",
// 	id: "9",
// 	author: "Bruce Lee",
// 	title: "Art of War",
// });
// invokeAction({ action: "deleteBookById", id: "9" });

// const actionIndex = process.argv.indexOf("--action");

// if (actionIndex !== -1) {
// 	const action = process.argv[actionIndex + 1];
// 	invokeAction({ action });
// }

// const arr = hideBin(process.argv)
// const { argv } = yargs(arr)
program
	.option("--action <type>")
	.option("--id <type>")
	.option("--title <type>")
	.option("--author <type>");

program.parse();
const options = program.opts();

invokeAction({ ...options });

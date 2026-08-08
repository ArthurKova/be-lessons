// const fs = require("fs");

// fs.readFile("./file/file.txt", (error, data) => {
// 	console.log(error);
// 	console.log(data);
// });

const fs = require("fs/promises");

// fs.readFile("./files/file/file.txt")
// 	.then((data) => console.log(data.toString()))
// 	.catch((error) => console.log(error));

/** Reads the text file as UTF-8 and prints its contents. */
const dataOperations = async () => {
	// const buffer = await fs.readFile("./files/file/file.txt");
	const buffer = await fs.readFile("./files/file/file.txt", "utf-8");
	// console.log(buffer.toString());
	console.log(buffer);
};

// dataOperations();

/** Appends a value to the end of the text file. */
const addOperation = async (value) => {
	await fs.appendFile("./files/file/file.txt", value);
};

// addOperation("Added text");

/** Appends a value to the end of the text file on a new line. */
const fromNewStringOperation = async (value) => {
	await fs.appendFile("./files/file/file.txt", `\n${value}`);
};

// fromNewStringOperation("Added at the beginning");

/** Replaces the entire contents of the text file with a new value. */
const replaceOperation = async (value) => {
	await fs.writeFile("./files/file/file.txt", value);
};

// replaceOperation("New value");

/** Reads the text file and handles a possible file-system error. */
const readOperation = async () => {
	try {
		const data = await fs.readFile(path, "utf-8");
		console.log(data);
	} catch (error) {
		console.error("Cant read the file", error.message);
	}
};

/** Adds a value at the beginning of the text file. */
const prependOperation = async (value) => {
	const oldContent = await fs.readFile(path, "utf-8");
	await fs.writeFile(path, `${value}\n${oldContent}`);
};

/** Replaces every occurrence of one string with another in the text file. */
const replaceTextOperation = async (from, to) => {
	const content = await fs.readFile(path, "utf-8");
	const updatedContent = content.replaceAll(from, to);

	await fs.writeFile(path, updatedContent);
};

/** Checks whether the target file is accessible. */
const checkFileOperation = async () => {
	try {
		await fs.access(path);
		console.log("File exist");
	} catch {
		console.log("File not found");
	}
};

/** Demonstrates creating, listing, copying, renaming, and deleting files. */
const extraFoo = async () => {
	await fs.mkdir("./files/result", { recursive: true });
	await fs.writeFile("./files/result/report.txt", "Report");

	const files = await fs.readdir("./files");
	console.log(files);

	await fs.copyFile(path, "./files/file/copy.txt");
	await fs.rename("./files/file/copy.txt", "./files/file/renamed.txt");

	await fs.unlink("./files/file/renamed.txt");
};

/** Writes JavaScript data as JSON, then reads and parses it back. */
const workiWithJson = async () => {
	const users = [
		{ id: 1, name: "Alex" },
		{ id: 2, name: "Anna" },
	];

	await fs.writeFile("./files/users.json", JSON.stringify(users, null, 2));

	const json = await fs.readFile("./files/users.json", "utf-8");
	const parsedUsers = JSON.parse(json);

	console.log(parsedUsers);
};

const path = require("path");

const filePath = path.join(__dirname, "file", "file.txt");

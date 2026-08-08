import { getCurrentMonth, getCurrentYear } from "./date/index.mjs";
import users from "./users.mjs";

const { admins } = users;
const currentYear = getCurrentYear();
const month = getCurrentMonth();

console.log("Hello World with Nodemon", admins, {
	currentYear,
	month,
});

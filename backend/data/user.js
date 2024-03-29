const bcrypt = require("bcryptjs");

const users = [
	{
		name: "Admin User",
		email: "admin@email.com",
		password: bcrypt.hashSync("12345", 10),
		isAdmin: true,
	},
	{
		name: "Mach Krie",
		email: "mach@email.com",
		password: bcrypt.hashSync("12345", 10),
		isAdmin: false,
	},
	{
		name: "Karo Pain",
		email: "karo@email.com",
		password: bcrypt.hashSync("12345", 10),
		isAdmin: false,
	},
];
module.exports = users;

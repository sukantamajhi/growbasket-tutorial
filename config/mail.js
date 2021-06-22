const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config("../.env");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.Mail_Username,
		pass: process.env.Mail_Password,
	},

});

module.exports = transporter;

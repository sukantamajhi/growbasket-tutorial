const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "Enter your gmail id",
		pass: "Enter your password",
	},
});

module.exports = transporter;

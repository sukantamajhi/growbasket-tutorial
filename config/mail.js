const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'majhisukanta48@gmail.com',
		pass: 'my name is khan',
	},
});

module.exports = transporter;

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'majhisukanta48@gmail.com',
		pass: ''
	},
});

module.exports = transporter;

const express = require('express');
const mySql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { forwardAuthenticated } = require('../config/auth');
const con = require('../config/db');
const router = express.Router();

const app = express();

let sess;

router.get('/login', (req, res) => {
	res.render('login', { title: 'Login', name: 'account' });
});

router.get('/signup', (req, res) => {
	res.render('regist', { title: 'Signup', name: 'account' });
});
// router.get('/signup')
router.post('/account', (req, res) => {
	const {
		username,
		firstName,
		lastName,
		email,
		password,
		cpassword,
	} = req.body;

	// req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	// req.checkBody(
	// 	'username',
	// 	'Username must be between 4-15 characters long.'
	// ).len(4, 15);
	// req.checkBody(
	// 	'email',
	// 	'The email you entered is invalid, please try again.'
	// ).isEmail();
	// req.checkBody(
	// 	'email',
	// 	'Email address must be between 4-100 characters long, please try again.'
	// ).len(4, 100);
	// req.checkBody(
	// 	'password',
	// 	'Password must be between 8-100 characters long.'
	// ).len(8, 100);
	// req.checkBody(
	// 	'password',
	// 	'Password must include one lowercase character, one uppercase character, a number, and a special character.'
	// ).matches(
	// 	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,
	// 	'i'
	// );
	// req.checkBody(
	// 	'passwordMatch',
	// 	'Password must be between 8-100 characters long.'
	// ).len(8, 100);
	// req.checkBody(
	// 	'passwordMatch',
	// 	'Passwords do not match, please try again.'
	// ).equals(req.body.password);

	sess = req.session;
	sess.email = email;

	if (username == '') {
		alert('Username cannot be empty');
	}
	if (password !== cpassword) {
		alert('password does not match');
	} else {
		let sql =
			"insert into user values ( NULL,'" +
			username +
			"',  '" +
			firstName +
			"', '" +
			lastName +
			"', '" +
			email +
			"','" +
			password +
			"' )";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log('1 record inserted');
		});
	}
	req.session.save(function (err) {
		if (err) {
			console.log(err);
		}
	});
	res.end('done');
});

router.post('/login', (req, res) => {
	// console.log(req.body);
	const { username, password } = req.body;
	let sql =
		"select * from users where username = '" +
		username +
		"' and password = '" +
		password +
		"'";
	con.query(sql, function (err, result) {
		if (err) {
			res.redirect('/signup');
		} else {
			res.redirect('/');
		}
	});
	req.session.save(function (err) {
		if (err) {
			console.log(err);
		}
	});
});

router.get('/logout', (req, res) => {
	res.send('logout successfull');
	req.session.destroy(function (err) {
		console.log(err);
		// cannot access session here
	});
});

module.exports = router;

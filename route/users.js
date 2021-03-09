const express = require('express');
const mySql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { forwardAuthenticated } = require('../config/auth');
const con = require('../config/db');
const router = express.Router();

app = express();

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

	req.checkbo

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
});

module.exports = router;

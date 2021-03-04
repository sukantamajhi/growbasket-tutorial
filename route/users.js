const express = require('express');
const mySql = require('mysql');
const passport = require('passport');
localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { forwardAuthenticated } = require('../config/auth');
const con = require('../config/db');
const router = express.Router();

app = express();

router.get('/login', (req, res) => {
	res.render('login', { title: 'Login', name: 'account' });
});

router.get('/signup', (req, res) => {
	res.render('regist', { title: 'Signup', name: 'account' });
});
router.post('/account', (req, res) => {
	const {
		username,
		firstName,
		lastName,
		email,
		password,
		cpassword,
	} = req.body;

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
		res.redirect('/users/' + username);
	}
});

module.exports = router;

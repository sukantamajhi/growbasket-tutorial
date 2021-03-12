const express = require('express');
const mySql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcryptjs');
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
router.post('/account', async (req, res) => {
	const {
		username,
		firstName,
		lastName,
		email,
		password,
		cpassword,
	} = req.body;

	let hashedPassword = await bcrypt.hash(password, 8);

	if (
		!username ||
		!firstName ||
		!lastName ||
		!email ||
		!password ||
		!cpassword
	) {
		return res.render('regist', {
			message: 'Fields cannot be empty',
			title: 'Signup',
			name: 'account',
		});
	} else if (password !== cpassword) {
		return res.render('regist', {
			message: 'Password is not matching',
			title: 'Signup',
			name: 'account',
		});
	} else if (password.length < 4) {
		return res.render('regist', {
			message: 'Password length cannot be less than 4',
			title: 'Signup',
			name: 'account',
		});
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
		con.query(sql, async function (err, result) {
			if (err) throw err;
			console.log('Record inserted');
		});
		return res.render('regist', {
			message: 'Your form has been submitted successfully',
			title: 'Signup',
			name: 'account',
		});
	}
});

router.post('/login', (req, res) => {
	console.log(req.body);
	const { username, password } = req.body;

	if (!username || !password) {
		return res.render('login', {
			message: 'Field cannot be empty',
			title: 'Login',
			name: 'account',
		});
	}

	let sql =
		"select * from user where username = '" +
		username +
		"' and password = '" +
		password +
		"' ;";
	console.log(sql);
	con.query(sql, function (err, result) {
		console.log(result);
		if (result.length > 0) {
			console.log('User found');
			return res.render('login', {
				message: 'User found',
				title: 'Login',
				name: 'account',
			});
		} else {
			console.log('user not found');
			console.log('result');
			// res.redirect('/');
			return res.render('login', {
				message: 'Email or password is wrong',
				title: 'Login',
				name: 'account',
			});
		}
	});
});

module.exports = router;

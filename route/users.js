const express = require('express');
const mySql = require('mysql');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const con = require('../config/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const router = express.Router();

const app = express();

router.use(
	session({ secret: 'secret', resave: true, saveUninitialized: true })
); //Session setup

router.get('/login', (req, res) => {
	if (req.cookies.jwt === undefined) {
		res.render('login', { title: 'Login', css: 'account' });
	} else {
		res.redirect('/dashboard');
	}
});

router.get('/signup', (req, res) => {
	if (req.cookies.jwt !== undefined) {
		res.redirect('/dashboard');
	} else {
		res.render('regist', { title: 'Signup', css: 'account' });
	}
});
// router.get('/signup')
router.post('/account', (req, res) => {
	// console.log(req.body);
	let cookie = req.cookies.jwt;
	if (cookie !== undefined) {
		res.redirect('/');
	} else {
		const {
			username,
			firstName,
			lastName,
			email,
			password,
			cpassword,
		} = req.body;

		let sql =
			"select * from user where username = '" +
			username +
			"' or email = '" +
			email +
			"'";

		con.query(sql, (err, result) => {
			if (result.length > 0) {
				return res.render('regist', {
					message: 'user already exists',
					title: 'Signup',
					css: 'account',
				});
			} else {
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
						css: 'account',
					});
				} else if (password !== cpassword) {
					return res.render('regist', {
						message: 'Password is not matching',
						title: 'Signup',
						css: 'account',
					});
				} else if (password.length < 4) {
					return res.render('regist', {
						message: 'Password length cannot be less than 4',
						title: 'Signup',
						css: 'account',
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

					const id = con.query(sql, async function (err, result) {
						if (err) throw err;
						// console.log('Record inserted');
					});
					res.redirect('/users/login');
				}
			}
		});
	}
});

router.post('/login', (req, res) => {
	// console.log(req.body);
	const { username, password } = req.body;

	if (!username || !password) {
		return res.render('login', {
			message: 'Field cannot be empty',
			title: 'Login',
			css: 'account',
		});
	}

	let sql =
		"select * from user where username = '" +
		escape(username) +
		"' and password = '" +
		escape(password) +
		"' ;";
	con.query(sql, function (err, result) {
		// console.log(result);
		if (result.length > 0) {
			// console.log(typeof req.body.username);
			const id = result[0].id;
			// const username = result[0].username;

			let users = {
				id: id,
				name: req.body.username,
			};

			req.session.loggedIn = true;
			req.session.username = username;
			const token = jwt.sign({ id }, process.env.JWT_TOKEN, {
				expiresIn: process.env.JWT_EXPIRES_IN,
			});

			// console.log('JWT token is: ', token);

			const cookieOptions = {
				expires: new Date(
					Date.now() +
						process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
				),
				httpOnly: true,
			};
			res.cookie('jwt', token, cookieOptions);
			res.cookie('userData', users);

			res.status(200).redirect('/');
		} else {
			return res.render('login', {
				message: 'Email or password is wrong',
				title: 'Login',
				css: 'account',
			});
		}
	});
});

module.exports = router;

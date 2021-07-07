const express = require("express");
const mySql = require("mysql");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const con = require("../config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const router = express.Router();
const url = require("url");
const e = require("connect-flash");
// const { url } = require("inspector");

const app = express();

router.get("/login", (req, res) => {
	if (req.cookies.jwt === undefined) {
		res.render("login", { title: "Login", css: "login" });
	} else {
		res.clearCookie("url");
		res.redirect("back");
	}
});

router.get("/signup", (req, res) => {
	if (req.cookies.jwt !== undefined) {
		res.redirect("/dashboard");
	} else {
		res.render("regist", { title: "Signup", css: "account" });
	}
});
// router.get('/signup')
router.post("/account", (req, res) => {
	// console.log(req.body);
	let cookie = req.cookies.jwt;
	const saltRounds = 10;
	if (cookie !== undefined) {
		res.redirect("/");
	} else {
		const { username, firstName, lastName, email, password, cpassword } =
			req.body;

		let sql =
			"select * from user where username = '" +
			escape(username) +
			"' or email = '" +
			escape(email) +
			"'";

		con.query(sql, (err, result) => {
			if (result.length > 0) {
				return res.render("regist", {
					message: "username or email is not available",
					title: "Signup",
					css: "account",
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
					return res.render("regist", {
						message: "Fields cannot be empty",
						title: "Signup",
						css: "account",
					});
				} else if (username.length < 6) {
					return res.render("regist", {
						message: "Username cannot be less than 6",
						title: "Signup",
						css: "account",
					});
				} else if (password !== cpassword) {
					return res.render("regist", {
						message: "Password is not matching",
						title: "Signup",
						css: "account",
					});
				} else if (password.length < 5) {
					return res.render("regist", {
						message: "Password length cannot be less than 4",
						title: "Signup",
						css: "account",
					});
				} else if (password.length > 8) {
					return res.render("regist", {
						message: "Password length cannot be more than 8",
						title: "Signup",
						css: "account",
					});
				} else {
					bcrypt.hash(password, saltRounds, function (err, hash) {
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
							hash +
							"' )";

						const id = con.query(sql, function (err, result) {
							if (err) throw err;

							// console.log('Record inserted');
						});

						let userDetails = {
							username: username,
							name: firstName + lastName,
							email: email,
							password: password,
						};

						const cookieOptions = {
							expires: new Date(
								Date.now() +
									process.env.COOKIE_EXPIRES_IN *
										24 *
										60 *
										60 *
										1000
							),
							httpOnly: true,
						};

						res.cookie("userDetails", userDetails, cookieOptions);
						res.redirect("/login");
					});
				}
			}
		});
	}
});

router.post("/login", (req, res, next) => {
	// console.log(req.body);
	const { username, password } = req.body;

	if (!username || !password) {
		return res.render("login", {
			message: "Field cannot be empty",
			title: "Login",
			css: "account",
		});
	}

	let sql =
		"select * from user where username = '" + escape(username) + "'  ";
	con.query(sql, (err, result) => {
		let newPassword = result[0].password;
		console.log(newPassword)
		bcrypt.compare(password, newPassword, (err, hashPassword) => {
			if (err) throw err;
			if (hashPassword === true) {
				const id = result[0].id;
				// const username = result[0].username;

				let users = {
					id: id,
					name: req.body.username,
				};

				const token = jwt.sign({ id }, process.env.JWT_TOKEN, {
					expiresIn: process.env.JWT_EXPIRES_IN,
				});

				const cookieOptions = {
					expires: new Date(
						Date.now() +
							process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
					),
					httpOnly: true,
				};
				res.cookie("jwt", token, cookieOptions);
				res.cookie("userData", users, cookieOptions);
				if (req.cookies.prev_url) {
					res.clearCookie("prev_url");
					res.status(200).redirect(`${req.cookies.prev_url}`);
				} else {
					res.status(200).redirect("/");
				}
				// res.status(200).redirect("/");
			} else {
				return res.render("login", {
					message: "Email or password is wrong",
					title: "Login",
					css: "account",
				});
			}
		});
	});
});

module.exports = router;

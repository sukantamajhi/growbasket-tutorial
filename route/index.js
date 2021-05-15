const express = require("express");
const { Result } = require("express-validator");
const pool = require("../config/db");
const { route } = require("./product");
const mail = require("../config/mail");
const { getMaxListeners } = require("../config/db");
const router = express.Router();

router.get("/", (req, res) => {
	let sql = "select * from products limit 0,8";

	pool.query(sql, (err, result) => {
		res.render("index", {
			title: "Welcome to growbasket",
			css: "index",
			result: result,
		});
	});
});
router.get("/index.html", (req, res) => {
	res.redirect("/");
});
router.get("/product", (req, res) => {
	pool.query("select * from products", (err, result) => {
		if (err) throw err;
		res.render("product", {
			title: "products 🥝",
			css: "product",
			result: result,
		});
	});
});
router.get("/about", (req, res) => {
	res.render("about", { title: "About Us", css: "about" });
});
router.get("/contact", (req, res) => {
	if (req.cookies.jwt) {
		res.render("contact", {
			title: "Contact Us",
			css: "contact",
		});
	} else {
		res.redirect("/users/login");
	}

	// res.cookie;
});
router.post("/contactus", (req, res) => {
	const { email, message } = req.body;
	let sql =
		"insert into contact values (NULL,'" +
		req.cookies.userData.name +
		"','" +
		email +
		"','" +
		message +
		"')";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		let mailOptions = {
			from: "admin@growbasket.in",
			to: email,
			subject: "Thank you for contcting us",
			html:
				"Hello " +
				req.cookies.userData.name +
				". Welcome to GrowBasket. Thank you for contacting us. We are trying to figure out what We can do",
		};
		let toMe = {
			from: "admin@growbasket.in",
			to: "majhisukanta48@gmail.com",
			subject: "Contact Message",
			html:
				"<h2>Name: " +
				req.cookies.userData.name +
				"</h2> <h2>Email: " +
				email +
				"</h2> <h2>Message: " +
				message +
				"</h2>",
		};
		mail.sendMail(mailOptions, (err, info) => {
			if (err) throw err;
			console.log("Email sent to user");
		});
		mail.sendMail(toMe, (err, info) => {
			if (err) throw err;
			console.log("Message sent to admin");
		});
		res.render("contact", {
			title: "Contact Us",
			css: "contact",
			msg: "Message successfully sent",
		});
		// res.redirect('/contact');
	});
});
router.get("/terms-and-conditions", (req, res) => {
	res.render("toc", { title: "Terms and Conditions" });
});
router.get("/account", (req, res) => {
	let cookie = req.cookies.jwt;

	if (cookie !== undefined) {
		res.redirect("/dashboard");
	} else {
		res.redirect("/users/login");
	}
});
router.get("/dashboard", (req, res) => {
	let cookie = req.cookies.jwt;
	let cookie1 = req.cookies.userData;
	if (cookie) {
		res.render("dashboard", {
			title: "Dashboard",
			msg: "dashboard",
			name: cookie1.name,
		});
	} else {
		res.redirect("/");
	}
});
router.get("/logout", (req, res) => {
	res.clearCookie("jwt");
	res.clearCookie("userData");
	res.clearCookie("userDetails");
	// res.send('User logout successfully');
	res.redirect("/");
});
router.get("/login", (req, res) => {
	res.redirect("/users/login");
});
router.get("/signup", (req, res) => {
	res.redirect("/users/signup");
});
router.get("/addlist", (req, res) => {
	let sql =
		"select * from products where username = '" +
		req.cookies.userData.name +
		"'";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		return res.render("userproduct", {
			title: "my product",
			css: "product",
			result,
		});
	});
});
router.get("/:id/edit", (req, res) => {
	pool.query(
		"select * from products where id = '" + req.params.id + "'",
		(err, result) => {
			if (err) throw err;
			res.render("productedit", {
				title: "Edit Your Product",
				css: "sell",
				result: result,
			});
		}
	);
});
router.get("/404.html", (req, res) => {
	res.status(404).render("404", {
		title: "Ooopsss...Page Not Found",
		css: "404",
	});
});

router.get("/search", (req, res) => {
	let prod = req.query.search;
	let sql = 'select * from products where product_name like "%' + prod + '%"';
	pool.query(sql, function (err, result, fields) {
		if (err) throw err;
		let list = result.length;
		if (result.length > 0) {
			res.render("searchproductlist", {
				result: result,
				msg: "Showing " + list + " items",
				css: "product",
			});
		} else {
			res.render("searchproductlist", {
				msg: "Search item not found. ",
				css: "product",
			});
		}
	});
});

router.get("/wishlist", (req, res) => {
	let sql = "select * from wishlist";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		res.render("wishlist", {
			result: result,
		});
	});
});

module.exports = router;

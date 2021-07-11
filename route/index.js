const express = require("express");
const { Result } = require("express-validator");
const pool = require("../config/db");
const { route } = require("./product");
const mail = require("../config/mail");
const { getMaxListeners } = require("../config/db");
const router = express.Router();
const url = require("url");

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
		// result = []
		if (result.length > 0) {
			res.render("product", {
				title: "products",
				css: "product",
				result: result,
			});
		} else {
			res.render("product", {
				title: "products",
				css: "product",
				msg: "No Data Found",
				result: result,
			});
		}
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
		res.cookie("prev_url", "/contact");
		res.redirect("/login");
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
			subject: "Thank you for contacting us",
			html: `Hello ${req.cookies.userData.name}. Welcome to GrowBasket. Thank you for contacting us. We are trying to figure out what We can do`,
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
		});
		mail.sendMail(toMe, (err, info) => {
			if (err) throw err;
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
		res.redirect("/login");
	}
});
router.get("/dashboard", (req, res) => {
	let cookie = req.cookies.jwt;
	let cookie1 = req.cookies.userData;
	if (cookie) {
		res.render("dashboard", {
			title: "Dashboard",
			msg: "dashboard",
			css: "dashboard",
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
// router.get("/login", (req, res) => {
// 	res.redirect("/users/login");
// });
// router.get("/signup", (req, res) => {
// 	res.redirect("/users/signup");
// });
router.get("/addlist", (req, res) => {
	let sql =
		"select * from products where username = '" +
		req.cookies.userData.name +
		"'";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			res.render("userproduct", {
				title: "my product",
				css: "wishlist",
				result,
			});
		} else {
			res.render("userproduct", {
				title: "my product",
				css: "wishlist",
				msg: "You have not added any product yet",
				result,
			});
		}
	});
});

router.get("/delete/:id", (req, res) => {
	let sql = "delete from products where id='" + req.params.id + "'";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		res.redirect("/addlist");
	});
});

router.get("/sell", (req, res) => {
	let cookie = req.cookies.jwt;
	let cookie1 = req.cookies.userData;
	if (cookie !== undefined && cookie1 !== undefined) {
		let uname = cookie1.name;

		res.render("product_entry", {
			title: "ProductEntry Us",
			css: "sell",
			uname: uname,
		});
	} else {
		res.cookie("prev_url", "/sell");
		res.redirect("/login");
		// res.redirect('back');
	}
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
	if (prod.length > 0) {
		let sql =
			'select * from products where product_name like "%' + prod + '%"';
		pool.query(sql, function (err, result, fields) {
			if (err) throw err;
			let list = result.length;
			if (result.length > 0) {
				res.render("searchproductlist", {
					result: result,
					msg: "Showing " + list + " items",
					css: "product",
					check: "Check All Products",
				});
			} else {
				res.render("searchproductlist", {
					msg: "Search Item Not Available. ",
					css: "product",
					check: "Check All Products",
				});
			}
		});
	} else {
		res.redirect("/product");
	}
});

router.get("/wishlist", (req, res) => {
	if (req.cookies.userData) {
		let sql =
			"select * from wishlist where username = '" +
			req.cookies.userData.name +
			"'";
		pool.query(sql, (err, result) => {
			if (err) throw err;
			if (result.length > 0) {
				res.render("wishlist", {
					result: result,
					css: "wishlist",
				});
			} else {
				res.render("wishlist", {
					css: "wishlist",
					msg: "No Data Found",
				});
			}
		});
	} else {
		res.cookie("prev_url", "/wishlist");
		res.redirect("/login");
	}
});
router.get("/privacy", (req, res) => {
	res.render("privacy", { title: "privacy" });
});
router.get("/add-coupons", (req, res) => {
	res.render("addcoupons", { title: "Add Coupons", css: "addcoupons" });
});
router.post("/addcoupon", (req, res) => {
	let authenticate = req.cookies.jwt;
	let userName = req.cookies.userData.name;
	console.log(req.body);
	const { discount_percent, promo_code, expiry_date, about_coupons } =
		req.body;

	let sql =
		'insert into coupons values (NULL,"' +
		userName +
		'", "' +
		discount_percent +
		'", "' +
		promo_code +
		'", "' +
		about_coupons +
		'", "' +
		expiry_date +
		'")';
	console.log(sql);
	pool.query(sql, (err, result) => {
		if (err) throw err;
		else {
			res.redirect("/coupons");
		}
	});
});
router.get("/coupons", (req, res) => {
	let sql =
		"select * from coupons where username='" +
		req.cookies.userData.name +
		"'";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			res.status(200).render("coupons", {
				title: "Coupons",
				css: "coupons",
				result,
			});
		} else {
			res.render("coupons", {
				title: "Coupons",
				css: "coupons",
				result,
				msg: "No Coupons Available",
			});
		}
	});
});
router.get("/all-coupons", (req, res) => {
	let sql = "select * from coupons";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			res.render("coupons", { title: "Coupons", css: "coupons", result });
		} else {
			res.render("coupons", {
				title: "Coupons",
				css: "coupons",
				result,
				msg: "No Coupons Available",
			});
		}
	});
});

router.get("/delete-coupons/:id", (req, res) => {
	let sql = "delete from coupons where id='" + req.params.id + "'";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		res.redirect("/coupons");
	});
});

router.get("/edit-coupons/:id", (req, res) => {
	let uname = req.cookies.userData.name;
	let sql = "select * from coupons where id = '" + req.params.id + "'";
	pool.query(sql, (err, result) => {
		res.render("editcoupon", {
			title: "Edit Coupon",
			css: "addcoupons",
			result,
		});
	});
});

router.post("/editcoupon", (req, res) => {
	const { discount_percent, promo_code, expiry_date, about_coupons } =
		req.body;
	let sql =
		"update coupons set discount_percent = '" +
		discount_percent +
		"',promo_code='" +
		promo_code +
		"',expiry_date= '" +
		expiry_date +
		"', about_coupons='" +
		about_coupons +
		"'";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		res.redirect('/coupons')
	})
});

module.exports = router;

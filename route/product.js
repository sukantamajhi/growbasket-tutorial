const { json } = require('body-parser');
const express = require('express');
const mySql = require('mysql');
const con = require('../config/db');
const router = express.Router();

app = express();

con.connect((err) => {});

router.get('/sell', (req, res) => {
	let cookie = req.cookies.jwt;
	let cookie1 = req.cookies.userData;
	if (cookie !== undefined && cookie1 !== undefined) {
		let uname = cookie1.name;

		res.render('product_entry', {
			title: 'ProductEntry Us',
			css: 'sell',
			uname: uname,
		});
	} else {
		res.redirect('/users/login');
		// res.redirect('back');
	}
});
router.post('/sell', (req, res) => {
	// console.log(req.body);
	username = req.cookies.userData.name;
	const { product__name, imgsrc, price, redirect__link } = req.body;

	if (
		username === '' ||
		product__name === '' ||
		imgsrc === '' ||
		price === '' ||
		isNaN(price) ||
		redirect__link === ''
	) {
	} else {
		let sql =
			"insert into products values ( NULL,'" +
			username +
			"','" +
			product__name +
			"','" +
			imgsrc +
			"'," +
			price +
			",'" +
			redirect__link +
			"' )";

		con.query(sql, (err, result) => {
			if (err) throw err;
			console.log('1 row inserted');
		});
	}

	res.redirect('/product');
});

router.post('/:id/update', (req, res) => {
	// console.log(req.body);
	const { imgsrc, product__name, price, redirect__link } = req.body;
	let sql =
		"update products set product_link = '" +
		imgsrc +
		"',product_name = '" +
		product__name +
		"',price = '" +
		price +
		"',redirect_link = '" +
		redirect__link +
		"' where id='" +
		req.params.id +
		"'";
	con.query(sql, (err, result) => {
		if (err) throw err;
		res.redirect('/addlist');
	});
});
router.get('/:id/:product_name', (req, res) => {
	// let name = req.params.product__name;
	// console.log(name);
	let sql =
		"select * from products where id = '" +
		req.params.id +
		"'and product_name = '" +
		req.params.product_name +
		"'";
	// console.log(sql);
	con.query(sql, (err, result) => {
		if (err) throw err;
		// console.log(result.product__name);

		res.render('product', {
			// title: name,
			result: result,
		});
	});
});
router.get('/wishlist/:id/:product_name', (req, res) => {
	let sql =
		"select * from products where id = '" +
		req.params.id +
		"' and product_name='" +
		req.params.product_name +
		"'";
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result.length);
		if (result.length > 0) {
			res.redirect('/product');
			return false;
		} else if (req.cookies.jwt && req.cookies.userData) {
			let newResult = JSON.stringify(result);
			let result1 = JSON.parse(newResult);
			let wishlist =
				"insert into wishlist(id, username, product_name, product_image, price,redirect_link) values ('" +
				req.params.id +
				"','" +
				req.cookies.userData.name +
				"','" +
				req.params.product_name +
				"','" +
				result1[0].product_link +
				"','" +
				result1[0].price +
				"','" +
				result1[0].redirect_link +
				"')";
			// console.log(wishlist);
			con.query(wishlist, (err, rows) => {
				// console.log(rows);
				if (err) throw err;
				res.redirect('/wishlist');
			});
		} else {
			res.status(307).redirect('/');
		}
	});
});
router.get('/delete/:id/:product_name', (req, res) => {
	let sql =
		'DELETE FROM `wishlist` WHERE id = "' +
		req.params.id +
		'" and product_name = "' +
		req.params.product_name +
		'"';
	con.query(sql, (err, result) => {
		if (err) throw err;
		res.redirect('/wishlist');
	});
});
module.exports = router;

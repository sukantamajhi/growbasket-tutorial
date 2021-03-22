const express = require('express');
const mySql = require('mysql');
const con = require('../config/db');
const router = express.Router();

app = express();

con.connect((err) => {});

router.get('/sell', (req, res) => {
	let cookie = req.cookies.jwt;
	let cookie1 = req.cookies.userData;
	let uname = cookie1.name;

	// console.log(uname);

	if (cookie !== undefined && cookie1 !== undefined) {
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

module.exports = router;

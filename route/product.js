const express = require('express');
const jsAlert = require('js-alert');
const mySql = require('mysql');
const con = require( '../config/db' );
const router = express.Router();

app = express();

con.connect((err) => {});

router.get('/sell', (req, res) => {
	res.render('product_entry', { title: 'ProductEntry Us', name: 'sell' });
});
router.post('/sell', (req, res) => {
	const { product__name, imgsrc, price, redirect__link } = req.body;

	if (
		product__name === '' ||
		imgsrc === '' ||
		price === '' ||
		isNaN(price) ||
		redirect__link === ''
	) {
	} else {
		let sql =
			"insert into products values ( NULL,'" +
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

	res.redirect('/product/sell');
});

module.exports = router;

const express = require('express');
const pool = require('../config/db');
const { route } = require('./product');
const router = express.Router();

router.get('/', (req, res) => {
	// console.log(req.cookies.jwt);
	// console.log(req.headers.referer);

	res.render('index', {
		title: 'Welcome to growbasket',
		css: 'index',
	});
});
router.get('/index.html', (req, res) => {
	res.redirect('/');
});
router.get('/product', (req, res) => {
	pool.query('select * from products', (err, result) => {
		if (err) throw err;
		res.render('product', {
			title: 'products 🥝',
			css: 'product',
			result: result,
		});
	});
});
router.get('/about', (req, res) => {
	res.render('about', { title: 'About Us', css: 'about' });
});
router.get('/contact', (req, res) => {
	if (req.cookies.jwt) {
		res.render('contact', {
			title: 'Contact Us',
			css: 'contact',
		});
	} else {
		res.redirect('/users/login');
	}

	// res.cookie;
});
router.post('/contactus', (req, res) => {
	// console.log(req.body);
	const { email, msg } = req.body;
	let sql =
		"insert into contact values (NULL,'" +
		req.cookies.userData.name +
		"','" +
		email +
		"','" +
		msg +
		"')";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		res.render('contact', {
			title: 'Contact Us',
			css: 'contact',
			msg: 'Message successfully sent',
		});
	});
});
router.get('/terms-and-conditions', (req, res) => {
	res.render('toc', { title: 'Terms and Conditions' });
});
router.get('/account', (req, res) => {
	let cookie = req.cookies.jwt;

	if (cookie !== undefined) {
		res.redirect('/dashboard');
	} else {
		res.redirect('/users/login');
	}
});
router.get('/dashboard', (req, res) => {
	let cookie = req.cookies.jwt;
	let cookie1 = req.cookies.userData;
	if (cookie) {
		res.render('dashboard', {
			title: 'Dashboard',
			msg: 'dashboard',
			name: cookie1.name,
		});
	} else {
		res.redirect('/');
	}
});
router.get('/logout', (req, res) => {
	res.clearCookie('jwt');
	res.clearCookie('userData');
	// res.send('User logout successfully');
	res.redirect('/');
});
router.get('/login', (req, res) => {
	res.redirect('/users/login');
});
router.get('/signup', (req, res) => {
	res.redirect('/users/signup');
});
router.get('/addlist', (req, res) => {
	let sql =
		"select * from products where username = '" +
		req.cookies.userData.name +
		"'";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		return res.render('userproduct', {
			title: 'my product',
			css: 'product',
			result,
		});
	});
});
router.get('/:id/edit', (req, res) => {
	pool.query(
		"select * from products where id = '" + req.params.id + "'",
		(err, result) => {
			if (err) throw err;
			res.render('productedit', {
				title: 'Edit Your Product',
				css: 'sell',
				result: result,
			});
		}
	);
});
router.get('/404.html', (req, res) => {
	res.status(404).render('404', {
		title: 'Ooopsss...Page Not Found',
		css: '404',
	});
});
// router.get( '/wishlist', ( req, res ) => {
// 	if ( req.cookies.jwt )

// });

router.get('/search', (req, res) => {
	let sql =
		'select * from products where product_name like "%' +
		req.query.search +
		'%"';
	console.log(sql);
	pool.query(sql, function (err, result) {
		if (err) throw err;
		res.render('product', {
			result: result,
		});
	});
});

module.exports = router;

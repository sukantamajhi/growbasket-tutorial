const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Welcome to growbasket',
		name: 'index',
	});

	// let cookie = req.cookies.jwt;
	// res.send(req.cookies);
});
router.get('/index.html', (req, res) => {
	res.redirect('/');
});
router.get('/product', (req, res) => {
	pool.query('select * from products', (err, result) => {
		if (err) throw err;
		res.render('product', {
			title: 'products 🥝',
			name: 'product',
			result: result,
		});
	});
});
router.get('/about', (req, res) => {
	res.render('about', { title: 'About Us' });
});
router.get('/contact', (req, res) => {
	res.render('contact', { title: 'Contact Us', msg: 'Contact us' });
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
	// let sql = 'select * from user where name =  ';
	if (cookie !== undefined) {
		let username = req.cookies.username;
		res.render('dashboard', {
			title: 'Dashboard',
			msg: 'dashboard',
		});
	} else {
		res.redirect('/');
	}
});
router.get('/logout', (req, res) => {
	res.clearCookie('jwt');
	// res.send('User logout successfully');
	res.redirect('/');
});
router.get('/login', (req, res) => {
	res.redirect('/users/login');
});
router.get('/signup', (req, res) => {
	res.redirect('/users/signup');
});
router.get('/404.html', (req, res) => {
	res.render('404', { title: 'Ooopsss...Page Not Found', name: '404' });
});

module.exports = router;

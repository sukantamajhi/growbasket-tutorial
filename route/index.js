const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Welcome to growbasket',
		name: 'index',
	});
});
router.get('/index.html', (req, res) => {
	res.redirect('/');
});
router.get('/product', (req, res) => {
	res.render('product', { title: 'products 🥝', name: 'product' });
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
router.get('/dashboard', (req, res) => {
	res.render('dashboard', { title: 'Dashboard', msg: 'dashboard' });
});
router.get('/404.html', (req, res) => {
	res.render('404', { title: 'Ooopsss...Page Not Found', name: '404' });
});



module.exports = router;

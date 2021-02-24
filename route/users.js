const express = require('express');
const mySql = require('mysql');
const router = express.Router();

const con = mySql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test',
});

con.connect((err) => {
	if (err) throw err;
	// console.log('Database connection has been successfull');
});

app = express();

router.get('/login', (req, res) => {
	res.render('login');
});

router.get('/signup', (req, res) => {
	res.render('regist', { title: 'Signup', name: 'account' });
});
router.post('/account', (req, res) => {
	username = req.body.username;
	fname = req.body.firstname;
	lname = req.body.lastname;
	email = req.body.email;
	password = req.body.password;
	console.log(
		username + ',' + fname + ',' + lname + ',' + email + ',' + password
	);
	let sql =
		"insert into user values ( NULL,'" +
		req.body.username +
		"',  '" +
		req.body.firstName +
		"', '" +
		req.body.lastName +
		"', '" +
		req.body.email +
		"','" +
		req.body.password +
		"' )";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log('1 record inserted');
	});
	res.redirect('/');
});

module.exports = router;

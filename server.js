const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const mySql = require('mysql');
const con = require('./config/db');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 4000;

const app = express();
dotenv.config('../.env');

app.use(express.static(path.join(__dirname + '/public')));
const partialPath = path.join(__dirname + './views/Partials');

app.set('views', './views/main');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/Partials', function (err) {});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cookieParser());

// Routing start
app.use('/', require('./route/index'));
app.use('/users', require('./route/users'));
app.use('/product', require('./route/product'));

app.get('*', function (req, res) {
	res.status(404).redirect('/404.html');
});
// Routing end

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

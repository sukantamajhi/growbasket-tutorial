const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mySql = require('mysql');
const session = require('express-session');

const port = 4000;

const app = express();

app.use(express.static(path.join(__dirname + '/public')));
const partialPath = path.join(__dirname + './views/Partials');

app.set('views', './views/main');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/Partials', function (err) {});

app.use(
	session({
		secret: 'Keyboard Cat',
		cookie: { secure: false, maxAge: 60000 },
		resave: false,
		saveUninitialized: true,
	})
);
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing start
app.use('/', require('./route/index'));
app.use('/users', require('./route/users'));
app.get('/404.html', (req, res) => {
	res.render('404', { title: 'Ooopsss...Page Not Found', name: '404' });
});


app.get('*', function (req, res) {
	res.status(404).redirect('/404.html');
});
// Routing end

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

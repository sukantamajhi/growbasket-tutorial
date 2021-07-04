const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");
const mySql = require("mysql");
const con = require("./config/db");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const axios = require("axios").default;
const flash = require("connect-flash");
const port = process.env.PORT || 3000;

const app = express();
dotenv.config(".env");

process.env.NODE_ENV = "production";

app.use(express.static(path.join(__dirname + "/public")));
const partialPath = path.join(__dirname + "./views/Partials");

app.set("views", "./views/main");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/Partials", function (err) {});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cookieParser());
app.use(flash());

// Error middleware
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

// Routing start
app.use(function (req, res, next) {
	let cookies = req.cookies.jwt;
	if (req.cookies.userData) {
		let cookie1 = req.cookies.userData;
		res.locals.uname = cookie1.name;
	}
	if (req.cookies.userDetails) {
		res.locals.userDetails = req.cookies.userDetails;
	}
	res.locals.isAuthenticated = req.cookies.jwt;
	next();
});
app.use("/", require("./route/index"));
app.use("/", require("./route/users"));
app.use("/", require("./route/product"));

app.get("*", function (req, res) {
	res.status(404).redirect("404.html");
});
// Routing end

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

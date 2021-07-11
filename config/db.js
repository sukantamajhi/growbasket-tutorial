const express = require("express");
const dotenv = require("dotenv");
const mySql = require("mysql");
const bodyParser = require("body-parser");

dotenv.config("../.env");

const connection = mySql.createConnection({
	host: process.env.MYSQL_ADDON_HOST,
	user: process.env.MYSQL_ADDON_USER,
	password: process.env.MYSQL_ADDON_PASSWORD,
	database: process.env.MYSQL_ADDON_DB,
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Database connected");
});

const pool = mySql.createPool(connection);

module.exports = connection;

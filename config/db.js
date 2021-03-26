const express = require('express');
const dotenv = require('dotenv');
const mySql = require('mysql');
const bodyParser = require('body-parser');

dotenv.config('../.env');

const connection = mySql.createConnection({
	host: process.env.Database_Host,
	user: process.env.Database_User,
	password: process.env.Database_Password,
	database: process.env.Database_Name,
});

connection.connect((err) => {
	if (err) throw err;
	console.log('Database connected');
});

const pool = mySql.createPool(connection);

module.exports = connection;

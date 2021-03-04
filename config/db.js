const express = require('express');
const mySql = require('mysql');
const bodyParser = require('body-parser');

const connection = mySql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test',
});

connection.connect((err) => {
	if (err) throw err;
	// console.log('Database connected');
});

module.exports = connection;

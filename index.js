const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const cors = require("cors");

var app = express();

// connect to databse
mongoose.connect('mongoDB://localhost/blog');
mongoose.Promise = global.Promise;


// extract the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up headers
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
app.use(cors());

// initializing apis
app.use('/api', routes);

// error handling
app.use(function(err, req, res, next) {
	res.status(422).send({ error: err.message });
});

// listening to the request
app.listen(process.env.port || 4000, function() {
	console.log('Listening to the request');
});
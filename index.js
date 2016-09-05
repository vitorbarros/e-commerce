var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//cors
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000/');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-Request, CustomHeader');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

//database connection
var mongoDB = mongoose.connect('mongodb://localhost/ecommerce').connection;
mongoDB.on('connected', function () {
    console.log('mongodb has been connected');
});
mongoDB.on('error', function () {
    console.log('error while trying to connect with mongodb');
});

//routes
require('./routes')(app);

//express server
var server = http.createServer(app);
server.listen(3000, function () {
    console.log('express has been started');
});
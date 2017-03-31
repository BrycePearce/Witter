'use strict';

const pg = require('pg'); //Non-blocking PostgreSQL client for node.js.
console.log(__dirname);
const express = require('express');
const router = express.Router(); //handles the routing of incoming requests
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var db = require('./models'); //database connection stuff (use it when you want to connect)

//blocks header from containing server info
app.disable('x-powered-by');

//Expose public folder, used to import Static assets, such as scripts/images/etc
app.use("/", express.static(path.resolve(__dirname, 'build/')));

app.set('views', __dirname + '/views');

//set port (local environment variable is not set yet)
app.set('port', process.env.PORT || 8080);

//When the user submits the URL, it hits this app.use and deciphers it here. Make sure routes are below this.
app.use(require('body-parser').urlencoded({
  extended: true
}));

//Same as above except for json
app.use(require('body-parser').json({}));

//-define routes-

//error "catch all"
function errorHandler(err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

app.post('/', function (req, res) {
  console.log(req);
  console.log(req.body);
  db.Tweet.create({
    tweet: req.body.value
  }).then(function (Tweet) {
    //returning Tweet object good practice
    return res.status(201).send({success: true, Tweet: Tweet});
  });
});

//send main page if bad route hit (route hit app.js, then hits this route)
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

//enable the router, the hit route will send through here.
app.use('/', router);

//always last so you can make sure everything else is loaded before accepting connections.
app.listen(app.get('port'), function () {
  console.log("Express started on port: " + app.get('port'));
});
'use strict';

const pg = require('pg'); //Non-blocking PostgreSQL client for node.js.
const express = require('express');
const router = express.Router(); //handles the routing of incoming requests
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
var Sequelize = require('sequelize');
var models = require('./models');


//When the user submits the URL, it hits this app.use and deciphers it here. Make sure routes are below this.
app.use(require('body-parser').urlencoded({
  extended: true
}));


//set port (local environment variable is not set yet)
app.set('port', process.env.PORT || 1337);

//blocks header from containing server info
app.disable('x-powered-by');

//error "catch all"
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

//Sets root folder as src, used to import Static assets, such as scripts/images/etc. "/static" prevents clashes with other routes.
app.use("/", express.static(path.resolve(__dirname, 'build/')));


app.post('/', function (req, res) {
  console.log(req.body);
  models.Tweet.create({
    tweet: req.body.tweet
  }).then(function (Tweet) {
    // do something after creation
    console.log()
    return res.sendStatus(201);
  });
});

//send main page if bad route hit (route hit app.js, then hits this route)
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

//enable the router, the hit route will send through here.
app.use('/', router);

//always last so you can make sure everything else is loaded before accepting connections.
app.listen(app.get('port'), function () {
  console.log("Express started on port: " + app.get('port'));
});

'use strict'

var express = require('express');
var routes = require('./routes');
var app = express();
//var user = require('./routes/user');
var db = require('./models');
var http = require('http');
var passport = require('passport');
var passportConfig = require('./config/passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sequelize = require('sequelize');

//var home = require('./routes/home');
//var application = require('./routes/application');

app.use('/public', express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

app.set('port', process.env.PORT || 8080);

//When the user submits the URL, it hits this app.use and deciphers it here. Make sure routes are below this.
app.use(require('body-parser').urlencoded({
  extended: true
}));

//Same as above except for json
app.use(require('body-parser').json({}));

app.use(cookieParser());
app.use(session({ secret: 'temp secret', resave: false, saveUninitialized: true, }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);

//error "catch all"
function errorHandler(err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

//route for landing page (indexAuth.js route file)
app.get('/', routes.index);
//create user tables for authentication in database
db
  .sequelize
  .sync()
  .then(function () {

    db.User.find({ where: { username: 'admin' } }).then(function (user) {
      if (!user) {
        db.User.build({ username: 'admin', password: 'admin' }).save();
      }
    });

    app.listen(app.get('port'), function () {
      console.log("Express started on port: " + app.get('port'));
    });
  }).catch((err) => {
    console.log('[error]', err);
  });
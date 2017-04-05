'use strict'

var express = require('express');
var routes = require('./routes');
var app = express();
var db = require('./models');
var http = require('http');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sequelize = require('sequelize');

//Expose public folder, used to import Static assets, such as scripts/images/css/etc
app.use("/", express.static(path.resolve(__dirname, 'build/')));

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

//error "catch all"
function errorHandler(err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

//tweet route
app.post('/', function (req, res) {
  console.log("Your sent a tweet! Your tweet: " + req.body.value);
  db.Tweet.create({
    tweet: req.body.value
  }).then(function (Tweet) {
    //returning Tweet object good practice
    return res.status(201).send({success: true, Tweet: Tweet});
  });
});

//Register route
app.post('/user/register', function (req, res) {
  db.User.create({ username: req.body.username, password: req.body.password }).then((user) => {
    //if user object exists, user has been created. (Untested, need to add failure
    //cases in the db (e.g. unique = false) and check later)
    if (user) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});


//Authentication route, if success post true (handle errors later)
app.post('/user/auth', passport.authenticate('local'), function (req, res) {
  return res.status(200).json({ success: true });
});

//Signout route
app.get('/user/logout', function (req, res) {
  req.logout();
  //send user back to home page on signout
  res.redirect('/');
});

//create user tables for authentication in database
//**note: (force:true on sync deletes all users and recreates tables)**

//send main page if bad route hit (route hit app.js, then hits this route)
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});


db
  .sequelize
  .sync({ force: true })
  .then(function () {

    db.User.find({ where: { username: 'admin' } }).then(function (user) {
      if (!user) {
        db.User.create({ username: 'admin', password: 'admin' });
      }
    });

    app.listen(app.get('port'), function () {
      console.log("Express started on port: " + app.get('port'));
    });
  }).catch((err) => {
    console.log('[error]', err);
  });
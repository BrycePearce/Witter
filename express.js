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
var passportConfig = require('./config/passport');

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
    /*
     * can also use getTasks here. which will be helpful in the future for getting all the tweets of a user *****
     *
     * TODO: assign anonymous user to req.user, if req.user isn't defined (so we don't have mega long errors, or invalid tweets)
     */
    //add association addTweet, sent from user.js, to user. (this will update userId column, which specifies which user sent a tweet)
    req.user.addTweet(Tweet).then(function () {
      //this line just makes userId show up in postman, don't need it for anything else
      Tweet.UserId = req.user.id;
      //return status, included Tweet object as good practice dictates
      return res.status(201).send({ success: true, Tweet: Tweet });
    })
  }).catch((err) => { //handle creation errors, such as null tweets
    console.log('[error]\n', err.name, "\n", err.message);
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
  //***check to see if user is logged in when they logout, probably remove this later, and don't have logout appear when user is logged in***
  if (req.user === undefined) {
    console.log("You're not logged in, silly!");
    return res.status(400).json({ success: false });
  } else {
    console.log("Logged you out " + req.user.dataValues.username + ", have a nice day!");
    req.logout();
    return res.status(200).json({ success: true });
  }
  //send user back to home page on signout
  res.redirect('/');
});

app.get('/api/user/:username', function (req, res) {
  //we first need to get the userId by querying with the username we acquired in the fetch from UserPageContainer
  //so here we query our "Users" table, and find the ID associated with the entered user. (we made id in 'Users' is the same as userId in 'Tweets' when we created the "belongs-to-many" association in our user model)
  //**note: User here is "user.js" from model, exported as User**
  db.User.find({ where: { username: req.params.username } }).then(function (user) {
    //We got the our userId (user) value from the Users table! Now we can find all the tweets with that id value..!
    //We can do that with our helper function getTweets(), which is created when we do our "belongs-to-many" association http://docs.sequelizejs.com/en/latest/docs/associations/#belongs-to-many-associations
    user.getTweets().then(function (tweets) {
      //send off our object with tweets, which will be recieved by our get request in our UserPageContainer component.
      return res.status(200).send({ tweets: tweets });
    })
  });
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
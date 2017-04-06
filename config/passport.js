//this code also makes it so you can access the user in the req object in express (e.g. req.user.username in the tweet route)
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , db = require('../models')

// Serialize Sessions
passport.serializeUser(function(user, done){
	done(null, user);
});

//Deserialize Sessions
passport.deserializeUser(function(user, done){
	db.User.find({where: {id: user.id}}).then(function(user){
		done(null, user);
	}).error(function(err){
		done(err, null)
	});
});

// For Authentication Purposes
passport.use(new LocalStrategy(
	function(username, password, done){
		db.User.find({where: {username: username}}).then(function(user){
			passwd = user ? user.password : ''
			isMatch = db.User.validPassword(password, passwd, done, user)
		});
	}
));
'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
      //classMethod guarantees the password provided by the user matches what's in the db
      classMethods: {
        validPassword: function (password, passwd, done, user) {
          //bcrypt hash comparison to make sure everything is valid
          bcrypt.compare(password, passwd, function (err, isMatch) {
            if (err) { console.log(err); }
            if (isMatch) {
              //if match, provide user callback. False otherwise
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        },
        associate: function (models) {
          //associations can be defined here

          //associate every tweet to having one author 
          //(as: "tweets" here creates the .addTweet [the name addTweet is automatically created] we use in our tweet route in the express file)
          //it also tells sequelize to create the userId column in tweets (which will be assigned a number only when we assign a user to it, which we do in the tweet route with req.user.addTweet(Tweet))
          User.hasMany(models.Tweet, { as: "tweets" });
        }
      }
    });
  //before we create the user, hash the password (salt/hash)
  User.hook('beforeCreate', function (user, options, fn) {
    var salt = bcrypt.genSalt(12, function (err, salt) {
      return salt;
    });
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      return fn(null, user);
    });
  });
  return User;
};
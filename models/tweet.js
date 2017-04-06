'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define('Tweet', {
    tweet: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //creating a one-to-many relationship from user->tweets
       // models.User.hasMany(models.Tweet, {as: 'tweets'});
      }
    }
  });
  return Tweet;
};
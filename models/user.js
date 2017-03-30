'use strict';

/*TEMPORARY, REMOVE EVERYTHING IN HERE*/
module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define('Tweet', {
    tweet: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tweet;
};
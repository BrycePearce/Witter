'use strict';
module.exports = function (sequelize, DataTypes) {
  var Tweet = sequelize.define('Tweet', {
    tweet: {
      type: DataTypes.TEXT,

      validate: {
        notEmpty: true, // don't allow empty strings
      }
    }
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Tweet;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var doc = sequelize.define('doc', {
    name: DataTypes.STRING,
    asJson: DataTypes.TEXT,
    asHtml: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return doc;
};
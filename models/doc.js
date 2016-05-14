'use strict';
module.exports = function(sequelize, DataTypes) {
  var doc = sequelize.define('doc', {
    documentName: DataTypes.STRING,
    documentArray: DataTypes.TEXT,
    documentSecret: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return doc;
};
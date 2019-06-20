'use strict';
module.exports = (sequelize, DataTypes) => {
  const test - articl = sequelize.define('test-articl', {
    name: DataTypes.STRING
  }, {});
  test - articl.associate = function(models) {
    // associations can be defined here
  };
  return test - articl;
};
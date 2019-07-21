'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuConditions = sequelize.define('MenuConditions', {
    menuId: DataTypes.INTEGER,
    conditionId: DataTypes.INTEGER
  }, {});
  MenuConditions.associate = function(models) {
    // associations can be defined here
  };
  return MenuConditions;
};
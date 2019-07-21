'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuUsers = sequelize.define('MenuUsers', {
    menuId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  MenuUsers.associate = function(models) {
    // associations can be defined here
  };
  return MenuUsers;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    Users.belongsToMany(models.Menus, {
      through: 'MenuUsers',
      as: 'menus',
      foreignKey: 'userId'
    });
  };
  return Users;
};

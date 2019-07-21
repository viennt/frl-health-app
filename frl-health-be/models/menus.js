'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menus = sequelize.define('Menus', {
    name: DataTypes.STRING,
    quantity: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Menus.associate = function(models) {
    Menus.belongsToMany(models.Users, {
      through: 'MenuUsers',
      as: 'users',
      foreignKey: 'menuId'
    });
    Menus.belongsToMany(models.Conditions, {
      through: 'MenuConditions',
      as: 'conditions',
      foreignKey: 'menuId'
    });
  };
  return Menus;
};

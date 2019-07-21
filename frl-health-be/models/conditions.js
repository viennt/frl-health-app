'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conditions = sequelize.define('Conditions', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Conditions.associate = function(models) {
    Conditions.belongsToMany(models.Menus, {
      through: 'MenuConditions',
      as: 'menus',
      foreignKey: 'conditionId'
    });
  };
  return Conditions;
};

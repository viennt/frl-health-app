'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MenuConditions', [{
      conditionId: 1,
      menuId: 2,
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      conditionId: 2,
      menuId: 4,
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      conditionId: 2,
      menuId: 3,
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      conditionId: 3,
      menuId: 4,
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      conditionId: 4,
      menuId: 4,
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MenuUsers', null, {});
  }
};

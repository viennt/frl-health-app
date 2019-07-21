'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MenuUsers', [{
      userId: 2,
      menuId: 2,
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      userId: 2,
      menuId: 4,
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MenuUsers', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: 'admin@123',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      username: 'demo',
      password: 'demo@123',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Conditions', [{
      name: 'Asthma',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      name: 'Pneumonia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      name: 'Diabetes',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      name: 'Eyesight',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      name: 'High Blood Pressure',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }, {
      name: 'Migraine',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Conditions', null, {});
  }
};

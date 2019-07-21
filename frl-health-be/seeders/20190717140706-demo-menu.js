'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Menus', [{
      name: 'Rice',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      quantity: '10g',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    },{
      name: 'Porridge',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      quantity: '20g',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    },{
      name: 'Banana',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      quantity: '30g',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    },{
      name: 'Apple',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      quantity: '5g',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    },{
      name: 'Milk',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      quantity: '1g',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    },{
      name: 'Tuna',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt id in, iure laboriosam non perspiciatis quaerat repellendus velit. Ab exercitationem illum laudantium, magni quod ratione tenetur. Temporibus, tenetur.',
      quantity: '120g',
      createdAt: '2019-07-17 13:02:52.054 +00:00',
      updatedAt: '2019-07-17 13:02:52.054 +00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Menus', null, {});
  }
};

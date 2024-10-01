'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: '$2a$10$K0wBtEfOvqAdoZ5X3JPh5ew9DxYrBiZJ7VQlA8LQyG1w.u9uV/.72', // hashed password 'admin123'
        role: 'admin',
        blacklisted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: '$2a$10$K0wBtEfOvqAdoZ5X3JPh5ew9DxYrBiZJ7VQlA8LQyG1w.u9uV/.72', // hashed password 'user123'
        role: 'user',
        blacklisted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

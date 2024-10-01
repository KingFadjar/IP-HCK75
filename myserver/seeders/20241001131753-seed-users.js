'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedUserPassword = await bcrypt.hash('user123', 10);

    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedAdminPassword,  // hashed password: 'admin123'
        role: 'admin',
        blacklisted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: hashedUserPassword,  // hashed password: 'user123'
        role: 'user',
        blacklisted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: hashedUserPassword,  // hashed password: 'user123'
        role: 'user',
        blacklisted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'blacklistedUser',
        email: 'blacklisted@example.com',
        password: hashedUserPassword,  // hashed password: 'user123'
        role: 'user',
        blacklisted: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

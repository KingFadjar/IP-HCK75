'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cars', [
      {
        name: 'Toyota Avanza',
        brand: 'Toyota',
        type: 'MPV',
        price_per_day: 350000,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Honda CR-V',
        brand: 'Honda',
        type: 'SUV',
        price_per_day: 550000,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mitsubishi Xpander',
        brand: 'Mitsubishi',
        type: 'MPV',
        price_per_day: 400000,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cars', null, {});
  }
};

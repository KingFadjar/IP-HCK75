'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Dapatkan userId dari user admin atau user tertentu
    const adminUser = await queryInterface.rawSelect('Users', {
      where: { email: 'admin@example.com' },
    }, ['id']);
    
    if (!adminUser) {
      throw new Error('Admin user not found');
    }

    return queryInterface.bulkInsert('Cars', [
      {
        name: 'Toyota Avanza',
        brand: 'Toyota',
        type: 'MPV',
        price_per_day: 350000,
        available: true,
        userId: adminUser,  // Sertakan userId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Honda CR-V',
        brand: 'Honda',
        type: 'SUV',
        price_per_day: 550000,
        available: true,
        userId: adminUser,  // Sertakan userId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cars', null, {});
  }
};

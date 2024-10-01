'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      // Relasi dengan model User (misalnya: pengguna bisa merental mobil)
      Car.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      // Relasi lain jika diperlukan
      Car.hasMany(models.Rental, { foreignKey: 'carId', as: 'rentals' });
    }
  }

  Car.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true, // Optional
      },
      price_per_day: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nama tabel dari model User
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Car',
      tableName: 'Cars',
      timestamps: true,
    }
  );

  return Car;
};

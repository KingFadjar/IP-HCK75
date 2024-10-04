'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    static associate(models) {
      // Relasi dengan Car
      Rental.belongsTo(models.Car, {
        foreignKey: 'carId',
        as: 'car',
      });

      // Relasi dengan User
      Rental.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  Rental.init(
    {
      carId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Cars', // Nama tabel dari model Car
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // Nama tabel dari model User
          key: 'id',
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Rental',
      tableName: 'Rentals',
      timestamps: true,
    }
  );

  return Rental;
};

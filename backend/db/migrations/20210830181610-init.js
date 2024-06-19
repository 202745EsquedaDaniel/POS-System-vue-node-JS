'use strict';

const { PAYMENTS_TABLE} = require('./../models/payments.model');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(PAYMENTS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      total: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
      },
      paymentMethod:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PAYMENTS_TABLE);
  }
};

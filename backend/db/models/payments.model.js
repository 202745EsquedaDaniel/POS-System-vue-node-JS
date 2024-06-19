const { Model, DataTypes, Sequelize } = require('sequelize');

const PAYMENTS_TABLE = 'payments';

const PaymentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}


class Payment extends Model {

  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAYMENTS_TABLE,
      modelName: 'Payment',
      timestamps: false
    }
  }
}

module.exports = { Payment, PaymentSchema, PAYMENTS_TABLE };

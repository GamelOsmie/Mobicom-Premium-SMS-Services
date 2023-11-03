const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/dbConfig');

const BalanceUpdateRecord = sequelize.define(
  'BalanceUpdateRecord',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    update_date: DataTypes.DATE,
    total_subscribers: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    enough_balance_subscribers: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    low_balance_subscribers: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
);

const SMSDeliveryRecord = sequelize.define(
  'SMSDeliveryRecord',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    delivery_date: DataTypes.DATE,
    total_subscribers: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    delivered: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    undelivered: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
);

module.exports = { SMSDeliveryRecord, BalanceUpdateRecord };

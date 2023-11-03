const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/dbConfig');

const Subscriber = sequelize.define(
  'Subscriber',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    msisdn_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        len: [9, 20],
      },
    },
    is_subscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    has_enough_balance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    balance_updated_at: DataTypes.DATE,
    subscription_date: DataTypes.DATE,
    unsubscription_date: DataTypes.DATE,
  },
  {
    timestamps: false,
  },
);

module.exports = Subscriber;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const BalanceUpdateRecordSchema = new Schema(
  {
    update_date: Date,
    total_subscribers: {
      type: Number,
      default: 0,
    },
    enough_balance_subscribers: {
      type: Number,
      default: 0,
    },
    low_balance_subscribers: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  },
);

const BalanceUpdateRecord = mongoose.model(
  'BalanceUpdateRecord',
  BalanceUpdateRecordSchema,
);

const SMSDeliveryRecordSchema = new Schema(
  {
    delivery_date: Date,
    total_subscribers: {
      type: Number,
      default: 0,
    },
    delivered: {
      type: Number,
      default: 0,
    },
    undelivered: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    }
  },
);

const SMSDeliveryRecord = mongoose.model(
  'SMSDeliveryRecord',
  SMSDeliveryRecordSchema,
);

module.exports = { SMSDeliveryRecord, BalanceUpdateRecord };

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

const SMSDeliveryRecordSchema2020 = new Schema(
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
    },
  },
);

const SMSDeliveryRecord2020 = mongoose.model(
  'SMSDeliveryRecord2020',
  SMSDeliveryRecordSchema2020,
);

const SMSDeliveryRecordSchema2021 = new Schema(
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
    },
  },
);

const SMSDeliveryRecord2021 = mongoose.model(
  'SMSDeliveryRecord2021',
  SMSDeliveryRecordSchema2021,
);

const SMSDeliveryRecordSchema2022 = new Schema(
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
    },
  },
);

const SMSDeliveryRecord2022 = mongoose.model(
  'SMSDeliveryRecord2022',
  SMSDeliveryRecordSchema2022,
);

const SMSDeliveryRecordSchema2023 = new Schema(
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
    },
  },
);

const SMSDeliveryRecord2023 = mongoose.model(
  'SMSDeliveryRecord2023',
  SMSDeliveryRecordSchema2023,
);

const SMSDeliveryRecordSchema2024 = new Schema(
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
    },
  },
);

const SMSDeliveryRecord2024 = mongoose.model(
  'SMSDeliveryRecord2024',
  SMSDeliveryRecordSchema2024,
);

module.exports = {
  SMSDeliveryRecord2020,
  SMSDeliveryRecord2021,
  SMSDeliveryRecord2022,
  SMSDeliveryRecord2023,
  SMSDeliveryRecord2024,
  BalanceUpdateRecord,
};

const mongoose = require('mongoose');
const { Schema } = mongoose;

const Subscriber2023Schema = new Schema(
  {
    msisdn_no: {
      type: String,
      require: true,
      unique: true,
    },
    is_subscribed: {
      type: Boolean,
      default: true,
    },
    has_enough_balance: {
      type: Boolean,
      default: false,
    },
    network: {
      type: String,
      enum: ['Africell', 'QCell', 'Orange'],
      require: true,
    },
    balance_updated_at: Date,
    subscription_date: Date,
    unsubscription_date: Date,
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

const Subscriber2023 = mongoose.model('Subscriber2023', Subscriber2023Schema);

module.exports = Subscriber2023;

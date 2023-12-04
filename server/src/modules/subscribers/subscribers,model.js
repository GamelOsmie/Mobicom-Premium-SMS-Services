const mongoose = require('mongoose');
const { Schema } = mongoose;

const Subscriber2021Schema = new Schema(
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
      default: true,
    },
    balance_updated_at: Date,
    subscription_date: Date,
    unsubscription_date: Date,
  },
  {
    timestamps: false,
  },
);

const Subscriber2021 = mongoose.model('Subscriber2021', Subscriber2021Schema);

module.exports = Subscriber2021;

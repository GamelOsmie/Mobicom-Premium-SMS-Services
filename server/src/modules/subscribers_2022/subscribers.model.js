const mongoose = require('mongoose');
const { Schema } = mongoose;

const Subscriber2022Schema = new Schema(
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
    balance_updated_at: Date,
    subscription_date: Date,
    unsubscription_date: Date,
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

const Subscriber2022 = mongoose.model('Subscriber2022', Subscriber2022Schema);

module.exports = Subscriber2022;

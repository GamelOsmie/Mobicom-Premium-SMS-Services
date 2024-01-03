const {
  SMSDeliveryRecord,
  BalanceUpdateRecord,
} = require('./analytics.models');
const errorResponse = require('../../utils/errorResponse');
const Subscriber2021 = require('../subscribers_2021/subscribers.model');
const Subscriber2022 = require('../subscribers_2022/subscribers.model');
const Subscriber2023 = require('../subscribers_2023/subscribers.model');
const Subscriber2024 = require('../subscribers_2024/subscribers.model');
const {
  SMSDeliveryRecord2021,
  SMSDeliveryRecord2022,
  SMSDeliveryRecord2023,
  SMSDeliveryRecord2024,
} = require('./analytics.models');

const createBalanceStatusUpdateRecord = async (req, res, next) => {
  const {
    update_date,
    total_subscribers,
    enough_balance_subscribers,
    low_balance_subscribers,
  } = req.body;

  try {
    const record = await BalanceUpdateRecord.create({
      update_date,
      total_subscribers,
      enough_balance_subscribers,
      low_balance_subscribers,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Balance status update records recorded successfully',
      data: record,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const createSMSDeliveryRecord = async (req, res, next) => {
  const { delivery_date, delivered, total_subscribers, undelivered } = req.body;

  try {
    const record = await SMSDeliveryRecord.create({
      delivery_date,
      total_subscribers,
      delivered,
      undelivered,
    });

    return res.status(200).json({
      status: 'success',
      message: 'SMS delivery records recorded successfully',
      data: record,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const dashboardOverview = async (req, res, next) => {
  try {
    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // subscriptions today
    const subs2021 = await Subscriber2021.countDocuments({
      subscription_date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const subs2022 = await Subscriber2022.countDocuments({
      subscription_date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const subs2023 = await Subscriber2023.countDocuments({
      subscription_date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const subs2024 = await Subscriber2024.countDocuments({
      subscription_date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    // subscriptions today
    const unsubs2021 = await Subscriber2021.countDocuments({
      unsubscription_date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const unsubs2022 = await Subscriber2022.countDocuments({
      unsubscription_date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const unsubs2023 = await Subscriber2023.countDocuments({
      unsubscription_date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const unsubs2024 = await Subscriber2024.countDocuments({
      unsubscription_date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    // sms deliveries
    const all2021Deliveries = await SMSDeliveryRecord2021.find({
      created_at: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    let total2021Deliveries = 0;
    all2021Deliveries.forEach(
      (delivery) => (total2021Deliveries += delivery.delivered),
    );

    const all2022Deliveries = await SMSDeliveryRecord2022.find({
      created_at: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    let total2022Deliveries = 0;
    all2022Deliveries.forEach(
      (delivery) => (total2022Deliveries += delivery.delivered),
    );

    const all2023Deliveries = await SMSDeliveryRecord2023.find({
      created_at: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    let total2023Deliveries = 0;
    all2023Deliveries.forEach(
      (delivery) => (total2023Deliveries += delivery.delivered),
    );

    const all2024Deliveries = await SMSDeliveryRecord2024.find({
      created_at: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    let total2024Deliveries = 0;
    all2024Deliveries.forEach(
      (delivery) => (total2024Deliveries += delivery.delivered),
    );

    const record = {
      subscriptions_today: {
        2021: subs2021,
        2022: subs2022,
        2023: subs2023,
        2024: subs2024,
      },

      unsubscriptions_today: {
        2021: unsubs2021,
        2022: unsubs2022,
        2023: unsubs2023,
        2024: unsubs2024,
      },

      sms_deliveries: [
        {
          name: '2021',
          deliveries: total2021Deliveries,
        },
        {
          name: '2022',
          deliveries: total2022Deliveries,
        },
        {
          name: '2023',
          deliveries: total2023Deliveries,
        },
        {
          name: '2024',
          deliveries: total2024Deliveries,
        },
      ],
    };

    return res.status(200).json({
      status: 'success',
      message: 'Overview stats fetched successfully',
      data: record,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

module.exports = {
  createBalanceStatusUpdateRecord,
  createSMSDeliveryRecord,
  dashboardOverview,
};

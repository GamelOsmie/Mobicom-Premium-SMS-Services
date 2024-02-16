const errorResponse = require('../../utils/errorResponse');
const Subscriber2020 = require('../subscribers_2020/subscribers.model');
const Subscriber2021 = require('../subscribers_2021/subscribers.model');
const Subscriber2022 = require('../subscribers_2022/subscribers.model');
const Subscriber2023 = require('../subscribers_2023/subscribers.model');
const Subscriber2024 = require('../subscribers_2024/subscribers.model');
const {
  SMSDeliveryRecord2020,
  SMSDeliveryRecord2021,
  SMSDeliveryRecord2022,
  SMSDeliveryRecord2023,
  SMSDeliveryRecord2024,
  BalanceUpdateRecord,
} = require('./analytics.models');

const Content = require('../content/content.models');

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

const dashboardOverview = async (req, res, next) => {
  try {

    const currentDate = new Date();

    // Get the start and end of the current day
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );


    // subscriptions today
    const subs2020 = await Subscriber2020.countDocuments({
      subscription_date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      is_subscribed: true,
    });

    const subs2021 = await Subscriber2021.countDocuments({
      subscription_date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      is_subscribed: true,
    });

    const subs2022 = await Subscriber2022.countDocuments({
      subscription_date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      is_subscribed: true,
    });

    const subs2023 = await Subscriber2023.countDocuments({
      subscription_date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      is_subscribed: true,
    });

    const subs2024 = await Subscriber2024.countDocuments({
      subscription_date: {
         $gte: startOfDay,
        $lt: endOfDay,
      },
      is_subscribed: true,
    });

    // unsubscriptions today
    const unsubs2020 = await Subscriber2020.countDocuments({
      unsubscription_date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      is_subscribed: false,
    });

    const unsubs2021 = await Subscriber2021.countDocuments({
      unsubscription_date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      is_subscribed: false,
    });

    const unsubs2022 = await Subscriber2022.countDocuments({
      unsubscription_date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      is_subscribed: false,
    });

    const unsubs2023 = await Subscriber2023.countDocuments({
      unsubscription_date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      is_subscribed: false,
    });

    const unsubs2024 = await Subscriber2024.countDocuments({
      unsubscription_date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      is_subscribed: false,
    });

    // sms deliveries
    const all2020Deliveries = await SMSDeliveryRecord2020.find({
      created_at: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    let total2020Deliveries = 0;
    all2020Deliveries.forEach(
      (delivery) => (total2020Deliveries += delivery.delivered),
    );

    const all2021Deliveries = await SMSDeliveryRecord2021.find({
      created_at: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    let total2021Deliveries = 0;
    all2021Deliveries.forEach(
      (delivery) => (total2021Deliveries += delivery.delivered),
    );

    const all2022Deliveries = await SMSDeliveryRecord2022.find({
      created_at: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    let total2022Deliveries = 0;
    all2022Deliveries.forEach(
      (delivery) => (total2022Deliveries += delivery.delivered),
    );

    const all2023Deliveries = await SMSDeliveryRecord2023.find({
      created_at: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    let total2023Deliveries = 0;
    all2023Deliveries.forEach(
      (delivery) => (total2023Deliveries += delivery.delivered),
    );

    const all2024Deliveries = await SMSDeliveryRecord2024.find({
      created_at: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    let total2024Deliveries = 0;
    all2024Deliveries.forEach(
      (delivery) => (total2024Deliveries += delivery.delivered),
    );

    const record = {
      subscriptions_today: {
        2020: subs2020,
        2021: subs2021,
        2022: subs2022,
        2023: subs2023,
        2024: subs2024,
      },

      unsubscriptions_today: {
        2020: unsubs2020,
        2021: unsubs2021,
        2022: unsubs2022,
        2023: unsubs2023,
        2024: unsubs2024,
      },

      sms_deliveries: [
        {
          name: '2020',
          deliveries: total2020Deliveries,
        },
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

const creatorOverview = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const published = await Content.countDocuments({
      author: _id,
      publication_status: 'published',
    });
    const draft = await Content.countDocuments({
      author: _id,
      publication_status: 'draft',
    });
    const approved = await Content.countDocuments({
      author: _id,
      publication_status: 'published',
      approval_status: 'approved',
    });
    const pending = await Content.countDocuments({
      author: _id,
      publication_status: 'published',
      approval_status: 'pending',
    });
    const rejected = await Content.countDocuments({
      author: _id,
      publication_status: 'published',
      approval_status: 'rejected',
    });

    const recent_contents = await Content.find({
      author: _id,
    })
      .sort({ updated_at: -1 })
      .limit(3);

    return res.json({
      status: 'success',
      message: 'Overview fetched successfully',
      data: {
        published,
        draft,
        approved,
        pending,
        rejected,
        recent_contents,
      },
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const StatOverview2020 = async (req, res, next) => {
  try {
    function getDayName(date) {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      return days[date.getDay()];
    }

    function getMonthName(month) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return months[month];
    }

    // Calculate the start date of the past week
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const currentYear = new Date().getFullYear();

    const total_subscribers = await Subscriber2020.countDocuments({
      is_subscribed: true,
    });

    const total_unsubscribers = await Subscriber2020.countDocuments({
      is_subscribed: false,
    });

    const daily_subscription_results = await Subscriber2020.aggregate([
      {
        $match: {
          subscription_date: { $gte: startDate, $lte: currentDate },
          is_subscribed: true,
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$subscription_date' }, // Group by the day of the week
          count: { $sum: 1 }, // Count the number of subscriptions for each day
        },
      },
      {
        $sort: { _id: 1 }, // Sort by day of the week in ascending order
      },
    ]);

    const daily_unsubscription_results = await Subscriber2020.aggregate([
      {
        $match: {
          unsubscription_date: { $gte: startDate, $lte: currentDate },
          is_subscribed: false,
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$unsubscription_date' }, // Group by the day of the week
          count: { $sum: 1 }, // Count the number of subscriptions for each day
        },
      },
      {
        $sort: { _id: 1 }, // Sort by day of the week in ascending order
      },
    ]);

    const monthly_subscription_results = await Subscriber2020.aggregate([
      {
        $match: {
          subscription_date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          }, // Filter documents for the current year
          is_subscribed: true,
        },
      },
      {
        $group: {
          _id: { $month: '$subscription_date' }, // Group by the month
          count: { $sum: 1 }, // Count the number of subscriptions for each month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ]);

    const monthly_unsubscription_results = await Subscriber2020.aggregate([
      {
        $match: {
          subscription_date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
          is_subscribed: false,
        },
      },
      {
        $group: {
          _id: { $month: '$unsubscription_date' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const daily_delivery_results = await SMSDeliveryRecord2020.aggregate([
      {
        $match: {
          created_at: { $gte: startDate, $lte: currentDate },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$created_at' },
          delivered: { $sum: '$delivered' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const monthly_delivery_results = await SMSDeliveryRecord2020.aggregate([
      {
        $match: {
          created_at: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$created_at' },
          delivered: { $sum: '$delivered' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // daily subs record
    let daily_subscription = [];
    let daily_unsubscription = [];

    daily_subscription_results.forEach((day) => {
      const name_of_day = getDayName(new Date(0, 0, day._id));
      const day_total = day.count;

      daily_subscription.push({ name_of_day, day_total });
    });

    daily_unsubscription_results.forEach((day) => {
      const name_of_day = getDayName(new Date(0, 0, day._id));
      const day_total = day.count;

      daily_unsubscription.push({ name_of_day, day_total });
    });

    // monthly subs record
    let monthly_subscription = [];
    let monthly_unsubscription = [];

    monthly_subscription_results.forEach((month) => {
      const name_of_month = getMonthName(month._id - 1);
      const month_total = month.count;

      monthly_subscription.push({ name_of_month, month_total });
    });

    monthly_unsubscription_results.forEach((month) => {
      const name_of_month = getMonthName(month._id - 1);
      const month_total = month.count;

      monthly_unsubscription.push({ name_of_month, month_total });
    });

    // deliveries
    let daily_deliveries = [];
    let monthly_deliveries = [];

    daily_delivery_results.forEach((day) => {
      const name_of_day = getDayName(new Date(0, 0, day._id));
      const day_total = day.delivered;

      daily_deliveries.push({ name_of_day, day_total });
    });

    monthly_delivery_results.forEach((month) => {
      const name_of_month = getMonthName(month._id - 1);
      const month_total = month.delivered;

      monthly_deliveries.push({ name_of_month, month_total });
    });

    return res.status(200).json({
      status: 'success',
      message: '2020 Overview fetched successfully',
      data: {
        total_subscribers,
        total_unsubscribers,
        daily_subscription,
        daily_unsubscription,
        monthly_subscription,
        monthly_unsubscription,
        daily_deliveries,
        monthly_deliveries,
      },
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

module.exports = {
  createBalanceStatusUpdateRecord,
  dashboardOverview,
  creatorOverview,
  StatOverview2020,
};

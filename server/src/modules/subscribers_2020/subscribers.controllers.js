const errorResponse = require('../../utils/errorResponse');
const Subscriber = require('./subscribers.model');
const paginate = require('../../utils/paginationConfig');
const checkNetworkType = require('../../utils/networkDialCodes');
const numberConverter = require('../../utils/numberConverter');

const subscribe = async (req, res, next) => {
  const { msisdn_no } = req.body;

  try {
    let converted_msisdn_no = numberConverter(msisdn_no);

    const existing_subscriber = await Subscriber.findOne({
      msisdn_no: converted_msisdn_no,
    });

    if (existing_subscriber && existing_subscriber.is_subscribed === true) {
      return res.status(200).json({
        status: 'success',
        message: 'You are already subscribed to this service',
        data: existing_subscriber,
      });
    }

    if (existing_subscriber && existing_subscriber.is_subscribed === false) {
      existing_subscriber.is_subscribed = true;
      existing_subscriber.subscription_date = new Date();
      existing_subscriber.unsubscription_date = null;
      await existing_subscriber.save();

      return res.status(200).json({
        status: 'success',
        message: 'Subscription successful',
        data: existing_subscriber,
      });
    }

    const network = checkNetworkType(converted_msisdn_no);

    if (!network) {
      return next(errorResponse(400, 'Your network is not supported'));
    }

    const new_subscriber = await Subscriber.create({
      msisdn_no: converted_msisdn_no,
      network,
      subscription_date: new Date(),
    });

    return res.status(200).json({
      status: 'success',
      message: 'Subscription successful',
      data: new_subscriber,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const unsubscribe = async (req, res, next) => {
  const { msisdn_no } = req.body;

  try {
    let converted_msisdn_no = numberConverter(msisdn_no);

    const subscriber = await Subscriber.findOne({
      msisdn_no: converted_msisdn_no,
    });

    if (!subscriber) {
      return res.status(200).json({
        status: 'success',
        message: 'You are not subscribed to this service',
        data: null,
      });
    }

    if (subscriber && subscriber.is_subscribed === false) {
      return res.status(200).json({
        status: 'success',
        message: 'You have already unsubscribed to this service',
        data: subscriber,
      });
    }

    subscriber.is_subscribed = false;
    subscriber.unsubscription_date = new Date();
    await subscriber.save();

    return res.status(200).json({
      status: 'success',
      message: 'Unsubscription successful',
      data: subscriber,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const updateEnoughBalance = async (req, res, next) => {
  const { msisdn_no } = req.body;

  try {
    let converted_msisdn_no = numberConverter(msisdn_no);

    const subscriber = await Subscriber.findOne({
      msisdn_no: converted_msisdn_no,
      is_subscribed: true,
    });

    if (!subscriber) {
      return next(errorResponse(404, 'Subscriber not found'));
    }

    subscriber.has_enough_balance = true;
    subscriber.balance_updated_at = new Date();
    await subscriber.save();

    return res.status(200).json({
      status: 'success',
      message: 'Enough balance update successful',
      data: subscriber,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const updateLowBalance = async (req, res, next) => {
  const { msisdn_no } = req.body;

  try {
    let converted_msisdn_no = numberConverter(msisdn_no);

    const subscriber = await Subscriber.findOne({
      msisdn_no: converted_msisdn_no,
      is_subscribed: true,
    });

    if (!subscriber) {
      return next(errorResponse(404, 'Subscriber not found'));
    }

    subscriber.has_enough_balance = false;
    subscriber.balance_updated_at = new Date();
    await subscriber.save();

    return res.status(200).json({
      status: 'success',
      message: 'Low balance update successful',
      data: subscriber,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const getAllSubscribers = async (req, res, next) => {
  const pageSize = 150;
  const pageNum = parseInt(req.query.page) || 1;
  const offset = pageSize * (pageNum - 1);

  try {
    const subscribers = await Subscriber.find({ is_subscribed: true })
      .lean()
      .skip(offset)
      .limit(pageSize);

    const count = await Subscriber.countDocuments({ is_subscribed: true });
    const meta = paginate({ count, pageNum, pageSize, req });

    return res.status(200).json({
      status: 'success',
      message: 'Subscribers fetched successfully',
      data: subscribers,
      meta,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const getLowBalanceSubscribers = async (req, res, next) => {
  const pageSize = 150;
  const pageNum = parseInt(req.query.page) || 1;
  const offset = pageSize * (pageNum - 1);

  try {
    const subscribers = await Subscriber.find({
      has_enough_balance: false,
      is_subscribed: true,
    })
      .lean()
      .skip(offset)
      .limit(pageSize);

    const count = await Subscriber.countDocuments({
      has_enough_balance: false,
      is_subscribed: true,
    });
    const meta = paginate({ count, pageNum, pageSize, req });

    return res.status(200).json({
      status: 'success',
      message: 'Subscribers fetched successfully',
      data: subscribers,
      meta,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const getEnoughBalanceSubscribers = async (req, res, next) => {
  const pageSize = 150;
  const pageNum = parseInt(req.query.page) || 1;
  const offset = pageSize * (pageNum - 1);

  try {
    const subscribers = await Subscriber.find({
      has_enough_balance: true,
      is_subscribed: true,
    })
      .lean()
      .skip(offset)
      .limit(pageSize);

    const count = await Subscriber.countDocuments({
      has_enough_balance: true,
      is_subscribed: true,
    });
    const meta = paginate({ count, pageNum, pageSize, req });

    return res.status(200).json({
      status: 'success',
      message: 'Subscribers fetched successfully',
      data: subscribers,
      meta,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const getSMSTargetGroups = async (req, res, next) => {
  try {
    const all_subscribers = await Subscriber.countDocuments({
      is_subscribed: true,
    });
    const all_low_balance = await Subscriber.countDocuments({
      is_subscribed: true,
      has_enough_balance: false,
    });

    const all_enough_balance = await Subscriber.countDocuments({
      is_subscribed: true,
      has_enough_balance: true,
    });

    return res.status(200).json({
      status: 'success',
      message: 'SMS target groups fetched successfully',
      data: {
        all_subscribers,
        all_low_balance,
        all_enough_balance,
      },
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const searchSubscriber = async (req, res, next) => {
  const { term } = req.body;

  try {

    const subscribers = await Subscriber.find({
      is_subscribed: true,
      msisdn_no: { $regex: term, $options: 'i' },
    }).limit(10);

    return res.status(200).json({
      status: 'success',
      message: 'Subscribers fetched successfully',
      data: subscribers,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

module.exports = {
  subscribe,
  unsubscribe,
  updateEnoughBalance,
  updateLowBalance,
  getAllSubscribers,
  getLowBalanceSubscribers,
  getEnoughBalanceSubscribers,
  getSMSTargetGroups,
  searchSubscriber
};

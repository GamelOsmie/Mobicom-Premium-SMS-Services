const errorResponse = require('../../utils/errorResponse');
const Subscriber = require('./subscribers,model');
// const updateEnoughBalanceQueue = require('../../queue-jobs/update_enough_balance');

const subscribe = async (req, res) => {
  const { msisdn_no } = req.body;

  try {
    const existing_subscriber = await Subscriber.findOne({
      where: { msisdn_no },
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

    const new_subscriber = await Subscriber.create({
      msisdn_no,
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

const unsubscribe = async (req, res) => {
  const { msisdn_no } = req.body;

  try {
    const subscriber = await Subscriber.findOne({
      where: { msisdn_no },
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
    const subscriber = await Subscriber.findOne({
      where: { msisdn_no, is_subscribed: true },
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
    const subscriber = await Subscriber.findOne({
      where: { msisdn_no, is_subscribed: true },
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


module.exports = {
  subscribe,
  unsubscribe,
  updateEnoughBalance,
  updateLowBalance,
};

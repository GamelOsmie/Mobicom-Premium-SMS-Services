const {
  SMSDeliveryRecord,
  BalanceUpdateRecord,
} = require('./analytics.models');
const errorResponse = require('../../utils/errorResponse');

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

module.exports = {
  createBalanceStatusUpdateRecord,
  createSMSDeliveryRecord,
};

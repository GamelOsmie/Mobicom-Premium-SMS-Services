const errorResponse = require('../../utils/errorResponse');
const smsDeliveryQueueFor2020 = require('../../queue-jobs/2020/sms_delivery');
const smsDeliveryQueueFor2021 = require('../../queue-jobs/2021/sms_delivery');
const smsDeliveryQueueFor2022 = require('../../queue-jobs/2022/sms_delivery');
const smsDeliveryQueueFor2023 = require('../../queue-jobs/2023/sms_delivery');
const smsDeliveryQueueFor2024 = require('../../queue-jobs/2024/sms_delivery');
const Content = require('../content/content.models');
const Subscriber2020 = require('../subscribers_2020/subscribers.model');
const Subscriber2021 = require('../subscribers_2021/subscribers.model');
const Subscriber2022 = require('../subscribers_2022/subscribers.model');
const Subscriber2023 = require('../subscribers_2023/subscribers.model');
const Subscriber2024 = require('../subscribers_2024/subscribers.model');

const sendSMS = async (req, res, next) => {
  const { category, message, group } = req.body;

  try {
    const content = await Content.findOne({ slug: message });

    if (!content) {
      return next(errorResponse(404, 'Content not found'));
    }

    const refinedSMS = content.body
      .replace(/'/g, "\\'")
      .replace(/`/g, '\\`')
      .replace(/"/g, '\\"');

    // send to 2020 subs
    if (category == '2020') {
      await smsDeliveryQueueFor2020.add({ group, message: refinedSMS });
    }

    // send to 2021 subs
    if (category == '2021') {
      await smsDeliveryQueueFor2021.add({ group, message: refinedSMS });
    }

    // send to 2022 subs
    if (category == '2022') {
      await smsDeliveryQueueFor2022.add({ group, message: refinedSMS });
    }

    // send to 2023 subs
    if (category == '2023') {
      await smsDeliveryQueueFor2023.add({ group, message: refinedSMS });
    }

    // send to 2024 subs
    if (category == '2024') {
      await smsDeliveryQueueFor2024.add({ group, message: refinedSMS });
    }

    return res.json({
      status: 'success',
      message: 'SMS delivery initiated successfully',
      data: null,
    });
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

module.exports = sendSMS;

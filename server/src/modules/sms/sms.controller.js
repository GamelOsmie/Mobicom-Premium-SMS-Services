const errorResponse = require('../../utils/errorResponse');
const {
  SMSDeliveryRecord2021,
  SMSDeliveryRecord2022,
  SMSDeliveryRecord2023,
  SMSDeliveryRecord2024,
} = require('../analytics/analytics.models');
const Content = require('../content/content.models');
const Subscriber2021 = require('../subscribers_2021/subscribers.model');
const Subscriber2022 = require('../subscribers_2022/subscribers.model');
const Subscriber2023 = require('../subscribers_2023/subscribers.model');
const Subscriber2024 = require('../subscribers_2024/subscribers.model');
const axios = require('axios');

const sendSMS = async (req, res, next) => {
  const { category, message, group } = req.body;

  console.log({ group });

  try {
    const content = await Content.findOne({ slug: message });

    if (!content) {
      return next(errorResponse(404, 'Content not found'));
    }

    const refinedSMS = content.body
      .replace(/'/g, "\\'")
      .replace(/`/g, '\\`')
      .replace(/"/g, '\\"');

    // send to 2021 subs
    if (category == '2021') {
      let receivers;
      let delivered = 0;
      let undelivered = 0;

      if (group.all_subscribers) {
        receivers = await Subscriber2021.find();
      }

      if (group.all_enough_balance) {
        receivers = await Subscriber2021.find({ has_enough_balance: true });
      }

      if (group.all_low_balance) {
        receivers = await Subscriber2021.find({ has_enough_balance: false });
      }

      if (group.list.length) {
        receivers = group.list;
      }

      await receivers?.forEach((sub) => {
        (async () => {
          try {
            const response = await axios.get(
              `${process.env.AFRICEL_SMPP_HOST_PORT}/send?username=${process.env.AFRICEL_SMPP_USERNAME}&password=${process.env.AFRICEL_SMPP_PASSWORD}&from=${category}&to=${sub.msisdn_no}&content=${refinedSMS}&dlr=yes&dlr-level=3&dlr-method=GET&dlr-url=${process.env.AFRICEL_SMPP_HOST_PORT}/sms/delivery.php`,
            );

            console.log(response);

            if (response.status_code == 200) {
              delivered += 1;
            } else {
              undelivered += 1;
              console.log(`${sub.msisdn_no} delivery error:`, response.reason);
            }
          } catch (error) {
            console.log(`${sub.msisdn_no} delivery error:`, error.message);
          }
        })();
      });

      await SMSDeliveryRecord2021.create({
        total_subscribers: receivers?.length,
        delivered,
        undelivered,
      });
    }

    // send to 2022 subs
    if (category == '2022') {
      let receivers;
      let delivered = 0;
      let undelivered = 0;

      if (group.all_subscribers) {
        receivers = await Subscriber2022.find();
      }

      if (group.all_enough_balance) {
        receivers = await Subscriber2022.find({ has_enough_balance: true });
      }

      if (group.all_low_balance) {
        receivers = await Subscriber2022.find({ has_enough_balance: false });
      }

      if (group.list.length) {
        receivers = group.list;
      }

      await receivers.forEach((sub) => {
        (async () => {
          try {
            const response = await axios.get(
              `${process.env.AFRICEL_SMPP_HOST_PORT}/send?username=${process.env.AFRICEL_SMPP_USERNAME}&password=${process.env.AFRICEL_SMPP_PASSWORD}&from=${category}&to=${sub.msisdn_no}&content=${refinedSMS}&dlr=yes&dlr-level=3&dlr-method=GET&dlr-url=${process.env.AFRICEL_SMPP_HOST_PORT}/sms/delivery.php`,
            );

            if (response.status_code == 200) {
              delivered += 1;
            } else {
              undelivered += 1;
              console.log(`${sub.msisdn_no} delivery error:`, response.reason);
            }
          } catch (error) {
            console.log(`${sub.msisdn_no} delivery error:`, error.message);
          }
        })();
      });

      await SMSDeliveryRecord2022.create({
        total_subscribers: receivers?.length,
        delivered,
        undelivered,
      });
    }

    // send to 2023 subs
    if (category == '2023') {
      let receivers;
      let delivered = 0;
      let undelivered = 0;

      if (group.all_subscribers) {
        receivers = await Subscriber2023.find();
      }

      if (group.all_enough_balance) {
        receivers = await Subscriber2023.find({ has_enough_balance: true });
      }

      if (group.all_low_balance) {
        receivers = await Subscriber2023.find({ has_enough_balance: false });
      }

      if (group.list.length) {
        receivers = group.list;
      }

      await receivers.forEach((sub) => {
        (async () => {
          try {
            const response = await axios.get(
              `${process.env.AFRICEL_SMPP_HOST_PORT}/send?username=${process.env.AFRICEL_SMPP_USERNAME}&password=${process.env.AFRICEL_SMPP_PASSWORD}&from=${category}&to=${sub.msisdn_no}&content=${refinedSMS}&dlr=yes&dlr-level=3&dlr-method=GET&dlr-url=${process.env.AFRICEL_SMPP_HOST_PORT}/sms/delivery.php`,
            );

            if (response.status_code == 200) {
              delivered += 1;
            } else {
              undelivered += 1;
              console.log(`${sub.msisdn_no} delivery error:`, response.reason);
            }
          } catch (error) {
            console.log(`${sub.msisdn_no} delivery error:`, error.message);
          }
        })();
      });

      await SMSDeliveryRecord2023.create({
        total_subscribers: receivers?.length,
        delivered,
        undelivered,
      });
    }

    // send to 2024 subs
    if (category == '2024') {
      let receivers;
      let delivered = 0;
      let undelivered = 0;

      if (group.all_subscribers) {
        receivers = await Subscriber2024.find();
      }

      if (group.all_enough_balance) {
        receivers = await Subscriber2024.find({ has_enough_balance: true });
      }

      if (group.all_low_balance) {
        receivers = await Subscriber2024.find({ has_enough_balance: false });
      }

      if (group.list.length) {
        receivers = group.list;
      }

      await receivers.forEach((sub) => {
        (async () => {
          try {
            const response = await axios.get(
              `${process.env.AFRICEL_SMPP_HOST_PORT}/send?username=${process.env.AFRICEL_SMPP_USERNAME}&password=${process.env.AFRICEL_SMPP_PASSWORD}&from=${category}&to=${sub.msisdn_no}&content=${refinedSMS}&dlr=yes&dlr-level=3&dlr-method=GET&dlr-url=${process.env.AFRICEL_SMPP_HOST_PORT}/sms/delivery.php`,
            );

            if (response.status_code == 200) {
              delivered += 1;
            } else {
              undelivered += 1;
              console.log(`${sub.msisdn_no} delivery error:`, response.reason);
            }
          } catch (error) {
            console.log(`${sub.msisdn_no} delivery error:`, error.message);
          }
        })();
      });

      await SMSDeliveryRecord2024.create({
        total_subscribers: receivers?.length,
        delivered,
        undelivered,
      });
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

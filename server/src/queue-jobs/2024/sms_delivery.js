const Bull = require('bull');
const axios = require('axios');
const getRedisClient = require('../../utils/redisClient');
const {
  SMSDeliveryRecord2024,
} = require('../../modules/analytics/analytics.models');
const AFRICELL_SMS_API = require('../../utils/smsAPIs');
const Subscriber2024 = require('../../modules/subscribers_2024/subscribers.model');

const smsDeliveryQueueFor2024 = new Bull('smsDeliveryQueueFor2024', {
  redis: getRedisClient,
});

smsDeliveryQueueFor2024.process(async (job, done) => {
  const { group, message } = job.data;

  try {
    let receivers = [];

    if (group.all_subscribers) {
      receivers = await Subscriber2024.find({ is_subscribed: true });
    }

    if (group.all_enough_balance) {
      receivers = await Subscriber2024.find({
        has_enough_balance: true,
        is_subscribed: true,
      });
    }

    if (group.all_low_balance) {
      receivers = await Subscriber2024.find({
        has_enough_balance: false,
        is_subscribed: true,
      });
    }

    if (group.list.length) {
      receivers = group.list;
    }

    console.log('-----------2024 SMS INITIATED-----------');
    console.log(`SMS size : ${receivers.length}`);
    console.log(`start time : ${new Date().toLocaleString()}`);
    console.log('-----------------------------------------');
    console.log(`✉️ message: ${message}`);

    let delivered = 0;
    let undelivered = 0;

    for (let i = 0; i < receivers.length; i += 10) {
      await Promise.all(
        receivers.slice(i, i + 10).map(async (sub) => {
          try {
            const response = await axios.post(AFRICELL_SMS_API.url, {
              SystemID: AFRICELL_SMS_API.system_id,
              Password: AFRICELL_SMS_API.password,
              Sender: '2024',
              Receiver: sub.msisdn_no,
              Message: message,
            });

            if (response.data.ResultCode == '200') {
              delivered += 1;
              console.log(
                `✅ delivered to ${
                  sub.msisdn_no
                } at ${new Date().toLocaleString()}`,
              );
            } else {
              undelivered += 1;
              console.log(`❌ couldn't deliver to ${sub.msisdn_no}`);
            }
          } catch (error) {
            undelivered += 1;
            console.log(`❌ ${sub.msisdn_no} delivery error:`, error.message);
          }
        }),
      );
    }

    await SMSDeliveryRecord2024.create({
      total_subscribers: receivers?.length,
      delivered,
      undelivered,
    });

    console.log('------2024 SMS DELIVERY COMPLETE-------');
    console.log(`completed time : ${new Date().toLocaleString()}`);
    console.log(`successful deliveries : ${delivered}`);
    console.log(`unsuccessful deliveries : ${undelivered}`);
    console.log('---------------------------------------');
    done();
  } catch (err) {
    console.log(`'2024 SMS delivery error', ${err}`);
  }
});

module.exports = smsDeliveryQueueFor2024;

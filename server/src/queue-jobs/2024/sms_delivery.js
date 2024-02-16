const Bull = require('bull');
const axios = require('axios');
const getRedisClient = require('../../utils/redisClient');
const {
  SMSDeliveryRecord2024,
} = require('../../modules/analytics/analytics.models');
const AFRICELL_SMS_API = require('../../utils/smsAPIs');

const smsDeliveryQueueFor2024 = new Bull('smsDeliveryQueueFor2024', {
  redis: getRedisClient,
});

smsDeliveryQueueFor2024.process(async (job, done) => {
  const { receivers, message } = job.data;

  try {
    console.log('-----------2024 SMS INITIATED-----------');
    console.log(`SMS size : ${receivers.length}`);
    console.log(`start time : ${new Date().toLocaleString()}`);
    console.log('-----------------------------------------');
    let delivered = 0;
    let undelivered = 0;

    await Promise.all(
      receivers.map(async (sub) => {
        try {
          const response = await axios.post(AFRICELL_SMS_API.url, {
            SystemID: AFRICELL_SMS_API.system_id,
            Password: AFRICELL_SMS_API.password,
            Sender: '2024',
            receiver: sub.msisdn_no,
            Message: message,
          });

          if (
            response.ResultCode == 200 ||
            response.status_code == 200 ||
            response.statusCode == 200
          ) {
            delivered += 1;
            console.log(
              `message deliver to ${
                sub.msisdn_no
              } at ${new Date().toLocaleString()}`,
            );
          } else {
            undelivered += 1;
            console.log(`${sub.msisdn_no} delivery error:`, response);
          }
        } catch (error) {
          undelivered += 1;
          console.log(`${sub.msisdn_no} delivery error:`, error.message);
        }
      }),
    );

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

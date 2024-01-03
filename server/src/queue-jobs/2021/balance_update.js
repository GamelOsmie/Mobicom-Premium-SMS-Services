const Bull = require('bull');
const getRedisClient = require('../../utils/redisClient');

const systemNewCommissionQueue = new Bull('systemNewCommissionQueue', {
  redis: getRedisClient,
});

systemNewCommissionQueue.process(async (job, done) => {
  const { number } = job.data;

  try {
    console.log(number);

    done();
  } catch (err) {
    console.log(err);
  }
});

module.exports = systemNewCommissionQueue;
